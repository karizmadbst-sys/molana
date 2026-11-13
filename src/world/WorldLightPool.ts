/**
 * ECHO – THE WORLD REMEMBERS
 * Pooled PointLight Distance-Culling System
 * Keeps WebGL shader NUM_POINT_LIGHTS fixed and compact (<= 10) for instant shader compile,
 * zero runtime shader recompiles, and massive mobile GPU performance gains while preserving
 * every single dynamic lantern, hearth, crystal, shard, brazier, NPC, and enemy light nearby.
 */

import * as THREE from 'three';

export class PooledPointLightProxy extends THREE.Object3D {
  public color: THREE.Color;
  public intensity: number;
  public distance: number;
  public decay: number;

  constructor(
    color: THREE.ColorRepresentation = 0xffffff,
    intensity: number = 1,
    distance: number = 0,
    decay: number = 2
  ) {
    super();
    this.color = new THREE.Color(color);
    this.intensity = intensity;
    this.distance = distance;
    this.decay = decay;
    WorldLightPool.register(this);
  }

  public dispose(): void {
    WorldLightPool.unregister(this);
  }
}

interface RankedLight {
  proxy: PooledPointLightProxy;
  wx: number;
  wy: number;
  wz: number;
  distSq: number;
}

export class WorldLightPool {
  private static readonly MAX_POOL_SIZE = 8;
  private static proxies: Set<PooledPointLightProxy> = new Set();

  private pool: THREE.PointLight[] = [];
  private ranked: RankedLight[] = [];
  private lastUpdateMs: number = -9999;
  private scene: THREE.Scene;

  public static register(proxy: PooledPointLightProxy): void {
    WorldLightPool.proxies.add(proxy);
  }

  public static unregister(proxy: PooledPointLightProxy): void {
    WorldLightPool.proxies.delete(proxy);
  }

  public static clearAll(): void {
    WorldLightPool.proxies.clear();
  }

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    for (let i = 0; i < WorldLightPool.MAX_POOL_SIZE; i++) {
      const light = new THREE.PointLight(0xffffff, 0, 20, 2);
      light.castShadow = false;
      // Keep visible=true permanently so Three.js NEVER recompiles PBR shaders dynamically
      light.visible = true;
      light.position.set(0, -500, 0);
      this.scene.add(light);
      this.pool.push(light);
    }
  }

  private isInVisibleHierarchy(obj: THREE.Object3D): boolean {
    let cur: THREE.Object3D | null = obj;
    while (cur) {
      if (!cur.visible) return false;
      if (!cur.parent) {
        return cur === this.scene;
      }
      cur = cur.parent;
    }
    return false;
  }

  public update(focusPos: THREE.Vector3, maxActiveLights: number, nowMs: number, force: boolean = false): void {
    // Re-rank and update every ~85ms to avoid unnecessary traversal while keeping flickers smooth
    if (!force && nowMs - this.lastUpdateMs < 85) {
      return;
    }
    this.lastUpdateMs = nowMs;

    const activeCap = Math.max(0, Math.min(WorldLightPool.MAX_POOL_SIZE, maxActiveLights));
    if (activeCap === 0) {
      for (let i = 0; i < this.pool.length; i++) {
        this.pool[i].intensity = 0;
      }
      return;
    }

    const maxRangeSq = 85 * 85;
    this.ranked.length = 0;

    WorldLightPool.proxies.forEach((proxy) => {
      if (proxy.intensity <= 0.01) return;
      if (!this.isInVisibleHierarchy(proxy)) return;

      // Ensure world matrix is current on force/first frame
      if (force) {
        proxy.updateWorldMatrix(true, false);
      }

      const e = proxy.matrixWorld.elements;
      const wx = e[12];
      const wy = e[13];
      const wz = e[14];

      const dx = wx - focusPos.x;
      const dy = wy - focusPos.y;
      const dz = wz - focusPos.z;
      const distSq = dx * dx + dy * dy + dz * dz;

      if (distSq <= maxRangeSq) {
        this.ranked.push({ proxy, wx, wy, wz, distSq });
      }
    });

    if (this.ranked.length > 1) {
      this.ranked.sort((a, b) => a.distSq - b.distSq);
    }

    const used = Math.min(activeCap, this.ranked.length);
    for (let i = 0; i < used; i++) {
      const item = this.ranked[i];
      const dst = this.pool[i];
      dst.position.set(item.wx, item.wy, item.wz);
      dst.color.copy(item.proxy.color);
      dst.intensity = item.proxy.intensity;
      dst.distance = item.proxy.distance;
      dst.decay = item.proxy.decay;
    }

    for (let i = used; i < this.pool.length; i++) {
      this.pool[i].intensity = 0;
    }
  }
}
