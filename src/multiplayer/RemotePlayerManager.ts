/**
 * ECHO – THE WORLD REMEMBERS
 * Remote Player Manager (إدارة اللاعبين المتصلين في المشهد)
 *
 * Coordinates:
 * 1. Spawning and removing remote player 3D entities.
 * 2. Routing network transform updates to corresponding remote avatars.
 * 3. Minimap radar blips for co-op allies.
 */

import * as THREE from 'three';
import { PlayerAccountProfile, PlayerTransformSnapshot, PlayerId, RealmId } from './types.ts';
import { RemotePlayerEntity } from './RemotePlayerEntity.ts';

export class RemotePlayerManager {
  public group: THREE.Group;
  private players = new Map<PlayerId, RemotePlayerEntity>();
  private localRealm: RealmId = 'ISLAND';

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'RemotePlayersManager';
  }

  public setLocalRealm(realm: RealmId): void {
    this.localRealm = realm;
    for (const entity of this.players.values()) {
      entity.group.visible = entity.realm === this.localRealm;
    }
  }

  public getLocalRealm(): RealmId {
    return this.localRealm;
  }

  public addPlayer(profile: PlayerAccountProfile, initialTransform: PlayerTransformSnapshot): RemotePlayerEntity {
    const existing = this.players.get(profile.id);
    if (existing) {
      existing.updateProfile(profile);
      existing.updateNetworkTransform(initialTransform);
      existing.group.visible = existing.realm === this.localRealm;
      return existing;
    }

    const entity = new RemotePlayerEntity(profile, initialTransform);
    entity.group.visible = entity.realm === this.localRealm;
    this.players.set(profile.id, entity);
    this.group.add(entity.group);
    return entity;
  }

  public removePlayer(playerId: PlayerId): void {
    const entity = this.players.get(playerId);
    if (entity) {
      entity.dispose();
      this.players.delete(playerId);
    }
  }

  public getPlayer(playerId: PlayerId): RemotePlayerEntity | undefined {
    return this.players.get(playerId);
  }

  public getAllPlayers(): RemotePlayerEntity[] {
    return Array.from(this.players.values());
  }

  public updateProfile(playerId: PlayerId, profile: PlayerAccountProfile): void {
    const entity = this.players.get(playerId);
    if (entity) {
      entity.updateProfile(profile);
    }
  }

  public setVoiceState(playerId: PlayerId, enabled: boolean, muted: boolean, speaking: boolean): void {
    const entity = this.players.get(playerId);
    if (entity) {
      entity.setVoiceState(enabled, muted, speaking);
    }
  }

  public playAction(playerId: PlayerId, action: 'ATTACK' | 'DODGE' | 'PULSE', data?: any): void {
    const entity = this.players.get(playerId);
    if (!entity || entity.realm !== this.localRealm) return;
    if (action === 'ATTACK') {
      entity.playAttackAnimation(data?.comboStep ?? 1);
    } else if (action === 'DODGE') {
      entity.playDodgeAnimation();
    } else if (action === 'PULSE') {
      entity.playPulseAnimation();
    }
  }

  public playWeaponShot(playerId: PlayerId, weapon: 'pistol' | 'bow'): void {
    const entity = this.players.get(playerId);
    if (!entity || entity.realm !== this.localRealm) return;
    entity.playShotAnimation(weapon);
  }

  public updateTransform(playerId: PlayerId, snapshot: PlayerTransformSnapshot): void {
    const entity = this.players.get(playerId);
    if (entity) {
      entity.updateNetworkTransform(snapshot);
      entity.group.visible = entity.realm === this.localRealm;
    }
  }

  public update(dt: number, cameraPos: THREE.Vector3): void {
    for (const entity of this.players.values()) {
      entity.group.visible = entity.realm === this.localRealm;
      if (entity.group.visible) {
        entity.update(dt, cameraPos);
      }
    }
  }

  /**
   * Generates radar blips for the minimap (only allies currently in the same realm)
   */
  public getMinimapBlips(realm?: RealmId): { pos: { x: number; z: number }; name: string; color: number }[] {
    const targetRealm = realm ?? this.localRealm;
    const blips: { pos: { x: number; z: number }; name: string; color: number }[] = [];
    for (const entity of this.players.values()) {
      if (entity.realm !== targetRealm) continue;
      const hex = parseInt((entity.profile.auraColor || '#00f5d4').replace('#', ''), 16) || 0x00f5d4;
      blips.push({
        pos: { x: entity.group.position.x, z: entity.group.position.z },
        name: entity.profile.username,
        color: hex,
      });
    }
    return blips;
  }

  public getPlayerCount(): number {
    return this.players.size;
  }

  public getVisiblePlayerCount(): number {
    let count = 0;
    for (const entity of this.players.values()) {
      if (entity.realm === this.localRealm) count++;
    }
    return count;
  }

  public clearAll(): void {
    for (const entity of this.players.values()) {
      entity.dispose();
    }
    this.players.clear();
  }
}
