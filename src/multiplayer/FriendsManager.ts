/**
 * ECHO – THE WORLD REMEMBERS
 * Persistent Friends List & Live Invitation Manager
 */

import { FriendEntry, MultiplayerInvite, PlayerId } from './types.ts';

const FRIENDS_STORAGE_KEY = 'echo_friends_list_v1';

export class FriendsManager {
  private savedFriendIds: Set<PlayerId> = new Set();
  private friendsMap: Map<PlayerId, FriendEntry> = new Map();
  private pendingInvites: MultiplayerInvite[] = [];

  public onFriendsChanged?: (friends: FriendEntry[]) => void;
  public onInvitesChanged?: (invites: MultiplayerInvite[]) => void;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(FRIENDS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (typeof item === 'string') {
              this.savedFriendIds.add(item);
            } else if (item && typeof item.playerId === 'string') {
              this.savedFriendIds.add(item.playerId);
              this.friendsMap.set(item.playerId, {
                ...item,
                online: false,
                roomId: null,
              });
            }
          }
        }
      }
    } catch {
      // ignore corrupted storage
    }
  }

  private saveToStorage(): void {
    try {
      const serializable = Array.from(this.savedFriendIds).map((id) => {
        const existing = this.friendsMap.get(id);
        return (
          existing || {
            playerId: id,
            username: id,
            characterClass: 'SPIRIT_WEAVER',
            auraColor: '#00f5d4',
            online: false,
            roomId: null,
            realm: 'ISLAND',
            lastSeen: 0,
          }
        );
      });
      localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(serializable));
    } catch {
      // ignore
    }
  }

  public getFriendIds(): PlayerId[] {
    return Array.from(this.savedFriendIds);
  }

  public getFriends(): FriendEntry[] {
    return Array.from(this.friendsMap.values()).sort((a, b) => {
      if (a.online !== b.online) return a.online ? -1 : 1;
      return a.username.localeCompare(b.username);
    });
  }

  public isFriend(playerId: PlayerId): boolean {
    return this.savedFriendIds.has(playerId);
  }

  public updateFromServer(serverFriends: FriendEntry[]): void {
    for (const f of serverFriends) {
      this.savedFriendIds.add(f.playerId);
      const prev = this.friendsMap.get(f.playerId);
      this.friendsMap.set(f.playerId, {
        ...prev,
        ...f,
        // Preserve known username if offline and server only echoed playerId
        username: f.online ? f.username : prev?.username || f.username,
      });
    }
    this.saveToStorage();
    this.onFriendsChanged?.(this.getFriends());
  }

  public addOrUpdateFriend(entry: FriendEntry): void {
    this.savedFriendIds.add(entry.playerId);
    this.friendsMap.set(entry.playerId, entry);
    this.saveToStorage();
    this.onFriendsChanged?.(this.getFriends());
  }

  public removeFriend(playerId: PlayerId): void {
    this.savedFriendIds.delete(playerId);
    this.friendsMap.delete(playerId);
    this.saveToStorage();
    this.onFriendsChanged?.(this.getFriends());
  }

  public pushInvite(invite: MultiplayerInvite): void {
    this.pendingInvites = [
      invite,
      ...this.pendingInvites.filter((i) => i.inviteId !== invite.inviteId),
    ].slice(0, 8);
    this.onInvitesChanged?.(this.pendingInvites);
  }

  public removeInvite(inviteId: string): MultiplayerInvite | undefined {
    const found = this.pendingInvites.find((i) => i.inviteId === inviteId);
    this.pendingInvites = this.pendingInvites.filter((i) => i.inviteId !== inviteId);
    this.onInvitesChanged?.(this.pendingInvites);
    return found;
  }

  public getPendingInvites(): MultiplayerInvite[] {
    return this.pendingInvites;
  }
}
