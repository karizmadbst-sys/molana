/**
 * ECHO – THE WORLD REMEMBERS
 * Quest Companion Characters (الشخصيات المرافقة المنجزة للمهام)
 *
 * Three persistent blocky adventurer companions matching the visual style of both worlds
 * who travel side-by-side through the Great Portal and never get recreated:
 * 1. كايلن (Kaelen - فارس الطليعة): Crimson cape, dark spiky hair, glowing crimson sword ('VANGUARD').
 * 2. ليرا (Lyra - باحثة الأثير): Silver-white hair, purple cape, glowing amethyst staff ('SEEKER').
 * 3. روان (Rowan - كشاف الغابة): Forest-green hood & cloak, glowing emerald crystal bow ('SCOUT').
 */

import * as THREE from 'three';
import { Terrain } from '../world/Terrain.ts';
import { WorldObstacle } from '../world/Forest.ts';
import { QuestSystem } from '../story/QuestSystem.ts';
import { EchoCrystals, CrystalData } from '../world/EchoCrystals.ts';
import { WorldInteractions } from '../world/WorldInteractions.ts';
import { CombatSystem, CorruptedWoodWraith } from '../combat/CombatSystem.ts';
import { SoundSynth } from '../audio/SoundSynth.ts';
import { PooledPointLightProxy } from '../world/WorldLightPool.ts';
import { DialogueNode } from './NPCManager.ts';

export type CompanionMode = 'ASSIST' | 'FOLLOW';
export type CompanionRole = 'VANGUARD' | 'SEEKER' | 'SCOUT';

export interface CompanionInteractInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  actionPromptAr: string;
  actionPromptEn: string;
  position: THREE.Vector3;
  distance: number;
  color: number;
}

export interface CompanionContext {
  playerPos: THREE.Vector3;
  playerFacingAngle: number;
  questSystem: QuestSystem;
  crystals: EchoCrystals;
  worldInteractions: WorldInteractions;
  combatSystem: CombatSystem;
  obstacles: WorldObstacle[];
  onShardCollectedByCompanion: (companionNameAr: string, shardNameAr: string, totalShards: number) => void;
  onEnemyDefeatedByCompanion: (companionNameAr: string) => void;
  onGateAssistedByCompanion: (companionNameAr: string, isOpen: boolean) => void;
  onShowToast: (msg: string) => void;
}

export interface SharedCompanionUnit {
  id: string;
  role: CompanionRole;
  nameAr: string;
  nameEn: string;
  auraColor: number;
  auraHex: string;
  group: THREE.Group;
  pivotGroup: THREE.Group;
  leftLeg: THREE.Group;
  rightLeg: THREE.Group;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  staffCrystal: THREE.Mesh;
  staffLight: PooledPointLightProxy;
  nameplateGroup: THREE.Group;
  slashArcMesh: THREE.Mesh;
  slashMaterial: THREE.MeshBasicMaterial;
  position: THREE.Vector3;
  offsetAngle: number;
}

interface CompanionConfig {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  role: CompanionRole;
  tunicColor: number;
  capeColor: number;
  capeTrimColor: number;
  auraColor: number;
  auraHex: string;
  hairColor: number;
  hooded?: boolean;
  formationOffset: THREE.Vector2;
  offsetAngle: number;
  portraitUrl: string;
}

const _vecA = new THREE.Vector3();
const _vecB = new THREE.Vector3();
const _vecC = new THREE.Vector3();

class QuestCompanion {
  public group: THREE.Group;
  public config: CompanionConfig;
  public position: THREE.Vector3;
  public mode: CompanionMode = 'ASSIST';

  public pivotGroup: THREE.Group;
  public leftArm: THREE.Group;
  public rightArm: THREE.Group;
  public leftLeg: THREE.Group;
  public rightLeg: THREE.Group;
  public staffCrystal: THREE.Mesh;
  public staffLight: PooledPointLightProxy;
  public slashArcMesh: THREE.Mesh;
  public slashMaterial: THREE.MeshBasicMaterial;
  public nameplateGroup: THREE.Group;
  private nameplateTexture: THREE.CanvasTexture;

  private facingAngle: number = Math.PI;
  private animTime: number = 0;
  private attackCooldown: number = 0;
  private slashTimer: number = 0;
  private channelTimer: number = 0;
  private channelingShardId: number | null = null;
  private blessingCooldown: number = 0;
  private stuckCheckTimer: number = 0;
  private lastCheckPos: THREE.Vector3 = new THREE.Vector3();
  public activeShardTargetId: number | null = null;
  public activeCrystalTargetId: number | null = null;

  constructor(config: CompanionConfig, terrain: Terrain, spawnOffset: THREE.Vector2) {
    this.config = config;
    const sx = Terrain.SPAWN_POS.x + spawnOffset.x;
    const sz = Terrain.SPAWN_POS.z + spawnOffset.y;
    const sy = terrain.getHeightAt(sx, sz);
    this.position = new THREE.Vector3(sx, sy, sz);
    this.lastCheckPos.copy(this.position);

    this.group = new THREE.Group();
    this.group.name = `Companion_${config.id}`;
    this.group.position.copy(this.position);

    this.pivotGroup = new THREE.Group();
    this.group.add(this.pivotGroup);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xe0b484, roughness: 0.78, metalness: 0.04 });
    const hairMat = new THREE.MeshStandardMaterial({ color: config.hairColor, roughness: 0.68 });
    const tunicMat = new THREE.MeshStandardMaterial({ color: config.tunicColor, roughness: 0.8 });
    const capeMat = new THREE.MeshStandardMaterial({ color: config.capeColor, roughness: 0.68, metalness: 0.14 });
    const capeTrimMat = new THREE.MeshStandardMaterial({ color: config.capeTrimColor, roughness: 0.72 });
    const leatherMat = new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.85 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x161922, roughness: 0.86 });
    const bootMat = new THREE.MeshStandardMaterial({ color: 0x3f291a, roughness: 0.85 });
    const auraMat = new THREE.MeshStandardMaterial({
      color: config.auraColor,
      emissive: config.auraColor,
      emissiveIntensity: 2.0,
      roughness: 0.18,
      metalness: 0.75,
    });

    // Blocky Minecraft-style Torso & Belt
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.54, 0.26), tunicMat);
    torso.position.y = 1.19;
    torso.castShadow = true;
    this.pivotGroup.add(torso);

    const lowerCoat = new THREE.Mesh(new THREE.BoxGeometry(0.47, 0.18, 0.29), capeTrimMat);
    lowerCoat.position.y = 0.9;
    this.pivotGroup.add(lowerCoat);

    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.075, 0.28), leatherMat);
    belt.position.y = 1.01;
    this.pivotGroup.add(belt);

    // Blocky Shoulder Mantle & Flowing Cape
    const mantle = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.15, 0.32), capeMat);
    mantle.position.y = 1.44;
    mantle.castShadow = true;
    this.pivotGroup.add(mantle);

    const capeBack = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.66, 0.06), capeMat);
    capeBack.position.set(0, 1.1, -0.17);
    capeBack.rotation.x = 0.18;
    capeBack.castShadow = true;
    this.pivotGroup.add(capeBack);

    const capeEmblem = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.32, 0.07), capeTrimMat);
    capeEmblem.position.set(0, 1.06, -0.185);
    capeEmblem.rotation.x = 0.18;
    this.pivotGroup.add(capeEmblem);

    // Blocky Head, Hair or Ranger Hood
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), skinMat);
    head.position.y = 1.66;
    head.castShadow = true;
    this.pivotGroup.add(head);

    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const lEyeW = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 0.02), eyeWhiteMat);
    lEyeW.position.set(-0.08, 1.66, 0.178);
    const rEyeW = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.05, 0.02), eyeWhiteMat);
    rEyeW.position.set(0.08, 1.66, 0.178);
    const lEye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.045, 0.024), eyeMat);
    lEye.position.set(-0.075, 1.66, 0.182);
    const rEye = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.045, 0.024), eyeMat);
    rEye.position.set(0.075, 1.66, 0.182);
    this.pivotGroup.add(lEyeW, rEyeW, lEye, rEye);

    if (config.hooded) {
      // Rowan's forest-green blocky ranger hood
      const hoodTop = new THREE.Mesh(new THREE.BoxGeometry(0.41, 0.14, 0.42), capeMat);
      hoodTop.position.set(0, 1.81, -0.02);
      const hoodBack = new THREE.Mesh(new THREE.BoxGeometry(0.41, 0.35, 0.16), capeMat);
      hoodBack.position.set(0, 1.64, -0.14);
      const hoodSideL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.32, 0.34), capeMat);
      hoodSideL.position.set(-0.18, 1.65, -0.02);
      const hoodSideR = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.32, 0.34), capeMat);
      hoodSideR.position.set(0.18, 1.65, -0.02);
      this.pivotGroup.add(hoodTop, hoodBack, hoodSideL, hoodSideR);
    } else {
      const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.11, 0.38), hairMat);
      hairTop.position.set(0, 1.81, -0.01);
      const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.3, 0.13), hairMat);
      hairBack.position.set(0, 1.66, -0.13);
      const hairSideL = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.22, 0.24), hairMat);
      hairSideL.position.set(-0.175, 1.68, -0.03);
      const hairSideR = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.22, 0.24), hairMat);
      hairSideR.position.set(0.175, 1.68, -0.03);
      const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.07, 0.06), hairMat);
      bangs.position.set(0, 1.78, 0.165);
      this.pivotGroup.add(hairTop, hairBack, hairSideL, hairSideR, bangs);

      if (config.role === 'VANGUARD') {
        // Kaelen's dark spiky crown blocks
        const spikeA = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.09, 0.11), hairMat);
        spikeA.position.set(-0.08, 1.88, 0.02);
        const spikeB = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.12), hairMat);
        spikeB.position.set(0.07, 1.89, -0.02);
        this.pivotGroup.add(spikeA, spikeB);
      }
    }

    // Blocky Arms
    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.31, 1.4, 0);
    const lSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.26, 0.19), tunicMat);
    lSleeve.position.y = -0.11;
    const lForearm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.32, 0.17), skinMat);
    lForearm.position.y = -0.38;
    this.leftArm.add(lSleeve, lForearm);
    this.pivotGroup.add(this.leftArm);

    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.31, 1.4, 0);
    const rSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.26, 0.19), tunicMat);
    rSleeve.position.y = -0.11;
    const rForearm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.32, 0.17), skinMat);
    rForearm.position.y = -0.38;
    this.rightArm.add(rSleeve, rForearm);

    // Distinctive Glowing Blocky Weapon in Right Hand matching reference images
    if (config.role === 'VANGUARD') {
      // Kaelen: Crimson glowing greatsword
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.18, 0.05), leatherMat);
      grip.position.set(0, -0.46, 0.06);
      grip.rotation.x = Math.PI * 0.42;
      const guard = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.07), new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7 }));
      guard.position.set(0, -0.43, 0.18);
      guard.rotation.x = Math.PI * 0.42;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.76, 0.03), auraMat);
      blade.position.set(0, -0.31, 0.56);
      blade.rotation.x = Math.PI * 0.42;
      blade.castShadow = true;
      this.staffCrystal = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.065, 0.08), auraMat);
      this.staffCrystal.position.set(0, -0.43, 0.2);
      this.rightArm.add(grip, guard, blade, this.staffCrystal);
    } else if (config.role === 'SEEKER') {
      // Lyra: Indigo wood staff + glowing amethyst crystal orb
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.055, 1.48, 0.055), leatherMat);
      shaft.position.set(0, -0.32, 0.22);
      shaft.rotation.x = Math.PI * 0.34;
      const cradle = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.16), capeTrimMat);
      cradle.position.set(0, -0.08, 0.76);
      this.staffCrystal = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.16), auraMat);
      this.staffCrystal.position.set(0, -0.02, 0.85);
      this.rightArm.add(shaft, cradle, this.staffCrystal);
    } else {
      // Rowan: Glowing Emerald Crystal Recurve Bow
      const riser = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.34, 0.07), leatherMat);
      riser.position.set(0, -0.46, 0.26);
      const upperLimb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.34, 0.06), auraMat);
      upperLimb.position.set(0, -0.22, 0.18);
      upperLimb.rotation.x = -0.48;
      const lowerLimb = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.34, 0.06), auraMat);
      lowerLimb.position.set(0, -0.7, 0.18);
      lowerLimb.rotation.x = 0.48;
      const bowString = new THREE.Mesh(
        new THREE.BoxGeometry(0.014, 0.78, 0.014),
        new THREE.MeshBasicMaterial({ color: 0xbbf7d0 })
      );
      bowString.position.set(0, -0.46, 0.06);
      this.staffCrystal = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.09), auraMat);
      this.staffCrystal.position.set(0, -0.46, 0.32);
      this.rightArm.add(riser, upperLimb, lowerLimb, bowString, this.staffCrystal);
    }
    this.pivotGroup.add(this.rightArm);

    // Blocky Legs & Boots
    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.11, 0.82, 0);
    const lLeg = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.58, 0.21), pantsMat);
    lLeg.position.y = -0.29;
    const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.22, 0.24), bootMat);
    lBoot.position.set(0, -0.69, 0.02);
    this.leftLeg.add(lLeg, lBoot);
    this.pivotGroup.add(this.leftLeg);

    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.11, 0.82, 0);
    const rLeg = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.58, 0.21), pantsMat);
    rLeg.position.y = -0.29;
    const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.22, 0.24), bootMat);
    rBoot.position.set(0, -0.69, 0.02);
    this.rightLeg.add(rLeg, rBoot);
    this.pivotGroup.add(this.rightLeg);

    // Slash Arc VFX
    this.slashMaterial = new THREE.MeshBasicMaterial({
      color: config.auraColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    this.slashArcMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.55, 1.38, 16, 1, 0, Math.PI * 0.85),
      this.slashMaterial
    );
    this.slashArcMesh.rotation.x = Math.PI / 2;
    this.slashArcMesh.position.set(0, 1.02, 0.45);
    this.pivotGroup.add(this.slashArcMesh);

    // Pooled aura light
    this.staffLight = new PooledPointLightProxy(config.auraColor, 1.2, 6.0);
    this.staffLight.position.set(0, 1.45, 0.35);
    this.pivotGroup.add(this.staffLight);

    // Overhead Nameplate
    this.nameplateGroup = new THREE.Group();
    this.nameplateGroup.position.y = 2.24;
    const canvas = document.createElement('canvas');
    canvas.width = 360;
    canvas.height = 84;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgba(6, 12, 22, 0.84)';
      ctx.roundRect(6, 6, 348, 72, 12);
      ctx.fill();
      ctx.strokeStyle = config.auraHex;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 25px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${config.nameAr} · ${config.nameEn}`, 180, 38);

      ctx.fillStyle = config.auraHex;
      ctx.font = '17px sans-serif';
      ctx.fillText(config.titleAr, 180, 64);
    }
    this.nameplateTexture = new THREE.CanvasTexture(canvas);
    this.nameplateTexture.colorSpace = THREE.SRGBColorSpace;
    const tagMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.34, 0.31),
      new THREE.MeshBasicMaterial({ map: this.nameplateTexture, transparent: true, depthTest: false })
    );
    this.nameplateGroup.add(tagMesh);
    this.group.add(this.nameplateGroup);
  }

  public toSharedUnit(): SharedCompanionUnit {
    return {
      id: this.config.id,
      role: this.config.role,
      nameAr: this.config.nameAr,
      nameEn: this.config.nameEn,
      auraColor: this.config.auraColor,
      auraHex: this.config.auraHex,
      group: this.group,
      pivotGroup: this.pivotGroup,
      leftLeg: this.leftLeg,
      rightLeg: this.rightLeg,
      leftArm: this.leftArm,
      rightArm: this.rightArm,
      staffCrystal: this.staffCrystal,
      staffLight: this.staffLight,
      nameplateGroup: this.nameplateGroup,
      slashArcMesh: this.slashArcMesh,
      slashMaterial: this.slashMaterial,
      position: this.position,
      offsetAngle: this.config.offsetAngle,
    };
  }

  public resetToPlayer(playerPos: THREE.Vector3, terrain: Terrain): void {
    const x = playerPos.x + this.config.formationOffset.x;
    const z = playerPos.z + this.config.formationOffset.y;
    const y = terrain.getHeightAt(x, z);
    this.position.set(x, y, z);
    this.group.position.copy(this.position);
    this.channelTimer = 0;
    this.channelingShardId = null;
    this.attackCooldown = 0;
    this.slashTimer = 0;
    this.slashMaterial.opacity = 0;
  }

  public canBless(): boolean {
    return this.blessingCooldown <= 0;
  }

  public triggerBlessing(): void {
    this.blessingCooldown = 20.0;
  }

  public update(
    dt: number,
    timeSec: number,
    terrain: Terrain,
    cameraPos: THREE.Vector3,
    ctx: CompanionContext,
    sound: SoundSynth,
    isTalkingToThis: boolean,
    reservedShardId: number | null = null,
    reservedCrystalId: number | null = null
  ): THREE.Vector3 | null {
    let highlightPos: THREE.Vector3 | null = null;
    this.activeShardTargetId = null;
    this.activeCrystalTargetId = null;

    if (this.attackCooldown > 0) this.attackCooldown -= dt;
    if (this.blessingCooldown > 0) this.blessingCooldown -= dt;
    if (this.slashTimer > 0) {
      this.slashTimer -= dt;
      this.slashMaterial.opacity = Math.max(0, (this.slashTimer / 0.25) * 0.85);
      this.rightArm.rotation.x = -1.35 * (this.slashTimer / 0.25);
    } else {
      this.slashMaterial.opacity = 0;
    }

    this.nameplateGroup.lookAt(cameraPos);
    this.staffCrystal.rotation.y += dt * 2.2;

    if (isTalkingToThis) {
      _vecA.subVectors(ctx.playerPos, this.position);
      _vecA.y = 0;
      if (_vecA.lengthSq() > 0.01) {
        this.smoothFace(Math.atan2(_vecA.x, _vecA.z), dt * 8);
      }
      this.setIdleLimbs(timeSec);
      this.group.position.copy(this.position);
      return null;
    }

    const searchOrigin = this.mode === 'ASSIST' && this.config.role !== 'SEEKER' ? this.position : ctx.playerPos;
    const searchRange = this.mode === 'ASSIST' && this.config.role === 'VANGUARD' ? 68 : this.config.role === 'SCOUT' ? 36 : 14;
    const nearestEnemy = this.findNearestWraith(ctx.combatSystem, searchOrigin, searchRange);

    const activeObj = ctx.questSystem.getActiveObjective();
    const playerDist = this.position.distanceTo(ctx.playerPos);
    let desiredPos: THREE.Vector3 | null = null;
    let arrivalRadius = 2.4;
    let moveSpeed = 7.8;

    const shouldEngageEnemy =
      nearestEnemy &&
      (this.config.role !== 'SEEKER' || nearestEnemy.group.position.distanceTo(this.position) < 11);

    if (shouldEngageEnemy && nearestEnemy) {
      const distToEnemy = this.position.distanceTo(nearestEnemy.group.position);
      const strikeRange = this.config.role === 'SCOUT' ? 7.5 : 2.9;
      if (distToEnemy <= strikeRange) {
        _vecA.subVectors(nearestEnemy.group.position, this.position);
        _vecA.y = 0;
        if (_vecA.lengthSq() > 0.001) {
          this.smoothFace(Math.atan2(_vecA.x, _vecA.z), dt * 10);
        }
        if (this.attackCooldown <= 0) {
          this.performCompanionStrike(nearestEnemy, ctx, sound);
        }
        this.setIdleLimbs(timeSec);
        this.group.position.copy(this.position);
        return nearestEnemy.group.position;
      } else {
        desiredPos = _vecB.copy(nearestEnemy.group.position);
        arrivalRadius = strikeRange - 0.5;
        moveSpeed = 9.4;
      }
    } else if (this.mode === 'ASSIST' && activeObj) {
      if (activeObj.id === 'collect_3_shards') {
        const shard = this.findNearestUncollectedShard(ctx.worldInteractions, this.position, 260, reservedShardId);
        if (shard) {
          this.activeShardTargetId = shard.id;
          highlightPos = shard.pos;
          desiredPos = _vecB.copy(shard.pos);
          arrivalRadius = 2.2;
          moveSpeed = 8.6;

          if (this.position.distanceTo(shard.pos) <= 2.7) {
            if (this.channelingShardId !== shard.id) {
              this.channelingShardId = shard.id;
              this.channelTimer = 0;
            }
            this.channelTimer += dt;
            this.rightArm.rotation.x = -0.85 + Math.sin(timeSec * 6) * 0.15;
            if (this.channelTimer >= 1.8) {
              this.channelingShardId = null;
              this.channelTimer = 0;
              const collected = ctx.worldInteractions.collectShard(shard.id);
              if (collected) {
                sound.playShardCollect();
                const shardCount = ctx.worldInteractions.getCollectedShardsCount();
                ctx.questSystem.recordShardCollected(shardCount);
                ctx.onShardCollectedByCompanion(this.config.nameAr, collected.nameAr, shardCount);
              }
            }
            this.group.position.copy(this.position);
            return highlightPos;
          }
        }
      } else if (activeObj.id === 'discover_temple') {
        const offsetX = this.config.role === 'SEEKER' ? -10 : this.config.role === 'VANGUARD' ? 24 : 8;
        const offsetZ = this.config.role === 'SEEKER' ? -6 : this.config.role === 'VANGUARD' ? 12 : -22;
        const targetX = Terrain.TEMPLE_POS.x + offsetX;
        const targetZ = Terrain.TEMPLE_POS.z + offsetZ;
        desiredPos = _vecB.set(targetX, terrain.getHeightAt(targetX, targetZ), targetZ);
        highlightPos = desiredPos;
        moveSpeed = 8.4;
      } else if (activeObj.id === 'read_temple_inscription') {
        if (this.config.role === 'SEEKER') {
          const templeInsc = ctx.worldInteractions.inscriptions[2];
          if (templeInsc) {
            highlightPos = templeInsc.pos;
            desiredPos = _vecB.set(templeInsc.pos.x + 2.2, templeInsc.pos.y, templeInsc.pos.z + 1.8);
          }
        } else if (this.config.role === 'VANGUARD') {
          const doorPos = ctx.worldInteractions.templeDoorGroup.position;
          highlightPos = doorPos;
          desiredPos = _vecB.set(doorPos.x + 2.6, doorPos.y, doorPos.z + 2.2);
        } else {
          const crystal = this.findNearestUncollectedCrystal(ctx.crystals, this.position, reservedCrystalId);
          if (crystal) {
            this.activeCrystalTargetId = crystal.id;
            highlightPos = crystal.pos;
            desiredPos = _vecB.copy(crystal.pos);
          }
        }
      } else if (activeObj.id === 'open_stone_gate') {
        if (this.config.role === 'VANGUARD') {
          const doorPos = ctx.worldInteractions.templeDoorGroup.position;
          highlightPos = doorPos;
          desiredPos = _vecB.set(doorPos.x + 2.4, doorPos.y, doorPos.z + 1.6);
          if (!ctx.worldInteractions.isTempleDoorOpen && this.position.distanceTo(doorPos) < 4.8) {
            this.channelTimer += dt;
            if (this.channelTimer >= 2.2) {
              this.channelTimer = 0;
              const isOpen = ctx.worldInteractions.toggleTempleDoor();
              sound.playStoneDoorSound();
              ctx.questSystem.recordStoneGateAction(isOpen);
              ctx.onGateAssistedByCompanion(this.config.nameAr, isOpen);
            }
          }
        } else {
          const crystal = this.findNearestUncollectedCrystal(ctx.crystals, this.position, reservedCrystalId);
          if (crystal) {
            this.activeCrystalTargetId = crystal.id;
            highlightPos = crystal.pos;
            desiredPos = _vecB.copy(crystal.pos);
            moveSpeed = 8.4;
          }
        }
      } else if (activeObj.id === 'collect_all_crystals') {
        const crystal = this.findNearestUncollectedCrystal(ctx.crystals, this.position, reservedCrystalId);
        if (crystal) {
          this.activeCrystalTargetId = crystal.id;
          highlightPos = crystal.pos;
          desiredPos = _vecB.copy(crystal.pos);
          arrivalRadius = 3.2;
          moveSpeed = 8.6;
        }
      } else if (activeObj.id === 'activate_great_portal') {
        const dx = this.config.role === 'SEEKER' ? -7.5 : this.config.role === 'VANGUARD' ? 7.5 : 0;
        const dz = this.config.role === 'SCOUT' ? 11.0 : 5.5;
        const portalX = Terrain.PORTAL_POS.x + dx;
        const portalZ = Terrain.PORTAL_POS.z + dz;
        desiredPos = _vecB.set(portalX, terrain.getHeightAt(portalX, portalZ), portalZ);
        highlightPos = Terrain.PORTAL_POS;
      } else if (activeObj.id === 'explore_island') {
        const shard = this.findNearestUncollectedShard(ctx.worldInteractions, this.position, 260, reservedShardId);
        if (shard) {
          this.activeShardTargetId = shard.id;
          highlightPos = shard.pos;
          desiredPos = _vecB.copy(shard.pos);
          arrivalRadius = 2.6;
        } else {
          const scoutX = this.config.role === 'SEEKER' ? -36 : this.config.role === 'VANGUARD' ? 48 : -10;
          const scoutZ = this.config.role === 'SEEKER' ? 42 : this.config.role === 'VANGUARD' ? 34 : -42;
          desiredPos = _vecB.set(scoutX, terrain.getHeightAt(scoutX, scoutZ), scoutZ);
        }
        moveSpeed = 8.2;
      }
    }

    if (this.mode === 'FOLLOW' && playerDist > 58) {
      this.resetToPlayer(ctx.playerPos, terrain);
      return highlightPos;
    }

    if (!desiredPos) {
      const cosY = Math.cos(ctx.playerFacingAngle);
      const sinY = Math.sin(ctx.playerFacingAngle);
      const ox = this.config.formationOffset.x * cosY + this.config.formationOffset.y * sinY;
      const oz = -this.config.formationOffset.x * sinY + this.config.formationOffset.y * cosY;
      const fx = ctx.playerPos.x + ox;
      const fz = ctx.playerPos.z + oz;
      desiredPos = _vecB.set(fx, terrain.getHeightAt(fx, fz), fz);
      arrivalRadius = 1.4;
      moveSpeed = playerDist > 10 ? 11.5 : 7.0;
    }

    _vecA.subVectors(desiredPos, this.position);
    _vecA.y = 0;
    const distToGoal = _vecA.length();

    if (distToGoal > arrivalRadius) {
      _vecA.normalize();
      const step = Math.min(distToGoal, moveSpeed * dt);
      let nextX = this.position.x + _vecA.x * step;
      let nextZ = this.position.z + _vecA.z * step;

      for (let i = 0; i < ctx.obstacles.length; i++) {
        const obs = ctx.obstacles[i];
        if (obs.radius <= 0) continue;
        const dx = nextX - obs.x;
        const dz = nextZ - obs.z;
        const minR = obs.radius + 0.55;
        const dSq = dx * dx + dz * dz;
        if (dSq < minR * minR && dSq > 1e-6) {
          const d = Math.sqrt(dSq);
          nextX = obs.x + (dx / d) * minR;
          nextZ = obs.z + (dz / d) * minR;
        }
      }

      const groundH = terrain.getHeightAt(nextX, nextZ);
      if (groundH >= Terrain.WATER_LEVEL - 0.15) {
        this.position.x = nextX;
        this.position.z = nextZ;
        this.position.y = groundH;
      } else {
        this.position.y = terrain.getHeightAt(this.position.x, this.position.z);
      }

      this.smoothFace(Math.atan2(_vecA.x, _vecA.z), dt * 10);

      this.animTime += dt * (moveSpeed > 8.5 ? 11 : 7.5);
      const swing = Math.sin(this.animTime);
      this.leftLeg.rotation.x = swing * 0.58;
      this.rightLeg.rotation.x = -swing * 0.58;
      this.leftArm.rotation.x = -swing * 0.42;
      if (this.slashTimer <= 0) this.rightArm.rotation.x = swing * 0.42;

      this.stuckCheckTimer += dt;
      if (this.stuckCheckTimer > 2.5) {
        if (this.position.distanceTo(this.lastCheckPos) < 0.35 && distToGoal > 3.0) {
          this.position.x += (Math.random() - 0.5) * 1.6;
          this.position.z += (Math.random() - 0.5) * 1.6;
          this.position.y = terrain.getHeightAt(this.position.x, this.position.z);
        }
        this.lastCheckPos.copy(this.position);
        this.stuckCheckTimer = 0;
      }
    } else {
      this.position.y = terrain.getHeightAt(this.position.x, this.position.z);
      this.setIdleLimbs(timeSec);
    }

    this.group.position.copy(this.position);
    return highlightPos;
  }

  private performCompanionStrike(
    enemy: CorruptedWoodWraith,
    ctx: CompanionContext,
    sound: SoundSynth
  ): void {
    this.attackCooldown = this.config.role === 'VANGUARD' ? 1.05 : this.config.role === 'SCOUT' ? 1.15 : 1.35;
    this.slashTimer = 0.25;

    _vecC.subVectors(enemy.group.position, this.position);
    _vecC.y = 0;
    if (_vecC.lengthSq() > 0.001) _vecC.normalize();

    const dmg = this.config.role === 'VANGUARD' ? 28 : this.config.role === 'SCOUT' ? 25 : 22;
    const died = enemy.takeDamage(dmg, _vecC.multiplyScalar(0.55));
    sound.playEnemyHit();
    if (died) {
      ctx.combatSystem.notifyEnemyDefeated(enemy);
      ctx.onEnemyDefeatedByCompanion(this.config.nameAr);
    }
  }

  private findNearestWraith(
    combat: CombatSystem,
    fromPos: THREE.Vector3,
    maxDist: number
  ): CorruptedWoodWraith | null {
    let best: CorruptedWoodWraith | null = null;
    let bestD = maxDist;
    for (const enemy of combat.enemies) {
      if (enemy.isDead) continue;
      const d = enemy.group.position.distanceTo(fromPos);
      if (d < bestD) {
        bestD = d;
        best = enemy;
      }
    }
    return best;
  }

  private findNearestUncollectedShard(
    interactions: WorldInteractions,
    fromPos: THREE.Vector3,
    maxDist: number,
    excludeId: number | null = null
  ) {
    let best = null;
    let bestD = maxDist;
    for (const shard of interactions.shards) {
      if (shard.collected || shard.id === excludeId) continue;
      const d = shard.pos.distanceTo(fromPos);
      if (d < bestD) {
        bestD = d;
        best = shard;
      }
    }
    return best;
  }

  private findNearestUncollectedCrystal(
    crystals: EchoCrystals,
    fromPos: THREE.Vector3,
    excludeId: number | null = null
  ): CrystalData | null {
    let best: CrystalData | null = null;
    let bestD = Infinity;
    for (const c of crystals.crystals) {
      if (c.collected || c.id === excludeId) continue;
      const d = c.pos.distanceTo(fromPos);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    }
    return best;
  }

  private setIdleLimbs(timeSec: number): void {
    this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, 0, 0.2);
    this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, 0, 0.2);
    this.leftArm.rotation.x = Math.sin(timeSec * 2.0) * 0.04;
    if (this.slashTimer <= 0) {
      this.rightArm.rotation.x = -Math.sin(timeSec * 2.0) * 0.04;
    }
  }

  private smoothFace(targetAngle: number, rate: number): void {
    let diff = targetAngle - this.facingAngle;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    this.facingAngle += diff * Math.min(1.0, rate);
    this.pivotGroup.rotation.y = this.facingAngle;
  }

  public dispose(): void {
    this.staffLight.dispose();
    this.nameplateTexture.dispose();
  }
}

export class QuestCompanionsManager {
  public group: THREE.Group;
  public companions: QuestCompanion[] = [];
  public externalControl: boolean = false;
  private beaconBeam: THREE.Mesh;
  private beaconRing: THREE.Mesh;
  private beaconTimer: number = 0;

  constructor(private terrain: Terrain, private sound: SoundSynth) {
    this.group = new THREE.Group();
    this.group.name = 'QuestCompanionsGroup';

    const configs: CompanionConfig[] = [
      {
        id: 'companion_kaelen',
        nameAr: 'كايلن',
        nameEn: 'Kaelen',
        titleAr: 'فارس الطليعة · السيف القرمزي',
        titleEn: 'Crimson Vanguard',
        role: 'VANGUARD',
        tunicColor: 0x1e293b,
        capeColor: 0x991b1b,
        capeTrimColor: 0x450a0a,
        auraColor: 0xef4444,
        auraHex: '#ef4444',
        hairColor: 0x18151a,
        formationOffset: new THREE.Vector2(-2.7, -1.6),
        offsetAngle: -2.2,
        portraitUrl: './assets/aistudio/900598433_1164583123191976_1751464669737070361_n_5b0b91d8.jpg',
      },
      {
        id: 'companion_lyra',
        nameAr: 'ليرا',
        nameEn: 'Lyra',
        titleAr: 'باحثة الأثير · حارسة الصدى',
        titleEn: 'Amethyst Seeker',
        role: 'SEEKER',
        tunicColor: 0x312e81,
        capeColor: 0x4c1d95,
        capeTrimColor: 0x2e1065,
        auraColor: 0xc084fc,
        auraHex: '#c084fc',
        hairColor: 0xe2e8f0,
        formationOffset: new THREE.Vector2(-1.35, -1.9),
        offsetAngle: 2.2,
        portraitUrl: './assets/aistudio/902496527_1823591332005868_4146964911404786464_n_35a4a4fd.jpg',
      },
      {
        id: 'companion_rowan',
        nameAr: 'روان',
        nameEn: 'Rowan',
        titleAr: 'كشاف الغابة · قوس الزمرد',
        titleEn: 'Emerald Scout',
        role: 'SCOUT',
        tunicColor: 0x1f2937,
        capeColor: 0x166534,
        capeTrimColor: 0x052e16,
        auraColor: 0x4ade80,
        auraHex: '#4ade80',
        hairColor: 0x2d1b12,
        hooded: true,
        formationOffset: new THREE.Vector2(2.3, -1.7),
        offsetAngle: Math.PI,
        portraitUrl: './assets/aistudio/904698870_2436435360497377_3631164325012563485_n_1dc7ed1f.jpg',
      },
    ];

    configs.forEach((cfg) => {
      const comp = new QuestCompanion(cfg, terrain, cfg.formationOffset);
      this.companions.push(comp);
      this.group.add(comp.group);
    });

    const beamGeo = new THREE.CylinderGeometry(0.18, 0.45, 22, 10, 1, true);
    beamGeo.translate(0, 11, 0);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      transparent: true,
      opacity: 0.24,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.beaconBeam = new THREE.Mesh(beamGeo, beamMat);
    this.beaconBeam.visible = false;
    this.group.add(this.beaconBeam);

    const ringGeo = new THREE.RingGeometry(0.9, 1.35, 20);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffd166,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.beaconRing = new THREE.Mesh(ringGeo, ringMat);
    this.beaconRing.visible = false;
    this.group.add(this.beaconRing);
  }

  public getSharedCompanionUnits(): SharedCompanionUnit[] {
    return this.companions.map((c) => c.toSharedUnit());
  }

  public setExternalControl(active: boolean): void {
    this.externalControl = active;
    if (!active) {
      this.attachAllToSelf();
    }
  }

  public attachAllToSelf(): void {
    for (const c of this.companions) {
      if (c.group.parent !== this.group) {
        this.group.add(c.group);
      }
      c.group.position.copy(c.position);
    }
  }

  public resetNearPlayer(playerPos: THREE.Vector3): void {
    this.attachAllToSelf();
    for (const c of this.companions) {
      c.resetToPlayer(playerPos, this.terrain);
    }
  }

  public setAllModes(mode: CompanionMode): void {
    for (const c of this.companions) {
      c.mode = mode;
    }
  }

  public pingObjectiveBeacon(pos: THREE.Vector3): void {
    this.beaconBeam.position.set(pos.x, this.terrain.getHeightAt(pos.x, pos.z), pos.z);
    this.beaconRing.position.set(pos.x, this.terrain.getHeightAt(pos.x, pos.z) + 0.12, pos.z);
    this.beaconBeam.visible = true;
    this.beaconRing.visible = true;
    this.beaconTimer = 18.0;
  }

  public update(
    dt: number,
    timeSec: number,
    cameraPos: THREE.Vector3,
    ctx: CompanionContext,
    talkingCompanionId: string | null
  ): void {
    if (this.externalControl) return;

    let activeHighlight: THREE.Vector3 | null = null;
    let reservedShardId: number | null = null;
    let reservedCrystalId: number | null = null;
    for (const comp of this.companions) {
      const h = comp.update(
        dt,
        timeSec,
        this.terrain,
        cameraPos,
        ctx,
        this.sound,
        talkingCompanionId === comp.config.id,
        reservedShardId,
        reservedCrystalId
      );
      if (comp.activeShardTargetId !== null) reservedShardId = comp.activeShardTargetId;
      if (comp.activeCrystalTargetId !== null) reservedCrystalId = comp.activeCrystalTargetId;
      if (h && !activeHighlight) activeHighlight = h;
    }

    if (this.beaconTimer > 0) {
      this.beaconTimer -= dt;
      const pulse = 1.0 + Math.sin(timeSec * 4.0) * 0.16;
      this.beaconRing.scale.set(pulse, pulse, pulse);
      this.beaconBeam.rotation.y += dt * 0.8;
      if (this.beaconTimer <= 0) {
        this.beaconBeam.visible = false;
        this.beaconRing.visible = false;
      }
    } else if (activeHighlight) {
      const gy = this.terrain.getHeightAt(activeHighlight.x, activeHighlight.z);
      this.beaconBeam.position.set(activeHighlight.x, gy, activeHighlight.z);
      this.beaconRing.position.set(activeHighlight.x, gy + 0.12, activeHighlight.z);
      this.beaconBeam.visible = true;
      this.beaconRing.visible = true;
      const pulse = 1.0 + Math.sin(timeSec * 3.5) * 0.14;
      this.beaconRing.scale.set(pulse, pulse, pulse);
    } else {
      this.beaconBeam.visible = false;
      this.beaconRing.visible = false;
    }
  }

  public findClosestCompanion(playerPos: THREE.Vector3, maxDist: number = 3.6): CompanionInteractInfo | null {
    if (this.externalControl) return null;
    let closest: CompanionInteractInfo | null = null;
    let minD = maxDist;
    for (const c of this.companions) {
      const d = c.position.distanceTo(playerPos);
      if (d < minD) {
        minD = d;
        closest = {
          id: c.config.id,
          nameAr: c.config.nameAr,
          nameEn: c.config.nameEn,
          actionPromptAr: `تحدث مع ${c.config.nameAr} (رفيق المهام)`,
          actionPromptEn: `Speak with ${c.config.nameEn} (Quest Companion)`,
          position: c.position,
          distance: d,
          color: c.config.auraColor,
        };
      }
    }
    return closest;
  }

  public getMinimapBlips(): { pos: { x: number; z: number }; name: string; color: number }[] {
    return this.companions.map((c) => ({
      pos: { x: c.position.x, z: c.position.z },
      name: c.config.nameEn,
      color: c.config.auraColor,
    }));
  }

  public getDialogueFor(
    companionId: string,
    questSystem: QuestSystem,
    crystals: EchoCrystals
  ): DialogueNode | null {
    const comp = this.companions.find((c) => c.config.id === companionId);
    if (!comp) return null;

    const activeObj = questSystem.getActiveObjective();
    const uncollected = crystals.crystals.filter((c) => !c.collected);
    const modeLabelAr = comp.mode === 'ASSIST' ? 'نشط في إنجاز المهام' : 'مرافقة قريبة';

    const msgAr =
      comp.config.role === 'SEEKER'
        ? `أنا ${comp.config.nameAr}، أبحث معك عن الشظايا والبلورات (${modeLabelAr}). ${
            activeObj ? `هدفنا الحالي: «${activeObj.titleAr}».` : 'جميع مهام الفصل مكتملة!'
          } تبقى ${uncollected.length} بلورات صدى.`
        : comp.config.role === 'SCOUT'
        ? `أنا ${comp.config.nameAr}، أستكشف المسارات وأؤمن الغطاء بسهام الزمرد (${modeLabelAr}). ${
            activeObj ? `هدفنا الحالي: «${activeObj.titleAr}».` : 'مستعد للعبور معكم نحو عالم الظل!'
          }`
        : `أنا ${comp.config.nameAr}، أحمي طريقنا وأقاتل أطياف الغابة معك (${modeLabelAr}). ${
            activeObj ? `هدفنا الحالي: «${activeObj.titleAr}».` : 'البوابة العظيمة تنتظر عبورنا!'
          }`;

    const msgEn =
      comp.config.role === 'SEEKER'
        ? `I am ${comp.config.nameEn}, scouting Memory Shards and Echoes with you (${comp.mode}). ${
            activeObj ? `Current goal: "${activeObj.titleEn}".` : 'Chapter complete!'
          } ${uncollected.length} Echo Crystals remain.`
        : comp.config.role === 'SCOUT'
        ? `I am ${comp.config.nameEn}, tracking trails and covering our flank (${comp.mode}). ${
            activeObj ? `Current goal: "${activeObj.titleEn}".` : 'Ready to cross the portal together!'
          }`
        : `I am ${comp.config.nameEn}, fighting Wraiths and leading our vanguard (${comp.mode}). ${
            activeObj ? `Current goal: "${activeObj.titleEn}".` : 'The Great Portal awaits!'
          }`;

    const nextMode: CompanionMode = comp.mode === 'ASSIST' ? 'FOLLOW' : 'ASSIST';

    return {
      id: `${companionId}_root`,
      speakerNameAr: comp.config.nameAr,
      speakerNameEn: comp.config.nameEn,
      titleAr: comp.config.titleAr,
      titleEn: comp.config.titleEn,
      portraitUrl: comp.config.portraitUrl,
      messageAr: msgAr,
      messageEn: msgEn,
      options: [
        {
          textAr:
            nextMode === 'ASSIST'
              ? 'تقدموا وأنجزوا المهام معي (وضع المساعدة)'
              : 'ابقوا بجانبي عن قرب (وضع المرافقة)',
          textEn:
            nextMode === 'ASSIST'
              ? 'Assist & Complete Tasks Ahead (Assist Mode)'
              : 'Stay Close Beside Me (Follow Mode)',
          action: nextMode === 'ASSIST' ? 'COMPANION_ASSIST' : 'COMPANION_FOLLOW',
        },
        {
          textAr: 'أضيئوا طريق الهدف / أقرب بلورة الآن',
          textEn: 'Illuminate Nearest Objective / Crystal Beacon',
          action: 'COMPANION_PING',
        },
        ...(comp.canBless()
          ? [
              {
                textAr: 'شاركوني طاقة الصدى والشفاء (+25 HP)',
                textEn: 'Share Echo Healing (+25 HP & Energy)',
                action: 'COMPANION_HEAL' as const,
              },
            ]
          : []),
        {
          textAr: 'لنواصل الطريق معاً!',
          textEn: 'Let us press onward together!',
          action: 'CLOSE',
        },
      ],
    };
  }

  public triggerHealFrom(companionId: string): boolean {
    const comp = this.companions.find((c) => c.config.id === companionId);
    if (!comp || !comp.canBless()) return false;
    comp.triggerBlessing();
    return true;
  }

  public dispose(): void {
    for (const c of this.companions) {
      c.dispose();
    }
    this.beaconBeam.geometry.dispose();
    (this.beaconBeam.material as THREE.Material).dispose();
    this.beaconRing.geometry.dispose();
    (this.beaconRing.material as THREE.Material).dispose();
  }
}
