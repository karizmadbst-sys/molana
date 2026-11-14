import { DurableObject } from 'cloudflare:workers';
import { hashPasscode, verifySessionToken } from './auth.ts';
import {
  Env,
  PlacedVoxelData,
  PlayerAccountProfile,
  RealmId,
  RoomWorldSnapshot,
  SessionAttachment,
  defaultTransform,
  generateCode,
  sanitizeRoomId,
} from './types.ts';

interface RoomMeta {
  roomId: string;
  name: string;
  hostPlayerId: string;
  isPrivate: boolean;
  passcodeHash: string | null;
  createdAt: number;
}

interface RoomSnapshotInternal {
  crystals: number[];
  shards: number[];
  inscriptions: number[];
  isTempleDoorOpen: boolean;
  questProgress: unknown | null;
  darkProgress: unknown | null;
  world1Voxels: PlacedVoxelData[];
  world2Voxels: PlacedVoxelData[];
  world1Enemies: { id: string; hp: number; maxHp: number; isDead: boolean }[];
  world1HarvestedTrees: { x: number; z: number; regrowAt: number }[];
  world1HarvestedBoulders: { x: number; z: number; regrowAt: number }[];
  darkMonsters: { spawnId: number; hp: number; maxHp: number; alive: boolean; respawnAt: number }[];
  darkNodes: { nodeId: number; hp: number; alive: boolean; regrowAt: number }[];
  darkChests: string[];
}

function emptySnapshot(): RoomSnapshotInternal {
  return {
    crystals: [],
    shards: [],
    inscriptions: [],
    isTempleDoorOpen: false,
    questProgress: null,
    darkProgress: null,
    world1Voxels: [],
    world2Voxels: [],
    world1Enemies: [],
    world1HarvestedTrees: [],
    world1HarvestedBoulders: [],
    darkMonsters: [],
    darkNodes: [],
    darkChests: [],
  };
}

function makeVoxelKey(gx: number, gy: number, gz: number): string {
  return `${Math.round(gx)},${Math.round(gy)},${Math.round(gz)}`;
}

function clampFinite(val: unknown, fallback: number, min = -20000, max = 20000): number {
  const n = Number(val);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

export class EchoRoomDO extends DurableObject<Env> {
  private meta: RoomMeta = {
    roomId: 'ECHO-PUBLIC-1',
    name: 'Forgotten Island · Public Sanctuary',
    hostPlayerId: 'SERVER',
    isPrivate: false,
    passcodeHash: null,
    createdAt: Date.now(),
  };

  private crystals = new Set<number>();
  private shards = new Set<number>();
  private inscriptions = new Set<number>();
  private isTempleDoorOpen = false;
  private questProgress: unknown | null = null;
  private darkProgress: unknown | null = null;
  private world1Voxels = new Map<string, PlacedVoxelData>();
  private world2Voxels = new Map<string, PlacedVoxelData>();
  private world1Enemies = new Map<string, { hp: number; maxHp: number; isDead: boolean }>();
  private world1HarvestedTrees = new Map<string, { x: number; z: number; regrowAt: number }>();
  private world1HarvestedBoulders = new Map<string, { x: number; z: number; regrowAt: number }>();
  private darkMonsters = new Map<number, { hp: number; maxHp: number; alive: boolean; respawnAt: number }>();
  private darkNodes = new Map<number, { hp: number; alive: boolean; regrowAt: number }>();
  private darkChests = new Set<string>();

  private loaded = false;
  private persistDirty = false;
  private lastD1PersistAt = 0;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }

  private getLobbyStub(): DurableObjectStub {
    return this.env.ECHO_LOBBY.get(this.env.ECHO_LOBBY.idFromName('global'));
  }

  private async callLobby(path: string, body?: unknown): Promise<Record<string, any> | null> {
    try {
      const stub = this.getLobbyStub();
      const res = await stub.fetch(`https://echo-lobby${path}`, {
        method: body === undefined ? 'GET' : 'POST',
        headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      if (!res.ok) return null;
      return (await res.json()) as Record<string, any>;
    } catch {
      return null;
    }
  }

  private async ensureLoaded(roomIdHint?: string): Promise<void> {
    if (this.loaded) return;
    await this.ctx.blockConcurrencyWhile(async () => {
      if (this.loaded) return;
      const savedMeta = await this.ctx.storage.get<RoomMeta>('meta');
      if (savedMeta) {
        this.meta = savedMeta;
      } else if (roomIdHint) {
        const cleanId = sanitizeRoomId(roomIdHint);
        this.meta = {
          roomId: cleanId,
          name:
            cleanId === 'ECHO-PUBLIC-1'
              ? 'Forgotten Island · Public Sanctuary'
              : `Expedition ${cleanId}`,
          hostPlayerId: 'SERVER',
          isPrivate: false,
          passcodeHash: null,
          createdAt: Date.now(),
        };
      }

      const savedSnap = await this.ctx.storage.get<RoomSnapshotInternal>('snapshot');
      if (savedSnap) {
        this.loadFromSnapshotInternal(savedSnap);
      } else if (this.meta.roomId) {
        // Fallback: hydrate from D1 if DO storage was empty (e.g. cold boot or recreated room)
        try {
          const row = await this.env.DB.prepare(
            'SELECT name, host_player_id, is_private, passcode_hash, snapshot_json, created_at FROM rooms WHERE room_id = ? LIMIT 1'
          )
            .bind(this.meta.roomId)
            .first<{
              name: string;
              host_player_id: string;
              is_private: number;
              passcode_hash: string | null;
              snapshot_json: string;
              created_at: number;
            }>();
          if (row) {
            this.meta = {
              roomId: this.meta.roomId,
              name: row.name,
              hostPlayerId: row.host_player_id,
              isPrivate: Boolean(row.is_private),
              passcodeHash: row.passcode_hash,
              createdAt: row.created_at,
            };
            const parsed = JSON.parse(row.snapshot_json) as RoomSnapshotInternal;
            this.loadFromSnapshotInternal(parsed);
          }
        } catch {
          // D1 table might not exist yet on uninitialized setup
        }
      }
      this.loaded = true;
    });
  }

  private loadFromSnapshotInternal(snap: Partial<RoomSnapshotInternal>): void {
    if (Array.isArray(snap.crystals)) snap.crystals.forEach((id) => this.crystals.add(Number(id)));
    if (Array.isArray(snap.shards)) snap.shards.forEach((id) => this.shards.add(Number(id)));
    if (Array.isArray(snap.inscriptions)) snap.inscriptions.forEach((id) => this.inscriptions.add(Number(id)));
    if (typeof snap.isTempleDoorOpen === 'boolean') this.isTempleDoorOpen = snap.isTempleDoorOpen;
    if (snap.questProgress !== undefined) this.questProgress = snap.questProgress;
    if (snap.darkProgress !== undefined) this.darkProgress = snap.darkProgress;

    if (Array.isArray(snap.world1Voxels)) {
      for (const b of snap.world1Voxels) {
        this.world1Voxels.set(makeVoxelKey(b.gx, b.gy, b.gz), b);
      }
    }
    if (Array.isArray(snap.world2Voxels)) {
      for (const b of snap.world2Voxels) {
        this.world2Voxels.set(makeVoxelKey(b.gx, b.gy, b.gz), b);
      }
    }
    if (Array.isArray(snap.world1Enemies)) {
      for (const e of snap.world1Enemies) {
        this.world1Enemies.set(String(e.id), { hp: e.hp, maxHp: e.maxHp, isDead: e.isDead });
      }
    }
    if (Array.isArray(snap.world1HarvestedTrees)) {
      for (const t of snap.world1HarvestedTrees) {
        this.world1HarvestedTrees.set(`${Math.round(t.x * 10)}_${Math.round(t.z * 10)}`, t);
      }
    }
    if (Array.isArray(snap.world1HarvestedBoulders)) {
      for (const b of snap.world1HarvestedBoulders) {
        this.world1HarvestedBoulders.set(`${Math.round(b.x * 10)}_${Math.round(b.z * 10)}`, b);
      }
    }
    if (Array.isArray(snap.darkMonsters)) {
      for (const m of snap.darkMonsters) {
        this.darkMonsters.set(Number(m.spawnId), {
          hp: m.hp,
          maxHp: m.maxHp,
          alive: m.alive,
          respawnAt: m.respawnAt || 0,
        });
      }
    }
    if (Array.isArray(snap.darkNodes)) {
      for (const n of snap.darkNodes) {
        this.darkNodes.set(Number(n.nodeId), {
          hp: n.hp,
          alive: n.alive,
          regrowAt: n.regrowAt || 0,
        });
      }
    }
    if (Array.isArray(snap.darkChests)) {
      for (const cid of snap.darkChests) {
        this.darkChests.add(String(cid));
      }
    }
  }

  private expireRegrownResources(): void {
    const now = Date.now();
    for (const [k, v] of this.world1HarvestedTrees) {
      if (v.regrowAt > 0 && v.regrowAt <= now) this.world1HarvestedTrees.delete(k);
    }
    for (const [k, v] of this.world1HarvestedBoulders) {
      if (v.regrowAt > 0 && v.regrowAt <= now) this.world1HarvestedBoulders.delete(k);
    }
    for (const [k, v] of this.darkNodes) {
      if (!v.alive && v.regrowAt > 0 && v.regrowAt <= now) this.darkNodes.delete(k);
    }
    for (const [k, v] of this.darkMonsters) {
      if (!v.alive && v.respawnAt > 0 && v.respawnAt <= now) this.darkMonsters.delete(k);
    }
  }

  private buildPublicSnapshot(): RoomWorldSnapshot {
    this.expireRegrownResources();
    return {
      crystals: Array.from(this.crystals),
      shards: Array.from(this.shards),
      inscriptions: Array.from(this.inscriptions),
      isTempleDoorOpen: this.isTempleDoorOpen,
      questProgress: this.questProgress ?? undefined,
      darkProgress: this.darkProgress ?? undefined,
      world1Voxels: Array.from(this.world1Voxels.values()),
      world2Voxels: Array.from(this.world2Voxels.values()),
      world1Enemies: Array.from(this.world1Enemies.entries()).map(([id, st]) => ({ id, ...st })),
      world1HarvestedTrees: Array.from(this.world1HarvestedTrees.values()),
      world1HarvestedBoulders: Array.from(this.world1HarvestedBoulders.values()),
      darkMonsters: Array.from(this.darkMonsters.entries()).map(([spawnId, st]) => ({
        spawnId,
        hp: st.hp,
        maxHp: st.maxHp,
        alive: st.alive,
      })),
      darkNodes: Array.from(this.darkNodes.entries()).map(([nodeId, st]) => ({
        nodeId,
        hp: st.hp,
        alive: st.alive,
      })),
      darkChests: Array.from(this.darkChests),
    };
  }

  private buildInternalSnapshot(): RoomSnapshotInternal {
    return {
      crystals: Array.from(this.crystals),
      shards: Array.from(this.shards),
      inscriptions: Array.from(this.inscriptions),
      isTempleDoorOpen: this.isTempleDoorOpen,
      questProgress: this.questProgress,
      darkProgress: this.darkProgress,
      world1Voxels: Array.from(this.world1Voxels.values()),
      world2Voxels: Array.from(this.world2Voxels.values()),
      world1Enemies: Array.from(this.world1Enemies.entries()).map(([id, st]) => ({ id, ...st })),
      world1HarvestedTrees: Array.from(this.world1HarvestedTrees.values()),
      world1HarvestedBoulders: Array.from(this.world1HarvestedBoulders.values()),
      darkMonsters: Array.from(this.darkMonsters.entries()).map(([spawnId, st]) => ({ spawnId, ...st })),
      darkNodes: Array.from(this.darkNodes.entries()).map(([nodeId, st]) => ({ nodeId, ...st })),
      darkChests: Array.from(this.darkChests),
    };
  }

  private schedulePersist(forceD1: boolean = false): void {
    this.persistDirty = true;
    const snap = this.buildInternalSnapshot();
    const metaCopy = { ...this.meta };
    const playerCount = this.getAuthenticatedSockets().length;

    const persistWork = async () => {
      await this.ctx.storage.put('meta', metaCopy);
      await this.ctx.storage.put('snapshot', snap);
      const now = Date.now();
      if (forceD1 || now - this.lastD1PersistAt > 4000) {
        this.lastD1PersistAt = now;
        this.persistDirty = false;
        try {
          await this.env.DB.prepare(
            `INSERT INTO rooms (room_id, name, host_player_id, is_private, passcode_hash, snapshot_json, player_count, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON CONFLICT(room_id) DO UPDATE SET
               name = excluded.name,
               is_private = excluded.is_private,
               passcode_hash = COALESCE(excluded.passcode_hash, rooms.passcode_hash),
               snapshot_json = excluded.snapshot_json,
               player_count = excluded.player_count,
               updated_at = excluded.updated_at`
          )
            .bind(
              metaCopy.roomId,
              metaCopy.name,
              metaCopy.hostPlayerId,
              metaCopy.isPrivate ? 1 : 0,
              metaCopy.passcodeHash,
              JSON.stringify(snap),
              playerCount,
              metaCopy.createdAt,
              now
            )
            .run();
        } catch {
          // Ignore D1 errors when uninitialized
        }
      }
    };

    this.ctx.waitUntil(persistWork());
  }

  private mergeDeltaIntoRoom(delta: Partial<RoomWorldSnapshot>): void {
    if (!delta) return;
    if (Array.isArray(delta.crystals)) {
      delta.crystals.forEach((id) => this.crystals.add(Number(id)));
    }
    if (Array.isArray(delta.shards)) {
      delta.shards.forEach((id) => this.shards.add(Number(id)));
    }
    if (Array.isArray(delta.inscriptions)) {
      delta.inscriptions.forEach((id) => this.inscriptions.add(Number(id)));
    }
    if (typeof delta.isTempleDoorOpen === 'boolean') {
      this.isTempleDoorOpen = delta.isTempleDoorOpen;
    }
    if (delta.questProgress) {
      this.questProgress = delta.questProgress;
    }
    if (delta.darkProgress) {
      this.darkProgress = delta.darkProgress;
    }
    if (Array.isArray(delta.world1Voxels)) {
      for (const b of delta.world1Voxels.slice(0, 1500)) {
        this.world1Voxels.set(makeVoxelKey(b.gx, b.gy, b.gz), {
          gx: Math.round(b.gx),
          gy: Math.round(b.gy),
          gz: Math.round(b.gz),
          kind: String(b.kind || 'wood_plank').slice(0, 32),
          ...(typeof b.rot === 'number' ? { rot: ((Math.round(b.rot) % 4) + 4) % 4 } : {}),
          ...(typeof b.yBase === 'number' && Number.isFinite(b.yBase) ? { yBase: b.yBase } : {}),
        });
      }
    }
    if (Array.isArray(delta.world2Voxels)) {
      for (const b of delta.world2Voxels.slice(0, 1500)) {
        this.world2Voxels.set(makeVoxelKey(b.gx, b.gy, b.gz), {
          gx: Math.round(b.gx),
          gy: Math.round(b.gy),
          gz: Math.round(b.gz),
          kind: String(b.kind || 'wood_plank').slice(0, 32),
          ...(typeof b.rot === 'number' ? { rot: ((Math.round(b.rot) % 4) + 4) % 4 } : {}),
          ...(typeof b.yBase === 'number' && Number.isFinite(b.yBase) ? { yBase: b.yBase } : {}),
        });
      }
    }
  }

  private getAttachment(ws: WebSocket): SessionAttachment | null {
    try {
      return (ws.deserializeAttachment() as SessionAttachment | null) || null;
    } catch {
      return null;
    }
  }

  private setAttachment(ws: WebSocket, att: SessionAttachment): void {
    try {
      ws.serializeAttachment(att);
    } catch {
      // ignore if socket closed
    }
  }

  private getAuthenticatedSockets(): { ws: WebSocket; att: SessionAttachment }[] {
    const out: { ws: WebSocket; att: SessionAttachment }[] = [];
    for (const ws of this.ctx.getWebSockets()) {
      const att = this.getAttachment(ws);
      if (att && att.authenticated && att.playerId) {
        out.push({ ws, att });
      }
    }
    return out;
  }

  private sendPacket(ws: WebSocket, packet: Record<string, unknown>): void {
    try {
      ws.send(JSON.stringify(packet));
    } catch {
      // socket closing
    }
  }

  private broadcastRoom(packet: Record<string, unknown>, excludePlayerId?: string): void {
    const payload = JSON.stringify(packet);
    for (const { ws, att } of this.getAuthenticatedSockets()) {
      if (excludePlayerId && att.playerId === excludePlayerId) continue;
      try {
        ws.send(payload);
      } catch {
        // ignore closed sockets
      }
    }
  }

  private updateLobbyRoomCount(): void {
    const count = this.getAuthenticatedSockets().length;
    this.ctx.waitUntil(
      this.callLobby('/internal/room-update', {
        roomId: this.meta.roomId,
        name: this.meta.name,
        playerCount: count,
        isPrivate: this.meta.isPrivate,
      })
    );
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const roomParam = url.searchParams.get('room');
    await this.ensureLoaded(roomParam || undefined);

    if (url.pathname === '/internal/seed' && request.method === 'POST') {
      const body = (await request.json().catch(() => ({}))) as Record<string, any>;
      const roomId = sanitizeRoomId(body.roomId || this.meta.roomId);
      const name = String(body.name || `Expedition ${roomId}`).slice(0, 60);
      const hostPlayerId = String(body.hostPlayerId || 'SERVER');
      const isPrivate = Boolean(body.isPrivate);
      const passCode = typeof body.passCode === 'string' && body.passCode.trim() ? body.passCode.trim() : null;

      this.meta = {
        roomId,
        name,
        hostPlayerId,
        isPrivate,
        passcodeHash: passCode ? await hashPasscode(passCode) : null,
        createdAt: Date.now(),
      };
      if (body.seedSnapshot) {
        this.mergeDeltaIntoRoom(body.seedSnapshot);
      }
      this.schedulePersist(true);
      this.updateLobbyRoomCount();
      return Response.json({ ok: true, roomId });
    }

    if (url.pathname === '/internal/verify-join' && request.method === 'POST') {
      const body = (await request.json().catch(() => ({}))) as Record<string, any>;
      if (this.meta.isPrivate && this.meta.passcodeHash && body.bypassCode !== true) {
        const providedHash = body.passCode ? await hashPasscode(String(body.passCode)) : '';
        if (providedHash !== this.meta.passcodeHash) {
          return Response.json({ ok: false, code: 'WRONG_PASSCODE', message: 'Incorrect room passcode' });
        }
      }
      return Response.json({ ok: true, roomId: this.meta.roomId, roomName: this.meta.name });
    }

    if (url.pathname === '/internal/push' && request.method === 'POST') {
      const body = (await request.json().catch(() => ({}))) as {
        targetPlayerId?: string | null;
        excludePlayerId?: string;
        packet: Record<string, unknown>;
      };
      if (!body.packet) return Response.json({ ok: false }, { status: 400 });

      if (body.targetPlayerId) {
        for (const { ws, att } of this.getAuthenticatedSockets()) {
          if (att.playerId === body.targetPlayerId) {
            this.sendPacket(ws, body.packet);
          }
        }
      } else {
        this.broadcastRoom(body.packet, body.excludePlayerId);
      }
      return Response.json({ ok: true });
    }

    // Handle WebSocket Upgrade
    if (request.headers.get('Upgrade')?.toLowerCase() === 'websocket') {
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      const urlToken = url.searchParams.get('token');
      let verifiedPid = '';
      if (urlToken) {
        const payload = await verifySessionToken(this.env, urlToken);
        if (payload) {
          verifiedPid = payload.pid;
        }
      }

      const initialAttachment: SessionAttachment = {
        playerId: verifiedPid,
        profile: {
          id: verifiedPid || 'pending',
          username: 'Adventurer',
          titleAr: 'مستكشف الأثير',
          titleEn: 'Spirit Pioneer',
          characterClass: 'SPIRIT_WEAVER',
          robeColor: '#1d4ed8',
          auraColor: '#00f5d4',
          level: 1,
          echoMastery: 0,
          createdAt: Date.now(),
          lastActive: Date.now(),
        },
        transform: defaultTransform(),
        partyId: null,
        friendIds: [],
        voice: { enabled: false, muted: false, speaking: false },
        authenticated: false,
        connectedAt: Date.now(),
        msgCountWindow: 0,
        msgWindowStart: Date.now(),
      };

      this.ctx.acceptWebSocket(server);
      server.serializeAttachment(initialAttachment);

      return new Response(null, { status: 101, webSocket: client });
    }

    return Response.json({
      ok: true,
      roomId: this.meta.roomId,
      name: this.meta.name,
      players: this.getAuthenticatedSockets().length,
    });
  }

  async webSocketMessage(ws: WebSocket, rawMessage: string | ArrayBuffer): Promise<void> {
    await this.ensureLoaded();
    let att = this.getAttachment(ws);
    if (!att) return;

    // Simple per-socket rate limiting: max 90 packets/sec (allow burst for 20Hz transform + actions)
    const now = Date.now();
    if (now - att.msgWindowStart > 1000) {
      att.msgWindowStart = now;
      att.msgCountWindow = 0;
    }
    att.msgCountWindow++;
    if (att.msgCountWindow > 95) {
      this.setAttachment(ws, att);
      return;
    }

    let packet: any;
    try {
      const text = typeof rawMessage === 'string' ? rawMessage : new TextDecoder().decode(rawMessage);
      if (text.length > 128_000) {
        this.sendPacket(ws, { type: 'S_ERROR', code: 'PAYLOAD_TOO_LARGE', message: 'Packet exceeds 128KB limit' });
        return;
      }
      packet = JSON.parse(text);
    } catch {
      this.sendPacket(ws, { type: 'S_ERROR', code: 'BAD_JSON', message: 'Invalid JSON packet' });
      return;
    }

    if (!packet || typeof packet.type !== 'string') return;

    if (packet.type === 'C_PING') {
      this.setAttachment(ws, att);
      this.sendPacket(ws, {
        type: 'S_PONG',
        clientTime: packet.clientTime || Date.now(),
        serverTime: Date.now(),
      });
      return;
    }

    if (packet.type === 'C_AUTH') {
      const profile = packet.profile as PlayerAccountProfile;
      if (!profile || typeof profile.id !== 'string' || !profile.id.trim()) {
        this.sendPacket(ws, {
          type: 'S_AUTH_ACK',
          success: false,
          sessionPlayerId: '',
          error: 'Missing player profile id',
        });
        return;
      }

      // If client supplied a signed session token, verify ownership of profile.id
      if (typeof packet.token === 'string' && packet.token.trim()) {
        const tokenPayload = await verifySessionToken(this.env, packet.token.trim());
        if (!tokenPayload || tokenPayload.pid !== profile.id) {
          this.sendPacket(ws, {
            type: 'S_AUTH_ACK',
            success: false,
            sessionPlayerId: '',
            error: 'Invalid or expired authentication token',
          });
          return;
        }
      } else if (att.playerId && att.playerId !== 'pending' && att.playerId !== profile.id) {
        this.sendPacket(ws, {
          type: 'S_AUTH_ACK',
          success: false,
          sessionPlayerId: '',
          error: 'Token mismatch for player session',
        });
        return;
      }

      // Close older socket for same player inside this room if reconnecting quickly
      for (const existing of this.getAuthenticatedSockets()) {
        if (existing.ws !== ws && existing.att.playerId === profile.id) {
          try {
            existing.ws.close(4001, 'Superseded by newer session');
          } catch {
            // ignore
          }
        }
      }

      const cleanProfile: PlayerAccountProfile = {
        id: profile.id.trim().slice(0, 80),
        username: String(profile.username || 'Adventurer').trim().slice(0, 28) || 'Adventurer',
        titleAr: String(profile.titleAr || 'مستكشف الأثير').slice(0, 60),
        titleEn: String(profile.titleEn || 'Spirit Pioneer').slice(0, 60),
        characterClass: String(profile.characterClass || 'SPIRIT_WEAVER').slice(0, 32),
        robeColor: String(profile.robeColor || '#1d4ed8').slice(0, 16),
        auraColor: String(profile.auraColor || '#00f5d4').slice(0, 16),
        level: clampFinite(profile.level, 1, 1, 999),
        echoMastery: clampFinite(profile.echoMastery, 0, 0, 9999999),
        createdAt: Number(profile.createdAt) || now,
        lastActive: now,
      };

      const friendIds: string[] = Array.isArray(packet.friendIds)
        ? packet.friendIds.filter((x: unknown): x is string => typeof x === 'string').slice(0, 120)
        : [];

      att = {
        ...att,
        playerId: cleanProfile.id,
        profile: cleanProfile,
        friendIds,
        authenticated: true,
      };

      // Upsert player into D1 non-blockingly
      this.ctx.waitUntil(
        this.env.DB.prepare(
          `INSERT INTO players (id, username, title_ar, title_en, character_class, robe_color, aura_color, level, echo_mastery, last_room_id, last_realm, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET
             username = excluded.username,
             title_ar = excluded.title_ar,
             title_en = excluded.title_en,
             character_class = excluded.character_class,
             robe_color = excluded.robe_color,
             aura_color = excluded.aura_color,
             level = excluded.level,
             echo_mastery = excluded.echo_mastery,
             last_room_id = excluded.last_room_id,
             updated_at = excluded.updated_at`
        )
          .bind(
            cleanProfile.id,
            cleanProfile.username,
            cleanProfile.titleAr,
            cleanProfile.titleEn,
            cleanProfile.characterClass,
            cleanProfile.robeColor,
            cleanProfile.auraColor,
            cleanProfile.level,
            cleanProfile.echoMastery,
            this.meta.roomId,
            att.transform.realm,
            cleanProfile.createdAt,
            now
          )
          .run()
          .catch(() => {})
      );

      // Register presence & fetch friends/party/rooms from EchoLobbyDO
      const lobbyRes = await this.callLobby('/internal/presence-upsert', {
        profile: cleanProfile,
        roomId: this.meta.roomId,
        realm: att.transform.realm,
        hp: att.transform.hp,
        maxHp: att.transform.maxHp,
        friendIds,
        voice: att.voice,
      });

      if (lobbyRes?.party?.partyId) {
        att.partyId = lobbyRes.party.partyId;
      }
      this.setAttachment(ws, att);

      this.sendPacket(ws, {
        type: 'S_AUTH_ACK',
        success: true,
        sessionPlayerId: cleanProfile.id,
      });

      // Build remotePlayers currently in this room
      const remotePlayers = this.getAuthenticatedSockets()
        .filter((item) => item.att.playerId !== cleanProfile.id)
        .map((item) => ({
          profile: item.att.profile,
          transform: item.att.transform,
          voice: item.att.voice,
        }));

      this.sendPacket(ws, {
        type: 'S_ROOM_STATE',
        roomId: this.meta.roomId,
        roomName: this.meta.name,
        isPrivate: this.meta.isPrivate,
        hostPlayerId: this.meta.hostPlayerId,
        worldSnapshot: this.buildPublicSnapshot(),
        remotePlayers,
      });

      // Broadcast join to peers in this room
      this.broadcastRoom(
        {
          type: 'S_PLAYER_JOINED',
          profile: cleanProfile,
          transform: att.transform,
          voice: att.voice,
        },
        cleanProfile.id
      );

      if (lobbyRes?.rooms) {
        this.sendPacket(ws, { type: 'S_ROOM_LIST', rooms: lobbyRes.rooms });
      }
      if (lobbyRes?.friends) {
        this.sendPacket(ws, { type: 'S_FRIENDS_STATUS', friends: lobbyRes.friends });
      }
      if (lobbyRes?.party) {
        this.sendPacket(ws, { type: 'S_PARTY_STATE', party: lobbyRes.party });
      }

      // Send recent persistent chat history from D1 (last 15 room messages)
      this.ctx.waitUntil(
        this.env.DB.prepare(
          'SELECT id, sender_id, sender_name, sender_color, realm, channel, text, created_at FROM chat_history WHERE room_id = ? ORDER BY created_at DESC LIMIT 15'
        )
          .bind(this.meta.roomId)
          .all<{
            id: string;
            sender_id: string;
            sender_name: string;
            sender_color: string;
            realm: string;
            channel: string;
            text: string;
            created_at: number;
          }>()
          .then((res) => {
            const rows = (res.results || []).reverse();
            for (const row of rows) {
              this.sendPacket(ws, {
                type: 'S_CHAT_BROADCAST',
                id: row.id,
                senderId: row.sender_id,
                senderName: row.sender_name,
                senderColor: row.sender_color,
                realm: row.realm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND',
                channel: 'ROOM',
                text: row.text,
                timestamp: row.created_at,
              });
            }
          })
          .catch(() => {})
      );

      this.updateLobbyRoomCount();
      return;
    }

    if (!att.authenticated || !att.playerId) {
      this.sendPacket(ws, { type: 'S_ERROR', code: 'UNAUTHENTICATED', message: 'Authenticate with C_AUTH first' });
      return;
    }

    switch (packet.type) {
      case 'C_UPDATE_PROFILE': {
        if (!packet.profile) break;
        att.profile = {
          ...att.profile,
          ...packet.profile,
          id: att.playerId,
          username: String(packet.profile.username || att.profile.username).trim().slice(0, 28),
          lastActive: now,
        };
        this.setAttachment(ws, att);
        this.broadcastRoom(
          {
            type: 'S_PLAYER_PROFILE_UPDATED',
            playerId: att.playerId,
            profile: att.profile,
          },
          att.playerId
        );
        this.ctx.waitUntil(
          this.callLobby('/internal/presence-upsert', {
            profile: att.profile,
            roomId: this.meta.roomId,
            realm: att.transform.realm,
            hp: att.transform.hp,
            maxHp: att.transform.maxHp,
            friendIds: att.friendIds,
            voice: att.voice,
          })
        );
        this.ctx.waitUntil(
          this.env.DB.prepare(
            'UPDATE players SET username = ?, character_class = ?, robe_color = ?, aura_color = ?, updated_at = ? WHERE id = ?'
          )
            .bind(
              att.profile.username,
              att.profile.characterClass,
              att.profile.robeColor,
              att.profile.auraColor,
              now,
              att.playerId
            )
            .run()
            .catch(() => {})
        );
        break;
      }

      case 'C_LIST_ROOMS': {
        const res = await this.callLobby('/internal/rooms');
        this.sendPacket(ws, {
          type: 'S_ROOM_LIST',
          rooms: res?.rooms || [],
        });
        break;
      }

      case 'C_ROOM_CREATE': {
        const roomId = generateCode('ROOM', 5);
        const roomName = String(packet.name || `${att.profile.username}'s World`).trim().slice(0, 50);
        const isPrivate = Boolean(packet.isPrivate);
        const passCode = isPrivate ? String(packet.passCode || '').trim() || undefined : undefined;

        const targetStub = this.env.ECHO_ROOM.get(this.env.ECHO_ROOM.idFromName(roomId));
        await targetStub.fetch(`https://echo-room/internal/seed?room=${encodeURIComponent(roomId)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId,
            name: roomName,
            hostPlayerId: att.playerId,
            isPrivate,
            passCode,
            seedSnapshot: packet.seedSnapshot,
          }),
        });

        this.sendPacket(ws, {
          type: 'S_SWITCH_ROOM',
          roomId,
          roomName,
          passCode,
          bypassCode: true,
        });
        break;
      }

      case 'C_JOIN_ROOM': {
        const targetRoomId = sanitizeRoomId(packet.roomId);
        if (targetRoomId === this.meta.roomId) {
          this.sendPacket(ws, {
            type: 'S_ROOM_STATE',
            roomId: this.meta.roomId,
            roomName: this.meta.name,
            isPrivate: this.meta.isPrivate,
            hostPlayerId: this.meta.hostPlayerId,
            worldSnapshot: this.buildPublicSnapshot(),
            remotePlayers: this.getAuthenticatedSockets()
              .filter((item) => item.att.playerId !== att!.playerId)
              .map((item) => ({
                profile: item.att.profile,
                transform: item.att.transform,
                voice: item.att.voice,
              })),
          });
          break;
        }

        const targetStub = this.env.ECHO_ROOM.get(this.env.ECHO_ROOM.idFromName(targetRoomId));
        const verifyRes = await targetStub.fetch(
          `https://echo-room/internal/verify-join?room=${encodeURIComponent(targetRoomId)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ passCode: packet.passCode, bypassCode: packet.bypassCode }),
          }
        );
        const verifyJson = (await verifyRes.json()) as {
          ok: boolean;
          code?: string;
          message?: string;
          roomName?: string;
        };
        if (!verifyJson.ok) {
          this.sendPacket(ws, {
            type: 'S_ERROR',
            code: verifyJson.code || 'JOIN_DENIED',
            message: verifyJson.message || 'Could not join room',
          });
          break;
        }

        this.sendPacket(ws, {
          type: 'S_SWITCH_ROOM',
          roomId: targetRoomId,
          roomName: verifyJson.roomName || targetRoomId,
          passCode: packet.passCode,
          bypassCode: Boolean(packet.bypassCode),
        });
        break;
      }

      case 'C_LEAVE_ROOM': {
        if (this.meta.roomId !== 'ECHO-PUBLIC-1') {
          this.sendPacket(ws, {
            type: 'S_SWITCH_ROOM',
            roomId: 'ECHO-PUBLIC-1',
            roomName: 'Forgotten Island · Public Sanctuary',
            bypassCode: true,
          });
        }
        break;
      }

      case 'C_SYNC_TRANSFORM': {
        if (!packet.transform) break;
        const prevRealm = att.transform.realm;
        const t = packet.transform;
        const nextRealm: RealmId = t.realm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND';

        att.transform = {
          x: clampFinite(t.x, att.transform.x, -4000, 4000),
          y: clampFinite(t.y, att.transform.y, -500, 2000),
          z: clampFinite(t.z, att.transform.z, -4000, 4000),
          vx: clampFinite(t.vx, 0, -200, 200),
          vy: clampFinite(t.vy, 0, -200, 200),
          vz: clampFinite(t.vz, 0, -200, 200),
          facingAngle: clampFinite(t.facingAngle, 0, -100, 100),
          isGrounded: Boolean(t.isGrounded),
          isMoving: Boolean(t.isMoving),
          isSprinting: Boolean(t.isSprinting),
          actionState: String(t.actionState || 'IDLE').slice(0, 24),
          comboStep: clampFinite(t.comboStep, 1, 1, 10),
          realm: nextRealm,
          hp: typeof t.hp === 'number' ? clampFinite(t.hp, 100, 0, 99999) : att.transform.hp,
          maxHp: typeof t.maxHp === 'number' ? clampFinite(t.maxHp, 100, 1, 99999) : att.transform.maxHp,
          weapon: t.weapon === 'pistol' || t.weapon === 'bow' ? t.weapon : 'sword',
          isBlocking: Boolean(t.isBlocking),
          isAiming: Boolean(t.isAiming),
          bowDraw: typeof t.bowDraw === 'number' ? clampFinite(t.bowDraw, 0, 0, 2) : 0,
          timestamp: now,
        };
        this.setAttachment(ws, att);

        if (prevRealm !== nextRealm) {
          this.ctx.waitUntil(
            this.callLobby('/internal/presence-upsert', {
              profile: att.profile,
              roomId: this.meta.roomId,
              realm: nextRealm,
              hp: att.transform.hp,
              maxHp: att.transform.maxHp,
              friendIds: att.friendIds,
              voice: att.voice,
            })
          );
          this.ctx.waitUntil(
            this.env.DB.prepare('UPDATE players SET last_realm = ?, updated_at = ? WHERE id = ?')
              .bind(nextRealm, now, att.playerId)
              .run()
              .catch(() => {})
          );
        }

        this.broadcastRoom(
          {
            type: 'S_REMOTE_TRANSFORM',
            playerId: att.playerId,
            transform: att.transform,
          },
          att.playerId
        );
        break;
      }

      case 'C_COMBAT_ATTACK': {
        this.broadcastRoom(
          {
            type: 'S_REMOTE_ATTACK',
            playerId: att.playerId,
            comboStep: clampFinite(packet.comboStep, 1, 1, 6),
            origin: packet.origin,
            facingAngle: clampFinite(packet.facingAngle, 0, -100, 100),
          },
          att.playerId
        );
        break;
      }

      case 'C_WEAPON_SHOT': {
        this.broadcastRoom(
          {
            type: 'S_REMOTE_SHOT',
            playerId: att.playerId,
            realm: att.transform.realm,
            weapon: packet.weapon === 'bow' ? 'bow' : 'pistol',
            origin: {
              x: clampFinite(packet.origin?.x, 0),
              y: clampFinite(packet.origin?.y, 0),
              z: clampFinite(packet.origin?.z, 0),
            },
            dir: {
              x: clampFinite(packet.dir?.x, 0, -2, 2),
              y: clampFinite(packet.dir?.y, 0, -2, 2),
              z: clampFinite(packet.dir?.z, 1, -2, 2),
            },
            power: clampFinite(packet.power, 1.0, 0.1, 3.0),
          },
          att.playerId
        );
        break;
      }

      case 'C_COMBAT_DODGE': {
        this.broadcastRoom(
          {
            type: 'S_REMOTE_DODGE',
            playerId: att.playerId,
            direction: packet.direction,
          },
          att.playerId
        );
        break;
      }

      case 'C_COMBAT_PULSE': {
        this.broadcastRoom(
          {
            type: 'S_REMOTE_PULSE',
            playerId: att.playerId,
            origin: packet.origin,
          },
          att.playerId
        );
        break;
      }

      case 'C_PORTAL_TRAVEL': {
        const targetRealm: RealmId = packet.targetRealm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND';
        const scope: 'PARTY' | 'ROOM' = packet.scope === 'PARTY' ? 'PARTY' : 'ROOM';
        const portalPacket = {
          type: 'S_PORTAL_TRAVEL',
          initiatorId: att.playerId,
          initiatorName: att.profile.username,
          targetRealm,
          scope,
          crystalsCount: this.crystals.size,
          timestamp: now,
        };
        if (scope === 'PARTY' && att.partyId) {
          await this.callLobby('/internal/portal-party', {
            initiatorId: att.playerId,
            packet: portalPacket,
          });
        } else {
          this.broadcastRoom(portalPacket, att.playerId);
        }
        break;
      }

      case 'C_VOXEL_UPDATE': {
        const realm: RealmId = packet.realm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND';
        const voxelMap = realm === 'DARK_REALM' ? this.world2Voxels : this.world1Voxels;
        const rawBlocks: PlacedVoxelData[] = Array.isArray(packet.blocks) ? packet.blocks.slice(0, 250) : [];
        const sanitizedBlocks: PlacedVoxelData[] = [];

        if (packet.op === 'PLACE') {
          for (const b of rawBlocks) {
            const cleanBlock: PlacedVoxelData = {
              gx: Math.round(clampFinite(b.gx, 0, -2000, 2000)),
              gy: Math.round(clampFinite(b.gy, 0, -200, 500)),
              gz: Math.round(clampFinite(b.gz, 0, -2000, 2000)),
              kind: String(b.kind || 'wood_plank').slice(0, 32),
              ...(typeof b.rot === 'number' ? { rot: ((Math.round(b.rot) % 4) + 4) % 4 } : {}),
              ...(typeof b.yBase === 'number' && Number.isFinite(b.yBase) ? { yBase: b.yBase } : {}),
            };
            voxelMap.set(makeVoxelKey(cleanBlock.gx, cleanBlock.gy, cleanBlock.gz), cleanBlock);
            sanitizedBlocks.push(cleanBlock);
          }
        } else if (packet.op === 'REMOVE') {
          for (const b of rawBlocks) {
            const cleanBlock: PlacedVoxelData = {
              gx: Math.round(clampFinite(b.gx, 0, -2000, 2000)),
              gy: Math.round(clampFinite(b.gy, 0, -200, 500)),
              gz: Math.round(clampFinite(b.gz, 0, -2000, 2000)),
              kind: String(b.kind || 'wood_plank').slice(0, 32),
            };
            voxelMap.delete(makeVoxelKey(cleanBlock.gx, cleanBlock.gy, cleanBlock.gz));
            sanitizedBlocks.push(cleanBlock);
          }
        }

        if (sanitizedBlocks.length > 0) {
          this.schedulePersist(false);
          this.broadcastRoom(
            {
              type: 'S_VOXEL_UPDATE',
              senderId: att.playerId,
              realm,
              op: packet.op === 'REMOVE' ? 'REMOVE' : 'PLACE',
              blocks: sanitizedBlocks,
            },
            att.playerId
          );
        }
        break;
      }

      case 'C_WORLD_PROGRESS_UPDATE': {
        if (!packet.delta) break;
        this.mergeDeltaIntoRoom(packet.delta);
        this.schedulePersist(false);
        this.broadcastRoom(
          {
            type: 'S_WORLD_PROGRESS_UPDATE',
            senderId: att.playerId,
            delta: packet.delta,
          },
          att.playerId
        );
        break;
      }

      case 'C_ENEMY_DAMAGE': {
        const realm: RealmId = packet.realm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND';
        if (realm === 'ISLAND') {
          const enemyId = String(packet.enemyId || '');
          const hp = Math.max(0, clampFinite(packet.hp, 0, 0, 100000));
          const maxHp = Math.max(1, clampFinite(packet.maxHp, 120, 1, 100000));
          const isDead = Boolean(packet.isDead || hp <= 0);
          this.world1Enemies.set(enemyId, { hp, maxHp, isDead });
          this.broadcastRoom(
            {
              type: 'S_ENEMY_STATE',
              senderId: att.playerId,
              realm,
              enemyId,
              hp,
              maxHp,
              isDead,
              pos: packet.pos,
            },
            att.playerId
          );
        } else {
          const spawnId = Number(packet.spawnId);
          const hp = Math.max(0, clampFinite(packet.hp, 0, 0, 100000));
          const maxHp = Math.max(1, clampFinite(packet.maxHp, 100, 1, 100000));
          const alive = Boolean(packet.alive && hp > 0);
          this.darkMonsters.set(spawnId, {
            hp,
            maxHp,
            alive,
            respawnAt: alive ? 0 : now + 45000,
          });
          this.broadcastRoom(
            {
              type: 'S_ENEMY_STATE',
              senderId: att.playerId,
              realm,
              spawnId,
              hp,
              maxHp,
              alive,
              pos: packet.pos,
            },
            att.playerId
          );
        }
        break;
      }

      case 'C_RESOURCE_HIT': {
        if (
          packet.resourceType === 'WORLD1_TREE' &&
          typeof packet.x === 'number' &&
          typeof packet.z === 'number'
        ) {
          if (packet.destroyed) {
            this.world1HarvestedTrees.set(`${Math.round(packet.x * 10)}_${Math.round(packet.z * 10)}`, {
              x: packet.x,
              z: packet.z,
              regrowAt: now + 45000,
            });
          }
        } else if (
          packet.resourceType === 'WORLD1_BOULDER' &&
          typeof packet.x === 'number' &&
          typeof packet.z === 'number'
        ) {
          if (packet.destroyed) {
            this.world1HarvestedBoulders.set(`${Math.round(packet.x * 10)}_${Math.round(packet.z * 10)}`, {
              x: packet.x,
              z: packet.z,
              regrowAt: now + 45000,
            });
          }
        } else if (packet.resourceType === 'DARK_NODE' && typeof packet.nodeId === 'number') {
          this.darkNodes.set(packet.nodeId, {
            hp: Math.max(0, Number(packet.hp ?? 0)),
            alive: !packet.destroyed,
            regrowAt: packet.destroyed ? now + 35000 : 0,
          });
        } else if (packet.resourceType === 'DARK_CHEST' && typeof packet.chestId === 'string') {
          this.darkChests.add(packet.chestId);
          this.schedulePersist(false);
        }

        this.broadcastRoom(
          {
            ...packet,
            type: 'S_RESOURCE_STATE',
            senderId: att.playerId,
          },
          att.playerId
        );
        break;
      }

      case 'C_CHAT_MESSAGE': {
        const rawText = String(packet.text || '').trim().slice(0, 320);
        if (!rawText) break;
        const channel =
          packet.channel === 'PARTY'
            ? 'PARTY'
            : packet.channel === 'FRIENDS'
              ? 'FRIENDS'
              : 'ROOM';
        const chatPacket = {
          type: 'S_CHAT_BROADCAST',
          id: `msg_${now}_${Math.random().toString(36).slice(2, 6)}`,
          senderId: att.playerId,
          senderName: att.profile.username,
          senderColor: att.profile.auraColor || '#00f5d4',
          realm: att.transform.realm,
          channel,
          text: rawText,
          timestamp: now,
        };

        if (channel === 'ROOM') {
          this.broadcastRoom(chatPacket);
          this.ctx.waitUntil(
            this.env.DB.prepare(
              'INSERT INTO chat_history (id, room_id, sender_id, sender_name, sender_color, realm, channel, text, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
            )
              .bind(
                chatPacket.id,
                this.meta.roomId,
                chatPacket.senderId,
                chatPacket.senderName,
                chatPacket.senderColor,
                chatPacket.realm,
                'ROOM',
                chatPacket.text,
                now
              )
              .run()
              .catch(() => {})
          );
        } else {
          await this.callLobby('/internal/cross-chat', {
            senderId: att.playerId,
            channel,
            packet: chatPacket,
          });
        }
        break;
      }

      case 'C_PARTY_CREATE': {
        const res = await this.callLobby('/internal/party-create', { playerId: att.playerId });
        if (res?.party?.partyId) {
          att.partyId = res.party.partyId;
          this.setAttachment(ws, att);
        }
        break;
      }

      case 'C_PARTY_JOIN': {
        const res = await this.callLobby('/internal/party-join', {
          playerId: att.playerId,
          partyId: packet.partyId,
          passCode: packet.passCode,
        });
        if (!res?.ok) {
          this.sendPacket(ws, {
            type: 'S_ERROR',
            code: res?.code || 'PARTY_NOT_FOUND',
            message: res?.message || 'Party not found or expired',
          });
        } else if (res.party?.partyId) {
          att.partyId = res.party.partyId;
          this.setAttachment(ws, att);
        }
        break;
      }

      case 'C_PARTY_LEAVE': {
        att.partyId = null;
        this.setAttachment(ws, att);
        await this.callLobby('/internal/party-leave', { playerId: att.playerId });
        break;
      }

      case 'C_PARTY_PING': {
        if (!packet.ping) break;
        const res = await this.callLobby('/internal/party-ping', {
          playerId: att.playerId,
          ping: packet.ping,
        });
        if (!res?.ok && res?.ping) {
          this.broadcastRoom({ type: 'S_PARTY_PING', ping: res.ping });
        }
        break;
      }

      case 'C_FRIEND_LIST_SYNC': {
        if (Array.isArray(packet.friendIds)) {
          att.friendIds = packet.friendIds.filter((x: unknown): x is string => typeof x === 'string');
          this.setAttachment(ws, att);
        }
        const res = await this.callLobby('/internal/presence-upsert', {
          profile: att.profile,
          roomId: this.meta.roomId,
          realm: att.transform.realm,
          hp: att.transform.hp,
          maxHp: att.transform.maxHp,
          friendIds: att.friendIds,
          voice: att.voice,
        });
        if (res?.friends) {
          this.sendPacket(ws, { type: 'S_FRIENDS_STATUS', friends: res.friends });
        }
        break;
      }

      case 'C_FRIEND_ADD': {
        const res = await this.callLobby('/internal/friend-add', {
          playerId: att.playerId,
          query: packet.query,
        });
        if (!res?.ok) {
          this.sendPacket(ws, {
            type: 'S_ERROR',
            code: res?.code || 'FRIEND_ADD_FAILED',
            message: res?.message || 'Could not add friend',
          });
          break;
        }
        if (res.friend?.playerId && !att.friendIds.includes(res.friend.playerId)) {
          att.friendIds.push(res.friend.playerId);
          this.setAttachment(ws, att);
        }
        if (res.friend) {
          this.sendPacket(ws, { type: 'S_FRIEND_ADDED', friend: res.friend });
        }
        if (res.friends) {
          this.sendPacket(ws, { type: 'S_FRIENDS_STATUS', friends: res.friends });
        }
        break;
      }

      case 'C_FRIEND_REMOVE': {
        const targetId = String(packet.targetPlayerId || '');
        att.friendIds = att.friendIds.filter((id) => id !== targetId);
        this.setAttachment(ws, att);
        const res = await this.callLobby('/internal/friend-remove', {
          playerId: att.playerId,
          targetPlayerId: targetId,
        });
        if (res?.friends) {
          this.sendPacket(ws, { type: 'S_FRIENDS_STATUS', friends: res.friends });
        }
        break;
      }

      case 'C_INVITE_SEND': {
        const res = await this.callLobby('/internal/invite-send', {
          fromPlayerId: att.playerId,
          targetPlayerId: packet.targetPlayerId,
          kind: packet.kind,
        });
        if (!res?.ok) {
          this.sendPacket(ws, {
            type: 'S_ERROR',
            code: res?.code || 'PLAYER_OFFLINE',
            message: res?.message || 'Player is currently offline',
          });
        } else {
          this.sendPacket(ws, {
            type: 'S_INVITE_RESULT',
            inviteId: res.inviteId,
            targetUsername: res.targetUsername,
            status: 'SENT',
          });
        }
        break;
      }

      case 'C_INVITE_RESPOND': {
        const res = await this.callLobby('/internal/invite-respond', {
          responderId: att.playerId,
          inviteId: packet.inviteId,
          fromPlayerId: packet.fromPlayerId,
          kind: packet.kind,
          roomId: packet.roomId,
          partyId: packet.partyId,
          accept: packet.accept,
        });
        if (res?.accepted && res.targetRoomId && res.targetRoomId !== this.meta.roomId) {
          this.sendPacket(ws, {
            type: 'S_SWITCH_ROOM',
            roomId: res.targetRoomId,
            roomName: res.targetRoomId,
            bypassCode: true,
          });
        }
        break;
      }

      case 'C_VOICE_STATE': {
        att.voice = {
          enabled: Boolean(packet.enabled),
          muted: Boolean(packet.muted),
          speaking: Boolean(packet.speaking),
        };
        this.setAttachment(ws, att);
        this.broadcastRoom(
          {
            type: 'S_VOICE_STATE',
            playerId: att.playerId,
            username: att.profile.username,
            voice: att.voice,
          },
          att.playerId
        );
        break;
      }

      case 'C_WEBRTC_SIGNAL': {
        const targetId = String(packet.targetPlayerId || '');
        const signalPacket = {
          type: 'S_WEBRTC_SIGNAL',
          fromPlayerId: att.playerId,
          signalType: packet.signalType,
          sdp: packet.sdp,
          candidate: packet.candidate,
        };
        let deliveredInRoom = false;
        for (const item of this.getAuthenticatedSockets()) {
          if (item.att.playerId === targetId) {
            this.sendPacket(item.ws, signalPacket);
            deliveredInRoom = true;
          }
        }
        if (!deliveredInRoom && att.partyId) {
          const relayRes = await this.callLobby('/internal/voice-relay', {
            senderId: att.playerId,
            targetPlayerId: targetId,
            packet: signalPacket,
          });
          if (relayRes?.code === 'VOICE_SCOPE_DENIED') {
            this.sendPacket(ws, {
              type: 'S_ERROR',
              code: 'VOICE_SCOPE_DENIED',
              message: 'Voice signaling only allowed inside the same session or party',
            });
          }
        }
        break;
      }
    }
  }

  async webSocketClose(ws: WebSocket, code: number, _reason: string, _wasClean: boolean): Promise<void> {
    await this.handleSocketDisconnect(ws, code === 4001 ? 'SUPERSEDED' : 'DISCONNECTED');
  }

  async webSocketError(ws: WebSocket, _error: unknown): Promise<void> {
    await this.handleSocketDisconnect(ws, 'ERROR');
  }

  private async handleSocketDisconnect(ws: WebSocket, reason: string): Promise<void> {
    await this.ensureLoaded();
    const att = this.getAttachment(ws);
    if (!att || !att.authenticated || !att.playerId) return;

    // Check if player still has another open socket in this room
    const stillHere = this.getAuthenticatedSockets().some(
      (item) => item.ws !== ws && item.att.playerId === att.playerId
    );
    if (!stillHere) {
      this.broadcastRoom({
        type: 'S_PLAYER_LEFT',
        playerId: att.playerId,
        reason,
      });
      if (reason !== 'SUPERSEDED') {
        this.ctx.waitUntil(
          this.callLobby('/internal/presence-remove', {
            playerId: att.playerId,
            roomId: this.meta.roomId,
          })
        );
      }
    }

    if (this.persistDirty) {
      this.schedulePersist(true);
    }
    this.updateLobbyRoomCount();
  }
}
