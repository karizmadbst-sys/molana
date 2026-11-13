import * as THREE from 'three';
import { Character, WeaponType } from '../player/Character.ts';
import { ThirdPersonCamera } from '../player/ThirdPersonCamera.ts';
import { SoundSynth } from '../audio/SoundSynth.ts';
import { CorruptedWoodWraith } from './CombatSystem.ts';
import { MonsterSpawnData } from '../darkrealm/DarkRealmEntities.ts';

export type { WeaponType };

export interface WeaponHudState {
  weapon: WeaponType;
  ammoInMag: number;
  magSize: number;
  isReloading: boolean;
  reloadProgress: number;
  bowDraw: number;
  isBlocking: boolean;
  isAiming: boolean;
  arrowsCount: number;
}

export interface WeaponUpdateContext {
  realm: 'ISLAND' | 'DARK_REALM';
  enabled: boolean;
  buildMode: boolean;
  hotbarSlot: number;
  isAttackPressed: boolean;
  isAttackHeld: boolean;
  isRightHeld: boolean;
  reloadPressed: boolean;
  arrowsAvailable: number;
  baseDamageBonus: number;
  // Terrain height sampler
  getGroundHeight: (x: number, z: number) => number;
  // World 1 targets
  w1Enemies?: CorruptedWoodWraith[];
  onW1EnemyHit?: (enemy: CorruptedWoodWraith, dmg: number, hitPos: THREE.Vector3) => boolean | void;
  onW1ResourceHit?: (hitPos: THREE.Vector3, dmg: number) => boolean;
  // World 2 targets
  w2Monsters?: MonsterSpawnData[];
  onW2MonsterHit?: (spawnId: number, dmg: number, hitPos: THREE.Vector3) => boolean | void;
  onW2NodeHit?: (hitPos: THREE.Vector3, dmg: number) => boolean;
  onConsumeArrow?: () => boolean;
  onHitConfirm?: (isKill: boolean) => void;
  // Multiplayer shot event
  onShotFired?: (
    weapon: 'pistol' | 'bow',
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    power: number
  ) => void;
}

interface PooledProjectile {
  active: boolean;
  fromRemote: boolean;
  stuck: boolean;
  stuckTimer: number;
  kind: 'pistol' | 'bow';
  pos: THREE.Vector3;
  prevPos: THREE.Vector3;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
  damage: number;
  gravity: number;
  pistolGroup: THREE.Group;
  arrowGroup: THREE.Group;
}

interface PooledSpark {
  active: boolean;
  vel: THREE.Vector3;
  life: number;
  maxLife: number;
  mesh: THREE.Mesh;
}

interface PooledShell {
  active: boolean;
  vel: THREE.Vector3;
  angVel: THREE.Vector3;
  life: number;
  maxLife: number;
  bounced: boolean;
  mesh: THREE.Mesh;
}

const MAX_PROJECTILES = 24;
const MAX_SPARKS = 32;
const MAX_SHELLS = 18;
const UP_VEC = new THREE.Vector3(0, 1, 0);

export class WeaponSystem {
  public readonly group: THREE.Group;
  public activeWeapon: WeaponType = 'sword';

  // Pistol state
  public readonly magSize = 12;
  public ammoInMag = 12;
  public isReloading = false;
  public reloadTimer = 0;
  public readonly reloadDuration = 1.25;
  public pistolRecoil = 0;

  // Bow state
  public bowDraw = 0;
  public isBowDrawing = false;
  private bowDrawSoundPlayed = false;
  private readonly bowChargeDuration = 0.72;

  // Shared state
  public isBlocking = false;
  public isAiming = false;
  private fireCooldown = 0;
  private fppSwingTimer = 0;
  private fppSwingDuration = 0.28;
  private fppSwingCombo = 0;
  private muzzleFlashTimer = 0;
  private bobTime = 0;
  private lastAttackHeld = false;

  // Dependencies
  private scene: THREE.Scene;
  private player: Character;
  private cameraSystem: ThirdPersonCamera;
  private sound: SoundSynth;

  // FPP Viewmodel
  private viewmodelRoot: THREE.Group;
  private fppRightArmGroup: THREE.Group;
  private fppLeftArmGroup: THREE.Group;
  private fppSwordGroup: THREE.Group;
  private fppPistolGroup: THREE.Group;
  private fppPistolSlide!: THREE.Mesh;
  private fppPistolMag!: THREE.Mesh;
  private fppMuzzleFlash!: THREE.Mesh;
  private fppBowGroup: THREE.Group;
  private fppTopLimb!: THREE.Mesh;
  private fppBotLimb!: THREE.Mesh;
  private fppBowStringTop!: THREE.Mesh;
  private fppBowStringBot!: THREE.Mesh;
  private fppNockedArrow!: THREE.Group;

  // Smoothed FPP Viewmodel interpolation state
  private fppSwitchDip = 0;
  private fppRightPos = new THREE.Vector3(0.29, -0.24, -0.44);
  private fppRightRot = new THREE.Euler(0, 0, 0);
  private fppLeftPos = new THREE.Vector3(-0.27, -0.25, -0.46);
  private fppLeftRot = new THREE.Euler(0, 0, 0);

  // Pools
  private projectiles: PooledProjectile[] = [];
  private sparks: PooledSpark[] = [];
  private shells: PooledShell[] = [];

  // Scratch vectors (zero per-frame allocations)
  private readonly tmpOrigin = new THREE.Vector3();
  private readonly tmpDir = new THREE.Vector3();
  private readonly tmpTarget = new THREE.Vector3();
  private readonly tmpSeg = new THREE.Vector3();
  private readonly tmpVec = new THREE.Vector3();
  private readonly tmpQuat = new THREE.Quaternion();
  private readonly raycaster = new THREE.Raycaster();
  private readonly centerNdc = new THREE.Vector2(0, 0);

  constructor(
    scene: THREE.Scene,
    player: Character,
    cameraSystem: ThirdPersonCamera,
    sound: SoundSynth
  ) {
    this.scene = scene;
    this.player = player;
    this.cameraSystem = cameraSystem;
    this.sound = sound;

    this.group = new THREE.Group();
    this.group.name = 'WeaponSystemRoot';
    this.scene.add(this.group);

    this.viewmodelRoot = new THREE.Group();
    this.viewmodelRoot.name = 'FPPViewmodelRoot';
    this.fppRightArmGroup = new THREE.Group();
    this.fppLeftArmGroup = new THREE.Group();
    this.fppSwordGroup = new THREE.Group();
    this.fppPistolGroup = new THREE.Group();
    this.fppBowGroup = new THREE.Group();

    this.buildFppViewmodel();
    this.cameraSystem.camera.add(this.viewmodelRoot);

    this.initPools();
    this.setWeapon('sword', false);
  }

  private buildFppViewmodel(): void {
    const sleeveMat = new THREE.MeshStandardMaterial({
      color: 0x16213e,
      roughness: 0.72,
      metalness: 0.15,
    });
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xe0b899,
      roughness: 0.68,
    });
    const cuffMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.65,
      roughness: 0.3,
    });

    // Right Forearm
    const rSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.34), sleeveMat);
    rSleeve.position.set(0, 0, 0.16);
    const rCuff = new THREE.Mesh(new THREE.BoxGeometry(0.118, 0.118, 0.035), cuffMat);
    rCuff.position.set(0, 0, 0.01);
    const rHand = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.095, 0.12), skinMat);
    rHand.position.set(0, 0, -0.06);
    this.fppRightArmGroup.add(rSleeve, rCuff, rHand);
    this.fppRightArmGroup.position.set(0.29, -0.24, -0.44);

    // Left Forearm (for Bow hold or Sword block guard)
    const lSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.11, 0.34), sleeveMat);
    lSleeve.position.set(0, 0, 0.16);
    const lCuff = new THREE.Mesh(new THREE.BoxGeometry(0.118, 0.118, 0.035), cuffMat);
    lCuff.position.set(0, 0, 0.01);
    const lHand = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.095, 0.12), skinMat);
    lHand.position.set(0, 0, -0.06);
    this.fppLeftArmGroup.add(lSleeve, lCuff, lHand);
    this.fppLeftArmGroup.position.set(-0.27, -0.25, -0.46);

    // 1. FPP Sword
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x99f6e4,
      emissive: 0x00f5d4,
      emissiveIntensity: 0.55,
      roughness: 0.18,
      metalness: 0.8,
    });
    const guardMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.28,
      metalness: 0.85,
    });
    const hiltMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.8,
    });
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.52, 0.055), bladeMat);
    blade.position.set(0, 0.31, -0.04);
    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.032, 0.065), guardMat);
    guard.position.set(0, 0.045, -0.04);
    const hilt = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.14, 8), hiltMat);
    hilt.position.set(0, -0.03, -0.04);
    this.fppSwordGroup.add(blade, guard, hilt);
    this.fppSwordGroup.position.set(0, 0.02, -0.06);
    this.fppSwordGroup.rotation.set(-0.32, 0.12, 0.18);
    this.fppRightArmGroup.add(this.fppSwordGroup);

    // 2. FPP Pistol
    const gunFrameMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
      metalness: 0.78,
    });
    const gunSlideMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.25,
      metalness: 0.9,
    });
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.125, 0.055), hiltMat);
    grip.position.set(0, -0.03, -0.03);
    grip.rotation.x = 0.24;
    this.fppPistolMag = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.105, 0.042), gunSlideMat);
    this.fppPistolMag.position.set(0, -0.045, -0.025);
    this.fppPistolMag.rotation.x = 0.24;
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.042, 0.24), gunFrameMat);
    frame.position.set(0, 0.038, -0.10);
    this.fppPistolSlide = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.045, 0.235), gunSlideMat);
    this.fppPistolSlide.position.set(0, 0.072, -0.10);
    const coreStrip = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.012, 0.16), cuffMat);
    coreStrip.position.set(0, 0.054, -0.11);
    const sight = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.016, 0.018), cuffMat);
    sight.position.set(0, 0.1, -0.19);
    const flashMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.92,
    });
    this.fppMuzzleFlash = new THREE.Mesh(new THREE.OctahedronGeometry(0.055, 0), flashMat);
    this.fppMuzzleFlash.position.set(0, 0.07, -0.245);
    this.fppMuzzleFlash.visible = false;
    this.fppPistolGroup.add(
      grip,
      this.fppPistolMag,
      frame,
      this.fppPistolSlide,
      coreStrip,
      sight,
      this.fppMuzzleFlash
    );
    this.fppPistolGroup.position.set(0, 0.02, -0.05);
    this.fppRightArmGroup.add(this.fppPistolGroup);

    // 3. FPP Recurve Bow
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.65 });
    const bowRiser = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.26, 0.048), guardMat);
    this.fppTopLimb = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.24, 0.034), woodMat);
    this.fppTopLimb.position.set(0, 0.22, 0.04);
    this.fppTopLimb.rotation.x = -0.34;
    this.fppBotLimb = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.24, 0.034), woodMat);
    this.fppBotLimb.position.set(0, -0.22, 0.04);
    this.fppBotLimb.rotation.x = 0.34;
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    this.fppBowStringTop = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.31, 6), stringMat);
    this.fppBowStringTop.position.set(0, 0.155, 0.09);
    this.fppBowStringBot = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.31, 6), stringMat);
    this.fppBowStringBot.position.set(0, -0.155, 0.09);

    this.fppNockedArrow = this.createArrowVisualMesh();
    this.fppNockedArrow.rotation.x = -Math.PI / 2;
    this.fppNockedArrow.scale.setScalar(0.55);
    this.fppNockedArrow.position.set(0, 0.02, -0.10);

    this.fppBowGroup.add(
      bowRiser,
      this.fppTopLimb,
      this.fppBotLimb,
      this.fppBowStringTop,
      this.fppBowStringBot,
      this.fppNockedArrow
    );
    this.fppBowGroup.position.set(0.02, 0.05, -0.08);
    this.fppBowGroup.rotation.z = -0.18;
    this.fppLeftArmGroup.add(this.fppBowGroup);

    this.viewmodelRoot.add(this.fppRightArmGroup, this.fppLeftArmGroup);

    this.viewmodelRoot.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        m.castShadow = false;
        m.receiveShadow = false;
        m.frustumCulled = false;
      }
    });
  }

  private createArrowVisualMesh(): THREE.Group {
    const g = new THREE.Group();
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.7 });
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.25,
    });
    const fletchMat = new THREE.MeshBasicMaterial({ color: 0x4ade80, side: THREE.DoubleSide });

    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.75, 6), shaftMat);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.12, 6), headMat);
    tip.position.y = 0.42;
    const f1 = new THREE.Mesh(new THREE.PlaneGeometry(0.055, 0.14), fletchMat);
    f1.position.y = -0.32;
    const f2 = new THREE.Mesh(new THREE.PlaneGeometry(0.055, 0.14), fletchMat);
    f2.position.y = -0.32;
    f2.rotation.y = Math.PI / 2;

    g.add(shaft, tip, f1, f2);
    return g;
  }

  private createPistolTracerVisualMesh(): THREE.Group {
    const g = new THREE.Group();
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
    });
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.65, 6), coreMat);
    const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.032, 0.82, 6), glowMat);
    g.add(core, glow);
    return g;
  }

  private initPools(): void {
    for (let i = 0; i < MAX_PROJECTILES; i++) {
      const pistolGroup = this.createPistolTracerVisualMesh();
      const arrowGroup = this.createArrowVisualMesh();
      pistolGroup.visible = false;
      arrowGroup.visible = false;
      this.group.add(pistolGroup, arrowGroup);
      this.projectiles.push({
        active: false,
        fromRemote: false,
        stuck: false,
        stuckTimer: 0,
        kind: 'pistol',
        pos: new THREE.Vector3(),
        prevPos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        life: 0,
        maxLife: 1,
        damage: 0,
        gravity: 0,
        pistolGroup,
        arrowGroup,
      });
    }

    const sparkGeo = new THREE.OctahedronGeometry(0.055, 0);
    for (let i = 0; i < MAX_SPARKS; i++) {
      const sparkMat = new THREE.MeshBasicMaterial({
        color: 0xfacc15,
        transparent: true,
        opacity: 1,
      });
      const mesh = new THREE.Mesh(sparkGeo, sparkMat);
      mesh.visible = false;
      this.group.add(mesh);
      this.sparks.push({
        active: false,
        vel: new THREE.Vector3(),
        life: 0,
        maxLife: 0.3,
        mesh,
      });
    }

    const shellGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.048, 6);
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.22,
    });
    for (let i = 0; i < MAX_SHELLS; i++) {
      const mesh = new THREE.Mesh(shellGeo, shellMat);
      mesh.visible = false;
      this.group.add(mesh);
      this.shells.push({
        active: false,
        vel: new THREE.Vector3(),
        angVel: new THREE.Vector3(),
        life: 0,
        maxLife: 1.15,
        bounced: false,
        mesh,
      });
    }
  }

  public setWeapon(weapon: WeaponType, playSound = true): void {
    if (this.activeWeapon === weapon) {
      this.player.setEquippedWeapon(weapon);
      return;
    }
    this.activeWeapon = weapon;
    this.bowDraw = 0;
    this.isBowDrawing = false;
    this.bowDrawSoundPlayed = false;
    this.isBlocking = false;
    this.isAiming = false;
    this.isReloading = false;
    this.reloadTimer = 0;
    this.pistolRecoil = 0;
    this.fppSwitchDip = 0.16;
    this.player.setEquippedWeapon(weapon);
    if (playSound) {
      this.sound.playBlockRotate();
    }
  }

  public startReload(): boolean {
    if (this.activeWeapon !== 'pistol') return false;
    if (this.isReloading || this.ammoInMag >= this.magSize) return false;
    this.isReloading = true;
    this.reloadTimer = this.reloadDuration;
    this.sound.playPistolReload();
    return true;
  }

  public getHudState(arrowsCount: number): WeaponHudState {
    return {
      weapon: this.activeWeapon,
      ammoInMag: this.ammoInMag,
      magSize: this.magSize,
      isReloading: this.isReloading,
      reloadProgress: this.isReloading
        ? Math.max(0, Math.min(1, 1 - this.reloadTimer / this.reloadDuration))
        : 1,
      bowDraw: this.bowDraw,
      isBlocking: this.isBlocking,
      isAiming: this.isAiming,
      arrowsCount,
    };
  }

  public update(dt: number, ctx: WeaponUpdateContext): void {
    const safeDt = Math.min(dt, 0.05);

    if (this.fireCooldown > 0) this.fireCooldown = Math.max(0, this.fireCooldown - safeDt);
    if (this.pistolRecoil > 0) this.pistolRecoil = Math.max(0, this.pistolRecoil - safeDt * 6.5);
    if (this.muzzleFlashTimer > 0) {
      this.muzzleFlashTimer -= safeDt;
      if (this.muzzleFlashTimer <= 0) {
        this.fppMuzzleFlash.visible = false;
      }
    }
    if (this.fppSwingTimer > 0) {
      this.fppSwingTimer = Math.max(0, this.fppSwingTimer - safeDt);
    }

    // Handle reload timer
    if (this.isReloading) {
      this.reloadTimer -= safeDt;
      if (this.reloadTimer <= 0) {
        this.isReloading = false;
        this.reloadTimer = 0;
        this.ammoInMag = this.magSize;
      }
    }

    const canCombat =
      ctx.enabled &&
      !ctx.buildMode &&
      !this.player.isDead &&
      !(ctx.hotbarSlot === 1 || ctx.hotbarSlot === 2);

    if (canCombat) {
      if (ctx.reloadPressed && this.activeWeapon === 'pistol') {
        this.startReload();
      }

      // Secondary action (RMB): Sword Block OR Pistol/Bow ADS Aim
      this.isBlocking = this.activeWeapon === 'sword' && ctx.isRightHeld && !this.player.isDodging;
      this.isAiming =
        (this.activeWeapon === 'pistol' || this.activeWeapon === 'bow') &&
        ctx.isRightHeld &&
        !this.isReloading;

      if (this.activeWeapon === 'pistol') {
        if (ctx.isAttackPressed && this.fireCooldown <= 0) {
          this.firePistol(ctx);
        }
        this.bowDraw = 0;
        this.isBowDrawing = false;
      } else if (this.activeWeapon === 'bow') {
        if (ctx.isAttackPressed && !this.isBowDrawing && this.fireCooldown <= 0) {
          this.isBowDrawing = true;
          this.bowDraw = 0.08;
          this.bowDrawSoundPlayed = false;
        }
        if (this.isBowDrawing && ctx.isAttackHeld) {
          this.bowDraw = Math.min(1, this.bowDraw + safeDt / this.bowChargeDuration);
          if (!this.bowDrawSoundPlayed && this.bowDraw > 0.14) {
            this.bowDrawSoundPlayed = true;
            this.sound.playBowDraw();
          }
        } else if (this.isBowDrawing && !ctx.isAttackHeld) {
          const releasePower = Math.max(0.35, this.bowDraw);
          this.releaseBowArrow(ctx, releasePower);
          this.isBowDrawing = false;
          this.bowDraw = 0;
          this.bowDrawSoundPlayed = false;
        }
      } else {
        // Sword (FPP swing timing follows character attack)
        this.bowDraw = 0;
        this.isBowDrawing = false;
        if (ctx.isAttackPressed) {
          this.fppSwingCombo = (this.fppSwingCombo + 1) % 3;
          this.fppSwingDuration = 0.28;
          this.fppSwingTimer = this.fppSwingDuration;
        }
      }
    } else {
      this.isBlocking = false;
      this.isAiming = false;
      this.isBowDrawing = false;
      this.bowDraw = 0;
    }

    this.lastAttackHeld = ctx.isAttackHeld;

    // Sync Camera ADS & Character Pose
    this.cameraSystem.isAiming = this.isAiming && ctx.enabled && !ctx.buildMode;
    this.player.setCombatPose({
      isBlocking: this.isBlocking,
      isAiming: this.isAiming,
      bowDraw: this.bowDraw,
      pistolRecoil: this.pistolRecoil,
    });

    // Update FPP viewmodel & active pooled projectiles/sparks/shells
    this.updateFppViewmodel(safeDt, ctx.enabled && !ctx.buildMode && !this.player.isDead);
    this.updateProjectiles(safeDt, ctx);
    this.updateSparks(safeDt);
    this.updateShells(safeDt, ctx.getGroundHeight);
  }

  private computeAimDirectionAndOrigin(_weapon: 'pistol' | 'bow'): {
    origin: THREE.Vector3;
    dir: THREE.Vector3;
  } {
    this.raycaster.setFromCamera(this.centerNdc, this.cameraSystem.camera);
    this.tmpDir.copy(this.raycaster.ray.direction).normalize();
    this.tmpTarget.copy(this.raycaster.ray.origin).addScaledVector(this.tmpDir, 45);

    if (this.cameraSystem.isFirstPerson) {
      this.tmpOrigin
        .copy(this.cameraSystem.camera.position)
        .addScaledVector(this.tmpDir, 0.52);
      this.tmpOrigin.y -= 0.08;
    } else {
      this.player.getWeaponMuzzleWorldPosition(this.tmpOrigin);
      // Align character facing toward camera aim horizontally
      const aimYaw = Math.atan2(this.tmpDir.x, this.tmpDir.z);
      this.player.setFacingAngleInstant(aimYaw);
    }

    this.tmpDir.copy(this.tmpTarget).sub(this.tmpOrigin).normalize();
    return { origin: this.tmpOrigin, dir: this.tmpDir };
  }

  private firePistol(ctx: WeaponUpdateContext): void {
    if (this.isReloading) return;
    if (this.ammoInMag <= 0) {
      this.sound.playPistolDryFire();
      this.fireCooldown = 0.25;
      this.startReload();
      return;
    }

    this.ammoInMag -= 1;
    this.fireCooldown = 0.21;
    this.pistolRecoil = 1.0;
    this.muzzleFlashTimer = 0.06;
    if (this.cameraSystem.isFirstPerson) {
      this.fppMuzzleFlash.visible = true;
      this.fppMuzzleFlash.rotation.z = Math.random() * Math.PI;
    }

    const { origin, dir } = this.computeAimDirectionAndOrigin('pistol');
    const dmg = 34 + ctx.baseDamageBonus;
    this.spawnProjectileInternal('pistol', origin, dir, 95, dmg, 0, false);
    this.spawnBrassShell(origin, dir);

    this.sound.playPistolShoot();
    this.cameraSystem.addRecoilKick(0.024, (Math.random() - 0.5) * 0.012);
    this.player.triggerRangedAction('pistol', 1.0);
    ctx.onShotFired?.('pistol', origin, dir, 1.0);

    if (this.ammoInMag === 0) {
      this.startReload();
    }
  }

  private releaseBowArrow(ctx: WeaponUpdateContext, power: number): void {
    this.fireCooldown = 0.24;
    const { origin, dir } = this.computeAimDirectionAndOrigin('bow');
    let dmg = Math.round((24 + ctx.baseDamageBonus * 1.1) * (0.5 + 0.85 * power));
    if (ctx.arrowsAvailable > 0 && ctx.onConsumeArrow) {
      ctx.onConsumeArrow();
    } else if (ctx.arrowsAvailable <= 0 && ctx.realm === 'DARK_REALM') {
      // Slightly reduced damage if out of crafted arrows in W2 so player is never soft-locked
      dmg = Math.round(dmg * 0.65);
    }

    const speed = 26 + 38 * power;
    this.spawnProjectileInternal('bow', origin, dir, speed, dmg, 14.5, false);

    this.sound.playBowRelease(power);
    this.cameraSystem.addRecoilKick(0.012 * power, 0);
    this.player.triggerRangedAction('bow', power);
    ctx.onShotFired?.('bow', origin, dir, power);
  }

  public spawnRemoteShot(
    weapon: 'pistol' | 'bow',
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    power: number = 1.0
  ): void {
    const speed = weapon === 'pistol' ? 95 : 26 + 38 * Math.max(0.35, Math.min(1, power));
    const gravity = weapon === 'pistol' ? 0 : 14.5;
    this.spawnProjectileInternal(weapon, origin, dir, speed, 0, gravity, true);
  }

  private spawnProjectileInternal(
    kind: 'pistol' | 'bow',
    origin: THREE.Vector3,
    dir: THREE.Vector3,
    speed: number,
    damage: number,
    gravity: number,
    fromRemote: boolean
  ): void {
    let slot = this.projectiles.find((p) => !p.active);
    if (!slot) slot = this.projectiles[0];

    slot.active = true;
    slot.fromRemote = fromRemote;
    slot.stuck = false;
    slot.stuckTimer = 0;
    slot.kind = kind;
    slot.pos.copy(origin);
    slot.prevPos.copy(origin);
    slot.vel.copy(dir).normalize().multiplyScalar(speed);
    slot.life = 0;
    slot.maxLife = kind === 'pistol' ? 0.9 : 2.6;
    slot.damage = damage;
    slot.gravity = gravity;

    const visual = kind === 'pistol' ? slot.pistolGroup : slot.arrowGroup;
    const other = kind === 'pistol' ? slot.arrowGroup : slot.pistolGroup;
    other.visible = false;
    visual.visible = true;
    visual.position.copy(origin);
    this.tmpVec.copy(slot.vel).normalize();
    this.tmpQuat.setFromUnitVectors(UP_VEC, this.tmpVec);
    visual.quaternion.copy(this.tmpQuat);
  }

  private getMonsterHitDimensions(type: MonsterSpawnData['type']): { radius: number; height: number } {
    switch (type) {
      case 'DARK_BOSS':
        return { radius: 3.2, height: 4.8 };
      case 'SHADOW_DRAGON':
        return { radius: 3.0, height: 4.2 };
      case 'STONE_GOLEM':
        return { radius: 1.85, height: 3.4 };
      default:
        return { radius: 1.25, height: 2.3 };
    }
  }

  private updateProjectiles(dt: number, ctx: WeaponUpdateContext): void {
    for (let i = 0; i < this.projectiles.length; i++) {
      const p = this.projectiles[i];
      if (!p.active) continue;

      if (p.stuck) {
        p.stuckTimer -= dt;
        if (p.stuckTimer <= 0) {
          this.deactivateProjectile(p);
        }
        continue;
      }

      p.life += dt;
      if (p.life >= p.maxLife) {
        this.deactivateProjectile(p);
        continue;
      }

      p.prevPos.copy(p.pos);
      if (p.gravity > 0) {
        p.vel.y -= p.gravity * dt;
      }
      p.pos.addScaledVector(p.vel, dt);

      const visual = p.kind === 'pistol' ? p.pistolGroup : p.arrowGroup;
      visual.position.copy(p.pos);
      if (p.vel.lengthSq() > 0.001) {
        this.tmpVec.copy(p.vel).normalize();
        this.tmpQuat.setFromUnitVectors(UP_VEC, this.tmpVec);
        visual.quaternion.copy(this.tmpQuat);
      }

      let hit = false;
      let hitSolidStick = false;

      if (!p.fromRemote) {
        if (ctx.realm === 'ISLAND' && ctx.w1Enemies) {
          for (let eIdx = 0; eIdx < ctx.w1Enemies.length; eIdx++) {
            const enemy = ctx.w1Enemies[eIdx];
            if (enemy.isDead) continue;
            const ePos = enemy.group.position;
            if (this.segmentHitsCylinder(p.prevPos, p.pos, ePos.x, ePos.y, ePos.z, 1.15, 2.2)) {
              const killed = Boolean(ctx.onW1EnemyHit?.(enemy, p.damage, p.pos));
              ctx.onHitConfirm?.(killed);
              this.spawnImpactSparks(p.pos, 0x38bdf8, 8);
              if (p.kind === 'bow') this.sound.playArrowImpact(true);
              else this.sound.playBulletImpact(true);
              hit = true;
              break;
            }
          }
        } else if (ctx.realm === 'DARK_REALM' && ctx.w2Monsters) {
          for (let mIdx = 0; mIdx < ctx.w2Monsters.length; mIdx++) {
            const m = ctx.w2Monsters[mIdx];
            if (!m.alive) continue;
            const { radius, height } = this.getMonsterHitDimensions(m.type);
            if (
              this.segmentHitsCylinder(
                p.prevPos,
                p.pos,
                m.pos.x,
                m.pos.y,
                m.pos.z,
                radius,
                height
              )
            ) {
              const killed = Boolean(ctx.onW2MonsterHit?.(m.id, p.damage, p.pos));
              ctx.onHitConfirm?.(killed);
              this.spawnImpactSparks(p.pos, 0xf87171, 8);
              if (p.kind === 'bow') this.sound.playArrowImpact(true);
              else this.sound.playBulletImpact(true);
              hit = true;
              break;
            }
          }
        }

        // Check resource node / tree impact if not already hit enemy
        if (!hit) {
          if (ctx.realm === 'ISLAND' && ctx.onW1ResourceHit) {
            if (ctx.onW1ResourceHit(p.pos, Math.round(p.damage * 0.45))) {
              this.spawnImpactSparks(p.pos, 0xfbbf24, 6);
              if (p.kind === 'bow') {
                this.sound.playArrowImpact(false);
                hitSolidStick = true;
              } else {
                this.sound.playBulletImpact(false);
              }
              hit = true;
            }
          } else if (ctx.realm === 'DARK_REALM' && ctx.onW2NodeHit) {
            if (ctx.onW2NodeHit(p.pos, Math.round(p.damage * 0.45))) {
              this.spawnImpactSparks(p.pos, 0xfbbf24, 6);
              if (p.kind === 'bow') {
                this.sound.playArrowImpact(false);
                hitSolidStick = true;
              } else {
                this.sound.playBulletImpact(false);
              }
              hit = true;
            }
          }
        }
      }

      if (!hit) {
        const groundY = ctx.getGroundHeight(p.pos.x, p.pos.z);
        if (p.pos.y <= groundY + 0.04) {
          p.pos.y = groundY + 0.04;
          visual.position.copy(p.pos);
          this.spawnImpactSparks(p.pos, p.kind === 'pistol' ? 0x38bdf8 : 0xfbbf24, 5);
          if (p.kind === 'bow') {
            this.sound.playArrowImpact(false);
            hitSolidStick = true;
          } else {
            this.sound.playBulletImpact(false);
          }
          hit = true;
        }
      }

      if (hit) {
        if (hitSolidStick && p.kind === 'bow') {
          p.stuck = true;
          p.stuckTimer = 0.85;
          p.vel.set(0, 0, 0);
        } else {
          this.deactivateProjectile(p);
        }
      }
    }
  }

  private segmentHitsCylinder(
    a: THREE.Vector3,
    b: THREE.Vector3,
    cx: number,
    cy: number,
    cz: number,
    radius: number,
    height: number
  ): boolean {
    this.tmpSeg.copy(b).sub(a);
    const lenSq = this.tmpSeg.lengthSq();
    let t = 0;
    if (lenSq > 1e-6) {
      t = ((cx - a.x) * this.tmpSeg.x + (cz - a.z) * this.tmpSeg.z) / lenSq;
      t = Math.max(0, Math.min(1, t));
    }
    const px = a.x + this.tmpSeg.x * t;
    const py = a.y + this.tmpSeg.y * t;
    const pz = a.z + this.tmpSeg.z * t;
    const dx = px - cx;
    const dz = pz - cz;
    return dx * dx + dz * dz <= radius * radius && py >= cy - 1.5 && py <= cy + height;
  }

  private deactivateProjectile(p: PooledProjectile): void {
    p.active = false;
    p.stuck = false;
    p.stuckTimer = 0;
    p.pistolGroup.visible = false;
    p.arrowGroup.visible = false;
  }

  public spawnImpactSparks(pos: THREE.Vector3, colorHex: number, count = 6): void {
    let spawned = 0;
    for (let i = 0; i < this.sparks.length && spawned < count; i++) {
      const s = this.sparks[i];
      if (s.active) continue;
      s.active = true;
      s.life = 0;
      s.maxLife = 0.22 + Math.random() * 0.14;
      s.mesh.position.copy(pos);
      s.mesh.visible = true;
      s.mesh.scale.setScalar(1.0);
      const mat = s.mesh.material as THREE.MeshBasicMaterial;
      mat.color.setHex(colorHex);
      mat.opacity = 1;
      s.vel.set(
        (Math.random() - 0.5) * 5.2,
        1.2 + Math.random() * 3.8,
        (Math.random() - 0.5) * 5.2
      );
      spawned++;
    }
  }

  private spawnBrassShell(origin: THREE.Vector3, dir: THREE.Vector3): void {
    let slot = this.shells.find((s) => !s.active);
    if (!slot) slot = this.shells[0];

    slot.active = true;
    slot.life = 0;
    slot.maxLife = 1.15;
    slot.bounced = false;
    slot.mesh.visible = true;
    slot.mesh.position.copy(origin);
    slot.mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    // Rightward ejection perpendicular to shot direction
    this.tmpVec.crossVectors(dir, UP_VEC).normalize();
    slot.vel
      .copy(this.tmpVec)
      .multiplyScalar(2.4 + Math.random() * 1.1)
      .addScaledVector(dir, -0.4);
    slot.vel.y = 2.1 + Math.random() * 1.1;
    slot.angVel.set(16 + Math.random() * 12, 12 + Math.random() * 10, 18);
  }

  private updateShells(dt: number, getGroundHeight: (x: number, z: number) => number): void {
    for (let i = 0; i < this.shells.length; i++) {
      const s = this.shells[i];
      if (!s.active) continue;
      s.life += dt;
      if (s.life >= s.maxLife) {
        s.active = false;
        s.mesh.visible = false;
        continue;
      }
      s.vel.y -= 14.5 * dt;
      s.mesh.position.addScaledVector(s.vel, dt);
      s.mesh.rotation.x += s.angVel.x * dt;
      s.mesh.rotation.y += s.angVel.y * dt;
      s.mesh.rotation.z += s.angVel.z * dt;

      const gy = getGroundHeight(s.mesh.position.x, s.mesh.position.z);
      if (s.mesh.position.y <= gy + 0.025) {
        s.mesh.position.y = gy + 0.025;
        if (!s.bounced) {
          s.bounced = true;
          s.vel.y = Math.abs(s.vel.y) * 0.42;
          s.vel.x *= 0.55;
          s.vel.z *= 0.55;
        } else {
          s.vel.set(0, 0, 0);
          s.angVel.multiplyScalar(0.6);
        }
      }
    }
  }

  private updateSparks(dt: number): void {
    for (let i = 0; i < this.sparks.length; i++) {
      const s = this.sparks[i];
      if (!s.active) continue;
      s.life += dt;
      if (s.life >= s.maxLife) {
        s.active = false;
        s.mesh.visible = false;
        continue;
      }
      s.vel.y -= 9.8 * dt;
      s.mesh.position.addScaledVector(s.vel, dt);
      const ratio = 1 - s.life / s.maxLife;
      s.mesh.scale.setScalar(ratio);
      (s.mesh.material as THREE.MeshBasicMaterial).opacity = ratio;
    }
  }

  private updateFppViewmodel(dt: number, shouldShow: boolean): void {
    const perspBlend = this.cameraSystem.getPerspectiveBlend();
    const visible = perspBlend > 0.35 && shouldShow;
    this.viewmodelRoot.visible = visible;
    if (!visible) return;

    if (this.fppSwitchDip > 0) {
      this.fppSwitchDip = Math.max(0, this.fppSwitchDip - dt * 1.1);
    }

    const blendInOffset = (1 - THREE.MathUtils.smoothstep(perspBlend, 0.35, 0.95)) * 0.16;
    const dipY = this.fppSwitchDip * 0.65 + blendInOffset;

    this.bobTime += dt * (this.player.isMoving ? (this.player.isSprinting ? 11.5 : 7.5) : 2.1);
    const bobAmp = this.player.isMoving ? (this.player.isSprinting ? 0.02 : 0.011) : 0.004;
    const bobX = Math.cos(this.bobTime) * bobAmp;
    const bobY = Math.abs(Math.sin(this.bobTime)) * bobAmp;

    this.fppSwordGroup.visible = this.activeWeapon === 'sword';
    this.fppPistolGroup.visible = this.activeWeapon === 'pistol';
    this.fppBowGroup.visible = this.activeWeapon === 'bow';

    let targetRX = 0.29;
    let targetRY = -0.24;
    let targetRZ = -0.44;
    let targetRRotX = 0;
    let targetRRotY = 0;
    let targetRRotZ = 0;

    let targetLX = -0.27;
    let targetLY = -0.25;
    let targetLZ = -0.46;
    let targetLRotX = 0;
    let targetLRotY = 0;
    let targetLRotZ = 0;

    if (this.activeWeapon === 'sword') {
      this.fppRightArmGroup.visible = true;
      this.fppLeftArmGroup.visible = this.isBlocking;
      if (this.isBlocking) {
        targetRX = 0.14 + bobX * 0.3;
        targetRY = -0.14 + bobY * 0.3;
        targetRZ = -0.36;
        targetRRotX = -0.35;
        targetRRotY = 0.55;
        targetRRotZ = 0.92;
        targetLX = -0.18 + bobX * 0.3;
        targetLY = -0.18 + bobY * 0.3;
        targetLZ = -0.38;
        targetLRotX = -0.2;
        targetLRotY = -0.35;
        targetLRotZ = -0.2;
      } else if (this.fppSwingTimer > 0) {
        const p = 1 - this.fppSwingTimer / this.fppSwingDuration;
        const arc = Math.sin(p * Math.PI);
        const dirSign = this.fppSwingCombo % 2 === 0 ? 1 : -1;
        targetRX = 0.26 - arc * 0.22 * dirSign;
        targetRY = -0.22 - arc * 0.08;
        targetRZ = -0.44 - arc * 0.1;
        targetRRotX = -0.2 - arc * 1.15;
        targetRRotY = 0.12 + arc * 0.75 * dirSign;
        targetRRotZ = 0.18 + arc * 0.55 * dirSign;
      } else {
        targetRX = 0.29 + bobX;
        targetRY = -0.24 + bobY;
        targetRZ = -0.44;
      }
    } else if (this.activeWeapon === 'pistol') {
      this.fppRightArmGroup.visible = true;
      this.fppLeftArmGroup.visible = false;
      const aimMix = this.isAiming ? 1 : 0;
      const reloadP = this.isReloading
        ? Math.max(0, Math.min(1, 1 - this.reloadTimer / this.reloadDuration))
        : 0;
      const reloadTilt = this.isReloading ? Math.sin(reloadP * Math.PI) : 0;

      targetRX = THREE.MathUtils.lerp(0.26, 0.0, aimMix) + bobX * (1 - aimMix * 0.7);
      targetRY = THREE.MathUtils.lerp(-0.22, -0.145, aimMix) + bobY * (1 - aimMix * 0.7) - reloadTilt * 0.14;
      targetRZ = THREE.MathUtils.lerp(-0.42, -0.34, aimMix) + this.pistolRecoil * 0.065;
      targetRRotX = this.pistolRecoil * 0.28 - reloadTilt * 0.52;
      targetRRotZ = reloadTilt * 0.45;
      this.fppPistolSlide.position.z = -0.10 + this.pistolRecoil * 0.058 + (reloadP > 0.72 ? (1 - reloadP) * 0.18 : 0);

      // Animate detachable magazine dropping out and snapping cleanly into grip
      if (this.fppPistolMag) {
        let magDrop = 0;
        if (this.isReloading) {
          if (reloadP < 0.35) magDrop = (reloadP / 0.35) * 0.16;
          else if (reloadP < 0.7) magDrop = (1 - (reloadP - 0.35) / 0.35) * 0.16;
        }
        this.fppPistolMag.position.y = -0.045 - magDrop;
        this.fppPistolMag.position.z = -0.025 + magDrop * 0.24;
      }
    } else {
      // Recurve Bow
      this.fppRightArmGroup.visible = true;
      this.fppLeftArmGroup.visible = true;
      const aimMix = this.isAiming ? 1 : 0;
      const pull = this.bowDraw;

      targetLX = THREE.MathUtils.lerp(-0.24, -0.06, aimMix) + bobX * 0.4;
      targetLY = THREE.MathUtils.lerp(-0.21, -0.11, aimMix) + bobY * 0.4;
      targetLZ = THREE.MathUtils.lerp(-0.48, -0.43, aimMix);
      targetLRotX = 0.06;
      targetLRotY = -0.08;
      targetLRotZ = 0.08;

      targetRX = THREE.MathUtils.lerp(0.24, -0.02, Math.max(aimMix, pull * 0.85));
      targetRY = THREE.MathUtils.lerp(-0.24, -0.10, Math.max(aimMix, pull * 0.85));
      targetRZ = THREE.MathUtils.lerp(-0.44, -0.20, pull);
      targetRRotX = 0.15;
      targetRRotY = 0.35;

      // 2-segment V-shaped string stretch + flexing limbs
      const pullZ = pull * 0.18;
      const midZ = 0.09 + pullZ * 0.5;
      const strTilt = Math.atan2(pullZ, 0.31);
      const strScale = Math.hypot(0.31, pullZ) / 0.31;

      this.fppBowStringTop.position.set(0, 0.155, midZ);
      this.fppBowStringTop.rotation.x = strTilt;
      this.fppBowStringTop.scale.y = strScale;

      this.fppBowStringBot.position.set(0, -0.155, midZ);
      this.fppBowStringBot.rotation.x = -strTilt;
      this.fppBowStringBot.scale.y = strScale;

      this.fppTopLimb.rotation.x = -0.34 - pull * 0.16;
      this.fppBotLimb.rotation.x = 0.34 + pull * 0.16;

      this.fppNockedArrow.position.z = -0.10 + pullZ;
      this.fppNockedArrow.visible = !this.isBowDrawing || pull > 0.02;
    }

    // Exponential damping on FPP viewmodel arms for silky-smooth motion
    const armAlpha = 1 - Math.exp(-24.0 * dt);
    this.fppRightPos.set(targetRX, targetRY - dipY, targetRZ);
    this.fppRightArmGroup.position.lerp(this.fppRightPos, armAlpha);
    this.fppRightRot.set(targetRRotX, targetRRotY, targetRRotZ);
    this.fppRightArmGroup.rotation.x = THREE.MathUtils.lerp(this.fppRightArmGroup.rotation.x, this.fppRightRot.x, armAlpha);
    this.fppRightArmGroup.rotation.y = THREE.MathUtils.lerp(this.fppRightArmGroup.rotation.y, this.fppRightRot.y, armAlpha);
    this.fppRightArmGroup.rotation.z = THREE.MathUtils.lerp(this.fppRightArmGroup.rotation.z, this.fppRightRot.z, armAlpha);

    this.fppLeftPos.set(targetLX, targetLY - dipY, targetLZ);
    this.fppLeftArmGroup.position.lerp(this.fppLeftPos, armAlpha);
    this.fppLeftRot.set(targetLRotX, targetLRotY, targetLRotZ);
    this.fppLeftArmGroup.rotation.x = THREE.MathUtils.lerp(this.fppLeftArmGroup.rotation.x, this.fppLeftRot.x, armAlpha);
    this.fppLeftArmGroup.rotation.y = THREE.MathUtils.lerp(this.fppLeftArmGroup.rotation.y, this.fppLeftRot.y, armAlpha);
    this.fppLeftArmGroup.rotation.z = THREE.MathUtils.lerp(this.fppLeftArmGroup.rotation.z, this.fppLeftRot.z, armAlpha);
  }

  public dispose(): void {
    this.cameraSystem.camera.remove(this.viewmodelRoot);
    this.scene.remove(this.group);
    this.group.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        m.geometry?.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mt) => mt.dispose());
        else m.material?.dispose();
      }
    });
    this.viewmodelRoot.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh;
        m.geometry?.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mt) => mt.dispose());
        else m.material?.dispose();
      }
    });
  }
}
