import { Env } from './types.ts';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export interface SessionTokenPayload {
  pid: string;
  iat: number;
  exp: number;
  nonce: string;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(str: string): Uint8Array | null {
  try {
    const padded = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4);
    const binary = atob(padded);
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      out[i] = binary.charCodeAt(i);
    }
    return out;
  } catch {
    return null;
  }
}

async function getSigningKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

function resolveSecret(env: Env): string {
  if (env.AUTH_SECRET && env.AUTH_SECRET.trim().length >= 12) {
    return env.AUTH_SECRET.trim();
  }
  // Ephemeral deterministic fallback per Worker deployment if AUTH_SECRET secret hasn't been configured yet.
  // Production deployments should always set `wrangler secret put AUTH_SECRET`.
  return 'echo-the-world-remembers-default-session-key-change-in-prod';
}

export async function issueSessionToken(
  env: Env,
  playerId: string,
  ttlMs: number = 7 * 24 * 60 * 60 * 1000
): Promise<{ token: string; expiresAt: number }> {
  const now = Date.now();
  const expiresAt = now + ttlMs;
  const nonceBytes = new Uint8Array(12);
  crypto.getRandomValues(nonceBytes);
  const payload: SessionTokenPayload = {
    pid: playerId,
    iat: now,
    exp: expiresAt,
    nonce: toBase64Url(nonceBytes),
  };

  const payloadEncoded = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const key = await getSigningKey(resolveSecret(env));
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payloadEncoded));
  const sigEncoded = toBase64Url(new Uint8Array(sig));

  return {
    token: `${payloadEncoded}.${sigEncoded}`,
    expiresAt,
  };
}

export async function verifySessionToken(
  env: Env,
  token: string | null | undefined
): Promise<SessionTokenPayload | null> {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadEncoded, sigEncoded] = parts;
  if (!payloadEncoded || !sigEncoded) return null;

  const sigBytes = fromBase64Url(sigEncoded);
  if (!sigBytes) return null;

  const key = await getSigningKey(resolveSecret(env));
  const ok = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(payloadEncoded));
  if (!ok) return null;

  const payloadBytes = fromBase64Url(payloadEncoded);
  if (!payloadBytes) return null;

  try {
    const payload = JSON.parse(decoder.decode(payloadBytes)) as SessionTokenPayload;
    if (!payload || typeof payload.pid !== 'string' || typeof payload.exp !== 'number') {
      return null;
    }
    if (Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function hashPasscode(passCode: string): Promise<string> {
  const clean = passCode.trim();
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(`echo_room_pass:${clean}`));
  return toBase64Url(new Uint8Array(digest));
}

export function extractBearerToken(request: Request): string | null {
  const auth = request.headers.get('Authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.slice(7).trim();
  }
  const url = new URL(request.url);
  return url.searchParams.get('token');
}

export function isOriginAllowed(origin: string | null, env: Env): boolean {
  if (!origin) return true; // Native / Electron / Capacitor / server calls without Origin
  const rawAllowed = (env.ALLOWED_ORIGINS || '*').trim();
  if (rawAllowed === '*') return true;

  const allowedList = rawAllowed
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const lowerOrigin = origin.toLowerCase();
  if (
    lowerOrigin.startsWith('http://localhost:') ||
    lowerOrigin.startsWith('http://127.0.0.1:') ||
    lowerOrigin === 'capacitor://localhost' ||
    lowerOrigin === 'https://localhost'
  ) {
    return true;
  }

  return allowedList.some((allowed) => {
    if (allowed === '*') return true;
    if (allowed.startsWith('*.')) {
      const domain = allowed.slice(1);
      return lowerOrigin.endsWith(domain);
    }
    return lowerOrigin === allowed;
  });
}

export function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowedOrigin = isOriginAllowed(origin, env) ? origin || '*' : 'null';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}
