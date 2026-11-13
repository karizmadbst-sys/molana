/**
 * ECHO – DARK FANTASY REALM
 * Central Coordinator & Game-Loop Bridge for the Open-World Dark Fantasy RPG
 */

import * as THREE from 'three';
import { createDarkRealmTextures, DarkTextureSet } from './DarkRealmTextures.ts';
import { DarkRealmProgress, VoxelBlockKind, CraftRecipe } from './DarkRealmProgress.ts';
import { DarkRealmTerrain, DarkLandmarkZone } from './DarkRealmTerrain.ts';
import { VoxelBuilder, VOXEL_LABELS, VOXEL_COLORS, PlacedVoxel } from './VoxelBuilder.ts';
import { DarkRealmLandmarks } from './DarkRealmLandmarks.ts';
import { DarkRealmAtmosphere, DarkWeatherType } from './DarkRealmAtmosphere.ts';
import { DarkRealmEntities, CompanionAIMode } from './DarkRealmEntities.ts';
import { DarkRealmUI } from './DarkRealmUI.ts';
import { Character } from '../player/Character.ts';
import { InputController } from '../player/InputController.ts';
import { ThirdPersonCamera } from '../player/ThirdPersonCamera.ts';
import { SoundSynth } from '../audio/SoundSynth.ts';
import { WorldObstacle } from '../world/Forest.ts';
import { SharedCompanionUnit } from '../npc/QuestCompanions.ts';
import { CombatStats } from '../combat/CombatSystem.ts';
import type { WeaponSystem } from '../combat/WeaponSystem.ts';
import { InteractiveTarget } from '../world/WorldInteractions.ts';

const SAVE_KEY = 'echo_dark_realm_save_v1';

export class DarkRealmManager {
  public group: THREE.Group;
  public textures: DarkTextureSet;
  public progress: DarkRealmProgress;
  public terrain: DarkRealmTerrain;
  public voxelBuilder: VoxelBuilder;
  public landmarks: DarkRealmLandmarks;
  public atmosphere: DarkRealmAtmosphere;
  public entities: DarkRealmEntities;
  public ui: DarkRealmUI;

  private allObstacles: WorldObstacle[] = [];
  private isActive = false;
  private isReturningPortalReady = false;
  private lastClosestChestId: string | null = null;
  private lastPlayerPos = new THREE.Vector3();
  private distanceAccum = 0;
  private actionCooldown = 0;
  private manaRegenAccum = 0;
  private minimapAccum = 0;
  private shieldActiveTimer = 0;
  private saveAccum = 0;

  // Minecraft-style Build Rotation & Progressive Mining State
  public buildRotation = 0;
  private miningTargetBlock: PlacedVoxel | null = null;
  private miningTargetKey: string | null = null;
  private miningProgress = 0;
  private miningHitTimer = 0;
  private rightHoldElapsed = 0;
  private wasRightMouseHeld = false;

  private player: Character;
  private cameraSystem: ThirdPersonCamera;
  private sound: SoundSynth;
  private scene: THREE.Scene;
  private savedOriginalFog: THREE.Fog | THREE.FogExp2 | null = null;
  private onExitToOriginalIsland: () => void;
  private onPlayerHurt?: () => void;

  // Multiplayer synchronization callbacks (wired by Game.ts)
  public onVoxelChanged?: (op: 'PLACE' | 'REMOVE', blocks: PlacedVoxel[]) => void;
  public onMonsterDamaged?: (
    spawnId: number,
    hp: number,
    maxHp: number,
    alive: boolean,
    pos: { x: number; y: number; z: number }
  ) => void;
  public onNodeDamaged?: (nodeId: number, hp: number, destroyed: boolean) => void;
  public onChestOpened?: (chestId: string) => void;
  public onSharedProgressChanged?: () => void;
  public onCombatAction?: (kind: 'ATTACK' | 'DODGE' | 'PULSE') => void;
  public weaponSystem?: WeaponSystem;

  private readonly aimForward = new THREE.Vector3();

  constructor(
    scene: THREE.Scene,
    player: Character,
    cameraSystem: ThirdPersonCamera,
    sound: SoundSynth,
    isMobile: boolean,
    sharedCompanions: SharedCompanionUnit[],
    onExitToOriginalIsland: () => void,
    onToast?: (msg: string) => void,
    onPlayerHurt?: () => void,
    sharedProgress?: DarkRealmProgress
  ) {
    this.scene = scene;
    this.player = player;
    this.cameraSystem = cameraSystem;
    this.sound = sound;
    this.onExitToOriginalIsland = onExitToOriginalIsland;
    this.onPlayerHurt = onPlayerHurt;

    this.group = new THREE.Group();
    this.group.visible = false;

    this.textures = createDarkRealmTextures();
    this.progress = sharedProgress || new DarkRealmProgress();
    this.terrain = new DarkRealmTerrain(this.textures, isMobile);
    this.voxelBuilder = new VoxelBuilder(this.textures);
    this.landmarks = new DarkRealmLandmarks(this.terrain, this.textures, isMobile);
    this.atmosphere = new DarkRealmAtmosphere(this.textures, isMobile);
    this.atmosphere.setScene(this.scene);
    this.entities = new DarkRealmEntities(this.terrain, this.landmarks, sharedCompanions, isMobile);

    // Wire voxel floors & walls cleanly into terrain height query
    this.terrain.floorHeightProvider = (x, z) => {
      const wallH = this.voxelBuilder.getBlockingWallHeightAt(x, z, this.terrain.playerCurrentY);
      if (wallH !== null) return wallH;
      return this.voxelBuilder.getFloorHeightAt(x, z, this.terrain.playerCurrentY);
    };

    this.allObstacles = [...this.landmarks.obstacles];

    this.group.add(
      this.atmosphere.group,
      this.terrain.group,
      this.voxelBuilder.group,
      this.landmarks.group,
      this.entities.group
    );

    this.ui = new DarkRealmUI(this.progress, {
      onSelectSlot: (idx) => this.selectHotbarSlot(idx),
      onSelectBlockKind: (kind) => this.selectBlockKind(kind),
      onToggleBuildMode: () => this.toggleBuildMode(),
      onCraftRecipe: (r) => this.handleCraft(r),
      onUpgradeStat: (s) => this.handleUpgradeStat(s),
      onBuildStarterHouse: () => this.handleQuickBuildCabin(),
      onCycleCompanionMode: () => {
        const m = this.entities.cycleCompanionMode();
        this.ui.updateCompanionModeLabel(m);
        this.ui.showToast(`✦ نظام الرفقاء: ${m}`);
      },
      onFastTravel: (lm) => this.fastTravelTo(lm),
      onCycleWeather: () => {
        const w = this.atmosphere.cycleWeather();
        this.ui.updateEnvironmentLabel(this.atmosphere.getPhaseLabel().en, w);
        this.ui.showToast(`🌦️ Weather changed to ${w}`);
      },
      onSetTimePreset: (t) => {
        this.atmosphere.setTimeOfDay(t);
        this.ui.updateEnvironmentLabel(this.atmosphere.getPhaseLabel().en, this.atmosphere.weather);
      },
      onPrimaryAction: () => this.triggerPrimaryAction(),
      onSecondaryAction: () => this.triggerSecondaryAction(),
      onCastFireball: () => this.castFireballSpell(),
      onConsumeFood: () => this.consumeFoodItem(),
      onInteract: () => this.triggerInteract(),
      onReturnToIsland: () => this.onExitToOriginalIsland(),
      onToast,
    });

    this.wireCallbacks();
    this.loadSavedState();
  }

  private wireCallbacks(): void {
    this.progress.onLevelUp = (lvl) => {
      this.sound.playLevelUp();
      this.ui.showToast(`⭐ LEVEL UP! You reached Level ${lvl} (+1 Skill Point)`);
      this.ui.refreshHUD();
    };
    this.progress.onQuestCompleted = (q) => {
      this.sound.playQuestCompletedFanfare();
      this.ui.showToast(`🏆 Quest Completed: ${q.titleEn} (+${q.xpReward} XP)`);
      this.ui.refreshHUD();
    };
    this.progress.onStatsChanged = () => {
      this.player.externalSpeedMultiplier = this.progress.getSpeedMultiplier();
      this.ui.refreshHUD();
    };

    this.atmosphere.onWeatherChanged = (w) => {
      this.ui.updateEnvironmentLabel(this.atmosphere.getPhaseLabel().en, w);
    };
    this.atmosphere.onThunder = () => {
      this.sound.playThunder();
    };

    this.entities.onPlayerDamaged = (amount) => {
      if (this.player.isDodging || this.progress.hp <= 0) return;
      const armor = this.progress.getArmorStats();
      const shieldMult = this.shieldActiveTimer > 0 ? 0.45 : 1.0;
      const blockMult = this.player.isBlocking ? 0.3 : 1.0;
      const actualDmg = Math.max(1, Math.round(amount * (1 - armor.defense) * shieldMult * blockMult));
      this.progress.hp = Math.max(0, this.progress.hp - actualDmg);
      if (this.player.isBlocking) {
        this.sound.playSwordBlock(true);
        this.weaponSystem?.spawnImpactSparks(
          this.player.position.clone().setY(this.player.position.y + 1.25),
          0x38bdf8,
          10
        );
      } else {
        this.sound.playPlayerHurt();
      }
      this.onPlayerHurt?.();
      this.ui.refreshHUD();

      if (this.progress.hp <= 0) {
        this.sound.playPlayerDeath();
        this.progress.recomputeVitals(true);
        const ry = this.terrain.getMeshHeightAt(DarkRealmTerrain.SPAWN_POS.x, DarkRealmTerrain.SPAWN_POS.z);
        this.player.position.set(DarkRealmTerrain.SPAWN_POS.x, ry, DarkRealmTerrain.SPAWN_POS.z);
        this.player.velocity.set(0, 0, 0);
        this.entities.resetCompanionsNearPlayer(this.player.position);
        this.sound.playPlayerRespawn();
        this.ui.showToast('🌑 Revived at Moonlit Overlook · تمت استعادة طاقتك');
        this.ui.refreshHUD();
      }
    };

    this.entities.onMonsterKilled = (type, _pos, byCompanion) => {
      this.sound.playEnemyDeath();
      const xpByType: Record<string, number> = {
        SKELETON_ARCHER: 32,
        ZOMBIE: 36,
        GIANT_SPIDER: 40,
        MOSS_CREEPER: 38,
        STONE_GOLEM: 150,
        SHADOW_DRAGON: 280,
        DARK_BOSS: 1200,
      };
      this.progress.addXp(xpByType[type] || 30);
      this.progress.recordProgress('slay_total', 1);

      if (type === 'SKELETON_ARCHER') this.progress.recordProgress('slay_skeleton', 1);
      else if (type === 'ZOMBIE') this.progress.recordProgress('slay_zombie', 1);
      else if (type === 'GIANT_SPIDER') this.progress.recordProgress('slay_spider', 1);
      else if (type === 'MOSS_CREEPER') this.progress.recordProgress('slay_creeper', 1);
      else if (type === 'STONE_GOLEM') this.progress.recordProgress('slay_golem', 1);
      else if (type === 'SHADOW_DRAGON') this.progress.recordProgress('slay_dragon', 1);
      else if (type === 'DARK_BOSS') {
        this.progress.recordProgress('defeat_dark_boss', 1);
        this.sound.playQuestCompletedFanfare();
        this.ui.toggleModal('victory');
      }

      if (byCompanion) {
        this.ui.showToast(`⚔️ ${byCompanion} defeated a ${type.replace('_', ' ')}!`);
      }
    };

    this.entities.onCompanionGathered = (nameAr, kind, amt) => {
      this.progress.inventory[kind] += amt;
      if (kind === 'wood') this.progress.recordProgress('gather_wood', amt);
      else if (kind === 'stone') this.progress.recordProgress('gather_stone', amt);
      else if (kind === 'iron') this.progress.recordProgress('gather_iron', amt);
      else if (kind === 'food') this.progress.recordProgress('gather_food', amt);
      this.ui.showToast(`🌿 جمع ${nameAr} +${amt} ${kind}`);
      this.ui.refreshHUD();
    };

    this.entities.onCompanionHealedPlayer = (nameAr, healHp) => {
      this.progress.hp = Math.min(this.progress.maxHp, this.progress.hp + healHp);
      this.sound.playHearthRest();
      this.ui.showToast(`💜 عالجتك ${nameAr} (+${healHp} HP)`);
      this.ui.refreshHUD();
    };

    this.entities.onProjectileFired = (fromPlayer, isMagic) => {
      if (!fromPlayer) return;
      if (isMagic) this.sound.playMagicBolt();
      else this.sound.playBowShoot();
    };

    this.entities.onMonsterDamaged = (spawn, _dmg, died) => {
      this.onMonsterDamaged?.(spawn.id, spawn.hp, spawn.maxHp, !died, {
        x: spawn.pos.x,
        y: spawn.pos.y,
        z: spawn.pos.z,
      });
    };
  }

  public activate(): void {
    this.isActive = true;
    this.group.visible = true;
    this.savedOriginalFog = this.scene.fog;
    this.scene.fog = this.atmosphere.fog;
    this.atmosphere.setScene(this.scene);

    const sy = this.terrain.getMeshHeightAt(DarkRealmTerrain.SPAWN_POS.x, DarkRealmTerrain.SPAWN_POS.z);
    this.terrain.playerCurrentY = sy;
    this.player.position.set(DarkRealmTerrain.SPAWN_POS.x, sy, DarkRealmTerrain.SPAWN_POS.z);
    this.player.velocity.set(0, 0, 0);
    this.player.isGrounded = true;
    this.player.isSwimming = false;
    this.player.isDead = false;
    this.player.isDodging = false;
    this.player.isAttacking = false;
    this.player.customWaterY = (x, z) => this.terrain.getWaterLevelAt(x, z);
    this.player.externalSpeedMultiplier = this.progress.getSpeedMultiplier();
    this.lastPlayerPos.copy(this.player.position);
    this.isReturningPortalReady = false;
    this.lastClosestChestId = null;
    this.actionCooldown = 0;

    // Orient camera North (-Z) overlooking the dark river valley, moon & Giant Dark Castle!
    this.cameraSystem.isCinematic = false;
    this.cameraSystem.yaw = 0;
    this.cameraSystem.pitch = 0.24;

    this.entities.attachSharedCompanions();
    this.entities.resetCompanionsNearPlayer(this.player.position);
    this.syncEquippedToolVisual();

    this.ui.closeModals();
    this.ui.setVisible(false);
    this.ui.updateEnvironmentLabel(this.atmosphere.getPhaseLabel().en, this.atmosphere.weather);
    this.ui.updateCompanionModeLabel(this.entities.companionMode);
    this.ui.refreshHUD();
  }

  public deactivate(): void {
    this.isActive = false;
    this.group.visible = false;
    this.scene.fog = this.savedOriginalFog;
    if (this.scene.background && (this.scene.background as THREE.Color).setHex) {
      (this.scene.background as THREE.Color).setHex(0x0e1c2b);
    } else {
      this.scene.background = new THREE.Color(0x0e1c2b);
    }
    this.player.customWaterY = null;
    this.player.externalSpeedMultiplier = 1.0;
    this.resetMiningState();
    this.player.setDarkRealmToolVisual(this.weaponSystem?.activeWeapon ?? 'sword', 0x00f5d4);
    this.entities.resetCompanionTransforms();
    this.ui.setVisible(false);
    this.saveState();
  }

  public selectHotbarSlot(idx: number): void {
    this.progress.activeSlotIndex = idx;
    if (idx === 4) {
      this.progress.activeBlockKind = 'wood_plank';
      this.progress.buildMode = true;
    } else if (idx === 5) {
      this.progress.activeBlockKind = 'cobblestone';
      this.progress.buildMode = true;
    } else if (idx === 6) {
      this.progress.buildMode = false;
      this.consumeFoodItem();
    } else {
      this.progress.buildMode = false;
      if (idx === 0) {
        this.weaponSystem?.setWeapon('sword', false);
      } else if (idx === 3) {
        this.weaponSystem?.setWeapon('bow', false);
      }
    }
    this.syncEquippedToolVisual();
    this.ui.refreshHUD();
  }

  public selectBlockKind(kind: VoxelBlockKind): void {
    this.progress.activeBlockKind = kind;
    this.progress.buildMode = true;
    this.progress.activeSlotIndex = 7;
    this.syncEquippedToolVisual();
    this.ui.refreshHUD();
    this.ui.showToast(`🧱 Selected Block: ${VOXEL_LABELS[kind].en}`);
  }

  public toggleBuildMode(): void {
    this.progress.buildMode = !this.progress.buildMode;
    this.syncEquippedToolVisual();
    this.ui.refreshHUD();
    this.ui.showToast(
      this.progress.buildMode
        ? '🔨 Build Mode ON (Left Click: Place · Right Click: Break)'
        : '⚔️ Combat Mode Active'
    );
  }

  public rotateActiveBlock(): number {
    this.buildRotation = (this.buildRotation + 1) % 4;
    this.sound.playBlockRotate();
    this.ui.showToast(`🔄 Block Rotation: ${this.buildRotation * 90}°`);
    return this.buildRotation;
  }

  public syncEquippedToolVisual(): void {
    if (this.progress.buildMode) {
      this.player.setDarkRealmToolVisual('block');
      this.player.setHeldBlockAppearance(VOXEL_COLORS[this.progress.activeBlockKind] ?? 0x9c6644);
    } else {
      this.resetMiningState();
      const slot = this.progress.activeSlotIndex;
      const tool: 'sword' | 'pickaxe' | 'axe' | 'bow' | 'pistol' =
        slot === 1
          ? 'axe'
          : slot === 2
            ? 'pickaxe'
            : this.weaponSystem?.activeWeapon ?? 'sword';
      this.player.setDarkRealmToolVisual(tool, 0x00f5d4);
    }
  }

  private handleCraft(recipe: CraftRecipe): void {
    if (!this.progress.craft(recipe)) {
      this.ui.showToast('❌ Not enough materials');
      return;
    }
    this.sound.playCrystalResonance();
    this.syncEquippedToolVisual();
    this.ui.refreshHUD();
    this.ui.showToast(`✨ Crafted: ${recipe.nameEn}`);
    this.saveState();
    this.onSharedProgressChanged?.();
  }

  private handleUpgradeStat(stat: keyof DarkRealmProgress['statRanks']): void {
    if (this.progress.upgradeSkill(stat)) {
      this.sound.playLevelUp();
      this.ui.refreshHUD();
      this.saveState();
      this.onSharedProgressChanged?.();
    }
  }

  private handleQuickBuildCabin(): void {
    this.cameraSystem.camera.getWorldDirection(this.aimForward);
    this.aimForward.y = 0;
    this.aimForward.normalize();
    const buildOrigin = this.player.position.clone().addScaledVector(this.aimForward, 6.2);
    const placedList: PlacedVoxel[] = [];
    const placed = this.voxelBuilder.buildStarterHouseBlueprint(
      buildOrigin,
      (x, z) => this.terrain.getMeshHeightAt(x, z),
      placedList
    );
    if (placed > 0) {
      this.sound.playBlockPlace();
      this.progress.recordProgress('blocks_placed', placed);
      this.progress.recordProgress('houses_built', 1);
      this.ui.showToast(`🏠 Built a 5×5 Dark Fantasy Cabin (${placed} blocks)!`);
      this.saveState();
      this.onVoxelChanged?.('PLACE', placedList);
      this.onSharedProgressChanged?.();
    }
  }

  private consumeFoodItem(): void {
    if (this.progress.consumeFood()) {
      this.sound.playHearthRest();
      this.ui.showToast('🍖 Ate Rations (+HP, +Mana & Hunger Restored)');
    } else {
      this.ui.showToast('❌ No food or potions left! Gather berries or defeat monsters.');
    }
  }

  private fastTravelTo(lm: DarkLandmarkZone): void {
    this.player.position.copy(lm.fastTravelPos);
    this.player.velocity.set(0, 0, 0);
    this.entities.resetCompanionsNearPlayer(this.player.position);
    this.sound.playPortalActivation();
    this.ui.showToast(`⚡ Fast Traveled to ${lm.nameEn}`);
  }

  public triggerPrimaryAction(): void {
    if (this.actionCooldown > 0) return;

    if (this.progress.buildMode) {
      this.actionCooldown = 0.16;
      this.cameraSystem.camera.getWorldDirection(this.aimForward);
      this.voxelBuilder.updatePreview(
        true,
        this.player.position,
        this.aimForward,
        (x, z) => this.terrain.getMeshHeightAt(x, z),
        this.cameraSystem.camera.position,
        this.buildRotation
      );
      const g = this.voxelBuilder.getPreviewGrid();
      if (!g.valid) {
        this.ui.showToast('⚠️ Aim at ground or block face (step back if inside preview)');
        return;
      }
      const kind = this.progress.activeBlockKind;
      const invKey = this.progress.getBlockInventoryKey(kind);
      if (this.progress.inventory[invKey] <= 0) {
        this.ui.showToast(`❌ Out of ${VOXEL_LABELS[kind].en}! Craft more in [I].`);
        return;
      }
      if (this.voxelBuilder.placeBlockAtGrid(g.gx, g.gy, g.gz, kind, g.rot, g.yBase)) {
        this.progress.inventory[invKey] -= 1;
        this.player.triggerBuildPlaceAnimation();
        this.voxelBuilder.spawnPlacePopAnimation(g.gx, g.gy, g.gz, kind, g.yBase, g.rot);
        this.sound.playBlockPlace(kind);
        this.progress.recordProgress('blocks_placed', 1);
        this.ui.refreshHUD();
        this.saveState();
        this.onVoxelChanged?.('PLACE', [
          { gx: g.gx, gy: g.gy, gz: g.gz, kind, rot: g.rot, yBase: g.yBase },
        ]);
        this.onSharedProgressChanged?.();
      }
      return;
    }

    const slot = this.progress.activeSlotIndex;
    const wStats = this.progress.getWeaponStats();

    if (
      this.weaponSystem &&
      slot !== 1 &&
      slot !== 2 &&
      (this.weaponSystem.activeWeapon === 'pistol' || this.weaponSystem.activeWeapon === 'bow')
    ) {
      // WeaponSystem handles Pistol firing & Bow draw/release natively in Game.ts update loop
      return;
    }

    if (slot === 3) {
      // Fallback bow shot when WeaponSystem is not mounted
      this.actionCooldown = 0.36;
      this.cameraSystem.camera.getWorldDirection(this.aimForward);
      this.tmpCastOrigin.set(this.player.position.x, this.player.position.y + 1.35, this.player.position.z);
      let dmg = Math.round(wStats.damage * 0.95);
      if (this.progress.inventory.arrows > 0) {
        this.progress.inventory.arrows -= 1;
      } else {
        dmg = Math.round(dmg * 0.55);
      }
      this.entities.spawnProjectile(this.tmpCastOrigin, this.aimForward, 42, dmg, true, 0x4ade80);
      this.sound.playBowRelease(1.0);
      this.player.triggerRangedAction('bow', 1.0);
      this.onCombatAction?.('ATTACK');
      this.ui.refreshHUD();
      return;
    }

    if (slot === 1 || slot === 2) {
      // Axe (1) / Pickaxe (2) Harvest OR attack fallback
      this.actionCooldown = 0.34;
      this.player.triggerAttackAnimation();
      this.onCombatAction?.('ATTACK');
      const nodeHit = this.landmarks.damageNearestNode(this.player.position, 28);
      if (nodeHit) {
        this.onNodeDamaged?.(nodeHit.nodeId, nodeHit.hp, nodeHit.destroyed);
        if (slot === 1) this.sound.playWoodChop();
        else this.sound.playPickaxeHit();

        if (nodeHit.destroyed) {
          const bonus = 2 + Math.floor(Math.random() * 2);
          this.progress.inventory[nodeHit.kind] += bonus;
          if (nodeHit.kind === 'wood') {
            this.progress.inventory.woodPlanks += 2;
            this.progress.recordProgress('gather_wood', bonus);
          } else if (nodeHit.kind === 'stone') {
            this.progress.inventory.cobbleBlocks += 2;
            this.progress.recordProgress('gather_stone', bonus);
          } else if (nodeHit.kind === 'iron') {
            this.progress.recordProgress('gather_iron', bonus);
          } else if (nodeHit.kind === 'crystal') {
            this.progress.recordProgress('gather_crystal', bonus);
          } else if (nodeHit.kind === 'food') {
            this.progress.recordProgress('gather_food', bonus);
          }
          this.ui.showToast(`⛏️ Harvested +${bonus} ${nodeHit.kind}!`);
          this.onSharedProgressChanged?.();
        }
        this.ui.refreshHUD();
        return;
      }
    }

    // Melee Sword Slash (also checks harvestable nearby if player hits no monster)
    this.actionCooldown = 0.32;
    this.player.triggerAttackAnimation();
    this.onCombatAction?.('ATTACK');
    this.sound.playAttackSwing(0);
    const hits = this.entities.damageEnemiesInArc(
      this.player.position,
      this.player.currentFacingAngle,
      4.4,
      wStats.damage
    );
    if (hits > 0) {
      this.sound.playSwordImpact(true, 0);
    } else if (slot === 0) {
      // Allow chopping/mining lightly even with sword for effortless playability
      const res = this.landmarks.damageNearestNode(this.player.position, 16);
      if (res) {
        this.onNodeDamaged?.(res.nodeId, res.hp, res.destroyed);
        this.sound.playWoodChop();
        if (res.destroyed) {
          this.progress.inventory[res.kind] += 2;
          if (res.kind === 'wood') this.progress.recordProgress('gather_wood', 2);
          if (res.kind === 'stone') this.progress.recordProgress('gather_stone', 2);
          if (res.kind === 'crystal') this.progress.recordProgress('gather_crystal', 2);
          if (res.kind === 'food') this.progress.recordProgress('gather_food', 2);
          this.ui.showToast(`✦ Gathered +2 ${res.kind}`);
          this.onSharedProgressChanged?.();
        }
      }
    }
  }

  private resetMiningState(): void {
    this.miningTargetBlock = null;
    this.miningTargetKey = null;
    this.miningProgress = 0;
    this.miningHitTimer = 0;
    this.rightHoldElapsed = 0;
    this.wasRightMouseHeld = false;
    this.voxelBuilder.setBreakingProgress(null, 0);
    this.player.setBreakingBlockAnimation(false);
  }

  private breakTargetedBlock(target: PlacedVoxel | null): boolean {
    if (!target) return false;
    const removed = this.voxelBuilder.removeBlockAtGrid(target.gx, target.gy, target.gz);
    if (!removed) return false;
    this.player.triggerBuildBreakHitAnimation();
    this.voxelBuilder.spawnDebrisParticles(target.gx, target.gy, target.gz, removed, target.yBase, 12);
    this.sound.playBlockBreak(removed);
    const key = this.progress.getBlockInventoryKey(removed);
    this.progress.inventory[key] += 1;
    this.ui.refreshHUD();
    this.saveState();
    this.onVoxelChanged?.('REMOVE', [
      { gx: target.gx, gy: target.gy, gz: target.gz, kind: removed, rot: target.rot, yBase: target.yBase },
    ]);
    this.onSharedProgressChanged?.();
    return true;
  }

  private triggerSecondaryAction(): void {
    if (this.progress.buildMode) {
      this.cameraSystem.camera.getWorldDirection(this.aimForward);
      const target = this.voxelBuilder.findTargetedBlock(this.player.position, this.aimForward);
      this.breakTargetedBlock(target);
      return;
    }

    // Cast Echo Nova AOE Magic Spell
    this.castEchoNovaSpell();
  }

  private castEchoNovaSpell(): void {
    if (this.progress.mana < 18) {
      this.ui.showToast('💧 Not enough Mana (Need 18 MP)');
      return;
    }
    this.progress.mana -= 18;
    this.player.triggerEchoPulseAnimation();
    this.onCombatAction?.('PULSE');
    this.sound.playEchoPulse();
    const dmg = 52 + this.progress.statRanks.arcana * 8;
    const hits = this.entities.damageEnemiesInArc(this.player.position, 0, 9.5, dmg, true);
    this.progress.recordProgress('magic_casts', 1);
    this.ui.showToast(`✨ Echo Nova Blast! (${hits} hits)`);
    this.ui.refreshHUD();
    this.onSharedProgressChanged?.();
  }

  private readonly tmpCastOrigin = new THREE.Vector3();

  public castFireballSpell(): void {
    if (this.progress.mana < 12) {
      this.ui.showToast('💧 Not enough Mana (Need 12 MP)');
      return;
    }
    this.progress.mana -= 12;
    this.cameraSystem.camera.getWorldDirection(this.aimForward);
    this.tmpCastOrigin.set(this.player.position.x, this.player.position.y + 1.35, this.player.position.z);
    const dmg = 58 + this.progress.statRanks.arcana * 9;
    this.entities.spawnProjectile(this.tmpCastOrigin, this.aimForward, 36, dmg, true, 0xf97316);
    this.player.triggerEchoPulseAnimation();
    this.onCombatAction?.('PULSE');
    this.progress.recordProgress('magic_casts', 1);
    this.ui.refreshHUD();
    this.onSharedProgressChanged?.();
  }

  public triggerDodge(input: InputController): void {
    if (!this.player.isDodging) {
      this.player.triggerDodge(this.cameraSystem.getYaw(), input.moveInput.x, input.moveInput.y);
      this.sound.playDodgeRoll();
      this.onCombatAction?.('DODGE');
    }
  }

  public triggerEchoPulse(): void {
    this.castEchoNovaSpell();
  }

  public resetPlayerToSpawn(): void {
    const ry = this.terrain.getMeshHeightAt(DarkRealmTerrain.SPAWN_POS.x, DarkRealmTerrain.SPAWN_POS.z);
    this.player.position.set(DarkRealmTerrain.SPAWN_POS.x, ry, DarkRealmTerrain.SPAWN_POS.z);
    this.player.velocity.set(0, 0, 0);
    this.player.isGrounded = true;
    this.entities.resetCompanionsNearPlayer(this.player.position);
    this.ui.showToast('✦ تمت استعادة الموقع · Position reset');
  }

  public getSharedHudCombatStats(): CombatStats {
    return {
      hp: this.progress.hp,
      maxHp: this.progress.maxHp,
      energy: this.progress.mana,
      maxEnergy: this.progress.maxMana,
      isInvulnerable: this.player.isDodging,
      enemiesDefeated: this.progress.counters.slay_total,
    };
  }

  public getSharedInteractTarget(): InteractiveTarget | null {
    if (this.isReturningPortalReady) {
      return {
        id: 9001,
        type: 'portal',
        titleAr: 'بوابة العودة للجزيرة',
        titleEn: 'Return Portal',
        actionAr: 'العودة إلى الجزيرة المنسية',
        actionEn: 'Return to Forgotten Island',
        pos: this.landmarks.returnPortalPos,
        dist: this.player.position.distanceTo(this.landmarks.returnPortalPos),
        color: 0x00f5d4,
      };
    }
    if (this.lastClosestChestId) {
      const chest = this.landmarks.chests.find((c) => c.id === this.lastClosestChestId);
      if (chest && !chest.opened) {
        return {
          id: 9002,
          type: 'crystal',
          titleAr: 'صندوق الكنز السري',
          titleEn: 'Secret Treasure Chest',
          actionAr: 'فتح صندوق الكنز',
          actionEn: 'Open Treasure Chest',
          pos: chest.pos,
          dist: this.player.position.distanceTo(chest.pos),
          color: 0xfbbf24,
        };
      }
    }
    return null;
  }

  public getMinimapPayload() {
    return {
      playerX: this.player.position.x,
      playerZ: this.player.position.z,
      yaw: this.cameraSystem.getYaw(),
      landmarks: this.terrain.landmarks,
      monsters: this.entities.getMinimapMonsters(),
      companions: this.entities.companions.map((c) => ({
        pos: { x: c.pos.x, z: c.pos.z },
        name: c.nameEn,
        color: c.auraColor,
      })),
      returnPortalPos: this.landmarks.returnPortalPos,
    };
  }

  public openMapModal(): void {
    this.ui.toggleModal(
      'map',
      this.terrain.landmarks,
      this.player.position,
      this.entities.companions.map((c) => c.pos),
      this.atmosphere.weather
    );
  }

  public openQuestCodex(): void {
    this.ui.toggleModal('quests');
  }

  public cycleCompanionMode(): CompanionAIMode {
    const mode = this.entities.cycleCompanionMode();
    this.ui.updateCompanionModeLabel(mode);
    const labelMap: Record<CompanionAIMode, string> = {
      FOLLOW_FIGHT: '⚔️ Companions: Follow & Fight · متابعة وقتال',
      EXPLORE_GATHER: '🪓 Companions: Explore & Gather · استكشاف وجمع',
      GUARD: '🛡️ Companions: Guard Here · حراسة الموقع',
    };
    this.ui.showToast(labelMap[mode] || `✦ ${mode}`);
    return mode;
  }

  public cycleWeather(): { phaseEn: string; weather: DarkWeatherType } {
    const weather = this.atmosphere.cycleWeather();
    const phaseEn = this.atmosphere.getPhaseLabel().en;
    this.ui.updateEnvironmentLabel(phaseEn, weather);
    this.ui.showToast(`🌦️ Weather: ${weather} · ${phaseEn}`);
    return { phaseEn, weather };
  }

  public triggerInteract(): void {
    if (this.isReturningPortalReady) {
      this.sound.playPortalActivation();
      this.onExitToOriginalIsland();
      return;
    }
    if (this.lastClosestChestId) {
      const chest = this.landmarks.chests.find((c) => c.id === this.lastClosestChestId);
      if (chest && !chest.opened) {
        this.landmarks.openChest(chest);
        this.sound.playCrystalResonance();
        this.progress.inventory.gold += 3;
        this.progress.inventory.crystal += 2;
        this.progress.inventory.arrows += 10;
        this.progress.inventory.cookedFood += 3;
        this.progress.recordProgress('chests_opened', 1);
        this.progress.addXp(75);
        this.ui.showToast('🎁 Treasure Chest Opened! (+3 Gold, +2 Crystals, +10 Arrows, +3 Feast)');
        this.saveState();
        this.onChestOpened?.(chest.id);
        this.onSharedProgressChanged?.();
      }
    }
  }

  public update(dt: number, timeSec: number, input: InputController): void {
    if (!this.isActive) return;

    // 1. Handle Dark Realm Hotkeys
    if (input.pauseJustPressed) {
      if (this.ui.isAnyModalOpen()) {
        this.ui.closeModals();
        return;
      }
    }
    if (input.buildToggleJustPressed && !this.ui.isAnyModalOpen()) {
      this.toggleBuildMode();
    }
    if (input.inventoryJustPressed) {
      this.ui.toggleModal('inventory');
    }
    if (input.mapToggleJustPressed) {
      this.ui.toggleModal(
        'map',
        this.terrain.landmarks,
        this.player.position,
        this.entities.companions.map((c) => c.pos),
        this.atmosphere.weather
      );
    }
    if (input.codexJustPressed) {
      this.ui.toggleModal('quests');
    }
    if (input.hotbarSlotPressed !== null && !this.ui.isAnyModalOpen()) {
      this.selectHotbarSlot(input.hotbarSlotPressed);
    }

    if (this.ui.isAnyModalOpen()) {
      return;
    }

    // 2. Camera rotation & zoom
    if (input.cameraDeltaX !== 0 || input.cameraDeltaY !== 0) {
      this.cameraSystem.rotate(input.cameraDeltaX, input.cameraDeltaY);
    }
    if (input.zoomDelta !== 0) {
      this.cameraSystem.zoom(input.zoomDelta);
    }

    // 3. Player Actions & Build Mode Preview/Mining
    if (this.actionCooldown > 0) this.actionCooldown -= dt;
    if (this.shieldActiveTimer > 0) this.shieldActiveTimer -= dt;

    if (this.progress.buildMode && input.rotateBlockJustPressed) {
      this.rotateActiveBlock();
    }

    // Update voxel placement preview & target block outline before click/mining checks
    this.cameraSystem.camera.getWorldDirection(this.aimForward);
    this.voxelBuilder.updatePreview(
      this.progress.buildMode,
      this.player.position,
      this.aimForward,
      (x, z) => this.terrain.getMeshHeightAt(x, z),
      this.cameraSystem.camera.position,
      this.buildRotation
    );

    if (input.jumpJustPressed && this.player.jump()) {
      this.sound.playJump();
    }
    if (input.attackJustPressed) {
      this.triggerPrimaryAction();
    }
    if (this.progress.buildMode) {
      if (input.isRightMouseHeld) {
        this.wasRightMouseHeld = true;
        this.rightHoldElapsed += dt;
        const target = this.voxelBuilder.findTargetedBlock(this.player.position, this.aimForward);
        if (target) {
          const tKey = `${target.gx},${target.gy},${target.gz}`;
          if (tKey !== this.miningTargetKey) {
            this.miningTargetKey = tKey;
            this.miningTargetBlock = target;
            this.miningProgress = 0;
            this.miningHitTimer = 0;
          }
          this.miningProgress += dt / 0.42;
          this.voxelBuilder.setBreakingProgress(target, this.miningProgress);
          this.player.setBreakingBlockAnimation(true);
          this.miningHitTimer -= dt;
          if (this.miningHitTimer <= 0) {
            this.miningHitTimer = 0.13;
            this.sound.playBlockBreakHit(target.kind, Math.min(1, this.miningProgress));
            this.voxelBuilder.spawnDebrisParticles(target.gx, target.gy, target.gz, target.kind, target.yBase, 3);
          }
          if (this.miningProgress >= 1) {
            this.breakTargetedBlock(target);
            this.resetMiningState();
          }
        } else {
          this.miningTargetKey = null;
          this.miningTargetBlock = null;
          this.miningProgress = 0;
          this.voxelBuilder.setBreakingProgress(null, 0);
          this.player.setBreakingBlockAnimation(false);
        }
      } else {
        if (this.wasRightMouseHeld && this.rightHoldElapsed < 0.16 && this.miningTargetBlock) {
          this.breakTargetedBlock(this.miningTargetBlock);
        } else if (!this.wasRightMouseHeld && input.rightClickJustPressed) {
          this.triggerSecondaryAction();
        }
        if (this.wasRightMouseHeld || this.miningTargetKey !== null) {
          this.resetMiningState();
        }
      }
    } else {
      if (this.wasRightMouseHeld || this.miningTargetKey !== null) {
        this.resetMiningState();
      }
      // Outside Build Mode, Right Mouse Button is Sword Block or Pistol/Bow ADS Aim (managed by WeaponSystem)
    }
    if (
      input.pulseJustPressed &&
      !this.progress.buildMode &&
      !(input.reloadJustPressed && this.weaponSystem?.activeWeapon === 'pistol')
    ) {
      this.castEchoNovaSpell();
    }
    if (input.magicJustPressed) {
      this.castFireballSpell();
    }
    if (input.healJustPressed) {
      this.consumeFoodItem();
    }
    if (input.interactJustPressed) {
      this.triggerInteract();
    }
    if (input.dodgeJustPressed && !this.player.isDodging) {
      this.triggerDodge(input);
    }

    // 4. Player Movement & Voxel/Terrain Physics
    this.terrain.playerCurrentY = this.player.position.y;
    const strafeOnly = input.isStrafingLeft && Math.abs(input.moveInput.y) < 0.01;
    this.player.update(
      dt,
      input.moveInput,
      this.cameraSystem.getYaw(),
      input.isSprinting,
      this.terrain.getIslandTerrainAdapter(),
      this.allObstacles,
      strafeOnly
    );
    this.cameraSystem.update(
      dt,
      this.player.position,
      this.terrain.getIslandTerrainAdapter(),
      this.player.currentFacingAngle,
      this.player.isMoving
    );

    // 5. Passive Mana Regen + Exploration Distance & Biome Tracking
    this.manaRegenAccum += dt;
    if (this.manaRegenAccum >= 0.6) {
      this.manaRegenAccum = 0;
      if (this.progress.mana < this.progress.maxMana) {
        this.progress.mana = Math.min(this.progress.maxMana, this.progress.mana + 2.6);
      }
      this.progress.hunger = Math.max(10, this.progress.hunger - 0.12);
    }

    const moved = this.player.position.distanceTo(this.lastPlayerPos);
    if (moved > 0.05 && moved < 25) {
      this.distanceAccum += moved;
      if (this.distanceAccum >= 4) {
        this.progress.recordProgress('explore_distance', Math.floor(this.distanceAccum));
        this.distanceAccum -= Math.floor(this.distanceAccum);
      }
    }
    this.lastPlayerPos.copy(this.player.position);

    // Landmark discovery tracking
    for (const lm of this.terrain.landmarks) {
      if (this.progress.visitedZones.has(lm.id)) continue;
      if (this.player.position.distanceTo(lm.pos) <= lm.radius) {
        this.progress.visitedZones.add(lm.id);
        this.ui.showToast(`🗺️ Discovered: ${lm.nameEn} (${lm.nameAr})`);
        if (lm.kind === 'village') this.progress.recordProgress('visit_villages', 1);
        else if (lm.kind === 'cave') this.progress.recordProgress('enter_caves', 1);
        else if (lm.kind === 'floating') this.progress.recordProgress('visit_floating', 1);
        else if (lm.kind === 'castle') this.progress.recordProgress('visit_castle', 1);
      }
    }

    // 6. Subsystems Update
    this.terrain.update(dt);
    this.landmarks.update(dt, timeSec);
    this.atmosphere.update(dt, this.player.position, this.cameraSystem.camera.position);
    this.entities.update(
      dt,
      timeSec,
      this.player.position,
      this.cameraSystem.camera.position,
      this.progress.hp / this.progress.maxHp
    );

    // Voxel build debris & pop animations
    this.voxelBuilder.updateAnimations(dt);

    // Auto-collect monster loot crystals/essence/food
    this.entities.collectNearbyLoot(this.player.position, (kind, amt) => {
      this.sound.playShardCollect();
      if (kind === 'crystal') {
        this.progress.inventory.crystal += amt;
        this.progress.recordProgress('gather_crystal', amt);
        this.ui.showToast(`💎 Collected +${amt} Shadow Crystal`);
      } else if (kind === 'essence') {
        this.progress.inventory.essence += amt;
        this.ui.showToast(`🌑 Collected +${amt} Shadow Essence`);
      } else if (kind === 'arrows') {
        this.progress.inventory.arrows += amt;
        this.ui.showToast(`🏹 Collected +${amt} Arrows`);
      } else {
        this.progress.inventory.food += amt;
        this.progress.recordProgress('gather_food', amt);
      }
      this.ui.refreshHUD();
      this.onSharedProgressChanged?.();
    });

    // Proximity prompts (Return Portal or Secret Chests)
    const dPortal = this.player.position.distanceTo(this.landmarks.returnPortalPos);
    const closestChest = this.landmarks.findClosestChest(this.player.position, 3.6);
    if (dPortal < 4.5) {
      this.isReturningPortalReady = true;
      this.lastClosestChestId = null;
      this.ui.setInteractPrompt('Return to Forgotten Island · العودة للجزيرة');
    } else if (closestChest) {
      this.isReturningPortalReady = false;
      this.lastClosestChestId = closestChest.id;
      this.ui.setInteractPrompt('Open Secret Treasure Chest · فتح الصندوق');
    } else {
      this.isReturningPortalReady = false;
      this.lastClosestChestId = null;
      this.ui.setInteractPrompt(null);
    }

    // 7. Throttled HUD & Minimap updates (~15 Hz)
    this.minimapAccum += dt;
    if (this.minimapAccum >= 0.066) {
      this.minimapAccum = 0;
      this.ui.renderMinimap(
        this.player.position.x,
        this.player.position.z,
        this.cameraSystem.getYaw(),
        this.terrain.landmarks,
        this.entities.getMinimapMonsters(),
        this.entities.companions.map((c) => c.pos)
      );
      this.ui.setBossBar(this.entities.getActiveBossHudInfo(this.player.position));
      this.ui.updateEnvironmentLabel(this.atmosphere.getPhaseLabel().en, this.atmosphere.weather);
      if (this.ui.isAnyModalOpen()) {
        this.ui.refreshHUD();
      }
    }

    // Periodic save every 12 seconds
    this.saveAccum += dt;
    if (this.saveAccum >= 12) {
      this.saveAccum = 0;
      this.saveState();
    }
  }

  public saveState(): void {
    try {
      const data = {
        progress: this.progress.serialize(),
        voxels: this.voxelBuilder.serialize(),
        openedChests: this.landmarks.chests.filter((c) => c.opened).map((c) => c.id),
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota warnings
    }
  }

  public loadSavedState(): void {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.progress) this.progress.deserialize(data.progress);
      if (data.voxels) this.voxelBuilder.deserialize(data.voxels);
      if (Array.isArray(data.openedChests)) {
        for (const id of data.openedChests) {
          const ch = this.landmarks.chests.find((c) => c.id === id);
          if (ch) this.landmarks.openChest(ch);
        }
      }
    } catch {
      // Ignore corrupted save
    }
  }

  public dispose(): void {
    this.saveState();
    this.ui.dispose();
    this.voxelBuilder.dispose();
    this.atmosphere.dispose();
    this.entities.dispose();
  }
}
