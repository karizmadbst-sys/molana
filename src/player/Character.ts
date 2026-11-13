/**
 * ECHO – THE WORLD REMEMBERS
 * Third-Person Character: "The Spirit Guide Explorer"
 * Inspired by the reference design: dark topknot bun, royal blue capelet,
 * cream adventurer tunic, cross-body leather satchel, fur-trimmed hiking boots,
 * and carved mystic staff with orbiting spirit wisp.
 */

import * as THREE from 'three';
import { Terrain } from '../world/Terrain.ts';
import { WorldObstacle } from '../world/Forest.ts';
import { PooledPointLightProxy } from '../world/WorldLightPool.ts';

export type WeaponType = 'sword' | 'pistol' | 'bow';

export class Character {
  public group: THREE.Group;
  public position: THREE.Vector3;
  public velocity: THREE.Vector3;
  public isGrounded: boolean = true;
  public isMoving: boolean = false;
  public isSprinting: boolean = false;
  public isRunningInPlace: boolean = false;
  public isFirstPerson: boolean = false;
  public isSwimming: boolean = false;

  // Collision radius
  public readonly radius = 0.55;

  // Visual sub-meshes for animation & secondary motion
  private characterPivot: THREE.Group;
  private headGroup: THREE.Group;
  private hairBun: THREE.Mesh;
  private capeletGroup: THREE.Group;
  private capeletTails: THREE.Mesh;
  private torsoGroup: THREE.Group;
  private leftLeg: THREE.Group;
  private rightLeg: THREE.Group;
  private leftArm: THREE.Group;
  private rightArm: THREE.Group;
  private staffGroup: THREE.Group;
  private staffCrystal: THREE.Mesh;
  private staffLight: PooledPointLightProxy;
  private spiritCompanion: THREE.Group;
  private shadowDisc: THREE.Mesh;
  private swimWakeMesh!: THREE.Mesh;
  private slashArcMesh!: THREE.Mesh;
  private capeletMat!: THREE.MeshStandardMaterial;
  private capeletTrimMat!: THREE.MeshStandardMaterial;

  // Combat States & Timers
  public isAttacking: boolean = false;
  public attackTimer: number = 0;
  public attackComboStep: number = 0;
  public isDodging: boolean = false;
  public dodgeTimer: number = 0;
  public isCastingPulse: boolean = false;
  public pulseTimer: number = 0;
  public isDead: boolean = false;

  // Unified Weapon & Combat Pose State (Sword / Pistol / Bow)
  public equippedWeapon: WeaponType = 'sword';
  public isBlocking: boolean = false;
  public isAiming: boolean = false;
  public bowDrawAmount: number = 0;
  public pistolRecoilOffset: number = 0;
  public rangedActionTimer: number = 0;
  private rangedActionKind: 'pistol' | 'bow' = 'pistol';

  // Movement physics variables
  private walkSpeed = 6.8;
  private sprintSpeed = 12.8;
  private swimSpeed = 4.8;
  private sprintSwimSpeed = 8.5;
  private jumpForce = 10.8;
  private gravity = 26.0;
  private verticalVelocity = 0;
  public currentFacingAngle = 0;
  private targetFacingAngle = 0;
  private animTime = 0;
  private lastSwimInputY = 0;
  private lastSwimInputX = 0;

  // Coyote time & jump buffering
  private coyoteTimer = 0;
  private readonly maxCoyoteTime = 0.12;
  private swimLeapGraceTimer = 0;

  // Dark Realm / custom world overrides & equipped tool visuals
  public customWaterY: ((x: number, z: number) => number | null) | null = null;
  public externalSpeedMultiplier: number = 1.0;
  private bladeSteelMat!: THREE.MeshStandardMaterial;
  private swordVisualParts: THREE.Object3D[] = [];
  private toolModeGroups!: Record<'pickaxe' | 'axe' | 'bow' | 'pistol' | 'block', THREE.Group>;
  private heldBlockMesh!: THREE.Mesh;
  private pistolSlideMesh!: THREE.Mesh;
  private pistolMuzzleAnchor!: THREE.Object3D;
  private bowUpperLimb!: THREE.Mesh;
  private bowLowerLimb!: THREE.Mesh;
  private bowStringTop!: THREE.Mesh;
  private bowStringBot!: THREE.Mesh;
  private bowNockedArrow!: THREE.Group;
  private buildSwingTimer = 0;
  private buildSwingDuration = 0.2;
  private isBreakingBlock = false;
  private breakAnimTime = 0;

  constructor(spawnPos: THREE.Vector3) {
    this.group = new THREE.Group();
    this.position = spawnPos.clone();
    this.velocity = new THREE.Vector3();
    this.group.position.copy(this.position);

    // Root pivot for character mesh
    this.characterPivot = new THREE.Group();
    this.group.add(this.characterPivot);

    // Magical Weapon Slash Arc
    const arcGeom = new THREE.RingGeometry(0.65, 1.45, 24, 1, 0, Math.PI * 0.85);
    const arcMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    this.slashArcMesh = new THREE.Mesh(arcGeom, arcMat);
    this.slashArcMesh.rotation.x = Math.PI / 2;
    this.slashArcMesh.position.set(0, 0.95, 0.45);
    this.characterPivot.add(this.slashArcMesh);

    // 1. Minecraft-inspired blocky Materials Palette matching the reference image
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xe0b484, // Warm tan skin tone
      roughness: 0.78,
      metalness: 0.04,
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x16141a, // Dark jet blocky hair
      roughness: 0.68,
      metalness: 0.08,
    });

    const hairTieMat = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf, // Turquoise hair tie
      roughness: 0.45,
    });

    const capeletMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb, // Royal sapphire-blue blocky shawl/capelet
      roughness: 0.65,
      metalness: 0.12,
    });
    this.capeletMat = capeletMat;

    const capeletTrimMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.72,
    });
    this.capeletTrimMat = capeletTrimMat;

    const tunicMat = new THREE.MeshStandardMaterial({
      color: 0xf1ece4, // Crisp cream adventurer tunic
      roughness: 0.82,
      metalness: 0.04,
    });

    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x4a2e1b, // Dark leather satchel & belt
      roughness: 0.85,
      metalness: 0.1,
    });

    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x1e222b, // Dark charcoal trousers
      roughness: 0.86,
    });

    const bootMat = new THREE.MeshStandardMaterial({
      color: 0x523622, // Blocky hiking boots
      roughness: 0.85,
    });

    const furCuffMat = new THREE.MeshStandardMaterial({
      color: 0xd6cab8, // Light boot cuff
      roughness: 0.92,
    });

    // 2. Blocky Torso & Adventurer Tunic
    this.torsoGroup = new THREE.Group();
    this.torsoGroup.position.y = 0.92;
    this.characterPivot.add(this.torsoGroup);

    const tunic = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.56, 0.28), tunicMat);
    tunic.position.y = 0.36;
    tunic.castShadow = true;
    this.torsoGroup.add(tunic);

    // Tunic Lower Skirt Flare (Blocky voxel step)
    const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.18, 0.31), tunicMat);
    skirt.position.y = 0.04;
    skirt.castShadow = true;
    this.torsoGroup.add(skirt);

    // Leather Belt & Gold Buckle
    const belt = new THREE.Mesh(new THREE.BoxGeometry(0.49, 0.08, 0.3), leatherMat);
    belt.position.y = 0.16;
    this.torsoGroup.add(belt);

    const buckleMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.8, roughness: 0.28 });
    const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.085, 0.04), buckleMat);
    buckle.position.set(0, 0.16, 0.155);
    this.torsoGroup.add(buckle);

    // 3. Cross-Body Messenger Satchel & Pouch
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.64, 0.32), leatherMat);
    strap.position.set(0.02, 0.38, 0);
    strap.rotation.z = 0.65;
    this.torsoGroup.add(strap);

    const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.19, 0.14), leatherMat);
    pouch.position.set(-0.26, 0.14, -0.08);
    pouch.castShadow = true;
    this.torsoGroup.add(pouch);

    // 4. Royal Blue Blocky Capelet / Shawl over Shoulders
    this.capeletGroup = new THREE.Group();
    this.capeletGroup.position.set(0, 0.64, 0);
    this.torsoGroup.add(this.capeletGroup);

    const mantle = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.17, 0.34), capeletMat);
    mantle.position.y = -0.02;
    mantle.castShadow = true;
    this.capeletGroup.add(mantle);

    const collarFrontL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.06), capeletTrimMat);
    collarFrontL.position.set(-0.14, -0.1, 0.16);
    const collarFrontR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.06), capeletTrimMat);
    collarFrontR.position.set(0.14, -0.1, 0.16);
    this.capeletGroup.add(collarFrontL, collarFrontR);

    // Flowing Blocky Capelet Tails down the back (pivoted near top)
    const capeTailGeo = new THREE.BoxGeometry(0.42, 0.54, 0.06);
    capeTailGeo.translate(0, -0.24, 0);
    this.capeletTails = new THREE.Mesh(capeTailGeo, capeletMat);
    this.capeletTails.position.set(0, -0.02, -0.18);
    this.capeletTails.castShadow = true;
    this.capeletGroup.add(this.capeletTails);

    // 5. Blocky Minecraft-style Head, Face & Topknot Bun
    this.headGroup = new THREE.Group();
    this.headGroup.position.set(0, 0.68, 0);
    this.torsoGroup.add(this.headGroup);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.36), skinMat);
    head.position.y = 0.19;
    head.castShadow = true;
    this.headGroup.add(head);

    // Blocky Face Eyes
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
    const lEyeW = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.055, 0.02), eyeWhiteMat);
    lEyeW.position.set(-0.085, 0.19, 0.182);
    const rEyeW = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.055, 0.02), eyeWhiteMat);
    rEyeW.position.set(0.085, 0.19, 0.182);
    const lPupil = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.05, 0.024), eyePupilMat);
    lPupil.position.set(-0.08, 0.19, 0.185);
    const rPupil = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.05, 0.024), eyePupilMat);
    rPupil.position.set(0.08, 0.19, 0.185);
    this.headGroup.add(lEyeW, rEyeW, lPupil, rPupil);

    // Blocky Hair Cap, Back & Side Bangs
    const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.39, 0.11, 0.39), hairMat);
    hairTop.position.set(0, 0.34, -0.01);
    hairTop.castShadow = true;
    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.39, 0.31, 0.14), hairMat);
    hairBack.position.set(0, 0.21, -0.14);
    const hairSideL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.24), hairMat);
    hairSideL.position.set(-0.18, 0.24, -0.04);
    const hairSideR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.24), hairMat);
    hairSideR.position.set(0.18, 0.24, -0.04);
    const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.07, 0.06), hairMat);
    bangs.position.set(0, 0.31, 0.17);
    this.headGroup.add(hairTop, hairBack, hairSideL, hairSideR, bangs);

    // Signature Blocky Topknot Bun + Turquoise Hair Tie
    this.hairBun = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.15, 0.16), hairMat);
    this.hairBun.position.set(0, 0.48, -0.08);
    this.hairBun.castShadow = true;
    this.headGroup.add(this.hairBun);

    const hairTie = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.045, 0.18), hairTieMat);
    hairTie.position.set(0, 0.41, -0.08);
    this.headGroup.add(hairTie);

    // 6. Articulated Blocky Legs & Boots
    this.leftLeg = this.createLeg(pantsMat, bootMat, furCuffMat);
    this.leftLeg.position.set(-0.12, 0.0, 0);
    this.torsoGroup.add(this.leftLeg);

    this.rightLeg = this.createLeg(pantsMat, bootMat, furCuffMat);
    this.rightLeg.position.set(0.12, 0.0, 0);
    this.torsoGroup.add(this.rightLeg);

    // 7. Articulated Blocky Arms
    this.leftArm = this.createArm(skinMat, tunicMat);
    this.leftArm.position.set(-0.33, 0.54, 0);
    this.torsoGroup.add(this.leftArm);

    this.rightArm = this.createArm(skinMat, tunicMat);
    this.rightArm.position.set(0.33, 0.54, 0);
    this.torsoGroup.add(this.rightArm);

    // 8. Blocky Glowing Cyan Echo Crystal Sword socketed in Right Hand
    this.staffGroup = new THREE.Group();
    this.staffGroup.name = 'RightHandSwordSocket';
    this.staffGroup.position.set(0.0, -0.52, 0.04);
    this.staffGroup.rotation.set(-Math.PI * 0.44, 0.12, 0.16);

    const bladeSteelMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      metalness: 0.55,
      roughness: 0.22,
    });
    this.bladeSteelMat = bladeSteelMat;

    const guardBrassMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      metalness: 0.7,
      roughness: 0.3,
    });

    const gripLeatherMat = new THREE.MeshStandardMaterial({
      color: 0x3b2314,
      roughness: 0.85,
    });

    const gemMat = new THREE.MeshStandardMaterial({
      color: 0x00f5d4,
      emissive: 0x00f5d4,
      emissiveIntensity: 2.0,
      roughness: 0.15,
      metalness: 0.8,
    });

    const pommel = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.065, 0.055), guardBrassMat);
    pommel.position.y = -0.12;
    this.staffGroup.add(pommel);

    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.18, 0.05), gripLeatherMat);
    grip.position.y = 0.0;
    this.staffGroup.add(grip);

    const crossGuard = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.055, 0.075), guardBrassMat);
    crossGuard.position.y = 0.1;
    crossGuard.castShadow = true;
    this.staffGroup.add(crossGuard);

    this.staffCrystal = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.055, 0.085), gemMat);
    this.staffCrystal.position.set(0, 0.1, 0.01);
    this.staffGroup.add(this.staffCrystal);

    // Blocky voxel stepped sword blade
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.72, 0.032), bladeSteelMat);
    blade.position.y = 0.48;
    blade.castShadow = true;
    this.staffGroup.add(blade);

    const bladeCore = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.64, 0.042), gemMat);
    bladeCore.position.y = 0.46;
    this.staffGroup.add(bladeCore);

    const bladeTip = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.1, 0.032), bladeSteelMat);
    bladeTip.position.y = 0.88;
    this.staffGroup.add(bladeTip);

    // Pooled blade luminescence point light
    this.staffLight = new PooledPointLightProxy(0x00f5d4, 1.4, 5.0);
    this.staffLight.position.set(0, 0.55, 0.04);
    this.staffGroup.add(this.staffLight);

    this.swordVisualParts = [...this.staffGroup.children];

    // Additional Shadow Realm blocky tool visuals attached to the right-hand socket
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x5a3a22, roughness: 0.88 });
    const darkIronMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.78, roughness: 0.3 });

    const pickaxeGroup = new THREE.Group();
    pickaxeGroup.visible = false;
    const pickHandle = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.72, 0.05), darkWoodMat);
    pickHandle.position.y = 0.28;
    const pickHead = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.085, 0.07), darkIronMat);
    pickHead.position.y = 0.62;
    const pickTipL = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.08, 0.065), darkIronMat);
    pickTipL.position.set(-0.27, 0.57, 0);
    const pickTipR = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.08, 0.065), darkIronMat);
    pickTipR.position.set(0.27, 0.57, 0);
    pickaxeGroup.add(pickHandle, pickHead, pickTipL, pickTipR);
    this.staffGroup.add(pickaxeGroup);

    const axeGroup = new THREE.Group();
    axeGroup.visible = false;
    const axeHandle = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.76, 0.055), darkWoodMat);
    axeHandle.position.y = 0.3;
    const axeBlade = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.05), darkIronMat);
    axeBlade.position.set(0.12, 0.58, 0);
    axeGroup.add(axeHandle, axeBlade);
    this.staffGroup.add(axeGroup);

    const bowGroup = new THREE.Group();
    bowGroup.visible = false;
    const bowCenter = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.34, 0.065), darkWoodMat);
    bowCenter.position.set(0, 0.24, 0.16);
    const bowUpper = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.28, 0.05), darkWoodMat);
    bowUpper.position.set(0, 0.50, 0.06);
    bowUpper.rotation.x = 0.48;
    this.bowUpperLimb = bowUpper;
    const bowLower = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.28, 0.05), darkWoodMat);
    bowLower.position.set(0, -0.02, 0.06);
    bowLower.rotation.x = -0.48;
    this.bowLowerLimb = bowLower;
    const bowStrMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    this.bowStringTop = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.39, 0.013), bowStrMat);
    this.bowStringTop.position.set(0, 0.435, -0.04);
    this.bowStringBot = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.39, 0.013), bowStrMat);
    this.bowStringBot.position.set(0, 0.045, -0.04);

    this.bowNockedArrow = new THREE.Group();
    const arrowShaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.64, 6),
      darkWoodMat
    );
    arrowShaft.rotation.x = Math.PI / 2;
    const arrowTip = new THREE.Mesh(
      new THREE.ConeGeometry(0.032, 0.11, 4),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.0 })
    );
    arrowTip.rotation.x = Math.PI / 2;
    arrowTip.position.z = 0.34;
    this.bowNockedArrow.add(arrowShaft, arrowTip);
    this.bowNockedArrow.position.set(0, 0.24, 0.12);
    bowGroup.add(
      bowCenter,
      bowUpper,
      bowLower,
      this.bowStringTop,
      this.bowStringBot,
      this.bowNockedArrow
    );
    this.staffGroup.add(bowGroup);

    // Sleek Arcane Flintlock / Tactical Pistol
    const pistolGroup = new THREE.Group();
    pistolGroup.visible = false;
    const pistolMetalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.24 });
    const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.17, 0.08), gripLeatherMat);
    pistolGrip.position.set(0, 0.04, 0.02);
    pistolGrip.rotation.x = -0.22;
    const pistolReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.072, 0.08, 0.26), pistolMetalMat);
    pistolReceiver.position.set(0, 0.15, 0.13);
    this.pistolSlideMesh = new THREE.Mesh(new THREE.BoxGeometry(0.076, 0.055, 0.25), darkIronMat);
    this.pistolSlideMesh.position.set(0, 0.19, 0.13);
    const pistolCore = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.03, 0.11), gemMat);
    pistolCore.position.set(0, 0.15, 0.16);
    this.pistolMuzzleAnchor = new THREE.Object3D();
    this.pistolMuzzleAnchor.position.set(0, 0.17, 0.30);
    pistolGroup.add(pistolGrip, pistolReceiver, this.pistolSlideMesh, pistolCore, this.pistolMuzzleAnchor);
    this.staffGroup.add(pistolGroup);

    const blockGroup = new THREE.Group();
    blockGroup.visible = false;
    const heldBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.26, 0.26, 0.26),
      new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.82 })
    );
    heldBlock.position.set(0, 0.14, 0.04);
    this.heldBlockMesh = heldBlock;
    blockGroup.add(heldBlock);
    this.staffGroup.add(blockGroup);

    this.toolModeGroups = {
      pickaxe: pickaxeGroup,
      axe: axeGroup,
      bow: bowGroup,
      pistol: pistolGroup,
      block: blockGroup,
    };

    this.rightArm.add(this.staffGroup);

    // 9. Blocky Forest Spirit Wisp Companion beside left shoulder
    this.spiritCompanion = new THREE.Group();
    const spiritBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 })
    );
    this.spiritCompanion.add(spiritBody);

    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.02), eyeMat);
    eyeL.position.set(-0.045, 0.02, 0.105);
    const eyeR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.02), eyeMat);
    eyeR.position.set(0.045, 0.02, 0.105);
    this.spiritCompanion.add(eyeL, eyeR);

    const leaf = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.09, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x4ade80 })
    );
    leaf.position.y = 0.14;
    leaf.rotation.z = 0.25;
    this.spiritCompanion.add(leaf);

    this.spiritCompanion.position.set(-0.46, 1.12, -0.32);
    this.characterPivot.add(this.spiritCompanion);

    // 10. Contact Shadow Disc beneath feet
    const shadowGeo = new THREE.CircleGeometry(0.65, 16);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.36,
      depthWrite: false,
    });
    this.shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
    this.shadowDisc.position.y = 0.02;
    this.group.add(this.shadowDisc);

    // 11. Water Ripple / Swimming Wake Ring
    const wakeGeo = new THREE.RingGeometry(0.35, 1.25, 20);
    wakeGeo.rotateX(-Math.PI / 2);
    const wakeMat = new THREE.MeshBasicMaterial({
      color: 0x88eeff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    this.swimWakeMesh = new THREE.Mesh(wakeGeo, wakeMat);
    this.swimWakeMesh.position.y = 0.04;
    this.swimWakeMesh.visible = false;
    this.group.add(this.swimWakeMesh);
  }

  private createLeg(pantsMat: THREE.Material, bootMat: THREE.Material, cuffMat: THREE.Material): THREE.Group {
    const group = new THREE.Group();

    const pants = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.62, 0.22), pantsMat);
    pants.position.y = -0.31;
    pants.castShadow = true;
    group.add(pants);

    const cuff = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.09, 0.24), cuffMat);
    cuff.position.y = -0.66;
    group.add(cuff);

    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.2, 0.26), bootMat);
    boot.position.set(0, -0.8, 0.02);
    boot.castShadow = true;
    group.add(boot);

    return group;
  }

  private createArm(skinMat: THREE.Material, sleeveMat: THREE.Material): THREE.Group {
    const group = new THREE.Group();

    const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.26, 0.2), sleeveMat);
    sleeve.position.y = -0.1;
    sleeve.castShadow = true;
    group.add(sleeve);

    const forearm = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.18), skinMat);
    forearm.position.y = -0.39;
    forearm.castShadow = true;
    group.add(forearm);

    return group;
  }

  /**
   * Jump action with coyote time & swimming leap
   */
  public jump(): boolean {
    if (this.isSwimming) {
      this.verticalVelocity = 8.5;
      this.isGrounded = false;
      this.isSwimming = false;
      this.swimLeapGraceTimer = 0.32;
      return true;
    }
    if (this.isGrounded || this.coyoteTimer > 0) {
      this.verticalVelocity = this.jumpForce;
      this.isGrounded = false;
      this.coyoteTimer = 0;
      return true;
    }
    return false;
  }

  /**
   * Main movement update per frame with continuous collision handling & automatic swimming
   */
  private static readonly _scratchMoveInput = new THREE.Vector2();

  public update(
    dt: number,
    moveInput: THREE.Vector2, // Normalized x (-1 to 1: Strafe), y (-1 to 1: Forward/Back)
    cameraAngle: number,
    sprint: boolean,
    terrain: Terrain,
    obstacles: WorldObstacle[],
    strafeOnly: boolean = false
  ): void {
    const clampedDt = Math.max(0, Math.min(Number.isFinite(dt) ? dt : 0, 0.05));
    if (this.swimLeapGraceTimer > 0) {
      this.swimLeapGraceTimer = Math.max(0, this.swimLeapGraceTimer - clampedDt);
    }
    if (this.buildSwingTimer > 0) {
      this.buildSwingTimer = Math.max(0, this.buildSwingTimer - clampedDt);
    }

    // Reuse scratch vector to prevent per-frame GC allocation on mobile
    const effectiveMoveInput = Character._scratchMoveInput.set(
      Number.isFinite(moveInput.x) ? moveInput.x : 0,
      Number.isFinite(moveInput.y) ? moveInput.y : 0
    );
    if (sprint && effectiveMoveInput.lengthSq() <= 0.001) {
      effectiveMoveInput.set(0, 1.0);
    }

    const hasInput = effectiveMoveInput.lengthSq() > 0.001;
    this.isSprinting = sprint;
    this.isRunningInPlace = false;

    // Detect water zone & depth (Custom Dark Realm River vs Lake vs Ocean)
    let localWaterLevel = -999;
    if (this.customWaterY) {
      const customY = this.customWaterY(this.position.x, this.position.z);
      if (customY !== null) {
        localWaterLevel = customY;
      }
    } else {
      const lakeDist = Math.hypot(this.position.x - Terrain.LAKE_CENTER.x, this.position.z - Terrain.LAKE_CENTER.y);
      localWaterLevel = lakeDist < Terrain.LAKE_RADIUS + 4 ? Terrain.LAKE_WATER_Y : Terrain.WATER_LEVEL;
    }
    const rawGroundHeight = terrain.getHeightAt(this.position.x, this.position.z);
    const currentGroundHeight = Number.isFinite(rawGroundHeight) ? rawGroundHeight : 5;
    const waterDepth = localWaterLevel - currentGroundHeight;

    // Automatic swimming transition: enters water when water depth > 0.55m (respecting leap grace)
    if (this.swimLeapGraceTimer <= 0 && waterDepth > 0.55 && (this.position.y <= localWaterLevel + 0.25 || this.isSwimming)) {
      this.isSwimming = true;
      this.isGrounded = false;
    } else if (waterDepth <= 0.45 && currentGroundHeight >= localWaterLevel - 0.25) {
      this.isSwimming = false;
    }

    // 0. Dead state
    if (this.isDead) {
      this.velocity.x *= 0.85;
      this.velocity.z *= 0.85;
      const groundHeight = terrain.getHeightAt(this.position.x, this.position.z);
      this.position.y = THREE.MathUtils.lerp(this.position.y, Number.isFinite(groundHeight) ? groundHeight : this.position.y, clampedDt * 10);
      this.group.position.copy(this.position);
      this.animateCharacter(clampedDt, false, false, true);
      return;
    }

    // Update combat timers
    if (this.isDodging) {
      this.dodgeTimer -= clampedDt;
      if (this.dodgeTimer <= 0) {
        this.isDodging = false;
        this.characterPivot.rotation.x = 0;
      }
    }
    if (this.isAttacking) {
      this.attackTimer -= clampedDt;
      if (this.attackTimer <= 0) {
        this.isAttacking = false;
        (this.slashArcMesh.material as THREE.MeshBasicMaterial).opacity = 0;
      }
    }
    if (this.isCastingPulse) {
      this.pulseTimer -= clampedDt;
      if (this.pulseTimer <= 0) {
        this.isCastingPulse = false;
      }
    }
    if (this.rangedActionTimer > 0) {
      this.rangedActionTimer = Math.max(0, this.rangedActionTimer - clampedDt);
    }

    // 1. Calculate intended movement direction relative to camera facing
    this.isMoving = hasInput && !this.isDodging;
    if (this.isSwimming) {
      this.lastSwimInputX = effectiveMoveInput.x;
      this.lastSwimInputY = effectiveMoveInput.y;
    }

    // Speed selection: swimming vs running/walking
    const baseSpeed = this.isSwimming
      ? (this.isSprinting ? this.sprintSwimSpeed : this.swimSpeed)
      : (this.isSprinting ? this.sprintSpeed : this.walkSpeed) * (this.isGrounded ? 1.0 : 0.88);
    const currentSpeed = baseSpeed * this.externalSpeedMultiplier;

    const safeCamAngle = Number.isFinite(cameraAngle) ? cameraAngle : Math.PI;
    const zZeroAlpha = 1 - Math.exp(-12.0 * clampedDt);

    if (this.isDodging) {
      // During dodge, momentum carries the player forward at high speed
      const dodgeDrag = 1 - Math.exp(-3.5 * clampedDt);
      this.velocity.x -= this.velocity.x * dodgeDrag;
      this.velocity.z -= this.velocity.z * dodgeDrag;
    } else if (hasInput) {
      // Camera Forward and Camera Right horizontal vectors (ignoring vertical Y axis)
      const camForwardX = -Math.sin(safeCamAngle);
      const camForwardZ = -Math.cos(safeCamAngle);

      const camRightX = Math.cos(safeCamAngle);
      const camRightZ = -Math.sin(safeCamAngle);

      // Map moveInput (y = forward/backward, x = right/left) relative to camera perspective
      const moveX = camForwardX * effectiveMoveInput.y + camRightX * effectiveMoveInput.x;
      const moveZ = camForwardZ * effectiveMoveInput.y + camRightZ * effectiveMoveInput.x;

      const moveLen = Math.hypot(moveX, moveZ);
      const moveDirX = moveLen > 0.0001 ? moveX / moveLen : 0;
      const moveDirZ = moveLen > 0.0001 ? moveZ / moveLen : 0;

      // Acceleration towards desired speed (smooth exponential damping)
      const accelRate = this.isSwimming ? 11.0 : (this.isGrounded ? 24.0 : 9.0);
      const accelAlpha = 1 - Math.exp(-accelRate * clampedDt);
      this.velocity.x += (moveDirX * currentSpeed - this.velocity.x) * accelAlpha;
      this.velocity.z += (moveDirZ * currentSpeed - this.velocity.z) * accelAlpha;

      // When aiming ranged weapon or blocking in TPP, keep character aligned with camera view
      const combatAimLock = (this.isAiming || this.isBlocking) && !this.isSwimming;
      if (strafeOnly) {
        this.targetFacingAngle = this.currentFacingAngle;
        this.characterPivot.rotation.y = this.currentFacingAngle;
        this.characterPivot.rotation.z = THREE.MathUtils.lerp(this.characterPivot.rotation.z, 0, zZeroAlpha);
      } else if (combatAimLock) {
        this.targetFacingAngle = safeCamAngle + Math.PI;
        let angleDiff = this.targetFacingAngle - this.currentFacingAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        const turnAlpha = 1 - Math.exp(-22.0 * clampedDt);
        this.currentFacingAngle += angleDiff * turnAlpha;
        this.characterPivot.rotation.y = this.currentFacingAngle;
        this.characterPivot.rotation.z = THREE.MathUtils.lerp(this.characterPivot.rotation.z, 0, zZeroAlpha);
      } else {
        // Smoothly orient character toward target movement direction
        this.targetFacingAngle = Math.atan2(moveDirX, moveDirZ);

        let angleDiff = this.targetFacingAngle - this.currentFacingAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        const turnRate = this.isSwimming ? 9.5 : (this.isFirstPerson ? 32.0 : 16.0);
        const turnAlpha = 1 - Math.exp(-turnRate * clampedDt);
        this.currentFacingAngle += angleDiff * turnAlpha;
        this.characterPivot.rotation.y = this.currentFacingAngle;

        if (this.isSwimming) {
          // NEVER bank/roll while swimming (roll + prone pitch causes severe visual torso twist)
          this.characterPivot.rotation.z = THREE.MathUtils.lerp(this.characterPivot.rotation.z, 0, zZeroAlpha);
        } else {
          // Subtle natural banking lean only on dry land
          const targetBank = -Math.max(-0.35, Math.min(0.35, angleDiff)) * (this.isSprinting ? 0.22 : 0.10);
          this.characterPivot.rotation.z = THREE.MathUtils.lerp(this.characterPivot.rotation.z, targetBank, zZeroAlpha);
        }
      }
    } else {
      // Turn body with camera view when first-person OR aiming/blocking
      if (this.isFirstPerson || ((this.isAiming || this.isBlocking) && !this.isSwimming)) {
        this.targetFacingAngle = safeCamAngle + Math.PI;
        let angleDiff = this.targetFacingAngle - this.currentFacingAngle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        const turnAlpha = 1 - Math.exp(-26.0 * clampedDt);
        this.currentFacingAngle += angleDiff * turnAlpha;
        this.characterPivot.rotation.y = this.currentFacingAngle;
      }
      // Decelerate friction / water drag smoothly
      const frictionRate = this.isSwimming ? 10.0 : (this.isGrounded ? 18.0 : 4.0);
      const frictionAlpha = 1 - Math.exp(-frictionRate * clampedDt);
      this.velocity.x -= this.velocity.x * frictionAlpha;
      this.velocity.z -= this.velocity.z * frictionAlpha;
      this.characterPivot.rotation.z = THREE.MathUtils.lerp(this.characterPivot.rotation.z, 0, zZeroAlpha);
    }

    if (!Number.isFinite(this.velocity.x)) this.velocity.x = 0;
    if (!Number.isFinite(this.velocity.z)) this.velocity.z = 0;

    // 2. Apply horizontal movement with sub-step sliding collision
    const prevX = this.position.x;
    const prevZ = this.position.z;
    let newX = prevX + this.velocity.x * clampedDt;
    let newZ = prevZ + this.velocity.z * clampedDt;

    // 3. Multi-pass Obstacle Collision Resolution (boulders, trees, temple columns, altar)
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        if (obs.radius <= 0) continue;
        // Allow stepping/landing onto climbable obstacles when player feet are near or above topY
        if (obs.topY !== undefined && this.position.y >= obs.topY - 0.62) {
          continue;
        }

        const dx = newX - obs.x;
        const dz = newZ - obs.z;
        const minDist = this.radius + obs.radius;
        const distSq = dx * dx + dz * dz;

        if (distSq < minDist * minDist && distSq > 0.00001) {
          const dist = Math.sqrt(distSq);
          const overlap = minDist - dist;
          // Normal push-out
          const nx = dx / dist;
          const nz = dz / dist;
          newX += nx * overlap;
          newZ += nz * overlap;

          // Slide velocity along collision surface
          const dot = this.velocity.x * nx + this.velocity.z * nz;
          if (dot < 0) {
            this.velocity.x -= dot * nx;
            this.velocity.z -= dot * nz;
          }
        }
      }
    }

    // 3b. Block horizontal clipping into sheer structural ledges (raised platforms/walls above step height)
    if (terrain.floorHeightProvider) {
      const nextFloorH = terrain.floorHeightProvider(newX, newZ);
      if (nextFloorH !== null && nextFloorH - this.position.y > 0.72) {
        const floorOnlyX = terrain.floorHeightProvider(newX, prevZ);
        const floorOnlyZ = terrain.floorHeightProvider(prevX, newZ);
        if (floorOnlyX === null || floorOnlyX - this.position.y <= 0.72) {
          newZ = prevZ;
          this.velocity.z = 0;
        } else if (floorOnlyZ === null || floorOnlyZ - this.position.y <= 0.72) {
          newX = prevX;
          this.velocity.x = 0;
        } else {
          newX = prevX;
          newZ = prevZ;
          this.velocity.x = 0;
          this.velocity.z = 0;
        }
      }
    }

    // 4. Perimeter Boundary Check (Expanded to vast continent radius of 1180)
    const distFromOrigin = Math.sqrt(newX * newX + newZ * newZ);
    const maxWorldRadius = 1180;
    if (distFromOrigin > maxWorldRadius) {
      const angle = Math.atan2(newZ, newX);
      newX = Math.cos(angle) * maxWorldRadius;
      newZ = Math.sin(angle) * maxWorldRadius;
      this.velocity.set(0, 0, 0);
    }

    if (Number.isFinite(newX) && Number.isFinite(newZ)) {
      this.position.x = newX;
      this.position.z = newZ;
    }

    // 5. Vertical Physics, Water Floating & Terrain/Structure Height Clamping
    let walkableObstacleTopY = -Infinity;
    for (let i = 0; i < obstacles.length; i++) {
      const obs = obstacles[i];
      if (obs.topY === undefined || obs.radius <= 0) continue;
      if (this.position.y < obs.topY - 0.62) continue;
      const dx = this.position.x - obs.x;
      const dz = this.position.z - obs.z;
      const supportRadius = obs.radius + 0.18;
      if (dx * dx + dz * dz <= supportRadius * supportRadius) {
        if (obs.topY > walkableObstacleTopY) {
          walkableObstacleTopY = obs.topY;
        }
      }
    }

    const rawNextGround = terrain.getHeightAt(this.position.x, this.position.z);
    const baseGroundHeight = Number.isFinite(rawNextGround) ? rawNextGround : currentGroundHeight;
    const groundHeight = Math.max(baseGroundHeight, walkableObstacleTopY);

    if (this.isSwimming) {
      // Swimming buoyancy & surface floating
      this.coyoteTimer = 0;
      this.verticalVelocity = 0;
      const waveBobbing = Math.sin(this.animTime * 3.0) * 0.04;
      const targetSwimY = localWaterLevel - 0.28 + waveBobbing;
      this.position.y = THREE.MathUtils.lerp(this.position.y, targetSwimY, Math.min(1, 12.0 * clampedDt));

      // Water ripple ring follows swimmer at water surface
      this.swimWakeMesh.visible = true;
      this.swimWakeMesh.position.y = (localWaterLevel - this.position.y) + 0.02;
      const ripplePulse = 1.0 + Math.sin(this.animTime * 3.5) * 0.16 + (this.isMoving ? 0.32 : 0.0);
      this.swimWakeMesh.scale.set(ripplePulse, ripplePulse, ripplePulse);
      this.shadowDisc.visible = false;
    } else if (!this.isGrounded) {
      this.swimWakeMesh.visible = false;
      this.shadowDisc.visible = true;
      this.coyoteTimer = Math.max(0, this.coyoteTimer - clampedDt);
      this.verticalVelocity -= this.gravity * clampedDt;
      this.position.y += this.verticalVelocity * clampedDt;

      // Landing detection
      if (this.position.y <= groundHeight) {
        this.position.y = groundHeight;
        this.verticalVelocity = 0;
        this.isGrounded = true;
        this.coyoteTimer = 0;
      }
    } else {
      this.swimWakeMesh.visible = false;
      this.shadowDisc.visible = true;
      // Check if walking off an edge/cliff
      const heightDiff = groundHeight - this.position.y;
      if (heightDiff < -0.8) {
        // Step-down into free-fall
        this.isGrounded = false;
        this.coyoteTimer = this.maxCoyoteTime;
      } else {
        // Adhere smoothly to slopes & stairs (max climbable step)
        this.position.y = THREE.MathUtils.lerp(this.position.y, groundHeight, Math.min(1, 28.0 * clampedDt));
        this.coyoteTimer = this.maxCoyoteTime;
      }
    }

    if (!Number.isFinite(this.position.y) || this.position.y < -15) {
      this.position.y = groundHeight;
      this.verticalVelocity = 0;
      this.isGrounded = true;
    }

    this.group.position.copy(this.position);

    // 6. Character Procedural Animations
    this.animateCharacter(clampedDt, hasInput, this.isSprinting, this.isGrounded);
  }

  private animateCharacter(dt: number, isMoving: boolean, isSprinting: boolean, isGrounded: boolean): void {
    if (this.isDead) {
      // Defeated collapse posture
      this.characterPivot.rotation.x = THREE.MathUtils.lerp(this.characterPivot.rotation.x, -Math.PI / 2.2, dt * 10);
      this.torsoGroup.position.y = THREE.MathUtils.lerp(this.torsoGroup.position.y, 0.2, dt * 10);
      this.leftArm.rotation.set(0.4, 0, 0.3);
      this.rightArm.rotation.set(-0.2, 0, -0.4);
      this.leftLeg.rotation.set(-0.3, 0, 0.2);
      this.rightLeg.rotation.set(0.2, 0, -0.2);
      if (this.spiritCompanion) {
        this.spiritCompanion.position.y = 0.55 + Math.sin(this.animTime * 4.0) * 0.05;
      }
      return;
    }

    if (this.isDodging) {
      // 360-degree acrobatic tumble roll
      const progress = 1 - Math.max(0, this.dodgeTimer / 0.38);
      this.characterPivot.rotation.x = -progress * Math.PI * 2;
      this.torsoGroup.position.y = 0.55 + Math.sin(progress * Math.PI) * 0.25;
      this.capeletTails.rotation.x = 0.85;
      this.leftArm.rotation.x = -1.2;
      this.rightArm.rotation.x = 1.0;
      this.leftLeg.rotation.x = 0.6;
      this.rightLeg.rotation.x = 0.6;
      return;
    }

    // Default Locomotion & Idle (cleanly exit swimming/dodge posture via exponential damping)
    const exitAlpha = 1 - Math.exp(-14.0 * dt);
    this.characterPivot.rotation.x = THREE.MathUtils.lerp(this.characterPivot.rotation.x, 0, exitAlpha);
    this.headGroup.rotation.z = THREE.MathUtils.lerp(this.headGroup.rotation.z, 0, exitAlpha);
    this.torsoGroup.rotation.y = THREE.MathUtils.lerp(this.torsoGroup.rotation.y, 0, exitAlpha);

    if ((isMoving || this.isRunningInPlace) && isGrounded) {
      const freq = isSprinting ? 15.0 : 9.5;
      this.animTime += dt * freq;

      const legSwing = Math.sin(this.animTime) * (isSprinting ? 0.78 : 0.52);
      const armSwing = Math.sin(this.animTime) * (isSprinting ? 0.65 : 0.42);

      this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, legSwing, exitAlpha * 1.4);
      this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, -legSwing, exitAlpha * 1.4);

      this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, -armSwing, exitAlpha * 1.4);
      this.leftArm.rotation.y = THREE.MathUtils.lerp(this.leftArm.rotation.y, 0, exitAlpha);
      this.leftArm.rotation.z = THREE.MathUtils.lerp(this.leftArm.rotation.z, 0, exitAlpha);

      // Right arm swings naturally with held weapon
      this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, -0.18 + armSwing * 0.32, exitAlpha * 1.4);
      this.rightArm.rotation.y = THREE.MathUtils.lerp(this.rightArm.rotation.y, -0.06, exitAlpha);
      this.rightArm.rotation.z = THREE.MathUtils.lerp(this.rightArm.rotation.z, -0.08, exitAlpha);

      const capeSway = Math.sin(this.animTime * 0.9) * 0.15 + (isSprinting ? 0.45 : 0.22);
      this.capeletTails.rotation.x = THREE.MathUtils.lerp(this.capeletTails.rotation.x, capeSway, exitAlpha);

      this.torsoGroup.position.y = THREE.MathUtils.lerp(
        this.torsoGroup.position.y,
        0.95 + Math.abs(Math.sin(this.animTime * 2)) * (isSprinting ? 0.14 : 0.08),
        exitAlpha
      );
      this.headGroup.rotation.x = Math.sin(this.animTime * 2) * 0.04;
    } else if (!isGrounded) {
      const jumpAlpha = 1 - Math.exp(-14.0 * dt);
      this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, 0.45, jumpAlpha);
      this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, -0.32, jumpAlpha);
      this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, -0.7, jumpAlpha);
      this.leftArm.rotation.y = THREE.MathUtils.lerp(this.leftArm.rotation.y, 0, jumpAlpha);
      this.leftArm.rotation.z = THREE.MathUtils.lerp(this.leftArm.rotation.z, 0, jumpAlpha);
      this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, -0.32, jumpAlpha);
      this.rightArm.rotation.y = THREE.MathUtils.lerp(this.rightArm.rotation.y, -0.08, jumpAlpha);
      this.rightArm.rotation.z = THREE.MathUtils.lerp(this.rightArm.rotation.z, -0.12, jumpAlpha);
      this.capeletTails.rotation.x = THREE.MathUtils.lerp(this.capeletTails.rotation.x, 0.55, jumpAlpha);
      this.torsoGroup.position.y = THREE.MathUtils.lerp(this.torsoGroup.position.y, 0.95, jumpAlpha);
      this.headGroup.rotation.x = THREE.MathUtils.lerp(this.headGroup.rotation.x, 0, jumpAlpha);
    } else {
      this.animTime += dt * 2.2;
      const idleAlpha = 1 - Math.exp(-10.0 * dt);
      this.leftLeg.rotation.x = THREE.MathUtils.lerp(this.leftLeg.rotation.x, 0, idleAlpha);
      this.rightLeg.rotation.x = THREE.MathUtils.lerp(this.rightLeg.rotation.x, 0, idleAlpha);
      this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, 0, idleAlpha);
      this.leftArm.rotation.y = THREE.MathUtils.lerp(this.leftArm.rotation.y, 0, idleAlpha);
      this.leftArm.rotation.z = THREE.MathUtils.lerp(this.leftArm.rotation.z, 0, idleAlpha);

      this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, -0.22, idleAlpha);
      this.rightArm.rotation.y = THREE.MathUtils.lerp(this.rightArm.rotation.y, -0.08, idleAlpha);
      this.rightArm.rotation.z = THREE.MathUtils.lerp(this.rightArm.rotation.z, -0.08, idleAlpha);

      this.torsoGroup.position.y = THREE.MathUtils.lerp(this.torsoGroup.position.y, 0.95 + Math.sin(this.animTime) * 0.03, idleAlpha);
      this.capeletTails.rotation.x = THREE.MathUtils.lerp(this.capeletTails.rotation.x, 0.05, idleAlpha);
      this.headGroup.rotation.x = Math.sin(this.animTime * 1.2) * 0.03;
    }

    // Layered Upper-Body Combat Poses (never freeze leg locomotion!)
    const poseAlpha = 1 - Math.exp(-22.0 * dt);
    const arcMat = this.slashArcMesh.material as THREE.MeshBasicMaterial;

    if (this.isCastingPulse) {
      // Raise sword aloft pointing to the sky with both hands while legs can keep moving
      this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, -2.5, poseAlpha);
      this.leftArm.rotation.y = THREE.MathUtils.lerp(this.leftArm.rotation.y, 0.1, poseAlpha);
      this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, -2.5, poseAlpha);
      this.rightArm.rotation.y = THREE.MathUtils.lerp(this.rightArm.rotation.y, 0, poseAlpha);
      this.rightArm.rotation.z = THREE.MathUtils.lerp(this.rightArm.rotation.z, -0.1, poseAlpha);
      this.staffLight.intensity = 5.5;
      this.torsoGroup.position.y = THREE.MathUtils.lerp(this.torsoGroup.position.y, 1.05, poseAlpha);
      arcMat.opacity = 0;
    } else if (this.isAttacking && this.equippedWeapon === 'sword') {
      // Smooth 3-hit sword combo layered cleanly over walking/running/jumping legs
      const progress = 1 - Math.max(0, this.attackTimer / 0.32);
      const swing = Math.sin(progress * Math.PI);

      let targetArmX = -1.1 + swing * 2.0;
      let targetArmY = -0.6 + swing * 1.3;
      let targetArmZ = -0.3 + swing * 0.7;
      let torsoTwist = -0.25 + swing * 0.55;

      if (this.attackComboStep === 1) {
        targetArmX = -2.3 + progress * 3.5;
        targetArmY = 0.1;
        targetArmZ = -0.1;
        torsoTwist = 0.18 - progress * 0.36;
      } else if (this.attackComboStep === 2) {
        targetArmX = -0.6 - swing * 1.3;
        targetArmY = 0.35;
        targetArmZ = 1.1 - swing * 2.1;
        torsoTwist = 0.35 - swing * 0.7;
      }

      this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, targetArmX, poseAlpha);
      this.rightArm.rotation.y = THREE.MathUtils.lerp(this.rightArm.rotation.y, targetArmY, poseAlpha);
      this.rightArm.rotation.z = THREE.MathUtils.lerp(this.rightArm.rotation.z, targetArmZ, poseAlpha);
      this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, 0.45, poseAlpha);
      this.torsoGroup.rotation.y = THREE.MathUtils.lerp(this.torsoGroup.rotation.y, torsoTwist, poseAlpha);
      arcMat.opacity = swing * 0.92;
      this.slashArcMesh.rotation.z = progress * Math.PI;
      this.staffLight.intensity = 3.6;
    } else {
      arcMat.opacity = THREE.MathUtils.lerp(arcMat.opacity, 0, poseAlpha);

      if (this.equippedWeapon === 'sword' && this.isBlocking) {
        this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, -1.05, poseAlpha);
        this.rightArm.rotation.y = THREE.MathUtils.lerp(this.rightArm.rotation.y, 0.42, poseAlpha);
        this.rightArm.rotation.z = THREE.MathUtils.lerp(this.rightArm.rotation.z, 0.85, poseAlpha);
        this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, -0.95, poseAlpha);
        this.leftArm.rotation.z = THREE.MathUtils.lerp(this.leftArm.rotation.z, -0.42, poseAlpha);
        this.torsoGroup.rotation.y = THREE.MathUtils.lerp(this.torsoGroup.rotation.y, -0.22, poseAlpha);
      } else if (this.equippedWeapon === 'pistol') {
        const kick = this.rangedActionKind === 'pistol' && this.rangedActionTimer > 0
          ? Math.sin((this.rangedActionTimer / 0.16) * Math.PI) * 0.42
          : 0;
        const holdingAim = this.isAiming || this.pistolRecoilOffset > 0.01 || this.rangedActionTimer > 0;
        const targetArmX = (holdingAim ? -1.48 : -0.78) - this.pistolRecoilOffset * 0.45 - kick;
        this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, targetArmX, poseAlpha);
        this.rightArm.rotation.y = THREE.MathUtils.lerp(this.rightArm.rotation.y, 0.04, poseAlpha);
        this.rightArm.rotation.z = THREE.MathUtils.lerp(this.rightArm.rotation.z, 0, poseAlpha);
        if (this.isAiming) {
          this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, -1.32, poseAlpha);
          this.leftArm.rotation.y = THREE.MathUtils.lerp(this.leftArm.rotation.y, -0.45, poseAlpha);
          this.torsoGroup.rotation.y = THREE.MathUtils.lerp(this.torsoGroup.rotation.y, -0.14, poseAlpha);
        }
        if (this.pistolSlideMesh) {
          this.pistolSlideMesh.position.z = 0.13 - Math.max(this.pistolRecoilOffset, kick) * 0.09;
        }
      } else if (this.equippedWeapon === 'bow') {
        const releaseSnap =
          this.rangedActionKind === 'bow' && this.rangedActionTimer > 0
            ? Math.sin((this.rangedActionTimer / 0.24) * Math.PI)
            : 0;
        if (this.isAiming || this.bowDrawAmount > 0.01 || releaseSnap > 0.01) {
          this.rightArm.rotation.x = THREE.MathUtils.lerp(this.rightArm.rotation.x, -1.38 + releaseSnap * 0.12, poseAlpha);
          this.rightArm.rotation.y = THREE.MathUtils.lerp(this.rightArm.rotation.y, -0.05, poseAlpha);
          this.leftArm.rotation.x = THREE.MathUtils.lerp(this.leftArm.rotation.x, -1.26, poseAlpha);
          this.leftArm.rotation.y = THREE.MathUtils.lerp(
            this.leftArm.rotation.y,
            -0.46 - this.bowDrawAmount * 0.34 + releaseSnap * 0.25,
            poseAlpha
          );
          this.torsoGroup.rotation.y = THREE.MathUtils.lerp(this.torsoGroup.rotation.y, 0.24 * Math.max(this.bowDrawAmount, this.isAiming ? 0.6 : 0), poseAlpha);
        }
        if (this.bowStringTop && this.bowStringBot && this.bowNockedArrow) {
          const pullBack = this.bowDrawAmount * 0.22;
          const midZ = -0.04 - pullBack * 0.5;
          const tilt = Math.atan2(pullBack, 0.39);
          this.bowStringTop.position.set(0, 0.435, midZ);
          this.bowStringTop.rotation.x = -tilt;
          this.bowStringBot.position.set(0, 0.045, midZ);
          this.bowStringBot.rotation.x = tilt;
          const stringScale = Math.hypot(0.39, pullBack) / 0.39;
          this.bowStringTop.scale.y = stringScale;
          this.bowStringBot.scale.y = stringScale;

          if (this.bowUpperLimb && this.bowLowerLimb) {
            this.bowUpperLimb.rotation.x = 0.48 - this.bowDrawAmount * 0.18;
            this.bowLowerLimb.rotation.x = -0.48 + this.bowDrawAmount * 0.18;
          }

          this.bowNockedArrow.position.z = 0.12 - pullBack;
          this.bowNockedArrow.visible = this.bowDrawAmount > 0.02 || this.isAiming;
        }
      }
    }

    // Minecraft-style Build / Break Right-Arm Swing Overlay (layers smoothly on top of walk/idle)
    if (this.isBreakingBlock) {
      this.breakAnimTime += dt * 16.0;
      const mineSwing = Math.sin(this.breakAnimTime);
      this.rightArm.rotation.x = -0.95 + mineSwing * 0.65;
      this.rightArm.rotation.y = -0.18 + Math.cos(this.breakAnimTime) * 0.16;
      this.rightArm.rotation.z = -0.15 + mineSwing * 0.18;
    } else if (this.buildSwingTimer > 0) {
      const p = 1 - this.buildSwingTimer / Math.max(0.01, this.buildSwingDuration);
      const swing = Math.sin(p * Math.PI);
      this.rightArm.rotation.x = -0.35 - swing * 1.15;
      this.rightArm.rotation.y = -0.1 - swing * 0.22;
      this.rightArm.rotation.z = -0.08 + swing * 0.18;
    }

    // Sword cross-guard ancient rune gem glow pulsation
    if (this.staffCrystal) {
      this.staffCrystal.rotation.y += dt * 2.0;
      const gemPulse = 1.0 + Math.sin(this.animTime * 2.8) * 0.15;
      this.staffCrystal.scale.setScalar(gemPulse);
      if (!this.isAttacking && !this.isCastingPulse) {
        this.staffLight.intensity = 1.0 + Math.sin(this.animTime * 3.0) * 0.4;
      }
    }

    // Spirit Companion gentle bobbing & orbiting near shoulder
    if (this.spiritCompanion) {
      this.spiritCompanion.position.y = 1.1 + Math.sin(this.animTime * 2.5) * 0.08;
      this.spiritCompanion.rotation.y = Math.sin(this.animTime * 1.5) * 0.25;
    }
  }

  // ==========================================
  // COMBAT ACTIONS
  // ==========================================

  private static readonly _scratchVec = new THREE.Vector3();
  private static readonly _scratchStaffPos = new THREE.Vector3();

  public performAttack(comboStep: number = 0): boolean {
    if (this.isDead || this.isDodging) return false;
    this.isAttacking = true;
    this.attackTimer = 0.32;
    this.attackComboStep = comboStep % 3;

    // Forward lunge boost
    Character._scratchVec.set(
      Math.sin(this.currentFacingAngle),
      0,
      Math.cos(this.currentFacingAngle)
    );
    this.velocity.x += Character._scratchVec.x * 4.5;
    this.velocity.z += Character._scratchVec.z * 4.5;
    return true;
  }

  public performDodge(inputDir?: THREE.Vector3): boolean {
    if (this.isDead || this.isDodging) return false;
    this.isDodging = true;
    this.dodgeTimer = 0.38;
    this.isAttacking = false;
    this.attackTimer = 0;
    (this.slashArcMesh.material as THREE.MeshBasicMaterial).opacity = 0;

    if (inputDir && inputDir.lengthSq() > 0.01) {
      Character._scratchVec.copy(inputDir).normalize();
    } else {
      Character._scratchVec.set(
        Math.sin(this.currentFacingAngle),
        0,
        Math.cos(this.currentFacingAngle)
      );
    }

    // High velocity burst
    this.velocity.copy(Character._scratchVec.multiplyScalar(17.5));
    return true;
  }

  public performEchoPulse(): boolean {
    if (this.isDead || this.isDodging) return false;
    this.isCastingPulse = true;
    this.pulseTimer = 0.55;
    this.isAttacking = false;
    return true;
  }

  public triggerAttackAnimation(): void {
    this.performAttack((this.attackComboStep + 1) % 3);
  }

  public triggerRangedAction(weapon: 'pistol' | 'bow', power: number = 1.0): void {
    if (this.isDead || this.isDodging) return;
    this.rangedActionKind = weapon;
    this.rangedActionTimer = weapon === 'pistol' ? 0.16 : 0.24;
    if (weapon === 'pistol') {
      this.pistolRecoilOffset = Math.max(this.pistolRecoilOffset, 1.0);
    } else {
      this.bowDrawAmount = Math.max(0, power * 0.15);
    }
  }

  public setFacingAngleInstant(yaw: number): void {
    this.currentFacingAngle = yaw;
    this.targetFacingAngle = yaw;
    this.characterPivot.rotation.y = yaw;
  }

  public triggerEchoPulseAnimation(): void {
    this.performEchoPulse();
  }

  private static readonly _scratchDodgeVec = new THREE.Vector3();

  public triggerDodge(cameraYaw: number, moveX: number, moveY: number): void {
    if (Math.hypot(moveX, moveY) > 0.05) {
      const camForwardX = -Math.sin(cameraYaw);
      const camForwardZ = -Math.cos(cameraYaw);
      const camRightX = Math.cos(cameraYaw);
      const camRightZ = -Math.sin(cameraYaw);
      Character._scratchDodgeVec.set(
        camForwardX * moveY + camRightX * moveX,
        0,
        camForwardZ * moveY + camRightZ * moveX
      );
      this.performDodge(Character._scratchDodgeVec);
    } else {
      this.performDodge();
    }
  }

  public setEquippedWeapon(weapon: WeaponType): void {
    this.equippedWeapon = weapon;
    if (weapon !== 'sword') this.isBlocking = false;
    this.setDarkRealmToolVisual(weapon, 0x00f5d4);
  }

  public setCombatPose(pose: {
    isBlocking?: boolean;
    isAiming?: boolean;
    bowDraw?: number;
    pistolRecoil?: number;
  }): void {
    if (pose.isBlocking !== undefined) this.isBlocking = pose.isBlocking;
    if (pose.isAiming !== undefined) this.isAiming = pose.isAiming;
    if (pose.bowDraw !== undefined) this.bowDrawAmount = pose.bowDraw;
    if (pose.pistolRecoil !== undefined) this.pistolRecoilOffset = pose.pistolRecoil;
  }

  public getWeaponMuzzleWorldPosition(out: THREE.Vector3): THREE.Vector3 {
    if (this.equippedWeapon === 'pistol' && this.pistolMuzzleAnchor) {
      return this.pistolMuzzleAnchor.getWorldPosition(out);
    }
    if (this.equippedWeapon === 'bow' && this.bowNockedArrow) {
      return this.bowNockedArrow.getWorldPosition(out);
    }
    return this.staffCrystal.getWorldPosition(out);
  }

  public setDarkRealmToolVisual(
    tool: 'sword' | 'pickaxe' | 'axe' | 'bow' | 'pistol' | 'block',
    swordColor: number = 0x00f5d4
  ): void {
    const isSword = tool === 'sword';
    for (const part of this.swordVisualParts) {
      part.visible = isSword;
    }
    this.toolModeGroups.pickaxe.visible = tool === 'pickaxe';
    this.toolModeGroups.axe.visible = tool === 'axe';
    this.toolModeGroups.bow.visible = tool === 'bow';
    this.toolModeGroups.pistol.visible = tool === 'pistol';
    this.toolModeGroups.block.visible = tool === 'block';

    if (isSword) {
      const gemMat = this.staffCrystal.material as THREE.MeshStandardMaterial;
      gemMat.color.setHex(swordColor);
      gemMat.emissive.setHex(swordColor);
      this.staffLight.color.setHex(swordColor);
      (this.slashArcMesh.material as THREE.MeshBasicMaterial).color.setHex(swordColor);
      this.bladeSteelMat.emissive.setHex(swordColor);
      this.bladeSteelMat.emissiveIntensity = swordColor === 0x00f5d4 ? 0.7 : 0.28;
    }
  }

  public triggerBuildPlaceAnimation(): void {
    this.buildSwingDuration = 0.2;
    this.buildSwingTimer = 0.2;
  }

  public triggerBuildBreakHitAnimation(): void {
    this.buildSwingDuration = 0.18;
    this.buildSwingTimer = 0.18;
  }

  public setBreakingBlockAnimation(active: boolean): void {
    this.isBreakingBlock = active;
    if (!active) {
      this.breakAnimTime = 0;
    }
  }

  public setHeldBlockAppearance(colorHex: number): void {
    if (this.heldBlockMesh) {
      (this.heldBlockMesh.material as THREE.MeshStandardMaterial).color.setHex(colorHex);
    }
  }

  public die(): void {
    this.isDead = true;
    this.isAttacking = false;
    this.isDodging = false;
    this.isCastingPulse = false;
    this.isBlocking = false;
    this.isAiming = false;
    this.velocity.set(0, 0, 0);
  }

  public respawn(spawnPos: THREE.Vector3): void {
    this.isDead = false;
    this.isAttacking = false;
    this.isDodging = false;
    this.isCastingPulse = false;
    this.position.copy(spawnPos);
    this.velocity.set(0, 0, 0);
    this.characterPivot.rotation.set(0, this.currentFacingAngle, 0);
    this.characterPivot.position.set(0, 0, 0);
  }

  public getFacingDirection(): THREE.Vector3 {
    return Character._scratchVec
      .set(Math.sin(this.currentFacingAngle), 0, Math.cos(this.currentFacingAngle))
      .normalize();
  }

  public getStaffWorldPosition(): THREE.Vector3 {
    this.staffCrystal.getWorldPosition(Character._scratchStaffPos);
    return Character._scratchStaffPos;
  }

  public getSwordWorldPosition(): THREE.Vector3 {
    return this.getStaffWorldPosition();
  }

  public setFirstPersonMode(active: boolean, hideMesh: boolean = active): void {
    this.isFirstPerson = active;
    this.characterPivot.visible = !hideMesh;
  }

  public isCharacterMeshHidden(): boolean {
    return !this.characterPivot.visible;
  }

  public applyProfileAppearance(profile: { robeColor?: string; auraColor?: string }): void {
    if (profile.robeColor && this.capeletMat) {
      this.capeletMat.color.set(profile.robeColor);
      if (this.capeletTrimMat) {
        this.capeletTrimMat.color.set(profile.robeColor).multiplyScalar(0.8);
      }
    }
    if (profile.auraColor) {
      if (this.staffCrystal) {
        const gemMat = this.staffCrystal.material as THREE.MeshStandardMaterial;
        gemMat.color.set(profile.auraColor);
        gemMat.emissive.set(profile.auraColor);
      }
      if (this.staffLight) {
        this.staffLight.color.set(profile.auraColor);
      }
      if (this.slashArcMesh) {
        (this.slashArcMesh.material as THREE.MeshBasicMaterial).color.set(profile.auraColor);
      }
    }
  }
}
