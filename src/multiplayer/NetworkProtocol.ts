/**
 * ECHO – THE WORLD REMEMBERS
 * Central Network Protocol & Transport Abstraction
 */

import { ClientPacket, ServerPacket, NetworkMode } from './types.ts';

export type PacketHandler = (packet: ServerPacket) => void;
export type ConnectionStateHandler = (connected: boolean, mode: NetworkMode) => void;

export interface INetworkTransport {
  readonly mode: NetworkMode;
  readonly isConnected: boolean;
  readonly pingMs: number;

  connect(url?: string, token?: string): Promise<boolean>;
  disconnect(): void;
  send(packet: ClientPacket): void;
  onPacket(handler: PacketHandler): () => void;
  onConnectionChange?(handler: ConnectionStateHandler): () => void;
}

export function resolveDefaultWebSocketUrl(): string {
  if (
    typeof window === 'undefined' ||
    !window.location ||
    window.location.protocol === 'file:' ||
    !window.location.host
  ) {
    return 'ws://localhost:3000/ws';
  }
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/ws`;
}

/**
 * Offline Loopback Transport (Fallback when offline or running static Capacitor bundle without server)
 */
export class OfflineLoopbackTransport implements INetworkTransport {
  public readonly mode: NetworkMode = 'OFFLINE_SINGLEPLAYER';
  public isConnected: boolean = false;
  public pingMs: number = 0;

  private handlers = new Set<PacketHandler>();
  private stateHandlers = new Set<ConnectionStateHandler>();

  public async connect(_url?: string, _token?: string): Promise<boolean> {
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

/**
 * Production WebSocket Transport Adapter
 * Connects to /ws on the central Express + ws server with real RTT ping & auto-reconnect.
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

  constructor(private serverUrl: string = resolveDefaultWebSocketUrl()) {
    this.activeUrl = serverUrl;
  }

  public connect(url?: string, token?: string): Promise<boolean> {
    const targetUrl = url || this.serverUrl || resolveDefaultWebSocketUrl();
    this.activeUrl = targetUrl;
    this.activeToken = token;
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
          try {
            this.socket.close();
          } catch {
            // ignore
          }
        }
        const fullUrl = token ? `${targetUrl}?token=${encodeURIComponent(token)}` : targetUrl;
        const ws = new WebSocket(fullUrl);
        this.socket = ws;

        const connectTimeout = window.setTimeout(() => {
          if (!this.isConnected) {
            try {
              ws.close();
            } catch {
              // ignore
            }
            finish(false);
          }
        }, 4500);

        ws.onopen = () => {
          window.clearTimeout(connectTimeout);
          if (this.socket !== ws) return;
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          this.send({ type: 'C_PING', clientTime: performance.now() });
          this.stateHandlers.forEach((h) => h(true, this.mode));
          finish(true);
        };

        ws.onmessage = (event) => {
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
          if (wasConnected) {
            this.stateHandlers.forEach((h) => h(false, this.mode));
          }
          finish(false);

          if (!this.manualDisconnect) {
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
    if (this.reconnectAttempts >= 8) return;
    const delay = Math.min(12000, 1500 * Math.pow(1.4, this.reconnectAttempts));
    this.reconnectAttempts++;
    this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null;
      void this.connect(this.activeUrl, this.activeToken);
    }, delay);
  }

  public disconnect(): void {
    this.manualDisconnect = true;
    this.stopHeartbeat();
    if (this.reconnectTimer !== null) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.socket) {
      try {
        this.socket.close();
      } catch {
        // ignore
      }
      this.socket = null;
    }
    this.isConnected = false;
    this.stateHandlers.forEach((h) => h(false, this.mode));
  }

  public send(packet: ClientPacket): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(packet));
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
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.send({ type: 'C_PING', clientTime: performance.now() });
      }
    }, 4000);
  }

  private stopHeartbeat(): void {
    if (this.pingInterval !== null) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}
