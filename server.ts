/**
 * ECHO – THE WORLD REMEMBERS
 * Full-Stack Central Multiplayer, World Sync & WebRTC Signaling Server
 * Runs on port 3000 (Express + Vite Middleware in dev / dist static in prod + ws on /ws)
 */

import express from 'express';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer, WebSocket } from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const DEFAULT_ROOM_ID = 'ECHO-PUBLIC-1';

type RealmId = 'ISLAND' | 'DARK_REALM';

interface PlacedVoxel {
  gx: number;
  gy: number;
  gz: number;
  kind: string;
  rot?: number;
  yBase?: number;
}

interface PlayerProfile {
  id: string;
  username: string;
  titleAr: string;
  titleEn: string;
  characterClass: string;
  robeColor: string;
  auraColor: string;
  level: number;
  echoMastery: number;
  createdAt: number;
  lastActive: number;
}

interface TransformSnapshot {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  facingAngle: number;
  isGrounded: boolean;
  isMoving: boolean;
  isSprinting: boolean;
  actionState: string;
  comboStep: number;
  realm: RealmId;
  hp?: number;
  maxHp?: number;
  timestamp: number;
}

interface VoiceState {
  enabled: boolean;
  muted: boolean;
  speaking: boolean;
}

interface ConnectedClient {
  ws: WebSocket;
  playerId: string;
  profile: PlayerProfile;
  transform: TransformSnapshot;
  roomId: string;
  partyId: string | null;
  friendIds: Set<string>;
  voice: VoiceState;
  lastSeenAt: number;
}

interface PartyMember {
  playerId: string;
  username: string;
  characterClass: string;
  isLeader: boolean;
  hp: number;
  maxHp: number;
  isReady: boolean;
  pingMs: number;
  realm: RealmId;
}

interface PartyRecord {
  partyId: string;
  leaderId: string;
  passCode: string;
  members: PartyMember[];
  maxMembers: number;
  sharedObjectiveAr: string;
  sharedObjectiveEn: string;
  createdAt: number;
}

interface RoomState {
  roomId: string;
  name: string;
  hostPlayerId: string;
  isPrivate: boolean;
  passCode?: string;
  members: Set<string>;
  createdAt: number;
  // Shared world progress
  crystals: Set<number>;
  shards: Set<number>;
  inscriptions: Set<number>;
  isTempleDoorOpen: boolean;
  questProgress: unknown | null;
  darkProgress: unknown | null;
  // Shared voxel buildings
  world1Voxels: Map<string, PlacedVoxel>;
  world2Voxels: Map<string, PlacedVoxel>;
  // Shared combat & resource states
  world1Enemies: Map<string, { hp: number; maxHp: number; isDead: boolean }>;
  world1HarvestedTrees: Map<string, { x: number; z: number; regrowAt: number }>;
  world1HarvestedBoulders: Map<string, { x: number; z: number; regrowAt: number }>;
  darkMonsters: Map<number, { hp: number; maxHp: number; alive: boolean; respawnAt: number }>;
  darkNodes: Map<number, { hp: number; alive: boolean; regrowAt: number }>;
  darkChests: Set<string>;
}

function makeVoxelKey(gx: number, gy: number, gz: number): string {
  return `${Math.round(gx)},${Math.round(gy)},${Math.round(gz)}`;
}

function makeCoordKey(x: number, z: number): string {
  return `${Math.round(x * 10)}_${Math.round(z * 10)}`;
}

function createRoomRecord(roomId: string, name: string, hostPlayerId: string, isPrivate: boolean, passCode?: string): RoomState {
  return {
    roomId,
    name,
    hostPlayerId,
    isPrivate,
    passCode,
    members: new Set<string>(),
    createdAt: Date.now(),
    crystals: new Set<number>(),
    shards: new Set<number>(),
    inscriptions: new Set<number>(),
    isTempleDoorOpen: false,
    questProgress: null,
    darkProgress: null,
    world1Voxels: new Map<string, PlacedVoxel>(),
    world2Voxels: new Map<string, PlacedVoxel>(),
    world1Enemies: new Map(),
    world1HarvestedTrees: new Map(),
    world1HarvestedBoulders: new Map(),
    darkMonsters: new Map(),
    darkNodes: new Map(),
    darkChests: new Set<string>(),
  };
}

function defaultTransform(): TransformSnapshot {
  return {
    x: 0,
    y: 4,
    z: -100,
    vx: 0,
    vy: 0,
    vz: 0,
    facingAngle: Math.PI,
    isGrounded: true,
    isMoving: false,
    isSprinting: false,
    actionState: 'IDLE',
    comboStep: 1,
    realm: 'ISLAND',
    hp: 100,
    maxHp: 100,
    timestamp: Date.now(),
  };
}

function generateCode(prefix: string, length: number = 4): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = `${prefix}-`;
  for (let i = 0; i < length; i++) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

class EchoMultiplayerServer {
  private clients = new Map<string, ConnectedClient>();
  private socketToPlayerId = new Map<WebSocket, string>();
  private rooms = new Map<string, RoomState>();
  private parties = new Map<string, PartyRecord>();

  constructor() {
    this.rooms.set(DEFAULT_ROOM_ID, createRoomRecord(DEFAULT_ROOM_ID, 'Forgotten Island · Public Sanctuary', 'SERVER', false));
  }

  public handleConnection(ws: WebSocket): void {
    ws.on('message', (raw) => {
      try {
        const packet = JSON.parse(raw.toString());
        this.onPacket(ws, packet);
      } catch (err) {
        this.sendToSocket(ws, { type: 'S_ERROR', code: 'BAD_JSON', message: 'Invalid JSON packet' });
      }
    });

    ws.on('close', () => {
      const playerId = this.socketToPlayerId.get(ws);
      this.socketToPlayerId.delete(ws);
      if (!playerId) return;
      const client = this.clients.get(playerId);
      if (!client || client.ws !== ws) return;
      this.removeClient(client, 'DISCONNECTED');
    });

    ws.on('error', () => {
      // Handled via close
    });
  }

  private sendToSocket(ws: WebSocket, packet: Record<string, unknown>): void {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(packet));
    }
  }

  private sendToPlayer(playerId: string, packet: Record<string, unknown>): void {
    const client = this.clients.get(playerId);
    if (client) {
      this.sendToSocket(client.ws, packet);
    }
  }

  private broadcastRoom(roomId: string, packet: Record<string, unknown>, excludePlayerId?: string): void {
    const room = this.rooms.get(roomId);
    if (!room) return;
    const payload = JSON.stringify(packet);
    for (const memberId of room.members) {
      if (excludePlayerId && memberId === excludePlayerId) continue;
      const c = this.clients.get(memberId);
      if (c && c.ws.readyState === WebSocket.OPEN) {
        c.ws.send(payload);
      }
    }
  }

  private broadcastParty(partyId: string, packet: Record<string, unknown>, excludePlayerId?: string): void {
    const party = this.parties.get(partyId);
    if (!party) return;
    const payload = JSON.stringify(packet);
    for (const member of party.members) {
      if (excludePlayerId && member.playerId === excludePlayerId) continue;
      const c = this.clients.get(member.playerId);
      if (c && c.ws.readyState === WebSocket.OPEN) {
        c.ws.send(payload);
      }
    }
  }

  private onPacket(ws: WebSocket, packet: any): void {
    if (!packet || typeof packet.type !== 'string') return;

    if (packet.type === 'C_PING') {
      this.sendToSocket(ws, { type: 'S_PONG', clientTime: packet.clientTime || Date.now(), serverTime: Date.now() });
      return;
    }

    if (packet.type === 'C_AUTH') {
      const profile = packet.profile as PlayerProfile;
      if (!profile || typeof profile.id !== 'string' || !profile.id.trim()) {
        this.sendToSocket(ws, { type: 'S_AUTH_ACK', success: false, sessionPlayerId: '', error: 'Missing player profile id' });
        return;
      }

      const prevClient = this.clients.get(profile.id);
      if (prevClient && prevClient.ws !== ws) {
        this.socketToPlayerId.delete(prevClient.ws);
        try {
          prevClient.ws.close(4001, 'Superseded by newer session');
        } catch {
          // ignore
        }
      }

      const targetRoomId = prevClient?.roomId || DEFAULT_ROOM_ID;
      const client: ConnectedClient = {
        ws,
        playerId: profile.id,
        profile: { ...profile, lastActive: Date.now() },
        transform: prevClient?.transform || defaultTransform(),
        roomId: targetRoomId,
        partyId: prevClient?.partyId || null,
        friendIds: prevClient?.friendIds || new Set<string>(Array.isArray(packet.friendIds) ? packet.friendIds : []),
        voice: { enabled: false, muted: false, speaking: false },
        lastSeenAt: Date.now(),
      };

      this.clients.set(client.playerId, client);
      this.socketToPlayerId.set(ws, client.playerId);

      this.sendToSocket(ws, {
        type: 'S_AUTH_ACK',
        success: true,
        sessionPlayerId: client.playerId,
      });

      this.joinClientToRoom(client, targetRoomId);
      this.sendRoomListTo(client);
      this.sendFriendsStatusTo(client);
      this.notifyFriendsAboutPlayer(client.playerId);
      if (client.partyId && this.parties.has(client.partyId)) {
        this.syncPartyState(client.partyId);
      }
      return;
    }

    const playerId = this.socketToPlayerId.get(ws);
    if (!playerId) return;
    const client = this.clients.get(playerId);
    if (!client) return;
    client.lastSeenAt = Date.now();

    switch (packet.type) {
      case 'C_UPDATE_PROFILE': {
        if (packet.profile) {
          client.profile = { ...client.profile, ...packet.profile, id: client.playerId, lastActive: Date.now() };
          this.broadcastRoom(client.roomId, {
            type: 'S_PLAYER_PROFILE_UPDATED',
            playerId: client.playerId,
            profile: client.profile,
          }, client.playerId);
          if (client.partyId) {
            const party = this.parties.get(client.partyId);
            const m = party?.members.find((pm) => pm.playerId === client.playerId);
            if (m) {
              m.username = client.profile.username;
              m.characterClass = client.profile.characterClass;
              this.syncPartyState(client.partyId);
            }
          }
          this.notifyFriendsAboutPlayer(client.playerId);
        }
        break;
      }

      case 'C_LIST_ROOMS': {
        this.sendRoomListTo(client);
        break;
      }

      case 'C_ROOM_CREATE': {
        const roomName = String(packet.name || `${client.profile.username}'s World`).slice(0, 40);
        const isPrivate = Boolean(packet.isPrivate);
        const passCode = isPrivate ? String(packet.passCode || '').trim() || undefined : undefined;
        const roomId = generateCode('ROOM', 5);
        const room = createRoomRecord(roomId, roomName, client.playerId, isPrivate, passCode);

        // Seed initial state from creator's current room progress if requested
        if (packet.seedSnapshot) {
          this.mergeWorldSnapshotIntoRoom(room, packet.seedSnapshot);
        }
        this.rooms.set(roomId, room);
        this.joinClientToRoom(client, roomId);
        this.broadcastRoomList();
        break;
      }

      case 'C_JOIN_ROOM': {
        const requestedId = String(packet.roomId || '').trim().toUpperCase();
        if (!requestedId) return;
        let room = this.rooms.get(requestedId);
        if (!room) {
          // Allow seamless room creation by exact code if friend shared an unlisted room code
          room = createRoomRecord(requestedId, `Expedition ${requestedId}`, client.playerId, false);
          this.rooms.set(requestedId, room);
        }
        if (room.isPrivate && room.passCode && room.passCode !== packet.passCode && packet.bypassCode !== true) {
          this.sendToSocket(ws, { type: 'S_ERROR', code: 'WRONG_PASSCODE', message: 'Incorrect room passcode' });
          return;
        }
        this.joinClientToRoom(client, requestedId);
        this.broadcastRoomList();
        break;
      }

      case 'C_LEAVE_ROOM': {
        if (client.roomId !== DEFAULT_ROOM_ID) {
          this.joinClientToRoom(client, DEFAULT_ROOM_ID);
          this.broadcastRoomList();
        }
        break;
      }

      case 'C_SYNC_TRANSFORM': {
        if (!packet.transform) return;
        const prevRealm = client.transform.realm;
        client.transform = {
          ...client.transform,
          ...packet.transform,
          timestamp: Date.now(),
        };
        if (client.partyId) {
          const party = this.parties.get(client.partyId);
          const m = party?.members.find((pm) => pm.playerId === client.playerId);
          if (m) {
            if (typeof client.transform.hp === 'number') m.hp = client.transform.hp;
            if (typeof client.transform.maxHp === 'number') m.maxHp = client.transform.maxHp;
            if (prevRealm !== client.transform.realm) {
              m.realm = client.transform.realm;
              this.syncPartyState(client.partyId);
            }
          }
        }
        if (prevRealm !== client.transform.realm) {
          this.notifyFriendsAboutPlayer(client.playerId);
        }
        this.broadcastRoom(
          client.roomId,
          {
            type: 'S_REMOTE_TRANSFORM',
            playerId: client.playerId,
            transform: client.transform,
          },
          client.playerId
        );
        break;
      }

      case 'C_COMBAT_ATTACK': {
        this.broadcastRoom(
          client.roomId,
          {
            type: 'S_REMOTE_ATTACK',
            playerId: client.playerId,
            comboStep: packet.comboStep || 1,
            origin: packet.origin,
            facingAngle: packet.facingAngle,
          },
          client.playerId
        );
        break;
      }

      case 'C_WEAPON_SHOT': {
        this.broadcastRoom(
          client.roomId,
          {
            type: 'S_REMOTE_SHOT',
            playerId: client.playerId,
            realm: client.transform.realm,
            weapon: packet.weapon === 'bow' ? 'bow' : 'pistol',
            origin: packet.origin,
            dir: packet.dir,
            power: typeof packet.power === 'number' ? packet.power : 1.0,
          },
          client.playerId
        );
        break;
      }

      case 'C_COMBAT_DODGE': {
        this.broadcastRoom(
          client.roomId,
          {
            type: 'S_REMOTE_DODGE',
            playerId: client.playerId,
            direction: packet.direction,
          },
          client.playerId
        );
        break;
      }

      case 'C_COMBAT_PULSE': {
        this.broadcastRoom(
          client.roomId,
          {
            type: 'S_REMOTE_PULSE',
            playerId: client.playerId,
            origin: packet.origin,
          },
          client.playerId
        );
        break;
      }

      case 'C_VOXEL_UPDATE': {
        const room = this.rooms.get(client.roomId);
        if (!room) return;
        const realm: RealmId = packet.realm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND';
        const voxelMap = realm === 'DARK_REALM' ? room.world2Voxels : room.world1Voxels;
        const blocks: PlacedVoxel[] = Array.isArray(packet.blocks) ? packet.blocks : [];

        if (packet.op === 'PLACE') {
          for (const b of blocks) {
            voxelMap.set(makeVoxelKey(b.gx, b.gy, b.gz), {
              gx: Math.round(b.gx),
              gy: Math.round(b.gy),
              gz: Math.round(b.gz),
              kind: String(b.kind || 'wood_plank'),
              ...(typeof b.rot === 'number' ? { rot: ((Math.round(b.rot) % 4) + 4) % 4 } : {}),
              ...(typeof b.yBase === 'number' && Number.isFinite(b.yBase) ? { yBase: b.yBase } : {}),
            });
          }
        } else if (packet.op === 'REMOVE') {
          for (const b of blocks) {
            voxelMap.delete(makeVoxelKey(b.gx, b.gy, b.gz));
          }
        }

        this.broadcastRoom(
          client.roomId,
          {
            type: 'S_VOXEL_UPDATE',
            senderId: client.playerId,
            realm,
            op: packet.op,
            blocks,
          },
          client.playerId
        );
        break;
      }

      case 'C_WORLD_PROGRESS_UPDATE': {
        const room = this.rooms.get(client.roomId);
        if (!room || !packet.delta) return;
        this.mergeWorldSnapshotIntoRoom(room, packet.delta);
        this.broadcastRoom(
          client.roomId,
          {
            type: 'S_WORLD_PROGRESS_UPDATE',
            senderId: client.playerId,
            delta: packet.delta,
          },
          client.playerId
        );
        break;
      }

      case 'C_ENEMY_DAMAGE': {
        const room = this.rooms.get(client.roomId);
        if (!room) return;
        const realm: RealmId = packet.realm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND';
        const now = Date.now();

        if (realm === 'ISLAND') {
          const enemyId = String(packet.enemyId);
          const hp = Math.max(0, Number(packet.hp ?? 0));
          const maxHp = Math.max(1, Number(packet.maxHp ?? 120));
          const isDead = Boolean(packet.isDead || hp <= 0);
          room.world1Enemies.set(enemyId, { hp, maxHp, isDead });
          this.broadcastRoom(
            client.roomId,
            {
              type: 'S_ENEMY_STATE',
              senderId: client.playerId,
              realm,
              enemyId,
              hp,
              maxHp,
              isDead,
              pos: packet.pos,
            },
            client.playerId
          );
        } else {
          const spawnId = Number(packet.spawnId);
          const hp = Math.max(0, Number(packet.hp ?? 0));
          const maxHp = Math.max(1, Number(packet.maxHp ?? 100));
          const alive = Boolean(packet.alive && hp > 0);
          room.darkMonsters.set(spawnId, {
            hp,
            maxHp,
            alive,
            respawnAt: alive ? 0 : now + 45000,
          });
          this.broadcastRoom(
            client.roomId,
            {
              type: 'S_ENEMY_STATE',
              senderId: client.playerId,
              realm,
              spawnId,
              hp,
              maxHp,
              alive,
              pos: packet.pos,
            },
            client.playerId
          );
        }
        break;
      }

      case 'C_RESOURCE_HIT': {
        const room = this.rooms.get(client.roomId);
        if (!room) return;
        const now = Date.now();

        if (packet.resourceType === 'WORLD1_TREE' && typeof packet.x === 'number' && typeof packet.z === 'number') {
          const key = makeCoordKey(packet.x, packet.z);
          if (packet.destroyed) {
            room.world1HarvestedTrees.set(key, { x: packet.x, z: packet.z, regrowAt: now + 45000 });
          }
        } else if (packet.resourceType === 'WORLD1_BOULDER' && typeof packet.x === 'number' && typeof packet.z === 'number') {
          const key = makeCoordKey(packet.x, packet.z);
          if (packet.destroyed) {
            room.world1HarvestedBoulders.set(key, { x: packet.x, z: packet.z, regrowAt: now + 45000 });
          }
        } else if (packet.resourceType === 'DARK_NODE' && typeof packet.nodeId === 'number') {
          room.darkNodes.set(packet.nodeId, {
            hp: Math.max(0, Number(packet.hp ?? 0)),
            alive: !packet.destroyed,
            regrowAt: packet.destroyed ? now + 35000 : 0,
          });
        } else if (packet.resourceType === 'DARK_CHEST' && typeof packet.chestId === 'string') {
          room.darkChests.add(packet.chestId);
        }

        this.broadcastRoom(
          client.roomId,
          {
            ...packet,
            type: 'S_RESOURCE_STATE',
            senderId: client.playerId,
          },
          client.playerId
        );
        break;
      }

      case 'C_CHAT_MESSAGE': {
        const rawText = String(packet.text || '').trim().slice(0, 320);
        if (!rawText) return;
        const channel =
          packet.channel === 'PARTY'
            ? 'PARTY'
            : packet.channel === 'FRIENDS'
              ? 'FRIENDS'
              : 'ROOM';
        const chatPacket = {
          type: 'S_CHAT_BROADCAST',
          id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          senderId: client.playerId,
          senderName: client.profile.username,
          senderColor: client.profile.auraColor || '#00f5d4',
          realm: client.transform.realm,
          channel,
          text: rawText,
          timestamp: Date.now(),
        };

        if (channel === 'PARTY' && client.partyId) {
          this.broadcastParty(client.partyId, chatPacket);
        } else if (channel === 'FRIENDS') {
          this.sendToSocket(ws, chatPacket);
          for (const target of this.clients.values()) {
            if (target.playerId === client.playerId) continue;
            if (client.friendIds.has(target.playerId) || target.friendIds.has(client.playerId)) {
              this.sendToSocket(target.ws, chatPacket);
            }
          }
        } else {
          this.broadcastRoom(client.roomId, chatPacket);
        }
        break;
      }

      case 'C_PARTY_CREATE': {
        this.removeClientFromParty(client);
        const passCode = generateCode('ECHO', 4);
        const partyId = `party_${Date.now()}_${passCode}`;
        const party: PartyRecord = {
          partyId,
          leaderId: client.playerId,
          passCode,
          members: [
            {
              playerId: client.playerId,
              username: client.profile.username,
              characterClass: client.profile.characterClass,
              isLeader: true,
              hp: client.transform.hp ?? 100,
              maxHp: client.transform.maxHp ?? 100,
              isReady: true,
              pingMs: 0,
              realm: client.transform.realm,
            },
          ],
          maxMembers: 4,
          sharedObjectiveAr: 'استكشاف العوالم والمغامرة معاً',
          sharedObjectiveEn: 'Explore Both Realms Together',
          createdAt: Date.now(),
        };
        this.parties.set(partyId, party);
        client.partyId = partyId;
        this.syncPartyState(partyId);
        this.notifyVoiceRosterForPartyOrRoom(client);
        break;
      }

      case 'C_PARTY_JOIN': {
        const code = String(packet.passCode || '').trim().toUpperCase();
        const targetParty = Array.from(this.parties.values()).find(
          (p) => p.partyId === packet.partyId || (code && p.passCode === code)
        );
        if (!targetParty) {
          this.sendToSocket(ws, { type: 'S_ERROR', code: 'PARTY_NOT_FOUND', message: 'Party not found or expired' });
          return;
        }
        if (targetParty.members.length >= targetParty.maxMembers) {
          this.sendToSocket(ws, { type: 'S_ERROR', code: 'PARTY_FULL', message: 'Party is full (max 4 players)' });
          return;
        }
        this.removeClientFromParty(client);
        client.partyId = targetParty.partyId;
        targetParty.members.push({
          playerId: client.playerId,
          username: client.profile.username,
          characterClass: client.profile.characterClass,
          isLeader: false,
          hp: client.transform.hp ?? 100,
          maxHp: client.transform.maxHp ?? 100,
          isReady: true,
          pingMs: 0,
          realm: client.transform.realm,
        });
        this.syncPartyState(targetParty.partyId);
        this.notifyVoiceRosterForPartyOrRoom(client);
        break;
      }

      case 'C_PARTY_LEAVE': {
        this.removeClientFromParty(client);
        this.sendToSocket(ws, { type: 'S_PARTY_STATE', party: null });
        this.notifyVoiceRosterForPartyOrRoom(client);
        break;
      }

      case 'C_PARTY_PING': {
        if (!packet.ping) return;
        const pingPayload = {
          type: 'S_PARTY_PING',
          ping: {
            id: `ping_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            senderId: client.playerId,
            senderName: client.profile.username,
            x: Number(packet.ping.x || 0),
            y: Number(packet.ping.y || 0),
            z: Number(packet.ping.z || 0),
            type: packet.ping.type || 'EXPLORE',
            realm: client.transform.realm,
            timestamp: Date.now(),
            durationMs: 8000,
          },
        };
        if (client.partyId) {
          this.broadcastParty(client.partyId, pingPayload);
        } else {
          this.broadcastRoom(client.roomId, pingPayload);
        }
        break;
      }

      case 'C_FRIEND_LIST_SYNC': {
        if (Array.isArray(packet.friendIds)) {
          client.friendIds = new Set(packet.friendIds.filter((x: unknown) => typeof x === 'string'));
        }
        this.sendFriendsStatusTo(client);
        break;
      }

      case 'C_FRIEND_ADD': {
        const query = String(packet.query || '').trim();
        if (!query) return;
        let found: ConnectedClient | undefined = this.clients.get(query);
        if (!found) {
          const lower = query.toLowerCase();
          for (const c of this.clients.values()) {
            if (c.playerId.toLowerCase() === lower || c.profile.username.toLowerCase() === lower) {
              found = c;
              break;
            }
          }
        }
        if (found && found.playerId === client.playerId) {
          this.sendToSocket(ws, { type: 'S_ERROR', code: 'SELF_FRIEND', message: 'Cannot add yourself as a friend' });
          return;
        }
        const targetId = found ? found.playerId : query;
        client.friendIds.add(targetId);
        // Make mutual automatically when target is currently online so both friends immediately see each other
        if (found) {
          found.friendIds.add(client.playerId);
          this.sendFriendsStatusTo(found);
          this.sendToPlayer(found.playerId, {
            type: 'S_FRIEND_ADDED',
            friend: this.buildFriendEntry(client),
          });
        }
        this.sendToSocket(ws, {
          type: 'S_FRIEND_ADDED',
          friend: found
            ? this.buildFriendEntry(found)
            : {
                playerId: targetId,
                username: targetId,
                characterClass: 'SPIRIT_WEAVER',
                auraColor: '#00f5d4',
                online: false,
                roomId: null,
                realm: 'ISLAND',
                lastSeen: Date.now(),
              },
        });
        this.sendFriendsStatusTo(client);
        break;
      }

      case 'C_FRIEND_REMOVE': {
        const targetId = String(packet.targetPlayerId || '');
        client.friendIds.delete(targetId);
        this.sendFriendsStatusTo(client);
        break;
      }

      case 'C_INVITE_SEND': {
        const targetId = String(packet.targetPlayerId || '');
        const target = this.clients.get(targetId);
        if (!target) {
          this.sendToSocket(ws, { type: 'S_ERROR', code: 'PLAYER_OFFLINE', message: 'Player is currently offline' });
          return;
        }
        const kind = packet.kind === 'PARTY' ? 'PARTY' : 'ROOM';
        let partyCode: string | undefined;
        let partyId: string | undefined;
        if (kind === 'PARTY') {
          if (!client.partyId || !this.parties.has(client.partyId)) {
            // Auto-create party on invite
            const code = generateCode('ECHO', 4);
            const pId = `party_${Date.now()}_${code}`;
            this.parties.set(pId, {
              partyId: pId,
              leaderId: client.playerId,
              passCode: code,
              members: [
                {
                  playerId: client.playerId,
                  username: client.profile.username,
                  characterClass: client.profile.characterClass,
                  isLeader: true,
                  hp: client.transform.hp ?? 100,
                  maxHp: client.transform.maxHp ?? 100,
                  isReady: true,
                  pingMs: 0,
                  realm: client.transform.realm,
                },
              ],
              maxMembers: 4,
              sharedObjectiveAr: 'استكشاف العوالم والمغامرة معاً',
              sharedObjectiveEn: 'Explore Both Realms Together',
              createdAt: Date.now(),
            });
            client.partyId = pId;
            this.syncPartyState(pId);
          }
          const party = this.parties.get(client.partyId!)!;
          partyId = party.partyId;
          partyCode = party.passCode;
        }

        const invite = {
          inviteId: `inv_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          kind,
          fromPlayerId: client.playerId,
          fromUsername: client.profile.username,
          fromAuraColor: client.profile.auraColor,
          roomId: client.roomId,
          partyId,
          partyCode,
          realm: client.transform.realm,
          timestamp: Date.now(),
        };

        this.sendToPlayer(target.playerId, {
          type: 'S_INVITE_RECEIVED',
          invite,
        });
        this.sendToSocket(ws, {
          type: 'S_INVITE_RESULT',
          inviteId: invite.inviteId,
          targetUsername: target.profile.username,
          status: 'SENT',
        });
        break;
      }

      case 'C_INVITE_RESPOND': {
        const accept = Boolean(packet.accept);
        const fromId = String(packet.fromPlayerId || '');
        if (!accept) {
          this.sendToPlayer(fromId, {
            type: 'S_INVITE_RESULT',
            inviteId: packet.inviteId,
            targetUsername: client.profile.username,
            status: 'DECLINED',
          });
          return;
        }

        const fromClient = this.clients.get(fromId);
        const targetRoomId = String(packet.roomId || fromClient?.roomId || DEFAULT_ROOM_ID);
        if (targetRoomId && this.rooms.has(targetRoomId) && client.roomId !== targetRoomId) {
          this.joinClientToRoom(client, targetRoomId);
          this.broadcastRoomList();
        }
        if (packet.kind === 'PARTY') {
          const pId = packet.partyId || fromClient?.partyId;
          const party = pId ? this.parties.get(pId) : undefined;
          if (party && party.members.length < party.maxMembers) {
            this.removeClientFromParty(client);
            client.partyId = party.partyId;
            party.members.push({
              playerId: client.playerId,
              username: client.profile.username,
              characterClass: client.profile.characterClass,
              isLeader: false,
              hp: client.transform.hp ?? 100,
              maxHp: client.transform.maxHp ?? 100,
              isReady: true,
              pingMs: 0,
              realm: client.transform.realm,
            });
            this.syncPartyState(party.partyId);
            this.notifyVoiceRosterForPartyOrRoom(client);
          }
        }
        this.sendToPlayer(fromId, {
          type: 'S_INVITE_RESULT',
          inviteId: packet.inviteId,
          targetUsername: client.profile.username,
          status: 'ACCEPTED',
        });
        break;
      }

      // ==========================================
      // REAL-TIME WEBRTC VOICE CHAT SIGNALING
      // Strictly scoped to players in the SAME room OR SAME party!
      // ==========================================
      case 'C_VOICE_STATE': {
        client.voice = {
          enabled: Boolean(packet.enabled),
          muted: Boolean(packet.muted),
          speaking: Boolean(packet.speaking),
        };
        const statePacket = {
          type: 'S_VOICE_STATE',
          playerId: client.playerId,
          username: client.profile.username,
          voice: client.voice,
        };
        this.broadcastVoiceEligible(client, statePacket);
        break;
      }

      case 'C_WEBRTC_SIGNAL': {
        const targetId = String(packet.targetPlayerId || '');
        const target = this.clients.get(targetId);
        if (!target) return;
        // Security & Session isolation: ONLY relay WebRTC signaling between players in the same room or same party
        if (!this.canVoiceCommunicate(client, target)) {
          this.sendToSocket(ws, {
            type: 'S_ERROR',
            code: 'VOICE_SCOPE_DENIED',
            message: 'Voice signaling only allowed inside the same session or party',
          });
          return;
        }
        this.sendToPlayer(targetId, {
          type: 'S_WEBRTC_SIGNAL',
          fromPlayerId: client.playerId,
          signalType: packet.signalType,
          sdp: packet.sdp,
          candidate: packet.candidate,
        });
        break;
      }

      case 'C_PORTAL_TRAVEL': {
        const targetRealm: RealmId = packet.targetRealm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND';
        const scope = packet.scope === 'PARTY' ? 'PARTY' : 'ROOM';
        const room = this.rooms.get(client.roomId);
        const portalPacket = {
          type: 'S_PORTAL_TRAVEL',
          initiatorId: client.playerId,
          initiatorName: client.profile.username,
          targetRealm,
          scope,
          crystalsCount: room?.crystals.size ?? 0,
          timestamp: Date.now(),
        };
        if (scope === 'PARTY' && client.partyId) {
          this.broadcastParty(client.partyId, portalPacket, client.playerId);
        } else {
          this.broadcastRoom(client.roomId, portalPacket, client.playerId);
        }
        break;
      }
    }
  }

  private canVoiceCommunicate(a: ConnectedClient, b: ConnectedClient): boolean {
    if (a.playerId === b.playerId) return false;
    if (a.roomId && a.roomId === b.roomId) return true;
    if (a.partyId && a.partyId === b.partyId) return true;
    return false;
  }

  private broadcastVoiceEligible(sender: ConnectedClient, packet: Record<string, unknown>): void {
    const sent = new Set<string>();
    const payload = JSON.stringify(packet);
    const room = this.rooms.get(sender.roomId);
    if (room) {
      for (const mId of room.members) {
        if (mId === sender.playerId || sent.has(mId)) continue;
        const target = this.clients.get(mId);
        if (target && target.ws.readyState === WebSocket.OPEN) {
          target.ws.send(payload);
          sent.add(mId);
        }
      }
    }
    if (sender.partyId) {
      const party = this.parties.get(sender.partyId);
      if (party) {
        for (const pm of party.members) {
          if (pm.playerId === sender.playerId || sent.has(pm.playerId)) continue;
          const target = this.clients.get(pm.playerId);
          if (target && target.ws.readyState === WebSocket.OPEN) {
            target.ws.send(payload);
            sent.add(pm.playerId);
          }
        }
      }
    }
  }

  private notifyVoiceRosterForPartyOrRoom(client: ConnectedClient): void {
    // Re-announce voice state to eligible peers after room/party membership change
    this.broadcastVoiceEligible(client, {
      type: 'S_VOICE_STATE',
      playerId: client.playerId,
      username: client.profile.username,
      voice: client.voice,
    });
  }

  private joinClientToRoom(client: ConnectedClient, newRoomId: string): void {
    const prevRoomId = client.roomId;
    if (prevRoomId && prevRoomId !== newRoomId) {
      const prevRoom = this.rooms.get(prevRoomId);
      if (prevRoom) {
        prevRoom.members.delete(client.playerId);
        this.broadcastRoom(prevRoomId, {
          type: 'S_PLAYER_LEFT',
          playerId: client.playerId,
          reason: 'SWITCHED_ROOM',
        });
        if (prevRoomId !== DEFAULT_ROOM_ID && prevRoom.members.size === 0) {
          this.rooms.delete(prevRoomId);
        }
      }
    }

    let room = this.rooms.get(newRoomId);
    if (!room) {
      room = createRoomRecord(newRoomId, `World ${newRoomId}`, client.playerId, false);
      this.rooms.set(newRoomId, room);
    }

    client.roomId = newRoomId;
    room.members.add(client.playerId);

    // Expire regrown resources before snapshot
    const now = Date.now();
    for (const [k, v] of room.world1HarvestedTrees) {
      if (v.regrowAt <= now) room.world1HarvestedTrees.delete(k);
    }
    for (const [k, v] of room.world1HarvestedBoulders) {
      if (v.regrowAt <= now) room.world1HarvestedBoulders.delete(k);
    }
    for (const [k, v] of room.darkNodes) {
      if (!v.alive && v.regrowAt > 0 && v.regrowAt <= now) room.darkNodes.delete(k);
    }
    for (const [k, v] of room.darkMonsters) {
      if (!v.alive && v.respawnAt > 0 && v.respawnAt <= now) room.darkMonsters.delete(k);
    }

    const remotePlayers: any[] = [];
    for (const memberId of room.members) {
      if (memberId === client.playerId) continue;
      const peer = this.clients.get(memberId);
      if (peer) {
        remotePlayers.push({
          profile: peer.profile,
          transform: peer.transform,
          voice: peer.voice,
        });
      }
    }

    // Send full authoritative room state to joining player
    this.sendToSocket(client.ws, {
      type: 'S_ROOM_STATE',
      roomId: room.roomId,
      roomName: room.name,
      isPrivate: room.isPrivate,
      hostPlayerId: room.hostPlayerId,
      worldSnapshot: {
        crystals: Array.from(room.crystals),
        shards: Array.from(room.shards),
        inscriptions: Array.from(room.inscriptions),
        isTempleDoorOpen: room.isTempleDoorOpen,
        questProgress: room.questProgress,
        darkProgress: room.darkProgress,
        world1Voxels: Array.from(room.world1Voxels.values()),
        world2Voxels: Array.from(room.world2Voxels.values()),
        world1Enemies: Array.from(room.world1Enemies.entries()).map(([id, st]) => ({ id, ...st })),
        world1HarvestedTrees: Array.from(room.world1HarvestedTrees.values()),
        world1HarvestedBoulders: Array.from(room.world1HarvestedBoulders.values()),
        darkMonsters: Array.from(room.darkMonsters.entries()).map(([spawnId, st]) => ({ spawnId, ...st })),
        darkNodes: Array.from(room.darkNodes.entries()).map(([nodeId, st]) => ({ nodeId, ...st })),
        darkChests: Array.from(room.darkChests),
      },
      remotePlayers,
    });

    // Notify existing room peers
    this.broadcastRoom(
      newRoomId,
      {
        type: 'S_PLAYER_JOINED',
        profile: client.profile,
        transform: client.transform,
        voice: client.voice,
      },
      client.playerId
    );

    this.notifyFriendsAboutPlayer(client.playerId);
  }

  private mergeWorldSnapshotIntoRoom(room: RoomState, delta: any): void {
    if (!delta) return;
    if (Array.isArray(delta.crystals)) {
      for (const id of delta.crystals) room.crystals.add(Number(id));
    }
    if (Array.isArray(delta.shards)) {
      for (const id of delta.shards) room.shards.add(Number(id));
    }
    if (Array.isArray(delta.inscriptions)) {
      for (const id of delta.inscriptions) room.inscriptions.add(Number(id));
    }
    if (typeof delta.isTempleDoorOpen === 'boolean') {
      room.isTempleDoorOpen = delta.isTempleDoorOpen;
    }
    if (delta.questProgress) {
      room.questProgress = delta.questProgress;
    }
    if (delta.darkProgress) {
      room.darkProgress = delta.darkProgress;
    }
    if (Array.isArray(delta.world1Voxels)) {
      for (const b of delta.world1Voxels) {
        room.world1Voxels.set(makeVoxelKey(b.gx, b.gy, b.gz), b);
      }
    }
    if (Array.isArray(delta.world2Voxels)) {
      for (const b of delta.world2Voxels) {
        room.world2Voxels.set(makeVoxelKey(b.gx, b.gy, b.gz), b);
      }
    }
  }

  private removeClientFromParty(client: ConnectedClient): void {
    if (!client.partyId) return;
    const partyId = client.partyId;
    const party = this.parties.get(partyId);
    client.partyId = null;
    if (!party) return;

    party.members = party.members.filter((m) => m.playerId !== client.playerId);
    if (party.members.length === 0) {
      this.parties.delete(partyId);
      return;
    }
    if (party.leaderId === client.playerId) {
      party.leaderId = party.members[0].playerId;
      party.members[0].isLeader = true;
    }
    this.syncPartyState(partyId);
  }

  private syncPartyState(partyId: string): void {
    const party = this.parties.get(partyId);
    if (!party) return;
    this.broadcastParty(partyId, {
      type: 'S_PARTY_STATE',
      party,
    });
  }

  private removeClient(client: ConnectedClient, reason: string): void {
    const room = this.rooms.get(client.roomId);
    if (room) {
      room.members.delete(client.playerId);
      this.broadcastRoom(client.roomId, {
        type: 'S_PLAYER_LEFT',
        playerId: client.playerId,
        reason,
      });
      if (client.roomId !== DEFAULT_ROOM_ID && room.members.size === 0) {
        this.rooms.delete(client.roomId);
      }
    }

    this.removeClientFromParty(client);
    this.clients.delete(client.playerId);
    this.notifyFriendsAboutPlayer(client.playerId);
    this.broadcastRoomList();
  }

  private buildFriendEntry(c: ConnectedClient) {
    return {
      playerId: c.playerId,
      username: c.profile.username,
      characterClass: c.profile.characterClass,
      auraColor: c.profile.auraColor,
      online: true,
      roomId: c.roomId,
      partyId: c.partyId,
      realm: c.transform.realm,
      lastSeen: Date.now(),
    };
  }

  private sendFriendsStatusTo(client: ConnectedClient): void {
    const statuses: any[] = [];
    for (const fid of client.friendIds) {
      const target = this.clients.get(fid);
      if (target) {
        statuses.push(this.buildFriendEntry(target));
      } else {
        statuses.push({
          playerId: fid,
          username: fid,
          characterClass: 'SPIRIT_WEAVER',
          auraColor: '#00f5d4',
          online: false,
          roomId: null,
          partyId: null,
          realm: 'ISLAND',
          lastSeen: 0,
        });
      }
    }
    this.sendToSocket(client.ws, {
      type: 'S_FRIENDS_STATUS',
      friends: statuses,
    });
  }

  private notifyFriendsAboutPlayer(changedPlayerId: string): void {
    for (const c of this.clients.values()) {
      if (c.friendIds.has(changedPlayerId)) {
        this.sendFriendsStatusTo(c);
      }
    }
  }

  private getRoomListPayload() {
    return Array.from(this.rooms.values()).map((r) => ({
      roomId: r.roomId,
      name: r.name,
      playerCount: r.members.size,
      isPrivate: r.isPrivate,
    }));
  }

  private sendRoomListTo(client: ConnectedClient): void {
    this.sendToSocket(client.ws, {
      type: 'S_ROOM_LIST',
      rooms: this.getRoomListPayload(),
    });
  }

  private broadcastRoomList(): void {
    const payload = JSON.stringify({
      type: 'S_ROOM_LIST',
      rooms: this.getRoomListPayload(),
    });
    for (const c of this.clients.values()) {
      if (c.ws.readyState === WebSocket.OPEN) {
        c.ws.send(payload);
      }
    }
  }
}

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json());

  const mpServer = new EchoMultiplayerServer();
  const localCloudSaves = new Map<string, { save: unknown; darkProgress: unknown; updatedAt: number }>();

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'echo-multiplayer', timestamp: Date.now() });
  });

  app.post('/api/auth/session', (req, res) => {
    const playerId = String(req.body?.playerId || req.body?.profile?.id || '').trim();
    if (!playerId) {
      res.status(400).json({ ok: false, error: 'Missing playerId' });
      return;
    }
    const existing = localCloudSaves.get(playerId);
    res.json({
      ok: true,
      playerId,
      token: `local_${playerId}_${Date.now()}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      cloudUpdatedAt: existing?.updatedAt || 0,
    });
  });

  app.get('/api/player/save', (req, res) => {
    const auth = String(req.headers.authorization || '');
    const token = auth.replace(/^Bearer\s+/i, '');
    const match = token.match(/^local_(.+)_\d+$/);
    const pid = match?.[1];
    if (!pid) {
      res.status(401).json({ ok: false, error: 'Unauthorized' });
      return;
    }
    const entry = localCloudSaves.get(pid);
    res.json({
      ok: true,
      save: entry?.save ?? null,
      darkProgress: entry?.darkProgress ?? null,
      updatedAt: entry?.updatedAt ?? 0,
    });
  });

  app.post('/api/player/save', (req, res) => {
    const auth = String(req.headers.authorization || '');
    const token = auth.replace(/^Bearer\s+/i, '');
    const match = token.match(/^local_(.+)_\d+$/);
    const pid = match?.[1];
    if (!pid) {
      res.status(401).json({ ok: false, error: 'Unauthorized' });
      return;
    }
    const updatedAt = Date.now();
    localCloudSaves.set(pid, {
      save: req.body?.save ?? null,
      darkProgress: req.body?.darkProgress ?? null,
      updatedAt,
    });
    res.json({ ok: true, updatedAt });
  });

  const server = http.createServer(app);
  const wss = new WebSocketServer({ server, path: '/ws' });
  wss.on('connection', (ws) => {
    mpServer.handleConnection(ws);
  });

  const distDir = path.resolve(__dirname, 'dist');
  const useProdStatic = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(distDir, 'index.html'));

  if (useProdStatic) {
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false, ws: false },
      appType: 'spa',
    });
    app.get('/@vite/client', async (_req, res, next) => {
      try {
        const result = await vite.transformRequest('/@vite/client');
        if (result?.code) {
          const patchedCode = result.code.replace(
            'transport.connect(createHMRHandler(handleMessage))',
            'Promise.resolve()'
          );
          res.setHeader('Cache-Control', 'no-cache');
          res.type('application/javascript').send(patchedCode);
          return;
        }
      } catch {
        // Fallback to Vite middleware
      }
      next();
    });
    app.use(vite.middlewares);
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[ECHO Server] Running on http://0.0.0.0:${PORT} (WebSocket /ws ready)`);
  });
}

startServer().catch((err) => {
  console.error('[ECHO Server] Fatal startup error:', err);
  process.exit(1);
});
