/**
 * ECHO – THE WORLD REMEMBERS
 * 3D Procedural Forests, Lush Flora, Roads, Windmills & Living World Landmarks
 * Features tall dense multi-biome forests, instanced grass, wildflowers & undergrowth bushes,
 * winding road networks leading cleanly to landmarks & the Great Portal stairs,
 * rotating hillside windmill, mountain watchtower, coastal fishing pier, and stone shrines.
 */

import * as THREE from 'three';
import { Terrain } from './Terrain.ts';
import { VillageHouses } from './VillageHouses.ts';
import { PooledPointLightProxy } from './WorldLightPool.ts';

export interface WorldObstacle {
  x: number;
  z: number;
  radius: number;
  topY?: number;
}

interface TreePlacement {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotY: number;
  scaleYMult: number;
}

interface HarvestableTree {
  trunkIM: THREE.InstancedMesh;
  tierMeshes: THREE.InstancedMesh[];
  idx: number;
  p: TreePlacement;
  visibleTrunkH: number;
  sinkDepth: number;
  tierYOffsets: number[];
  hp: number;
  maxHp: number;
  alive: boolean;
  regrowTimer: number;
}

interface HarvestableBoulder {
  im: THREE.InstancedMesh;
  idx: number;
  x: number;
  y: number;
  z: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  rx: number;
  ry: number;
  rz: number;
  kind: 'stone' | 'iron';
  hp: number;
  maxHp: number;
  alive: boolean;
  regrowTimer: number;
}

const PORTAL_RY = -Math.PI * 0.65;
const PORTAL_STAIR_FOOT_X = Terrain.PORTAL_POS.x + 13.2 * Math.sin(PORTAL_RY);
const PORTAL_STAIR_FOOT_Z = Terrain.PORTAL_POS.z + 13.2 * Math.cos(PORTAL_RY);

export class Forest {
  public group: THREE.Group;
  public obstacles: WorldObstacle[] = [];
  private windmillSails: THREE.Group | null = null;
  private roadLanterns: PooledPointLightProxy[] = [];
  private harvestableTrees: HarvestableTree[] = [];
  private harvestableBoulders: HarvestableBoulder[] = [];

  // Instanced Meshes for LOD and Quality adjustment
  private treeGroup: THREE.Group = new THREE.Group();
  private instancedGrass: THREE.InstancedMesh | null = null;
  private instancedFlowers: THREE.InstancedMesh | null = null;
  private instancedBlueFlowers: THREE.InstancedMesh | null = null;
  private instancedBushes: THREE.InstancedMesh | null = null;
  private fullGrassCount: number = 0;
  private fullFlowerCount: number = 0;
  private fullBlueFlowerCount: number = 0;
  private fullBushCount: number = 0;

  private readonly roadBranches: [number, number][][] = [
    // 1. Spawn shore to Village Plaza
    [
      [0, 78],
      [15, 65],
      [32, 52],
      [48, 42],
    ],
    // 2. Village Plaza to Lake Docks
    [
      [48, 42],
      [35, 25],
      [18, 10],
      [2, -2],
    ],
    // 3. Lake to Great Portal Front Staircase (clear unobstructed approach)
    [
      [25, -8],
      [48, -16],
      [68, -26],
      [PORTAL_STAIR_FOOT_X, PORTAL_STAIR_FOOT_Z],
    ],
    // 4. Village to Eastern Windmill Valley
    [
      [80, 36],
      [130, 22],
      [180, 5],
      [225, -15],
    ],
    // 5. Lake to Ancient Temple East Entrance
    [
      [-25, 2],
      [-48, 14],
      [-62, 23],
    ],
    // 6. Lake to Northern Mountain Pass
    [
      [-5, -35],
      [5, -65],
      [15, -92],
    ],
  ];

  private isMobile: boolean = false;

  constructor(terrain: Terrain, isMobile: boolean = false) {
    this.group = new THREE.Group();
    this.isMobile = isMobile;

    this.spawnVastForestTrees(terrain);
    this.spawnInstancedGrassAndFlora(terrain);
    this.spawnRoadsAndTrailMarkers(terrain);
    this.spawnHillsideWindmill(terrain);
    this.spawnMountainWatchtower(terrain);
    this.spawnCoastalFishingPier();
    this.spawnAncientStandingMonoliths(terrain);
    this.spawnBoulders(terrain);
    this.spawnGlowingMushrooms(terrain);
    this.spawnColossalElderTree(terrain);
  }

  /**
   * Squared distance from point (px, pz) to line segment (ax, az)-(bx, bz)
   */
  private distToSegment(
    px: number,
    pz: number,
    ax: number,
    az: number,
    bx: number,
    bz: number
  ): number {
    const abx = bx - ax;
    const abz = bz - az;
    const apx = px - ax;
    const apz = pz - az;
    const abLenSq = abx * abx + abz * abz;
    if (abLenSq <= 1e-6) return Math.hypot(apx, apz);
    const t = Math.max(0, Math.min(1, (apx * abx + apz * abz) / abLenSq));
    const cx = ax + t * abx;
    const cz = az + t * abz;
    return Math.hypot(px - cx, pz - cz);
  }

  private isNearRoadCorridor(x: number, z: number, clearance: number): boolean {
    for (const branch of this.roadBranches) {
      for (let i = 0; i < branch.length - 1; i++) {
        const [ax, az] = branch[i];
        const [bx, bz] = branch[i + 1];
        if (this.distToSegment(x, z, ax, az, bx, bz) < clearance) {
          return true;
        }
      }
    }
    return false;
  }

  private isBlockedForNature(
    x: number,
    z: number,
    roadClearance: number,
    landmarkExtra: number = 0
  ): boolean {
    // Avoid lake crater
    if (
      Math.hypot(x - Terrain.LAKE_CENTER.x, z - Terrain.LAKE_CENTER.y) <
      Terrain.LAKE_RADIUS + 8
    ) {
      return true;
    }
    // Keep spawn shore clear
    if (Math.hypot(x - Terrain.SPAWN_POS.x, z - Terrain.SPAWN_POS.z) < 12 + landmarkExtra) {
      return true;
    }
    // Keep Ancient Temple plinth clear
    if (Math.hypot(x - Terrain.TEMPLE_POS.x, z - Terrain.TEMPLE_POS.z) < 25 + landmarkExtra) {
      return true;
    }
    // Keep Great Portal platform and front stair approach completely clear
    if (Math.hypot(x - Terrain.PORTAL_POS.x, z - Terrain.PORTAL_POS.z) < 25 + landmarkExtra) {
      return true;
    }
    if (Math.hypot(x - PORTAL_STAIR_FOOT_X, z - PORTAL_STAIR_FOOT_Z) < 11 + landmarkExtra) {
      return true;
    }
    // Avoid Elder Tree clearing, Windmill, Watchtower, Monolith Shrine
    if (Math.hypot(x + 45, z + 65) < 9) return true;
    if (Math.hypot(x - 235, z + 25) < 10) return true;
    if (Math.hypot(x - 85, z + 185) < 8) return true;
    if (Math.hypot(x + 210, z + 50) < 10) return true;

    // Avoid village houses and roads
    if (VillageHouses.isNearAnyHouse(x, z, 5.2 + landmarkExtra)) return true;
    if (this.isNearRoadCorridor(x, z, roadClearance)) return true;

    return false;
  }

  /**
   * Applies LOD and quality settings dynamically
   */
  public applyQuality(shadows: boolean, grassRatio: number, enableExtraLights: boolean): void {
    this.treeGroup.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = shadows;
      }
    });

    if (this.instancedGrass && this.fullGrassCount > 0) {
      this.instancedGrass.count = Math.max(10, Math.floor(this.fullGrassCount * grassRatio));
    }
    if (this.instancedFlowers && this.fullFlowerCount > 0) {
      this.instancedFlowers.count = Math.max(5, Math.floor(this.fullFlowerCount * grassRatio));
    }
    if (this.instancedBlueFlowers && this.fullBlueFlowerCount > 0) {
      this.instancedBlueFlowers.count = Math.max(
        5,
        Math.floor(this.fullBlueFlowerCount * grassRatio)
      );
    }
    if (this.instancedBushes && this.fullBushCount > 0) {
      this.instancedBushes.count = Math.max(8, Math.floor(this.fullBushCount * grassRatio));
    }

    for (const light of this.roadLanterns) {
      light.visible = enableExtraLights;
    }
  }

  /**
   * Spawns ~1,000+ tall, dense, grounded multi-biome forest trees using InstancedMesh.
   * Every trunk extends 0.75m underground so slopes never expose floating bases.
   */
  private spawnVastForestTrees(terrain: Terrain): void {
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x4a3220,
      roughness: 0.9,
      metalness: 0.05,
    });

    const birchTrunkMat = new THREE.MeshStandardMaterial({
      color: 0xdcd8cf,
      roughness: 0.85,
      metalness: 0.04,
    });

    const pineLeafMat = new THREE.MeshStandardMaterial({ color: 0x1d4d32, roughness: 0.8 });
    const birchLeafMat = new THREE.MeshStandardMaterial({ color: 0xd18e26, roughness: 0.75 });
    const oakLeafMat = new THREE.MeshStandardMaterial({ color: 0x2f633a, roughness: 0.82 });

    const pinePlacements: TreePlacement[] = [];
    const birchPlacements: TreePlacement[] = [];
    const oakPlacements: TreePlacement[] = [];

    const treeAttempts = this.isMobile ? 620 : 1050;

    for (let i = 0; i < treeAttempts; i++) {
      const angle = Math.random() * Math.PI * 2;
      // Rich dense forest ring around central valleys, roadsides & rolling hills
      const dist = 24 + Math.pow(Math.random(), 0.82) * 760;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      if (this.isBlockedForNature(x, z, 5.8, 1.5)) continue;

      const y = terrain.getMeshHeightAt(x, z);
      if (y < 2.3 || y > 46.0) continue;

      const isBirch = x > 120 && z > -80 && Math.random() < 0.38;
      // Tall pines flourish on highlands and generously throughout the mid-island woods
      const isPine = !isBirch && (y > 11.5 || Math.random() < 0.52);

      const scale = (isPine ? 1.0 : 0.88) + Math.random() * 0.55;
      const scaleYMult = 1.0 + Math.random() * 0.35;
      const rotY = Math.floor(Math.random() * 4) * (Math.PI / 2);

      const placement: TreePlacement = { x, y, z, scale, rotY, scaleYMult };

      if (isBirch) {
        birchPlacements.push(placement);
      } else if (isPine) {
        pinePlacements.push(placement);
      } else {
        oakPlacements.push(placement);
      }

      this.obstacles.push({
        x,
        z,
        radius: 0.85 * scale,
      });
    }

    const dummy = new THREE.Object3D();
    const childDummy = new THREE.Object3D();
    this.treeGroup = new THREE.Group();
    dummy.add(childDummy);

    // 1. Blocky Minecraft Pines (4 stepped voxel foliage tiers + square trunk)
    if (pinePlacements.length > 0) {
      const pCount = pinePlacements.length;
      const visibleTrunkH = 6.2;
      const sinkDepth = 0.75;
      const fullTrunkH = visibleTrunkH + sinkDepth;
      const trunkGeo = new THREE.BoxGeometry(0.82, fullTrunkH, 0.82);
      const pineTrunkMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, pCount);
      pineTrunkMesh.castShadow = !this.isMobile;
      pineTrunkMesh.receiveShadow = true;

      const tierCount = 4;
      const tierMeshes: THREE.InstancedMesh[] = [];
      for (let t = 0; t < tierCount; t++) {
        const tierSize = 4.4 - t * 0.95;
        const tierHeight = 1.35;
        const tierGeo = new THREE.BoxGeometry(tierSize, tierHeight, tierSize);
        const tMesh = new THREE.InstancedMesh(tierGeo, pineLeafMat, pCount);
        tMesh.castShadow = !this.isMobile && t === 0;
        tMesh.receiveShadow = true;
        tierMeshes.push(tMesh);
      }

      for (let idx = 0; idx < pCount; idx++) {
        const p = pinePlacements[idx];
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(0, p.rotY, 0);
        dummy.scale.set(p.scale, p.scale * p.scaleYMult, p.scale);
        dummy.updateMatrixWorld(true);

        childDummy.position.set(0, (visibleTrunkH - sinkDepth) * 0.5, 0);
        childDummy.rotation.set(0, 0, 0);
        childDummy.scale.set(1, 1, 1);
        childDummy.updateMatrix();
        childDummy.updateWorldMatrix(false, false);
        pineTrunkMesh.setMatrixAt(idx, childDummy.matrixWorld);

        for (let t = 0; t < tierCount; t++) {
          childDummy.position.set(0, visibleTrunkH * 0.64 + t * 1.25, 0);
          childDummy.rotation.set(0, 0, 0);
          childDummy.scale.set(1, 1, 1);
          childDummy.updateMatrix();
          childDummy.updateWorldMatrix(false, false);
          tierMeshes[t].setMatrixAt(idx, childDummy.matrixWorld);
        }

        this.harvestableTrees.push({
          trunkIM: pineTrunkMesh,
          tierMeshes,
          idx,
          p,
          visibleTrunkH,
          sinkDepth,
          tierYOffsets: [0, 1, 2, 3].map((t) => visibleTrunkH * 0.64 + t * 1.25),
          hp: 45,
          maxHp: 45,
          alive: true,
          regrowTimer: 0,
        });
      }

      pineTrunkMesh.instanceMatrix.needsUpdate = true;
      pineTrunkMesh.computeBoundingSphere();
      this.treeGroup.add(pineTrunkMesh);

      for (const tm of tierMeshes) {
        tm.instanceMatrix.needsUpdate = true;
        tm.computeBoundingSphere();
        this.treeGroup.add(tm);
      }
    }

    // 2. Blocky Minecraft Birches (3 layered voxel canopy slabs + square white birch trunk)
    if (birchPlacements.length > 0) {
      const bCount = birchPlacements.length;
      const visibleTrunkH = 5.2;
      const sinkDepth = 0.75;
      const fullTrunkH = visibleTrunkH + sinkDepth;
      const trunkGeo = new THREE.BoxGeometry(0.72, fullTrunkH, 0.72);
      const birchTrunkMesh = new THREE.InstancedMesh(trunkGeo, birchTrunkMat, bCount);
      birchTrunkMesh.castShadow = !this.isMobile;
      birchTrunkMesh.receiveShadow = true;

      const tierCount = 3;
      const tierMeshes: THREE.InstancedMesh[] = [];
      const tierSizes: [number, number][] = [
        [3.6, 1.35],
        [2.7, 1.2],
        [1.7, 1.0],
      ];
      for (let t = 0; t < tierCount; t++) {
        const fGeo = new THREE.BoxGeometry(tierSizes[t][0], tierSizes[t][1], tierSizes[t][0]);
        const fMesh = new THREE.InstancedMesh(fGeo, birchLeafMat, bCount);
        fMesh.castShadow = !this.isMobile && t === 0;
        fMesh.receiveShadow = true;
        tierMeshes.push(fMesh);
      }

      for (let idx = 0; idx < bCount; idx++) {
        const p = birchPlacements[idx];
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(0, p.rotY, 0);
        dummy.scale.set(p.scale, p.scale * p.scaleYMult, p.scale);
        dummy.updateMatrixWorld(true);

        childDummy.position.set(0, (visibleTrunkH - sinkDepth) * 0.5, 0);
        childDummy.rotation.set(0, 0, 0);
        childDummy.scale.set(1, 1, 1);
        childDummy.updateMatrix();
        childDummy.updateWorldMatrix(false, false);
        birchTrunkMesh.setMatrixAt(idx, childDummy.matrixWorld);

        for (let t = 0; t < tierCount; t++) {
          childDummy.position.set(0, visibleTrunkH * 0.95 + t * 1.1, 0);
          childDummy.rotation.set(0, 0, 0);
          childDummy.scale.set(1, 1, 1);
          childDummy.updateMatrix();
          childDummy.updateWorldMatrix(false, false);
          tierMeshes[t].setMatrixAt(idx, childDummy.matrixWorld);
        }

        this.harvestableTrees.push({
          trunkIM: birchTrunkMesh,
          tierMeshes,
          idx,
          p,
          visibleTrunkH,
          sinkDepth,
          tierYOffsets: [0, 1, 2].map((t) => visibleTrunkH * 0.95 + t * 1.1),
          hp: 40,
          maxHp: 40,
          alive: true,
          regrowTimer: 0,
        });
      }

      birchTrunkMesh.instanceMatrix.needsUpdate = true;
      birchTrunkMesh.computeBoundingSphere();
      this.treeGroup.add(birchTrunkMesh);

      for (const tm of tierMeshes) {
        tm.instanceMatrix.needsUpdate = true;
        tm.computeBoundingSphere();
        this.treeGroup.add(tm);
      }
    }

    // 3. Blocky Minecraft Broadleaf Oaks (3 stepped leafy canopy tiers + sturdy square trunk)
    if (oakPlacements.length > 0) {
      const oCount = oakPlacements.length;
      const visibleTrunkH = 4.6;
      const sinkDepth = 0.75;
      const fullTrunkH = visibleTrunkH + sinkDepth;
      const trunkGeo = new THREE.BoxGeometry(0.92, fullTrunkH, 0.92);
      const oakTrunkMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, oCount);
      oakTrunkMesh.castShadow = !this.isMobile;
      oakTrunkMesh.receiveShadow = true;

      const tierCount = 3;
      const tierMeshes: THREE.InstancedMesh[] = [];
      const tierDims: [number, number][] = [
        [4.5, 1.45],
        [3.3, 1.3],
        [2.0, 1.1],
      ];
      for (let t = 0; t < tierCount; t++) {
        const foliageGeo = new THREE.BoxGeometry(tierDims[t][0], tierDims[t][1], tierDims[t][0]);
        const fMesh = new THREE.InstancedMesh(foliageGeo, oakLeafMat, oCount);
        fMesh.castShadow = !this.isMobile && t === 0;
        fMesh.receiveShadow = true;
        tierMeshes.push(fMesh);
      }

      for (let idx = 0; idx < oCount; idx++) {
        const p = oakPlacements[idx];
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.set(0, p.rotY, 0);
        dummy.scale.set(p.scale, p.scale * p.scaleYMult, p.scale);
        dummy.updateMatrixWorld(true);

        childDummy.position.set(0, (visibleTrunkH - sinkDepth) * 0.5, 0);
        childDummy.rotation.set(0, 0, 0);
        childDummy.scale.set(1, 1, 1);
        childDummy.updateMatrix();
        childDummy.updateWorldMatrix(false, false);
        oakTrunkMesh.setMatrixAt(idx, childDummy.matrixWorld);

        for (let t = 0; t < tierCount; t++) {
          childDummy.position.set(0, visibleTrunkH * 0.92 + t * 1.2, 0);
          childDummy.rotation.set(0, 0, 0);
          childDummy.scale.set(1, 1, 1);
          childDummy.updateMatrix();
          childDummy.updateWorldMatrix(false, false);
          tierMeshes[t].setMatrixAt(idx, childDummy.matrixWorld);
        }

        this.harvestableTrees.push({
          trunkIM: oakTrunkMesh,
          tierMeshes,
          idx,
          p,
          visibleTrunkH,
          sinkDepth,
          tierYOffsets: [0, 1, 2].map((t) => visibleTrunkH * 0.92 + t * 1.2),
          hp: 40,
          maxHp: 40,
          alive: true,
          regrowTimer: 0,
        });
      }

      oakTrunkMesh.instanceMatrix.needsUpdate = true;
      oakTrunkMesh.computeBoundingSphere();
      this.treeGroup.add(oakTrunkMesh);

      for (const tm of tierMeshes) {
        tm.instanceMatrix.needsUpdate = true;
        tm.computeBoundingSphere();
        this.treeGroup.add(tm);
      }
    }

    this.group.add(this.treeGroup);
  }

  /**
   * Spawns dense instanced 3D grass tufts, two varieties of wildflowers, and leafy undergrowth bushes
   */
  private spawnInstancedGrassAndFlora(terrain: Terrain): void {
    const dummy = new THREE.Object3D();

    // 1. Dense Instanced Grass Tufts (base sunk -0.10m into earth)
    const grassCount = this.isMobile ? 1200 : 2400;
    const grassGeo = new THREE.BoxGeometry(0.18, 0.72, 0.18);
    grassGeo.translate(0, 0.28, 0);

    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x3b8c4a,
      roughness: 0.85,
      metalness: 0.02,
      flatShading: true,
    });

    const instancedGrass = new THREE.InstancedMesh(grassGeo, grassMat, grassCount);
    let placed = 0;
    for (let i = 0; i < grassCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 10 + Math.pow(Math.random(), 0.72) * 740;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      if (this.isBlockedForNature(x, z, 3.0, -3)) continue;

      const y = terrain.getMeshHeightAt(x, z);
      if (y < 2.1 || y > 38.0) continue;

      const scaleY = 0.65 + Math.random() * 0.85;
      const scaleXZ = 0.75 + Math.random() * 0.65;
      dummy.position.set(x, y, z);
      dummy.scale.set(scaleXZ, scaleY, scaleXZ);
      dummy.rotation.set(
        (Math.random() - 0.5) * 0.15,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.15
      );
      dummy.updateMatrix();

      instancedGrass.setMatrixAt(placed, dummy.matrix);
      placed++;
    }

    this.instancedGrass = instancedGrass;
    this.fullGrassCount = placed;
    instancedGrass.count = placed;
    instancedGrass.instanceMatrix.needsUpdate = true;
    instancedGrass.receiveShadow = true;
    this.group.add(instancedGrass);

    // 2. Blocky Leafy Forest Undergrowth Bushes
    const bushCount = this.isMobile ? 260 : 440;
    const bushGeo = new THREE.BoxGeometry(1.1, 0.85, 1.1);
    const bushMat = new THREE.MeshStandardMaterial({
      color: 0x265c34,
      roughness: 0.86,
      flatShading: true,
    });

    const instancedBushes = new THREE.InstancedMesh(bushGeo, bushMat, bushCount);
    let bushesPlaced = 0;
    for (let b = 0; b < bushCount; b++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 18 + Math.pow(Math.random(), 0.75) * 700;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      if (this.isBlockedForNature(x, z, 4.4)) continue;

      const y = terrain.getMeshHeightAt(x, z);
      if (y < 2.2 || y > 34.0) continue;

      const s = 0.75 + Math.random() * 0.85;
      dummy.position.set(x, y + 0.3 * s, z);
      dummy.scale.set(s * 1.25, s * 0.82, s * 1.25);
      dummy.rotation.set(0, Math.floor(Math.random() * 4) * (Math.PI / 2), 0);
      dummy.updateMatrix();

      instancedBushes.setMatrixAt(bushesPlaced, dummy.matrix);
      bushesPlaced++;
    }

    this.instancedBushes = instancedBushes;
    this.fullBushCount = bushesPlaced;
    instancedBushes.count = bushesPlaced;
    instancedBushes.instanceMatrix.needsUpdate = true;
    instancedBushes.receiveShadow = true;
    this.group.add(instancedBushes);

    // 3. Golden Meadow Wildflowers (grounded near grass height, never floating)
    const flowerCount = this.isMobile ? 200 : 380;
    const flowerGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    flowerGeo.translate(0, 0.18, 0);

    const flowerMat = new THREE.MeshStandardMaterial({
      color: 0xffd166,
      roughness: 0.5,
      emissive: 0xffaa00,
      emissiveIntensity: 0.2,
    });

    const instancedFlowers = new THREE.InstancedMesh(flowerGeo, flowerMat, flowerCount);
    let flowersPlaced = 0;

    for (let f = 0; f < flowerCount; f++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 16 + Math.pow(Math.random(), 0.7) * 650;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      if (this.isBlockedForNature(x, z, 3.2, -2)) continue;

      const y = terrain.getMeshHeightAt(x, z);
      if (y < 2.2 || y > 30.0) continue;

      dummy.position.set(x, y, z);
      const s = 0.75 + Math.random() * 0.65;
      dummy.scale.set(s, s * 1.15, s);
      dummy.rotation.set(0, Math.random() * Math.PI, 0);
      dummy.updateMatrix();

      instancedFlowers.setMatrixAt(flowersPlaced, dummy.matrix);
      flowersPlaced++;
    }

    this.instancedFlowers = instancedFlowers;
    this.fullFlowerCount = flowersPlaced;
    instancedFlowers.count = flowersPlaced;
    instancedFlowers.instanceMatrix.needsUpdate = true;
    instancedFlowers.receiveShadow = true;
    this.group.add(instancedFlowers);

    // 4. Lavender & Azure Forest Blossoms (grounded beside trails and glades)
    const blueFlowerCount = this.isMobile ? 160 : 300;
    const blueFlowerGeo = new THREE.BoxGeometry(0.22, 0.22, 0.22);
    blueFlowerGeo.translate(0, 0.16, 0);

    const blueFlowerMat = new THREE.MeshStandardMaterial({
      color: 0x7b9cff,
      roughness: 0.45,
      emissive: 0x3b60d4,
      emissiveIntensity: 0.25,
    });

    const instancedBlueFlowers = new THREE.InstancedMesh(
      blueFlowerGeo,
      blueFlowerMat,
      blueFlowerCount
    );
    let bluePlaced = 0;

    for (let f = 0; f < blueFlowerCount; f++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 16 + Math.pow(Math.random(), 0.7) * 620;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      if (this.isBlockedForNature(x, z, 3.2, -2)) continue;

      const y = terrain.getMeshHeightAt(x, z);
      if (y < 2.2 || y > 30.0) continue;

      dummy.position.set(x, y, z);
      const s = 0.75 + Math.random() * 0.65;
      dummy.scale.set(s * 1.1, s, s * 1.1);
      dummy.rotation.set(0, Math.random() * Math.PI, 0);
      dummy.updateMatrix();

      instancedBlueFlowers.setMatrixAt(bluePlaced, dummy.matrix);
      bluePlaced++;
    }

    this.instancedBlueFlowers = instancedBlueFlowers;
    this.fullBlueFlowerCount = bluePlaced;
    instancedBlueFlowers.count = bluePlaced;
    instancedBlueFlowers.instanceMatrix.needsUpdate = true;
    instancedBlueFlowers.receiveShadow = true;
    this.group.add(instancedBlueFlowers);
  }

  /**
   * Spawns scenic cobblestone roads and lanterns per explicit road branch (no stray cross-branch segments)
   */
  private spawnRoadsAndTrailMarkers(terrain: Terrain): void {
    const stoneGeo = new THREE.BoxGeometry(1.15, 0.16, 1.15);
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x7c7e84,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    });

    const stoneTransforms: { x: number; y: number; z: number; sx: number; sz: number; ry: number }[] = [];

    for (const branch of this.roadBranches) {
      for (let p = 0; p < branch.length - 1; p++) {
        const [x1, z1] = branch[p];
        const [x2, z2] = branch[p + 1];
        const dx = x2 - x1;
        const dz = z2 - z1;
        const dist = Math.hypot(dx, dz);
        if (dist < 1) continue;

        // Perpendicular unit vector for placing roadside lanterns neatly outside the walking path
        const perpX = -dz / dist;
        const perpZ = dx / dist;

        const steps = Math.max(2, Math.floor(dist / 3.0));
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const x = THREE.MathUtils.lerp(x1, x2, t) + (Math.random() - 0.5) * 0.35;
          const z = THREE.MathUtils.lerp(z1, z2, t) + (Math.random() - 0.5) * 0.35;

          // Keep stones outside Portal platform top & Temple raised dais
          if (terrain.floorHeightProvider && terrain.floorHeightProvider(x, z) !== null) continue;
          const y = terrain.getMeshHeightAt(x, z);

          stoneTransforms.push({
            x,
            y: y - 0.01,
            z,
            sx: 1.05 + Math.random() * 0.4,
            sz: 1.05 + Math.random() * 0.4,
            ry: Math.random() * Math.PI,
          });

          // Place wooden lantern neatly along road margin, never inside Portal stair zone
          if (s % 5 === 0 && Math.random() < 0.65) {
            const side = Math.random() > 0.5 ? 1 : -1;
            const lanternX = x + perpX * side * 2.5;
            const lanternZ = z + perpZ * side * 2.5;
            if (Math.hypot(lanternX - Terrain.PORTAL_POS.x, lanternZ - Terrain.PORTAL_POS.z) < 17) {
              continue;
            }
            if (Math.hypot(lanternX - Terrain.TEMPLE_POS.x, lanternZ - Terrain.TEMPLE_POS.z) < 23) {
              continue;
            }
            const lanternY = terrain.getMeshHeightAt(lanternX, lanternZ);
            this.createRoadsideLantern(lanternX, lanternY, lanternZ);
          }
        }
      }
    }

    if (stoneTransforms.length > 0) {
      const stoneIM = new THREE.InstancedMesh(stoneGeo, stoneMat, stoneTransforms.length);
      stoneIM.receiveShadow = true;
      const dummy = new THREE.Object3D();
      for (let i = 0; i < stoneTransforms.length; i++) {
        const st = stoneTransforms[i];
        dummy.position.set(st.x, st.y, st.z);
        dummy.scale.set(st.sx, 1.0, st.sz);
        dummy.rotation.set(0, st.ry, 0);
        dummy.updateMatrix();
        stoneIM.setMatrixAt(i, dummy.matrix);
      }
      stoneIM.instanceMatrix.needsUpdate = true;
      stoneIM.computeBoundingSphere();
      this.group.add(stoneIM);
    }
  }

  /**
   * Creates a carved roadside wooden lantern with post sunk 0.25m underground
   */
  private createRoadsideLantern(x: number, y: number, z: number): void {
    const postGeo = new THREE.CylinderGeometry(0.08, 0.1, 2.65, 6);
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d2716, roughness: 0.9 });
    const post = new THREE.Mesh(postGeo, woodMat);
    post.position.set(x, y + 1.08, z);
    post.castShadow = true;
    this.group.add(post);

    const lanternBoxGeo = new THREE.BoxGeometry(0.32, 0.38, 0.32);
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xffaa44,
      emissive: 0xff8822,
      emissiveIntensity: 1.2,
      roughness: 0.3,
    });
    const lantern = new THREE.Mesh(lanternBoxGeo, lanternMat);
    lantern.position.set(x, y + 2.2, z);
    this.group.add(lantern);

    const pLight = new PooledPointLightProxy(0xff9933, 0.85, 8.5);
    pLight.position.set(x, y + 2.2, z);
    this.group.add(pLight);
    this.roadLanterns.push(pLight);

    this.obstacles.push({ x, z, radius: 0.35 });
  }

  /**
   * Spawns The Eastern Hillside Windmill with deep foundation anchored into hillside (x: 235, z: -25)
   */
  private spawnHillsideWindmill(terrain: Terrain): void {
    const wx = 235;
    const wz = -25;
    const wy = terrain.getMeshHeightAt(wx, wz);

    const windmillGroup = new THREE.Group();
    windmillGroup.position.set(wx, wy, wz);

    const baseGeo = new THREE.CylinderGeometry(4.2, 5.2, 4.6, 10);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6e7078, roughness: 0.9, flatShading: true });
    const base = new THREE.Mesh(baseGeo, stoneMat);
    base.position.y = 0.9;
    base.castShadow = true;
    base.receiveShadow = true;
    windmillGroup.add(base);

    const towerGeo = new THREE.CylinderGeometry(3.0, 4.0, 7.5, 8);
    const timberMat = new THREE.MeshStandardMaterial({ color: 0x5a3e28, roughness: 0.85 });
    const tower = new THREE.Mesh(towerGeo, timberMat);
    tower.position.y = 3.2 + 3.75;
    tower.castShadow = true;
    windmillGroup.add(tower);

    const roofGeo = new THREE.ConeGeometry(3.4, 3.8, 8);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x3d4b58, roughness: 0.8 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 3.2 + 7.5 + 1.9;
    roof.castShadow = true;
    windmillGroup.add(roof);

    const sailHub = new THREE.Group();
    sailHub.position.set(0, 3.2 + 7.2, 3.1);

    const hubCenterGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8);
    hubCenterGeo.rotateX(Math.PI / 2);
    const hubCenter = new THREE.Mesh(hubCenterGeo, timberMat);
    sailHub.add(hubCenter);

    const sailClothMat = new THREE.MeshStandardMaterial({
      color: 0xede0d4,
      roughness: 0.9,
      side: THREE.DoubleSide,
    });
    const sparMat = new THREE.MeshStandardMaterial({ color: 0x2e1d11, roughness: 0.9 });

    for (let b = 0; b < 4; b++) {
      const bladeAngle = (b * Math.PI) / 2;
      const bladeGroup = new THREE.Group();
      bladeGroup.rotation.z = bladeAngle;

      const sparGeo = new THREE.BoxGeometry(0.18, 5.8, 0.14);
      const spar = new THREE.Mesh(sparGeo, sparMat);
      spar.position.y = 2.9;
      bladeGroup.add(spar);

      const sailGeo = new THREE.PlaneGeometry(1.2, 4.8);
      const sail = new THREE.Mesh(sailGeo, sailClothMat);
      sail.position.set(0.65, 3.2, 0.05);
      sail.castShadow = true;
      bladeGroup.add(sail);

      sailHub.add(bladeGroup);
    }

    windmillGroup.add(sailHub);
    this.windmillSails = sailHub;
    this.group.add(windmillGroup);

    this.obstacles.push({ x: wx, z: wz, radius: 4.8 });
  }

  /**
   * Spawns a high stone watchtower on the northern ridge with deep foundation (x: 85, z: -185)
   */
  private spawnMountainWatchtower(terrain: Terrain): void {
    const tx = 85;
    const tz = -185;
    const ty = terrain.getMeshHeightAt(tx, tz);

    const towerGroup = new THREE.Group();
    towerGroup.position.set(tx, ty, tz);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5a5e66, roughness: 0.92, flatShading: true });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d2716, roughness: 0.85 });

    const shaftGeo = new THREE.CylinderGeometry(2.4, 3.4, 13.6, 8);
    const shaft = new THREE.Mesh(shaftGeo, stoneMat);
    shaft.position.y = 5.2;
    shaft.castShadow = true;
    shaft.receiveShadow = true;
    towerGroup.add(shaft);

    const balconyGeo = new THREE.CylinderGeometry(3.2, 2.6, 1.4, 8);
    const balcony = new THREE.Mesh(balconyGeo, stoneMat);
    balcony.position.y = 12.7;
    balcony.castShadow = true;
    towerGroup.add(balcony);

    const roofGeo = new THREE.ConeGeometry(3.6, 2.8, 8);
    const roof = new THREE.Mesh(roofGeo, woodMat);
    roof.position.y = 15.6;
    roof.castShadow = true;
    towerGroup.add(roof);

    const fireGeo = new THREE.SphereGeometry(0.35, 8, 8);
    const fireMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 1.8,
    });
    const beaconFire = new THREE.Mesh(fireGeo, fireMat);
    beaconFire.position.y = 13.8;
    towerGroup.add(beaconFire);

    const bLight = new PooledPointLightProxy(0x00f5d4, 2.2, 25.0);
    bLight.position.y = 14.0;
    towerGroup.add(bLight);

    this.group.add(towerGroup);
    this.obstacles.push({ x: tx, z: tz, radius: 3.4 });
  }

  /**
   * Spawns a rustic coastal wooden fishing pier & boats (x: -110, z: 180)
   */
  private spawnCoastalFishingPier(): void {
    const px = -110;
    const pz = 180;
    const waterY = Terrain.WATER_LEVEL;

    const pierGroup = new THREE.Group();
    pierGroup.position.set(px, waterY + 0.15, pz);

    const timberMat = new THREE.MeshStandardMaterial({ color: 0x4a3424, roughness: 0.9 });
    const woodDeckMat = new THREE.MeshStandardMaterial({ color: 0x5e422c, roughness: 0.85 });

    const deckGeo = new THREE.BoxGeometry(4.2, 0.25, 18.0);
    const deck = new THREE.Mesh(deckGeo, woodDeckMat);
    deck.position.set(0, 0, 9.0);
    deck.castShadow = true;
    deck.receiveShadow = true;
    pierGroup.add(deck);

    const pilingGeo = new THREE.CylinderGeometry(0.18, 0.2, 4.5, 6);
    for (let i = 0; i < 4; i++) {
      const zOffset = 2.0 + i * 4.5;
      const leftPile = new THREE.Mesh(pilingGeo, timberMat);
      leftPile.position.set(-1.8, -2.0, zOffset);
      const rightPile = new THREE.Mesh(pilingGeo, timberMat);
      rightPile.position.set(1.8, -2.0, zOffset);
      pierGroup.add(leftPile, rightPile);
    }

    const boatGroup = new THREE.Group();
    boatGroup.position.set(3.4, -0.05, 12.0);
    boatGroup.rotation.y = 0.35;

    const boatHullGeo = new THREE.CylinderGeometry(0.8, 0.6, 3.8, 6);
    boatHullGeo.rotateZ(Math.PI / 2);
    boatHullGeo.scale(0.8, 1.4, 1.0);
    const boatHull = new THREE.Mesh(boatHullGeo, timberMat);
    boatHull.castShadow = true;
    boatGroup.add(boatHull);

    pierGroup.add(boatGroup);
    this.group.add(pierGroup);

    // Keep the docked boat climbable while leaving the pier deck unobstructed
    this.obstacles.push({
      x: px + 3.4,
      z: pz + 12.0,
      radius: 1.45,
      topY: waterY + 0.65,
    });
  }

  /**
   * Returns floor height for the coastal wooden fishing pier deck and shore approach
   */
  public getFloorHeightAt(worldX: number, worldZ: number): number | null {
    const px = -110;
    const pz = 180;
    if (Math.abs(worldX - px) <= 2.15 && worldZ >= pz - 0.5 && worldZ <= pz + 18.1) {
      return Terrain.WATER_LEVEL + 0.28;
    }
    return null;
  }

  /**
   * Spawns ancient standing monoliths in the western woods (each pillar grounded individually)
   */
  private spawnAncientStandingMonoliths(terrain: Terrain): void {
    const mx = -210;
    const mz = -50;
    const my = terrain.getMeshHeightAt(mx, mz);

    const shrineGroup = new THREE.Group();
    shrineGroup.position.set(mx, 0, mz);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x484b54, roughness: 0.9, flatShading: true });
    const runeMat = new THREE.MeshStandardMaterial({
      color: 0x00bbf9,
      emissive: 0x00bbf9,
      emissiveIntensity: 1.4,
      roughness: 0.2,
    });

    const monolithGeo = new THREE.BoxGeometry(0.9, 4.8, 0.6);

    for (let m = 0; m < 5; m++) {
      const angle = (m * Math.PI * 2) / 5;
      const r = 5.2;
      const px = Math.cos(angle) * r;
      const pz = Math.sin(angle) * r;
      const py = terrain.getMeshHeightAt(mx + px, mz + pz);

      const monolith = new THREE.Mesh(monolithGeo, stoneMat);
      monolith.position.set(px, py + 1.8, pz);
      monolith.rotation.y = -angle;
      monolith.rotation.z = (Math.random() - 0.5) * 0.1;
      monolith.castShadow = true;

      const rune = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), runeMat);
      rune.position.set(0, 0.7, 0.31);
      monolith.add(rune);
      shrineGroup.add(monolith);

      this.obstacles.push({ x: mx + px, z: mz + pz, radius: 0.8 });
    }

    const altar = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.7, 1.5, 8), stoneMat);
    altar.position.set(0, my + 0.15, 0);
    shrineGroup.add(altar);

    const shrineLight = new PooledPointLightProxy(0x00bbf9, 1.8, 15.0);
    shrineLight.position.set(0, my + 1.8, 0);
    shrineGroup.add(shrineLight);

    this.group.add(shrineGroup);
    this.obstacles.push({ x: mx, z: mz, radius: 1.7, topY: my + 0.9 });
  }

  /**
   * Spawns grounded mossy boulders across rocky outcrops (embedded 35% into terrain, off roads)
   */
  private spawnBoulders(terrain: Terrain): void {
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x5a5e5a,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    });

    const rockGeo = new THREE.DodecahedronGeometry(1.0, 1);
    const boulderCount = 220;
    const instancedBoulders = new THREE.InstancedMesh(rockGeo, rockMat, boulderCount);
    instancedBoulders.castShadow = true;
    instancedBoulders.receiveShadow = true;

    const dummy = new THREE.Object3D();
    let placed = 0;

    for (let i = 0; i < boulderCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 28 + Math.pow(Math.random(), 0.72) * 740;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      if (this.isBlockedForNature(x, z, 5.2, 1.0)) continue;

      const y = terrain.getMeshHeightAt(x, z);
      if (y < 2.0) continue;

      const scaleX = 1.1 + Math.random() * 2.4;
      const scaleY = 0.9 + Math.random() * 1.9;
      const scaleZ = 1.1 + Math.random() * 2.4;
      const rx = Math.random() * Math.PI;
      const ry = Math.random() * Math.PI;
      const rz = Math.random() * Math.PI;
      const py = y + scaleY * 0.14;

      // Embed base deeply into terrain so boulders never appear to float on slopes
      dummy.position.set(x, py, z);
      dummy.scale.set(scaleX, scaleY, scaleZ);
      dummy.rotation.set(rx, ry, rz);
      dummy.updateMatrix();

      instancedBoulders.setMatrixAt(placed, dummy.matrix);
      this.harvestableBoulders.push({
        im: instancedBoulders,
        idx: placed,
        x,
        y: py,
        z,
        scaleX,
        scaleY,
        scaleZ,
        rx,
        ry,
        rz,
        kind: placed % 4 === 0 ? 'iron' : 'stone',
        hp: 50,
        maxHp: 50,
        alive: true,
        regrowTimer: 0,
      });
      placed++;

      this.obstacles.push({
        x,
        z,
        radius: Math.max(scaleX, scaleZ) * 0.78,
        topY: y + scaleY * 0.92,
      });
    }

    instancedBoulders.count = placed;
    instancedBoulders.instanceMatrix.needsUpdate = true;
    instancedBoulders.computeBoundingSphere();
    this.group.add(instancedBoulders);
  }

  /**
   * Spawns clusters of glowing forest mushrooms, grounding EVERY mushroom individually to local terrain
   */
  private spawnGlowingMushrooms(terrain: Terrain): void {
    const mushGeo = new THREE.BoxGeometry(0.28, 0.16, 0.28);
    const stemGeo = new THREE.BoxGeometry(0.1, 0.34, 0.1);

    const mushMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00bbf9,
      emissiveIntensity: 0.85,
      roughness: 0.3,
    });
    const stemMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.9 });

    const clusterCount = this.isMobile ? 35 : 55;
    const maxMushrooms = clusterCount * 5;
    const stemIM = new THREE.InstancedMesh(stemGeo, stemMat, maxMushrooms);
    const capIM = new THREE.InstancedMesh(mushGeo, mushMat, maxMushrooms);
    const dummy = new THREE.Object3D();
    let idx = 0;

    for (let c = 0; c < clusterCount; c++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 26 + Math.random() * 520;
      const cx = Math.cos(angle) * dist;
      const cz = Math.sin(angle) * dist;

      if (this.isBlockedForNature(cx, cz, 4.2)) continue;
      const cy = terrain.getMeshHeightAt(cx, cz);
      if (cy < 2.5 || cy > 28.0) continue;

      for (let m = 0; m < 5; m++) {
        const ox = (Math.random() - 0.5) * 1.3;
        const oz = (Math.random() - 0.5) * 1.3;
        const mx = cx + ox;
        const mz = cz + oz;
        const my = terrain.getMeshHeightAt(mx, mz);
        const scale = 0.65 + Math.random() * 0.85;
        const rotY = Math.random() * Math.PI;

        dummy.position.set(mx, my - 0.06 + 0.17 * scale, mz);
        dummy.scale.setScalar(scale);
        dummy.rotation.set(0, rotY, 0);
        dummy.updateMatrix();
        stemIM.setMatrixAt(idx, dummy.matrix);

        dummy.position.set(mx, my - 0.06 + 0.38 * scale, mz);
        dummy.updateMatrix();
        capIM.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }

    if (idx > 0) {
      stemIM.count = idx;
      capIM.count = idx;
      stemIM.instanceMatrix.needsUpdate = true;
      capIM.instanceMatrix.needsUpdate = true;
      stemIM.computeBoundingSphere();
      capIM.computeBoundingSphere();
      this.group.add(stemIM, capIM);
    }
  }

  /**
   * Spawns The Colossal Elder Tree (landmark for Crystal #6) in blocky voxel style
   */
  private spawnColossalElderTree(terrain: Terrain): void {
    const elderPos = new THREE.Vector3(-45, 0, -65);
    const y = terrain.getMeshHeightAt(elderPos.x, elderPos.z);
    elderPos.y = y;

    const elderGroup = new THREE.Group();
    elderGroup.position.copy(elderPos);

    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x3d2716,
      roughness: 0.95,
      metalness: 0.05,
    });

    const trunkGeo = new THREE.BoxGeometry(3.4, 9.0, 3.4);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 3.5;
    trunk.castShadow = !this.isMobile;
    trunk.receiveShadow = true;
    elderGroup.add(trunk);

    const rootGeo = new THREE.BoxGeometry(5.6, 2.2, 5.6);
    const roots = new THREE.Mesh(rootGeo, trunkMat);
    roots.position.y = 0.2;
    elderGroup.add(roots);

    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x1d4e30,
      roughness: 0.75,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.08,
    });

    const tierSizes: [number, number][] = [
      [11.0, 3.2],
      [9.0, 2.8],
      [6.8, 2.4],
      [4.2, 2.0],
    ];
    for (let c = 0; c < 4; c++) {
      const crownGeo = new THREE.BoxGeometry(tierSizes[c][0], tierSizes[c][1], tierSizes[c][0]);
      const crown = new THREE.Mesh(crownGeo, foliageMat);
      crown.position.set(
        Math.sin(c * 1.5) * 0.45,
        8.4 + c * 2.2,
        Math.cos(c * 1.5) * 0.45
      );
      crown.castShadow = !this.isMobile;
      crown.receiveShadow = true;
      elderGroup.add(crown);
    }

    this.group.add(elderGroup);

    this.obstacles.push({
      x: elderPos.x,
      z: elderPos.z,
      radius: 3.2,
    });
  }

  /**
   * Harvests the nearest living forest tree within axe/sword reach (4.6m).
   */
  public damageNearestTree(
    playerPos: THREE.Vector3,
    damage: number
  ): { destroyed: boolean; pos: THREE.Vector3 } | null {
    let best: HarvestableTree | null = null;
    let bestDist = 4.6;

    for (const tree of this.harvestableTrees) {
      if (!tree.alive) continue;
      const d = Math.hypot(tree.p.x - playerPos.x, tree.p.z - playerPos.z);
      if (d < bestDist) {
        bestDist = d;
        best = tree;
      }
    }
    if (!best) return null;

    best.hp -= damage;
    if (best.hp <= 0) {
      best.alive = false;
      best.regrowTimer = 45;
      this.setTreeVisible(best, false);
      return { destroyed: true, pos: new THREE.Vector3(best.p.x, best.p.y, best.p.z) };
    }
    return { destroyed: false, pos: new THREE.Vector3(best.p.x, best.p.y, best.p.z) };
  }

  private setTreeVisible(tree: HarvestableTree, visible: boolean): void {
    const dummy = new THREE.Object3D();
    const childDummy = new THREE.Object3D();
    dummy.add(childDummy);

    if (!visible) {
      dummy.position.set(tree.p.x, tree.p.y, tree.p.z);
      dummy.scale.set(0, 0, 0);
      dummy.updateMatrix();
      tree.trunkIM.setMatrixAt(tree.idx, dummy.matrix);
      tree.trunkIM.instanceMatrix.needsUpdate = true;
      for (const tm of tree.tierMeshes) {
        tm.setMatrixAt(tree.idx, dummy.matrix);
        tm.instanceMatrix.needsUpdate = true;
      }
      return;
    }

    dummy.position.set(tree.p.x, tree.p.y, tree.p.z);
    dummy.rotation.set(0, tree.p.rotY, 0);
    dummy.scale.set(tree.p.scale, tree.p.scale * tree.p.scaleYMult, tree.p.scale);
    dummy.updateMatrixWorld(true);

    childDummy.position.set(0, (tree.visibleTrunkH - tree.sinkDepth) * 0.5, 0);
    childDummy.rotation.set(0, 0, 0);
    childDummy.scale.set(1, 1, 1);
    childDummy.updateMatrix();
    childDummy.updateWorldMatrix(false, false);
    tree.trunkIM.setMatrixAt(tree.idx, childDummy.matrixWorld);
    tree.trunkIM.instanceMatrix.needsUpdate = true;

    for (let t = 0; t < tree.tierMeshes.length; t++) {
      childDummy.position.set(0, tree.tierYOffsets[t], 0);
      childDummy.rotation.set(0, 0, 0);
      childDummy.scale.set(1, 1, 1);
      childDummy.updateMatrix();
      childDummy.updateWorldMatrix(false, false);
      tree.tierMeshes[t].setMatrixAt(tree.idx, childDummy.matrixWorld);
      tree.tierMeshes[t].instanceMatrix.needsUpdate = true;
    }
  }

  /**
   * Applies a tree harvest event from a remote co-op player by matching closest tree within 1.8m.
   */
  public applyRemoteTreeHarvest(x: number, z: number, destroyed: boolean = true): void {
    let best: HarvestableTree | null = null;
    let bestDist = 1.8;
    for (const tree of this.harvestableTrees) {
      const d = Math.hypot(tree.p.x - x, tree.p.z - z);
      if (d < bestDist) {
        bestDist = d;
        best = tree;
      }
    }
    if (!best) return;
    if (destroyed) {
      best.alive = false;
      best.hp = 0;
      best.regrowTimer = 45;
      this.setTreeVisible(best, false);
    }
  }

  /**
   * Mines the nearest living boulder within pickaxe reach (5.2m).
   */
  public damageNearestBoulder(
    playerPos: THREE.Vector3,
    damage: number
  ): { destroyed: boolean; kind: 'stone' | 'iron'; pos: THREE.Vector3 } | null {
    let best: HarvestableBoulder | null = null;
    let bestDist = 5.2;

    for (const boulder of this.harvestableBoulders) {
      if (!boulder.alive) continue;
      const d = Math.hypot(boulder.x - playerPos.x, boulder.z - playerPos.z);
      if (d < bestDist) {
        bestDist = d;
        best = boulder;
      }
    }
    if (!best) return null;

    best.hp -= damage;
    if (best.hp <= 0) {
      best.alive = false;
      best.regrowTimer = 45;
      this.setBoulderVisible(best, false);
      return { destroyed: true, kind: best.kind, pos: new THREE.Vector3(best.x, best.y, best.z) };
    }
    return { destroyed: false, kind: best.kind, pos: new THREE.Vector3(best.x, best.y, best.z) };
  }

  /**
   * Applies a boulder mining event from a remote co-op player by matching closest boulder within 1.8m.
   */
  public applyRemoteBoulderHarvest(x: number, z: number, destroyed: boolean = true): void {
    let best: HarvestableBoulder | null = null;
    let bestDist = 1.8;
    for (const boulder of this.harvestableBoulders) {
      const d = Math.hypot(boulder.x - x, boulder.z - z);
      if (d < bestDist) {
        bestDist = d;
        best = boulder;
      }
    }
    if (!best) return;
    if (destroyed) {
      best.alive = false;
      best.hp = 0;
      best.regrowTimer = 45;
      this.setBoulderVisible(best, false);
    }
  }

  private setBoulderVisible(boulder: HarvestableBoulder, visible: boolean): void {
    const dummy = new THREE.Object3D();
    if (!visible) {
      dummy.position.set(boulder.x, boulder.y, boulder.z);
      dummy.scale.set(0, 0, 0);
    } else {
      dummy.position.set(boulder.x, boulder.y, boulder.z);
      dummy.rotation.set(boulder.rx, boulder.ry, boulder.rz);
      dummy.scale.set(boulder.scaleX, boulder.scaleY, boulder.scaleZ);
    }
    dummy.updateMatrix();
    boulder.im.setMatrixAt(boulder.idx, dummy.matrix);
    boulder.im.instanceMatrix.needsUpdate = true;
  }

  /**
   * Frame update: smooth windmill sail rotation, tree & boulder regrowth
   */
  public update(time: number, dt: number = 0.016): void {
    if (this.windmillSails) {
      this.windmillSails.rotation.z = time * 0.45;
    }

    for (let i = 0; i < this.harvestableTrees.length; i++) {
      const tree = this.harvestableTrees[i];
      if (!tree.alive) {
        tree.regrowTimer -= dt;
        if (tree.regrowTimer <= 0) {
          tree.alive = true;
          tree.hp = tree.maxHp;
          this.setTreeVisible(tree, true);
        }
      }
    }

    for (let i = 0; i < this.harvestableBoulders.length; i++) {
      const boulder = this.harvestableBoulders[i];
      if (!boulder.alive) {
        boulder.regrowTimer -= dt;
        if (boulder.regrowTimer <= 0) {
          boulder.alive = true;
          boulder.hp = boulder.maxHp;
          this.setBoulderVisible(boulder, true);
        }
      }
    }
  }
}
