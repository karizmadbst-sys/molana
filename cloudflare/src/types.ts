export type RealmId = 'ISLAND' | 'DARK_REALM';
export type PlayerId = string;
export type RoomId = string;
export type PartyId = string;

export interface Env {
  DB: D1Database;
  ECHO_ROOM: DurableObjectNamespace;
  ECHO_LOBBY: DurableObjectNamespace;
  AUTH_SECRET?: string;
  ALLOWED_ORIGINS?: string;
}

export interface PlayerAccountProfile {
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
  actionState: string;
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

export interface VoiceState {
  enabled: boolean;
  muted: boolean;
  speaking: boolean;
}

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
  questProgress?: unknown;
  darkProgress?: unknown;
  world1Voxels: PlacedVoxelData[];
  world2Voxels: PlacedVoxelData[];
  world1Enemies: { id: string; hp: number; maxHp: number; isDead: boolean }[];
  world1HarvestedTrees: { x: number; z: number }[];
  world1HarvestedBoulders: { x: number; z: number }[];
  darkMonsters: { spawnId: number; hp: number; maxHp: number; alive: boolean }[];
  darkNodes: { nodeId: number; hp: number; alive: boolean }[];
  darkChests: string[];
}

export interface RoomSummary {
  roomId: RoomId;
  name: string;
  playerCount: number;
  isPrivate: boolean;
}

export interface PartyMember {
  playerId: PlayerId;
  username: string;
  characterClass: string;
  isLeader: boolean;
  hp: number;
  maxHp: number;
  isReady: boolean;
  pingMs: number;
  realm: RealmId;
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

export interface FriendEntry {
  playerId: PlayerId;
  username: string;
  characterClass: string;
  auraColor: string;
  online: boolean;
  roomId: RoomId | null;
  partyId?: PartyId | null;
  realm: RealmId;
  lastSeen: number;
}

export interface OnlinePresence {
  playerId: PlayerId;
  profile: PlayerAccountProfile;
  roomId: RoomId;
  partyId: PartyId | null;
  realm: RealmId;
  hp: number;
  maxHp: number;
  friendIds: string[];
  voice: VoiceState;
  lastSeen: number;
}

export interface SessionAttachment {
  playerId: string;
  profile: PlayerAccountProfile;
  transform: PlayerTransformSnapshot;
  partyId: string | null;
  friendIds: string[];
  voice: VoiceState;
  authenticated: boolean;
  connectedAt: number;
  msgCountWindow: number;
  msgWindowStart: number;
}

export function defaultTransform(): PlayerTransformSnapshot {
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
    weapon: 'sword',
    isBlocking: false,
    isAiming: false,
    bowDraw: 0,
    timestamp: Date.now(),
  };
}

export function sanitizeRoomId(raw: string | null | undefined): string {
  const cleaned = String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, '')
    .slice(0, 32);
  return cleaned || 'ECHO-PUBLIC-1';
}

export function generateCode(prefix: string, length: number = 5): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = `${prefix}-`;
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  for (let i = 0; i < length; i++) {
    out += chars.charAt(bytes[i] % chars.length);
  }
  return out;
}
