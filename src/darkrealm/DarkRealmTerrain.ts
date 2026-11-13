/**
 * ECHO – DARK FANTASY REALM
 * Vast ~2000x2000 Dark Fantasy Terrain with Forests, River Valley,
 * Walkable Caves, Floating Sky Islands with Waterfalls & Sky Bridges,
 * Haunted Village Plateaus, and the Giant Dark Castle Citadel.
 */

import * as THREE from 'three';
import { DarkTextureSet } from './DarkRealmTextures.ts';
import { Terrain } from '../world/Terrain.ts';
import { PooledPointLightProxy } from '../world/WorldLightPool.ts';

export interface DarkLandmarkZone {
  id: string;
  nameEn: string;
  nameAr: string;
  kind: 'spawn' | 'village' | 'cave' | 'floating' | 'castle' | 'portal';
  pos: THREE.Vector3;
  radius: number;
  fastTravelPos: THREE.Vector3;
}

export interface SkyBridgeSegment {
  x1: number;
  z1: number;
  y1: number;
  x2: number;
  z2: number;
  y2: number;
  halfWidth: number;
}

export interface CaveSpec {
  id: string;
  nameEn: string;
  nameAr: string;
  mouthX: number;
  mouthZ: number;
  endX: number;
  endZ: number;
  floorY: number;
  width: number;
}

export interface FloatingIslandSpec {
  id: string;
  nameEn: string;
  nameAr: string;
  x: number;
  y: number;
  z: number;
  radius: number;
  hasWaterfall: boolean;
  hasCastleRuins: boolean;
}

export class DarkRealmTerrain {
  public group: THREE.Group;
  public mesh: THREE.Mesh;
  public riverMesh: THREE.Mesh;
  public floorHeightProvider: ((x: number, z: number) => number | null) | null = null;
  public playerCurrentY: number = 14;

  public readonly size = 2000;
  public readonly segments: number = 210;
  private heightData: Float32Array;
  private textures: DarkTextureSet;
  private waterfalls: Array<{ mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial }> = [];

  public static readonly SPAWN_POS = new THREE.Vector3(0, 14, 92);
  public static readonly RETURN_PORTAL_POS = new THREE.Vector3(0, 14, 108);
  public static readonly CASTLE_POS = new THREE.Vector3(0, 14, -340);

  public readonly caves: CaveSpec[] = [
    {
      id: 'cave_torch',
      nameEn: 'Obsidian Torch Cavern',
      nameAr: 'كهف المشاعل الغربي',
      mouthX: -44,
      mouthZ: 34,
      endX: -98,
      endZ: 18,
      floorY: 6.2,
      width: 9.5,
    },
    {
      id: 'cave_amethyst',
      nameEn: 'Amethyst Hollow',
      nameAr: 'كهف الجمشت العميق',
      mouthX: -145,
      mouthZ: -120,
      endX: -205,
      endZ: -145,
      floorY: 5.5,
      width: 10.0,
    },
    {
      id: 'cave_mine',
      nameEn: 'Abandoned Iron Mine',
      nameAr: 'منجم الحديد المهجور',
      mouthX: 148,
      mouthZ: -95,
      endX: 205,
      endZ: -118,
      floorY: 5.8,
      width: 10.0,
    },
  ];

  public readonly floatingIslands: FloatingIslandSpec[] = [
    {
      id: 'float_west_falls',
      nameEn: 'Moonfall Sky Isle',
      nameAr: 'جزيرة الشلال السماوية',
      x: -58,
      y: 25,
      z: -78,
      radius: 22,
      hasWaterfall: true,
      hasCastleRuins: true,
    },
    {
      id: 'float_center_spire',
      nameEn: 'Astral Cascade Isle',
      nameAr: 'جزيرة الشلال المعلق',
      x: -16,
      y: 22,
      z: -130,
      radius: 19,
      hasWaterfall: true,
      hasCastleRuins: false,
    },
    {
      id: 'float_east_citadel',
      nameEn: 'Violet Spire Isle',
      nameAr: 'جزيرة البرج البنفسجي',
      x: 78,
      y: 28,
      z: -102,
      radius: 24,
      hasWaterfall: true,
      hasCastleRuins: true,
    },
    {
      id: 'float_high_north',
      nameEn: 'Lunar Crown Isle',
      nameAr: 'جزيرة التاج القمري',
      x: -92,
      y: 38,
      z: -210,
      radius: 25,
      hasWaterfall: false,
      hasCastleRuins: true,
    },
    {
      id: 'float_east_sanctum',
      nameEn: 'Twilight Sanctum Isle',
      nameAr: 'جزيرة ملاذ الغسق',
      x: 160,
      y: 34,
      z: -225,
      radius: 23,
      hasWaterfall: true,
      hasCastleRuins: true,
    },
    {
      id: 'float_south_watch',
      nameEn: 'Starwatch Floating Rock',
      nameAr: 'صخرة مرصد النجوم',
      x: 84,
      y: 23,
      z: 62,
      radius: 17,
      hasWaterfall: false,
      hasCastleRuins: false,
    },
  ];

  public readonly skyBridges: SkyBridgeSegment[] = [
    // Climbable stone bridge from western ridge up to Moonfall Sky Isle
    { x1: -66, z1: -28, y1: 10.5, x2: -58, z2: -59, y2: 25, halfWidth: 3.0 },
    // Sky bridge from Moonfall Sky Isle to Astral Cascade Isle
    { x1: -44, z1: -92, y1: 25, x2: -24, z2: -115, y2: 22, halfWidth: 2.6 },
    // Climbable stone causeway from right village ridge up to Violet Spire Isle
    { x1: 72, z1: -44, y1: 11.2, x2: 78, z2: -81, y2: 28, halfWidth: 3.0 },
    // Southern cliff ramp up to Starwatch Floating Rock
    { x1: 68, z1: 86, y1: 12.2, x2: 82, z2: 75, y2: 23, halfWidth: 2.8 },
    // North castle causeway bridge crossing the moat
    { x1: 0, z1: -235, y1: 6.5, x2: 0, z2: -295, y2: 14.0, halfWidth: 5.5 },
  ];

  public readonly roadPaths: Array<[number, number][]> = [
    // Spawn overlook -> Lantern Hollow Village
    [[0, 92], [18, 65], [34, 44], [48, 28]],
    // Lantern Hollow -> Elderwood Village
    [[48, 28], [92, 52], [145, 78]],
    // Spawn overlook -> Whispering Mill Ruins
    [[0, 92], [-44, 98], [-98, 104], [-155, 110]],
    // Lantern Hollow -> Moonbrook Village -> Frostmire Hamlet
    [[48, 28], [26, -32], [10, -96], [-32, -135], [-75, -165], [-120, -200], [-165, -235]],
    // Lantern Hollow -> Ashen Outpost -> Shadowgate Village
    [[48, 28], [102, -32], [140, -98], [175, -165], [148, -208], [115, -245]],
    // Moonbrook & Shadowgate -> North Castle Causeway
    [[-75, -165], [-38, -202], [0, -235]],
    [[115, -245], [58, -242], [0, -235]],
  ];

  public readonly landmarks: DarkLandmarkZone[] = [];

  constructor(textures: DarkTextureSet, isMobile: boolean = false) {
    this.textures = textures;
    this.group = new THREE.Group();
    this.segments = isMobile ? 120 : 185;
    this.heightData = new Float32Array((this.segments + 1) * (this.segments + 1));

    const terrainGeo = new THREE.PlaneGeometry(this.size, this.size, this.segments, this.segments);
    terrainGeo.rotateX(-Math.PI / 2);

    const posAttr = terrainGeo.attributes.position;
    const colors = new Float32Array(posAttr.count * 3);

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const y = this.computeRawGroundHeight(x, z);
      posAttr.setY(i, y);
      this.heightData[i] = y;

      // Biome vertex tinting: readable dark fantasy meadow, stony cliffs, obsidian castle grounds
      const riverDist = Math.abs(x - this.getRiverCenterX(z));
      let r = 0.78;
      let g = 0.88;
      let b = 0.80;

      if (z < -215 && Math.abs(x) < 110) {
        // Obsidian castle plateau
        r = 0.52;
        g = 0.48;
        b = 0.66;
      } else if (riverDist < 10.5 && z > -245 && z < 260) {
        // River pebble bank
        r = 0.58;
        g = 0.62;
        b = 0.72;
      } else if (y > 16) {
        // Highland rock
        r = 0.66;
        g = 0.64;
        b = 0.78;
      } else if (Math.abs(x) > 130) {
        // Deep haunted forest moss
        r = 0.58;
        g = 0.78;
        b = 0.64;
      }

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      map: textures.grassTop,
      vertexColors: true,
      roughness: 0.9,
      metalness: 0.05,
    });
    this.mesh = new THREE.Mesh(terrainGeo, terrainMat);
    this.mesh.receiveShadow = true;
    this.group.add(this.mesh);

    // Winding twilight river running from Castle moat south through the valley
    const riverGeo = new THREE.PlaneGeometry(420, 620, isMobile ? 12 : 24, isMobile ? 24 : 40);
    riverGeo.rotateX(-Math.PI / 2);
    const riverMat = new THREE.MeshStandardMaterial({
      map: textures.water,
      color: 0x3b6c94,
      emissive: 0x102848,
      emissiveIntensity: 0.35,
      roughness: 0.14,
      metalness: 0.55,
      transparent: true,
      opacity: 0.86,
    });
    this.riverMesh = new THREE.Mesh(riverGeo, riverMat);
    this.riverMesh.position.set(0, 3.3, -45);
    this.group.add(this.riverMesh);

    this.buildFloatingIslands();
    this.buildSkyBridges();
    this.buildCaveArches();
    this.buildLandmarksList();
  }

  public getRiverCenterX(z: number): number {
    return Math.sin(z * 0.018) * 16 - 4;
  }

  public getWaterLevelAt(x: number, z: number): number | null {
    if (x < -205 || x > 205 || z < -345 || z > 255) return null;
    const rx = this.getRiverCenterX(z);
    if (Math.abs(x - rx) < 13.0 || this.getMeshHeightAt(x, z) < 3.15) {
      return 3.3;
    }
    return null;
  }

  public isNearRoad(x: number, z: number, clearance: number): boolean {
    const clearSq = clearance * clearance;
    for (const path of this.roadPaths) {
      for (let i = 0; i < path.length - 1; i++) {
        const [ax, az] = path[i];
        const [bx, bz] = path[i + 1];
        const abx = bx - ax;
        const abz = bz - az;
        const lenSq = abx * abx + abz * abz;
        if (lenSq <= 0.0001) continue;
        const t = THREE.MathUtils.clamp(((x - ax) * abx + (z - az) * abz) / lenSq, 0, 1);
        const dx = x - (ax + abx * t);
        const dz = z - (az + abz * t);
        if (dx * dx + dz * dz < clearSq) return true;
      }
    }
    return false;
  }

  public computeRawGroundHeight(x: number, z: number): number {
    // 1. Base rolling dark hills noise
    const n1 = Math.sin(x * 0.018) * Math.cos(z * 0.018) * 5.2;
    const n2 = Math.sin(x * 0.047 + 1.3) * Math.sin(z * 0.043 - 0.7) * 2.1;
    const n3 = Math.cos((x + z) * 0.011) * 3.0;
    let h = 6.2 + n1 + n2 + n3;

    // 2. Spawn Overlook Ridge at (0, 92) looking North down over valley toward Castle
    const dSpawn = Math.hypot(x - 0, z - 96);
    if (dSpawn < 36) {
      const t = 1 - THREE.MathUtils.smoothstep(dSpawn, 10, 36);
      h = THREE.MathUtils.lerp(h, 13.8, t);
    }

    // 3. Haunted Lantern Village plateau on the right overlook (48, 28)
    const dVill1 = Math.hypot(x - 48, z - 28);
    if (dVill1 < 34) {
      const t = 1 - THREE.MathUtils.smoothstep(dVill1, 16, 34);
      h = THREE.MathUtils.lerp(h, 9.6, t);
    }

    // 4. Other 6 Villages leveled plateaus (7 total villages across the realm)
    const otherVillages: Array<[number, number, number]> = [
      [-155, 110, 8.8],
      [175, -165, 9.2],
      [-165, -235, 10.4],
      [145, 78, 9.0],
      [-75, -165, 9.2],
      [115, -245, 10.0],
    ];
    for (const [vx, vz, vh] of otherVillages) {
      const d = Math.hypot(x - vx, z - vz);
      if (d < 36) {
        const t = 1 - THREE.MathUtils.smoothstep(d, 18, 36);
        h = THREE.MathUtils.lerp(h, vh, t);
      }
    }

    // 5. Giant Dark Castle Citadel Plateau at (0, -340)
    const dCastle = Math.hypot(x - 0, z - -340);
    if (dCastle < 88) {
      const t = 1 - THREE.MathUtils.smoothstep(dCastle, 54, 88);
      h = THREE.MathUtils.lerp(h, 14.0, t);
    }

    // 6. Winding River Valley Channel (carves down to y = 1.6 so river water at y = 3.3 flows cleanly)
    if (z > -255 && z < 245) {
      const rx = this.getRiverCenterX(z);
      const riverDist = Math.abs(x - rx);
      // Keep spawn overlook intact behind z > 66 (river passes slightly west or descends at cliff)
      const southFade = z > 58 ? THREE.MathUtils.smoothstep(z, 58, 80) : 0;
      if (riverDist < 18 && southFade < 0.99) {
        const carve = (1 - THREE.MathUtils.smoothstep(riverDist, 4.5, 18)) * (1 - southFade);
        h = THREE.MathUtils.lerp(h, 1.5, carve);
      }
    }

    // 7. Walkable Cave Corridors (depress walkable floor while cave rock roof arches sit above)
    for (const cave of this.caves) {
      const segDx = cave.endX - cave.mouthX;
      const segDz = cave.endZ - cave.mouthZ;
      const lenSq = segDx * segDx + segDz * segDz;
      const proj = THREE.MathUtils.clamp(
        ((x - cave.mouthX) * segDx + (z - cave.mouthZ) * segDz) / lenSq,
        0,
        1
      );
      const cx = cave.mouthX + segDx * proj;
      const cz = cave.mouthZ + segDz * proj;
      const distToAxis = Math.hypot(x - cx, z - cz);

      if (distToAxis < cave.width * 1.45) {
        const t = 1 - THREE.MathUtils.smoothstep(distToAxis, cave.width * 0.55, cave.width * 1.45);
        h = THREE.MathUtils.lerp(h, cave.floorY, t);
      } else if (distToAxis < cave.width * 2.7) {
        // Mound hill alongside the cave walls so the cavern looks carved into a cliffside
        const ridge = Math.sin(
          ((distToAxis - cave.width * 1.45) / (cave.width * 1.25)) * Math.PI
        );
        h += ridge * 7.8 * proj;
      }
    }

    // 8. Outer mountain rim containment at world radius > 860
    const worldR = Math.hypot(x, z);
    if (worldR > 840) {
      h += (worldR - 840) * 0.35;
    }

    return h;
  }

  /**
   * Checks floating island top surfaces & sky bridges at (x, z)
   */
  public getStructureHeightAt(x: number, z: number, playerY: number): number | null {
    let bestY: number | null = null;

    // 1. Floating islands walkable plateaus (only snap if player is near/above island deck!)
    for (const isl of this.floatingIslands) {
      const d = Math.hypot(x - isl.x, z - isl.z);
      if (d <= isl.radius * 0.96 && playerY >= isl.y - 2.6) {
        if (bestY === null || isl.y > bestY) {
          bestY = isl.y;
        }
      }
    }

    // 2. Sky Bridges & Stair Ramps
    for (const b of this.skyBridges) {
      const dx = b.x2 - b.x1;
      const dz = b.z2 - b.z1;
      const lenSq = dx * dx + dz * dz;
      if (lenSq < 0.001) continue;
      const t = ((x - b.x1) * dx + (z - b.z1) * dz) / lenSq;
      if (t < -0.05 || t > 1.05) continue;
      const clampedT = THREE.MathUtils.clamp(t, 0, 1);
      const px = b.x1 + dx * clampedT;
      const pz = b.z1 + dz * clampedT;
      const dist = Math.hypot(x - px, z - pz);
      if (dist <= b.halfWidth) {
        const deckY = THREE.MathUtils.lerp(b.y1, b.y2, clampedT);
        if (playerY >= deckY - 3.5 && (bestY === null || deckY > bestY)) {
          bestY = deckY;
        }
      }
    }

    return bestY;
  }

  public getMeshHeightAt(x: number, z: number): number {
    const halfSize = this.size / 2;
    const normX = (x + halfSize) / this.size;
    const normZ = (z + halfSize) / this.size;

    const fx = Math.max(0, Math.min(this.segments - 0.001, normX * this.segments));
    const fz = Math.max(0, Math.min(this.segments - 0.001, normZ * this.segments));

    const x0 = Math.floor(fx);
    const z0 = Math.floor(fz);
    const x1 = Math.min(this.segments, x0 + 1);
    const z1 = Math.min(this.segments, z0 + 1);

    const tx = fx - x0;
    const tz = fz - z0;
    const stride = this.segments + 1;

    const h00 = this.heightData[z0 * stride + x0];
    const h10 = this.heightData[z0 * stride + x1];
    const h01 = this.heightData[z1 * stride + x0];
    const h11 = this.heightData[z1 * stride + x1];

    const h0 = h00 * (1 - tx) + h10 * tx;
    const h1 = h01 * (1 - tx) + h11 * tx;
    return h0 * (1 - tz) + h1 * tz;
  }

  public getHeightAt(x: number, z: number): number {
    const ground = this.getMeshHeightAt(x, z);
    const structY = this.getStructureHeightAt(x, z, this.playerCurrentY);
    const providerY = this.floorHeightProvider ? this.floorHeightProvider(x, z) : null;
    let res = ground;
    if (structY !== null && structY > res) res = structY;
    if (providerY !== null && providerY > res) res = providerY;
    return res;
  }

  public getNormalAt(x: number, z: number): THREE.Vector3 {
    const e = 0.8;
    const hL = this.getMeshHeightAt(x - e, z);
    const hR = this.getMeshHeightAt(x + e, z);
    const hD = this.getMeshHeightAt(x, z - e);
    const hU = this.getMeshHeightAt(x, z + e);
    return new THREE.Vector3(hL - hR, 2 * e, hD - hU).normalize();
  }

  private buildFloatingIslands(): void {
    const rockMat = new THREE.MeshStandardMaterial({
      map: this.textures.cobblestone,
      color: 0x565a7a,
      roughness: 0.88,
    });
    const topMat = new THREE.MeshStandardMaterial({
      map: this.textures.grassTop,
      color: 0x456b5d,
      roughness: 0.88,
    });
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });
    const ruinMat = new THREE.MeshStandardMaterial({
      map: this.textures.castleBrick,
      color: 0x454266,
      roughness: 0.82,
    });

    for (const isl of this.floatingIslands) {
      const g = new THREE.Group();
      g.position.set(isl.x, isl.y, isl.z);

      // Walkable flat grass disk top
      const deckGeo = new THREE.CylinderGeometry(isl.radius, isl.radius * 0.92, 2.2, 10);
      const deck = new THREE.Mesh(deckGeo, topMat);
      deck.position.y = -1.1;
      deck.receiveShadow = true;
      g.add(deck);

      // Tapered rocky underside
      const underGeo = new THREE.ConeGeometry(isl.radius * 0.92, isl.radius * 1.15, 9);
      underGeo.rotateX(Math.PI);
      const under = new THREE.Mesh(underGeo, rockMat);
      under.position.y = -2.2 - (isl.radius * 1.15) / 2;
      g.add(under);

      // Hanging amethyst crystal cluster under island
      for (let c = 0; c < 4; c++) {
        const angle = (c / 4) * Math.PI * 2;
        const cGeo = new THREE.OctahedronGeometry(1.6 + (c % 2) * 0.7, 0);
        cGeo.scale(0.65, 2.4, 0.65);
        const cMesh = new THREE.Mesh(cGeo, crystalMat);
        cMesh.position.set(
          Math.cos(angle) * isl.radius * 0.4,
          -isl.radius * 0.75,
          Math.sin(angle) * isl.radius * 0.4
        );
        cMesh.rotation.z = Math.cos(angle) * 0.25;
        g.add(cMesh);
      }

      if (isl.hasCastleRuins) {
        // Gothic ruin spires & arches on floating island
        const towerGeo = new THREE.BoxGeometry(5.5, 11, 5.5);
        const tower = new THREE.Mesh(towerGeo, ruinMat);
        tower.position.set(-isl.radius * 0.25, 5.5, -isl.radius * 0.2);
        g.add(tower);

        const roofGeo = new THREE.ConeGeometry(4.5, 6.5, 4);
        roofGeo.rotateY(Math.PI / 4);
        const roof = new THREE.Mesh(roofGeo, ruinMat);
        roof.position.set(-isl.radius * 0.25, 14.2, -isl.radius * 0.2);
        g.add(roof);

        const spireBeacon = new THREE.Mesh(
          new THREE.OctahedronGeometry(1.2, 0),
          crystalMat
        );
        spireBeacon.position.set(isl.radius * 0.3, 3.2, isl.radius * 0.2);
        g.add(spireBeacon);
      }

      if (isl.hasWaterfall) {
        const dropH = isl.y - 2.8;
        const wfGeo = new THREE.PlaneGeometry(4.2, dropH, 4, 10);
        const wfMat = new THREE.MeshBasicMaterial({
          map: this.textures.water,
          color: 0x7dd3fc,
          transparent: true,
          opacity: 0.76,
          side: THREE.DoubleSide,
        });
        const wf = new THREE.Mesh(wfGeo, wfMat);
        wf.position.set(0, -dropH / 2 - 0.5, isl.radius * 0.82);
        g.add(wf);
        this.waterfalls.push({ mesh: wf, mat: wfMat });

        // Splash foam ring at bottom of waterfall
        const foamGeo = new THREE.RingGeometry(1.8, 5.4, 18);
        foamGeo.rotateX(-Math.PI / 2);
        const foamMat = new THREE.MeshBasicMaterial({
          color: 0xbae6fd,
          transparent: true,
          opacity: 0.55,
          side: THREE.DoubleSide,
        });
        const foam = new THREE.Mesh(foamGeo, foamMat);
        foam.position.set(0, -isl.y + 3.6, isl.radius * 0.82);
        g.add(foam);
      }

      this.group.add(g);
    }
  }

  private buildSkyBridges(): void {
    const stoneMat = new THREE.MeshStandardMaterial({
      map: this.textures.castleBrick,
      color: 0x555275,
      roughness: 0.85,
    });

    for (const b of this.skyBridges) {
      const dx = b.x2 - b.x1;
      const dy = b.y2 - b.y1;
      const dz = b.z2 - b.z1;
      const horizLen = Math.hypot(dx, dz);
      const totalLen = Math.hypot(horizLen, dy);

      const bridgeGeo = new THREE.BoxGeometry(b.halfWidth * 2, 1.3, totalLen + 1.5);
      const bridgeMesh = new THREE.Mesh(bridgeGeo, stoneMat);
      bridgeMesh.position.set((b.x1 + b.x2) / 2, (b.y1 + b.y2) / 2 - 0.65, (b.z1 + b.z2) / 2);

      const yaw = Math.atan2(dx, dz);
      const pitch = -Math.atan2(dy, horizLen);
      bridgeMesh.rotation.order = 'YXZ';
      bridgeMesh.rotation.y = yaw;
      bridgeMesh.rotation.x = pitch;
      bridgeMesh.receiveShadow = true;
      bridgeMesh.castShadow = true;
      this.group.add(bridgeMesh);

      // Stone arch supports underneath
      const midPillarH = Math.max(4, (b.y1 + b.y2) / 2);
      const pillar = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, midPillarH, 2.2),
        stoneMat
      );
      pillar.position.set((b.x1 + b.x2) / 2, midPillarH / 2, (b.z1 + b.z2) / 2);
      this.group.add(pillar);
    }
  }

  private buildCaveArches(): void {
    const rockMat = new THREE.MeshStandardMaterial({
      map: this.textures.cobblestone,
      color: 0x454961,
      roughness: 0.92,
      side: THREE.DoubleSide,
    });
    const torchEmberMat = new THREE.MeshBasicMaterial({ color: 0xff9e00 });
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0xa855f7,
      emissiveIntensity: 1.6,
      roughness: 0.25,
    });

    for (const cave of this.caves) {
      const dx = cave.endX - cave.mouthX;
      const dz = cave.endZ - cave.mouthZ;
      const len = Math.hypot(dx, dz);
      const angle = Math.atan2(dx, dz);

      const g = new THREE.Group();
      g.position.set(cave.mouthX, cave.floorY, cave.mouthZ);
      g.rotation.y = angle;

      // Arched stone cave shell spanning from mouth to end
      const tunnelGeo = new THREE.CylinderGeometry(
        cave.width * 0.95,
        cave.width * 1.15,
        len,
        12,
        1,
        true,
        -Math.PI * 0.55,
        Math.PI * 1.1
      );
      tunnelGeo.rotateX(Math.PI / 2);
      tunnelGeo.rotateZ(Math.PI);
      const tunnel = new THREE.Mesh(tunnelGeo, rockMat);
      tunnel.position.set(0, 1.8, len / 2);
      g.add(tunnel);

      // Rocky portal arch lintel at cave mouth
      const archGeo = new THREE.TorusGeometry(cave.width * 0.9, 2.2, 7, 12, Math.PI);
      const arch = new THREE.Mesh(archGeo, rockMat);
      arch.position.set(0, 0.8, 0.5);
      g.add(arch);

      // Back wall closing the cavern
      const backWall = new THREE.Mesh(
        new THREE.DodecahedronGeometry(cave.width * 1.1, 1),
        rockMat
      );
      backWall.position.set(0, 3.0, len + 2);
      g.add(backWall);

      // Glowing cave torches along both walls + amethyst clusters
      for (let t = 0; t <= 4; t++) {
        const tz = t * (len / 4.2);
        const side = t % 2 === 0 ? -1 : 1;
        const torchPost = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 2.4, 0.28),
          rockMat
        );
        torchPost.position.set(side * (cave.width * 0.72), 1.2, tz);
        g.add(torchPost);

        const flame = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.42, 0),
          torchEmberMat
        );
        flame.position.set(side * (cave.width * 0.72), 2.55, tz);
        g.add(flame);

        const crys = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.75, 0),
          crystalMat
        );
        crys.position.set(-side * (cave.width * 0.75), 0.7, tz + 2);
        g.add(crys);
      }

      // Warm flickering cave pooled point light near entrance
      const mouthLight = new PooledPointLightProxy(0xff8c2a, 14, 28, 1.6);
      mouthLight.position.set(0, 4.2, 4);
      g.add(mouthLight);

      this.group.add(g);
    }
  }

  private buildLandmarksList(): void {
    this.landmarks.push(
      {
        id: 'spawn_ridge',
        nameEn: 'Moonlit Overlook',
        nameAr: 'مرصد الوصول القمري',
        kind: 'spawn',
        pos: DarkRealmTerrain.SPAWN_POS.clone(),
        radius: 26,
        fastTravelPos: DarkRealmTerrain.SPAWN_POS.clone(),
      },
      {
        id: 'village_lantern',
        nameEn: 'Lantern Hollow Village',
        nameAr: 'قرية الفوانيس المهجورة',
        kind: 'village',
        pos: new THREE.Vector3(48, 9.6, 28),
        radius: 30,
        fastTravelPos: new THREE.Vector3(42, 10.5, 36),
      },
      {
        id: 'village_west_ruins',
        nameEn: 'Whispering Mill Ruins',
        nameAr: 'أطلال القرية الغربية',
        kind: 'village',
        pos: new THREE.Vector3(-155, 8.8, 110),
        radius: 32,
        fastTravelPos: new THREE.Vector3(-148, 9.5, 116),
      },
      {
        id: 'village_east_camp',
        nameEn: 'Ashen Outpost Village',
        nameAr: 'قرية الرماد الشرقية',
        kind: 'village',
        pos: new THREE.Vector3(175, 9.2, -165),
        radius: 32,
        fastTravelPos: new THREE.Vector3(168, 10.0, -155),
      },
      {
        id: 'village_north_hamlet',
        nameEn: 'Frostmire Hamlet',
        nameAr: 'بلدة الضباب الشمالية',
        kind: 'village',
        pos: new THREE.Vector3(-165, 10.4, -235),
        radius: 34,
        fastTravelPos: new THREE.Vector3(-156, 11.2, -225),
      },
      {
        id: 'village_elderwood',
        nameEn: 'Elderwood Village',
        nameAr: 'قرية غابة المسنين',
        kind: 'village',
        pos: new THREE.Vector3(145, 9.0, 78),
        radius: 34,
        fastTravelPos: new THREE.Vector3(138, 10.0, 84),
      },
      {
        id: 'village_moonbrook',
        nameEn: 'Moonbrook Village',
        nameAr: 'قرية جدول القمر',
        kind: 'village',
        pos: new THREE.Vector3(-75, 9.2, -165),
        radius: 34,
        fastTravelPos: new THREE.Vector3(-68, 10.0, -158),
      },
      {
        id: 'village_shadowgate',
        nameEn: 'Shadowgate Village',
        nameAr: 'قرية بوابة الظلال',
        kind: 'village',
        pos: new THREE.Vector3(115, 10.0, -245),
        radius: 34,
        fastTravelPos: new THREE.Vector3(108, 11.0, -238),
      },
      {
        id: 'castle_citadel',
        nameEn: 'Obsidian Dark Castle',
        nameAr: 'قلعة الظلام العملاقة',
        kind: 'castle',
        pos: DarkRealmTerrain.CASTLE_POS.clone(),
        radius: 72,
        fastTravelPos: new THREE.Vector3(0, 14.5, -268),
      }
    );

    for (const cave of this.caves) {
      this.landmarks.push({
        id: cave.id,
        nameEn: cave.nameEn,
        nameAr: cave.nameAr,
        kind: 'cave',
        pos: new THREE.Vector3((cave.mouthX + cave.endX) / 2, cave.floorY, (cave.mouthZ + cave.endZ) / 2),
        radius: 28,
        fastTravelPos: new THREE.Vector3(cave.mouthX, cave.floorY + 1, cave.mouthZ + 5),
      });
    }

    for (const isl of this.floatingIslands) {
      this.landmarks.push({
        id: isl.id,
        nameEn: isl.nameEn,
        nameAr: isl.nameAr,
        kind: 'floating',
        pos: new THREE.Vector3(isl.x, isl.y, isl.z),
        radius: isl.radius + 6,
        fastTravelPos: new THREE.Vector3(isl.x, isl.y + 1.2, isl.z),
      });
    }
  }

  public update(dt: number): void {
    this.textures.water.offset.y -= dt * 0.45;
  }

  public getIslandTerrainAdapter(): Terrain {
    // Provides the exact runtime interface expected by Character.ts & ThirdPersonCamera.ts
    return this as unknown as Terrain;
  }
}
