/**
 * ECHO – THE WORLD REMEMBERS
 * Central Multiplayer Coordinator
 *
 * Bridges:
 * 1. PlayerAccountManager (player identity & visual customization)
 * 2. PartySystem (4-player co-op party & waypoint pings)
 * 3. FriendsManager (persistent friends list & live room/party invitations)
 * 4. RemotePlayerManager (3D remote player avatars filtered per realm + minimap blips)
 * 5. VoiceChatManager (real-time WebRTC live voice scoped to Room or Party, persistent across Great Portal)
 * 6. WebSocketTransportAdapter (live connection to Express + ws server on /ws, with offline fallback)
 */

import * as THREE from 'three';
import { PlayerAccountManager } from './PlayerAccountManager.ts';
import { PartySystem } from './PartySystem.ts';
import { FriendsManager } from './FriendsManager.ts';
import { RemotePlayerManager } from './RemotePlayerManager.ts';
import { VoiceChatManager, VoiceSignalSender } from './VoiceChatManager.ts';
import {
  INetworkTransport,
  OfflineLoopbackTransport,
  WebSocketTransportAdapter,
  MultiplayerEndpoints,
  resolveMultiplayerEndpoints,
  setCustomMultiplayerServerUrl,
  getCachedAuthToken,
  authenticateCloudSession,
  uploadCloudPlayerSave,
  downloadCloudPlayerSave,
} from './NetworkProtocol.ts';
import { MultiplayerDataIsolation } from './MultiplayerDataIsolation.ts';
import {
  PlayerTransformSnapshot,
  ServerPacket,
  MultiplayerConfig,
  PlayerLocomotionState,
  RealmId,
  RoomSummary,
  RoomWorldSnapshot,
  PlacedVoxelData,
  ChatMessage,
  FriendEntry,
  MultiplayerInvite,
  VoicePeerState,
  PlayerId,
  CharacterClass,
  WaypointPing,
} from './types.ts';
import type { Game } from '../Game.ts';

const DEFAULT_PUBLIC_ROOM_ID = 'ECHO-PUBLIC-1';

export type ConnectionStatus = 'CONNECTING' | 'ONLINE' | 'OFFLINE';

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}

export class MultiplayerCoordinator implements VoiceSignalSender {
  public account: PlayerAccountManager;
  public party: PartySystem;
  public friends: FriendsManager;
  public remotePlayers: RemotePlayerManager;
  public voice: VoiceChatManager;
  public transport: INetworkTransport;

  public connectionStatus: ConnectionStatus = 'OFFLINE';
  public currentRoomId: string = DEFAULT_PUBLIC_ROOM_ID;
  public currentRoomName: string = 'Forgotten Island · Public Sanctuary';
  public currentRoomIsPrivate: boolean = false;
  public hostPlayerId: string = 'SERVER';
  public rooms: RoomSummary[] = [];
  public chatMessages: ChatMessage[] = [];
  public isApplyingRemoteState: boolean = false;
  public pendingDarkSnapshot: Partial<RoomWorldSnapshot> | null = null;
  public endpoints: MultiplayerEndpoints = resolveMultiplayerEndpoints();
  public authToken: string | null = null;
  public cloudSaveLastSyncAt: number = 0;

  // UI Listeners
  public onStateUpdated?: () => void;
  public onChatMessage?: (msg: ChatMessage) => void;
  public onInviteReceived?: (invite: MultiplayerInvite) => void;
  public onVoiceStateChanged?: () => void;
  public onPortalTravelReceived?: (payload: {
    initiatorId: string;
    initiatorName: string;
    targetRealm: RealmId;
    scope: 'PARTY' | 'ROOM';
    crystalsCount?: number;
  }) => void;

  private game!: Game;
  private config: MultiplayerConfig = {
    mode: 'CENTRAL_SERVER',
    serverUrl: this.endpoints.wsUrl,
    reconnectIntervalMs: 3000,
    maxReconnectAttempts: 99,
    sendRateHz: 20,
    interpolationDelayMs: 100,
  };

  private syncTimer: number = 0;
  private syncInterval: number = 1 / 20; // 20Hz PC, adapted to 15Hz on mobile
  private lastTransformSentAt: number = 0;
  private lastSentSig: string = '';
  private cleanupPacketListener?: () => void;
  private cleanupConnListener?: () => void;
  private desiredRoomId: string | null = null;
  private desiredRoomPassCode: string | undefined = undefined;
  private hasAuthenticatedOnce: boolean = false;
  private cloudSaveDebounceTimer: number | null = null;

  constructor() {
    this.account = new PlayerAccountManager();
    this.party = new PartySystem(this.account.getProfile());
    this.friends = new FriendsManager();
    this.remotePlayers = new RemotePlayerManager();
    this.voice = new VoiceChatManager(this);
    this.voice.setLocalPlayerId(this.account.getProfile().id);
    this.transport = new OfflineLoopbackTransport();
    this.authToken = getCachedAuthToken(this.account.getProfile().id);

    // Check URL deep-link ?room=ROOM-XXXXX
    if (typeof window !== 'undefined' && window.location) {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlRoom = params.get('room');
        if (urlRoom && urlRoom.trim()) {
          this.desiredRoomId = urlRoom.trim().toUpperCase();
        }
      } catch {
        // ignore
      }
    }

    this.party.onPartyChanged = () => {
      this.syncEligibleVoicePeers();
      this.onStateUpdated?.();
    };
    this.friends.onFriendsChanged = () => {
      this.onStateUpdated?.();
    };
    this.friends.onInvitesChanged = () => {
      this.onStateUpdated?.();
    };
    this.voice.onStateChanged = () => {
      this.onVoiceStateChanged?.();
      this.onStateUpdated?.();
    };
  }

  public init(game: Game): void {
    this.game = game;
    this.game.scene.add(this.remotePlayers.group);
    if (this.game.isMobileDevice) {
      this.syncInterval = 1 / 15; // Battery & bandwidth optimized 15Hz sync on mobile
    }

    // Connect automatically if a server URL is configured (Cloudflare Worker or local Express)
    if (this.endpoints.isConfigured && this.endpoints.wsUrl) {
      void this.connectToCentralServer(this.endpoints.wsUrl);
    } else {
      this.connectionStatus = 'OFFLINE';
      this.onStateUpdated?.();
    }
  }

  public async configureAndConnectServer(rawUrl: string | null): Promise<boolean> {
    this.endpoints = setCustomMultiplayerServerUrl(rawUrl);
    if (!this.endpoints.isConfigured || !this.endpoints.wsUrl) {
      this.transport.disconnect();
      this.connectionStatus = 'OFFLINE';
      this.onStateUpdated?.();
      return false;
    }
    return this.connectToCentralServer(this.endpoints.wsUrl);
  }

  public async connectToCentralServer(wsUrl?: string): Promise<boolean> {
    this.endpoints = resolveMultiplayerEndpoints();
    const targetUrl = wsUrl || this.endpoints.wsUrl;
    if (!targetUrl) {
      this.connectionStatus = 'OFFLINE';
      this.onStateUpdated?.();
      return false;
    }

    this.config.serverUrl = targetUrl;
    this.connectionStatus = 'CONNECTING';
    this.onStateUpdated?.();

    this.cleanupPacketListener?.();
    this.cleanupConnListener?.();
    this.transport.disconnect();

    // Authenticate with Cloudflare Worker /api/auth/session for signed session token + D1 upsert
    const profile = this.account.getProfile();
    if (this.endpoints.apiUrl) {
      const authRes = await authenticateCloudSession(this.endpoints.apiUrl, profile);
      if (authRes?.token) {
        this.authToken = authRes.token;
      }
    }

    const wsAdapter = new WebSocketTransportAdapter(targetUrl);
    wsAdapter.setRoom(this.desiredRoomId || this.currentRoomId || DEFAULT_PUBLIC_ROOM_ID);
    if (this.authToken) wsAdapter.setToken(this.authToken);
    this.transport = wsAdapter;

    this.cleanupPacketListener = this.transport.onPacket((packet) => {
      this.handleServerPacket(packet);
    });
    this.cleanupConnListener = this.transport.onConnectionChange?.((connected) => {
      this.connectionStatus = connected ? 'ONLINE' : 'OFFLINE';
      if (connected) {
        this.authenticateCurrentSession();
      } else {
        this.onStateUpdated?.();
      }
    });

    const ok = await wsAdapter.connect(
      targetUrl,
      this.authToken || undefined,
      this.desiredRoomId || this.currentRoomId || DEFAULT_PUBLIC_ROOM_ID
    );
    if (!ok) {
      this.connectionStatus = 'OFFLINE';
      this.onStateUpdated?.();
      return false;
    }

    this.connectionStatus = 'ONLINE';
    this.onStateUpdated?.();
    return true;
  }

  private authenticateCurrentSession(): void {
    const profile = this.account.getProfile();
    this.voice.setLocalPlayerId(profile.id);
    this.transport.send({
      type: 'C_AUTH',
      profile,
      friendIds: this.friends.getFriendIds(),
      token: this.authToken || undefined,
    });
    if (this.voice.isEnabled) {
      this.transport.send({
        type: 'C_VOICE_STATE',
        enabled: this.voice.isEnabled,
        muted: this.voice.isMuted,
        speaking: this.voice.isSpeaking,
      });
    }
    if (
      this.hasAuthenticatedOnce &&
      this.desiredRoomId &&
      this.desiredRoomId !== this.currentRoomId
    ) {
      this.transport.send({
        type: 'C_JOIN_ROOM',
        roomId: this.desiredRoomId,
        passCode: this.desiredRoomPassCode,
      });
    }
    this.hasAuthenticatedOnce = true;
  }

  /**
   * Main frame update
   */
  public update(dt: number, _timeSec: number, cameraPos: THREE.Vector3): void {
    this.remotePlayers.update(dt, cameraPos);
    this.party.update();

    if (this.transport.isConnected) {
      this.syncTimer += dt;
      if (this.syncTimer >= this.syncInterval) {
        this.syncTimer = 0;
        this.broadcastLocalTransform();
      }
    }
  }

  public getCurrentRealm(): RealmId {
    return this.game?.isInDarkRealm ? 'DARK_REALM' : 'ISLAND';
  }

  /**
   * Broadcasts local player transform, realm, and animation action state at 15-20Hz (idle-throttled & quantized)
   */
  public broadcastLocalTransform(force: boolean = false): void {
    if (!this.game || !this.game.player || !this.transport.isConnected) return;

    const p = this.game.player;
    const realm = this.getCurrentRealm();
    let action: PlayerLocomotionState = 'IDLE';

    if (p.isDead) action = 'DEAD';
    else if (p.isAttacking) action = 'ATTACK';
    else if (p.isDodging) action = 'DODGE';
    else if (p.isCastingPulse) action = 'PULSE';
    else if (p.isSwimming) action = 'SWIM';
    else if (!p.isGrounded) action = p.velocity.y > 0 ? 'JUMP_ASCENT' : 'JUMP_DESCENT';
    else if (p.isMoving) action = p.isSprinting ? 'RUN' : 'WALK';

    const hp =
      realm === 'DARK_REALM' && this.game.darkRealm
        ? this.game.darkRealm.progress.hp
        : this.game.combatSystem?.playerHp ?? 100;
    const maxHp =
      realm === 'DARK_REALM' && this.game.darkRealm
        ? this.game.darkRealm.progress.maxHp
        : this.game.combatSystem?.playerMaxHp ?? 100;

    const rx = round3(p.position.x);
    const ry = round3(p.position.y);
    const rz = round3(p.position.z);
    const angle = round3(p.currentFacingAngle ?? 0);
    const draw = round3(p.bowDrawAmount || 0);

    const sig = `${rx},${ry},${rz},${angle},${action},${realm},${p.equippedWeapon},${p.isBlocking},${p.isAiming},${draw},${Math.round(hp)}`;
    const now = performance.now();
    if (!force && sig === this.lastSentSig && now - this.lastTransformSentAt < 950) {
      return;
    }
    this.lastSentSig = sig;
    this.lastTransformSentAt = now;

    const snapshot: PlayerTransformSnapshot = {
      x: rx,
      y: ry,
      z: rz,
      vx: round3(p.velocity.x),
      vy: round3(p.velocity.y),
      vz: round3(p.velocity.z),
      facingAngle: angle,
      isGrounded: p.isGrounded,
      isMoving: p.isMoving,
      isSprinting: p.isSprinting,
      actionState: action,
      comboStep: p.attackComboStep || 1,
      realm,
      hp: Math.round(hp),
      maxHp: Math.round(maxHp),
      weapon: p.equippedWeapon,
      isBlocking: p.isBlocking,
      isAiming: p.isAiming,
      bowDraw: draw,
      timestamp: Date.now(),
    };

    this.transport.send({
      type: 'C_SYNC_TRANSFORM',
      transform: snapshot,
    });
  }

  // ==========================================
  // COMBAT, VOXEL, WORLD & RESOURCE BROADCASTS
  // ==========================================

  public broadcastCombatAttack(comboStep: number = 1): void {
    if (!this.transport.isConnected || !this.game?.player) return;
    this.transport.send({
      type: 'C_COMBAT_ATTACK',
      comboStep,
      origin: {
        x: this.game.player.position.x,
        y: this.game.player.position.y,
        z: this.game.player.position.z,
      },
      facingAngle: this.game.player.currentFacingAngle ?? 0,
    });
  }

  public broadcastWeaponShot(
    weapon: 'pistol' | 'bow',
    origin: { x: number; y: number; z: number },
    dir: { x: number; y: number; z: number },
    power: number = 1.0
  ): void {
    if (!this.transport.isConnected) return;
    this.transport.send({
      type: 'C_WEAPON_SHOT',
      weapon,
      origin: { x: origin.x, y: origin.y, z: origin.z },
      dir: { x: dir.x, y: dir.y, z: dir.z },
      power,
    });
  }

  public broadcastCombatDodge(dx: number, dz: number): void {
    if (!this.transport.isConnected) return;
    this.transport.send({
      type: 'C_COMBAT_DODGE',
      direction: { x: dx, z: dz },
    });
  }

  public broadcastCombatPulse(): void {
    if (!this.transport.isConnected || !this.game?.player) return;
    this.transport.send({
      type: 'C_COMBAT_PULSE',
      origin: {
        x: this.game.player.position.x,
        y: this.game.player.position.y,
        z: this.game.player.position.z,
      },
    });
  }

  public broadcastVoxelUpdate(realm: RealmId, op: 'PLACE' | 'REMOVE', blocks: PlacedVoxelData[]): void {
    if (!this.transport.isConnected || this.isApplyingRemoteState || blocks.length === 0) return;
    this.transport.send({
      type: 'C_VOXEL_UPDATE',
      realm,
      op,
      blocks,
    });
  }

  public broadcastWorldProgressUpdate(delta: Partial<RoomWorldSnapshot>): void {
    if (!this.transport.isConnected || this.isApplyingRemoteState) return;
    this.transport.send({
      type: 'C_WORLD_PROGRESS_UPDATE',
      delta,
    });
  }

  public broadcastEnemyDamage(
    realm: RealmId,
    idOrSpawnId: string | number,
    hp: number,
    maxHp: number,
    isDeadOrAlive: boolean,
    pos?: { x: number; y: number; z: number }
  ): void {
    if (!this.transport.isConnected || this.isApplyingRemoteState) return;
    if (realm === 'ISLAND') {
      this.transport.send({
        type: 'C_ENEMY_DAMAGE',
        realm,
        enemyId: String(idOrSpawnId),
        hp,
        maxHp,
        isDead: isDeadOrAlive,
        pos,
      });
    } else {
      this.transport.send({
        type: 'C_ENEMY_DAMAGE',
        realm,
        spawnId: Number(idOrSpawnId),
        hp,
        maxHp,
        alive: isDeadOrAlive,
        pos,
      });
    }
  }

  public broadcastResourceHit(payload: {
    resourceType: 'WORLD1_TREE' | 'WORLD1_BOULDER' | 'DARK_NODE' | 'DARK_CHEST';
    x?: number;
    z?: number;
    nodeId?: number;
    hp?: number;
    chestId?: string;
    destroyed?: boolean;
  }): void {
    if (!this.transport.isConnected || this.isApplyingRemoteState) return;
    this.transport.send({
      type: 'C_RESOURCE_HIT',
      ...payload,
    });
  }

  // ==========================================
  // ROOMS, PARTY, FRIENDS, INVITES & CHAT
  // ==========================================

  public refreshRooms(): void {
    if (!this.transport.isConnected) return;
    this.transport.send({ type: 'C_LIST_ROOMS' });
  }

  public createRoom(name: string, isPrivate: boolean, passCode?: string): void {
    if (!this.transport.isConnected) {
      this.game?.ui?.showToast('⚠️ Not connected to multiplayer server yet');
      return;
    }
    const seedSnapshot = this.game ? this.game.buildLocalRoomSnapshot() : undefined;
    this.transport.send({
      type: 'C_ROOM_CREATE',
      name: name.trim() || `${this.account.getProfile().username}'s World`,
      isPrivate,
      passCode: isPrivate ? passCode?.trim() : undefined,
      seedSnapshot,
    });
  }

  public joinRoom(roomId: string, passCode?: string): void {
    if (!this.transport.isConnected) {
      this.game?.ui?.showToast('⚠️ Not connected to multiplayer server yet');
      return;
    }
    const cleaned = roomId.trim().toUpperCase();
    if (!cleaned) return;
    this.desiredRoomId = cleaned;
    this.desiredRoomPassCode = passCode?.trim() || undefined;
    this.transport.send({
      type: 'C_JOIN_ROOM',
      roomId: cleaned,
      passCode: this.desiredRoomPassCode,
    });
  }

  public leaveRoomToPublic(): void {
    if (!this.transport.isConnected) return;
    this.desiredRoomId = DEFAULT_PUBLIC_ROOM_ID;
    this.desiredRoomPassCode = undefined;
    this.transport.send({
      type: 'C_LEAVE_ROOM',
      roomId: this.currentRoomId,
    });
  }

  public createParty(): void {
    if (this.transport.isConnected) {
      this.transport.send({ type: 'C_PARTY_CREATE' });
    } else {
      this.party.createLocalSoloParty();
    }
  }

  public joinParty(passCode: string): void {
    const cleaned = passCode.trim().toUpperCase();
    if (!cleaned) return;
    if (!this.transport.isConnected) {
      this.game?.ui?.showToast('⚠️ Online connection required to join a party');
      return;
    }
    this.transport.send({
      type: 'C_PARTY_JOIN',
      passCode: cleaned,
    });
  }

  public leaveParty(): void {
    if (this.transport.isConnected) {
      this.transport.send({ type: 'C_PARTY_LEAVE' });
    } else {
      this.party.clearParty();
    }
  }

  public sendPartyPing(x: number, y: number, z: number, type: WaypointPing['type'] = 'EXPLORE'): void {
    if (this.transport.isConnected) {
      this.transport.send({
        type: 'C_PARTY_PING',
        ping: {
          senderId: this.account.getProfile().id,
          senderName: this.account.getProfile().username,
          x,
          y,
          z,
          type,
          realm: this.getCurrentRealm(),
          durationMs: 8000,
        },
      });
    } else {
      this.party.addPing(x, y, z, type);
    }
  }

  public sendChat(text: string, channel: 'ROOM' | 'PARTY' | 'FRIENDS' = 'ROOM'): boolean {
    const cleaned = text.trim().slice(0, 320);
    if (!cleaned) return false;
    if (!this.transport.isConnected) {
      // Echo locally if offline so user sees clear feedback
      const profile = this.account.getProfile();
      const localMsg: ChatMessage = {
        id: `local_${Date.now()}`,
        senderId: profile.id,
        senderName: `${profile.username} (Offline)`,
        senderColor: profile.auraColor,
        realm: this.getCurrentRealm(),
        channel,
        text: cleaned,
        timestamp: Date.now(),
      };
      this.pushChatMessage(localMsg);
      return true;
    }
    this.transport.send({
      type: 'C_CHAT_MESSAGE',
      text: cleaned,
      channel,
    });
    return true;
  }

  public addFriend(query: string): void {
    const cleaned = query.trim();
    if (!cleaned) return;
    if (!this.transport.isConnected) {
      this.game?.ui?.showToast('⚠️ Connect online to search & add friends');
      return;
    }
    this.transport.send({
      type: 'C_FRIEND_ADD',
      query: cleaned,
    });
  }

  public removeFriend(playerId: PlayerId): void {
    this.friends.removeFriend(playerId);
    if (this.transport.isConnected) {
      this.transport.send({
        type: 'C_FRIEND_REMOVE',
        targetPlayerId: playerId,
      });
    }
    this.onStateUpdated?.();
  }

  public sendInvite(targetPlayerId: PlayerId, kind: 'ROOM' | 'PARTY'): void {
    if (!this.transport.isConnected) {
      this.game?.ui?.showToast('⚠️ Connect online to invite friends');
      return;
    }
    this.transport.send({
      type: 'C_INVITE_SEND',
      targetPlayerId,
      kind,
    });
  }

  public respondToInvite(inviteId: string, accept: boolean): void {
    const invite = this.friends.removeInvite(inviteId);
    if (!invite) return;
    if (accept && invite.roomId) {
      this.desiredRoomId = invite.roomId;
      this.desiredRoomPassCode = undefined;
    }
    if (this.transport.isConnected) {
      this.transport.send({
        type: 'C_INVITE_RESPOND',
        inviteId: invite.inviteId,
        fromPlayerId: invite.fromPlayerId,
        kind: invite.kind,
        roomId: invite.roomId,
        partyId: invite.partyId,
        accept,
      });
    }
    this.onStateUpdated?.();
  }

  public updateLocalIdentity(
    username: string,
    charClass: CharacterClass,
    robeColor?: string,
    auraColor?: string
  ): void {
    const updated = this.account.updateProfile({
      username: username.trim() || this.account.getProfile().username,
      characterClass: charClass,
      ...(robeColor ? { robeColor } : {}),
      ...(auraColor ? { auraColor } : {}),
    });
    this.game?.player?.applyProfileAppearance(updated);
    if (this.transport.isConnected) {
      this.transport.send({
        type: 'C_UPDATE_PROFILE',
        profile: updated,
      });
    }
    this.onStateUpdated?.();
  }

  // ==========================================
  // LIVE WEBRTC VOICE CHAT (VoiceSignalSender)
  // ==========================================

  public sendVoiceState(enabled: boolean, muted: boolean, speaking: boolean): void {
    if (!this.transport.isConnected) return;
    this.transport.send({
      type: 'C_VOICE_STATE',
      enabled,
      muted,
      speaking,
    });
  }

  public sendWebRTCSignal(
    targetPlayerId: PlayerId,
    signalType: 'offer' | 'answer' | 'ice',
    payload: { sdp?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit }
  ): void {
    if (!this.transport.isConnected) return;
    this.transport.send({
      type: 'C_WEBRTC_SIGNAL',
      targetPlayerId,
      signalType,
      sdp: payload.sdp,
      candidate: payload.candidate,
    });
  }

  public async enableVoiceWithPermissionGranted(): Promise<{ ok: boolean; error?: string }> {
    this.syncEligibleVoicePeers();
    const res = await this.voice.enableVoice();
    this.onVoiceStateChanged?.();
    this.onStateUpdated?.();
    return res;
  }

  public disableVoice(): void {
    this.voice.disableVoice();
    this.onVoiceStateChanged?.();
    this.onStateUpdated?.();
  }

  public toggleSelfMute(): boolean {
    const muted = this.voice.toggleMute();
    this.onVoiceStateChanged?.();
    this.onStateUpdated?.();
    return muted;
  }

  public togglePeerMute(peerId: PlayerId): boolean {
    const muted = this.voice.togglePeerMute(peerId);
    this.onVoiceStateChanged?.();
    this.onStateUpdated?.();
    return muted;
  }

  public setSpeakerVolume(vol: number): void {
    this.voice.setSpeakerVolume(vol);
    this.onVoiceStateChanged?.();
    this.onStateUpdated?.();
  }

  public unlockVoiceAudio(): void {
    this.voice.unlockAudioPlayback();
  }

  public getVoicePeers(): VoicePeerState[] {
    return this.voice.getPeerStates();
  }

  /**
   * Strictly restricts live WebRTC audio peers to players in the SAME Room OR SAME Party.
   */
  public syncEligibleVoicePeers(): void {
    const localId = this.account.getProfile().id;
    const eligible = new Set<PlayerId>();

    for (const rp of this.remotePlayers.getAllPlayers()) {
      if (rp.profile.id !== localId) {
        eligible.add(rp.profile.id);
      }
    }

    const activeParty = this.party.getParty();
    if (activeParty) {
      for (const m of activeParty.members) {
        if (m.playerId !== localId) {
          eligible.add(m.playerId);
        }
      }
    }

    this.voice.syncEligiblePeers(eligible);
  }

  // ==========================================
  // PACKET HANDLER & WORLD SYNC APPLICATION
  // ==========================================

  private pushChatMessage(msg: ChatMessage): void {
    this.chatMessages.push(msg);
    if (this.chatMessages.length > 80) {
      this.chatMessages.shift();
    }
    this.onChatMessage?.(msg);
  }

  private pushSystemChat(text: string): void {
    this.pushChatMessage({
      id: `sys_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
      senderId: 'SYSTEM',
      senderName: 'ECHO',
      senderColor: '#38bdf8',
      realm: this.getCurrentRealm(),
      channel: 'SYSTEM',
      text,
      timestamp: Date.now(),
    });
  }

  public consumePendingDarkSnapshot(): Partial<RoomWorldSnapshot> | null {
    const snap = this.pendingDarkSnapshot;
    this.pendingDarkSnapshot = null;
    return snap;
  }

  private handleServerPacket(packet: ServerPacket): void {
    switch (packet.type) {
      case 'S_AUTH_ACK': {
        if (packet.success) {
          this.connectionStatus = 'ONLINE';
          this.voice.setLocalPlayerId(packet.sessionPlayerId);
          this.transport.flushPendingQueue?.();
        }
        this.onStateUpdated?.();
        break;
      }

      case 'S_SWITCH_ROOM': {
        const nextRoom = packet.roomId || DEFAULT_PUBLIC_ROOM_ID;
        this.desiredRoomId = nextRoom;
        this.desiredRoomPassCode = packet.passCode;
        if (this.transport.switchRoom) {
          void this.transport.switchRoom(nextRoom).then((ok) => {
            if (!ok) {
              this.connectionStatus = 'OFFLINE';
              this.onStateUpdated?.();
            }
          });
        }
        break;
      }

      case 'S_PORTAL_TRAVEL': {
        this.onPortalTravelReceived?.({
          initiatorId: packet.initiatorId,
          initiatorName: packet.initiatorName,
          targetRealm: packet.targetRealm,
          scope: packet.scope,
          crystalsCount: packet.crystalsCount,
        });
        break;
      }

      case 'S_ROOM_LIST': {
        this.rooms = packet.rooms || [];
        this.onStateUpdated?.();
        break;
      }

      case 'S_ROOM_STATE': {
        this.currentRoomId = packet.roomId;
        this.currentRoomName = packet.roomName;
        this.currentRoomIsPrivate = packet.isPrivate;
        this.hostPlayerId = packet.hostPlayerId;
        this.desiredRoomId = packet.roomId;

        this.remotePlayers.clearAll();
        const localRealm = this.getCurrentRealm();
        this.remotePlayers.setLocalRealm(localRealm);

        for (const rp of packet.remotePlayers) {
          this.remotePlayers.addPlayer(rp.profile, rp.transform);
          if (rp.voice) {
            this.remotePlayers.setVoiceState(rp.profile.id, rp.voice.enabled, rp.voice.muted, rp.voice.speaking);
            this.voice.handleRemoteVoiceState(rp.profile.id, rp.profile.username, rp.voice);
          }
        }

        this.syncEligibleVoicePeers();

        if (packet.worldSnapshot) {
          const isJoiningFriendOrNonEmpty =
            packet.remotePlayers.length > 0 ||
            packet.roomId !== DEFAULT_PUBLIC_ROOM_ID ||
            this.hasNonEmptyWorldSnapshot(packet.worldSnapshot);
          if (isJoiningFriendOrNonEmpty) {
            this.isApplyingRemoteState = true;
            try {
              this.game?.applyRemoteWorldSnapshot(packet.worldSnapshot);
            } finally {
              this.isApplyingRemoteState = false;
            }
          }
        }

        this.pushSystemChat(`Connected to room: ${packet.roomName} (${packet.roomId})`);
        this.onStateUpdated?.();
        break;
      }

      case 'S_PLAYER_JOINED': {
        this.remotePlayers.addPlayer(packet.profile, packet.transform);
        if (packet.voice) {
          this.remotePlayers.setVoiceState(
            packet.profile.id,
            packet.voice.enabled,
            packet.voice.muted,
            packet.voice.speaking
          );
          this.voice.handleRemoteVoiceState(packet.profile.id, packet.profile.username, packet.voice);
        }
        this.syncEligibleVoicePeers();
        this.game?.ui?.showToast(`✦ ${packet.profile.username} joined your world!`);
        this.pushSystemChat(`${packet.profile.username} joined the room.`);
        this.onStateUpdated?.();
        break;
      }

      case 'S_PLAYER_LEFT': {
        const departed = this.remotePlayers.getPlayer(packet.playerId);
        const departedName = departed?.profile.username || 'Adventurer';
        this.remotePlayers.removePlayer(packet.playerId);
        this.voice.removePeer(packet.playerId);
        this.syncEligibleVoicePeers();
        this.pushSystemChat(`${departedName} left the room.`);
        this.onStateUpdated?.();
        break;
      }

      case 'S_PLAYER_PROFILE_UPDATED': {
        this.remotePlayers.updateProfile(packet.playerId, packet.profile);
        this.onStateUpdated?.();
        break;
      }

      case 'S_REMOTE_TRANSFORM': {
        this.remotePlayers.updateTransform(packet.playerId, packet.transform);
        break;
      }

      case 'S_REMOTE_ATTACK': {
        this.remotePlayers.playAction(packet.playerId, 'ATTACK', { comboStep: packet.comboStep });
        break;
      }

      case 'S_REMOTE_SHOT': {
        this.remotePlayers.playWeaponShot(packet.playerId, packet.weapon);
        if (packet.realm === this.getCurrentRealm()) {
          this.game?.handleRemoteWeaponShot(
            packet.weapon,
            packet.origin,
            packet.dir,
            packet.power ?? 1.0
          );
        }
        break;
      }

      case 'S_REMOTE_DODGE': {
        this.remotePlayers.playAction(packet.playerId, 'DODGE');
        break;
      }

      case 'S_REMOTE_PULSE': {
        this.remotePlayers.playAction(packet.playerId, 'PULSE');
        break;
      }

      case 'S_VOXEL_UPDATE': {
        this.isApplyingRemoteState = true;
        try {
          this.game?.applyRemoteVoxelUpdate(packet.realm, packet.op, packet.blocks);
        } finally {
          this.isApplyingRemoteState = false;
        }
        break;
      }

      case 'S_WORLD_PROGRESS_UPDATE': {
        this.isApplyingRemoteState = true;
        try {
          this.game?.applyRemoteWorldDelta(packet.delta);
        } finally {
          this.isApplyingRemoteState = false;
        }
        break;
      }

      case 'S_ENEMY_STATE': {
        this.isApplyingRemoteState = true;
        try {
          this.game?.applyRemoteEnemyState(packet);
        } finally {
          this.isApplyingRemoteState = false;
        }
        break;
      }

      case 'S_RESOURCE_STATE': {
        this.isApplyingRemoteState = true;
        try {
          this.game?.applyRemoteResourceState(packet);
        } finally {
          this.isApplyingRemoteState = false;
        }
        break;
      }

      case 'S_WORLD_STATE_UPDATE': {
        this.isApplyingRemoteState = true;
        try {
          MultiplayerDataIsolation.applyWorldData(this.game, packet.delta as any);
        } finally {
          this.isApplyingRemoteState = false;
        }
        break;
      }

      case 'S_PARTY_STATE': {
        if (packet.party) {
          this.party.applyServerPartyState(packet.party);
        } else {
          this.party.clearParty();
        }
        this.syncEligibleVoicePeers();
        this.onStateUpdated?.();
        break;
      }

      case 'S_PARTY_PING': {
        this.party.applyRemotePing(packet.ping);
        const realmTag = packet.ping.realm === 'DARK_REALM' ? 'W2' : 'W1';
        this.game?.ui?.showToast(
          `📍 [${realmTag}] ${packet.ping.senderName} pinged: ${packet.ping.type}`
        );
        break;
      }

      case 'S_FRIENDS_STATUS': {
        this.friends.updateFromServer(packet.friends as FriendEntry[]);
        this.onStateUpdated?.();
        break;
      }

      case 'S_FRIEND_ADDED': {
        this.friends.addOrUpdateFriend(packet.friend as FriendEntry);
        this.game?.ui?.showToast(`🤝 Added ${packet.friend.username} to Friends List`);
        this.onStateUpdated?.();
        break;
      }

      case 'S_INVITE_RECEIVED': {
        this.friends.pushInvite(packet.invite);
        this.onInviteReceived?.(packet.invite);
        this.onStateUpdated?.();
        break;
      }

      case 'S_INVITE_RESULT': {
        if (packet.status === 'SENT') {
          this.game?.ui?.showToast(`✉️ Invitation sent to ${packet.targetUsername}`);
        } else if (packet.status === 'ACCEPTED') {
          this.game?.ui?.showToast(`✅ ${packet.targetUsername} accepted your invitation!`);
        } else if (packet.status === 'DECLINED') {
          this.game?.ui?.showToast(`❌ ${packet.targetUsername} declined your invitation`);
        }
        break;
      }

      case 'S_CHAT_BROADCAST': {
        this.pushChatMessage({
          id: packet.id,
          senderId: packet.senderId,
          senderName: packet.senderName,
          senderColor: packet.senderColor,
          realm: packet.realm,
          channel: packet.channel,
          text: packet.text,
          timestamp: packet.timestamp,
        });
        break;
      }

      case 'S_VOICE_STATE': {
        this.remotePlayers.setVoiceState(
          packet.playerId,
          packet.voice.enabled,
          packet.voice.muted,
          packet.voice.speaking
        );
        this.voice.handleRemoteVoiceState(packet.playerId, packet.username, packet.voice);
        this.onVoiceStateChanged?.();
        this.onStateUpdated?.();
        break;
      }

      case 'S_WEBRTC_SIGNAL': {
        void this.voice.handleSignal(
          packet.fromPlayerId,
          packet.signalType,
          packet.sdp,
          packet.candidate
        );
        break;
      }

      case 'S_ERROR': {
        this.game?.ui?.showToast(`⚠️ ${packet.message}`);
        break;
      }
    }
  }

  private hasNonEmptyWorldSnapshot(snap: RoomWorldSnapshot): boolean {
    return Boolean(
      (snap.crystals && snap.crystals.length > 0) ||
        (snap.shards && snap.shards.length > 0) ||
        (snap.inscriptions && snap.inscriptions.length > 0) ||
        snap.isTempleDoorOpen ||
        snap.questProgress ||
        snap.darkProgress ||
        (snap.world1Voxels && snap.world1Voxels.length > 0) ||
        (snap.world2Voxels && snap.world2Voxels.length > 0) ||
        (snap.world1Enemies && snap.world1Enemies.length > 0) ||
        (snap.world1HarvestedTrees && snap.world1HarvestedTrees.length > 0) ||
        (snap.world1HarvestedBoulders && snap.world1HarvestedBoulders.length > 0) ||
        (snap.darkMonsters && snap.darkMonsters.length > 0) ||
        (snap.darkNodes && snap.darkNodes.length > 0) ||
        (snap.darkChests && snap.darkChests.length > 0)
    );
  }

  public broadcastPortalTravel(targetRealm: RealmId): void {
    if (!this.transport.isConnected || this.isApplyingRemoteState) return;
    const hasParty = (this.party.getParty()?.members.length || 0) > 1;
    this.transport.send({
      type: 'C_PORTAL_TRAVEL',
      targetRealm,
      scope: hasParty ? 'PARTY' : 'ROOM',
    });
  }

  public acceptPortalTravel(targetRealm: RealmId, crystalsCount?: number): void {
    if (!this.game) return;
    if (targetRealm === 'DARK_REALM' && !this.game.isInDarkRealm) {
      if ((crystalsCount ?? 0) >= 7 && this.game.crystals.getCollectedCount() < 7) {
        this.game.crystals.setCollectedState([1, 2, 3, 4, 5, 6, 7]);
        this.game.ui.updateCrystalProgress(7);
        this.game.portal.updateCrystalProgress(7);
      }
      this.game.enterDarkRealm(true);
    } else if (targetRealm === 'ISLAND' && this.game.isInDarkRealm) {
      this.game.exitDarkRealmToIsland(true);
    }
  }

  public buildRoomInviteLink(): string {
    if (typeof window === 'undefined' || !window.location) {
      return this.currentRoomId;
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('room', this.currentRoomId);
      if (this.endpoints.wsUrl && (this.endpoints.source === 'storage' || this.endpoints.source === 'query')) {
        url.searchParams.set('server', this.endpoints.wsUrl);
      } else {
        url.searchParams.delete('server');
      }
      return url.toString();
    } catch {
      return this.currentRoomId;
    }
  }

  /**
   * Cleanly saves state with player/world data separation + non-blocking Cloudflare D1 cloud backup
   */
  public saveGame(): boolean {
    if (!this.game) return false;
    const playerSave = MultiplayerDataIsolation.extractPlayerSave(this.game, this.account.getProfile());
    const worldData = MultiplayerDataIsolation.extractWorldData(this.game, this.account.getProfile().id);
    const localOk = MultiplayerDataIsolation.saveIsolated(playerSave, worldData);

    // Non-blocking debounced sync to Cloudflare D1 when connected
    if (this.endpoints.apiUrl && this.authToken) {
      if (this.cloudSaveDebounceTimer !== null) {
        window.clearTimeout(this.cloudSaveDebounceTimer);
      }
      this.cloudSaveDebounceTimer = window.setTimeout(() => {
        this.cloudSaveDebounceTimer = null;
        void this.syncCloudSaveNow();
      }, 1500);
    }

    return localOk;
  }

  public async syncCloudSaveNow(): Promise<boolean> {
    if (!this.game || !this.endpoints.apiUrl) return false;
    const profile = this.account.getProfile();
    if (!this.authToken) {
      const authRes = await authenticateCloudSession(this.endpoints.apiUrl, profile);
      if (authRes?.token) this.authToken = authRes.token;
    }
    if (!this.authToken) return false;

    const playerSave = MultiplayerDataIsolation.extractPlayerSave(this.game, profile);
    const darkProgress = this.game.sharedProgress?.serialize() ?? null;
    const res = await uploadCloudPlayerSave(this.endpoints.apiUrl, this.authToken, playerSave, darkProgress);
    if (res.ok) {
      this.cloudSaveLastSyncAt = res.updatedAt || Date.now();
      this.onStateUpdated?.();
      return true;
    }
    return false;
  }

  public async restoreCloudSave(): Promise<boolean> {
    if (!this.game || !this.endpoints.apiUrl) return false;
    const profile = this.account.getProfile();
    if (!this.authToken) {
      const authRes = await authenticateCloudSession(this.endpoints.apiUrl, profile);
      if (authRes?.token) this.authToken = authRes.token;
    }
    if (!this.authToken) return false;

    const res = await downloadCloudPlayerSave(this.endpoints.apiUrl, this.authToken);
    if (!res.ok || !res.save) return false;

    MultiplayerDataIsolation.applyPlayerSave(this.game, res.save);
    if (res.darkProgress) {
      this.game.sharedProgress.deserialize(res.darkProgress);
      this.game.darkRealm?.ui.refreshHUD();
    }
    this.cloudSaveLastSyncAt = res.updatedAt || Date.now();
    this.onStateUpdated?.();
    return true;
  }

  /**
   * Cleanly loads state using isolated storage
   */
  public loadGame(): boolean {
    if (!this.game) return false;
    const { player, world } = MultiplayerDataIsolation.loadIsolated(this.account.getProfile().id);
    if (!player && !world) return false;

    if (world) {
      MultiplayerDataIsolation.applyWorldData(this.game, world);
    }
    if (player) {
      MultiplayerDataIsolation.applyPlayerSave(this.game, player);
    }
    return true;
  }

  public dispose(): void {
    if (this.cloudSaveDebounceTimer !== null) {
      window.clearTimeout(this.cloudSaveDebounceTimer);
      this.cloudSaveDebounceTimer = null;
    }
    this.cleanupPacketListener?.();
    this.cleanupConnListener?.();
    this.voice.dispose();
    this.transport.disconnect();
    this.remotePlayers.clearAll();
  }
}
