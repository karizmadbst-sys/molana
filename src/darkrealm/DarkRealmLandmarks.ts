/**
 * ECHO – DARK FANTASY REALM
 * Landmarks, Giant Dark Castle, 4 Haunted Lantern Villages, Return Portal,
 * Harvestable Resource Nodes (Trees, Rocks, Iron, Gold, Purple Crystals, Food), & 18 Secret Chests.
 */

import * as THREE from 'three';
import { DarkTextureSet } from './DarkRealmTextures.ts';
import { DarkRealmTerrain } from './DarkRealmTerrain.ts';
import { WorldObstacle } from '../world/Forest.ts';
import { PooledPointLightProxy } from '../world/WorldLightPool.ts';

export type ResourceKind = 'wood' | 'stone' | 'iron' | 'gold' | 'crystal' | 'food';

export interface HarvestNode {
  id: number;
  kind: ResourceKind;
  pos: THREE.Vector3;
  hp: number;
  maxHp: number;
  regrowTimer: number;
  alive: boolean;
  instanceIndex: number;
}

export interface SecretChest {
  id: string;
  pos: THREE.Vector3;
  opened: boolean;
  lidMesh: THREE.Mesh;
  glowLight?: PooledPointLightProxy;
}

export class DarkRealmLandmarks {
  public group: THREE.Group;
  public obstacles: WorldObstacle[] = [];
  public harvestNodes: HarvestNode[] = [];
  public chests: SecretChest[] = [];
  public returnPortalPos = DarkRealmTerrain.RETURN_PORTAL_POS.clone();

  private treeTrunkIM!: THREE.InstancedMesh;
  private treeCanopyIM!: THREE.InstancedMesh;
  private treeCanopyTopIM!: THREE.InstancedMesh;
  private rockIM!: THREE.InstancedMesh;
  private crystalIM!: THREE.InstancedMesh;
  private bushIM!: THREE.InstancedMesh;
  private treeScales: number[] = [];
  private rockScales: number[] = [];
  private crystalScales: number[] = [];
  private bushScales: number[] = [];

  private portalVortexMesh!: THREE.Mesh;
  private castleBeaconMesh!: THREE.Mesh;
  private textures: DarkTextureSet;
  private terrain: DarkRealmTerrain;
  private isMobile: boolean;

  private readonly scratchMat = new THREE.Matrix4();
  private readonly scratchPos = new THREE.Vector3();
  private readonly scratchQuat = new THREE.Quaternion();
  private readonly scratchScale = new THREE.Vector3(1, 1, 1);

  constructor(terrain: DarkRealmTerrain, textures: DarkTextureSet, isMobile: boolean = false) {
    this.terrain = terrain;
    this.textures = textures;
    this.isMobile = isMobile;
    this.group = new THREE.Group();

    this.buildReturnPortal();
    this.buildGiantDarkCastle();
    this.buildRoadNetwork();
    this.buildHauntedVillages();
    this.buildHarvestableWorld();
    this.buildSecretChests();
  }

  private buildReturnPortal(): void {
    const pos = this.returnPortalPos;
    const y = this.terrain.getMeshHeightAt(pos.x, pos.z);
    pos.y = y;

    const g = new THREE.Group();
    g.position.set(pos.x, y, pos.z);

    const stoneMat = new THREE.MeshStandardMaterial({
      map: this.textures.castleBrick,
      color: 0x3b3556,
      roughness: 0.78,
    });
    const vortexMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    });

    // Twin pillars + lintel
    const pGeo = new THREE.BoxGeometry(1.1, 5.2, 1.1);
    const left = new THREE.Mesh(pGeo, stoneMat);
    left.position.set(-2.2, 2.6, 0);
    const right = new THREE.Mesh(pGeo, stoneMat);
    right.position.set(2.2, 2.6, 0);
    const top = new THREE.Mesh(new THREE.BoxGeometry(5.8, 1.1, 1.3), stoneMat);
    top.position.set(0, 5.4, 0);
    g.add(left, right, top);

    this.portalVortexMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 4.4), vortexMat);
    this.portalVortexMesh.position.set(0, 2.6, 0);
    g.add(this.portalVortexMesh);

    const pLight = new PooledPointLightProxy(0x00f5d4, 10, 18, 1.5);
    pLight.position.set(0, 2.8, 0);
    g.add(pLight);

    this.group.add(g);
  }

  private buildGiantDarkCastle(): void {
    const cx = DarkRealmTerrain.CASTLE_POS.x;
    const cz = DarkRealmTerrain.CASTLE_POS.z;
    const cy = this.terrain.getMeshHeightAt(cx, cz);

    const castleGroup = new THREE.Group();
    castleGroup.position.set(cx, cy, cz);

    const brickMat = new THREE.MeshStandardMaterial({
      map: this.textures.castleBrick,
      color: 0x363854,
      roughness: 0.82,
    });
    const crimsonWindowMat = new THREE.MeshBasicMaterial({ color: 0xff2a55 });
    const purpleCrystalMat = new THREE.MeshStandardMaterial({
      color: 0xb54cff,
      emissive: 0x9333ea,
      emissiveIntensity: 2.0,
    });

    // Outer Courtyard Curtain Walls
    const wallSpecs: Array<[number, number, number, number, number]> = [
      [-32, 0, 4, 14, 72],
      [32, 0, 4, 14, 72],
      [0, -35, 68, 15, 4],
      [-21, 35, 26, 13, 4],
      [21, 35, 26, 13, 4],
    ];
    for (const [wx, wz, w, h, d] of wallSpecs) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), brickMat);
      m.position.set(wx, h / 2, wz);
      m.castShadow = true;
      m.receiveShadow = true;
      castleGroup.add(m);
      const thickness = Math.min(w, d);
      const length = Math.max(w, d);
      const step = Math.max(3.5, thickness * 1.15);
      const segs = Math.max(1, Math.ceil(length / step));
      for (let i = 0; i < segs; i++) {
        const offset = -length / 2 + (i + 0.5) * (length / segs);
        this.obstacles.push({
          x: cx + wx + (w > d ? offset : 0),
          z: cz + wz + (d >= w ? offset : 0),
          radius: thickness * 0.65,
        });
      }
    }

    // Main Keep Citadel & Twin Gothic Cathedrals
    const towers: Array<[number, number, number, number, number, boolean]> = [
      [0, -14, 18, 42, 18, true],   // Central Grand Spire
      [-14, -10, 10, 30, 10, false],
      [14, -10, 10, 30, 10, false],
      [-28, 32, 8, 22, 8, false],
      [28, 32, 8, 22, 8, false],
      [-28, -32, 9, 26, 9, true],
      [28, -32, 9, 26, 9, true],
    ];

    for (const [tx, tz, tw, th, td, hasCrystal] of towers) {
      const body = new THREE.Mesh(new THREE.BoxGeometry(tw, th, td), brickMat);
      body.position.set(tx, th / 2, tz);
      body.castShadow = true;
      castleGroup.add(body);

      const spire = new THREE.Mesh(
        new THREE.ConeGeometry(tw * 0.72, th * 0.45, 4),
        brickMat
      );
      spire.rotation.y = Math.PI / 4;
      spire.position.set(tx, th + (th * 0.45) / 2, tz);
      castleGroup.add(spire);

      // Glowing crimson gothic arched windows
      for (let wy = 7; wy < th - 4; wy += 7) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(1.4, 3.2, 0.3), crimsonWindowMat);
        win.position.set(tx, wy, tz + td / 2 + 0.16);
        castleGroup.add(win);
      }

      if (hasCrystal) {
        const cry = new THREE.Mesh(new THREE.OctahedronGeometry(2.2, 0), purpleCrystalMat);
        cry.position.set(tx, th + th * 0.45 + 2.5, tz);
        castleGroup.add(cry);
      }
    }

    // Crimson Sky-Beacon Pillar shooting vertically from the Citadel Peak (matches reference image!)
    const beaconGeo = new THREE.CylinderGeometry(0.45, 1.3, 190, 12, 1, true);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xff1e4d,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    this.castleBeaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    this.castleBeaconMesh.position.set(0, 145, -14);
    castleGroup.add(this.castleBeaconMesh);

    // Grand crimson courtyard glow light
    const castleLight = new PooledPointLightProxy(0xff2a55, 25, 95, 1.4);
    castleLight.position.set(0, 18, 5);
    castleGroup.add(castleLight);

    this.group.add(castleGroup);
  }

  private buildRoadNetwork(): void {
    const pavers: Array<{ x: number; y: number; z: number; yaw: number; s: number }> = [];
    const lanterns: Array<{ x: number; y: number; z: number }> = [];

    for (const path of this.terrain.roadPaths) {
      for (let sIdx = 0; sIdx < path.length - 1; sIdx++) {
        const [x1, z1] = path[sIdx];
        const [x2, z2] = path[sIdx + 1];
        const dx = x2 - x1;
        const dz = z2 - z1;
        const len = Math.hypot(dx, dz);
        if (len < 1) continue;

        const yaw = Math.atan2(dx, dz);
        const perpX = -dz / len;
        const perpZ = dx / len;
        const stepSize = this.isMobile ? 2.6 : 2.1;
        const steps = Math.max(2, Math.floor(len / stepSize));

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const cx = THREE.MathUtils.lerp(x1, x2, t);
          const cz = THREE.MathUtils.lerp(z1, z2, t);

          for (let lane = -1; lane <= 1; lane += 2) {
            const jitter = ((i + lane) % 3 - 1) * 0.16;
            const px = cx + perpX * (lane * 0.72 + jitter);
            const pz = cz + perpZ * (lane * 0.72 + jitter);
            const groundY = this.terrain.getMeshHeightAt(px, pz);
            const waterY = this.terrain.getWaterLevelAt(px, pz);
            const py = waterY !== null ? Math.max(groundY, waterY + 0.12) : groundY;
            pavers.push({
              x: px,
              y: py + 0.03,
              z: pz,
              yaw: yaw + (i % 2 === 0 ? 0.08 : -0.08),
              s: 1.0 + ((i * 7 + lane) & 3) * 0.08,
            });
          }

          if (i > 0 && i < steps && i % (this.isMobile ? 9 : 7) === 0) {
            const side = (i + sIdx) % 2 === 0 ? 1 : -1;
            const lx = cx + perpX * side * 2.55;
            const lz = cz + perpZ * side * 2.55;
            if (this.terrain.getWaterLevelAt(lx, lz) === null) {
              lanterns.push({ x: lx, y: this.terrain.getMeshHeightAt(lx, lz), z: lz });
            }
          }
        }
      }
    }

    if (pavers.length > 0) {
      const paverGeo = new THREE.BoxGeometry(1.45, 0.14, 1.45);
      const paverMat = new THREE.MeshStandardMaterial({
        map: this.textures.cobblestone,
        color: 0xb0b8c8,
        roughness: 0.88,
      });
      const paverIM = new THREE.InstancedMesh(paverGeo, paverMat, pavers.length);
      paverIM.receiveShadow = true;
      const q = new THREE.Quaternion();
      const up = new THREE.Vector3(0, 1, 0);
      pavers.forEach((p, idx) => {
        q.setFromAxisAngle(up, p.yaw);
        this.scratchPos.set(p.x, p.y, p.z);
        this.scratchScale.set(p.s, 1, p.s);
        this.scratchMat.compose(this.scratchPos, q, this.scratchScale);
        paverIM.setMatrixAt(idx, this.scratchMat);
      });
      paverIM.instanceMatrix.needsUpdate = true;
      this.group.add(paverIM);
    }

    if (lanterns.length > 0) {
      const postGeo = new THREE.BoxGeometry(0.26, 2.7, 0.26);
      const postMat = new THREE.MeshStandardMaterial({ map: this.textures.logBark, roughness: 0.9 });
      const headGeo = new THREE.BoxGeometry(0.48, 0.52, 0.48);
      const headMat = new THREE.MeshStandardMaterial({
        map: this.textures.glowLantern,
        color: 0xffd166,
        emissive: 0xff9f1c,
        emissiveIntensity: 1.5,
      });

      const postIM = new THREE.InstancedMesh(postGeo, postMat, lanterns.length);
      const headIM = new THREE.InstancedMesh(headGeo, headMat, lanterns.length);
      this.scratchScale.set(1, 1, 1);
      lanterns.forEach((l, idx) => {
        this.scratchPos.set(l.x, l.y + 1.35, l.z);
        this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
        postIM.setMatrixAt(idx, this.scratchMat);

        this.scratchPos.set(l.x, l.y + 2.75, l.z);
        this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
        headIM.setMatrixAt(idx, this.scratchMat);
      });
      postIM.instanceMatrix.needsUpdate = true;
      headIM.instanceMatrix.needsUpdate = true;
      this.group.add(postIM, headIM);
    }
  }

  private buildHauntedVillages(): void {
    const villageCenters = [
      { x: 48, z: 28, houses: 6, tower: true },
      { x: -155, z: 110, houses: 6, tower: true },
      { x: 175, z: -165, houses: 7, tower: true },
      { x: -165, z: -235, houses: 6, tower: true },
      { x: 145, z: 78, houses: 6, tower: true },
      { x: -75, z: -165, houses: 6, tower: true },
      { x: 115, z: -245, houses: 7, tower: true },
    ];

    const wallMat = new THREE.MeshStandardMaterial({ map: this.textures.woodPlanks, roughness: 0.85 });
    const stoneMat = new THREE.MeshStandardMaterial({ map: this.textures.cobblestone, roughness: 0.9 });
    const roofMat = new THREE.MeshStandardMaterial({ map: this.textures.roofSlate, roughness: 0.85 });
    const doorMat = new THREE.MeshStandardMaterial({ map: this.textures.logBark, color: 0x7c4d2b, roughness: 0.85 });
    const winMat = new THREE.MeshBasicMaterial({ color: 0xffb732 });
    const emberMat = new THREE.MeshBasicMaterial({ color: 0xff6b2b });

    // Pooled farm elements across all villages for zero draw-call bloat
    const soilBlocks: Array<{ x: number; y: number; z: number }> = [];
    const fencePosts: Array<{ x: number; y: number; z: number }> = [];
    const wheatStalks: Array<{ x: number; y: number; z: number; s: number }> = [];
    const pumpkins: Array<{ x: number; y: number; z: number }> = [];

    villageCenters.forEach((v) => {
      const vg = new THREE.Group();
      const vy = this.terrain.getMeshHeightAt(v.x, v.z);
      vg.position.set(v.x, vy, v.z);

      // Houses arranged around a central plaza & campfire
      for (let i = 0; i < v.houses; i++) {
        const ang = (i / v.houses) * Math.PI * 2 + 0.35;
        const rad = 11.5 + (i % 2) * 5.2;
        const hx = Math.cos(ang) * rad;
        const hz = Math.sin(ang) * rad;
        const hy = this.terrain.getMeshHeightAt(v.x + hx, v.z + hz) - vy;

        const hg = new THREE.Group();
        hg.position.set(hx, hy, hz);
        hg.rotation.y = ang + Math.PI;

        const base = new THREE.Mesh(new THREE.BoxGeometry(5.2, 3.8, 5.2), wallMat);
        base.position.y = 1.9;
        base.castShadow = !this.isMobile;
        base.receiveShadow = true;
        hg.add(base);

        const roof = new THREE.Mesh(new THREE.ConeGeometry(4.5, 2.9, 4), roofMat);
        roof.rotation.y = Math.PI / 4;
        roof.position.y = 5.2;
        hg.add(roof);

        const door = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.25, 0.2), doorMat);
        door.position.set(0, 1.12, 2.64);
        const win1 = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.05, 0.2), winMat);
        win1.position.set(-1.55, 2.25, 2.64);
        const win2 = win1.clone();
        win2.position.set(1.55, 2.25, 2.64);
        const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.8, 0.85), stoneMat);
        chimney.position.set(1.3, 5.3, -1.1);
        hg.add(door, win1, win2, chimney);

        vg.add(hg);
        this.obstacles.push({ x: v.x + hx, z: v.z + hz, radius: 3.1 });
      }

      // Watchtower matching screenshot
      if (v.tower) {
        const tx = -9.5;
        const tz = -8.5;
        const ty = this.terrain.getMeshHeightAt(v.x + tx, v.z + tz) - vy;
        const tg = new THREE.Group();
        tg.position.set(tx, ty, tz);

        const legs = new THREE.Mesh(new THREE.BoxGeometry(3.4, 8.5, 3.4), stoneMat);
        legs.position.y = 4.25;
        tg.add(legs);

        const cabin = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.0, 4.2), wallMat);
        cabin.position.y = 9.8;
        tg.add(cabin);

        const tWin = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.3, 4.35), winMat);
        tWin.position.y = 9.9;
        tg.add(tWin);

        const tRoof = new THREE.Mesh(new THREE.ConeGeometry(3.6, 2.6, 4), roofMat);
        tRoof.rotation.y = Math.PI / 4;
        tRoof.position.y = 12.6;
        tg.add(tRoof);

        vg.add(tg);
        this.obstacles.push({ x: v.x + tx, z: v.z + tz, radius: 2.3 });
      }

      // Village Stone Well
      const wellX = -4.2;
      const wellZ = 3.5;
      const wellY = this.terrain.getMeshHeightAt(v.x + wellX, v.z + wellZ) - vy;
      const wellBase = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.25, 1.1, 8), stoneMat);
      wellBase.position.set(wellX, wellY + 0.55, wellZ);
      const wellRoof = new THREE.Mesh(new THREE.ConeGeometry(1.45, 1.1, 4), roofMat);
      wellRoof.rotation.y = Math.PI / 4;
      wellRoof.position.set(wellX, wellY + 2.4, wellZ);
      vg.add(wellBase, wellRoof);

      // Central warm campfire + pooled lantern light
      const fireBase = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.5, 0.4, 8), stoneMat);
      fireBase.position.y = 0.2;
      const fireFlame = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 0), emberMat);
      fireFlame.position.y = 0.9;
      const fireLight = new PooledPointLightProxy(0xff9a36, 18, 42, 1.5);
      fireLight.position.set(0, 2.6, 0);
      vg.add(fireBase, fireFlame, fireLight);

      // Two Fenced Crop Farms beside each village (wheat, pumpkins & wooden fence posts)
      const farmOffsets: Array<[number, number, boolean]> = [
        [8.8, 7.2, false],
        [-10.2, 12.0, true],
      ];
      for (const [fx, fz, isPumpkin] of farmOffsets) {
        const wfx = v.x + fx;
        const wfz = v.z + fz;
        const fy = this.terrain.getMeshHeightAt(wfx, wfz);
        soilBlocks.push({ x: wfx, y: fy + 0.12, z: wfz });

        // Perimeter wooden fence posts
        for (let sx = -3.4; sx <= 3.4; sx += 2.26) {
          for (let sz = -2.3; sz <= 2.3; sz += 2.3) {
            if (Math.abs(sx) < 3.0 && Math.abs(sz) < 2.0) continue;
            const px = wfx + sx;
            const pz = wfz + sz;
            fencePosts.push({ x: px, y: this.terrain.getMeshHeightAt(px, pz) + 0.65, z: pz });
          }
        }

        // Crops in neat rows
        for (let cx = -2.2; cx <= 2.2; cx += 1.45) {
          for (let cz = -1.2; cz <= 1.2; cz += 1.2) {
            const wx = wfx + cx;
            const wz = wfz + cz;
            const cy = this.terrain.getMeshHeightAt(wx, wz);
            if (isPumpkin && Math.abs(cx + cz) > 1.0) {
              pumpkins.push({ x: wx, y: cy + 0.42, z: wz });
            } else {
              wheatStalks.push({ x: wx, y: cy + 0.55, z: wz, s: 0.85 + Math.abs(cx) * 0.1 });
            }
          }
        }
      }

      this.group.add(vg);
    });

    // Build shared InstancedMeshes for all 14 village farms
    this.scratchScale.set(1, 1, 1);
    if (soilBlocks.length > 0) {
      const soilIM = new THREE.InstancedMesh(
        new THREE.BoxGeometry(7.0, 0.28, 4.8),
        new THREE.MeshStandardMaterial({ map: this.textures.darkDirt, roughness: 0.95 }),
        soilBlocks.length
      );
      soilBlocks.forEach((b, i) => {
        this.scratchPos.set(b.x, b.y, b.z);
        this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
        soilIM.setMatrixAt(i, this.scratchMat);
      });
      soilIM.instanceMatrix.needsUpdate = true;
      this.group.add(soilIM);
    }
    if (fencePosts.length > 0) {
      const fenceIM = new THREE.InstancedMesh(
        new THREE.BoxGeometry(0.24, 1.3, 0.24),
        doorMat,
        fencePosts.length
      );
      fencePosts.forEach((f, i) => {
        this.scratchPos.set(f.x, f.y, f.z);
        this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
        fenceIM.setMatrixAt(i, this.scratchMat);
      });
      fenceIM.instanceMatrix.needsUpdate = true;
      this.group.add(fenceIM);
    }
    if (wheatStalks.length > 0) {
      const wheatIM = new THREE.InstancedMesh(
        new THREE.BoxGeometry(0.45, 0.85, 0.45),
        new THREE.MeshStandardMaterial({ color: 0xebba42, roughness: 0.85 }),
        wheatStalks.length
      );
      wheatStalks.forEach((w, i) => {
        this.scratchPos.set(w.x, w.y, w.z);
        this.scratchScale.set(1, w.s, 1);
        this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
        wheatIM.setMatrixAt(i, this.scratchMat);
      });
      wheatIM.instanceMatrix.needsUpdate = true;
      this.group.add(wheatIM);
    }
    if (pumpkins.length > 0) {
      const pumpkinIM = new THREE.InstancedMesh(
        new THREE.BoxGeometry(0.68, 0.62, 0.68),
        new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.78 }),
        pumpkins.length
      );
      this.scratchScale.set(1, 1, 1);
      pumpkins.forEach((p, i) => {
        this.scratchPos.set(p.x, p.y, p.z);
        this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
        pumpkinIM.setMatrixAt(i, this.scratchMat);
      });
      pumpkinIM.instanceMatrix.needsUpdate = true;
      this.group.add(pumpkinIM);
    }
  }

  private buildHarvestableWorld(): void {
    const trees: Array<{ x: number; y: number; z: number; s: number }> = [];
    const rocks: Array<{ x: number; y: number; z: number; kind: ResourceKind; s: number }> = [];
    const crystals: Array<{ x: number; y: number; z: number; s: number }> = [];
    const bushes: Array<{ x: number; y: number; z: number; s: number }> = [];

    const seeded = (i: number, k: number) => {
      const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
      return v - Math.floor(v);
    };

    const isClearZone = (x: number, z: number): boolean => {
      if (Math.hypot(x, z - 92) < 16) return false;
      if (Math.hypot(x, z + 340) < 62) return false;
      if (Math.abs(x - this.terrain.getRiverCenterX(z)) < 13 && z > -240 && z < 230) return false;
      if (this.terrain.isNearRoad(x, z, 5.5)) return false;
      for (const lm of this.terrain.landmarks) {
        if (lm.kind === 'village' && Math.hypot(x - lm.pos.x, z - lm.pos.z) < 26) return false;
      }
      return true;
    };

    const maxTrees = this.isMobile ? 250 : 380;
    const maxRocks = this.isMobile ? 95 : 130;
    const maxCrystals = this.isMobile ? 48 : 65;
    const maxBushes = this.isMobile ? 60 : 85;

    // 1. Rich Dark Fantasy Forests (dense stepped blocky trees)
    for (let i = 0; i < 640 && trees.length < maxTrees; i++) {
      const angle = seeded(i, 1) * Math.PI * 2;
      const dist = 22 + seeded(i, 2) * 450;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist - 90;
      if (!isClearZone(x, z)) continue;
      const y = this.terrain.getMeshHeightAt(x, z);
      const s = 0.85 + seeded(i, 3) * 0.75;
      trees.push({ x, y, z, s });
    }

    // 2. Stone, Iron & Gold Ore Boulders
    for (let i = 0; i < 220 && rocks.length < maxRocks; i++) {
      const angle = seeded(i + 500, 1) * Math.PI * 2;
      const dist = 18 + seeded(i + 500, 2) * 410;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist - 80;
      if (!isClearZone(x, z)) continue;
      const y = this.terrain.getMeshHeightAt(x, z);
      const roll = seeded(i + 500, 4);
      const kind: ResourceKind = roll > 0.82 ? 'gold' : roll > 0.52 ? 'iron' : 'stone';
      rocks.push({ x, y, z, kind, s: 0.9 + seeded(i + 500, 3) * 0.7 });
    }

    // 3. Glowing Purple Shadow Crystal Veins (including near spawn overlook & caves)
    const presetCrystalSpots: Array<[number, number]> = [
      [14, 84],
      [-15, 76],
      [-48, 28],
      [-70, 24],
      [34, 48],
      [-150, -124],
      [152, -98],
      [22, -195],
      [-26, -210],
    ];
    for (const [cx, cz] of presetCrystalSpots) {
      crystals.push({ x: cx, y: this.terrain.getMeshHeightAt(cx, cz), z: cz, s: 1.3 });
    }
    for (let i = 0; i < 110 && crystals.length < maxCrystals; i++) {
      const angle = seeded(i + 900, 1) * Math.PI * 2;
      const dist = 28 + seeded(i + 900, 2) * 400;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist - 100;
      if (!isClearZone(x, z)) continue;
      crystals.push({ x, y: this.terrain.getMeshHeightAt(x, z), z, s: 0.95 + seeded(i + 900, 3) * 0.65 });
    }

    // 4. Wild Berry & Food Bushes
    for (let i = 0; i < 140 && bushes.length < maxBushes; i++) {
      const angle = seeded(i + 1300, 1) * Math.PI * 2;
      const dist = 16 + seeded(i + 1300, 2) * 360;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist - 70;
      if (!isClearZone(x, z)) continue;
      bushes.push({ x, y: this.terrain.getMeshHeightAt(x, z), z, s: 0.85 + seeded(i + 1300, 3) * 0.45 });
    }

    // Build Minecraft-inspired 2-tier Blocky InstancedMeshes
    const trunkGeo = new THREE.BoxGeometry(0.95, 4.4, 0.95);
    const trunkMat = new THREE.MeshStandardMaterial({ map: this.textures.logBark, roughness: 0.9 });
    const canopyGeo = new THREE.BoxGeometry(4.0, 2.4, 4.0);
    const canopyMat = new THREE.MeshStandardMaterial({ map: this.textures.grassTop, color: 0x2d5e45, roughness: 0.88 });
    const canopyTopGeo = new THREE.BoxGeometry(2.5, 1.8, 2.5);
    const canopyTopMat = new THREE.MeshStandardMaterial({ map: this.textures.grassTop, color: 0x387255, roughness: 0.85 });

    this.treeTrunkIM = new THREE.InstancedMesh(trunkGeo, trunkMat, trees.length);
    this.treeCanopyIM = new THREE.InstancedMesh(canopyGeo, canopyMat, trees.length);
    this.treeCanopyTopIM = new THREE.InstancedMesh(canopyTopGeo, canopyTopMat, trees.length);
    this.treeTrunkIM.castShadow = !this.isMobile;
    this.treeCanopyIM.castShadow = !this.isMobile;

    let nodeId = 1;
    trees.forEach((t, i) => {
      this.treeScales[i] = t.s;
      this.scratchPos.set(t.x, t.y + 2.2 * t.s, t.z);
      this.scratchScale.set(t.s, t.s, t.s);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.treeTrunkIM.setMatrixAt(i, this.scratchMat);

      this.scratchPos.set(t.x, t.y + 5.0 * t.s, t.z);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.treeCanopyIM.setMatrixAt(i, this.scratchMat);

      this.scratchPos.set(t.x, t.y + 6.9 * t.s, t.z);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.treeCanopyTopIM.setMatrixAt(i, this.scratchMat);

      this.obstacles.push({ x: t.x, z: t.z, radius: 0.68 * t.s });
      this.harvestNodes.push({
        id: nodeId++,
        kind: 'wood',
        pos: new THREE.Vector3(t.x, t.y, t.z),
        hp: 40,
        maxHp: 40,
        regrowTimer: 0,
        alive: true,
        instanceIndex: i,
      });
    });
    this.treeTrunkIM.instanceMatrix.needsUpdate = true;
    this.treeCanopyIM.instanceMatrix.needsUpdate = true;
    this.treeCanopyTopIM.instanceMatrix.needsUpdate = true;
    this.group.add(this.treeTrunkIM, this.treeCanopyIM, this.treeCanopyTopIM);

    const rockGeo = new THREE.BoxGeometry(1.9, 1.5, 1.9);
    const rockMat = new THREE.MeshStandardMaterial({ map: this.textures.ironOre, roughness: 0.85 });
    this.rockIM = new THREE.InstancedMesh(rockGeo, rockMat, rocks.length);
    rocks.forEach((r, i) => {
      this.rockScales[i] = r.s;
      this.scratchPos.set(r.x, r.y + 0.72 * r.s, r.z);
      this.scratchScale.set(r.s, r.s * 0.85, r.s);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.rockIM.setMatrixAt(i, this.scratchMat);
      this.obstacles.push({ x: r.x, z: r.z, radius: 1.0 * r.s });
      this.harvestNodes.push({
        id: nodeId++,
        kind: r.kind,
        pos: new THREE.Vector3(r.x, r.y, r.z),
        hp: 50,
        maxHp: 50,
        regrowTimer: 0,
        alive: true,
        instanceIndex: i,
      });
    });
    this.rockIM.instanceMatrix.needsUpdate = true;
    this.group.add(this.rockIM);

    const crysGeo = new THREE.OctahedronGeometry(1.05, 0);
    crysGeo.scale(0.65, 1.7, 0.65);
    const crysMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 1.7,
      roughness: 0.18,
    });
    this.crystalIM = new THREE.InstancedMesh(crysGeo, crysMat, crystals.length);
    crystals.forEach((c, i) => {
      this.crystalScales[i] = c.s;
      this.scratchPos.set(c.x, c.y + 1.15 * c.s, c.z);
      this.scratchScale.set(c.s, c.s, c.s);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.crystalIM.setMatrixAt(i, this.scratchMat);
      this.harvestNodes.push({
        id: nodeId++,
        kind: 'crystal',
        pos: new THREE.Vector3(c.x, c.y, c.z),
        hp: 45,
        maxHp: 45,
        regrowTimer: 0,
        alive: true,
        instanceIndex: i,
      });
    });
    this.crystalIM.instanceMatrix.needsUpdate = true;
    this.group.add(this.crystalIM);

    const bushGeo = new THREE.BoxGeometry(1.4, 1.15, 1.4);
    const bushMat = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      emissive: 0x3b182e,
      emissiveIntensity: 0.35,
      roughness: 0.9,
    });
    this.bushIM = new THREE.InstancedMesh(bushGeo, bushMat, bushes.length);
    bushes.forEach((b, i) => {
      this.bushScales[i] = b.s;
      this.scratchPos.set(b.x, b.y + 0.55 * b.s, b.z);
      this.scratchScale.set(b.s, b.s * 0.8, b.s);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.bushIM.setMatrixAt(i, this.scratchMat);
      this.harvestNodes.push({
        id: nodeId++,
        kind: 'food',
        pos: new THREE.Vector3(b.x, b.y, b.z),
        hp: 20,
        maxHp: 20,
        regrowTimer: 0,
        alive: true,
        instanceIndex: i,
      });
    });
    this.bushIM.instanceMatrix.needsUpdate = true;
    this.group.add(this.bushIM);
  }

  private buildSecretChests(): void {
    const chestLocations: THREE.Vector3[] = [
      new THREE.Vector3(44, 0, 22),     // Lantern village
      new THREE.Vector3(-68, 0, 26),    // Inside Torch Cave
      new THREE.Vector3(-185, 0, -135), // Inside Amethyst Hollow
      new THREE.Vector3(188, 0, -110),  // Inside Iron Mine
      new THREE.Vector3(-155, 0, 114),  // Whispering ruins
      new THREE.Vector3(172, 0, -162),  // Ashen outpost
      new THREE.Vector3(-162, 0, -230), // Frostmire hamlet
      new THREE.Vector3(12, 0, -315),   // Castle courtyard
      new THREE.Vector3(-24, 0, -350),  // Castle bastion
      new THREE.Vector3(24, 0, -350),   // Castle bastion
      new THREE.Vector3(-58, 25, -78),  // Floating island 1
      new THREE.Vector3(78, 28, -102),  // Floating island 3
      new THREE.Vector3(-92, 38, -210), // Floating island 4
      new THREE.Vector3(160, 34, -225), // Floating island 5
      new THREE.Vector3(84, 23, 62),    // Floating island 6
      new THREE.Vector3(-25, 0, 62),    // Valley riverside
      new THREE.Vector3(110, 0, 95),    // Eastern forest
      new THREE.Vector3(-115, 0, -15),  // Western forest
    ];

    const boxMat = new THREE.MeshStandardMaterial({ map: this.textures.woodPlanks, roughness: 0.7 });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.85, roughness: 0.25 });

    chestLocations.forEach((loc, i) => {
      const y = loc.y > 1 ? loc.y : this.terrain.getMeshHeightAt(loc.x, loc.z);
      const pos = new THREE.Vector3(loc.x, y, loc.z);

      const g = new THREE.Group();
      g.position.copy(pos);

      const base = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 0.9), boxMat);
      base.position.y = 0.35;
      const lid = new THREE.Mesh(new THREE.BoxGeometry(1.34, 0.26, 0.94), trimMat);
      lid.position.y = 0.82;
      g.add(base, lid);

      const glow = new PooledPointLightProxy(0xfbbf24, 5, 11, 1.8);
      glow.position.set(0, 1.4, 0);
      g.add(glow);

      this.group.add(g);
      this.chests.push({
        id: `chest_${i}`,
        pos,
        opened: false,
        lidMesh: lid,
        glowLight: glow,
      });
    });
  }

  public damageNearestNode(
    playerPos: THREE.Vector3,
    damage: number
  ): { nodeId: number; hp: number; kind: ResourceKind; destroyed: boolean; pos: THREE.Vector3 } | null {
    let best: HarvestNode | null = null;
    let bestDist = 4.2;

    for (const node of this.harvestNodes) {
      if (!node.alive) continue;
      const d = Math.hypot(node.pos.x - playerPos.x, node.pos.z - playerPos.z);
      if (d < bestDist) {
        bestDist = d;
        best = node;
      }
    }
    if (!best) return null;

    best.hp = Math.max(0, best.hp - damage);
    if (best.hp <= 0) {
      best.alive = false;
      best.regrowTimer = 45;
      this.hideNodeMesh(best);
      return { nodeId: best.id, hp: 0, kind: best.kind, destroyed: true, pos: best.pos.clone() };
    }
    return { nodeId: best.id, hp: best.hp, kind: best.kind, destroyed: false, pos: best.pos.clone() };
  }

  public applyRemoteNodeState(nodeId: number, hp: number, alive: boolean): void {
    const node = this.harvestNodes.find((n) => n.id === nodeId);
    if (!node) return;
    if (!alive || hp <= 0) {
      node.hp = 0;
      if (node.alive) {
        node.alive = false;
        node.regrowTimer = 45;
        this.hideNodeMesh(node);
      }
    } else {
      node.hp = Math.min(node.maxHp, hp);
      if (!node.alive) {
        node.alive = true;
        this.restoreNodeMesh(node);
      }
    }
  }

  private hideNodeMesh(node: HarvestNode): void {
    this.scratchScale.set(0, 0, 0);
    this.scratchMat.compose(node.pos, this.scratchQuat, this.scratchScale);
    if (node.kind === 'wood') {
      this.treeTrunkIM.setMatrixAt(node.instanceIndex, this.scratchMat);
      this.treeCanopyIM.setMatrixAt(node.instanceIndex, this.scratchMat);
      this.treeCanopyTopIM.setMatrixAt(node.instanceIndex, this.scratchMat);
      this.treeTrunkIM.instanceMatrix.needsUpdate = true;
      this.treeCanopyIM.instanceMatrix.needsUpdate = true;
      this.treeCanopyTopIM.instanceMatrix.needsUpdate = true;
    } else if (node.kind === 'crystal') {
      this.crystalIM.setMatrixAt(node.instanceIndex, this.scratchMat);
      this.crystalIM.instanceMatrix.needsUpdate = true;
    } else if (node.kind === 'food') {
      this.bushIM.setMatrixAt(node.instanceIndex, this.scratchMat);
      this.bushIM.instanceMatrix.needsUpdate = true;
    } else {
      this.rockIM.setMatrixAt(node.instanceIndex, this.scratchMat);
      this.rockIM.instanceMatrix.needsUpdate = true;
    }
  }

  private restoreNodeMesh(node: HarvestNode): void {
    if (node.kind === 'wood') {
      const s = this.treeScales[node.instanceIndex] ?? 1;
      this.scratchScale.set(s, s, s);
      this.scratchPos.set(node.pos.x, node.pos.y + 2.2 * s, node.pos.z);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.treeTrunkIM.setMatrixAt(node.instanceIndex, this.scratchMat);

      this.scratchPos.set(node.pos.x, node.pos.y + 5.0 * s, node.pos.z);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.treeCanopyIM.setMatrixAt(node.instanceIndex, this.scratchMat);

      this.scratchPos.set(node.pos.x, node.pos.y + 6.9 * s, node.pos.z);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.treeCanopyTopIM.setMatrixAt(node.instanceIndex, this.scratchMat);

      this.treeTrunkIM.instanceMatrix.needsUpdate = true;
      this.treeCanopyIM.instanceMatrix.needsUpdate = true;
      this.treeCanopyTopIM.instanceMatrix.needsUpdate = true;
    } else if (node.kind === 'crystal') {
      const s = this.crystalScales[node.instanceIndex] ?? 1;
      this.scratchScale.set(s, s, s);
      this.scratchPos.set(node.pos.x, node.pos.y + 1.15 * s, node.pos.z);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.crystalIM.setMatrixAt(node.instanceIndex, this.scratchMat);
      this.crystalIM.instanceMatrix.needsUpdate = true;
    } else if (node.kind === 'food') {
      const s = this.bushScales[node.instanceIndex] ?? 1;
      this.scratchScale.set(s, s * 0.8, s);
      this.scratchPos.set(node.pos.x, node.pos.y + 0.55 * s, node.pos.z);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.bushIM.setMatrixAt(node.instanceIndex, this.scratchMat);
      this.bushIM.instanceMatrix.needsUpdate = true;
    } else {
      const s = this.rockScales[node.instanceIndex] ?? 1;
      this.scratchScale.set(s, s * 0.85, s);
      this.scratchPos.set(node.pos.x, node.pos.y + 0.72 * s, node.pos.z);
      this.scratchMat.compose(this.scratchPos, this.scratchQuat, this.scratchScale);
      this.rockIM.setMatrixAt(node.instanceIndex, this.scratchMat);
      this.rockIM.instanceMatrix.needsUpdate = true;
    }
  }

  public findClosestChest(playerPos: THREE.Vector3, maxDist: number = 3.5): SecretChest | null {
    let best: SecretChest | null = null;
    let dMin = maxDist;
    for (const c of this.chests) {
      if (c.opened) continue;
      const d = c.pos.distanceTo(playerPos);
      if (d < dMin) {
        dMin = d;
        best = c;
      }
    }
    return best;
  }

  public openChest(chest: SecretChest): void {
    if (chest.opened) return;
    chest.opened = true;
    chest.lidMesh.rotation.x = -0.9;
    chest.lidMesh.position.y += 0.25;
    if (chest.glowLight) chest.glowLight.intensity = 0;
  }

  public applyRemoteChestOpened(chestId: string): void {
    const chest = this.chests.find((c) => c.id === chestId);
    if (chest && !chest.opened) {
      this.openChest(chest);
    }
  }

  public update(dt: number, timeSec: number): void {
    if (this.portalVortexMesh) {
      this.portalVortexMesh.rotation.z = Math.sin(timeSec * 0.7) * 0.05;
    }
    if (this.castleBeaconMesh) {
      this.castleBeaconMesh.rotation.y += dt * 0.6;
    }
    // Regrow depleted resources after timer
    for (let i = 0; i < this.harvestNodes.length; i++) {
      const node = this.harvestNodes[i];
      if (!node.alive) {
        node.regrowTimer -= dt;
        if (node.regrowTimer <= 0) {
          node.alive = true;
          node.hp = node.maxHp;
          this.restoreNodeMesh(node);
        }
      }
    }
  }
}
