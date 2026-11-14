import {
  corsHeaders,
  extractBearerToken,
  isOriginAllowed,
  issueSessionToken,
  verifySessionToken,
} from './auth.ts';
import { Env, sanitizeRoomId } from './types.ts';

export { EchoRoomDO } from './EchoRoomDO.ts';
export { EchoLobbyDO } from './EchoLobbyDO.ts';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const headers = corsHeaders(origin, env);

    if (!isOriginAllowed(origin, env)) {
      return new Response('Forbidden Origin', { status: 403, headers });
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    // 1. Health check endpoint
    if (url.pathname === '/api/health' && request.method === 'GET') {
      let d1Ready = false;
      try {
        await env.DB.prepare('SELECT 1').first();
        d1Ready = true;
      } catch {
        d1Ready = false;
      }
      return Response.json(
        {
          ok: true,
          service: 'echo-cloudflare-multiplayer',
          durableObjects: true,
          d1Ready,
          timestamp: Date.now(),
        },
        { headers }
      );
    }

    // 2. Player Authentication & Signed Session Token Endpoint (+ optional D1 cloud save metadata)
    if (url.pathname === '/api/auth/session' && request.method === 'POST') {
      const body = (await request.json().catch(() => ({}))) as Record<string, any>;
      const profile = body.profile || {};
      const playerId = String(body.playerId || profile.id || '').trim().slice(0, 80);
      if (!playerId) {
        return Response.json({ ok: false, error: 'Missing playerId' }, { status: 400, headers });
      }

      const now = Date.now();
      const { token, expiresAt } = await issueSessionToken(env, playerId);

      // Upsert player into Cloudflare D1 non-blockingly
      ctx.waitUntil(
        env.DB.prepare(
          `INSERT INTO players (id, username, title_ar, title_en, character_class, robe_color, aura_color, level, echo_mastery, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT(id) DO UPDATE SET
             username = COALESCE(NULLIF(excluded.username, ''), players.username),
             character_class = COALESCE(NULLIF(excluded.character_class, ''), players.character_class),
             robe_color = COALESCE(NULLIF(excluded.robe_color, ''), players.robe_color),
             aura_color = COALESCE(NULLIF(excluded.aura_color, ''), players.aura_color),
             level = MAX(players.level, excluded.level),
             updated_at = excluded.updated_at`
        )
          .bind(
            playerId,
            String(profile.username || 'Adventurer').slice(0, 28),
            String(profile.titleAr || 'مستكشف الأثير').slice(0, 60),
            String(profile.titleEn || 'Spirit Pioneer').slice(0, 60),
            String(profile.characterClass || 'SPIRIT_WEAVER').slice(0, 32),
            String(profile.robeColor || '#1d4ed8').slice(0, 16),
            String(profile.auraColor || '#00f5d4').slice(0, 16),
            Math.max(1, Number(profile.level || 1)),
            Math.max(0, Number(profile.echoMastery || 0)),
            Number(profile.createdAt) || now,
            now
          )
          .run()
          .catch(() => {})
      );

      let cloudUpdatedAt = 0;
      try {
        const saveRow = await env.DB.prepare(
          'SELECT updated_at FROM player_saves WHERE player_id = ? LIMIT 1'
        )
          .bind(playerId)
          .first<{ updated_at: number }>();
        cloudUpdatedAt = saveRow?.updated_at || 0;
      } catch {
        cloudUpdatedAt = 0;
      }

      return Response.json(
        {
          ok: true,
          playerId,
          token,
          expiresAt,
          cloudUpdatedAt,
        },
        { headers }
      );
    }

    // 3. Authenticated Cloudflare D1 Player Progress Cloud Save / Load
    if (url.pathname === '/api/player/save') {
      const token = extractBearerToken(request);
      const payload = await verifySessionToken(env, token);
      if (!payload) {
        return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401, headers });
      }

      if (request.method === 'GET') {
        try {
          const row = await env.DB.prepare(
            'SELECT save_json, dark_progress_json, updated_at FROM player_saves WHERE player_id = ? LIMIT 1'
          )
            .bind(payload.pid)
            .first<{ save_json: string; dark_progress_json: string | null; updated_at: number }>();
          if (!row) {
            return Response.json({ ok: true, save: null, darkProgress: null, updatedAt: 0 }, { headers });
          }
          return Response.json(
            {
              ok: true,
              save: JSON.parse(row.save_json),
              darkProgress: row.dark_progress_json ? JSON.parse(row.dark_progress_json) : null,
              updatedAt: row.updated_at,
            },
            { headers }
          );
        } catch (err) {
          return Response.json({ ok: false, error: 'Database read failed' }, { status: 500, headers });
        }
      }

      if (request.method === 'POST') {
        const body = (await request.json().catch(() => ({}))) as Record<string, any>;
        const saveStr = JSON.stringify(body.save ?? {});
        const darkStr = body.darkProgress ? JSON.stringify(body.darkProgress) : null;
        if (saveStr.length + (darkStr?.length || 0) > 512_000) {
          return Response.json({ ok: false, error: 'Save payload too large' }, { status: 413, headers });
        }
        const now = Date.now();
        try {
          await env.DB.prepare(
            `INSERT INTO player_saves (player_id, save_json, dark_progress_json, updated_at)
             VALUES (?, ?, ?, ?)
             ON CONFLICT(player_id) DO UPDATE SET
               save_json = excluded.save_json,
               dark_progress_json = COALESCE(excluded.dark_progress_json, player_saves.dark_progress_json),
               updated_at = excluded.updated_at`
          )
            .bind(payload.pid, saveStr, darkStr, now)
            .run();
          return Response.json({ ok: true, updatedAt: now }, { headers });
        } catch {
          return Response.json({ ok: false, error: 'Database write failed' }, { status: 500, headers });
        }
      }
    }

    // 4. Room directory HTTP query
    if (url.pathname === '/api/rooms' && request.method === 'GET') {
      const lobbyStub = env.ECHO_LOBBY.get(env.ECHO_LOBBY.idFromName('global'));
      const res = await lobbyStub.fetch('https://echo-lobby/internal/rooms');
      const data = await res.json();
      return Response.json(data, { headers });
    }

    // 5. Real-Time WebSocket Upgrade -> routed to EchoRoomDO by ?room=<roomId>
    if (url.pathname === '/ws') {
      if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
        return new Response('Expected WebSocket upgrade', { status: 426, headers });
      }
      const roomId = sanitizeRoomId(url.searchParams.get('room'));
      const token = url.searchParams.get('token');
      if (token) {
        const verified = await verifySessionToken(env, token);
        if (!verified) {
          return new Response('Invalid session token', { status: 401, headers });
        }
      }

      const id = env.ECHO_ROOM.idFromName(roomId);
      const stub = env.ECHO_ROOM.get(id);
      return stub.fetch(request);
    }

    return Response.json(
      {
        service: 'echo-cloudflare-multiplayer',
        endpoints: ['/api/health', '/api/auth/session', '/api/player/save', '/api/rooms', '/ws?room=ECHO-PUBLIC-1'],
      },
      { headers }
    );
  },
};
