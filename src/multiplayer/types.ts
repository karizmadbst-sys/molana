/**
 * ECHO – THE WORLD REMEMBERS
 * Multiplayer & Network Architecture Types & Data Contracts
 * (بنية وبيانات اللعب الجماعي وشبكة الخادم المركزي)
 */

export type PlayerId = string;
export type RoomId = string;
export type PartyId = string;
export type RealmId = 'ISLAND' | 'DARK_REALM';

// ==========================================
// 1. PLAYER IDENTITY & ACCOUNT
// ==========================================

export type CharacterClass = 'SPIRIT_WEAVER' | 'ANCIENT_WARDEN' | 'MIND_SEEKER' | 'ECHO_BLADE';

export interface PlayerAccountProfile {
  id: PlayerId;
  username: string;
  titleAr: string;
  titleEn: string;
  characterClass: CharacterClass;
  robeColor: string;
  auraColor: string;
  level: number;
  echoMastery: number;
  createdAt: number;
  lastActive: number;
}

// ==========================================
// 2. LOGIC & TRANSFORM STATE (PURE DATA)
// ==========================================

export type PlayerLocomotionState =
  | 'IDLE'
  | 'WALK'
  | 'RUN'
  | 'SWIM'
  | 'JUMP_ASCENT'
  | 'JUMP_DESCENT'
  | 'ATTACK'
  | 'DODGE'
  | 'PULSE'
  | 'DEAD';

export interface PlayerTransformSnapshot {
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
  actionState: PlayerLocomotionState;
  comboStep: number;
  realm: RealmId;
  hp?: number;
  maxHp?: number;
  weapon?: 'sword' | 'pistol' | 'bow';
  isBlocking?: boolean;
  isAiming?: boolean;
  bowDraw?: number;
  timestamp: number;
}

export interface PlayerCombatSnapshot {
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  isInvulnerable: boolean;
  enemiesDefeated: number;
}

// ==========================================
// 3. ISOLATED PLAYER SAVE DATA
// ==========================================

export interface PlayerIsolatedSaveData {
  version: number;
  account: PlayerAccountProfile;
  stats: PlayerCombatSnapshot;
  inventory: {
    collectedShards: number[];
    attunedCrystals: number[];
    readInscriptions: number[];
  };
  questProgress: any;
  memoryProfile: any;
  lastTransform: {
    x: number;
    y: number;
    z: number;
    yaw: number;
  };
  savedAt: number;
}

// ==========================================
// 4. ISOLATED WORLD INSTANCE DATA & ROOM SYNC
// ==========================================

export interface PlacedVoxelData {
  gx: number;
  gy: number;
  gz: number;
  kind: string;
  rot?: number;
  yBase?: number;
}

export interface RoomWorldSnapshot {
  crystals: number[];
  shards: number[];
  inscriptions: number[];
  isTempleDoorOpen: boolean;
  questProgress?: any;
  darkProgress?: any;
  world1Voxels: PlacedVoxelData[];
  world2Voxels: PlacedVoxelData[];
  world1Enemies: { id: string; hp: number; maxHp: number; isDead: boolean }[];
  world1HarvestedTrees: { x: number; z: number }[];
  world1HarvestedBoulders: { x: number; z: number }[];
  darkMonsters: { spawnId: number; hp: number; maxHp: number; alive: boolean }[];
  darkNodes: { nodeId: number; hp: number; alive: boolean }[];
  darkChests: string[];
}

export interface WorldInstanceData {
  version: number;
  worldId: RoomId;
  hostPlayerId: PlayerId;
  instanceSeed: number;
  isTempleDoorOpen: boolean;
  shrineActivationStates: Record<string, boolean>;
  crystalCollectedStates: Record<number, boolean>;
  shardCollectedStates: Record<number, boolean>;
  defeatedBosses: string[];
  dayNightCycleTime: number;
  weatherState: 'CLEAR' | 'ECHO_MIST' | 'AURORA_STORM';
  updatedAt: number;
}

export interface RoomSummary {
  roomId: RoomId;
  name: string;
  playerCount: number;
  isPrivate: boolean;
}

// ==========================================
// 5. PARTY, FRIENDS, INVITES, CHAT & VOICE
// ==========================================

export interface PartyMember {
  playerId: PlayerId;
  username: string;
  characterClass: CharacterClass;
  isLeader: boolean;
  hp: number;
  maxHp: number;
  isReady: boolean;
  pingMs: number;
  realm?: RealmId;
  lastTransform?: PlayerTransformSnapshot;
}

export interface PartyGroup {
  partyId: PartyId;
  leaderId: PlayerId;
  passCode: string;
  members: PartyMember[];
  maxMembers: number;
  sharedObjectiveAr: string;
  sharedObjectiveEn: string;
  createdAt: number;
}

export interface WaypointPing {
  id: string;
  senderId: PlayerId;
  senderName: string;
  x: number;
  y: number;
  z: number;
  type: 'EXPLORE' | 'DANGER' | 'SHRINE' | 'HELP';
  realm?: RealmId;
  timestamp: number;
  durationMs: number;
}

export interface FriendEntry {
  playerId: PlayerId;
  username: string;
  characterClass: CharacterClass | string;
  auraColor: string;
  online: boolean;
  roomId: RoomId | null;
  partyId?: PartyId | null;
  realm: RealmId;
  lastSeen: number;
}

export interface MultiplayerInvite {
  inviteId: string;
  kind: 'ROOM' | 'PARTY';
  fromPlayerId: PlayerId;
  fromUsername: string;
  fromAuraColor?: string;
  roomId: RoomId;
  partyId?: PartyId;
  partyCode?: string;
  realm: RealmId;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  senderId: PlayerId;
  senderName: string;
  senderColor: string;
  realm: RealmId;
  channel: 'ROOM' | 'PARTY' | 'FRIENDS' | 'SYSTEM';
  text: string;
  timestamp: number;
}

export interface VoicePeerState {
  playerId: PlayerId;
  username: string;
  enabled: boolean;
  muted: boolean;
  speaking: boolean;
  localMuted?: boolean;
  connected?: boolean;
}

// ==========================================
// 6. NETWORK PACKETS (SERVER-AUTHORITATIVE)
// ==========================================

export type ClientPacket =
  | { type: 'C_PING'; clientTime: number }
  | { type: 'C_AUTH'; profile: PlayerAccountProfile; friendIds?: PlayerId[]; token?: string }
  | { type: 'C_UPDATE_PROFILE'; profile: Partial<PlayerAccountProfile> }
  | { type: 'C_LIST_ROOMS' }
  | { type: 'C_ROOM_CREATE'; name: string; isPrivate?: boolean; passCode?: string; seedSnapshot?: Partial<RoomWorldSnapshot> }
  | { type: 'C_JOIN_ROOM'; roomId: RoomId; passCode?: string; bypassCode?: boolean }
  | { type: 'C_LEAVE_ROOM'; roomId?: RoomId }
  | { type: 'C_SYNC_TRANSFORM'; transform: PlayerTransformSnapshot }
  | { type: 'C_COMBAT_ATTACK'; comboStep: number; origin: { x: number; y: number; z: number }; facingAngle: number }
  | {
      type: 'C_WEAPON_SHOT';
      weapon: 'pistol' | 'bow';
      origin: { x: number; y: number; z: number };
      dir: { x: number; y: number; z: number };
      power?: number;
    }
  | { type: 'C_COMBAT_DODGE'; direction: { x: number; z: number } }
  | { type: 'C_COMBAT_PULSE'; origin: { x: number; y: number; z: number } }
  | { type: 'C_VOXEL_UPDATE'; realm: RealmId; op: 'PLACE' | 'REMOVE'; blocks: PlacedVoxelData[] }
  | { type: 'C_WORLD_PROGRESS_UPDATE'; delta: Partial<RoomWorldSnapshot> }
  | {
      type: 'C_ENEMY_DAMAGE';
      realm: RealmId;
      enemyId?: string;
      spawnId?: number;
      hp: number;
      maxHp: number;
      isDead?: boolean;
      alive?: boolean;
      pos?: { x: number; y: number; z: number };
    }
  | {
      type: 'C_RESOURCE_HIT';
      resourceType: 'WORLD1_TREE' | 'WORLD1_BOULDER' | 'DARK_NODE' | 'DARK_CHEST';
      x?: number;
      z?: number;
      nodeId?: number;
      hp?: number;
      chestId?: string;
      destroyed?: boolean;
    }
  | { type: 'C_PARTY_CREATE' }
  | { type: 'C_PARTY_JOIN'; partyId?: PartyId; passCode?: string }
  | { type: 'C_PARTY_LEAVE' }
  | { type: 'C_PARTY_PING'; ping: Omit<WaypointPing, 'id' | 'timestamp'> }
  | { type: 'C_FRIEND_LIST_SYNC'; friendIds: PlayerId[] }
  | { type: 'C_FRIEND_ADD'; query: string }
  | { type: 'C_FRIEND_REMOVE'; targetPlayerId: PlayerId }
  | { type: 'C_INVITE_SEND'; targetPlayerId: PlayerId; kind: 'ROOM' | 'PARTY' }
  | {
      type: 'C_INVITE_RESPOND';
      inviteId: string;
      fromPlayerId: PlayerId;
      kind: 'ROOM' | 'PARTY';
      roomId: RoomId;
      partyId?: PartyId;
      accept: boolean;
    }
  | { type: 'C_CHAT_MESSAGE'; text: string; channel: 'ROOM' | 'PARTY' | 'FRIENDS' }
  | { type: 'C_VOICE_STATE'; enabled: boolean; muted: boolean; speaking: boolean }
  | { type: 'C_PORTAL_TRAVEL'; targetRealm: RealmId; scope: 'PARTY' | 'ROOM' }
  | {
      type: 'C_WEBRTC_SIGNAL';
      targetPlayerId: PlayerId;
      signalType: 'offer' | 'answer' | 'ice';
      sdp?: RTCSessionDescriptionInit;
      candidate?: RTCIceCandidateInit;
    };

export type ServerPacket =
  | { type: 'S_PONG'; clientTime: number; serverTime: number }
  | { type: 'S_AUTH_ACK'; success: boolean; sessionPlayerId: PlayerId; error?: string }
  | { type: 'S_ROOM_LIST'; rooms: RoomSummary[] }
  | {
      type: 'S_ROOM_STATE';
      roomId: RoomId;
      roomName: string;
      isPrivate: boolean;
      hostPlayerId: PlayerId;
      worldSnapshot: RoomWorldSnapshot;
      remotePlayers: {
        profile: PlayerAccountProfile;
        transform: PlayerTransformSnapshot;
        voice?: { enabled: boolean; muted: boolean; speaking: boolean };
      }[];
    }
  | {
      type: 'S_PLAYER_JOINED';
      profile: PlayerAccountProfile;
      transform: PlayerTransformSnapshot;
      voice?: { enabled: boolean; muted: boolean; speaking: boolean };
    }
  | { type: 'S_PLAYER_LEFT'; playerId: PlayerId; reason?: string }
  | { type: 'S_PLAYER_PROFILE_UPDATED'; playerId: PlayerId; profile: PlayerAccountProfile }
  | { type: 'S_REMOTE_TRANSFORM'; playerId: PlayerId; transform: PlayerTransformSnapshot }
  | { type: 'S_REMOTE_ATTACK'; playerId: PlayerId; comboStep: number; origin: { x: number; y: number; z: number }; facingAngle: number }
  | {
      type: 'S_REMOTE_SHOT';
      playerId: PlayerId;
      realm: RealmId;
      weapon: 'pistol' | 'bow';
      origin: { x: number; y: number; z: number };
      dir: { x: number; y: number; z: number };
      power?: number;
    }
  | { type: 'S_REMOTE_DODGE'; playerId: PlayerId; direction: { x: number; z: number } }
  | { type: 'S_REMOTE_PULSE'; playerId: PlayerId; origin: { x: number; y: number; z: number } }
  | { type: 'S_VOXEL_UPDATE'; senderId: PlayerId; realm: RealmId; op: 'PLACE' | 'REMOVE'; blocks: PlacedVoxelData[] }
  | { type: 'S_WORLD_PROGRESS_UPDATE'; senderId: PlayerId; delta: Partial<RoomWorldSnapshot> }
  | {
      type: 'S_ENEMY_STATE';
      senderId: PlayerId;
      realm: RealmId;
      enemyId?: string;
      spawnId?: number;
      hp: number;
      maxHp: number;
      isDead?: boolean;
      alive?: boolean;
      pos?: { x: number; y: number; z: number };
    }
  | {
      type: 'S_RESOURCE_STATE';
      senderId: PlayerId;
      resourceType: 'WORLD1_TREE' | 'WORLD1_BOULDER' | 'DARK_NODE' | 'DARK_CHEST';
      x?: number;
      z?: number;
      nodeId?: number;
      hp?: number;
      chestId?: string;
      destroyed?: boolean;
    }
  | { type: 'S_WORLD_STATE_UPDATE'; delta: Partial<WorldInstanceData> }
  | { type: 'S_PARTY_STATE'; party: PartyGroup | null }
  | { type: 'S_PARTY_PING'; ping: WaypointPing }
  | { type: 'S_FRIENDS_STATUS'; friends: FriendEntry[] }
  | { type: 'S_FRIEND_ADDED'; friend: FriendEntry }
  | { type: 'S_INVITE_RECEIVED'; invite: MultiplayerInvite }
  | { type: 'S_INVITE_RESULT'; inviteId: string; targetUsername: string; status: 'SENT' | 'ACCEPTED' | 'DECLINED' }
  | {
      type: 'S_CHAT_BROADCAST';
      id: string;
      senderId: PlayerId;
      senderName: string;
      senderColor: string;
      realm: RealmId;
      channel: 'ROOM' | 'PARTY' | 'FRIENDS';
      text: string;
      timestamp: number;
    }
  | {
      type: 'S_VOICE_STATE';
      playerId: PlayerId;
      username: string;
      voice: { enabled: boolean; muted: boolean; speaking: boolean };
    }
  | {
      type: 'S_WEBRTC_SIGNAL';
      fromPlayerId: PlayerId;
      signalType: 'offer' | 'answer' | 'ice';
      sdp?: RTCSessionDescriptionInit;
      candidate?: RTCIceCandidateInit;
    }
  | {
      type: 'S_PORTAL_TRAVEL';
      initiatorId: PlayerId;
      initiatorName: string;
      targetRealm: RealmId;
      scope: 'PARTY' | 'ROOM';
      crystalsCount?: number;
      timestamp: number;
    }
  | {
      type: 'S_SWITCH_ROOM';
      roomId: RoomId;
      roomName: string;
      passCode?: string;
      bypassCode?: boolean;
    }
  | { type: 'S_ERROR'; code: string; message: string };

// ==========================================
// 7. CLIENT NETWORK CONFIGURATION
// ==========================================

export type NetworkMode = 'OFFLINE_SINGLEPLAYER' | 'LOCAL_P2P' | 'CENTRAL_SERVER';

export interface MultiplayerConfig {
  mode: NetworkMode;
  serverUrl: string;
  reconnectIntervalMs: number;
  maxReconnectAttempts: number;
  sendRateHz: number;
  interpolationDelayMs: number;
}
