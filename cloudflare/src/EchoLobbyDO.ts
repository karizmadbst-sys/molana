import { DurableObject } from 'cloudflare:workers';
import {
  Env,
  FriendEntry,
  OnlinePresence,
  PartyGroup,
  PlayerAccountProfile,
  RealmId,
  RoomSummary,
  generateCode,
  sanitizeRoomId,
} from './types.ts';

interface StoredRoomDirectoryEntry {
  roomId: string;
  name: string;
  playerCount: number;
  isPrivate: boolean;
  updatedAt: number;
}

const DEFAULT_ROOM_ID = 'ECHO-PUBLIC-1';
const PRESENCE_TTL_MS = 120_000;

export class EchoLobbyDO extends DurableObject<Env> {
  private presence = new Map<string, OnlinePresence>();
  private rooms = new Map<string, StoredRoomDirectoryEntry>();
  private parties = new Map<string, PartyGroup>();
  private playerParty = new Map<string, string>();
  private loaded = false;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    this.rooms.set(DEFAULT_ROOM_ID, {
      roomId: DEFAULT_ROOM_ID,
      name: 'Forgotten Island · Public Sanctuary',
      playerCount: 0,
      isPrivate: false,
      updatedAt: Date.now(),
    });
  }

  private async ensureLoaded(): Promise<void> {
    if (this.loaded) return;
    await this.ctx.blockConcurrencyWhile(async () => {
      if (this.loaded) return;
      const savedParties = await this.ctx.storage.get<[string, PartyGroup][]>('parties');
      if (Array.isArray(savedParties)) {
        for (const [id, party] of savedParties) {
          this.parties.set(id, party);
          for (const m of party.members) {
            this.playerParty.set(m.playerId, id);
          }
        }
      }
      const savedRooms = await this.ctx.storage.get<[string, StoredRoomDirectoryEntry][]>('rooms');
      if (Array.isArray(savedRooms)) {
        for (const [id, entry] of savedRooms) {
          this.rooms.set(id, entry);
        }
      }
      this.loaded = true;
    });
  }

  private pruneStalePresence(): void {
    const now = Date.now();
    for (const [pid, p] of this.presence) {
      if (now - p.lastSeen > PRESENCE_TTL_MS) {
        this.presence.delete(pid);
      }
    }
    for (const [rid, r] of this.rooms) {
      if (rid !== DEFAULT_ROOM_ID && r.playerCount <= 0 && now - r.updatedAt > 15 * 60_000) {
        this.rooms.delete(rid);
      }
    }
  }

  private async saveLobbyState(): Promise<void> {
    await this.ctx.storage.put('parties', Array.from(this.parties.entries()));
    await this.ctx.storage.put('rooms', Array.from(this.rooms.entries()));
  }

  private async pushPacketToRoomPlayer(
    roomId: string,
    targetPlayerId: string | null,
    packet: Record<string, unknown>,
    excludePlayerId?: string
  ): Promise<void> {
    try {
      const cleanRoom = sanitizeRoomId(roomId);
      const id = this.env.ECHO_ROOM.idFromName(cleanRoom);
      const stub = this.env.ECHO_ROOM.get(id);
      await stub.fetch('https://echo-room/internal/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetPlayerId, excludePlayerId, packet }),
      });
    } catch {
      // Ignore transient delivery errors if player just disconnected
    }
  }

  private async broadcastToParty(
    party: PartyGroup,
    packet: Record<string, unknown>,
    excludePlayerId?: string
  ): Promise<void> {
    const byRoom = new Map<string, string[]>();
    for (const m of party.members) {
      if (excludePlayerId && m.playerId === excludePlayerId) continue;
      const p = this.presence.get(m.playerId);
      if (!p) continue;
      const list = byRoom.get(p.roomId) || [];
      list.push(m.playerId);
      byRoom.set(p.roomId, list);
    }

    const jobs: Promise<void>[] = [];
    for (const [roomId, playerIds] of byRoom) {
      for (const pid of playerIds) {
        jobs.push(this.pushPacketToRoomPlayer(roomId, pid, packet));
      }
    }
    await Promise.all(jobs);
  }

  private buildFriendEntryFromPresence(p: OnlinePresence): FriendEntry {
    return {
      playerId: p.playerId,
      username: p.profile.username,
      characterClass: p.profile.characterClass,
      auraColor: p.profile.auraColor,
      online: true,
      roomId: p.roomId,
      partyId: p.partyId,
      realm: p.realm,
      lastSeen: p.lastSeen,
    };
  }

  private async getFriendStatuses(playerId: string, friendIds: string[]): Promise<FriendEntry[]> {
    const uniqueIds = Array.from(new Set(friendIds)).filter((id) => id && id !== playerId);

    // Also load persisted friendships from D1
    try {
      const rows = await this.env.DB.prepare(
        'SELECT friend_id FROM friendships WHERE player_id = ? LIMIT 100'
      )
        .bind(playerId)
        .all<{ friend_id: string }>();
      for (const row of rows.results || []) {
        if (row.friend_id && row.friend_id !== playerId && !uniqueIds.includes(row.friend_id)) {
          uniqueIds.push(row.friend_id);
        }
      }
    } catch {
      // D1 may not be initialized yet in fresh setups; fall back cleanly to live presence
    }

    const offlineLookup: string[] = [];
    const results: FriendEntry[] = [];

    for (const fid of uniqueIds) {
      const online = this.presence.get(fid);
      if (online) {
        results.push(this.buildFriendEntryFromPresence(online));
      } else {
        offlineLookup.push(fid);
      }
    }

    if (offlineLookup.length > 0) {
      const offlineProfiles = new Map<
        string,
        { username: string; character_class: string; aura_color: string; last_realm: string; updated_at: number }
      >();
      try {
        const placeholders = offlineLookup.map(() => '?').join(',');
        const dbRows = await this.env.DB.prepare(
          `SELECT id, username, character_class, aura_color, last_realm, updated_at FROM players WHERE id IN (${placeholders})`
        )
          .bind(...offlineLookup)
          .all<{
            id: string;
            username: string;
            character_class: string;
            aura_color: string;
            last_realm: string;
            updated_at: number;
          }>();
        for (const row of dbRows.results || []) {
          offlineProfiles.set(row.id, row);
        }
      } catch {
        // Ignore if DB unavailable
      }

      for (const fid of offlineLookup) {
        const row = offlineProfiles.get(fid);
        results.push({
          playerId: fid,
          username: row?.username || fid,
          characterClass: row?.character_class || 'SPIRIT_WEAVER',
          auraColor: row?.aura_color || '#00f5d4',
          online: false,
          roomId: null,
          partyId: null,
          realm: row?.last_realm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND',
          lastSeen: row?.updated_at || 0,
        });
      }
    }

    return results;
  }

  private async notifyFriendsOfPlayer(changedPlayerId: string): Promise<void> {
    const jobs: Promise<void>[] = [];
    for (const p of this.presence.values()) {
      if (p.playerId !== changedPlayerId && p.friendIds.includes(changedPlayerId)) {
        jobs.push(
          this.getFriendStatuses(p.playerId, p.friendIds).then((friends) =>
            this.pushPacketToRoomPlayer(p.roomId, p.playerId, {
              type: 'S_FRIENDS_STATUS',
              friends,
            })
          )
        );
      }
    }
    await Promise.all(jobs);
  }

  private getRoomSummaries(): RoomSummary[] {
    this.pruneStalePresence();
    return Array.from(this.rooms.values())
      .filter((r) => r.roomId === DEFAULT_ROOM_ID || r.playerCount > 0 || Date.now() - r.updatedAt < 5 * 60_000)
      .sort((a, b) => {
        if (a.roomId === DEFAULT_ROOM_ID) return -1;
        if (b.roomId === DEFAULT_ROOM_ID) return 1;
        return b.playerCount - a.playerCount || b.updatedAt - a.updatedAt;
      })
      .map((r) => ({
        roomId: r.roomId,
        name: r.name,
        playerCount: r.playerCount,
        isPrivate: r.isPrivate,
      }));
  }

  private removeMemberFromParty(playerId: string): PartyGroup | null {
    const pid = this.playerParty.get(playerId);
    if (!pid) return null;
    this.playerParty.delete(playerId);
    const party = this.parties.get(pid);
    if (!party) return null;

    party.members = party.members.filter((m) => m.playerId !== playerId);
    const p = this.presence.get(playerId);
    if (p) p.partyId = null;

    if (party.members.length === 0) {
      this.parties.delete(pid);
      return null;
    }

    if (party.leaderId === playerId) {
      party.leaderId = party.members[0].playerId;
      party.members[0].isLeader = true;
    }
    return party;
  }

  async fetch(request: Request): Promise<Response> {
    await this.ensureLoaded();
    this.pruneStalePresence();
    const url = new URL(request.url);

    if (url.pathname === '/internal/rooms' && request.method === 'GET') {
      return Response.json({ rooms: this.getRoomSummaries() });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, any>;

    switch (url.pathname) {
      case '/internal/room-update': {
        const roomId = sanitizeRoomId(body.roomId);
        const name = String(body.name || `World ${roomId}`).slice(0, 60);
        const playerCount = Math.max(0, Number(body.playerCount ?? 0));
        const isPrivate = Boolean(body.isPrivate);
        this.rooms.set(roomId, {
          roomId,
          name,
          playerCount,
          isPrivate,
          updatedAt: Date.now(),
        });
        this.ctx.waitUntil(this.saveLobbyState());
        return Response.json({ ok: true, rooms: this.getRoomSummaries() });
      }

      case '/internal/presence-upsert': {
        const profile = body.profile as PlayerAccountProfile;
        if (!profile?.id) return Response.json({ ok: false }, { status: 400 });
        const roomId = sanitizeRoomId(body.roomId);
        const existingPartyId = this.playerParty.get(profile.id) || null;
        const prev = this.presence.get(profile.id);
        const friendIds: string[] = Array.isArray(body.friendIds)
          ? body.friendIds.filter((x: unknown): x is string => typeof x === 'string')
          : prev?.friendIds || [];
        const realm: RealmId = body.realm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND';

        const entry: OnlinePresence = {
          playerId: profile.id,
          profile,
          roomId,
          partyId: existingPartyId,
          realm,
          hp: Number(body.hp ?? prev?.hp ?? 100),
          maxHp: Number(body.maxHp ?? prev?.maxHp ?? 100),
          friendIds,
          voice: body.voice || prev?.voice || { enabled: false, muted: false, speaking: false },
          lastSeen: Date.now(),
        };
        this.presence.set(profile.id, entry);

        if (existingPartyId) {
          const party = this.parties.get(existingPartyId);
          const member = party?.members.find((m) => m.playerId === profile.id);
          if (member) {
            member.username = profile.username;
            member.characterClass = profile.characterClass;
            member.realm = realm;
            member.hp = entry.hp;
            member.maxHp = entry.maxHp;
          }
        }

        const friends = await this.getFriendStatuses(profile.id, friendIds);
        const party = existingPartyId ? this.parties.get(existingPartyId) || null : null;

        this.ctx.waitUntil(this.notifyFriendsOfPlayer(profile.id));

        return Response.json({
          ok: true,
          friends,
          party,
          rooms: this.getRoomSummaries(),
        });
      }

      case '/internal/presence-remove': {
        const playerId = String(body.playerId || '');
        const roomId = sanitizeRoomId(body.roomId);
        const current = this.presence.get(playerId);
        // Only remove if they didn't already reconnect into another room
        if (current && current.roomId === roomId) {
          this.presence.delete(playerId);
          const updatedParty = this.removeMemberFromParty(playerId);
          if (updatedParty) {
            this.ctx.waitUntil(
              this.broadcastToParty(updatedParty, { type: 'S_PARTY_STATE', party: updatedParty })
            );
          }
          this.ctx.waitUntil(this.saveLobbyState());
          this.ctx.waitUntil(this.notifyFriendsOfPlayer(playerId));
        }
        return Response.json({ ok: true });
      }

      case '/internal/friend-add': {
        const playerId = String(body.playerId || '');
        const query = String(body.query || '').trim();
        if (!playerId || !query) return Response.json({ ok: false }, { status: 400 });

        let targetOnline = this.presence.get(query);
        if (!targetOnline) {
          const lower = query.toLowerCase();
          for (const p of this.presence.values()) {
            if (p.playerId.toLowerCase() === lower || p.profile.username.toLowerCase() === lower) {
              targetOnline = p;
              break;
            }
          }
        }

        let targetId = targetOnline?.playerId || '';
        let targetFriendEntry: FriendEntry | null = targetOnline
          ? this.buildFriendEntryFromPresence(targetOnline)
          : null;

        if (!targetId) {
          // Search Cloudflare D1 players table by id or username
          try {
            const dbRow = await this.env.DB.prepare(
              'SELECT id, username, character_class, aura_color, last_realm, updated_at FROM players WHERE LOWER(id) = LOWER(?) OR LOWER(username) = LOWER(?) ORDER BY updated_at DESC LIMIT 1'
            )
              .bind(query, query)
              .first<{
                id: string;
                username: string;
                character_class: string;
                aura_color: string;
                last_realm: string;
                updated_at: number;
              }>();
            if (dbRow) {
              targetId = dbRow.id;
              targetFriendEntry = {
                playerId: dbRow.id,
                username: dbRow.username,
                characterClass: dbRow.character_class,
                auraColor: dbRow.aura_color,
                online: false,
                roomId: null,
                realm: dbRow.last_realm === 'DARK_REALM' ? 'DARK_REALM' : 'ISLAND',
                lastSeen: dbRow.updated_at,
              };
            }
          } catch {
            // ignore D1 error
          }
        }

        if (!targetId) {
          targetId = query;
          targetFriendEntry = {
            playerId: targetId,
            username: targetId,
            characterClass: 'SPIRIT_WEAVER',
            auraColor: '#00f5d4',
            online: false,
            roomId: null,
            realm: 'ISLAND',
            lastSeen: Date.now(),
          };
        }

        if (targetId === playerId) {
          return Response.json({ ok: false, code: 'SELF_FRIEND', message: 'Cannot add yourself as a friend' });
        }

        const requester = this.presence.get(playerId);
        if (requester && !requester.friendIds.includes(targetId)) {
          requester.friendIds.push(targetId);
        }

        const now = Date.now();
        try {
          await this.env.DB.prepare(
            'INSERT OR IGNORE INTO friendships (player_id, friend_id, created_at) VALUES (?, ?, ?)'
          )
            .bind(playerId, targetId, now)
            .run();
          if (targetOnline) {
            await this.env.DB.prepare(
              'INSERT OR IGNORE INTO friendships (player_id, friend_id, created_at) VALUES (?, ?, ?)'
            )
              .bind(targetId, playerId, now)
              .run();
          }
        } catch {
          // ignore if DB not yet initialized
        }

        if (targetOnline && requester) {
          if (!targetOnline.friendIds.includes(playerId)) {
            targetOnline.friendIds.push(playerId);
          }
          await this.pushPacketToRoomPlayer(targetOnline.roomId, targetOnline.playerId, {
            type: 'S_FRIEND_ADDED',
            friend: this.buildFriendEntryFromPresence(requester),
          });
          const targetFriends = await this.getFriendStatuses(targetOnline.playerId, targetOnline.friendIds);
          await this.pushPacketToRoomPlayer(targetOnline.roomId, targetOnline.playerId, {
            type: 'S_FRIENDS_STATUS',
            friends: targetFriends,
          });
        }

        const requesterFriends = await this.getFriendStatuses(playerId, requester?.friendIds || [targetId]);
        return Response.json({
          ok: true,
          friend: targetFriendEntry,
          friends: requesterFriends,
        });
      }

      case '/internal/friend-remove': {
        const playerId = String(body.playerId || '');
        const targetId = String(body.targetPlayerId || '');
        const requester = this.presence.get(playerId);
        if (requester) {
          requester.friendIds = requester.friendIds.filter((id) => id !== targetId);
        }
        try {
          await this.env.DB.prepare('DELETE FROM friendships WHERE player_id = ? AND friend_id = ?')
            .bind(playerId, targetId)
            .run();
        } catch {
          // ignore
        }
        const friends = await this.getFriendStatuses(playerId, requester?.friendIds || []);
        return Response.json({ ok: true, friends });
      }

      case '/internal/party-create': {
        const playerId = String(body.playerId || '');
        const p = this.presence.get(playerId);
        if (!p) return Response.json({ ok: false }, { status: 404 });

        const oldParty = this.removeMemberFromParty(playerId);
        if (oldParty) {
          this.ctx.waitUntil(
            this.broadcastToParty(oldParty, { type: 'S_PARTY_STATE', party: oldParty })
          );
        }

        const passCode = generateCode('ECHO', 4);
        const partyId = `party_${Date.now()}_${passCode}`;
        const party: PartyGroup = {
          partyId,
          leaderId: playerId,
          passCode,
          members: [
            {
              playerId,
              username: p.profile.username,
              characterClass: p.profile.characterClass,
              isLeader: true,
              hp: p.hp,
              maxHp: p.maxHp,
              isReady: true,
              pingMs: 0,
              realm: p.realm,
            },
          ],
          maxMembers: 4,
          sharedObjectiveAr: 'استكشاف العوالم والمغامرة معاً',
          sharedObjectiveEn: 'Explore Both Realms Together',
          createdAt: Date.now(),
        };
        this.parties.set(partyId, party);
        this.playerParty.set(playerId, partyId);
        p.partyId = partyId;
        this.ctx.waitUntil(this.saveLobbyState());

        await this.pushPacketToRoomPlayer(p.roomId, playerId, {
          type: 'S_PARTY_STATE',
          party,
        });
        return Response.json({ ok: true, party });
      }

      case '/internal/party-join': {
        const playerId = String(body.playerId || '');
        const p = this.presence.get(playerId);
        if (!p) return Response.json({ ok: false, message: 'Player offline' }, { status: 404 });

        const code = String(body.passCode || '').trim().toUpperCase();
        const reqPartyId = String(body.partyId || '');
        const targetParty = Array.from(this.parties.values()).find(
          (pt) => pt.partyId === reqPartyId || (code && pt.passCode === code)
        );
        if (!targetParty) {
          return Response.json({ ok: false, code: 'PARTY_NOT_FOUND', message: 'Party not found or expired' });
        }
        if (
          targetParty.members.length >= targetParty.maxMembers &&
          !targetParty.members.some((m) => m.playerId === playerId)
        ) {
          return Response.json({ ok: false, code: 'PARTY_FULL', message: 'Party is full (max 4 players)' });
        }

        const oldParty = this.removeMemberFromParty(playerId);
        if (oldParty && oldParty.partyId !== targetParty.partyId) {
          this.ctx.waitUntil(
            this.broadcastToParty(oldParty, { type: 'S_PARTY_STATE', party: oldParty })
          );
        }

        if (!targetParty.members.some((m) => m.playerId === playerId)) {
          targetParty.members.push({
            playerId,
            username: p.profile.username,
            characterClass: p.profile.characterClass,
            isLeader: false,
            hp: p.hp,
            maxHp: p.maxHp,
            isReady: true,
            pingMs: 0,
            realm: p.realm,
          });
        }
        this.playerParty.set(playerId, targetParty.partyId);
        p.partyId = targetParty.partyId;
        this.ctx.waitUntil(this.saveLobbyState());
        await this.broadcastToParty(targetParty, { type: 'S_PARTY_STATE', party: targetParty });
        return Response.json({ ok: true, party: targetParty });
      }

      case '/internal/party-leave': {
        const playerId = String(body.playerId || '');
        const p = this.presence.get(playerId);
        const updatedParty = this.removeMemberFromParty(playerId);
        this.ctx.waitUntil(this.saveLobbyState());
        if (p) {
          await this.pushPacketToRoomPlayer(p.roomId, playerId, {
            type: 'S_PARTY_STATE',
            party: null,
          });
        }
        if (updatedParty) {
          await this.broadcastToParty(updatedParty, {
            type: 'S_PARTY_STATE',
            party: updatedParty,
          });
        }
        return Response.json({ ok: true });
      }

      case '/internal/party-ping': {
        const playerId = String(body.playerId || '');
        const p = this.presence.get(playerId);
        const partyId = this.playerParty.get(playerId);
        const party = partyId ? this.parties.get(partyId) : null;
        const ping = {
          id: `ping_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          senderId: playerId,
          senderName: p?.profile.username || 'Adventurer',
          x: Number(body.ping?.x || 0),
          y: Number(body.ping?.y || 0),
          z: Number(body.ping?.z || 0),
          type: body.ping?.type || 'EXPLORE',
          realm: p?.realm || 'ISLAND',
          timestamp: Date.now(),
          durationMs: 8000,
        };
        if (party) {
          await this.broadcastToParty(party, { type: 'S_PARTY_PING', ping });
          return Response.json({ ok: true, delivered: 'PARTY' });
        }
        return Response.json({ ok: false, ping });
      }

      case '/internal/invite-send': {
        const fromId = String(body.fromPlayerId || '');
        const targetId = String(body.targetPlayerId || '');
        const kind = body.kind === 'PARTY' ? 'PARTY' : 'ROOM';
        const from = this.presence.get(fromId);
        const target = this.presence.get(targetId);

        if (!from) return Response.json({ ok: false, code: 'SENDER_OFFLINE', message: 'Not authenticated' });
        if (!target) {
          return Response.json({ ok: false, code: 'PLAYER_OFFLINE', message: 'Player is currently offline' });
        }

        let partyId: string | undefined;
        let partyCode: string | undefined;
        if (kind === 'PARTY') {
          let pId = this.playerParty.get(fromId);
          let party = pId ? this.parties.get(pId) : undefined;
          if (!party) {
            const code = generateCode('ECHO', 4);
            pId = `party_${Date.now()}_${code}`;
            party = {
              partyId: pId,
              leaderId: fromId,
              passCode: code,
              members: [
                {
                  playerId: fromId,
                  username: from.profile.username,
                  characterClass: from.profile.characterClass,
                  isLeader: true,
                  hp: from.hp,
                  maxHp: from.maxHp,
                  isReady: true,
                  pingMs: 0,
                  realm: from.realm,
                },
              ],
              maxMembers: 4,
              sharedObjectiveAr: 'استكشاف العوالم والمغامرة معاً',
              sharedObjectiveEn: 'Explore Both Realms Together',
              createdAt: Date.now(),
            };
            this.parties.set(pId, party);
            this.playerParty.set(fromId, pId);
            from.partyId = pId;
            this.ctx.waitUntil(this.saveLobbyState());
            await this.pushPacketToRoomPlayer(from.roomId, fromId, {
              type: 'S_PARTY_STATE',
              party,
            });
          }
          partyId = party.partyId;
          partyCode = party.passCode;
        }

        const invite = {
          inviteId: `inv_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          kind,
          fromPlayerId: fromId,
          fromUsername: from.profile.username,
          fromAuraColor: from.profile.auraColor,
          roomId: from.roomId,
          partyId,
          partyCode,
          realm: from.realm,
          timestamp: Date.now(),
        };

        await this.pushPacketToRoomPlayer(target.roomId, targetId, {
          type: 'S_INVITE_RECEIVED',
          invite,
        });

        return Response.json({
          ok: true,
          inviteId: invite.inviteId,
          targetUsername: target.profile.username,
        });
      }

      case '/internal/invite-respond': {
        const responderId = String(body.responderId || '');
        const fromId = String(body.fromPlayerId || '');
        const accept = Boolean(body.accept);
        const kind = body.kind === 'PARTY' ? 'PARTY' : 'ROOM';
        const responder = this.presence.get(responderId);
        const sender = this.presence.get(fromId);

        if (!responder) return Response.json({ ok: false });

        if (!accept) {
          if (sender) {
            await this.pushPacketToRoomPlayer(sender.roomId, sender.playerId, {
              type: 'S_INVITE_RESULT',
              inviteId: body.inviteId,
              targetUsername: responder.profile.username,
              status: 'DECLINED',
            });
          }
          return Response.json({ ok: true, accepted: false });
        }

        const targetRoomId = sanitizeRoomId(body.roomId || sender?.roomId || DEFAULT_ROOM_ID);

        if (kind === 'PARTY') {
          const pId = body.partyId || sender?.partyId;
          const party = pId ? this.parties.get(pId) : undefined;
          if (party && party.members.length < party.maxMembers) {
            const oldParty = this.removeMemberFromParty(responderId);
            if (oldParty && oldParty.partyId !== party.partyId) {
              this.ctx.waitUntil(
                this.broadcastToParty(oldParty, { type: 'S_PARTY_STATE', party: oldParty })
              );
            }
            if (!party.members.some((m) => m.playerId === responderId)) {
              party.members.push({
                playerId: responderId,
                username: responder.profile.username,
                characterClass: responder.profile.characterClass,
                isLeader: false,
                hp: responder.hp,
                maxHp: responder.maxHp,
                isReady: true,
                pingMs: 0,
                realm: responder.realm,
              });
            }
            this.playerParty.set(responderId, party.partyId);
            responder.partyId = party.partyId;
            this.ctx.waitUntil(this.saveLobbyState());
            await this.broadcastToParty(party, { type: 'S_PARTY_STATE', party });
          }
        }

        if (sender) {
          await this.pushPacketToRoomPlayer(sender.roomId, sender.playerId, {
            type: 'S_INVITE_RESULT',
            inviteId: body.inviteId,
            targetUsername: responder.profile.username,
            status: 'ACCEPTED',
          });
        }

        return Response.json({
          ok: true,
          accepted: true,
          targetRoomId,
        });
      }

      case '/internal/cross-chat': {
        const senderId = String(body.senderId || '');
        const channel = body.channel === 'PARTY' ? 'PARTY' : 'FRIENDS';
        const packet = body.packet as Record<string, unknown>;
        const sender = this.presence.get(senderId);
        if (!sender || !packet) return Response.json({ ok: false });

        if (channel === 'PARTY') {
          const partyId = this.playerParty.get(senderId);
          const party = partyId ? this.parties.get(partyId) : null;
          if (party) {
            await this.broadcastToParty(party, packet);
          } else {
            await this.pushPacketToRoomPlayer(sender.roomId, senderId, packet);
          }
          return Response.json({ ok: true });
        }

        // FRIENDS channel across all active rooms
        const targets = new Map<string, OnlinePresence>();
        targets.set(senderId, sender);
        for (const p of this.presence.values()) {
          if (p.playerId === senderId) continue;
          if (sender.friendIds.includes(p.playerId) || p.friendIds.includes(senderId)) {
            targets.set(p.playerId, p);
          }
        }
        await Promise.all(
          Array.from(targets.values()).map((t) =>
            this.pushPacketToRoomPlayer(t.roomId, t.playerId, packet)
          )
        );
        return Response.json({ ok: true });
      }

      case '/internal/voice-relay': {
        const senderId = String(body.senderId || '');
        const targetId = String(body.targetPlayerId || '');
        const sender = this.presence.get(senderId);
        const target = this.presence.get(targetId);
        if (!sender || !target) return Response.json({ ok: false });

        const sameRoom = sender.roomId === target.roomId;
        const sameParty = Boolean(sender.partyId && sender.partyId === target.partyId);
        if (!sameRoom && !sameParty) {
          return Response.json({ ok: false, code: 'VOICE_SCOPE_DENIED' });
        }

        await this.pushPacketToRoomPlayer(target.roomId, targetId, body.packet);
        return Response.json({ ok: true });
      }

      case '/internal/portal-party': {
        const initiatorId = String(body.initiatorId || '');
        const partyId = this.playerParty.get(initiatorId);
        const party = partyId ? this.parties.get(partyId) : null;
        if (!party) return Response.json({ ok: true, count: 0 });
        await this.broadcastToParty(party, body.packet, initiatorId);
        return Response.json({ ok: true, count: party.members.length });
      }

      default:
        return new Response('Not Found', { status: 404 });
    }
  }
}
