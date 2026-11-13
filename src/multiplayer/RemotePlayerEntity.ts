/**
 * ECHO – THE WORLD REMEMBERS
 * Remote Player 3D Entity (تمثيل اللاعبين المتصلين في العالم ثلاثي الأبعاد)
 *
 * Implements:
 * 1. Visual representation of remote co-op adventurers with custom class robes and staves.
 * 2. Position/rotation dead reckoning & smooth interpolation (lerp).
 * 3. 3D Billboard Nameplate & Health Bar facing the local camera.
 * 4. Remote combat visual replication (Combo attacks, Dodge rolls, Echo Pulse).
 * 5. Strict separation of Network Transform Logic from Three.js Render Graph.
 */

import * as THREE from 'three';
import {
  PlayerAccountProfile,
  PlayerLocomotionState,
  PlayerTransformSnapshot,
  RealmId,
} from './types.ts';
import { PooledPointLightProxy } from '../world/WorldLightPool.ts';

export class RemotePlayerEntity {
  public group: THREE.Group;
  public profile: PlayerAccountProfile;
  public realm: RealmId = 'ISLAND';

  // Transform interpolation targets
  private targetPosition: THREE.Vector3;
  private currentPosition: THREE.Vector3;
  private targetFacingAngle: number = 0;
  private currentFacingAngle: number = 0;
  private isMoving: boolean = false;
  private isSprinting: boolean = false;
  private isGrounded: boolean = true;
  private actionState: PlayerLocomotionState = 'IDLE';

  // Voice status indicators
  private voiceEnabled: boolean = false;
  private voiceMuted: boolean = false;
  private isSpeaking: boolean = false;
  private lastNameplateKey: string = '';

  // Visual sub-meshes
  private pivotGroup: THREE.Group;
  private headMesh: THREE.Mesh;
  private torsoMesh: THREE.Mesh;
  private capeletMesh: THREE.Mesh;
  private capeletMat: THREE.MeshStandardMaterial;
  private crystalMat: THREE.MeshStandardMaterial;
  private leftArm: THREE.Group;
  private rightArm: THREE.Group;
  private leftLeg: THREE.Group;
  private rightLeg: THREE.Group;
  private staffGroup: THREE.Group;
  private pistolGroup: THREE.Group;
  private pistolSlideMesh!: THREE.Mesh;
  private pistolFlashMesh!: THREE.Mesh;
  private bowGroup: THREE.Group;
  private bowTopLimb!: THREE.Mesh;
  private bowBotLimb!: THREE.Mesh;
  private bowStringTop!: THREE.Mesh;
  private bowStringBot!: THREE.Mesh;
  private bowNockedArrow!: THREE.Group;
  private staffCrystal: THREE.Mesh;
  private staffLight: PooledPointLightProxy;
  private slashArcMesh: THREE.Mesh;
  private pulseShockwaveMesh: THREE.Mesh;

  // Remote weapon/combat pose state
  private equippedWeapon: 'sword' | 'pistol' | 'bow' = 'sword';
  private isBlocking = false;
  private isAiming = false;
  private bowDraw = 0;
  private pistolRecoil = 0;
  private swordSwingTimer = 0;
  private readonly swordSwingDuration = 0.24;
  private dodgeAnimTimer = 0;
  private readonly dodgeAnimDuration = 0.34;
  private pulseAnimTimer = 0;
  private readonly pulseAnimDuration = 0.45;
  private pistolFlashTimer = 0;

  // Overhead Billboard UI (Nameplate & HP bar)
  private nameplateGroup: THREE.Group;
  private nameplateCanvas: HTMLCanvasElement;
  private nameplateCtx: CanvasRenderingContext2D | null;
  private nameplateTexture: THREE.CanvasTexture;
  private hpFillMesh: THREE.Mesh;
  private animTimer: number = 0;

  constructor(profile: PlayerAccountProfile, initialTransform: PlayerTransformSnapshot) {
    this.profile = profile;
    this.realm = initialTransform.realm ?? 'ISLAND';
    this.targetPosition = new THREE.Vector3(initialTransform.x, initialTransform.y, initialTransform.z);
    this.currentPosition = this.targetPosition.clone();
    this.targetFacingAngle = initialTransform.facingAngle || 0;
    this.currentFacingAngle = this.targetFacingAngle;
    this.actionState = initialTransform.actionState || 'IDLE';

    this.group = new THREE.Group();
    this.group.name = `RemotePlayer_${profile.id}`;
    this.group.position.copy(this.currentPosition);

    this.pivotGroup = new THREE.Group();
    this.group.add(this.pivotGroup);

    // Color materials based on player profile
    const robeHex = parseInt((profile.robeColor || '#1d4ed8').replace('#', ''), 16) || 0x1d4ed8;
    const auraHex = parseInt((profile.auraColor || '#00f5d4').replace('#', ''), 16) || 0x00f5d4;

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xdec6b3, roughness: 0.8 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
    const tunicMat = new THREE.MeshStandardMaterial({ color: 0xeae5d8, roughness: 0.85 });
    this.capeletMat = new THREE.MeshStandardMaterial({ color: robeHex, roughness: 0.75 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.9 });
    this.crystalMat = new THREE.MeshStandardMaterial({
      color: auraHex,
      emissive: auraHex,
      emissiveIntensity: 2.2,
      roughness: 0.2,
    });

    // 1. Torso
    const torsoGeom = new THREE.CylinderGeometry(0.24, 0.22, 0.72, 8);
    this.torsoMesh = new THREE.Mesh(torsoGeom, tunicMat);
    this.torsoMesh.position.y = 0.88;
    this.torsoMesh.castShadow = true;
    this.pivotGroup.add(this.torsoMesh);

    // Capelet
    const capeGeom = new THREE.ConeGeometry(0.36, 0.45, 8);
    this.capeletMesh = new THREE.Mesh(capeGeom, this.capeletMat);
    this.capeletMesh.position.set(0, 1.15, -0.04);
    this.capeletMesh.castShadow = true;
    this.pivotGroup.add(this.capeletMesh);

    // 2. Head & Hair bun
    const headGeom = new THREE.SphereGeometry(0.18, 12, 10);
    this.headMesh = new THREE.Mesh(headGeom, skinMat);
    this.headMesh.position.y = 1.42;
    this.headMesh.castShadow = true;
    this.pivotGroup.add(this.headMesh);

    const bunGeom = new THREE.SphereGeometry(0.09, 8, 8);
    const bun = new THREE.Mesh(bunGeom, hairMat);
    bun.position.set(0, 1.58, -0.1);
    this.pivotGroup.add(bun);

    // 3. Limbs
    const limbGeom = new THREE.CylinderGeometry(0.08, 0.07, 0.58, 6);
    this.leftArm = new THREE.Group();
    this.leftArm.position.set(-0.32, 1.18, 0);
    const lArmMesh = new THREE.Mesh(limbGeom, tunicMat);
    lArmMesh.position.y = -0.26;
    this.leftArm.add(lArmMesh);
    this.pivotGroup.add(this.leftArm);

    this.rightArm = new THREE.Group();
    this.rightArm.position.set(0.32, 1.18, 0);
    const rArmMesh = new THREE.Mesh(limbGeom, tunicMat);
    rArmMesh.position.y = -0.26;
    this.rightArm.add(rArmMesh);
    this.pivotGroup.add(this.rightArm);

    this.leftLeg = new THREE.Group();
    this.leftLeg.position.set(-0.14, 0.52, 0);
    const lLegMesh = new THREE.Mesh(limbGeom, tunicMat);
    lLegMesh.position.y = -0.28;
    this.leftLeg.add(lLegMesh);
    this.pivotGroup.add(this.leftLeg);

    this.rightLeg = new THREE.Group();
    this.rightLeg.position.set(0.14, 0.52, 0);
    const rLegMesh = new THREE.Mesh(limbGeom, tunicMat);
    rLegMesh.position.y = -0.28;
    this.rightLeg.add(rLegMesh);
    this.pivotGroup.add(this.rightLeg);

    // 4. Island Echo 3D Sword
    this.staffGroup = new THREE.Group();
    this.staffGroup.position.set(0.36, 0.58, 0.12);
    this.staffGroup.rotation.set(-Math.PI * 0.42, 0.12, 0.18);

    const swordSteelMat = new THREE.MeshStandardMaterial({
      color: 0xe2ecf4,
      metalness: 0.95,
      roughness: 0.18,
    });
    const swordBrassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.25,
    });

    const gripGeom = new THREE.CylinderGeometry(0.02, 0.022, 0.18, 8);
    const grip = new THREE.Mesh(gripGeom, woodMat);
    this.staffGroup.add(grip);

    const pommelGeom = new THREE.DodecahedronGeometry(0.035, 0);
    const pommel = new THREE.Mesh(pommelGeom, swordBrassMat);
    pommel.position.y = -0.11;
    this.staffGroup.add(pommel);

    const guardGeom = new THREE.BoxGeometry(0.24, 0.034, 0.058);
    const guard = new THREE.Mesh(guardGeom, swordBrassMat);
    guard.position.y = 0.095;
    this.staffGroup.add(guard);

    const bladeGeom = new THREE.BoxGeometry(0.062, 0.78, 0.015);
    const blade = new THREE.Mesh(bladeGeom, swordSteelMat);
    blade.position.y = 0.49;
    blade.castShadow = true;
    this.staffGroup.add(blade);

    const bladeTipGeom = new THREE.ConeGeometry(0.042, 0.14, 4);
    bladeTipGeom.rotateY(Math.PI / 4);
    const bladeTip = new THREE.Mesh(bladeTipGeom, swordSteelMat);
    bladeTip.position.y = 0.95;
    this.staffGroup.add(bladeTip);

    const crystGeom = new THREE.OctahedronGeometry(0.025, 0);
    this.staffCrystal = new THREE.Mesh(crystGeom, this.crystalMat);
    this.staffCrystal.position.set(0, 0.095, 0.03);
    this.staffGroup.add(this.staffCrystal);

    this.staffLight = new PooledPointLightProxy(auraHex, 1.4, 5);
    this.staffLight.position.set(0, 0.52, 0.03);
    this.staffGroup.add(this.staffLight);
    this.pivotGroup.add(this.staffGroup);

    // 4b. Remote Pistol (attached to rightArm)
    this.pistolGroup = new THREE.Group();
    const gunFrameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.8 });
    const gunSlideMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.25, metalness: 0.9 });
    const pGrip = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.14, 0.06), woodMat);
    pGrip.position.set(0, -0.04, 0);
    const pFrame = new THREE.Mesh(new THREE.BoxGeometry(0.058, 0.055, 0.26), gunFrameMat);
    pFrame.position.set(0, 0.04, 0.09);
    this.pistolSlideMesh = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.055, 0.25), gunSlideMat);
    this.pistolSlideMesh.position.set(0, 0.08, 0.09);
    const pCore = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.016, 0.16), this.crystalMat);
    pCore.position.set(0, 0.06, 0.1);
    this.pistolFlashMesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.06, 0),
      new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.9 })
    );
    this.pistolFlashMesh.position.set(0, 0.075, 0.26);
    this.pistolFlashMesh.visible = false;
    this.pistolGroup.add(pGrip, pFrame, this.pistolSlideMesh, pCore, this.pistolFlashMesh);
    this.pistolGroup.position.set(0, -0.5, 0.1);
    this.pistolGroup.rotation.x = Math.PI * 0.5;
    this.pistolGroup.visible = false;
    this.rightArm.add(this.pistolGroup);

    // 4c. Remote Recurve Bow (attached to leftArm)
    this.bowGroup = new THREE.Group();
    const bowRiser = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.32, 0.05), swordBrassMat);
    this.bowTopLimb = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.28, 0.04), woodMat);
    this.bowTopLimb.position.set(0, 0.26, -0.05);
    this.bowTopLimb.rotation.x = 0.32;
    this.bowBotLimb = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.28, 0.04), woodMat);
    this.bowBotLimb.position.set(0, -0.26, -0.05);
    this.bowBotLimb.rotation.x = -0.32;
    const bowStrMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    this.bowStringTop = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.39, 6), bowStrMat);
    this.bowStringTop.position.set(0, 0.195, -0.1);
    this.bowStringBot = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.39, 6), bowStrMat);
    this.bowStringBot.position.set(0, -0.195, -0.1);
    this.bowNockedArrow = new THREE.Group();
    const aShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.65, 6), woodMat);
    aShaft.rotation.x = Math.PI / 2;
    const aTip = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.1, 6), swordSteelMat);
    aTip.rotation.x = Math.PI / 2;
    aTip.position.z = 0.35;
    this.bowNockedArrow.add(aShaft, aTip);
    this.bowNockedArrow.position.set(0, 0.02, 0.08);
    this.bowGroup.add(
      bowRiser,
      this.bowTopLimb,
      this.bowBotLimb,
      this.bowStringTop,
      this.bowStringBot,
      this.bowNockedArrow
    );
    this.bowGroup.position.set(-0.02, -0.48, 0.12);
    this.bowGroup.visible = false;
    this.leftArm.add(this.bowGroup);

    // 5. Slash Arc VFX
    const arcGeom = new THREE.RingGeometry(0.5, 1.3, 16, 1, 0, Math.PI * 0.8);
    const arcMat = new THREE.MeshBasicMaterial({
      color: auraHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    this.slashArcMesh = new THREE.Mesh(arcGeom, arcMat);
    this.slashArcMesh.rotation.x = Math.PI / 2;
    this.slashArcMesh.position.set(0, 0.95, 0.4);
    this.pivotGroup.add(this.slashArcMesh);

    // 6. Pulse VFX
    const pulseGeom = new THREE.RingGeometry(0.2, 0.6, 32);
    pulseGeom.rotateX(-Math.PI / 2);
    this.pulseShockwaveMesh = new THREE.Mesh(pulseGeom, arcMat.clone());
    this.group.add(this.pulseShockwaveMesh);

    // 7. Overhead Nameplate Canvas Billboard
    this.nameplateGroup = new THREE.Group();
    this.nameplateGroup.position.y = 2.15;

    this.nameplateCanvas = document.createElement('canvas');
    this.nameplateCanvas.width = 420;
    this.nameplateCanvas.height = 104;
    this.nameplateCtx = this.nameplateCanvas.getContext('2d');
    this.nameplateTexture = new THREE.CanvasTexture(this.nameplateCanvas);
    this.redrawNameplate();

    const tagGeom = new THREE.PlaneGeometry(1.5, 0.37);
    const tagMat = new THREE.MeshBasicMaterial({
      map: this.nameplateTexture,
      transparent: true,
      depthTest: false,
    });
    const tagMesh = new THREE.Mesh(tagGeom, tagMat);
    this.nameplateGroup.add(tagMesh);

    // Health bar above nameplate
    const hpBgGeom = new THREE.PlaneGeometry(1.0, 0.08);
    const hpBgMat = new THREE.MeshBasicMaterial({ color: 0x18181b, depthTest: false });
    const hpBg = new THREE.Mesh(hpBgGeom, hpBgMat);
    hpBg.position.y = 0.25;
    this.nameplateGroup.add(hpBg);

    const hpFillGeom = new THREE.PlaneGeometry(0.96, 0.05);
    hpFillGeom.translate(0.48, 0, 0);
    const hpFillMat = new THREE.MeshBasicMaterial({ color: 0x10b981, depthTest: false });
    this.hpFillMesh = new THREE.Mesh(hpFillGeom, hpFillMat);
    this.hpFillMesh.position.set(-0.48, 0.25, 0.005);
    this.nameplateGroup.add(this.hpFillMesh);

    if (typeof initialTransform.hp === 'number' && typeof initialTransform.maxHp === 'number' && initialTransform.maxHp > 0) {
      this.setHealthPercent(initialTransform.hp / initialTransform.maxHp);
    }

    this.group.add(this.nameplateGroup);
  }

  private redrawNameplate(): void {
    const key = `${this.profile.username}|${this.profile.titleEn}|${this.profile.level}|${this.profile.auraColor}|${this.voiceEnabled}|${this.voiceMuted}|${this.isSpeaking}`;
    if (key === this.lastNameplateKey) return;
    this.lastNameplateKey = key;

    const ctx = this.nameplateCtx;
    if (!ctx) return;

    const w = this.nameplateCanvas.width;
    const h = this.nameplateCanvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = this.isSpeaking ? 'rgba(6, 40, 36, 0.9)' : 'rgba(6, 10, 18, 0.84)';
    ctx.beginPath();
    ctx.roundRect(8, 8, w - 16, h - 16, 18);
    ctx.fill();

    ctx.strokeStyle = this.isSpeaking ? '#34d399' : this.profile.auraColor || '#00f5d4';
    ctx.lineWidth = this.isSpeaking ? 4.5 : 3;
    ctx.stroke();

    // Voice badge pill on top right
    if (this.voiceEnabled) {
      ctx.fillStyle = this.voiceMuted
        ? 'rgba(239, 68, 68, 0.92)'
        : this.isSpeaking
          ? 'rgba(16, 185, 129, 0.95)'
          : 'rgba(14, 165, 233, 0.85)';
      ctx.beginPath();
      ctx.roundRect(w - 98, 16, 76, 24, 10);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.voiceMuted ? 'MUTED' : this.isSpeaking ? 'TALKING' : 'MIC ON', w - 60, 33);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.profile.username, w / 2, 46);

    ctx.fillStyle = this.profile.auraColor || '#00f5d4';
    ctx.font = '18px sans-serif';
    ctx.fillText(`${this.profile.titleEn} (Lv.${this.profile.level})`, w / 2, 76);

    this.nameplateTexture.needsUpdate = true;
  }

  public updateProfile(profile: PlayerAccountProfile): void {
    this.profile = { ...this.profile, ...profile };
    const robeHex = parseInt((this.profile.robeColor || '#1d4ed8').replace('#', ''), 16) || 0x1d4ed8;
    const auraHex = parseInt((this.profile.auraColor || '#00f5d4').replace('#', ''), 16) || 0x00f5d4;
    this.capeletMat.color.setHex(robeHex);
    this.crystalMat.color.setHex(auraHex);
    this.crystalMat.emissive.setHex(auraHex);
    (this.slashArcMesh.material as THREE.MeshBasicMaterial).color.setHex(auraHex);
    (this.pulseShockwaveMesh.material as THREE.MeshBasicMaterial).color.setHex(auraHex);
    this.redrawNameplate();
  }

  public setVoiceState(enabled: boolean, muted: boolean, speaking: boolean): void {
    this.voiceEnabled = enabled;
    this.voiceMuted = muted;
    this.isSpeaking = speaking && enabled && !muted;
    this.redrawNameplate();
  }

  public setEquippedWeapon(weapon: 'sword' | 'pistol' | 'bow'): void {
    this.equippedWeapon = weapon;
    this.staffGroup.visible = weapon === 'sword';
    this.pistolGroup.visible = weapon === 'pistol';
    this.bowGroup.visible = weapon === 'bow';
  }

  /**
   * Ingests network packet transform
   */
  public updateNetworkTransform(snapshot: PlayerTransformSnapshot): void {
    this.targetPosition.set(snapshot.x, snapshot.y, snapshot.z);
    this.targetFacingAngle = snapshot.facingAngle;
    this.isMoving = snapshot.isMoving;
    this.isSprinting = snapshot.isSprinting;
    this.isGrounded = snapshot.isGrounded;
    this.realm = snapshot.realm ?? this.realm;
    this.actionState = snapshot.actionState || 'IDLE';
    if (snapshot.weapon && snapshot.weapon !== this.equippedWeapon) {
      this.setEquippedWeapon(snapshot.weapon);
    }
    this.isBlocking = Boolean(snapshot.isBlocking);
    this.isAiming = Boolean(snapshot.isAiming);
    this.bowDraw = typeof snapshot.bowDraw === 'number' ? snapshot.bowDraw : 0;

    if (typeof snapshot.hp === 'number' && typeof snapshot.maxHp === 'number' && snapshot.maxHp > 0) {
      this.setHealthPercent(snapshot.hp / snapshot.maxHp);
    }

    if (snapshot.actionState === 'ATTACK') {
      this.playAttackAnimation(snapshot.comboStep);
    } else if (snapshot.actionState === 'DODGE') {
      this.playDodgeAnimation();
    } else if (snapshot.actionState === 'PULSE') {
      this.playPulseAnimation();
    }
  }

  public setHealthPercent(pct: number): void {
    const clamped = Math.max(0, Math.min(1, pct));
    this.hpFillMesh.scale.x = clamped;
    const mat = this.hpFillMesh.material as THREE.MeshBasicMaterial;
    if (clamped > 0.5) mat.color.setHex(0x10b981);
    else if (clamped > 0.25) mat.color.setHex(0xf59e0b);
    else mat.color.setHex(0xef4444);
  }

  public update(dt: number, cameraPos: THREE.Vector3): void {
    // 1. Smoothly interpolate position toward target (network dead reckoning lerp)
    const dist = this.currentPosition.distanceTo(this.targetPosition);
    if (dist > 18) {
      // Snap cleanly on realm entry / teleport
      this.currentPosition.copy(this.targetPosition);
    } else {
      const lerpRate = 1 - Math.exp(-13.0 * dt);
      this.currentPosition.lerp(this.targetPosition, lerpRate);
    }
    this.group.position.copy(this.currentPosition);

    // 2. Smoothly rotate facing angle
    let diff = this.targetFacingAngle - this.currentFacingAngle;
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    this.currentFacingAngle += diff * (1 - Math.exp(-14.0 * dt));
    this.pivotGroup.rotation.y = this.currentFacingAngle;

    // 3. Face nameplate toward local camera
    this.nameplateGroup.lookAt(cameraPos);

    // 4. Advance combat/action timers smoothly
    this.animTimer += dt * (this.isSprinting ? 12 : this.actionState === 'SWIM' ? 6 : 7.5);
    if (this.pistolRecoil > 0) this.pistolRecoil = Math.max(0, this.pistolRecoil - dt * 6);
    if (this.pistolFlashTimer > 0) {
      this.pistolFlashTimer = Math.max(0, this.pistolFlashTimer - dt);
      this.pistolFlashMesh.visible = this.pistolFlashTimer > 0;
      const fScale = 0.7 + (this.pistolFlashTimer / 0.05) * 0.6;
      this.pistolFlashMesh.scale.setScalar(fScale);
    } else {
      this.pistolFlashMesh.visible = false;
    }

    if (this.swordSwingTimer > 0) {
      this.swordSwingTimer = Math.max(0, this.swordSwingTimer - dt);
      const t = 1 - this.swordSwingTimer / this.swordSwingDuration;
      const slashMat = this.slashArcMesh.material as THREE.MeshBasicMaterial;
      slashMat.opacity = Math.sin(t * Math.PI) * 0.85;
      this.slashArcMesh.rotation.z = -0.6 + t * 1.4;
    } else {
      (this.slashArcMesh.material as THREE.MeshBasicMaterial).opacity = 0;
    }

    if (this.dodgeAnimTimer > 0) {
      this.dodgeAnimTimer = Math.max(0, this.dodgeAnimTimer - dt);
    }

    if (this.pulseAnimTimer > 0) {
      this.pulseAnimTimer = Math.max(0, this.pulseAnimTimer - dt);
      const t = 1 - this.pulseAnimTimer / this.pulseAnimDuration;
      const pulseMat = this.pulseShockwaveMesh.material as THREE.MeshBasicMaterial;
      const s = 1 + t * 8.5;
      this.pulseShockwaveMesh.scale.set(s, s, s);
      pulseMat.opacity = (1 - t) * 0.9;
    } else {
      (this.pulseShockwaveMesh.material as THREE.MeshBasicMaterial).opacity = 0;
    }

    // 5. Compute locomotion targets
    let pivotRotX = 0;
    let pivotRotZ = 0;
    let pivotPosY = 0;
    let lArmX = 0;
    let lArmY = 0;
    let lArmZ = 0;
    let rArmX = 0;
    let rArmY = 0;
    let rArmZ = 0;
    let lLegX = 0;
    let rLegX = 0;

    if (this.actionState === 'DEAD') {
      pivotRotX = Math.PI * 0.48;
      pivotPosY = 0.2;
    } else if (this.actionState === 'SWIM') {
      pivotRotX = 0.55;
      pivotPosY = Math.sin(this.animTimer * 0.8) * 0.04;
      const stroke = Math.sin(this.animTimer);
      lArmX = -1.1 + stroke * 0.65;
      rArmX = -1.1 - stroke * 0.65;
      lLegX = -stroke * 0.35;
      rLegX = stroke * 0.35;
    } else if (!this.isGrounded && (this.actionState === 'JUMP_ASCENT' || this.actionState === 'JUMP_DESCENT')) {
      lArmX = -0.6;
      rArmX = -0.6;
      lLegX = 0.35;
      rLegX = -0.25;
    } else if (this.isMoving) {
      pivotPosY = Math.abs(Math.sin(this.animTimer * 2)) * 0.03;
      const swing = Math.sin(this.animTimer);
      lLegX = swing * 0.65;
      rLegX = -swing * 0.65;
      lArmX = -swing * 0.5;
      rArmX = swing * 0.5;
    } else {
      const breathe = Math.sin(this.animTimer * 0.35) * 0.04;
      lArmX = breathe;
      rArmX = -breathe;
    }

    if (this.dodgeAnimTimer > 0 && this.actionState !== 'DEAD') {
      const d = 1 - this.dodgeAnimTimer / this.dodgeAnimDuration;
      const arc = Math.sin(d * Math.PI);
      pivotRotX += arc * Math.PI * 0.42;
      pivotPosY -= arc * 0.14;
    }

    // 6. Combat pose overlays (Sword Block / Sword Swing / Pistol Aim / Bow Draw)
    if (this.actionState !== 'DEAD' && this.actionState !== 'SWIM') {
      if (this.equippedWeapon === 'sword') {
        if (this.swordSwingTimer > 0) {
          const t = 1 - this.swordSwingTimer / this.swordSwingDuration;
          const swingWave = Math.sin(t * Math.PI);
          rArmX = -0.35 - swingWave * 1.15;
          rArmY = 0.45 - t * 0.9;
        } else if (this.isBlocking) {
          rArmX = -0.95;
          rArmY = 0.5;
          rArmZ = 0.65;
          lArmX = -0.85;
          lArmY = -0.35;
          lArmZ = -0.3;
        }
      } else if (this.equippedWeapon === 'pistol') {
        if (this.isAiming || this.pistolRecoil > 0.04) {
          rArmX = -1.46 - this.pistolRecoil * 0.28;
          rArmY = -0.04;
          if (this.isAiming) {
            lArmX = -1.25;
            lArmY = 0.4;
          }
        }
        this.pistolSlideMesh.position.z = 0.09 - this.pistolRecoil * 0.055;
      } else if (this.equippedWeapon === 'bow') {
        const pull = Math.max(0, Math.min(1, this.bowDraw));
        if (this.isAiming || pull > 0.02) {
          lArmX = -1.48;
          lArmY = 0.15;
          rArmX = -1.2 - pull * 0.26;
          rArmY = -0.35 - pull * 0.12;
        }
        const nockZ = -0.1 - pull * 0.18;
        const limbZ = -0.1 - pull * 0.045;
        this.bowTopLimb.rotation.x = 0.32 + pull * 0.18;
        this.bowBotLimb.rotation.x = -0.32 - pull * 0.18;

        const topTipY = 0.39;
        const botTipY = -0.39;
        const midTopZ = (limbZ + nockZ) * 0.5;
        const dyTop = topTipY - 0.02;
        const dzTop = limbZ - nockZ;
        const lenTop = Math.hypot(dyTop, dzTop);
        this.bowStringTop.position.set(0, (topTipY + 0.02) * 0.5, midTopZ);
        this.bowStringTop.rotation.x = Math.atan2(dzTop, dyTop);
        this.bowStringTop.scale.y = lenTop / 0.39;

        const dyBot = 0.02 - botTipY;
        const dzBot = nockZ - limbZ;
        const lenBot = Math.hypot(dyBot, dzBot);
        this.bowStringBot.position.set(0, (botTipY + 0.02) * 0.5, midTopZ);
        this.bowStringBot.rotation.x = Math.atan2(dzBot, dyBot);
        this.bowStringBot.scale.y = lenBot / 0.39;

        this.bowNockedArrow.position.z = 0.08 - pull * 0.18;
        this.bowNockedArrow.visible = pull > 0.02 || this.isAiming;
      }
    }

    const limbLerp = 1 - Math.exp(-18 * dt);
    this.pivotGroup.rotation.x += (pivotRotX - this.pivotGroup.rotation.x) * limbLerp;
    this.pivotGroup.rotation.z += (pivotRotZ - this.pivotGroup.rotation.z) * limbLerp;
    this.pivotGroup.position.y += (pivotPosY - this.pivotGroup.position.y) * limbLerp;
    this.leftArm.rotation.x += (lArmX - this.leftArm.rotation.x) * limbLerp;
    this.leftArm.rotation.y += (lArmY - this.leftArm.rotation.y) * limbLerp;
    this.leftArm.rotation.z += (lArmZ - this.leftArm.rotation.z) * limbLerp;
    this.rightArm.rotation.x += (rArmX - this.rightArm.rotation.x) * limbLerp;
    this.rightArm.rotation.y += (rArmY - this.rightArm.rotation.y) * limbLerp;
    this.rightArm.rotation.z += (rArmZ - this.rightArm.rotation.z) * limbLerp;
    this.leftLeg.rotation.x += (lLegX - this.leftLeg.rotation.x) * limbLerp;
    this.rightLeg.rotation.x += (rLegX - this.rightLeg.rotation.x) * limbLerp;

    // Gentle crystal hover
    this.staffCrystal.rotation.y += dt * 2.0;
  }

  public playAttackAnimation(_step: number = 1): void {
    if (this.equippedWeapon === 'pistol' || this.equippedWeapon === 'bow') {
      this.playShotAnimation(this.equippedWeapon);
      return;
    }
    this.swordSwingTimer = this.swordSwingDuration;
  }

  public playShotAnimation(weapon: 'pistol' | 'bow'): void {
    this.setEquippedWeapon(weapon);
    if (weapon === 'pistol') {
      this.pistolRecoil = 1.0;
      this.pistolFlashTimer = 0.055;
      this.pistolFlashMesh.visible = true;
    } else {
      this.bowDraw = 0;
    }
  }

  public playDodgeAnimation(): void {
    this.dodgeAnimTimer = this.dodgeAnimDuration;
  }

  public playPulseAnimation(): void {
    this.pulseAnimTimer = this.pulseAnimDuration;
    this.pulseShockwaveMesh.scale.set(1, 1, 1);
  }

  public dispose(): void {
    this.nameplateTexture.dispose();
    this.staffLight.dispose();
    this.group.removeFromParent();
  }
}
