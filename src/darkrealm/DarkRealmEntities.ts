/**
 * ECHO – DARK FANTASY REALM
 * 3 AI Companions (Warrior, Mage, Ranger), Pooled 260+ Monsters,
 * 4 Flying Shadow Dragons, and the Final Boss (Malakor, Lord of Eclipse),
 * plus Projectiles, Monster Vanish & Respawn, and Combat Loot Drops.
 */

import * as THREE from 'three';
import { DarkRealmTerrain } from './DarkRealmTerrain.ts';
import { DarkRealmLandmarks, ResourceKind } from './DarkRealmLandmarks.ts';
import { SharedCompanionUnit } from '../npc/QuestCompanions.ts';

export type CompanionAIMode = 'FOLLOW_FIGHT' | 'EXPLORE_GATHER' | 'GUARD';

export type DarkMonsterType =
  | 'SKELETON_ARCHER'
  | 'ZOMBIE'
  | 'GIANT_SPIDER'
  | 'MOSS_CREEPER'
  | 'STONE_GOLEM'
  | 'SHADOW_DRAGON'
  | 'DARK_BOSS';

export interface MonsterSpawnData {
  id: number;
  type: DarkMonsterType;
  homePos: THREE.Vector3;
  pos: THREE.Vector3;
  hp: number;
  maxHp: number;
  damage: number;
  speed: number;
  attackRange: number;
  aggroRange: number;
  alive: boolean;
  respawnTimer: number;
  attackCooldown: number;
  hitFlash: number;
  orbitAngle: number;
  rigIndex: number; // -1 if currently unpooled / sleeping
}

interface ActiveProjectile {
  mesh: THREE.Mesh;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  fromPlayerTeam: boolean;
  damage: number;
  life: number;
  active: boolean;
}

interface LootDrop {
  mesh: THREE.Mesh;
  pos: THREE.Vector3;
  kind: 'crystal' | 'gold' | 'food' | 'essence' | 'arrows';
  amount: number;
  life: number;
  active: boolean;
}

interface CompanionUnit {
  id: 'warrior' | 'mage' | 'ranger';
  nameEn: string;
  nameAr: string;
  auraColor: number;
  shared: SharedCompanionUnit;
  pos: THREE.Vector3;
  facing: number;
  animTime: number;
  actionCooldown: number;
  slashTimer: number;
  gatherTimer: number;
  healCooldown: number;
  offsetAngle: number;
  wanderTarget: THREE.Vector3;
  wanderTimer: number;
}

interface MonsterRig {
  group: THREE.Group;
  parts: Map<string, THREE.Object3D>;
  assignedSpawnId: number;
  currentType: DarkMonsterType | null;
}

export class DarkRealmEntities {
  public group: THREE.Group;
  public companions: CompanionUnit[] = [];
  public companionMode: CompanionAIMode = 'FOLLOW_FIGHT';

  public spawns: MonsterSpawnData[] = [];
  private monsterRigs: MonsterRig[] = [];
  private dragonRigs: MonsterRig[] = [];
  private bossRig: MonsterRig | null = null;
  private readonly poolSize: number;

  private projectiles: ActiveProjectile[] = [];
  private lootDrops: LootDrop[] = [];

  private terrain: DarkRealmTerrain;
  private landmarks: DarkRealmLandmarks;

  private sharedGeos = new Map<string, THREE.BufferGeometry>();
  private sharedMats = new Map<string, THREE.Material>();

  // Callbacks to DarkRealmManager
  public onPlayerDamaged?: (amount: number, attackerType: DarkMonsterType) => void;
  public onMonsterKilled?: (
    type: DarkMonsterType,
    pos: THREE.Vector3,
    byCompanionName?: string
  ) => void;
  public onCompanionGathered?: (
    companionNameAr: string,
    kind: ResourceKind,
    amount: number
  ) => void;
  public onCompanionHealedPlayer?: (companionNameAr: string, healHp: number) => void;
  public onProjectileFired?: (fromPlayer: boolean, isMagic: boolean) => void;

  private readonly scratchVec = new THREE.Vector3();
  private readonly scratchOrigin = new THREE.Vector3();
  private readonly scratchDir = new THREE.Vector3();
  private rigCandidates: Array<{ spawn: MonsterSpawnData; distSq: number }> = [];
  private keepRigIds = new Set<number>();

  constructor(
    terrain: DarkRealmTerrain,
    landmarks: DarkRealmLandmarks,
    sharedCompanions: SharedCompanionUnit[],
    isMobile: boolean = false
  ) {
    this.terrain = terrain;
    this.landmarks = landmarks;
    this.poolSize = isMobile ? 10 : 14;
    this.group = new THREE.Group();

    this.bindSharedCompanions(sharedCompanions);
    this.generateOptimizedSpawns();
    this.buildRigPools();
    this.buildProjectilePool();
    this.buildLootPool();
  }

  private bindSharedCompanions(sharedCompanions: SharedCompanionUnit[]): void {
    const roleMap: Record<SharedCompanionUnit['role'], { id: CompanionUnit['id']; offsetAngle: number }> = {
      VANGUARD: { id: 'warrior', offsetAngle: -2.2 },
      SEEKER: { id: 'mage', offsetAngle: -2.75 },
      SCOUT: { id: 'ranger', offsetAngle: 2.35 },
    };

    for (const unit of sharedCompanions) {
      const mapping = roleMap[unit.role] || { id: 'warrior', offsetAngle: -2.2 };
      this.companions.push({
        id: mapping.id,
        nameEn: unit.nameEn,
        nameAr: unit.nameAr,
        auraColor: unit.auraColor,
        shared: unit,
        pos: unit.position,
        facing: Math.PI,
        animTime: 0,
        actionCooldown: 0,
        slashTimer: 0,
        gatherTimer: 5 + Math.random() * 4,
        healCooldown: 0,
        offsetAngle: mapping.offsetAngle,
        wanderTarget: unit.position.clone(),
        wanderTimer: 0,
      });
    }
  }

  public attachSharedCompanions(): void {
    for (const c of this.companions) {
      if (c.shared.group.parent !== this.group) {
        this.group.add(c.shared.group);
      }
      c.shared.group.visible = true;
      c.shared.nameplateGroup.visible = true;
      c.shared.group.position.copy(c.pos);
    }
  }

  public resetCompanionTransforms(): void {
    for (const c of this.companions) {
      c.slashTimer = 0;
      c.actionCooldown = 0;
      c.shared.slashMaterial.opacity = 0;
      c.shared.leftLeg.rotation.x = 0;
      c.shared.rightLeg.rotation.x = 0;
      c.shared.leftArm.rotation.x = 0;
      c.shared.rightArm.rotation.x = 0;
    }
  }

  public resetCompanionsNearPlayer(playerPos: THREE.Vector3): void {
    const offsets = [
      new THREE.Vector3(-2.7, 0, -1.6),
      new THREE.Vector3(-1.6, 0, 2.2),
      new THREE.Vector3(2.3, 0, -1.7),
    ];
    this.companions.forEach((c, idx) => {
      const off = offsets[idx] || new THREE.Vector3(2, 0, 2);
      c.pos.set(playerPos.x + off.x, playerPos.y, playerPos.z + off.z);
      c.pos.y = this.terrain.getMeshHeightAt(c.pos.x, c.pos.z);
      c.shared.group.position.copy(c.pos);
      c.wanderTarget.copy(c.pos);
      c.slashTimer = 0;
      c.shared.slashMaterial.opacity = 0;
    });
  }

  public cycleCompanionMode(): CompanionAIMode {
    if (this.companionMode === 'FOLLOW_FIGHT') this.companionMode = 'EXPLORE_GATHER';
    else if (this.companionMode === 'EXPLORE_GATHER') this.companionMode = 'GUARD';
    else this.companionMode = 'FOLLOW_FIGHT';
    return this.companionMode;
  }

  private generateOptimizedSpawns(): void {
    let nextId = 1;
    const seeded = (i: number, k: number) => {
      const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
      return v - Math.floor(v);
    };

    const addSpawn = (type: DarkMonsterType, x: number, yOverride: number | null, z: number) => {
      const y = yOverride !== null ? yOverride : this.terrain.getMeshHeightAt(x, z);
      const stats: Record<DarkMonsterType, { hp: number; dmg: number; spd: number; range: number; aggro: number }> = {
        SKELETON_ARCHER: { hp: 55, dmg: 11, spd: 3.4, range: 15.0, aggro: 26 },
        ZOMBIE: { hp: 70, dmg: 13, spd: 3.9, range: 2.2, aggro: 24 },
        GIANT_SPIDER: { hp: 62, dmg: 14, spd: 5.4, range: 2.1, aggro: 25 },
        MOSS_CREEPER: { hp: 58, dmg: 22, spd: 4.2, range: 2.4, aggro: 22 },
        STONE_GOLEM: { hp: 240, dmg: 24, spd: 2.5, range: 3.3, aggro: 28 },
        SHADOW_DRAGON: { hp: 420, dmg: 28, spd: 9.5, range: 28.0, aggro: 48 },
        DARK_BOSS: { hp: 1650, dmg: 36, spd: 4.3, range: 4.5, aggro: 46 },
      };
      const st = stats[type];
      const home = new THREE.Vector3(x, y, z);
      this.spawns.push({
        id: nextId++,
        type,
        homePos: home.clone(),
        pos: home.clone(),
        hp: st.hp,
        maxHp: st.hp,
        damage: st.dmg,
        speed: st.spd,
        attackRange: st.range,
        aggroRange: st.aggro,
        alive: true,
        respawnTimer: 0,
        attackCooldown: Math.random() * 1.5,
        hitFlash: 0,
        orbitAngle: Math.random() * Math.PI * 2,
        rigIndex: -1,
      });
    };

    // 1. Handcrafted foreground encounter monsters near valley vista
    addSpawn('GIANT_SPIDER', -38, null, 38);
    addSpawn('SKELETON_ARCHER', -24, null, 58);
    addSpawn('ZOMBIE', 54, null, 42);
    addSpawn('STONE_GOLEM', 68, null, 20);

    // 2. Giant Stone Golems guarding ruins & castle outer gates (6 Golems)
    const golemSpots: Array<[number, number]> = [
      [-64, -20],
      [-26, -245],
      [26, -245],
      [-40, -305],
      [40, -305],
      [0, -275],
    ];
    for (const [gx, gz] of golemSpots) {
      addSpawn('STONE_GOLEM', gx, null, gz);
    }

    // 3. Cave Monsters inside caverns (2 per cave)
    for (const cave of this.terrain.caves) {
      for (let i = 0; i < 2; i++) {
        const t = 0.35 + i * 0.35;
        const cx = THREE.MathUtils.lerp(cave.mouthX, cave.endX, t) + (i % 2 === 0 ? -1.8 : 1.8);
        const cz = THREE.MathUtils.lerp(cave.mouthZ, cave.endZ, t);
        addSpawn(i % 2 === 0 ? 'GIANT_SPIDER' : 'SKELETON_ARCHER', cx, cave.floorY, cz);
      }
    }

    // 4. Floating Island Guardians (1 per island)
    for (const isl of this.terrain.floatingIslands) {
      addSpawn('SKELETON_ARCHER', isl.x - 4, isl.y, isl.z + 3);
    }

    // 5. Reduced Open-World Forest, Valley, Village & Citadel Grounds Monsters (32 total)
    const poolTypes: DarkMonsterType[] = ['SKELETON_ARCHER', 'ZOMBIE', 'GIANT_SPIDER', 'MOSS_CREEPER'];
    for (let i = 0; i < 32; i++) {
      const ang = seeded(i, 1) * Math.PI * 2;
      const dist = 30 + seeded(i, 2) * 380;
      const x = Math.cos(ang) * dist;
      const z = Math.sin(ang) * dist - 105;
      // Keep direct spawn pad safe
      if (Math.hypot(x, z - 92) < 22) continue;
      const type = poolTypes[i % poolTypes.length];
      addSpawn(type, x, null, z);
    }

    // 6. 2 Winged Shadow Dragons circling Castle & Valley
    const dragonOrbitCenters: Array<[number, number, number]> = [
      [-18, 42, -310],
      [75, 44, -120],
    ];
    dragonOrbitCenters.forEach(([dx, dy, dz]) => {
      addSpawn('SHADOW_DRAGON', dx, dy, dz);
    });

    // 7. Final Dark Boss: Malakor, Lord of Eclipse in Giant Castle Courtyard
    addSpawn('DARK_BOSS', DarkRealmTerrain.CASTLE_POS.x, 14, DarkRealmTerrain.CASTLE_POS.z + 5);
  }

  private buildRigPools(): void {
    for (let i = 0; i < this.poolSize; i++) {
      const g = new THREE.Group();
      g.visible = false;
      this.group.add(g);
      this.monsterRigs.push({
        group: g,
        parts: new Map(),
        assignedSpawnId: -1,
        currentType: null,
      });
    }

    // Dedicated Dragon Rigs (4)
    const dragonSpawns = this.spawns.filter((s) => s.type === 'SHADOW_DRAGON');
    dragonSpawns.forEach((sp, i) => {
      const g = new THREE.Group();
      this.populateRigGeometry(g, 'SHADOW_DRAGON');
      g.position.copy(sp.pos);
      this.group.add(g);
      sp.rigIndex = i;
      this.dragonRigs.push({
        group: g,
        parts: new Map(),
        assignedSpawnId: sp.id,
        currentType: 'SHADOW_DRAGON',
      });
    });

    // Dedicated Final Dark Boss Rig
    const bossSpawn = this.spawns.find((s) => s.type === 'DARK_BOSS');
    if (bossSpawn) {
      const g = new THREE.Group();
      this.populateRigGeometry(g, 'DARK_BOSS');
      g.position.copy(bossSpawn.pos);
      this.group.add(g);
      bossSpawn.rigIndex = 0;
      this.bossRig = {
        group: g,
        parts: new Map(),
        assignedSpawnId: bossSpawn.id,
        currentType: 'DARK_BOSS',
      };
    }
  }

  private getBoxGeo(w: number, h: number, d: number): THREE.BufferGeometry {
    const key = `box_${w}_${h}_${d}`;
    let geo = this.sharedGeos.get(key);
    if (!geo) {
      geo = new THREE.BoxGeometry(w, h, d);
      this.sharedGeos.set(key, geo);
    }
    return geo;
  }

  private getGeo(key: string, factory: () => THREE.BufferGeometry): THREE.BufferGeometry {
    let geo = this.sharedGeos.get(key);
    if (!geo) {
      geo = factory();
      this.sharedGeos.set(key, geo);
    }
    return geo;
  }

  private getMat(key: string, factory: () => THREE.Material): THREE.Material {
    let mat = this.sharedMats.get(key);
    if (!mat) {
      mat = factory();
      this.sharedMats.set(key, mat);
    }
    return mat;
  }

  private populateRigGeometry(group: THREE.Group, type: DarkMonsterType): void {
    // Clear existing meshes cleanly (shared geos/mats are cached for reuse across swaps)
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    if (type === 'SKELETON_ARCHER') {
      const boneMat = this.getMat('skel_bone', () => new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 }));
      const darkEyeMat = this.getMat('skel_eye', () => new THREE.MeshBasicMaterial({ color: 0x0f172a }));
      const bowMat = this.getMat('skel_bow', () => new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.85 }));

      const legs = new THREE.Mesh(this.getBoxGeo(0.32, 0.72, 0.2), boneMat);
      legs.position.y = 0.36;
      const ribcage = new THREE.Mesh(this.getBoxGeo(0.42, 0.62, 0.24), boneMat);
      ribcage.position.y = 1.04;
      const skull = new THREE.Mesh(this.getBoxGeo(0.38, 0.38, 0.38), boneMat);
      skull.position.y = 1.56;
      const eyeGeo = this.getBoxGeo(0.08, 0.08, 0.05);
      const eyeL = new THREE.Mesh(eyeGeo, darkEyeMat);
      eyeL.position.set(-0.09, 1.58, 0.19);
      const eyeR = new THREE.Mesh(eyeGeo, darkEyeMat);
      eyeR.position.set(0.09, 1.58, 0.19);
      const bow = new THREE.Mesh(this.getGeo('skel_bow_geo', () => new THREE.TorusGeometry(0.35, 0.03, 5, 10, Math.PI)), bowMat);
      bow.position.set(0.32, 1.1, 0.22);
      bow.rotation.y = Math.PI / 2;
      group.add(legs, ribcage, skull, eyeL, eyeR, bow);
    } else if (type === 'ZOMBIE') {
      const skinMat = this.getMat('zomb_skin', () => new THREE.MeshStandardMaterial({ color: 0x4d7c5b, roughness: 0.85 }));
      const shirtMat = this.getMat('zomb_shirt', () => new THREE.MeshStandardMaterial({ color: 0x1d4ed8, roughness: 0.85 }));
      const pantsMat = this.getMat('zomb_pants', () => new THREE.MeshStandardMaterial({ color: 0x312e81, roughness: 0.9 }));
      const legs = new THREE.Mesh(this.getBoxGeo(0.4, 0.72, 0.24), pantsMat);
      legs.position.y = 0.36;
      const body = new THREE.Mesh(this.getBoxGeo(0.46, 0.68, 0.28), shirtMat);
      body.position.y = 1.05;
      const head = new THREE.Mesh(this.getBoxGeo(0.38, 0.38, 0.38), skinMat);
      head.position.y = 1.58;
      const armGeo = this.getBoxGeo(0.15, 0.16, 0.56);
      const armL = new THREE.Mesh(armGeo, skinMat);
      armL.position.set(-0.31, 1.24, 0.25);
      const armR = new THREE.Mesh(armGeo, skinMat);
      armR.position.set(0.31, 1.24, 0.25);
      group.add(legs, body, head, armL, armR);
    } else if (type === 'GIANT_SPIDER') {
      const bodyMat = this.getMat('spider_body', () => new THREE.MeshStandardMaterial({ color: 0x322b45, roughness: 0.78 }));
      const eyeMat = this.getMat('spider_eye', () => new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      const abdomen = new THREE.Mesh(this.getBoxGeo(1.15, 0.72, 1.35), bodyMat);
      abdomen.position.set(0, 0.65, -0.35);
      const head = new THREE.Mesh(this.getBoxGeo(0.72, 0.52, 0.65), bodyMat);
      head.position.set(0, 0.55, 0.52);
      const eyeGeo = this.getBoxGeo(0.14, 0.12, 0.08);
      for (let e = -1; e <= 1; e += 2) {
        const eye = new THREE.Mesh(eyeGeo, eyeMat);
        eye.position.set(e * 0.18, 0.62, 0.86);
        group.add(eye);
      }
      const legGeo = this.getBoxGeo(1.05, 0.11, 0.11);
      for (let side = -1; side <= 1; side += 2) {
        for (let l = 0; l < 4; l++) {
          const leg = new THREE.Mesh(legGeo, bodyMat);
          leg.position.set(side * 0.78, 0.36, -0.5 + l * 0.34);
          leg.rotation.z = -side * 0.42;
          group.add(leg);
        }
      }
      group.add(abdomen, head);
    } else if (type === 'MOSS_CREEPER') {
      const mossMat = this.getMat('creeper_moss', () => new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.9 }));
      const faceMat = this.getMat('creeper_face', () => new THREE.MeshBasicMaterial({ color: 0x052e16 }));
      const feet = new THREE.Mesh(this.getBoxGeo(0.54, 0.36, 0.44), mossMat);
      feet.position.y = 0.18;
      const stalk = new THREE.Mesh(this.getBoxGeo(0.42, 0.98, 0.32), mossMat);
      stalk.position.y = 0.85;
      const head = new THREE.Mesh(this.getBoxGeo(0.46, 0.46, 0.46), mossMat);
      head.position.y = 1.56;
      const eyeGeo = this.getBoxGeo(0.1, 0.1, 0.04);
      const eyeL = new THREE.Mesh(eyeGeo, faceMat);
      eyeL.position.set(-0.1, 1.6, 0.24);
      const eyeR = new THREE.Mesh(eyeGeo, faceMat);
      eyeR.position.set(0.1, 1.6, 0.24);
      group.add(feet, stalk, head, eyeL, eyeR);
    } else if (type === 'STONE_GOLEM') {
      const rockMat = this.getMat('golem_rock', () => new THREE.MeshStandardMaterial({ color: 0x565a78, roughness: 0.92 }));
      const glowMat = this.getMat('golem_glow', () => new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0xa855f7,
        emissiveIntensity: 2.0,
      }));
      const legGeo = this.getBoxGeo(0.75, 1.6, 0.75);
      const legL = new THREE.Mesh(legGeo, rockMat);
      legL.position.set(-0.62, 0.8, 0);
      const legR = new THREE.Mesh(legGeo, rockMat);
      legR.position.set(0.62, 0.8, 0);
      const torso = new THREE.Mesh(this.getBoxGeo(2.3, 1.9, 1.4), rockMat);
      torso.position.y = 2.5;
      const chestCore = new THREE.Mesh(this.getGeo('golem_core', () => new THREE.OctahedronGeometry(0.45, 0)), glowMat);
      chestCore.position.set(0, 2.55, 0.7);
      const head = new THREE.Mesh(this.getBoxGeo(0.95, 0.85, 0.95), rockMat);
      head.position.y = 3.8;
      const visor = new THREE.Mesh(this.getBoxGeo(0.65, 0.16, 0.1), glowMat);
      visor.position.set(0, 3.85, 0.48);
      const armGeo = this.getBoxGeo(0.68, 2.1, 0.68);
      const armL = new THREE.Mesh(armGeo, rockMat);
      armL.position.set(-1.62, 2.1, 0.15);
      const armR = new THREE.Mesh(armGeo, rockMat);
      armR.position.set(1.62, 2.1, 0.15);
      group.add(legL, legR, torso, chestCore, head, visor, armL, armR);
    } else if (type === 'SHADOW_DRAGON') {
      const scaleMat = this.getMat('drag_scale', () => new THREE.MeshStandardMaterial({ color: 0x4e21a3, roughness: 0.65 }));
      const wingMat = this.getMat('drag_wing', () => new THREE.MeshStandardMaterial({
        color: 0x7e22ce,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.7,
        side: THREE.DoubleSide,
      }));
      const eyeMat = this.getMat('drag_eye', () => new THREE.MeshBasicMaterial({ color: 0xf43f5e }));
      const body = new THREE.Mesh(this.getBoxGeo(1.8, 1.4, 4.4), scaleMat);
      const neck = new THREE.Mesh(this.getBoxGeo(0.85, 0.85, 2.2), scaleMat);
      neck.position.set(0, 0.75, 2.7);
      neck.rotation.x = -0.35;
      const head = new THREE.Mesh(this.getBoxGeo(1.1, 0.9, 1.5), scaleMat);
      head.position.set(0, 1.25, 3.8);
      const eyeGeo = this.getBoxGeo(0.2, 0.15, 0.2);
      const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
      eyeL.position.set(-0.4, 1.35, 4.4);
      const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
      eyeR.position.set(0.4, 1.35, 4.4);
      const tail = new THREE.Mesh(this.getGeo('drag_tail', () => new THREE.ConeGeometry(0.7, 4.5, 5)), scaleMat);
      tail.rotation.x = -Math.PI / 2;
      tail.position.set(0, 0.1, -4.1);
      const wingGeo = this.getGeo('drag_wing_geo', () => new THREE.PlaneGeometry(5.6, 3.2));
      const wingL = new THREE.Mesh(wingGeo, wingMat);
      wingL.rotation.x = Math.PI / 2;
      wingL.position.set(-3.6, 0.5, 0.2);
      wingL.name = 'wingL';
      const wingR = new THREE.Mesh(wingGeo, wingMat);
      wingR.rotation.x = Math.PI / 2;
      wingR.position.set(3.6, 0.5, 0.2);
      wingR.name = 'wingR';
      group.add(body, neck, head, eyeL, eyeR, tail, wingL, wingR);
    } else if (type === 'DARK_BOSS') {
      const armorMat = this.getMat('boss_armor', () => new THREE.MeshStandardMaterial({ color: 0x2e304c, metalness: 0.55, roughness: 0.35 }));
      const crimsonGlow = this.getMat('boss_crimson', () => new THREE.MeshStandardMaterial({
        color: 0xf43f5e,
        emissive: 0xe11d48,
        emissiveIntensity: 2.2,
      }));
      const purpleGlow = this.getMat('boss_purple', () => new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0x9333ea,
        emissiveIntensity: 1.8,
      }));

      const legGeo = this.getBoxGeo(0.85, 2.2, 0.9);
      const legL = new THREE.Mesh(legGeo, armorMat);
      legL.position.set(-0.75, 1.1, 0);
      const legR = new THREE.Mesh(legGeo, armorMat);
      legR.position.set(0.75, 1.1, 0);
      const torso = new THREE.Mesh(this.getBoxGeo(2.6, 2.6, 1.6), armorMat);
      torso.position.y = 3.4;
      const core = new THREE.Mesh(this.getGeo('boss_core', () => new THREE.OctahedronGeometry(0.65, 0)), crimsonGlow);
      core.position.set(0, 3.5, 0.85);
      const head = new THREE.Mesh(this.getBoxGeo(1.15, 1.25, 1.15), armorMat);
      head.position.y = 5.35;
      const visor = new THREE.Mesh(this.getBoxGeo(0.85, 0.18, 0.12), crimsonGlow);
      visor.position.set(0, 5.45, 0.6);

      const hornGeo = this.getGeo('boss_horn', () => new THREE.ConeGeometry(0.22, 1.35, 5));
      const hornL = new THREE.Mesh(hornGeo, purpleGlow);
      hornL.position.set(-0.55, 6.3, 0);
      hornL.rotation.z = 0.35;
      const hornR = new THREE.Mesh(hornGeo, purpleGlow);
      hornR.position.set(0.55, 6.3, 0);
      hornR.rotation.z = -0.35;

      const wingGeo = this.getBoxGeo(3.4, 2.4, 0.12);
      const wingL = new THREE.Mesh(wingGeo, crimsonGlow);
      wingL.position.set(-2.4, 4.1, -0.7);
      wingL.rotation.y = -0.35;
      const wingR = new THREE.Mesh(wingGeo, crimsonGlow);
      wingR.position.set(2.4, 4.1, -0.7);
      wingR.rotation.y = 0.35;

      const sword = new THREE.Mesh(this.getBoxGeo(0.24, 3.8, 0.12), crimsonGlow);
      sword.position.set(1.85, 2.8, 1.1);
      sword.rotation.x = Math.PI * 0.35;

      group.add(legL, legR, torso, core, head, visor, hornL, hornR, wingL, wingR, sword);
    }
  }

  private buildProjectilePool(): void {
    const geo = new THREE.SphereGeometry(0.2, 8, 8);
    for (let i = 0; i < 42; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      this.group.add(mesh);
      this.projectiles.push({
        mesh,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        fromPlayerTeam: true,
        damage: 25,
        life: 0,
        active: false,
      });
    }
  }

  private buildLootPool(): void {
    const geo = new THREE.OctahedronGeometry(0.32, 0);
    for (let i = 0; i < 36; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xc084fc,
        emissive: 0x9333ea,
        emissiveIntensity: 1.8,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      this.group.add(mesh);
      this.lootDrops.push({
        mesh,
        pos: new THREE.Vector3(),
        kind: 'crystal',
        amount: 1,
        life: 0,
        active: false,
      });
    }
  }

  public spawnProjectile(
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    speed: number,
    damage: number,
    fromPlayerTeam: boolean,
    color: number
  ): void {
    const slot = this.projectiles.find((p) => !p.active);
    if (!slot) return;
    slot.active = true;
    slot.fromPlayerTeam = fromPlayerTeam;
    slot.damage = damage;
    slot.life = 2.6;
    slot.pos.copy(origin);
    slot.vel.copy(dir).normalize().multiplyScalar(speed);
    (slot.mesh.material as THREE.MeshBasicMaterial).color.setHex(color);
    slot.mesh.position.copy(origin);
    slot.mesh.visible = true;
    this.onProjectileFired?.(fromPlayerTeam, color === 0xc084fc || color === 0xf97316);
  }

  private spawnLootDrop(pos: THREE.Vector3, type: DarkMonsterType): void {
    const slot = this.lootDrops.find((d) => !d.active);
    if (!slot) return;

    let kind: LootDrop['kind'] = 'crystal';
    let color = 0xc084fc;
    let amount = 1;
    if (type === 'DARK_BOSS') {
      kind = 'essence';
      color = 0xf43f5e;
      amount = 10;
    } else if (type === 'SHADOW_DRAGON' || type === 'STONE_GOLEM') {
      kind = 'essence';
      color = 0xc084fc;
      amount = 2;
    } else if (type === 'ZOMBIE' || type === 'GIANT_SPIDER') {
      kind = Math.random() > 0.45 ? 'crystal' : 'food';
      color = kind === 'crystal' ? 0xc084fc : 0xfb923c;
    } else if (type === 'SKELETON_ARCHER') {
      kind = 'arrows';
      color = 0xfbbf24;
      amount = 5;
    }

    slot.active = true;
    slot.kind = kind;
    slot.amount = amount;
    slot.life = 45;
    slot.pos.set(pos.x, pos.y + 0.65, pos.z);
    const mat = slot.mesh.material as THREE.MeshStandardMaterial;
    mat.color.setHex(color);
    mat.emissive.setHex(color);
    slot.mesh.position.copy(slot.pos);
    slot.mesh.visible = true;
  }

  public collectNearbyLoot(
    playerPos: THREE.Vector3,
    onCollect: (kind: LootDrop['kind'], amount: number) => void
  ): void {
    for (const d of this.lootDrops) {
      if (!d.active) continue;
      if (d.pos.distanceTo(playerPos) < 2.8) {
        d.active = false;
        d.mesh.visible = false;
        onCollect(d.kind, d.amount);
      }
    }
  }

  public onMonsterDamaged?: (spawn: MonsterSpawnData, dmg: number, died: boolean) => void;

  public damageMonster(
    spawn: MonsterSpawnData,
    dmg: number,
    killerCompanionName?: string,
    fromRemote: boolean = false
  ): boolean {
    if (!spawn.alive) return false;
    spawn.hp = Math.max(0, spawn.hp - dmg);
    spawn.hitFlash = 0.2;

    const died = spawn.hp <= 0;
    if (died) {
      spawn.alive = false;
      spawn.hp = 0;

      // Hide rig & release slot so monster visibly vanishes
      if (spawn.type === 'SHADOW_DRAGON' && spawn.rigIndex >= 0) {
        this.dragonRigs[spawn.rigIndex].group.visible = false;
      } else if (spawn.type === 'DARK_BOSS' && this.bossRig) {
        this.bossRig.group.visible = false;
      } else if (spawn.rigIndex >= 0) {
        const rig = this.monsterRigs[spawn.rigIndex];
        rig.group.visible = false;
        rig.assignedSpawnId = -1;
        spawn.rigIndex = -1;
      }

      // Respawn elsewhere after timer (non-boss monsters)
      if (spawn.type !== 'DARK_BOSS') {
        spawn.respawnTimer = 32;
        const shiftAng = Math.random() * Math.PI * 2;
        const shiftDist = 22 + Math.random() * 28;
        const nx = THREE.MathUtils.clamp(spawn.homePos.x + Math.cos(shiftAng) * shiftDist, -480, 480);
        const nz = THREE.MathUtils.clamp(spawn.homePos.z + Math.sin(shiftAng) * shiftDist, -480, 480);
        const ny = spawn.type === 'SHADOW_DRAGON' ? 42 : this.terrain.getMeshHeightAt(nx, nz);
        spawn.homePos.set(nx, ny, nz);
      }

      this.spawnLootDrop(spawn.pos, spawn.type);
      this.onMonsterKilled?.(spawn.type, spawn.pos.clone(), killerCompanionName);
    }

    if (!fromRemote) {
      this.onMonsterDamaged?.(spawn, dmg, died);
    }
    return died;
  }

  public applyRemoteMonsterState(
    spawnId: number,
    hp: number,
    alive: boolean,
    x?: number,
    y?: number,
    z?: number
  ): void {
    const spawn = this.spawns.find((s) => s.id === spawnId);
    if (!spawn) return;

    if (!alive || hp <= 0) {
      if (spawn.alive) {
        this.damageMonster(spawn, spawn.hp + 9999, undefined, true);
      } else {
        spawn.hp = 0;
        spawn.alive = false;
      }
      return;
    }

    spawn.hp = Math.min(spawn.maxHp, hp);
    spawn.alive = true;
    spawn.hitFlash = 0.16;
    if (typeof x === 'number' && typeof z === 'number') {
      const groundY = typeof y === 'number' ? y : this.terrain.getMeshHeightAt(x, z);
      spawn.pos.set(x, groundY, z);
    }
  }

  public damageEnemiesInArc(
    playerPos: THREE.Vector3,
    facingAngle: number,
    range: number,
    damage: number,
    allAround: boolean = false
  ): number {
    const fwdX = Math.sin(facingAngle);
    const fwdZ = Math.cos(facingAngle);
    let hits = 0;

    for (const sp of this.spawns) {
      if (!sp.alive) continue;
      const dx = sp.pos.x - playerPos.x;
      const dz = sp.pos.z - playerPos.z;
      const dy = Math.abs(sp.pos.y - playerPos.y);
      const dist = Math.hypot(dx, dz);
      const extraRadius = sp.type === 'DARK_BOSS' || sp.type === 'STONE_GOLEM' ? 2.2 : 0.7;
      if (dist > range + extraRadius || dy > 5.5) continue;

      if (!allAround && dist > 0.4) {
        const dot = (dx * fwdX + dz * fwdZ) / dist;
        if (dot < 0.05) continue;
      }
      this.damageMonster(sp, damage);
      hits++;
    }
    return hits;
  }

  public getNearestEnemy(pos: THREE.Vector3, maxDist: number): MonsterSpawnData | null {
    let best: MonsterSpawnData | null = null;
    let bestD = maxDist;
    for (const sp of this.spawns) {
      if (!sp.alive) continue;
      const d = sp.pos.distanceTo(pos);
      if (d < bestD) {
        bestD = d;
        best = sp;
      }
    }
    return best;
  }

  public getActiveBossHudInfo(playerPos: THREE.Vector3): {
    nameEn: string;
    nameAr: string;
    hp: number;
    maxHp: number;
  } | null {
    let closest: MonsterSpawnData | null = null;
    let minD = 58;
    for (const sp of this.spawns) {
      if (!sp.alive) continue;
      if (sp.type !== 'DARK_BOSS' && sp.type !== 'SHADOW_DRAGON' && sp.type !== 'STONE_GOLEM') continue;
      const d = sp.pos.distanceTo(playerPos);
      if (d < minD) {
        minD = d;
        closest = sp;
      }
    }
    if (!closest) return null;
    if (closest.type === 'DARK_BOSS') {
      return {
        nameEn: 'MALAKOR · DARK BOSS OF ECLIPSE',
        nameAr: 'مالاكور · زعيم الظلام النهائي',
        hp: closest.hp,
        maxHp: closest.maxHp,
      };
    }
    if (closest.type === 'SHADOW_DRAGON') {
      return {
        nameEn: 'SHADOW WYVERN DRAGON',
        nameAr: 'تنين الظلال السماوي',
        hp: closest.hp,
        maxHp: closest.maxHp,
      };
    }
    return {
      nameEn: 'AMETHYST STONE GOLEM',
      nameAr: 'عملاق الصخر البنفسجي',
      hp: closest.hp,
      maxHp: closest.maxHp,
    };
  }

  public update(
    dt: number,
    timeSec: number,
    playerPos: THREE.Vector3,
    cameraPos: THREE.Vector3,
    playerHpRatio: number
  ): void {
    // 1. Update respawns for killed non-boss monsters
    for (let i = 0; i < this.spawns.length; i++) {
      const sp = this.spawns[i];
      if (!sp.alive && sp.type !== 'DARK_BOSS') {
        sp.respawnTimer -= dt;
        if (sp.respawnTimer <= 0) {
          sp.alive = true;
          sp.hp = sp.maxHp;
          sp.pos.copy(sp.homePos);
          if (sp.type === 'SHADOW_DRAGON' && sp.rigIndex >= 0) {
            this.dragonRigs[sp.rigIndex].group.visible = true;
          }
        }
      }
    }

    // 2. Assign nearest 34 regular monsters to visual rig pool
    this.syncRegularRigPool(playerPos);

    // 3. Update active regular monsters, Dragons, and Final Boss
    for (let i = 0; i < this.spawns.length; i++) {
      const sp = this.spawns[i];
      if (!sp.alive) continue;

      if (sp.type === 'SHADOW_DRAGON') {
        this.updateDragon(sp, dt, timeSec, playerPos);
        continue;
      }
      if (sp.type === 'DARK_BOSS') {
        this.updateBoss(sp, dt, timeSec, playerPos);
        continue;
      }
      if (sp.rigIndex < 0) continue; // Outside visual/active radius

      const rig = this.monsterRigs[sp.rigIndex];
      const dx = playerPos.x - sp.pos.x;
      const dz = playerPos.z - sp.pos.z;
      const dist = Math.hypot(dx, dz);

      if (sp.attackCooldown > 0) sp.attackCooldown -= dt;
      if (sp.hitFlash > 0) sp.hitFlash -= dt;

      if (dist < sp.aggroRange && dist > sp.attackRange * 0.85) {
        const inv = 1 / Math.max(0.01, dist);
        sp.pos.x += dx * inv * sp.speed * dt;
        sp.pos.z += dz * inv * sp.speed * dt;
        sp.pos.y = this.terrain.getMeshHeightAt(sp.pos.x, sp.pos.z);
        rig.group.rotation.y = Math.atan2(dx, dz);
      } else if (dist <= sp.attackRange && sp.attackCooldown <= 0) {
        rig.group.rotation.y = Math.atan2(dx, dz);
        if (sp.type === 'SKELETON_ARCHER') {
          this.scratchOrigin.set(sp.pos.x, sp.pos.y + 1.2, sp.pos.z);
          this.scratchVec.set(dx, playerPos.y + 1.0 - (sp.pos.y + 1.2), dz);
          this.spawnProjectile(
            this.scratchOrigin,
            this.scratchVec,
            24,
            sp.damage,
            false,
            0xe2e8f0
          );
          sp.attackCooldown = 2.1;
        } else {
          this.onPlayerDamaged?.(sp.damage, sp.type);
          sp.attackCooldown = 1.45;
        }
      }

      rig.group.position.copy(sp.pos);
      if (sp.hitFlash > 0) {
        rig.group.scale.setScalar(1.08);
      } else {
        rig.group.scale.setScalar(1.0);
      }
    }

    // 4. Update 3 Shared AI Companions
    this.updateCompanions(dt, timeSec, playerPos, cameraPos, playerHpRatio);

    // 5. Update Projectiles
    this.updateProjectiles(dt, playerPos);

    // 6. Spin & float active loot drops
    for (const d of this.lootDrops) {
      if (!d.active) continue;
      d.life -= dt;
      if (d.life <= 0) {
        d.active = false;
        d.mesh.visible = false;
        continue;
      }
      d.mesh.rotation.y += dt * 2.5;
      d.mesh.position.y = d.pos.y + Math.sin(timeSec * 3.5) * 0.14;
    }
  }

  private syncRegularRigPool(playerPos: THREE.Vector3): void {
    const candidates = this.rigCandidates;
    candidates.length = 0;
    for (let i = 0; i < this.spawns.length; i++) {
      const sp = this.spawns[i];
      if (!sp.alive || sp.type === 'SHADOW_DRAGON' || sp.type === 'DARK_BOSS') continue;
      const dx = sp.pos.x - playerPos.x;
      const dz = sp.pos.z - playerPos.z;
      const dSq = dx * dx + dz * dz;
      if (dSq < 115 * 115) {
        candidates.push({ spawn: sp, distSq: dSq });
      } else if (sp.rigIndex >= 0) {
        const rig = this.monsterRigs[sp.rigIndex];
        rig.group.visible = false;
        rig.assignedSpawnId = -1;
        sp.rigIndex = -1;
      }
    }

    candidates.sort((a, b) => a.distSq - b.distSq);
    const keepIds = this.keepRigIds;
    keepIds.clear();
    const maxCount = Math.min(this.poolSize, candidates.length);
    for (let i = 0; i < maxCount; i++) {
      keepIds.add(candidates[i].spawn.id);
    }

    // Release rigs whose spawns are no longer in top 34
    for (const rig of this.monsterRigs) {
      if (rig.assignedSpawnId !== -1 && !keepIds.has(rig.assignedSpawnId)) {
        const oldSpawn = this.spawns.find((s) => s.id === rig.assignedSpawnId);
        if (oldSpawn) oldSpawn.rigIndex = -1;
        rig.assignedSpawnId = -1;
        rig.group.visible = false;
      }
    }

    // Assign free rigs to top candidates without a rig
    for (let i = 0; i < maxCount; i++) {
      const sp = candidates[i].spawn;
      if (sp.rigIndex >= 0) continue;
      const freeIdx = this.monsterRigs.findIndex((r) => r.assignedSpawnId === -1);
      if (freeIdx === -1) break;
      const rig = this.monsterRigs[freeIdx];
      rig.assignedSpawnId = sp.id;
      sp.rigIndex = freeIdx;
      if (rig.currentType !== sp.type) {
        this.populateRigGeometry(rig.group, sp.type);
        rig.currentType = sp.type;
      }
      rig.group.position.copy(sp.pos);
      rig.group.visible = true;
    }
  }

  private updateDragon(sp: MonsterSpawnData, dt: number, timeSec: number, playerPos: THREE.Vector3): void {
    const rig = this.dragonRigs[sp.rigIndex];
    if (!rig) return;

    sp.orbitAngle += dt * 0.42;
    const tx = sp.homePos.x + Math.cos(sp.orbitAngle) * 32;
    const tz = sp.homePos.z + Math.sin(sp.orbitAngle) * 26;
    const ty = sp.homePos.y + Math.sin(timeSec * 1.4 + sp.id) * 4.5;

    const prevX = sp.pos.x;
    const prevZ = sp.pos.z;
    sp.pos.set(tx, ty, tz);
    rig.group.position.copy(sp.pos);
    rig.group.rotation.y = Math.atan2(tx - prevX, tz - prevZ);

    const wingL = rig.group.getObjectByName('wingL');
    const wingR = rig.group.getObjectByName('wingR');
    const flap = Math.sin(timeSec * 6.5 + sp.id) * 0.35;
    if (wingL) wingL.rotation.z = flap;
    if (wingR) wingR.rotation.z = -flap;

    if (sp.attackCooldown > 0) sp.attackCooldown -= dt;
    const dist = sp.pos.distanceTo(playerPos);
    if (dist < sp.aggroRange && sp.attackCooldown <= 0) {
      this.scratchDir.set(playerPos.x - sp.pos.x, playerPos.y + 1.0 - sp.pos.y, playerPos.z - sp.pos.z);
      this.spawnProjectile(sp.pos, this.scratchDir, 28, sp.damage, false, 0xc084fc);
      sp.attackCooldown = 3.2;
    }
  }

  private updateBoss(sp: MonsterSpawnData, dt: number, timeSec: number, playerPos: THREE.Vector3): void {
    if (!this.bossRig) return;
    const dx = playerPos.x - sp.pos.x;
    const dz = playerPos.z - sp.pos.z;
    const dist = Math.hypot(dx, dz);

    if (sp.attackCooldown > 0) sp.attackCooldown -= dt;

    if (dist < sp.aggroRange) {
      this.bossRig.group.rotation.y = Math.atan2(dx, dz);
      if (dist > 4.2) {
        const inv = 1 / Math.max(0.01, dist);
        sp.pos.x += dx * inv * sp.speed * dt;
        sp.pos.z += dz * inv * sp.speed * dt;
        sp.pos.y = this.terrain.getMeshHeightAt(sp.pos.x, sp.pos.z);
      }

      if (sp.attackCooldown <= 0) {
        if (dist <= 5.2) {
          this.onPlayerDamaged?.(sp.damage, 'DARK_BOSS');
          sp.attackCooldown = 1.8;
        } else if (dist < 32) {
          // Malakor hurls crimson eclipse bolts
          this.scratchOrigin.set(sp.pos.x, sp.pos.y + 3.2, sp.pos.z);
          this.scratchDir.set(dx, playerPos.y + 1.0 - (sp.pos.y + 3.2), dz);
          this.spawnProjectile(
            this.scratchOrigin,
            this.scratchDir,
            26,
            24,
            false,
            0xf43f5e
          );
          sp.attackCooldown = 2.4;
        }
      }
    } else {
      // Hover idle menace inside throne courtyard
      sp.pos.y = this.terrain.getMeshHeightAt(sp.pos.x, sp.pos.z) + Math.sin(timeSec * 1.5) * 0.15;
    }
    this.bossRig.group.position.copy(sp.pos);
  }

  private updateCompanions(
    dt: number,
    timeSec: number,
    playerPos: THREE.Vector3,
    cameraPos: THREE.Vector3,
    playerHpRatio: number
  ): void {
    for (const c of this.companions) {
      if (c.actionCooldown > 0) c.actionCooldown -= dt;
      if (c.healCooldown > 0) c.healCooldown -= dt;
      if (c.slashTimer > 0) {
        c.slashTimer = Math.max(0, c.slashTimer - dt);
        c.shared.slashMaterial.opacity = (c.slashTimer / 0.25) * 0.85;
        c.shared.rightArm.rotation.x = -1.35 * (c.slashTimer / 0.25);
      } else {
        c.shared.slashMaterial.opacity = 0;
      }

      c.shared.nameplateGroup.lookAt(cameraPos);
      c.shared.staffCrystal.rotation.y += dt * 2.2;

      const prevX = c.pos.x;
      const prevZ = c.pos.z;

      // 1. Lyra heals hero automatically if HP drops below 65%
      if (c.id === 'mage' && playerHpRatio < 0.65 && c.healCooldown <= 0) {
        c.healCooldown = 14;
        this.onCompanionHealedPlayer?.(c.nameAr, 22);
      }

      // 2. Check combat target near companion or hero
      const enemy = this.getNearestEnemy(playerPos, this.companionMode === 'GUARD' ? 14 : 26);

      if (enemy && this.companionMode !== 'GUARD') {
        const dx = enemy.pos.x - c.pos.x;
        const dz = enemy.pos.z - c.pos.z;
        const dist = Math.hypot(dx, dz);
        const desiredRange = c.id === 'warrior' ? 2.4 : 13.0;

        if (dist > desiredRange) {
          const inv = 1 / Math.max(0.01, dist);
          c.pos.x += dx * inv * 7.2 * dt;
          c.pos.z += dz * inv * 7.2 * dt;
          c.facing = Math.atan2(dx, dz);
        } else if (c.actionCooldown <= 0) {
          c.facing = Math.atan2(dx, dz);
          if (c.id === 'warrior') {
            this.damageMonster(enemy, 18, c.nameAr);
            c.actionCooldown = 1.25;
            c.slashTimer = 0.25;
            c.shared.rightArm.rotation.x = -1.35;
          } else {
            const color = c.id === 'mage' ? 0xc084fc : 0x4ade80;
            this.scratchOrigin.set(c.pos.x, c.pos.y + 1.3, c.pos.z);
            this.scratchDir.set(
              enemy.pos.x - c.pos.x,
              enemy.pos.y + 1.0 - this.scratchOrigin.y,
              enemy.pos.z - c.pos.z
            );
            this.spawnProjectile(this.scratchOrigin, this.scratchDir, 32, c.id === 'mage' ? 20 : 17, true, color);
            c.actionCooldown = 1.55;
            c.slashTimer = 0.22;
            c.shared.rightArm.rotation.x = -0.9;
          }
        }
      } else if (this.companionMode === 'EXPLORE_GATHER') {
        // Explore & gather nearest tree/rock/bush independently!
        c.gatherTimer -= dt;
        c.wanderTimer -= dt;
        if (c.wanderTimer <= 0) {
          c.wanderTimer = 5;
          const ang = Math.random() * Math.PI * 2;
          c.wanderTarget.set(playerPos.x + Math.cos(ang) * 16, playerPos.y, playerPos.z + Math.sin(ang) * 16);
        }
        const dx = c.wanderTarget.x - c.pos.x;
        const dz = c.wanderTarget.z - c.pos.z;
        const dist = Math.hypot(dx, dz);
        if (dist > 1.5) {
          c.pos.x += (dx / dist) * 5.2 * dt;
          c.pos.z += (dz / dist) * 5.2 * dt;
          c.facing = Math.atan2(dx, dz);
        }
        if (c.gatherTimer <= 0) {
          c.gatherTimer = 9 + Math.random() * 5;
          const resKinds: ResourceKind[] = ['wood', 'stone', 'food', 'iron'];
          const picked = resKinds[Math.floor(Math.random() * resKinds.length)];
          this.onCompanionGathered?.(c.nameAr, picked, 1);
        }
      } else {
        // Follow player cleanly in V formation
        const targetX = playerPos.x + Math.cos(c.offsetAngle) * 3.0;
        const targetZ = playerPos.z + Math.sin(c.offsetAngle) * 3.0;
        const dx = targetX - c.pos.x;
        const dz = targetZ - c.pos.z;
        const dist = Math.hypot(dx, dz);
        if (dist > 1.2) {
          const speed = dist > 18 ? 14.0 : 6.8;
          c.pos.x += (dx / dist) * speed * dt;
          c.pos.z += (dz / dist) * speed * dt;
          c.facing = Math.atan2(dx, dz);
        }
      }

      // Snap companion onto ground or floating island deck
      const groundY = this.terrain.getMeshHeightAt(c.pos.x, c.pos.z);
      const structY = this.terrain.getStructureHeightAt(c.pos.x, c.pos.z, c.pos.y);
      c.pos.y = structY !== null ? Math.max(groundY, structY) : groundY;

      c.shared.group.position.copy(c.pos);
      let diff = c.facing - c.shared.pivotGroup.rotation.y;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      c.shared.pivotGroup.rotation.y += diff * Math.min(1.0, dt * 10);

      const movedDist = Math.hypot(c.pos.x - prevX, c.pos.z - prevZ);
      if (movedDist > 0.005) {
        c.animTime += dt * 7.5;
        const swing = Math.sin(c.animTime);
        c.shared.leftLeg.rotation.x = swing * 0.58;
        c.shared.rightLeg.rotation.x = -swing * 0.58;
        c.shared.leftArm.rotation.x = -swing * 0.42;
        if (c.slashTimer <= 0) c.shared.rightArm.rotation.x = swing * 0.42;
      } else {
        c.shared.leftLeg.rotation.x = THREE.MathUtils.lerp(c.shared.leftLeg.rotation.x, 0, 0.2);
        c.shared.rightLeg.rotation.x = THREE.MathUtils.lerp(c.shared.rightLeg.rotation.x, 0, 0.2);
        c.shared.leftArm.rotation.x = Math.sin(timeSec * 2.0) * 0.04;
        if (c.slashTimer <= 0) {
          c.shared.rightArm.rotation.x = -Math.sin(timeSec * 2.0) * 0.04;
        }
      }
    }
  }

  private updateProjectiles(dt: number, playerPos: THREE.Vector3): void {
    for (const p of this.projectiles) {
      if (!p.active) continue;
      p.life -= dt;
      if (p.life <= 0) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }

      p.pos.addScaledVector(p.vel, dt);
      p.mesh.position.copy(p.pos);

      if (p.fromPlayerTeam) {
        for (const sp of this.spawns) {
          if (!sp.alive) continue;
          const hitRad = sp.type === 'DARK_BOSS' || sp.type === 'SHADOW_DRAGON' ? 3.2 : 1.35;
          if (Math.hypot(p.pos.x - sp.pos.x, p.pos.z - sp.pos.z) < hitRad && Math.abs(p.pos.y - (sp.pos.y + 1.0)) < 2.8) {
            this.damageMonster(sp, p.damage);
            p.active = false;
            p.mesh.visible = false;
            break;
          }
        }
      } else {
        if (Math.hypot(p.pos.x - playerPos.x, p.pos.z - playerPos.z) < 1.05 && Math.abs(p.pos.y - (playerPos.y + 1.0)) < 1.5) {
          this.onPlayerDamaged?.(p.damage, 'SKELETON_ARCHER');
          p.active = false;
          p.mesh.visible = false;
        }
      }
    }
  }

  public getMinimapMonsters(): Array<{ x: number; z: number; isBoss: boolean }> {
    const out: Array<{ x: number; z: number; isBoss: boolean }> = [];
    for (const sp of this.spawns) {
      if (!sp.alive) continue;
      if (sp.rigIndex >= 0 || sp.type === 'DARK_BOSS' || sp.type === 'SHADOW_DRAGON') {
        out.push({
          x: sp.pos.x,
          z: sp.pos.z,
          isBoss: sp.type === 'DARK_BOSS' || sp.type === 'SHADOW_DRAGON' || sp.type === 'STONE_GOLEM',
        });
      }
    }
    return out;
  }

  public resetAll(): void {
    for (const sp of this.spawns) {
      sp.alive = true;
      sp.hp = sp.maxHp;
      sp.respawnTimer = 0;
      sp.pos.copy(sp.homePos);
      if (sp.type === 'SHADOW_DRAGON' && sp.rigIndex >= 0) {
        this.dragonRigs[sp.rigIndex].group.visible = true;
      }
      if (sp.type === 'DARK_BOSS' && this.bossRig) {
        this.bossRig.group.visible = true;
      }
    }
  }

  public dispose(): void {
    for (const p of this.projectiles) {
      (p.mesh.material as THREE.Material).dispose();
    }
    for (const d of this.lootDrops) {
      (d.mesh.material as THREE.Material).dispose();
    }
    for (const g of this.sharedGeos.values()) {
      g.dispose();
    }
    for (const m of this.sharedMats.values()) {
      m.dispose();
    }
    this.sharedGeos.clear();
    this.sharedMats.clear();
  }
}
