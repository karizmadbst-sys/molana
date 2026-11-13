/**
 * ECHO – DARK FANTASY REALM
 * Minecraft-Style Voxel Building System with Exact Raycast Face Snapping,
 * Block Rotation (0/90/180/270), Sloped Roof Geometry, Ground-Flush yBase Alignment,
 * 10-Stage Breaking Crack Overlay, Placement Pop Animation, and Shatter Particles.
 */

import * as THREE from 'three';
import type { DarkTextureSet } from './DarkRealmTextures.ts';
import type { VoxelBlockKind } from './DarkRealmProgress.ts';

export const VOXEL_SIZE = 1.0;

export interface PlacedVoxel {
  gx: number;
  gy: number;
  gz: number;
  kind: VoxelBlockKind;
  rot?: number;   // 0..3 => 0°, 90°, 180°, 270° around Y axis
  yBase?: number; // Exact bottom Y world coordinate so blocks sit flush on terrain & never sink or float
}

const MAX_INSTANCES_PER_KIND = 500;
const Y_AXIS = new THREE.Vector3(0, 1, 0);

export const VOXEL_LABELS: Record<VoxelBlockKind, { en: string; ar: string }> = {
  wood_plank: { en: 'Wood Planks', ar: 'ألواح الخشب' },
  cobblestone: { en: 'Cobblestone', ar: 'أحجار البناء' },
  castle_brick: { en: 'Castle Brick', ar: 'طوب القلعة' },
  glow_lantern: { en: 'Glow Lantern', ar: 'فانوس مضيء' },
  glass: { en: 'Crystal Window', ar: 'نافذة زجاجية' },
  roof_slate: { en: 'House Roof', ar: 'سقف المنزل' },
  crystal_block: { en: 'Shadow Crystal', ar: 'مكعب بلوري' },
  door: { en: 'Wooden Door', ar: 'باب خشبي' },
  bed: { en: 'Bed', ar: 'سرير' },
  table: { en: 'Table', ar: 'طاولة' },
  chair: { en: 'Chair', ar: 'كرسي' },
  chest: { en: 'Storage Chest', ar: 'صندوق تخزين' },
  workbench: { en: 'Workbench', ar: 'طاولة عمل' },
};

export const VOXEL_COLORS: Record<VoxelBlockKind, number> = {
  wood_plank: 0x9c6644,
  cobblestone: 0x7f8794,
  castle_brick: 0x525866,
  glow_lantern: 0xffb703,
  glass: 0x7dd3fc,
  roof_slate: 0x475569,
  crystal_block: 0xa855f7,
  door: 0xb07d4f,
  bed: 0xd1495b,
  table: 0xd4a373,
  chair: 0xbc8a5f,
  chest: 0xe09f3e,
  workbench: 0x8b5a2b,
};

interface DebrisParticle {
  mesh: THREE.Mesh;
  vx: number;
  vy: number;
  vz: number;
  rx: number;
  ry: number;
  life: number;
  maxLife: number;
  active: boolean;
}

interface PopPulse {
  mesh: THREE.Mesh;
  timer: number;
  duration: number;
  active: boolean;
}

export class VoxelBuilder {
  public group: THREE.Group;
  private blocks = new Map<string, PlacedVoxel>();
  private columnMap = new Map<string, PlacedVoxel[]>();
  private meshes = new Map<VoxelBlockKind, THREE.InstancedMesh>();
  private customGeos: THREE.BufferGeometry[] = [];

  // Preview + Target Selection Outline
  private previewGroup: THREE.Group;
  private previewFillMesh: THREE.Mesh;
  private previewFillMat: THREE.MeshBasicMaterial;
  private previewWireMat: THREE.LineBasicMaterial;
  private previewArrowMesh: THREE.Mesh;
  private targetOutline: THREE.LineSegments;

  // Breaking Crack Overlay (10 stages)
  private crackTextures: THREE.CanvasTexture[] = [];
  private breakOverlayMesh: THREE.Mesh;
  private breakOverlayMat: THREE.MeshBasicMaterial;

  // Debris particles & placement pop animations (pooled, zero-GC per frame)
  private debrisPool: DebrisParticle[] = [];
  private debrisGeo: THREE.BoxGeometry;
  private popPool: PopPulse[] = [];
  private popGeo: THREE.BoxGeometry;

  private previewTarget = new THREE.Vector3();
  private previewYBase = 0;
  private previewRot = 0;
  private previewValid = false;
  private targetedBlock: PlacedVoxel | null = null;
  private targetedNormal = new THREE.Vector3(0, 1, 0);

  private readonly dummyMatrix = new THREE.Matrix4();
  private readonly dummyPos = new THREE.Vector3();
  private readonly dummyQuat = new THREE.Quaternion();
  private readonly dummyScale = new THREE.Vector3(1, 1, 1);
  private readonly boxGeo = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE);

  constructor(textures: DarkTextureSet) {
    this.group = new THREE.Group();

    const makeShiftBox = (w: number, h: number, d: number, yShift: number, zShift: number = 0) => {
      const g = new THREE.BoxGeometry(w, h, d);
      g.translate(0, yShift, zShift);
      this.customGeos.push(g);
      return g;
    };

    const roofStairGeo = this.createStairRoofGeometry();
    this.customGeos.push(roofStairGeo);

    const geoMap: Partial<Record<VoxelBlockKind, THREE.BufferGeometry>> = {
      roof_slate: roofStairGeo,
      door: makeShiftBox(0.94, 1.92, 0.22, 0.46, -0.34),
      bed: makeShiftBox(0.90, 0.48, 0.96, -0.26),
      table: makeShiftBox(0.94, 0.80, 0.94, -0.10),
      chair: makeShiftBox(0.58, 0.68, 0.58, -0.16),
      chest: makeShiftBox(0.84, 0.68, 0.74, -0.16),
      workbench: makeShiftBox(0.96, 0.88, 0.96, -0.06),
    };

    const matMap: Record<VoxelBlockKind, THREE.MeshStandardMaterial> = {
      wood_plank: new THREE.MeshStandardMaterial({ map: textures.woodPlanks, roughness: 0.85 }),
      cobblestone: new THREE.MeshStandardMaterial({ map: textures.cobblestone, roughness: 0.9 }),
      castle_brick: new THREE.MeshStandardMaterial({ map: textures.castleBrick, roughness: 0.8 }),
      glow_lantern: new THREE.MeshStandardMaterial({
        map: textures.glowLantern,
        emissive: 0xffa62b,
        emissiveIntensity: 1.5,
        roughness: 0.4,
      }),
      glass: new THREE.MeshStandardMaterial({
        map: textures.glass,
        transparent: true,
        opacity: 0.65,
        roughness: 0.12,
        metalness: 0.25,
      }),
      roof_slate: new THREE.MeshStandardMaterial({ map: textures.roofSlate, roughness: 0.85 }),
      crystal_block: new THREE.MeshStandardMaterial({
        map: textures.crystalOre,
        emissive: 0xa855f7,
        emissiveIntensity: 1.1,
        roughness: 0.25,
      }),
      door: new THREE.MeshStandardMaterial({
        map: textures.woodPlanks,
        color: 0xb07d4f,
        roughness: 0.82,
      }),
      bed: new THREE.MeshStandardMaterial({
        map: textures.woodPlanks,
        color: 0xd1495b,
        roughness: 0.88,
      }),
      table: new THREE.MeshStandardMaterial({
        map: textures.woodPlanks,
        color: 0xd4a373,
        roughness: 0.82,
      }),
      chair: new THREE.MeshStandardMaterial({
        map: textures.woodPlanks,
        color: 0xbc8a5f,
        roughness: 0.84,
      }),
      chest: new THREE.MeshStandardMaterial({
        map: textures.woodPlanks,
        color: 0xe09f3e,
        roughness: 0.65,
        metalness: 0.2,
      }),
      workbench: new THREE.MeshStandardMaterial({
        map: textures.woodPlanks,
        color: 0x9c6644,
        roughness: 0.85,
      }),
    };

    (Object.keys(matMap) as VoxelBlockKind[]).forEach((kind) => {
      const geo = geoMap[kind] || this.boxGeo;
      const im = new THREE.InstancedMesh(geo, matMap[kind], MAX_INSTANCES_PER_KIND);
      im.count = 0;
      im.castShadow = true;
      im.receiveShadow = true;
      im.frustumCulled = false;
      this.meshes.set(kind, im);
      this.group.add(im);
    });

    // Ghost Minecraft placement preview (translucent fill + crisp wireframe + front facing arrow)
    this.previewGroup = new THREE.Group();
    this.previewGroup.visible = false;

    const previewBoxGeo = new THREE.BoxGeometry(VOXEL_SIZE + 0.02, VOXEL_SIZE + 0.02, VOXEL_SIZE + 0.02);
    this.customGeos.push(previewBoxGeo);
    this.previewFillMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.26,
      depthWrite: false,
    });
    this.previewFillMesh = new THREE.Mesh(previewBoxGeo, this.previewFillMat);
    this.previewGroup.add(this.previewFillMesh);

    const previewEdges = new THREE.EdgesGeometry(previewBoxGeo);
    this.customGeos.push(previewEdges);
    this.previewWireMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.92,
    });
    this.previewGroup.add(new THREE.LineSegments(previewEdges, this.previewWireMat));

    const arrowGeo = new THREE.ConeGeometry(0.14, 0.28, 4);
    arrowGeo.rotateX(Math.PI * 0.5);
    this.customGeos.push(arrowGeo);
    const arrowMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
    });
    this.previewArrowMesh = new THREE.Mesh(arrowGeo, arrowMat);
    this.previewArrowMesh.position.set(0, 0.02, 0.34);
    this.previewGroup.add(this.previewArrowMesh);
    this.group.add(this.previewGroup);

    // Classic Minecraft dark block selection outline for targeted existing block
    const selBox = new THREE.BoxGeometry(VOXEL_SIZE + 0.015, VOXEL_SIZE + 0.015, VOXEL_SIZE + 0.015);
    const selEdges = new THREE.EdgesGeometry(selBox);
    selBox.dispose();
    this.customGeos.push(selEdges);
    this.targetOutline = new THREE.LineSegments(
      selEdges,
      new THREE.LineBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.95 })
    );
    this.targetOutline.visible = false;
    this.group.add(this.targetOutline);

    // 10-Stage Procedural Minecraft Crack Overlay
    this.crackTextures = this.createCrackTextures();
    const crackGeo = new THREE.BoxGeometry(VOXEL_SIZE + 0.025, VOXEL_SIZE + 0.025, VOXEL_SIZE + 0.025);
    this.customGeos.push(crackGeo);
    this.breakOverlayMat = new THREE.MeshBasicMaterial({
      map: this.crackTextures[0],
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    });
    this.breakOverlayMesh = new THREE.Mesh(crackGeo, this.breakOverlayMat);
    this.breakOverlayMesh.visible = false;
    this.group.add(this.breakOverlayMesh);

    // Pooled Debris Particles (for mining chips & shatter burst)
    this.debrisGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    for (let i = 0; i < 40; i++) {
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85, transparent: true });
      const mesh = new THREE.Mesh(this.debrisGeo, mat);
      mesh.visible = false;
      this.group.add(mesh);
      this.debrisPool.push({
        mesh,
        vx: 0,
        vy: 0,
        vz: 0,
        rx: 0,
        ry: 0,
        life: 0,
        maxLife: 0.45,
        active: false,
      });
    }

    // Pooled Placement Pop-in Flash Boxes
    this.popGeo = new THREE.BoxGeometry(VOXEL_SIZE + 0.03, VOXEL_SIZE + 0.03, VOXEL_SIZE + 0.03);
    for (let i = 0; i < 8; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(this.popGeo, mat);
      mesh.visible = false;
      this.group.add(mesh);
      this.popPool.push({ mesh, timer: 0, duration: 0.18, active: false });
    }
  }

  /**
   * Builds a classic Minecraft stair / sloped roof BufferGeometry (lower full slab + upper back step)
   * so players can rotate and build crisp pitched roofs on houses.
   */
  private createStairRoofGeometry(): THREE.BufferGeometry {
    const baseBox = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE * 0.5, VOXEL_SIZE);
    baseBox.translate(0, -VOXEL_SIZE * 0.25, 0);
    const stepBox = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE * 0.5, VOXEL_SIZE * 0.5);
    stepBox.translate(0, VOXEL_SIZE * 0.25, -VOXEL_SIZE * 0.25);

    const a = baseBox.toNonIndexed();
    const b = stepBox.toNonIndexed();
    baseBox.dispose();
    stepBox.dispose();

    const posA = a.getAttribute('position');
    const posB = b.getAttribute('position');
    const normA = a.getAttribute('normal');
    const normB = b.getAttribute('normal');
    const uvA = a.getAttribute('uv');
    const uvB = b.getAttribute('uv');

    const totalVerts = posA.count + posB.count;
    const posArr = new Float32Array(totalVerts * 3);
    const normArr = new Float32Array(totalVerts * 3);
    const uvArr = new Float32Array(totalVerts * 2);

    posArr.set(posA.array as Float32Array, 0);
    posArr.set(posB.array as Float32Array, posA.count * 3);
    normArr.set(normA.array as Float32Array, 0);
    normArr.set(normB.array as Float32Array, normA.count * 3);
    uvArr.set(uvA.array as Float32Array, 0);
    uvArr.set(uvB.array as Float32Array, uvA.count * 2);

    a.dispose();
    b.dispose();

    const merged = new THREE.BufferGeometry();
    merged.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    merged.setAttribute('normal', new THREE.BufferAttribute(normArr, 3));
    merged.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2));
    merged.computeBoundingSphere();
    return merged;
  }

  private createCrackTextures(): THREE.CanvasTexture[] {
    const stages: THREE.CanvasTexture[] = [];
    for (let s = 0; s < 10; s++) {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, 64, 64);

      const branchCount = 3 + s * 3;
      const maxLen = 10 + s * 4.8;
      ctx.strokeStyle = 'rgba(10, 12, 18, 0.88)';
      ctx.lineWidth = 1.4 + s * 0.14;
      ctx.lineCap = 'square';

      let seed = 1337 + s * 97;
      const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };

      for (let b = 0; b < branchCount; b++) {
        let cx = 32 + (rand() - 0.5) * 14;
        let cy = 32 + (rand() - 0.5) * 14;
        const angle = (b / branchCount) * Math.PI * 2 + (rand() - 0.5) * 0.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        const segs = 2 + Math.floor(s / 3);
        for (let k = 0; k < segs; k++) {
          const stepLen = (maxLen / segs) * (0.65 + rand() * 0.6);
          const jitterAngle = angle + (rand() - 0.5) * 1.05;
          cx += Math.cos(jitterAngle) * stepLen;
          cy += Math.sin(jitterAngle) * stepLen;
          ctx.lineTo(Math.round(cx), Math.round(cy));
        }
        ctx.stroke();
      }

      if (s >= 6) {
        ctx.fillStyle = `rgba(10, 12, 18, ${(s - 5) * 0.08})`;
        ctx.fillRect(0, 0, 64, 64);
      }

      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      stages.push(tex);
    }
    return stages;
  }

  private key(gx: number, gy: number, gz: number): string {
    return `${gx},${gy},${gz}`;
  }

  private colKey(gx: number, gz: number): string {
    return `${gx},${gz}`;
  }

  public getVoxelBottomY(v: PlacedVoxel): number {
    return typeof v.yBase === 'number' && Number.isFinite(v.yBase) ? v.yBase : v.gy * VOXEL_SIZE;
  }

  public worldToGrid(x: number, y: number, z: number): { gx: number; gy: number; gz: number } {
    return {
      gx: Math.round(x / VOXEL_SIZE),
      gy: Math.round((y - VOXEL_SIZE * 0.5) / VOXEL_SIZE),
      gz: Math.round(z / VOXEL_SIZE),
    };
  }

  public placeBlockAtGrid(
    gx: number,
    gy: number,
    gz: number,
    kind: VoxelBlockKind,
    rot: number = 0,
    yBase?: number
  ): boolean {
    const k = this.key(gx, gy, gz);
    if (this.blocks.has(k)) return false;

    const kindCount = Array.from(this.blocks.values()).filter((b) => b.kind === kind).length;
    if (kindCount >= MAX_INSTANCES_PER_KIND) return false;

    const cleanRot = ((Math.round(rot) % 4) + 4) % 4;
    const finalYBase = typeof yBase === 'number' && Number.isFinite(yBase) ? yBase : gy * VOXEL_SIZE;
    const voxel: PlacedVoxel = { gx, gy, gz, kind, rot: cleanRot, yBase: finalYBase };
    this.blocks.set(k, voxel);

    const ck = this.colKey(gx, gz);
    const col = this.columnMap.get(ck) || [];
    col.push(voxel);
    this.columnMap.set(ck, col);

    this.rebuildKind(kind);
    return true;
  }

  public removeBlockAtGrid(gx: number, gy: number, gz: number): VoxelBlockKind | null {
    const k = this.key(gx, gy, gz);
    const existing = this.blocks.get(k);
    if (!existing) return null;
    this.blocks.delete(k);

    const ck = this.colKey(gx, gz);
    const col = this.columnMap.get(ck);
    if (col) {
      const idx = col.indexOf(existing);
      if (idx >= 0) col.splice(idx, 1);
      if (col.length === 0) this.columnMap.delete(ck);
    }

    this.rebuildKind(existing.kind);
    return existing.kind;
  }

  private rebuildKind(kind: VoxelBlockKind): void {
    const im = this.meshes.get(kind);
    if (!im) return;
    let idx = 0;
    for (const v of this.blocks.values()) {
      if (v.kind !== kind) continue;
      const bottomY = this.getVoxelBottomY(v);
      const rotSteps = v.rot ?? 0;
      this.dummyPos.set(v.gx * VOXEL_SIZE, bottomY + VOXEL_SIZE * 0.5, v.gz * VOXEL_SIZE);
      this.dummyQuat.setFromAxisAngle(Y_AXIS, rotSteps * Math.PI * 0.5);
      this.dummyMatrix.compose(this.dummyPos, this.dummyQuat, this.dummyScale);
      im.setMatrixAt(idx++, this.dummyMatrix);
    }
    im.count = idx;
    im.instanceMatrix.needsUpdate = true;
  }

  private rebuildAll(): void {
    (Object.keys(VOXEL_LABELS) as VoxelBlockKind[]).forEach((k) => this.rebuildKind(k));
  }

  /**
   * Exact Ray-AABB slab intersection returning entry distance t and hit face normal.
   */
  private intersectRayAABB(
    ox: number,
    oy: number,
    oz: number,
    dx: number,
    dy: number,
    dz: number,
    minX: number,
    minY: number,
    minZ: number,
    maxX: number,
    maxY: number,
    maxZ: number
  ): { t: number; nx: number; ny: number; nz: number } | null {
    let tmin = -Infinity;
    let tmax = Infinity;
    let nx = 0;
    let ny = 0;
    let nz = 0;

    // X slab
    if (Math.abs(dx) < 1e-8) {
      if (ox < minX || ox > maxX) return null;
    } else {
      const inv = 1 / dx;
      let t1 = (minX - ox) * inv;
      let t2 = (maxX - ox) * inv;
      let sign = -1;
      if (t1 > t2) {
        const tmp = t1;
        t1 = t2;
        t2 = tmp;
        sign = 1;
      }
      if (t1 > tmin) {
        tmin = t1;
        nx = sign;
        ny = 0;
        nz = 0;
      }
      if (t2 < tmax) tmax = t2;
      if (tmin > tmax) return null;
    }

    // Y slab
    if (Math.abs(dy) < 1e-8) {
      if (oy < minY || oy > maxY) return null;
    } else {
      const inv = 1 / dy;
      let t1 = (minY - oy) * inv;
      let t2 = (maxY - oy) * inv;
      let sign = -1;
      if (t1 > t2) {
        const tmp = t1;
        t1 = t2;
        t2 = tmp;
        sign = 1;
      }
      if (t1 > tmin) {
        tmin = t1;
        nx = 0;
        ny = sign;
        nz = 0;
      }
      if (t2 < tmax) tmax = t2;
      if (tmin > tmax) return null;
    }

    // Z slab
    if (Math.abs(dz) < 1e-8) {
      if (oz < minZ || oz > maxZ) return null;
    } else {
      const inv = 1 / dz;
      let t1 = (minZ - oz) * inv;
      let t2 = (maxZ - oz) * inv;
      let sign = -1;
      if (t1 > t2) {
        const tmp = t1;
        t1 = t2;
        t2 = tmp;
        sign = 1;
      }
      if (t1 > tmin) {
        tmin = t1;
        nx = 0;
        ny = 0;
        nz = sign;
      }
      if (t2 < tmax) tmax = t2;
      if (tmin > tmax) return null;
    }

    if (tmax < 0 || tmin < 0) return null;
    return { t: tmin, nx, ny, nz };
  }

  /**
   * Finds an adjacent placed block's yBase within 0.58m of terrain height so multi-block floors
   * & walls stay perfectly aligned on gently sloping terrain without floating or sinking.
   */
  private findNeighborAlignedYBase(gx: number, gz: number, groundY: number): number | null {
    const offsets = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    let bestY: number | null = null;
    let bestDiff = 0.58;
    for (let i = 0; i < offsets.length; i++) {
      const col = this.columnMap.get(this.colKey(gx + offsets[i][0], gz + offsets[i][1]));
      if (!col) continue;
      for (let j = 0; j < col.length; j++) {
        const yb = this.getVoxelBottomY(col[j]);
        const diff = Math.abs(yb - groundY);
        if (diff <= bestDiff) {
          bestDiff = diff;
          bestY = yb;
        }
      }
    }
    return bestY;
  }

  /**
   * Minecraft-style crosshair raycast onto existing block faces AND terrain surface.
   * Ensures blocks sit flush on terrain, stack cleanly onto block faces, and never float in open sky.
   */
  public updatePreview(
    enabled: boolean,
    playerPos: THREE.Vector3,
    cameraForward: THREE.Vector3,
    getTerrainHeight: (x: number, z: number) => number,
    cameraPos?: THREE.Vector3,
    rotationStep: number = 0
  ): void {
    this.previewRot = ((Math.round(rotationStep) % 4) + 4) % 4;
    if (!enabled) {
      this.previewGroup.visible = false;
      this.targetOutline.visible = false;
      this.previewValid = false;
      this.targetedBlock = null;
      return;
    }

    const ox = cameraPos ? cameraPos.x : playerPos.x;
    const oy = cameraPos ? cameraPos.y : playerPos.y + 1.48;
    const oz = cameraPos ? cameraPos.z : playerPos.z;
    const fLen = Math.hypot(cameraForward.x, cameraForward.y, cameraForward.z) || 1;
    const dx = cameraForward.x / fLen;
    const dy = cameraForward.y / fLen;
    const dz = cameraForward.z / fLen;

    const eyeX = playerPos.x;
    const eyeY = playerPos.y + 1.35;
    const eyeZ = playerPos.z;
    const eyeProjT = Math.max(0, (eyeX - ox) * dx + (eyeY - oy) * dy + (eyeZ - oz) * dz);
    const minRayT = Math.max(0.15, eyeProjT - 0.9);
    const maxRayT = eyeProjT + 7.2;

    // 1. Raycast against all nearby placed blocks
    let bestBlock: PlacedVoxel | null = null;
    let bestBlockT = maxRayT;
    let hitNX = 0;
    let hitNY = 1;
    let hitNZ = 0;

    for (const v of this.blocks.values()) {
      const cx = v.gx * VOXEL_SIZE;
      const cz = v.gz * VOXEL_SIZE;
      if (Math.abs(cx - eyeX) > 9 || Math.abs(cz - eyeZ) > 9) continue;
      const bottomY = this.getVoxelBottomY(v);
      const topH = v.kind === 'door' ? 1.92 : VOXEL_SIZE;
      const hit = this.intersectRayAABB(
        ox,
        oy,
        oz,
        dx,
        dy,
        dz,
        cx - 0.5,
        bottomY,
        cz - 0.5,
        cx + 0.5,
        bottomY + topH,
        cz + 0.5
      );
      if (!hit || hit.t < minRayT || hit.t > bestBlockT) continue;
      const hx = ox + dx * hit.t;
      const hy = oy + dy * hit.t;
      const hz = oz + dz * hit.t;
      if (Math.hypot(hx - eyeX, hy - eyeY, hz - eyeZ) > 7.4) continue;
      bestBlockT = hit.t;
      bestBlock = v;
      hitNX = hit.nx;
      hitNY = hit.ny;
      hitNZ = hit.nz;
    }

    // 2. Ray march terrain surface up to bestBlockT
    let terrainT = -1;
    const step = 0.22;
    let prevT = minRayT;
    for (let t = minRayT; t <= bestBlockT; t += step) {
      const px = ox + dx * t;
      const py = oy + dy * t;
      const pz = oz + dz * t;
      const th = getTerrainHeight(px, pz);
      if (Number.isFinite(th) && py <= th) {
        // Binary refine
        let lo = prevT;
        let hi = t;
        for (let r = 0; r < 5; r++) {
          const mid = (lo + hi) * 0.5;
          const mx = ox + dx * mid;
          const my = oy + dy * mid;
          const mz = oz + dz * mid;
          if (my <= getTerrainHeight(mx, mz)) hi = mid;
          else lo = mid;
        }
        const fx = ox + dx * hi;
        const fy = oy + dy * hi;
        const fz = oz + dz * hi;
        if (Math.hypot(fx - eyeX, fy - eyeY, fz - eyeZ) <= 7.4) {
          terrainT = hi;
        }
        break;
      }
      prevT = t;
    }

    // Update target block outline
    if (bestBlock && (terrainT < 0 || bestBlockT <= terrainT + 0.06)) {
      this.targetedBlock = bestBlock;
      this.targetedNormal.set(hitNX, hitNY, hitNZ);
      const tbBottom = this.getVoxelBottomY(bestBlock);
      this.targetOutline.position.set(
        bestBlock.gx * VOXEL_SIZE,
        tbBottom + VOXEL_SIZE * 0.5,
        bestBlock.gz * VOXEL_SIZE
      );
      this.targetOutline.visible = true;
    } else {
      this.targetedBlock = null;
      this.targetOutline.visible = false;
    }

    // 3. Compute exact placement cell (gx, gy, gz) + world bottom yBase
    let ngx = 0;
    let ngy = 0;
    let ngz = 0;
    let yBase = 0;
    let hasSurface = false;

    if (this.targetedBlock) {
      ngx = this.targetedBlock.gx + hitNX;
      ngy = this.targetedBlock.gy + hitNY;
      ngz = this.targetedBlock.gz + hitNZ;
      const baseBottom = this.getVoxelBottomY(this.targetedBlock);
      yBase = baseBottom + hitNY * VOXEL_SIZE;

      // Prevent burying a block underground on sloped hills
      const cellGround = getTerrainHeight(ngx * VOXEL_SIZE, ngz * VOXEL_SIZE);
      if (Number.isFinite(cellGround) && yBase < cellGround - 0.35) {
        if (hitNY < 0) {
          hasSurface = false;
        } else {
          yBase = cellGround - 0.01;
          hasSurface = true;
        }
      } else {
        hasSurface = true;
      }
    } else if (terrainT >= 0) {
      const gxWorld = ox + dx * terrainT;
      const gzWorld = oz + dz * terrainT;
      ngx = Math.round(gxWorld / VOXEL_SIZE);
      ngz = Math.round(gzWorld / VOXEL_SIZE);
      const cellGround = getTerrainHeight(ngx * VOXEL_SIZE, ngz * VOXEL_SIZE);
      if (Number.isFinite(cellGround)) {
        const neighborY = this.findNeighborAlignedYBase(ngx, ngz, cellGround);
        yBase = neighborY !== null ? neighborY : cellGround - 0.01;
        // Clamp against rising too far above ground or sinking below it
        if (yBase < cellGround - 0.35) yBase = cellGround - 0.01;
        if (yBase > cellGround + 0.55) yBase = cellGround - 0.01;
        ngy = Math.round(yBase / VOXEL_SIZE);
        // Resolve key collision if column already holds a block at same integer gy
        let safety = 0;
        while (this.blocks.has(this.key(ngx, ngy, ngz)) && safety < 8) {
          const occ = this.blocks.get(this.key(ngx, ngy, ngz))!;
          yBase = this.getVoxelBottomY(occ) + VOXEL_SIZE;
          ngy = occ.gy + 1;
          safety++;
        }
        hasSurface = true;
      }
    }

    if (!hasSurface) {
      this.previewGroup.visible = false;
      this.previewValid = false;
      return;
    }

    const wx = ngx * VOXEL_SIZE;
    const wy = yBase + VOXEL_SIZE * 0.5;
    const wz = ngz * VOXEL_SIZE;

    // Disallow placing inside player body or on top of an already occupied cell
    const occupied = this.blocks.has(this.key(ngx, ngy, ngz));
    const overlapsPlayer =
      Math.hypot(wx - playerPos.x, wz - playerPos.z) < 0.62 &&
      yBase + VOXEL_SIZE > playerPos.y + 0.08 &&
      yBase < playerPos.y + 1.72;

    if (occupied || overlapsPlayer) {
      this.previewFillMat.color.setHex(0xf43f5e);
      this.previewWireMat.color.setHex(0xf43f5e);
      this.previewValid = false;
    } else {
      this.previewFillMat.color.setHex(0x38bdf8);
      this.previewWireMat.color.setHex(0x38bdf8);
      this.previewValid = true;
    }

    this.previewTarget.set(ngx, ngy, ngz);
    this.previewYBase = yBase;
    this.previewGroup.position.set(wx, wy, wz);
    this.previewGroup.rotation.set(0, this.previewRot * Math.PI * 0.5, 0);
    this.previewGroup.visible = true;
  }

  public getPreviewGrid(): {
    gx: number;
    gy: number;
    gz: number;
    yBase: number;
    rot: number;
    valid: boolean;
  } {
    return {
      gx: this.previewTarget.x,
      gy: this.previewTarget.y,
      gz: this.previewTarget.z,
      yBase: this.previewYBase,
      rot: this.previewRot,
      valid: this.previewValid,
    };
  }

  /**
   * Returns exact block currently targeted by crosshair raycast (with radial fallback for touch buttons).
   */
  public findTargetedBlock(playerPos: THREE.Vector3, forward: THREE.Vector3): PlacedVoxel | null {
    if (this.targetedBlock) {
      return this.targetedBlock;
    }
    let best: PlacedVoxel | null = null;
    let bestDist = 5.4;
    const eyeY = playerPos.y + 1.35;

    for (const v of this.blocks.values()) {
      const bx = v.gx * VOXEL_SIZE;
      const by = this.getVoxelBottomY(v) + VOXEL_SIZE * 0.5;
      const bz = v.gz * VOXEL_SIZE;
      const dx = bx - playerPos.x;
      const dy = by - eyeY;
      const dz = bz - playerPos.z;
      const dist = Math.hypot(dx, dy, dz);
      if (dist > bestDist || dist < 0.35) continue;
      const dot = (dx * forward.x + dy * forward.y + dz * forward.z) / dist;
      if (dot > 0.65) {
        bestDist = dist;
        best = v;
      }
    }
    return best;
  }

  /**
   * Updates Minecraft 10-stage crack texture & subtle shake on a block being mined.
   */
  public setBreakingProgress(target: PlacedVoxel | null, progress: number): void {
    if (!target || progress <= 0.01) {
      this.breakOverlayMesh.visible = false;
      return;
    }
    const clamped = Math.max(0, Math.min(0.999, progress));
    const stage = Math.min(9, Math.floor(clamped * 10));
    if (this.breakOverlayMat.map !== this.crackTextures[stage]) {
      this.breakOverlayMat.map = this.crackTextures[stage];
      this.breakOverlayMat.needsUpdate = true;
    }
    const jitter = clamped * 0.012;
    this.breakOverlayMesh.position.set(
      target.gx * VOXEL_SIZE + (Math.random() - 0.5) * jitter,
      this.getVoxelBottomY(target) + VOXEL_SIZE * 0.5 + (Math.random() - 0.5) * jitter,
      target.gz * VOXEL_SIZE + (Math.random() - 0.5) * jitter
    );
    this.breakOverlayMesh.rotation.set(0, (target.rot ?? 0) * Math.PI * 0.5, 0);
    this.breakOverlayMesh.visible = true;
  }

  public spawnPlacePopAnimation(
    gx: number,
    gy: number,
    gz: number,
    kind: VoxelBlockKind,
    yBase?: number,
    rot: number = 0
  ): void {
    const slot = this.popPool.find((p) => !p.active);
    if (!slot) return;
    const bottomY = typeof yBase === 'number' && Number.isFinite(yBase) ? yBase : gy * VOXEL_SIZE;
    slot.mesh.position.set(gx * VOXEL_SIZE, bottomY + VOXEL_SIZE * 0.5, gz * VOXEL_SIZE);
    slot.mesh.rotation.set(0, rot * Math.PI * 0.5, 0);
    slot.mesh.scale.setScalar(0.72);
    const mat = slot.mesh.material as THREE.MeshBasicMaterial;
    mat.color.setHex(VOXEL_COLORS[kind] ?? 0xffffff);
    mat.opacity = 0.42;
    slot.mesh.visible = true;
    slot.timer = 0;
    slot.duration = 0.16;
    slot.active = true;
  }

  public spawnDebrisParticles(
    gx: number,
    gy: number,
    gz: number,
    kind: VoxelBlockKind,
    yBase?: number,
    count: number = 10
  ): void {
    const bottomY = typeof yBase === 'number' && Number.isFinite(yBase) ? yBase : gy * VOXEL_SIZE;
    const cx = gx * VOXEL_SIZE;
    const cy = bottomY + VOXEL_SIZE * 0.5;
    const cz = gz * VOXEL_SIZE;
    const colHex = VOXEL_COLORS[kind] ?? 0x9c6644;

    let spawned = 0;
    for (let i = 0; i < this.debrisPool.length && spawned < count; i++) {
      const p = this.debrisPool[i];
      if (p.active) continue;
      p.active = true;
      p.life = 0;
      p.maxLife = 0.36 + Math.random() * 0.24;
      p.mesh.position.set(
        cx + (Math.random() - 0.5) * 0.65,
        cy + (Math.random() - 0.5) * 0.55,
        cz + (Math.random() - 0.5) * 0.65
      );
      p.mesh.scale.setScalar(0.65 + Math.random() * 0.55);
      const mat = p.mesh.material as THREE.MeshStandardMaterial;
      mat.color.setHex(colHex);
      mat.opacity = 1;
      p.vx = (Math.random() - 0.5) * 4.2;
      p.vy = 2.0 + Math.random() * 3.5;
      p.vz = (Math.random() - 0.5) * 4.2;
      p.rx = (Math.random() - 0.5) * 12;
      p.ry = (Math.random() - 0.5) * 12;
      p.mesh.visible = true;
      spawned++;
    }
  }

  public updateAnimations(dt: number): void {
    const clampedDt = Math.min(dt, 0.05);

    for (let i = 0; i < this.debrisPool.length; i++) {
      const p = this.debrisPool[i];
      if (!p.active) continue;
      p.life += clampedDt;
      if (p.life >= p.maxLife) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.vy -= 17.5 * clampedDt;
      p.mesh.position.x += p.vx * clampedDt;
      p.mesh.position.y += p.vy * clampedDt;
      p.mesh.position.z += p.vz * clampedDt;
      p.mesh.rotation.x += p.rx * clampedDt;
      p.mesh.rotation.y += p.ry * clampedDt;
      const t = 1 - p.life / p.maxLife;
      p.mesh.scale.setScalar(Math.max(0.1, t * 0.9));
      (p.mesh.material as THREE.MeshStandardMaterial).opacity = t;
    }

    for (let i = 0; i < this.popPool.length; i++) {
      const pop = this.popPool[i];
      if (!pop.active) continue;
      pop.timer += clampedDt;
      const p = Math.min(1, pop.timer / pop.duration);
      const scale = p < 0.6 ? 0.72 + (p / 0.6) * 0.36 : 1.08 - ((p - 0.6) / 0.4) * 0.08;
      pop.mesh.scale.setScalar(scale);
      (pop.mesh.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.42;
      if (p >= 1) {
        pop.active = false;
        pop.mesh.visible = false;
      }
    }
  }

  /**
   * Returns highest walkable voxel top below player's head, allowing walking inside rooms under roofs
   * and stepping/jumping cleanly onto stairs & roofs!
   */
  public getFloorHeightAt(x: number, z: number, playerY: number): number | null {
    const gx = Math.round(x / VOXEL_SIZE);
    const gz = Math.round(z / VOXEL_SIZE);
    const col = this.columnMap.get(this.colKey(gx, gz));
    if (!col || col.length === 0) return null;

    let bestTop: number | null = null;
    for (let i = 0; i < col.length; i++) {
      const v = col[i];
      if (v.kind === 'door') continue;
      const hFrac = v.kind === 'bed' ? 0.48 : v.kind === 'chair' ? 0.64 : v.kind === 'chest' ? 0.68 : 1.0;
      const bottomY = this.getVoxelBottomY(v);
      const topY = bottomY + hFrac * VOXEL_SIZE;
      if (bottomY > playerY + 1.55) continue;
      if (topY <= playerY + 1.15 && (bestTop === null || topY > bestTop)) {
        bestTop = topY;
      }
    }
    return bestTop;
  }

  /**
   * Blocks horizontal walk through walls occupying player's torso band [playerY + 0.72, playerY + 1.75]
   */
  public getBlockingWallHeightAt(x: number, z: number, playerY: number): number | null {
    const gx = Math.round(x / VOXEL_SIZE);
    const gz = Math.round(z / VOXEL_SIZE);
    const col = this.columnMap.get(this.colKey(gx, gz));
    if (!col || col.length === 0) return null;

    for (let i = 0; i < col.length; i++) {
      const v = col[i];
      if (v.kind === 'door') continue; // Walk cleanly through doors into the house!
      const hFrac = v.kind === 'bed' ? 0.48 : v.kind === 'chair' ? 0.64 : v.kind === 'chest' ? 0.68 : 1.0;
      const bottomY = this.getVoxelBottomY(v);
      const topY = bottomY + hFrac * VOXEL_SIZE;
      if (topY > playerY + 0.72 && bottomY < playerY + 1.75) {
        return topY;
      }
    }
    return null;
  }

  /**
   * Places a furnished Minecraft-style house with floor, walls, door, glass windows, pitched roof, lanterns & furniture
   */
  public buildStarterHouseBlueprint(
    originPos: THREE.Vector3,
    groundHeightAt: (x: number, z: number) => number,
    outPlaced?: PlacedVoxel[]
  ): number {
    const cx = Math.round(originPos.x / VOXEL_SIZE) * VOXEL_SIZE;
    const cz = Math.round(originPos.z / VOXEL_SIZE) * VOXEL_SIZE;
    const groundY = groundHeightAt(cx, cz) - 0.02;
    const baseGrid = {
      gx: Math.round(cx / VOXEL_SIZE),
      gy: Math.round(groundY / VOXEL_SIZE),
      gz: Math.round(cz / VOXEL_SIZE),
    };
    let placed = 0;
    const w = 2; // 5x5 footprint (-2..2)
    const d = 2;

    const addIfFree = (dx: number, level: number, dz: number, kind: VoxelBlockKind, rot: number = 0) => {
      const gx = baseGrid.gx + dx;
      const gy = baseGrid.gy + level;
      const gz = baseGrid.gz + dz;
      const yBase = groundY + level * VOXEL_SIZE;
      if (this.placeBlockAtGrid(gx, gy, gz, kind, rot, yBase)) {
        placed++;
        outPlaced?.push({ gx, gy, gz, kind, rot, yBase });
      }
    };

    for (let dx = -w; dx <= w; dx++) {
      for (let dz = -d; dz <= d; dz++) {
        const isEdge = Math.abs(dx) === w || Math.abs(dz) === d;
        const isCorner = Math.abs(dx) === w && Math.abs(dz) === d;
        const isDoorway = dz === d && dx === 0;

        // Stone Floor
        addIfFree(dx, 0, dz, 'cobblestone');

        // Walls (level 1..3) with Doorway & Crystal Windows
        if (isEdge) {
          for (let h = 1; h <= 3; h++) {
            if (isDoorway && h <= 2) continue;
            let kind: VoxelBlockKind = 'wood_plank';
            if (isCorner) kind = 'castle_brick';
            else if (h === 2 && !isDoorway && (dx === 0 || dz === 0 || Math.abs(dx) === 1)) kind = 'glass';
            addIfFree(dx, h, dz, kind);
          }
        }

        // Pitched Roof (outer stair slope facing inward + ridge)
        const roofRot = dz === d ? 2 : dz === -d ? 0 : dx === w ? 3 : dx === -w ? 1 : 0;
        addIfFree(dx, 4, dz, 'roof_slate', roofRot);
        if (Math.abs(dx) <= 1 && Math.abs(dz) <= 1) {
          addIfFree(dx, 5, dz, 'roof_slate', dz > 0 ? 2 : 0);
        }
      }
    }

    // Walk-through Wooden Door in doorway
    addIfFree(0, 1, d, 'door', 0);

    // Interior Furniture (Bed, Chest, Workbench, Table & Chair)
    addIfFree(-1, 1, -1, 'bed', 0);
    addIfFree(1, 1, -1, 'chest', 2);
    addIfFree(1, 1, 0, 'workbench', 3);
    addIfFree(-1, 1, 1, 'table', 0);
    addIfFree(-1, 1, 0, 'chair', 0);

    // Lanterns by doorway & interior ceiling
    addIfFree(-1, 2, d + 1, 'glow_lantern');
    addIfFree(1, 2, d + 1, 'glow_lantern');
    addIfFree(0, 3, 0, 'glow_lantern');

    return placed;
  }

  public applyRemoteBlocks(
    op: 'PLACE' | 'REMOVE',
    blocks: { gx: number; gy: number; gz: number; kind: string; rot?: number; yBase?: number }[]
  ): void {
    if (!Array.isArray(blocks) || blocks.length === 0) return;
    const touchedKinds = new Set<VoxelBlockKind>();

    for (const raw of blocks) {
      const gx = Math.round(raw.gx);
      const gy = Math.round(raw.gy);
      const gz = Math.round(raw.gz);
      const k = this.key(gx, gy, gz);

      if (op === 'PLACE') {
        const kind = (raw.kind in VOXEL_LABELS ? raw.kind : 'wood_plank') as VoxelBlockKind;
        if (this.blocks.has(k)) continue;
        const rot = typeof raw.rot === 'number' && Number.isFinite(raw.rot) ? ((Math.round(raw.rot) % 4) + 4) % 4 : 0;
        const yBase = typeof raw.yBase === 'number' && Number.isFinite(raw.yBase) ? raw.yBase : undefined;
        const voxel: PlacedVoxel = { gx, gy, gz, kind, rot, yBase };
        this.blocks.set(k, voxel);
        const ck = this.colKey(gx, gz);
        const col = this.columnMap.get(ck) || [];
        col.push(voxel);
        this.columnMap.set(ck, col);
        touchedKinds.add(kind);
        this.spawnPlacePopAnimation(gx, gy, gz, kind, yBase, rot);
      } else {
        const existing = this.blocks.get(k);
        if (!existing) continue;
        this.spawnDebrisParticles(gx, gy, gz, existing.kind, existing.yBase, 8);
        this.blocks.delete(k);
        const ck = this.colKey(gx, gz);
        const col = this.columnMap.get(ck);
        if (col) {
          const idx = col.indexOf(existing);
          if (idx >= 0) col.splice(idx, 1);
          if (col.length === 0) this.columnMap.delete(ck);
        }
        touchedKinds.add(existing.kind);
      }
    }

    for (const kind of touchedKinds) {
      this.rebuildKind(kind);
    }
  }

  public getTotalBlocksPlaced(): number {
    return this.blocks.size;
  }

  public serialize(): PlacedVoxel[] {
    return Array.from(this.blocks.values());
  }

  public deserialize(list: PlacedVoxel[]): void {
    this.blocks.clear();
    this.columnMap.clear();
    if (Array.isArray(list)) {
      for (const item of list) {
        if (item && typeof item.gx === 'number' && typeof item.gy === 'number' && typeof item.gz === 'number' && item.kind) {
          const k = this.key(item.gx, item.gy, item.gz);
          this.blocks.set(k, item);
          const ck = this.colKey(item.gx, item.gz);
          const col = this.columnMap.get(ck) || [];
          col.push(item);
          this.columnMap.set(ck, col);
        }
      }
    }
    this.rebuildAll();
  }

  public dispose(): void {
    this.boxGeo.dispose();
    this.debrisGeo.dispose();
    this.popGeo.dispose();
    for (const g of this.customGeos) g.dispose();
    for (const t of this.crackTextures) t.dispose();
    this.previewFillMat.dispose();
    this.previewWireMat.dispose();
    (this.previewArrowMesh.material as THREE.Material).dispose();
    (this.targetOutline.material as THREE.Material).dispose();
    this.breakOverlayMat.dispose();
    for (const p of this.debrisPool) (p.mesh.material as THREE.Material).dispose();
    for (const p of this.popPool) (p.mesh.material as THREE.Material).dispose();
    for (const im of this.meshes.values()) {
      (im.material as THREE.Material).dispose();
    }
  }
}
