/**
 * ECHO – THE WORLD REMEMBERS
 * NPC & Creature Manager (نظام الشخصيات والمخلوقات التفاعلية في العالم)
 *
 * Implements:
 * 1. The Mysterious Forest Wanderer (عابر الغابة الغامض):
 *    - Visually matches reference image (hooded traveler cloak, wooden staff with glowing turquoise crystal)
 *    - Roams the whispering pine forest, pauses, notices player, turns and communes
 *    - Dynamic dialogue adapting to quest progress and ECHO MEMORY behavior
 *
 * 2. The Ancient Temple Guardian (حارس المعبد القديم):
 *    - Ancient megalithic stone sentinel with glowing carved runes and chest core
 *    - Guards the temple entrance steps, challenges the player until memory shards are collected
 *
 * 3. Ethereal Forest Spirit Creatures (ظباء الضياء الأثيرية):
 *    - Luminous crystal stags with glowing antlers and floating wisps
 *    - Roams and grazes peacefully; flees if player sprints, but allows gentle approach to pet/commune
 *
 * 4. Local AI State Machine:
 *    - Proximity player awareness, path patrol with smooth terrain height conform,
 *      interactive dialogue trees with branching choices (Arabic & English),
 *      and memory-aware reactions.
 */

import * as THREE from 'three';
import { Terrain } from '../world/Terrain.ts';
import { PooledPointLightProxy } from '../world/WorldLightPool.ts';
import { SoundSynth } from '../audio/SoundSynth.ts';
import { QuestSystem } from '../story/QuestSystem.ts';
import { EchoMemorySystem } from '../world/EchoMemorySystem.ts';

const _npcScratchA = new THREE.Vector3();
const _npcScratchB = new THREE.Vector3();

export type NPCType = 'WANDERER' | 'GUARDIAN' | 'CREATURE';

export interface DialogueOption {
  textAr: string;
  textEn: string;
  nextDialogueId?: string;
  action?:
    | 'QUEST_HINT'
    | 'LORE_REVEAL'
    | 'PET_CREATURE'
    | 'BLESSING'
    | 'COMPANION_ASSIST'
    | 'COMPANION_FOLLOW'
    | 'COMPANION_PING'
    | 'COMPANION_HEAL'
    | 'CLOSE';
}

export interface DialogueNode {
  id: string;
  speakerNameAr: string;
  speakerNameEn: string;
  titleAr: string;
  titleEn: string;
  portraitUrl: string;
  messageAr: string;
  messageEn: string;
  options: DialogueOption[];
}

export interface InteractiveNPCInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  type: NPCType;
  actionPromptAr: string;
  actionPromptEn: string;
  position: THREE.Vector3;
  distance: number;
}

// ========================================================
// 1. FOREST WANDERER (عابر الغابة الغامض)
// ========================================================
class ForestWanderer {
  public group: THREE.Group;
  public id: string = 'wanderer_forest';
  public nameAr: string = 'عابر الغابة الغامض';
  public nameEn: string = 'The Shrouded Wanderer';
  public titleAr: string = 'حارس أسرار الغابة الهامسة';
  public titleEn: string = 'Keeper of the Whispering Forest';
  public portraitUrl: string = './assets/aistudio/902496527_1823591332005868_4146964911404786464_n_35a4a4fd.jpg';

  private waypoints: THREE.Vector3[] = [
    new THREE.Vector3(-30, 0, 42),
    new THREE.Vector3(-22, 0, 36),
    new THREE.Vector3(-38, 0, 52),
    new THREE.Vector3(-28, 0, 48),
  ];
  private currentWaypointIdx: number = 0;
  private moveSpeed: number = 1.15;
  private state: 'PATROL' | 'WAITING' | 'NOTICED' | 'TALKING' = 'PATROL';
  private stateTimer: number = 0;

  // Mesh hierarchy
  private bodyMesh: THREE.Mesh;
  private cloakMesh: THREE.Mesh;
  private hoodMesh: THREE.Mesh;
  private eyeLeft: THREE.Mesh;
  private eyeRight: THREE.Mesh;
  private staffGroup: THREE.Group;
  private crystalLight: PooledPointLightProxy;
  private staffCrystalMesh: THREE.Mesh;
  private wisps: THREE.Mesh[] = [];

  constructor(private terrain: Terrain) {
    this.group = new THREE.Group();
    this.group.name = 'ForestWanderer';

    // Materials
    const cloakMat = new THREE.MeshStandardMaterial({
      color: 0x181c24, // Dark charcoal tattered fabric
      roughness: 0.9,
      metalness: 0.1,
      bumpScale: 0.05,
    });
    const innerRobeMat = new THREE.MeshStandardMaterial({
      color: 0x0f131a,
      roughness: 0.95,
    });
    const woodStaffMat = new THREE.MeshStandardMaterial({
      color: 0x3d2716, // Gnarled dark wood
      roughness: 0.85,
    });
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 1.6,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.92,
    });
    const eyeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    // Body (inner dark robe)
    const bodyGeom = new THREE.CylinderGeometry(0.24, 0.38, 1.35, 12);
    this.bodyMesh = new THREE.Mesh(bodyGeom, innerRobeMat);
    this.bodyMesh.position.y = 0.68;
    this.bodyMesh.castShadow = true;
    this.group.add(this.bodyMesh);

    // Draped Cowl / Cloak with flared tattered hem
    const cloakGeom = new THREE.ConeGeometry(0.48, 1.45, 12, 1, true);
    this.cloakMesh = new THREE.Mesh(cloakGeom, cloakMat);
    this.cloakMesh.position.y = 0.72;
    this.cloakMesh.castShadow = true;
    this.group.add(this.cloakMesh);

    // Hood (rounded cowl hiding facial features)
    const hoodGeom = new THREE.SphereGeometry(0.26, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.75);
    this.hoodMesh = new THREE.Mesh(hoodGeom, cloakMat);
    this.hoodMesh.position.set(0, 1.48, 0.02);
    this.hoodMesh.rotation.x = 0.15;
    this.group.add(this.hoodMesh);

    // Glowing Cyan Eye Slits (glowing within dark cowl void)
    const eyeGeom = new THREE.SphereGeometry(0.025, 8, 8);
    this.eyeLeft = new THREE.Mesh(eyeGeom, eyeMat);
    this.eyeLeft.position.set(-0.065, 1.45, 0.16);
    this.eyeRight = new THREE.Mesh(eyeGeom, eyeMat);
    this.eyeRight.position.set(0.065, 1.45, 0.16);
    this.group.add(this.eyeLeft, this.eyeRight);

    // Staff (gnarled wooden shepherd's staff with glowing turquoise crystal)
    this.staffGroup = new THREE.Group();
    this.staffGroup.position.set(0.35, 0.0, 0.25);

    // Staff shaft
    const staffShaftGeom = new THREE.CylinderGeometry(0.026, 0.038, 1.95, 8);
    const staffShaft = new THREE.Mesh(staffShaftGeom, woodStaffMat);
    staffShaft.position.y = 0.95;
    staffShaft.castShadow = true;
    this.staffGroup.add(staffShaft);

    // Staff top gnarled crook ring
    const staffHeadGeom = new THREE.TorusGeometry(0.09, 0.022, 8, 16, Math.PI * 1.5);
    const staffHead = new THREE.Mesh(staffHeadGeom, woodStaffMat);
    staffHead.position.set(0, 1.92, 0);
    staffHead.rotation.z = Math.PI * 0.25;
    this.staffGroup.add(staffHead);

    // Staff Floating Crystal
    const crystalGeom = new THREE.OctahedronGeometry(0.08, 0);
    this.staffCrystalMesh = new THREE.Mesh(crystalGeom, crystalMat);
    this.staffCrystalMesh.position.set(0, 1.98, 0);
    this.staffGroup.add(this.staffCrystalMesh);

    // Crystal Point Light
    this.crystalLight = new PooledPointLightProxy(0x00f5d4, 1.8, 6.0);
    this.crystalLight.position.set(0, 1.98, 0);
    this.staffGroup.add(this.crystalLight);

    this.group.add(this.staffGroup);

    // Orbiting Wisps
    const wispGeom = new THREE.SphereGeometry(0.02, 6, 6);
    const wispMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < 3; i++) {
      const wisp = new THREE.Mesh(wispGeom, wispMat);
      this.wisps.push(wisp);
      this.group.add(wisp);
    }

    // Set initial position
    const startWp = this.waypoints[0];
    const groundY = this.terrain.getHeightAt(startWp.x, startWp.z);
    this.group.position.set(startWp.x, groundY, startWp.z);
  }

  public update(dt: number, timeSec: number, playerPos: THREE.Vector3, isTalkingWithMe: boolean): void {
    const distToPlayer = this.group.position.distanceTo(playerPos);

    if (isTalkingWithMe) {
      this.state = 'TALKING';
    } else if (distToPlayer < 9.0) {
      this.state = 'NOTICED';
    } else {
      if (this.state === 'NOTICED' || this.state === 'TALKING') {
        this.state = 'PATROL';
      }
    }

    // 1. Movement & AI State
    if (this.state === 'PATROL') {
      const targetWp = this.waypoints[this.currentWaypointIdx];
      _npcScratchA.set(targetWp.x, 0, targetWp.z);
      _npcScratchB.set(this.group.position.x, 0, this.group.position.z);
      const toWp = _npcScratchA.sub(_npcScratchB);
      const dist = toWp.length();

      if (dist < 0.6) {
        // Reached waypoint, rest a moment
        this.state = 'WAITING';
        this.stateTimer = 2.5 + Math.random() * 2.0;
        this.currentWaypointIdx = (this.currentWaypointIdx + 1) % this.waypoints.length;
      } else {
        toWp.normalize();
        this.group.position.x += toWp.x * this.moveSpeed * dt;
        this.group.position.z += toWp.z * this.moveSpeed * dt;

        // Smoothly rotate towards movement direction
        const targetAngle = Math.atan2(toWp.x, toWp.z);
        this.smoothRotateY(targetAngle, 4.0 * dt);

        // Walking sway animation
        this.bodyMesh.position.y = 0.68 + Math.sin(timeSec * 5.0) * 0.03;
        this.staffGroup.position.y = Math.sin(timeSec * 5.0 + 1.0) * 0.04;
        this.cloakMesh.rotation.z = Math.sin(timeSec * 5.0) * 0.04;
      }
    } else if (this.state === 'WAITING') {
      this.stateTimer -= dt;
      if (this.stateTimer <= 0) {
        this.state = 'PATROL';
      }
      // Idle breathing sway
      this.bodyMesh.position.y = 0.68 + Math.sin(timeSec * 2.0) * 0.015;
    } else if (this.state === 'NOTICED' || this.state === 'TALKING') {
      // Turn towards player gently
      const toPlayer = _npcScratchA.copy(playerPos).sub(this.group.position);
      toPlayer.y = 0;
      if (toPlayer.lengthSq() > 0.01) {
        toPlayer.normalize();
        const targetAngle = Math.atan2(toPlayer.x, toPlayer.z);
        this.smoothRotateY(targetAngle, 5.0 * dt);
      }
      // Staff raises gently as if greeting
      const targetStaffY = isTalkingWithMe ? 0.08 : 0.03;
      this.staffGroup.position.y = THREE.MathUtils.lerp(this.staffGroup.position.y, targetStaffY, dt * 3.0);
    }

    // 2. Keep grounded to terrain
    const groundY = this.terrain.getHeightAt(this.group.position.x, this.group.position.z);
    this.group.position.y = groundY;

    // 3. Crystal float & glow pulsing
    this.staffCrystalMesh.rotation.y = timeSec * 1.5;
    this.staffCrystalMesh.rotation.x = Math.sin(timeSec * 0.8) * 0.2;
    this.staffCrystalMesh.position.y = 1.98 + Math.sin(timeSec * 3.0) * 0.04;
    this.crystalLight.intensity = 1.5 + Math.sin(timeSec * 4.0) * 0.4;

    // 4. Orbiting wisps
    this.wisps.forEach((wisp, i) => {
      const angle = timeSec * 1.2 + (i * Math.PI * 2) / 3;
      const radius = 0.45 + Math.sin(timeSec * 2.0 + i) * 0.1;
      wisp.position.set(
        Math.cos(angle) * radius,
        1.2 + Math.sin(timeSec * 2.5 + i) * 0.25,
        Math.sin(angle) * radius
      );
    });
  }

  private smoothRotateY(targetAngle: number, rate: number): void {
    let diff = targetAngle - this.group.rotation.y;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    this.group.rotation.y += diff * Math.min(1.0, rate);
  }
}

// ========================================================
// 2. ANCIENT TEMPLE GUARDIAN (حارس المعبد القديم)
// ========================================================
class TempleGuardian {
  public group: THREE.Group;
  public id: string = 'guardian_temple';
  public nameAr: string = 'حارس المعبد العتيق';
  public nameEn: string = 'The Ancient Stone Sentinel';
  public titleAr: string = 'حامي محراب الألواح والعهد';
  public titleEn: string = 'Protector of the Sacred Tablets';
  public portraitUrl: string = './assets/aistudio/900710163_2383229942425587_5203725200407765596_n_5dfc21a4.jpg';

  private waypoints: THREE.Vector3[] = [
    new THREE.Vector3(-72, 0, 24),
    new THREE.Vector3(-76, 0, 28),
  ];
  private currentWaypointIdx: number = 0;
  private moveSpeed: number = 0.65;
  private state: 'PATROL' | 'NOTICED' | 'TALKING' = 'PATROL';

  // Mesh hierarchy
  private torsoMesh: THREE.Mesh;
  private headMesh: THREE.Mesh;
  private runeEyeMesh: THREE.Mesh;
  private coreLight: PooledPointLightProxy;
  private coreCrystal: THREE.Mesh;
  private greatSword: THREE.Group;

  constructor(private terrain: Terrain) {
    this.group = new THREE.Group();
    this.group.name = 'TempleGuardian';

    // Materials
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x333b47, // Weathered ancient temple stone
      roughness: 0.9,
      metalness: 0.15,
    });
    const runeGlowMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });
    const darkIronMat = new THREE.MeshStandardMaterial({
      color: 0x242a33,
      roughness: 0.7,
      metalness: 0.6,
    });

    // Torso (Colossal stone block with carved angles)
    const torsoGeom = new THREE.BoxGeometry(0.95, 1.25, 0.65);
    this.torsoMesh = new THREE.Mesh(torsoGeom, stoneMat);
    this.torsoMesh.position.y = 1.35;
    this.torsoMesh.castShadow = true;
    this.group.add(this.torsoMesh);

    // Broad Stone Shoulder Guards
    const shoulderGeom = new THREE.BoxGeometry(0.38, 0.45, 0.48);
    const leftShoulder = new THREE.Mesh(shoulderGeom, stoneMat);
    leftShoulder.position.set(-0.62, 1.78, 0);
    const rightShoulder = new THREE.Mesh(shoulderGeom, stoneMat);
    rightShoulder.position.set(0.62, 1.78, 0);
    this.group.add(leftShoulder, rightShoulder);

    // Stone Arms
    const armGeom = new THREE.BoxGeometry(0.24, 0.95, 0.26);
    const leftArm = new THREE.Mesh(armGeom, stoneMat);
    leftArm.position.set(-0.62, 1.15, 0.08);
    const rightArm = new THREE.Mesh(armGeom, stoneMat);
    rightArm.position.set(0.62, 1.15, 0.08);
    this.group.add(leftArm, rightArm);

    // Head (Megalithic Sentinel Helmet)
    const headGeom = new THREE.BoxGeometry(0.48, 0.48, 0.46);
    this.headMesh = new THREE.Mesh(headGeom, stoneMat);
    this.headMesh.position.set(0, 2.18, 0.04);
    this.headMesh.castShadow = true;
    this.group.add(this.headMesh);

    // Visor Runic Eye Slit
    const eyeGeom = new THREE.BoxGeometry(0.32, 0.065, 0.04);
    this.runeEyeMesh = new THREE.Mesh(eyeGeom, runeGlowMat);
    this.runeEyeMesh.position.set(0, 2.18, 0.28);
    this.group.add(this.runeEyeMesh);

    // Glowing Chest Core Rune
    const coreGeom = new THREE.DodecahedronGeometry(0.12, 0);
    this.coreCrystal = new THREE.Mesh(coreGeom, runeGlowMat);
    this.coreCrystal.position.set(0, 1.45, 0.34);
    this.group.add(this.coreCrystal);

    this.coreLight = new PooledPointLightProxy(0x00f0ff, 2.2, 7.0);
    this.coreLight.position.set(0, 1.45, 0.42);
    this.group.add(this.coreLight);

    // Massive Stone ceremonial Greatsword planted before the sentinel
    this.greatSword = new THREE.Group();
    this.greatSword.position.set(0.42, 0, 0.45);

    const bladeGeom = new THREE.BoxGeometry(0.16, 2.1, 0.05);
    const blade = new THREE.Mesh(bladeGeom, darkIronMat);
    blade.position.y = 1.05;
    blade.castShadow = true;
    this.greatSword.add(blade);

    // Sword Runic Inlay down blade
    const runeInlayGeom = new THREE.PlaneGeometry(0.04, 1.6);
    const runeInlay = new THREE.Mesh(runeInlayGeom, runeGlowMat);
    runeInlay.position.set(0, 1.05, 0.028);
    this.greatSword.add(runeInlay);

    // Crossguard & Pommel
    const guardGeom = new THREE.BoxGeometry(0.48, 0.08, 0.09);
    const guard = new THREE.Mesh(guardGeom, stoneMat);
    guard.position.y = 2.1;
    this.greatSword.add(guard);

    const hiltGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.38, 8);
    const hilt = new THREE.Mesh(hiltGeom, darkIronMat);
    hilt.position.y = 2.32;
    this.greatSword.add(hilt);

    this.group.add(this.greatSword);

    // Set initial position
    const startWp = this.waypoints[0];
    const groundY = this.terrain.getHeightAt(startWp.x, startWp.z);
    this.group.position.set(startWp.x, groundY, startWp.z);
  }

  public update(dt: number, timeSec: number, playerPos: THREE.Vector3, isTalkingWithMe: boolean): void {
    const distToPlayer = this.group.position.distanceTo(playerPos);

    if (isTalkingWithMe) {
      this.state = 'TALKING';
    } else if (distToPlayer < 11.0) {
      this.state = 'NOTICED';
    } else {
      this.state = 'PATROL';
    }

    if (this.state === 'PATROL') {
      const targetWp = this.waypoints[this.currentWaypointIdx];
      _npcScratchA.set(targetWp.x, 0, targetWp.z);
      _npcScratchB.set(this.group.position.x, 0, this.group.position.z);
      const toWp = _npcScratchA.sub(_npcScratchB);
      const dist = toWp.length();

      if (dist < 0.5) {
        this.currentWaypointIdx = (this.currentWaypointIdx + 1) % this.waypoints.length;
      } else {
        toWp.normalize();
        this.group.position.x += toWp.x * this.moveSpeed * dt;
        this.group.position.z += toWp.z * this.moveSpeed * dt;

        const targetAngle = Math.atan2(toWp.x, toWp.z);
        this.smoothRotateY(targetAngle, 2.5 * dt);

        // Heavy slow step stomp
        this.torsoMesh.position.y = 1.35 + Math.sin(timeSec * 3.0) * 0.04;
      }
    } else if (this.state === 'NOTICED' || this.state === 'TALKING') {
      const toPlayer = _npcScratchA.copy(playerPos).sub(this.group.position);
      toPlayer.y = 0;
      if (toPlayer.lengthSq() > 0.01) {
        toPlayer.normalize();
        const targetAngle = Math.atan2(toPlayer.x, toPlayer.z);
        this.smoothRotateY(targetAngle, 3.5 * dt);
      }
      this.torsoMesh.position.y = 1.35 + Math.sin(timeSec * 1.5) * 0.02;
    }

    // Keep grounded
    const groundY = this.terrain.getHeightAt(this.group.position.x, this.group.position.z);
    this.group.position.y = groundY;

    // Core pulsing
    const pulse = Math.sin(timeSec * 3.0);
    this.coreLight.intensity = 2.0 + pulse * 0.7;
    this.coreCrystal.rotation.y = timeSec * 0.8;
  }

  private smoothRotateY(targetAngle: number, rate: number): void {
    let diff = targetAngle - this.group.rotation.y;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    this.group.rotation.y += diff * Math.min(1.0, rate);
  }
}

// ========================================================
// ========================================================
// 3. FOREST SPIRIT CREATURE (مخلوقات الغابة الأثيرية المتنوعة)
// ========================================================
export type CreatureSpecies = 'STAG' | 'FOX' | 'OWL' | 'RABBIT' | 'TORTOISE';

interface SpeciesMeta {
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  bodyColor: number;
  emissiveColor: number;
  accentColor: number;
  walkSpeed: number;
  runSpeed: number;
}

const SPECIES_META: Record<CreatureSpecies, SpeciesMeta> = {
  STAG: {
    nameAr: 'ظبي الضياء الأثيري',
    nameEn: 'Luminous Spirit Stag',
    titleAr: 'روح الغابة النبيلة',
    titleEn: 'Guardian Spirit of the Deep Pines',
    bodyColor: 0x99f6e4,
    emissiveColor: 0x2dd4bf,
    accentColor: 0x38bdf8,
    walkSpeed: 1.7,
    runSpeed: 5.0,
  },
  FOX: {
    nameAr: 'ثعلب الصدى الذهبي',
    nameEn: 'Golden Echo Fox',
    titleAr: 'كشاف الدروب الخفيف',
    titleEn: 'Swift Trailblazer of the Woods',
    bodyColor: 0xfbbf24,
    emissiveColor: 0xf59e0b,
    accentColor: 0xfffbeb,
    walkSpeed: 2.1,
    runSpeed: 6.2,
  },
  OWL: {
    nameAr: 'بومة النجوم المحلّقة',
    nameEn: 'Astral Starlight Owl',
    titleAr: 'حارسة السماء الليلية',
    titleEn: 'Watcher of the Canopy',
    bodyColor: 0xc084fc,
    emissiveColor: 0x9333ea,
    accentColor: 0xfde047,
    walkSpeed: 2.0,
    runSpeed: 5.5,
  },
  RABBIT: {
    nameAr: 'أرنب الأثير القافز',
    nameEn: 'Ethereal Meadow Hare',
    titleAr: 'مخلوق المروج اللطيف',
    titleEn: 'Gentle Hopper of the Glades',
    bodyColor: 0xfbcfe8,
    emissiveColor: 0xf472b6,
    accentColor: 0xfef08a,
    walkSpeed: 1.9,
    runSpeed: 5.8,
  },
  TORTOISE: {
    nameAr: 'سلحفاة الكريستال العتيقة',
    nameEn: 'Ancient Crystal Tortoise',
    titleAr: 'حاملة أحجار الذاكرة',
    titleEn: 'Armored Keeper of Ancient Moss',
    bodyColor: 0x34d399,
    emissiveColor: 0x059669,
    accentColor: 0x00f5d4,
    walkSpeed: 0.95,
    runSpeed: 2.4,
  },
};

class ForestSpiritCreature {
  public group: THREE.Group;
  public id: string;
  public species: CreatureSpecies;
  public nameAr: string;
  public nameEn: string;
  public titleAr: string;
  public titleEn: string;
  public portraitUrl: string = './assets/aistudio/900555379_1478156927556307_6539741191511944864_n_9ff5ae9c.jpg';

  private homePos: THREE.Vector3;
  private roamRadius: number = 18;
  private targetPos: THREE.Vector3;
  private state: 'GRAZING' | 'WANDERING' | 'ALERT' | 'FLEEING' | 'PETTED' = 'GRAZING';
  private stateTimer: number = 3.0;
  private walkSpeed: number;
  private runSpeed: number;
  private baseBodyY: number = 0.85;
  private baseHeadY: number = 1.38;

  // Animated Parts
  private bodyGroup: THREE.Group;
  private neckMesh: THREE.Mesh | null = null;
  private headGroup: THREE.Group;
  private tailMesh: THREE.Object3D | null = null;
  private leftWing: THREE.Group | null = null;
  private rightWing: THREE.Group | null = null;
  private legMeshes: THREE.Mesh[] = [];
  private creatureLight: PooledPointLightProxy;
  private wisps: THREE.Mesh[] = [];

  constructor(private terrain: Terrain, initialX: number, initialZ: number, index: number, species: CreatureSpecies) {
    this.species = species;
    const meta = SPECIES_META[species];
    this.id = `creature_${species.toLowerCase()}_${index}`;
    this.nameAr = index === 1 && species === 'STAG' ? 'ظبي الضياء الأكبر' : meta.nameAr;
    this.nameEn = index === 1 && species === 'STAG' ? 'Elder Light Stag' : meta.nameEn;
    this.titleAr = meta.titleAr;
    this.titleEn = meta.titleEn;
    this.walkSpeed = meta.walkSpeed;
    this.runSpeed = meta.runSpeed;

    this.group = new THREE.Group();
    this.group.name = `SpiritCreature_${species}_${index}`;
    this.homePos = new THREE.Vector3(initialX, 0, initialZ);
    this.targetPos = this.homePos.clone();

    const bodyMat = new THREE.MeshStandardMaterial({
      color: meta.bodyColor,
      emissive: meta.emissiveColor,
      emissiveIntensity: 0.65,
      roughness: 0.4,
      metalness: 0.08,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: meta.accentColor,
      emissive: meta.accentColor,
      emissiveIntensity: 1.35,
      roughness: 0.25,
      metalness: 0.2,
    });
    const eyeMat = new THREE.MeshBasicMaterial({ color: species === 'OWL' ? 0xfde047 : 0x0f172a });

    this.bodyGroup = new THREE.Group();
    this.headGroup = new THREE.Group();
    this.group.add(this.bodyGroup);

    if (species === 'STAG') {
      this.baseBodyY = 0.85;
      this.baseHeadY = 1.38;
      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.42, 0.92), bodyMat);
      torso.castShadow = true;
      this.bodyGroup.add(torso);

      this.neckMesh = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.48, 0.24), bodyMat);
      this.neckMesh.position.set(0, 0.3, 0.36);
      this.neckMesh.rotation.x = 0.32;
      this.bodyGroup.add(this.neckMesh);

      const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.38), bodyMat);
      this.headGroup.position.set(0, 1.38, 0.56);
      this.headGroup.add(headMesh);

      const antlerBaseL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.32, 0.06), accentMat);
      antlerBaseL.position.set(-0.14, 0.28, -0.04);
      const antlerTipL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.06), accentMat);
      antlerTipL.position.set(-0.2, 0.38, -0.04);
      const antlerBaseR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.32, 0.06), accentMat);
      antlerBaseR.position.set(0.14, 0.28, -0.04);
      const antlerTipR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.06), accentMat);
      antlerTipR.position.set(0.2, 0.38, -0.04);
      this.headGroup.add(antlerBaseL, antlerTipL, antlerBaseR, antlerTipR);
      this.group.add(this.headGroup);

      const legGeom = new THREE.BoxGeometry(0.11, 0.72, 0.11);
      [
        [-0.15, 0.36, 0.3],
        [0.15, 0.36, 0.3],
        [-0.15, 0.36, -0.3],
        [0.15, 0.36, -0.3],
      ].forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeom, bodyMat);
        leg.position.set(lx, ly, lz);
        this.legMeshes.push(leg);
        this.group.add(leg);
      });
    } else if (species === 'FOX') {
      this.baseBodyY = 0.46;
      this.baseHeadY = 0.66;
      const torso = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.26, 0.68), bodyMat);
      torso.castShadow = true;
      this.bodyGroup.add(torso);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.24, 0.26), bodyMat);
      const snout = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.16), bodyMat);
      snout.position.set(0, -0.04, 0.18);
      const earGeo = new THREE.BoxGeometry(0.08, 0.12, 0.06);
      const earL = new THREE.Mesh(earGeo, accentMat);
      earL.position.set(-0.09, 0.16, -0.02);
      const earR = new THREE.Mesh(earGeo, accentMat);
      earR.position.set(0.09, 0.16, -0.02);
      const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.045, 0.02), eyeMat);
      eyeL.position.set(-0.07, 0.02, 0.135);
      const eyeR = eyeL.clone();
      eyeR.position.x = 0.07;
      this.headGroup.position.set(0, 0.66, 0.38);
      this.headGroup.add(head, snout, earL, earR, eyeL, eyeR);
      this.group.add(this.headGroup);

      const tailGroup = new THREE.Group();
      tailGroup.position.set(0, 0.04, -0.34);
      const tailBody = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.42), bodyMat);
      tailBody.position.set(0, 0.06, -0.2);
      const tailTip = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.16), accentMat);
      tailTip.position.set(0, 0.08, -0.42);
      tailGroup.add(tailBody, tailTip);
      this.tailMesh = tailGroup;
      this.bodyGroup.add(tailGroup);

      const legGeom = new THREE.BoxGeometry(0.09, 0.38, 0.09);
      [
        [-0.11, 0.19, 0.22],
        [0.11, 0.19, 0.22],
        [-0.11, 0.19, -0.22],
        [0.11, 0.19, -0.22],
      ].forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeom, bodyMat);
        leg.position.set(lx, ly, lz);
        this.legMeshes.push(leg);
        this.group.add(leg);
      });
    } else if (species === 'OWL') {
      this.baseBodyY = 1.65;
      this.baseHeadY = 1.98;
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.52, 0.38), bodyMat);
      body.castShadow = true;
      this.bodyGroup.add(body);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.32, 0.34), bodyMat);
      const beak = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.12), accentMat);
      beak.position.set(0, -0.02, 0.2);
      const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.075, 0.02), eyeMat);
      eyeL.position.set(-0.09, 0.04, 0.175);
      const eyeR = eyeL.clone();
      eyeR.position.x = 0.09;
      const tuftGeo = new THREE.BoxGeometry(0.08, 0.12, 0.08);
      const tuftL = new THREE.Mesh(tuftGeo, accentMat);
      tuftL.position.set(-0.14, 0.19, 0.02);
      const tuftR = new THREE.Mesh(tuftGeo, accentMat);
      tuftR.position.set(0.14, 0.19, 0.02);
      this.headGroup.position.set(0, 1.98, 0.04);
      this.headGroup.add(head, beak, eyeL, eyeR, tuftL, tuftR);
      this.group.add(this.headGroup);

      const wingGeo = new THREE.BoxGeometry(0.56, 0.06, 0.34);
      this.leftWing = new THREE.Group();
      this.leftWing.position.set(-0.22, 0.08, 0);
      const lWingMesh = new THREE.Mesh(wingGeo, bodyMat);
      lWingMesh.position.x = -0.28;
      this.leftWing.add(lWingMesh);
      this.bodyGroup.add(this.leftWing);

      this.rightWing = new THREE.Group();
      this.rightWing.position.set(0.22, 0.08, 0);
      const rWingMesh = new THREE.Mesh(wingGeo, bodyMat);
      rWingMesh.position.x = 0.28;
      this.rightWing.add(rWingMesh);
      this.bodyGroup.add(this.rightWing);
    } else if (species === 'RABBIT') {
      this.baseBodyY = 0.3;
      this.baseHeadY = 0.54;
      const body = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 0.44), bodyMat);
      body.castShadow = true;
      this.bodyGroup.add(body);

      const puffTail = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), accentMat);
      puffTail.position.set(0, 0.06, -0.26);
      this.tailMesh = puffTail;
      this.bodyGroup.add(puffTail);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.24, 0.26), bodyMat);
      const earGeo = new THREE.BoxGeometry(0.07, 0.28, 0.06);
      const earL = new THREE.Mesh(earGeo, bodyMat);
      earL.position.set(-0.07, 0.24, -0.02);
      const earR = new THREE.Mesh(earGeo, bodyMat);
      earR.position.set(0.07, 0.24, -0.02);
      const nose = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.04), accentMat);
      nose.position.set(0, -0.02, 0.14);
      this.headGroup.position.set(0, 0.54, 0.2);
      this.headGroup.add(head, earL, earR, nose);
      this.group.add(this.headGroup);

      const legGeo = new THREE.BoxGeometry(0.08, 0.2, 0.12);
      [
        [-0.11, 0.1, 0.12],
        [0.11, 0.1, 0.12],
        [-0.12, 0.1, -0.15],
        [0.12, 0.1, -0.15],
      ].forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeo, bodyMat);
        leg.position.set(lx, ly, lz);
        this.legMeshes.push(leg);
        this.group.add(leg);
      });
    } else {
      // TORTOISE: Blocky voxel shell with glowing crystal ridge
      this.baseBodyY = 0.34;
      this.baseHeadY = 0.34;
      const shell = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.4, 1.08), bodyMat);
      shell.position.y = 0.04;
      shell.castShadow = true;
      this.bodyGroup.add(shell);

      const rim = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.12, 1.16), accentMat);
      rim.position.y = -0.08;
      this.bodyGroup.add(rim);

      for (let s = -1; s <= 1; s++) {
        const crystal = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), accentMat);
        crystal.position.set(0, 0.32, s * 0.26);
        this.bodyGroup.add(crystal);
      }

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.28), bodyMat);
      const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.02), eyeMat);
      eyeL.position.set(-0.07, 0.04, 0.145);
      const eyeR = eyeL.clone();
      eyeR.position.x = 0.07;
      this.headGroup.position.set(0, 0.34, 0.65);
      this.headGroup.add(head, eyeL, eyeR);
      this.group.add(this.headGroup);

      const legGeo = new THREE.BoxGeometry(0.18, 0.26, 0.18);
      [
        [-0.36, 0.13, 0.36],
        [0.36, 0.13, 0.36],
        [-0.36, 0.13, -0.36],
        [0.36, 0.13, -0.36],
      ].forEach(([lx, ly, lz]) => {
        const leg = new THREE.Mesh(legGeo, bodyMat);
        leg.position.set(lx, ly, lz);
        this.legMeshes.push(leg);
        this.group.add(leg);
      });
    }

    this.bodyGroup.position.y = this.baseBodyY;

    // Pooled aura light
    this.creatureLight = new PooledPointLightProxy(meta.emissiveColor, 1.1, 4.5);
    this.creatureLight.position.set(0, this.baseBodyY + 0.35, 0);
    this.group.add(this.creatureLight);

    // Blocky orbiting wisps
    const wispGeom = new THREE.BoxGeometry(0.05, 0.05, 0.05);
    const wispMat = new THREE.MeshBasicMaterial({ color: meta.accentColor });
    for (let i = 0; i < 2; i++) {
      const w = new THREE.Mesh(wispGeom, wispMat);
      this.wisps.push(w);
      this.group.add(w);
    }

    const groundY = this.terrain.getHeightAt(initialX, initialZ);
    this.group.position.set(initialX, groundY, initialZ);
    this.pickNewTarget();
  }

  private pickNewTarget(): void {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * this.roamRadius;
    this.targetPos.set(
      this.homePos.x + Math.cos(angle) * dist,
      0,
      this.homePos.z + Math.sin(angle) * dist
    );
  }

  public update(dt: number, timeSec: number, playerPos: THREE.Vector3, isPlayerSprinting: boolean): void {
    const distToPlayer = this.group.position.distanceTo(playerPos);

    if (distToPlayer < 9.0 && isPlayerSprinting) {
      this.state = 'FLEEING';
      const fleeDir = _npcScratchA.copy(this.group.position).sub(playerPos);
      fleeDir.y = 0;
      if (fleeDir.lengthSq() > 0.001) fleeDir.normalize();
      this.targetPos.copy(this.group.position).addScaledVector(fleeDir, 14);
      this.stateTimer = 4.0;
    } else if (distToPlayer < 6.0 && !isPlayerSprinting && this.state !== 'FLEEING') {
      this.state = 'ALERT';
    }

    let bobOffset = 0;
    if (this.species === 'OWL') {
      const flapSpeed = this.state === 'WANDERING' || this.state === 'FLEEING' ? 9.5 : 4.2;
      const flap = Math.sin(timeSec * flapSpeed) * 0.52;
      if (this.leftWing) this.leftWing.rotation.z = flap;
      if (this.rightWing) this.rightWing.rotation.z = -flap;
      bobOffset = Math.sin(timeSec * 2.5) * 0.14;
    }
    if (this.tailMesh && this.species === 'FOX') {
      this.tailMesh.rotation.y = Math.sin(timeSec * 5.0) * 0.35;
    }

    if (this.state === 'GRAZING') {
      this.stateTimer -= dt;
      const dip = this.species === 'OWL' ? 0 : -0.18;
      this.headGroup.position.y = this.baseHeadY + dip + Math.sin(timeSec * 2.0) * 0.04 + bobOffset;
      if (this.neckMesh) this.neckMesh.rotation.x = -0.65;

      if (this.stateTimer <= 0) {
        this.pickNewTarget();
        this.state = 'WANDERING';
      }
    } else if (this.state === 'ALERT') {
      const toPlayer = _npcScratchA.copy(playerPos).sub(this.group.position);
      toPlayer.y = 0;
      if (toPlayer.lengthSq() > 0.01) {
        toPlayer.normalize();
        this.smoothRotateY(Math.atan2(toPlayer.x, toPlayer.z), 3.0 * dt);
      }
      this.headGroup.position.y = this.baseHeadY + 0.05 + Math.sin(timeSec * 1.5) * 0.03 + bobOffset;
      if (this.neckMesh) this.neckMesh.rotation.x = -0.2;

      if (distToPlayer > 8.0) {
        this.state = 'GRAZING';
        this.stateTimer = 4.0;
      }
    } else if (this.state === 'WANDERING' || this.state === 'FLEEING') {
      _npcScratchA.set(this.targetPos.x, 0, this.targetPos.z);
      _npcScratchB.set(this.group.position.x, 0, this.group.position.z);
      const toTarget = _npcScratchA.sub(_npcScratchB);
      const dist = toTarget.length();
      const speed = this.state === 'FLEEING' ? this.runSpeed : this.walkSpeed;

      if (dist < 0.8) {
        this.state = 'GRAZING';
        this.stateTimer = 3.0 + Math.random() * 4.0;
        this.resetLegs();
      } else {
        toTarget.normalize();
        const nx = this.group.position.x + toTarget.x * speed * dt;
        const nz = this.group.position.z + toTarget.z * speed * dt;
        if (this.terrain.getMeshHeightAt(nx, nz) > Terrain.WATER_LEVEL + 0.6) {
          this.group.position.x = nx;
          this.group.position.z = nz;
        } else {
          this.pickNewTarget();
        }

        const targetAngle = Math.atan2(toTarget.x, toTarget.z);
        this.smoothRotateY(targetAngle, (this.state === 'FLEEING' ? 8.0 : 3.5) * dt);

        const freq = this.state === 'FLEEING' ? 12.0 : 6.0;
        if (this.species === 'RABBIT') {
          const hop = Math.abs(Math.sin(timeSec * freq * 0.85)) * 0.34;
          bobOffset += hop;
          if (this.legMeshes.length === 4) {
            this.legMeshes[0].rotation.x = Math.sin(timeSec * freq * 0.85) * 0.6;
            this.legMeshes[1].rotation.x = Math.sin(timeSec * freq * 0.85) * 0.6;
            this.legMeshes[2].rotation.x = -Math.sin(timeSec * freq * 0.85) * 0.7;
            this.legMeshes[3].rotation.x = -Math.sin(timeSec * freq * 0.85) * 0.7;
          }
        } else if (this.legMeshes.length === 4) {
          this.legMeshes[0].rotation.x = Math.sin(timeSec * freq) * 0.45;
          this.legMeshes[1].rotation.x = -Math.sin(timeSec * freq) * 0.45;
          this.legMeshes[2].rotation.x = -Math.sin(timeSec * freq) * 0.45;
          this.legMeshes[3].rotation.x = Math.sin(timeSec * freq) * 0.45;
          bobOffset += Math.abs(Math.sin(timeSec * freq)) * 0.04;
        }
        this.headGroup.position.y = this.baseHeadY + bobOffset;
      }
    } else if (this.state === 'PETTED') {
      this.stateTimer -= dt;
      this.headGroup.position.y = this.baseHeadY + Math.sin(timeSec * 2.0) * 0.02 + bobOffset;
      if (this.stateTimer <= 0) {
        this.state = 'GRAZING';
        this.stateTimer = 4.0;
      }
    }

    this.bodyGroup.position.y = this.baseBodyY + bobOffset;

    const groundY = this.terrain.getHeightAt(this.group.position.x, this.group.position.z);
    this.group.position.y = groundY;

    this.wisps.forEach((w, i) => {
      const angle = timeSec * 2.0 + i * Math.PI;
      w.position.set(
        Math.cos(angle) * 0.45,
        this.baseBodyY + 0.35 + Math.sin(timeSec * 3.0 + i) * 0.15,
        Math.sin(angle) * 0.45
      );
    });

    this.creatureLight.intensity = 1.0 + Math.sin(timeSec * 3.0) * 0.35;
  }

  public pet(): void {
    this.state = 'PETTED';
    this.stateTimer = 5.0;
    this.creatureLight.intensity = 2.8;
  }

  private resetLegs(): void {
    this.legMeshes.forEach((l) => (l.rotation.x = 0));
  }

  private smoothRotateY(targetAngle: number, rate: number): void {
    let diff = targetAngle - this.group.rotation.y;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    this.group.rotation.y += diff * Math.min(1.0, rate);
  }
}

// ========================================================
// 4. NPC MANAGER (MAIN ORCHESTRATOR)
// ========================================================
export class NPCManager {
  public group: THREE.Group;
  private wanderer: ForestWanderer;
  private guardian: TempleGuardian;
  private creatures: ForestSpiritCreature[] = [];

  // Interaction tracking
  public currentTalkingNPC: string | null = null;
  private lastDialogueNode: DialogueNode | null = null;

  constructor(
    private terrain: Terrain,
    private sound: SoundSynth,
    private questSystem: QuestSystem,
    private memorySystem: EchoMemorySystem
  ) {
    this.group = new THREE.Group();
    this.group.name = 'NPCWorldGroup';

    // 1. Forest Wanderer in whispering pines
    this.wanderer = new ForestWanderer(this.terrain);
    this.group.add(this.wanderer.group);

    // 2. Temple Guardian at the ancient temple steps
    this.guardian = new TempleGuardian(this.terrain);
    this.group.add(this.guardian.group);

    // 3. Reduced diverse blocky spirit animals across island biomes (5 total for smooth performance)
    const creatureSpawns: { x: number; z: number; species: CreatureSpecies }[] = [
      { x: -38, z: 62, species: 'STAG' },
      { x: -22, z: 72, species: 'FOX' },
      { x: -14, z: 84, species: 'RABBIT' },
      { x: -58, z: 12, species: 'OWL' },
      { x: 24, z: 54, species: 'TORTOISE' },
    ];
    creatureSpawns.forEach((spawn, i) => {
      const creature = new ForestSpiritCreature(this.terrain, spawn.x, spawn.z, i + 1, spawn.species);
      this.creatures.push(creature);
      this.group.add(creature.group);
    });
  }

  public update(dt: number, timeSec: number, playerPos: THREE.Vector3, isPlayerSprinting: boolean): void {
    this.wanderer.update(dt, timeSec, playerPos, this.currentTalkingNPC === this.wanderer.id);
    this.guardian.update(dt, timeSec, playerPos, this.currentTalkingNPC === this.guardian.id);
    this.creatures.forEach((c) => c.update(dt, timeSec, playerPos, isPlayerSprinting));
  }

  /**
   * Finds the closest interactive NPC within range (e.g. 3.5m)
   */
  public findClosestNPC(playerPos: THREE.Vector3, maxDist: number = 3.6): InteractiveNPCInfo | null {
    let closest: InteractiveNPCInfo | null = null;
    let minD = maxDist;

    // Check Wanderer
    const wandererDist = this.wanderer.group.position.distanceTo(playerPos);
    if (wandererDist < minD) {
      minD = wandererDist;
      closest = {
        id: this.wanderer.id,
        nameAr: this.wanderer.nameAr,
        nameEn: this.wanderer.nameEn,
        type: 'WANDERER',
        actionPromptAr: 'تحدث مع عابر الغابة الغامض',
        actionPromptEn: 'Speak with the Shrouded Wanderer',
        position: this.wanderer.group.position.clone(),
        distance: wandererDist,
      };
    }

    // Check Guardian
    const guardianDist = this.guardian.group.position.distanceTo(playerPos);
    if (guardianDist < minD) {
      minD = guardianDist;
      closest = {
        id: this.guardian.id,
        nameAr: this.guardian.nameAr,
        nameEn: this.guardian.nameEn,
        type: 'GUARDIAN',
        actionPromptAr: 'تفاعل مع حارس المعبد',
        actionPromptEn: 'Commune with the Temple Guardian',
        position: this.guardian.group.position.clone(),
        distance: guardianDist,
      };
    }

    // Check Spirit Creatures
    for (const creature of this.creatures) {
      const cDist = creature.group.position.distanceTo(playerPos);
      if (cDist < minD) {
        minD = cDist;
        closest = {
          id: creature.id,
          nameAr: creature.nameAr,
          nameEn: creature.nameEn,
          type: 'CREATURE',
          actionPromptAr: 'المس روح الضياء الأثيرية',
          actionPromptEn: 'Commune with the Light Spirit',
          position: creature.group.position.clone(),
          distance: cDist,
        };
      }
    }

    return closest;
  }

  /**
   * Returns blips for all active NPCs and creatures on the radar minimap
   */
  public getNPCMinimapBlips(): { pos: { x: number; z: number }; type: string }[] {
    const blips: { pos: { x: number; z: number }; type: string }[] = [];
    blips.push({
      pos: { x: this.wanderer.group.position.x, z: this.wanderer.group.position.z },
      type: 'WANDERER',
    });
    blips.push({
      pos: { x: this.guardian.group.position.x, z: this.guardian.group.position.z },
      type: 'GUARDIAN',
    });
    for (const c of this.creatures) {
      blips.push({
        pos: { x: c.group.position.x, z: c.group.position.z },
        type: 'CREATURE',
      });
    }
    return blips;
  }

  /**
   * Generates dynamic contextual dialogue based on Quest progress and ECHO MEMORY behavior
   */
  public getDialogueFor(npcId: string, nodeKey: string = 'root'): DialogueNode {
    this.currentTalkingNPC = npcId;
    const activeObj = this.questSystem.getActiveObjective();
    const memory = this.memorySystem.profile;

    if (npcId === this.wanderer.id) {
      this.sound.playNPCVoice('wanderer');
      return this.generateWandererDialogue(nodeKey, activeObj?.id, memory);
    } else if (npcId === this.guardian.id) {
      this.sound.playNPCVoice('guardian');
      return this.generateGuardianDialogue(nodeKey, activeObj?.id, memory);
    } else {
      this.sound.playNPCVoice('creature');
      const creature = this.creatures.find((c) => c.id === npcId);
      if (creature) creature.pet();
      return this.generateCreatureDialogue(creature, memory);
    }
  }

  public closeDialogue(): void {
    this.currentTalkingNPC = null;
  }

  // ==========================================
  // WANDERER DIALOGUE GENERATOR
  // ==========================================
  private generateWandererDialogue(nodeKey: string, objectiveId?: string, memory?: any): DialogueNode {
    // Memory context comments
    let memoryRemarkAr = '';
    let memoryRemarkEn = '';

    if (memory) {
      if (memory.sprintCount > 8 || memory.sprintDistanceMeters > 120) {
        memoryRemarkAr = 'أراك تركض بين أشجار الصنوبر كمن يطارده ماضٍ غائب... تمهل يا غريب، فالجزيرة لا تبوح بأسرارها لمن يلهث مسرعاً.\n\n';
        memoryRemarkEn = 'I see you sprinting breathlessly through the pines... Slow your stride, traveler, for this realm only whispers to the patient soul.\n\n';
      } else if (memory.biomeTimeSec?.LAKE > 50) {
        memoryRemarkAr = 'لقد استشعرت وقوفك الطويل عند البحيرة المضيئة... مياهها تعكس أصداء من لم يعودوا. روحك هادئة كالماء الساكن.\n\n';
        memoryRemarkEn = 'I felt your long meditation beside the glowing lake... Its waters preserve the echoes of those who never returned. Your soul is still like the deep.\n\n';
      }
    }

    if (nodeKey === 'root') {
      let mainTextAr = 'أهلاً بك في غابة الصنوبر الهامسة يا من استيقظ بلا اسم ولا ذكرى. أنا عابرٌ مثلك، لكنني سمعت أنفاس هذه الأرض منذ دهور.';
      let mainTextEn = 'Welcome to the Whispering Pine Forest, nameless traveler who awoke with an empty past. I am a wanderer like you, yet I have listened to the breath of this soil for ages.';

      // Quest-dependent advice
      if (objectiveId === 'explore_island') {
        mainTextAr += '\n\nخطواتك الأولى أيقظت رمال الشاطئ، لكن أسرار الجزيرة تنبض في أعماق الغابة وقممها.';
        mainTextEn += '\n\nYour first steps stirred the sands, but the island’s true secrets pulse within these trees and high summits.';
      } else if (objectiveId === 'collect_3_shards') {
        mainTextAr += '\n\nأشعر بتوقك للذكريات... ابحث عن البلورات الفيروزية العائمة بين النتوءات الصخرية ومشارف المعبد، فهي شظايا أرواح حفظها صدى العالم.';
        mainTextEn += '\n\nI sense your thirst for truth... Look for the floating turquoise shards near the rocky ridges and temple borders. They are fragments of remembered souls.';
      } else if (objectiveId === 'discover_temple' || objectiveId === 'read_inscription') {
        mainTextAr += '\n\nالمعبد القديم يرتفع غرباً بين الجبال الشاهقة... هناك يقف الحارس الصخري، وفي محرابه نُقشت كلمات البناة الأوائل.';
        mainTextEn += '\n\nThe Ancient Temple towers to the west beneath the jagged peaks... There stands the Stone Sentinel, and within lies the sacred inscription.';
      } else if (objectiveId === 'open_stone_gate') {
        mainTextAr += '\n\nلقد قرأت النقش! البوابة الحجرية العظيمة تنتظر تردداتك الروحية لتفتح لك آفاقاً جديدة.';
        mainTextEn += '\n\nYou have read the glyphs! The Great Stone Gate now yearns for your resonance to unseal the pathway to the beyond.';
      }

      return {
        id: 'wanderer_root',
        speakerNameAr: this.wanderer.nameAr,
        speakerNameEn: this.wanderer.nameEn,
        titleAr: this.wanderer.titleAr,
        titleEn: this.wanderer.titleEn,
        portraitUrl: this.wanderer.portraitUrl,
        messageAr: memoryRemarkAr + mainTextAr,
        messageEn: memoryRemarkEn + mainTextEn,
        options: [
          {
            textAr: 'من أنت؟ وما هذا العالم الذي يحتفظ بالذكريات؟',
            textEn: 'Who are you? What is this world that remembers?',
            nextDialogueId: 'wanderer_lore',
          },
          {
            textAr: 'أين يمكنني العثور على شظايا الذاكرة والمعبد؟',
            textEn: 'Where can I find memory shards and the temple?',
            nextDialogueId: 'wanderer_quest_hint',
            action: 'QUEST_HINT',
          },
          {
            textAr: 'سأواصل رحلتي الآن، شكراً لك.',
            textEn: 'I shall continue my journey. Thank you.',
            action: 'CLOSE',
          },
        ],
      };
    } else if (nodeKey === 'wanderer_lore') {
      return {
        id: 'wanderer_lore',
        speakerNameAr: this.wanderer.nameAr,
        speakerNameEn: this.wanderer.nameEn,
        titleAr: this.wanderer.titleAr,
        titleEn: this.wanderer.titleEn,
        portraitUrl: this.wanderer.portraitUrl,
        messageAr:
          'هذه الجزيرة هي "إيكو"... مرآة كونية تلتقط مشاعر وأفعال كل كائن تطأ قدماه رمالها. صخورها ليست جماداً، بل ألواح ذاكرة عتيقة. عصاي هذه تحمل بلورة مستخلصة من قلب الشجرة العظمى؛ إنها ترشد التائهين حين يعم الظلام.',
        messageEn:
          'This island is ECHO... a cosmic mirror capturing the emotions and steps of everyone who sets foot here. Its stones are not dead matter, but ancient memory slabs. My staff holds a crystal attuned to the Elder Tree; it guides wanderers when night falls.',
        options: [
          {
            textAr: 'كيف يمكنني استعادة ذكرياتي المفقودة؟',
            textEn: 'How can I reclaim my own lost memories?',
            nextDialogueId: 'wanderer_memories',
          },
          {
            textAr: 'سأستكشف المعبد كما أشرت عليّ.',
            textEn: 'I will explore the temple as you advised.',
            action: 'CLOSE',
          },
        ],
      };
    } else if (nodeKey === 'wanderer_quest_hint') {
      return {
        id: 'wanderer_quest_hint',
        speakerNameAr: this.wanderer.nameAr,
        speakerNameEn: this.wanderer.nameEn,
        titleAr: this.wanderer.titleAr,
        titleEn: this.wanderer.titleEn,
        portraitUrl: this.wanderer.portraitUrl,
        messageAr:
          'اتبع البوصلة والمصغرة في أعلى الشاشة. الشظية الأولى تطفو عند صخور الشاطئ الجنوبي، والثانية قرب مشارف الغابة الصنوبرية، والثالثة بالقرب من درجات المعبد. وإذا اقتربت منها اضغط [E] للتفاعل وسماع الصدى.',
        messageEn:
          'Follow the compass and minimap at the top of your view. The first shard hovers near the shoreline rocks, the second by the pine borders, and the third near the temple steps. Approach them and press [E] to resonate.',
        options: [
          {
            textAr: 'سأبحث عنها فوراً.',
            textEn: 'I will search for them immediately.',
            action: 'CLOSE',
          },
        ],
      };
    } else {
      return {
        id: 'wanderer_memories',
        speakerNameAr: this.wanderer.nameAr,
        speakerNameEn: this.wanderer.nameEn,
        titleAr: this.wanderer.titleAr,
        titleEn: this.wanderer.titleEn,
        portraitUrl: this.wanderer.portraitUrl,
        messageAr:
          'أنت لا تستعيد الذكريات بالبحث عنها في الماضي... بل بصنع صدى جديد في الحاضر. كل خطوة تخطوها تسجل في سجل الجزيرة الأبدي.',
        messageEn:
          'You do not regain memories by digging in the past... but by forging a new resonance in the present. Every step you take is etched into the island’s eternal chronicle.',
        options: [
          {
            textAr: 'كلماتك حكيمة، سأمضي في طريقي.',
            textEn: 'Wise words. I shall proceed.',
            action: 'CLOSE',
          },
        ],
      };
    }
  }

  // ==========================================
  // GUARDIAN DIALOGUE GENERATOR
  // ==========================================
  private generateGuardianDialogue(nodeKey: string, objectiveId?: string, memory?: any): DialogueNode {
    const hasReadInscription = objectiveId === 'open_stone_gate' || this.questSystem.quests[0]?.objectives[3]?.isCompleted;
    const hasThreeShards = (this.questSystem.quests[0]?.objectives[1]?.currentCount ?? 0) >= 3;

    if (nodeKey === 'root') {
      let msgAr = 'قف أيها الفاني. أنا "أوروك"، الحارس الصخري المنصوب منذ بزوغ الفجر الأول.';
      let msgEn = 'Halt, mortal. I am Orok, the Stone Sentinel carved at the first dawn.';

      if (!hasThreeShards) {
        msgAr += '\n\nروحك ما زالت خافتة... لا يمكنك دخول قدس الأقداس قبل أن تجمع شظايا الذاكرة الثلاث ليتوافق ترددك مع محراب المعبد.';
        msgEn += '\n\nYour spirit is still dim... You may not enter the inner sanctuary until you gather three Memory Shards to harmonize your aura.';
      } else if (!hasReadInscription) {
        msgAr += '\n\nأشعر برنين الشظايا في صدرك... ادخل إلى المحراب واقرأ اللوح الحجري القديم، فالنقوش تنتظر عيوناً قادرة على الإبصار.';
        msgEn += '\n\nI sense the resonance of the shards within you... Enter the sanctuary and read the Ancient Stone Tablet; the runes await sighted eyes.';
      } else {
        msgAr += '\n\nلقد قُرئت الكلمات المقدسة. البوابة الحجرية العظيمة استجابت لك، وطريق الأفق بات مفتوحاً!';
        msgEn += '\n\nThe sacred words have been spoken. The Great Stone Portal has awakened to your call; the horizon pathway lies open!';
      }

      return {
        id: 'guardian_root',
        speakerNameAr: this.guardian.nameAr,
        speakerNameEn: this.guardian.nameEn,
        titleAr: this.guardian.titleAr,
        titleEn: this.guardian.titleEn,
        portraitUrl: this.guardian.portraitUrl,
        messageAr: msgAr,
        messageEn: msgEn,
        options: [
          {
            textAr: 'ما هو سر النقش الموجود داخل المعبد؟',
            textEn: 'What is the secret of the temple inscription?',
            nextDialogueId: 'guardian_secret',
          },
          {
            textAr: 'أخبرني عن البوابة الحجرية العظيمة.',
            textEn: 'Tell me about the Great Stone Portal.',
            nextDialogueId: 'guardian_portal',
          },
          {
            textAr: 'سأتابع طريقي.',
            textEn: 'I shall continue on.',
            action: 'CLOSE',
          },
        ],
      };
    } else if (nodeKey === 'guardian_secret') {
      return {
        id: 'guardian_secret',
        speakerNameAr: this.guardian.nameAr,
        speakerNameEn: this.guardian.nameEn,
        titleAr: this.guardian.titleAr,
        titleEn: this.guardian.titleEn,
        portraitUrl: this.guardian.portraitUrl,
        messageAr:
          'النقش كُتب بلغة الأثير الأولى: "ما ينساه البشر، تحفظه الأرض. وما يمحوه الزمن، يخلده الصدى". إنه مفتاح فك الأختام الأربعة التي تكبل بوابات العبور.',
        messageEn:
          'The inscription is carved in the primordial tongue: "What mortals forget, the earth preserves. What time erases, the echo immortalizes." It is the key to dissolving the seals of passage.',
        options: [
          {
            textAr: 'فهمت، شكراً لك أيها الحارس.',
            textEn: 'I understand, thank you Sentinel.',
            action: 'CLOSE',
          },
        ],
      };
    } else {
      return {
        id: 'guardian_portal',
        speakerNameAr: this.guardian.nameAr,
        speakerNameEn: this.guardian.nameEn,
        titleAr: this.guardian.titleAr,
        titleEn: this.guardian.titleEn,
        portraitUrl: this.guardian.portraitUrl,
        messageAr:
          'البوابة الحجرية هي معبر العوالم. عندما يكتمل صدى روحك، ستتوهج دوائر الطاقة السماوية وتفتح الباب نحو المجهول.',
        messageEn:
          'The Great Stone Gate is the conduit between realms. When your resonance is fulfilled, the celestial energy circles ignite and breach the boundary to the unknown.',
        options: [
          {
            textAr: 'سأعمل على فتحها الآن.',
            textEn: 'I will open it now.',
            action: 'CLOSE',
          },
        ],
      };
    }
  }

  // ==========================================
  // CREATURE DIALOGUE GENERATOR
  // ==========================================
  private generateCreatureDialogue(creature?: ForestSpiritCreature, _memory?: any): DialogueNode {
    const nameAr = creature?.nameAr ?? 'ظبي الضياء الأثيري';
    const nameEn = creature?.nameEn ?? 'Luminous Spirit Stag';
    const titleAr = creature?.titleAr ?? 'مخلوق طاهر من نور الغابة';
    const titleEn = creature?.titleEn ?? 'Pure Being of Forest Light';
    return {
      id: 'creature_commune',
      speakerNameAr: nameAr,
      speakerNameEn: nameEn,
      titleAr,
      titleEn,
      portraitUrl: './assets/aistudio/900555379_1478156927556307_6539741191511944864_n_9ff5ae9c.jpg',
      messageAr:
        `يقترب ${nameAr} بسلام نحو يديك... يتألق جسده بنور أثيري دافئ ويبعث رنيناً ناعماً يعيد السكينة إلى روحك. تشعر بأن هذا الكائن يدرك نقاء خطواتك عندما لا تركض بعجلة.`,
      messageEn:
        `${nameEn} tilts its luminous head gently toward your touch... It shimmers with soothing warmth, releasing a soft celestial hum that restores your peace.`,
      options: [
        {
          textAr: 'المسه بنعومة واستشعر صدى الغابة.',
          textEn: 'Gently stroke the creature and feel the forest resonance.',
          action: 'PET_CREATURE',
        },
        {
          textAr: 'اتركه يواصل طريقه بسلام.',
          textEn: 'Let it roam in peace.',
          action: 'CLOSE',
        },
      ],
    };
  }
}
