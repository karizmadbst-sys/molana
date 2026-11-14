/**
 * ECHO – THE WORLD REMEMBERS
 * Central Network Protocol, Cloudflare Auth/D1 Sync & Resilient WebSocket Transport
 */

import { ClientPacket, ServerPacket, NetworkMode, PlayerAccountProfile } from './types.ts';

export type PacketHandler = (packet: ServerPacket) => void;
export type ConnectionStateHandler = (connected: boolean, mode: NetworkMode) => void;

const STORAGE_KEY_SERVER_URL = 'echo_mp_server_url_v1';
const STORAGE_KEY_AUTH_TOKEN = 'echo_mp_auth_token_v1';

export interface MultiplayerEndpoints {
  wsUrl: string;
  apiUrl: string;
  isConfigured: boolean;
  source: 'query' | 'storage' | 'env' | 'same-origin' | 'unconfigured';
}

export interface INetworkTransport {
  readonly mode: NetworkMode;
  readonly isConnected: boolean;
  readonly pingMs: number;

  connect(url?: string, token?: string, roomId?: string): Promise<boolean>;
  disconnect(): void;
  send(packet: ClientPacket): void;
  flushPendingQueue?(): void;
  setRoom?(roomId: string): void;
  setToken?(token: string): void;
  switchRoom?(roomId: string): Promise<boolean>;
  onPacket(handler: PacketHandler): () => void;
  onConnectionChange?(handler: ConnectionStateHandler): () => void;
}

export function normalizeServerUrls(rawInput: string): { wsUrl: string; apiUrl: string } | null {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  let normalized = trimmed;
  if (!/^(https?|wss?):\/\//i.test(normalized)) {
    const isLocal = /^(localhost|127\.0\.0\.1)(:|\/|$)/i.test(normalized);
    normalized = `${isLocal ? 'http://' : 'https://'}${normalized}`;
  }

  try {
    const u = new URL(normalized);
    const isSecure = u.protocol === 'https:' || u.protocol === 'wss:';
    const wsProto = isSecure ? 'wss:' : 'ws:';
    const httpProto = isSecure ? 'https:' : 'http:';
    const basePath = u.pathname.replace(/\/ws\/?$/i, '').replace(/\/+$/, '');
    const wsUrl = `${wsProto}//${u.host}${basePath}/ws`;
    const apiUrl = `${httpProto}//${u.host}${basePath}`;
    return { wsUrl, apiUrl };
  } catch {
    return null;
  }
}

export function setCustomMultiplayerServerUrl(rawInput: string | null): MultiplayerEndpoints {
  try {
    if (!rawInput || !rawInput.trim()) {
      localStorage.removeItem(STORAGE_KEY_SERVER_URL);
    } else {
      const parsed = normalizeServerUrls(rawInput);
      if (parsed) {
        localStorage.setItem(STORAGE_KEY_SERVER_URL, parsed.wsUrl);
      }
    }
  } catch {
    // ignore storage errors
  }
  return resolveMultiplayerEndpoints();
}

export function resolveMultiplayerEndpoints(): MultiplayerEndpoints {
  // 1. Check URL query parameter ?server=wss://your-worker.workers.dev
  if (typeof window !== 'undefined' && window.location) {
    try {
      const params = new URLSearchParams(window.location.search);
      const serverParam = params.get('server');
      if (serverParam) {
        const parsed = normalizeServerUrls(serverParam);
        if (parsed) {
          try {
            localStorage.setItem(STORAGE_KEY_SERVER_URL, parsed.wsUrl);
          } catch {
            // ignore
          }
          return { ...parsed, isConfigured: true, source: 'query' };
        }
      }
    } catch {
      // ignore
    }
  }

  // 2. User-saved server override in localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY_SERVER_URL);
    if (stored) {
      const parsed = normalizeServerUrls(stored);
      if (parsed) {
        return { ...parsed, isConfigured: true, source: 'storage' };
      }
    }
  } catch {
    // ignore
  }

  // 3. Build-time Vite env variables (set by GitHub Pages workflow / .env)
  const envWs = (import.meta as any).env?.VITE_MULTIPLAYER_WS_URL as string | undefined;
  const envApi = (import.meta as any).env?.VITE_MULTIPLAYER_API_URL as string | undefined;
  if (envWs && envWs.trim()) {
    const parsed = normalizeServerUrls(envWs);
    if (parsed) {
      return {
        wsUrl: parsed.wsUrl,
        apiUrl: envApi && envApi.trim() ? envApi.trim().replace(/\/+$/, '') : parsed.apiUrl,
        isConfigured: true,
        source: 'env',
      };
    }
  }

  // 4. Static hosts without built-in WebSocket backend (GitHub Pages / Electron / Capacitor)
  if (typeof window !== 'undefined' && window.location) {
    const host = window.location.hostname.toLowerCase();
    const proto = window.location.protocol;
    const isGitHubPages = host.endsWith('github.io');
    const isElectronStatic = host === '127.0.0.1' && window.location.port !== '3000';
    const isCapacitor = proto === 'capacitor:' || (host === 'localhost' && !window.location.port);

    if (isGitHubPages || isElectronStatic || isCapacitor || proto === 'file:' || !window.location.host) {
      return {
        wsUrl: '',
        apiUrl: '',
        isConfigured: false,
        source: 'unconfigured',
      };
    }

    // 5. Full-stack Express + Vite server (local dev / self-hosted Node)
    const wsProto = proto === 'https:' ? 'wss:' : 'ws:';
    return {
      wsUrl: `${wsProto}//${window.location.host}/ws`,
      apiUrl: `${proto}//${window.location.host}`,
      isConfigured: true,
      source: 'same-origin',
    };
  }

  return {
    wsUrl: 'ws://localhost:3000/ws',
    apiUrl: 'http://localhost:3000',
    isConfigured: true,
    source: 'same-origin',
  };
}

export function resolveDefaultWebSocketUrl(): string {
  return resolveMultiplayerEndpoints().wsUrl;
}

export function getCachedAuthToken(playerId: string): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH_TOKEN);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { playerId: string; token: string; expiresAt: number };
    if (
      parsed &&
      parsed.playerId === playerId &&
      typeof parsed.token === 'string' &&
      parsed.expiresAt > Date.now() + 60_000
    ) {
      return parsed.token;
    }
  } catch {
    // ignore
  }
  return null;
}

export function cacheAuthToken(playerId: string, token: string, expiresAt: number): void {
  try {
    localStorage.setItem(STORAGE_KEY_AUTH_TOKEN, JSON.stringify({ playerId, token, expiresAt }));
  } catch {
    // ignore
  }
}

export async function authenticateCloudSession(
  apiUrl: string,
  profile: PlayerAccountProfile
): Promise<{ token: string; expiresAt: number; cloudUpdatedAt: number } | null> {
  if (!apiUrl) return null;
  try {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${apiUrl}/api/auth/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerId: profile.id, profile }),
      signal: controller.signal,
    });
    window.clearTimeout(timer);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      ok?: boolean;
      token?: string;
      expiresAt?: number;
      cloudUpdatedAt?: number;
    };
    if (data?.ok && data.token) {
      const expiresAt = data.expiresAt || Date.now() + 7 * 24 * 60 * 60 * 1000;
      cacheAuthToken(profile.id, data.token, expiresAt);
      return {
        token: data.token,
        expiresAt,
        cloudUpdatedAt: data.cloudUpdatedAt || 0,
      };
    }
  } catch {
    // Fallback gracefully to cached token or direct WS C_AUTH
  }
  return null;
}

export async function uploadCloudPlayerSave(
  apiUrl: string,
  token: string,
  save: unknown,
  darkProgress: unknown
): Promise<{ ok: boolean; updatedAt?: number }> {
  if (!apiUrl || !token) return { ok: false };
  try {
    const res = await fetch(`${apiUrl}/api/player/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ save, darkProgress }),
    });
    if (!res.ok) return { ok: false };
    const data = (await res.json()) as { ok?: boolean; updatedAt?: number };
    return { ok: Boolean(data?.ok), updatedAt: data?.updatedAt };
  } catch {
    return { ok: false };
  }
}

export async function downloadCloudPlayerSave(
  apiUrl: string,
  token: string
): Promise<{ ok: boolean; save?: any; darkProgress?: any; updatedAt?: number }> {
  if (!apiUrl || !token) return { ok: false };
  try {
    const res = await fetch(`${apiUrl}/api/player/save`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return { ok: false };
    const data = (await res.json()) as {
      ok?: boolean;
      save?: any;
      darkProgress?: any;
      updatedAt?: number;
    };
    return {
      ok: Boolean(data?.ok),
      save: data?.save,
      darkProgress: data?.darkProgress,
      updatedAt: data?.updatedAt || 0,
    };
  } catch {
    return { ok: false };
  }
}

/**
 * Offline Loopback Transport (Used only when no multiplayer server endpoint is configured)
 */
export class OfflineLoopbackTransport implements INetworkTransport {
  public readonly mode: NetworkMode = 'OFFLINE_SINGLEPLAYER';
  public isConnected: boolean = false;
  public pingMs: number = 0;

  private handlers = new Set<PacketHandler>();
  private stateHandlers = new Set<ConnectionStateHandler>();

  public async connect(_url?: string, _token?: string, _roomId?: string): Promise<boolean> {
    this.isConnected = false;
    this.stateHandlers.forEach((h) => h(false, this.mode));
    return false;
  }

  public disconnect(): void {
    this.isConnected = false;
    this.stateHandlers.forEach((h) => h(false, this.mode));
  }

  public send(packet: ClientPacket): void {
    if (packet.type === 'C_AUTH') {
      setTimeout(() => {
        this.emitToLocal({
          type: 'S_AUTH_ACK',
          success: true,
          sessionPlayerId: packet.profile.id,
        });
      }, 10);
    }
  }

  public onPacket(handler: PacketHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  public onConnectionChange(handler: ConnectionStateHandler): () => void {
    this.stateHandlers.add(handler);
    return () => this.stateHandlers.delete(handler);
  }

  private emitToLocal(packet: ServerPacket): void {
    this.handlers.forEach((h) => h(packet));
  }
}

const QUEUEABLE_PACKET_TYPES = new Set<ClientPacket['type']>([
  'C_VOXEL_UPDATE',
  'C_WORLD_PROGRESS_UPDATE',
  'C_CHAT_MESSAGE',
  'C_UPDATE_PROFILE',
  'C_PORTAL_TRAVEL',
  'C_RESOURCE_HIT',
  'C_ENEMY_DAMAGE',
]);

/**
 * Production WebSocket Transport Adapter
 * Connects to Cloudflare Workers + Durable Objects (or local Express /ws)
 * with signed auth tokens, room-targeted URLs, offline delta buffering, and resilient auto-reconnect.
 */
export class WebSocketTransportAdapter implements INetworkTransport {
  public readonly mode: NetworkMode = 'CENTRAL_SERVER';
  public isConnected: boolean = false;
  public pingMs: number = 0;

  private socket: WebSocket | null = null;
  private handlers = new Set<PacketHandler>();
  private stateHandlers = new Set<ConnectionStateHandler>();
  private pingInterval: number | null = null;
  private reconnectTimer: number | null = null;
  private reconnectAttempts = 0;
  private manualDisconnect = false;
  private activeUrl: string;
  private activeToken?: string;
  private activeRoomId: string = 'ECHO-PUBLIC-1';
  private lastPongAt: number = 0;
  private pendingQueue: ClientPacket[] = [];
  private isSwitchingRoom = false;

  private onOnlineListener = () => {
    if (!this.manualDisconnect && !this.isConnected) {
      this.reconnectAttempts = 0;
      void this.connect(this.activeUrl, this.activeToken, this.activeRoomId);
    }
  };

  private onVisibilityListener = () => {
    if (
      typeof document !== 'undefined' &&
      document.visibilityState === 'visible' &&
      !this.manualDisconnect &&
      !this.isConnected
    ) {
      this.reconnectAttempts = 0;
      void this.connect(this.activeUrl, this.activeToken, this.activeRoomId);
    }
  };

  constructor(private serverUrl: string = resolveDefaultWebSocketUrl()) {
    this.activeUrl = serverUrl;
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.onOnlineListener);
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibilityListener);
    }
  }

  public setRoom(roomId: string): void {
    if (roomId && roomId.trim()) {
      this.activeRoomId = roomId.trim().toUpperCase();
    }
  }

  public setToken(token: string): void {
    this.activeToken = token;
  }

  public async switchRoom(roomId: string): Promise<boolean> {
    this.setRoom(roomId);
    this.isSwitchingRoom = true;
    try {
      return await this.connect(this.activeUrl, this.activeToken, this.activeRoomId);
    } finally {
      this.isSwitchingRoom = false;
    }
  }

  private buildConnectionUrl(baseUrl: string, token?: string, roomId?: string): string {
    const urlObj = new URL(baseUrl);
    if (roomId) {
      urlObj.searchParams.set('room', roomId);
    }
    if (token) {
      urlObj.searchParams.set('token', token);
    }
    return urlObj.toString();
  }

  public connect(url?: string, token?: string, roomId?: string): Promise<boolean> {
    const targetUrl = url || this.activeUrl || this.serverUrl || resolveDefaultWebSocketUrl();
    if (!targetUrl) {
      return Promise.resolve(false);
    }
    this.activeUrl = targetUrl;
    if (token !== undefined) this.activeToken = token;
    if (roomId !== undefined) this.setRoom(roomId);
    this.manualDisconnect = false;

    if (this.reconnectTimer !== null) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    return new Promise((resolve) => {
      let settled = false;
      const finish = (ok: boolean) => {
        if (settled) return;
        settled = true;
        resolve(ok);
      };

      try {
        if (this.socket) {
          const prevSocket = this.socket;
          this.socket = null;
          try {
            prevSocket.close(1000, 'Reconnecting');
          } catch {
            // ignore
          }
        }

        const fullUrl = this.buildConnectionUrl(targetUrl, this.activeToken, this.activeRoomId);
        const ws = new WebSocket(fullUrl);
        this.socket = ws;

        const connectTimeout = window.setTimeout(() => {
          if (this.socket === ws && !this.isConnected) {
            try {
              ws.close();
            } catch {
              // ignore
            }
            finish(false);
          }
        }, 6000);

        ws.onopen = () => {
          window.clearTimeout(connectTimeout);
          if (this.socket !== ws) return;
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.lastPongAt = performance.now();
          this.startHeartbeat();
          this.sendImmediate({ type: 'C_PING', clientTime: performance.now() });
          this.stateHandlers.forEach((h) => h(true, this.mode));
          finish(true);
        };

        ws.onmessage = (event) => {
          this.lastPongAt = performance.now();
          try {
            const packet: ServerPacket = JSON.parse(event.data);
            if (packet.type === 'S_PONG') {
              this.pingMs = Math.max(1, Math.round(performance.now() - packet.clientTime));
              return;
            }
            this.handlers.forEach((h) => h(packet));
          } catch (e) {
            console.warn('Failed to parse incoming packet:', e);
          }
        };

        ws.onerror = () => {
          window.clearTimeout(connectTimeout);
          finish(false);
        };

        ws.onclose = () => {
          window.clearTimeout(connectTimeout);
          if (this.socket !== ws) return;
          const wasConnected = this.isConnected;
          this.isConnected = false;
          this.stopHeartbeat();
          if (wasConnected && !this.isSwitchingRoom) {
            this.stateHandlers.forEach((h) => h(false, this.mode));
          }
          finish(false);

          if (!this.manualDisconnect && !this.isSwitchingRoom) {
            this.scheduleReconnect();
          }
        };
      } catch (err) {
        console.warn('WebSocket init exception:', err);
        finish(false);
      }
    });
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer !== null || this.manualDisconnect) return;
    const baseDelay = Math.min(15000, 1200 * Math.pow(1.45, Math.min(this.reconnectAttempts, 8)));
    const jitter = Math.random() * 500;
    this.reconnectAttempts++;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      void this.connect(this.activeUrl, this.activeToken, this.activeRoomId);
    }, baseDelay + jitter);
  }

  public disconnect(): void {
    this.manualDisconnect = true;
    this.stopHeartbeat();
    if (this.reconnectTimer !== null) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.onOnlineListener);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.onVisibilityListener);
    }
    if (this.socket) {
      const sock = this.socket;
      this.socket = null;
      try {
        sock.close(1000, 'Client disconnect');
      } catch {
        // ignore
      }
    }
    this.isConnected = false;
    this.stateHandlers.forEach((h) => h(false, this.mode));
  }

  private sendImmediate(packet: ClientPacket): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(packet));
    }
  }

  public send(packet: ClientPacket): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(packet));
      return;
    }

    // Buffer critical world/building/chat actions while temporarily disconnected
    if (!this.manualDisconnect && QUEUEABLE_PACKET_TYPES.has(packet.type)) {
      if (this.pendingQueue.length >= 80) {
        this.pendingQueue.shift();
      }
      this.pendingQueue.push(packet);
    }
  }

  public flushPendingQueue(): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN || this.pendingQueue.length === 0) {
      return;
    }
    const items = this.pendingQueue.splice(0, this.pendingQueue.length);
    for (const pkt of items) {
      try {
        this.socket.send(JSON.stringify(pkt));
      } catch {
        this.pendingQueue.unshift(pkt);
        break;
      }
    }
  }

  public onPacket(handler: PacketHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  public onConnectionChange(handler: ConnectionStateHandler): () => void {
    this.stateHandlers.add(handler);
    return () => this.stateHandlers.delete(handler);
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();
    this.pingInterval = window.setInterval(() => {
      if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return;
      // Detect dead half-open mobile/Wi-Fi sockets if silent for >14s
      if (this.lastPongAt > 0 && performance.now() - this.lastPongAt > 14000) {
        try {
          this.socket.close(4002, 'Heartbeat timeout');
        } catch {
          // ignore
        }
        return;
      }
      this.sendImmediate({ type: 'C_PING', clientTime: performance.now() });
    }, 4000);
  }

  private stopHeartbeat(): void {
    if (this.pingInterval !== null) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
