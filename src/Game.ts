/**
 * ECHO – THE WORLD REMEMBERS
 * Central Game Engine & Orchestrator
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { SoundSynth } from './audio/SoundSynth.ts';
import { Terrain } from './world/Terrain.ts';
import { BioluminescentLake } from './world/BioluminescentLake.ts';
import { Forest, WorldObstacle } from './world/Forest.ts';
import { AncientTemple } from './world/AncientTemple.ts';
import { GreatPortal } from './world/GreatPortal.ts';
import { EchoCrystals, CrystalData } from './world/EchoCrystals.ts';
import { Atmosphere } from './world/Atmosphere.ts';
import { WorldInteractions, InteractiveTarget, AncientInscription } from './world/WorldInteractions.ts';
import { EchoMemorySystem } from './world/EchoMemorySystem.ts';
import { VillageHouses } from './world/VillageHouses.ts';
import { QuestSystem } from './story/QuestSystem.ts';
import { NPCManager, InteractiveNPCInfo } from './npc/NPCManager.ts';
import { QuestCompanionsManager, CompanionContext } from './npc/QuestCompanions.ts';

import { Character } from './player/Character.ts';
import { ThirdPersonCamera } from './player/ThirdPersonCamera.ts';
import { InputController, detectMobileOrTablet } from './player/InputController.ts';
import { GameUI } from './ui/GameUI.ts';
import { CombatSystem } from './combat/CombatSystem.ts';
import { WeaponSystem, WeaponType } from './combat/WeaponSystem.ts';
import { MultiplayerCoordinator } from './multiplayer/MultiplayerCoordinator.ts';
import {
  PlacedVoxelData,
  RealmId,
  RoomWorldSnapshot,
  ServerPacket,
} from './multiplayer/types.ts';
import { PerformanceManager, QualityPreset } from './world/PerformanceManager.ts';
import { WorldLightPool } from './world/WorldLightPool.ts';
import { DarkRealmManager } from './darkrealm/DarkRealmManager.ts';
import { createDarkRealmTextures, DarkTextureSet } from './darkrealm/DarkRealmTextures.ts';
import { DarkRealmProgress, VoxelBlockKind, CraftRecipe } from './darkrealm/DarkRealmProgress.ts';
import { VoxelBuilder, VOXEL_COLORS, PlacedVoxel } from './darkrealm/VoxelBuilder.ts';

export enum GameState {
  TITLE,
  PLAYING,
  PAUSED,
}

export class Game {
  public scene: THREE.Scene;
  public renderer: THREE.WebGLRenderer;
  public cameraSystem: ThirdPersonCamera;
  public sound: SoundSynth;
  public input: InputController;
  public ui: GameUI;
  public combatSystem: CombatSystem;
  public multiplayer: MultiplayerCoordinator;
  public performanceManager: PerformanceManager;

  // World subsystems
  public worldLightPool: WorldLightPool;
  public terrain: Terrain;
  public lake: BioluminescentLake;
  public forest: Forest;
  public temple: AncientTemple;
  public portal: GreatPortal;
  public crystals: EchoCrystals;
  public worldInteractions: WorldInteractions;
  public memorySystem: EchoMemorySystem;
  public villageHouses: VillageHouses;
  public atmosphere: Atmosphere;
  public player: Character;
  public questSystem: QuestSystem;
  public npcManager: NPCManager;
  public companions: QuestCompanionsManager;
  public darkRealm: DarkRealmManager | null = null;
  public isInDarkRealm: boolean = false;
  public sharedProgress!: DarkRealmProgress;
  private world1Textures!: DarkTextureSet;
  private world1VoxelBuilder!: VoxelBuilder;
  private world1BuildRot: number = 0;
  private w1MiningTargetBlock: PlacedVoxel | null = null;
  private w1MiningTargetKey: string | null = null;
  private w1MiningProgress: number = 0;
  private w1MiningHitTimer: number = 0;
  private w1RightHoldElapsed: number = 0;
  private w1WasRightHeld: boolean = false;
  private readonly aimForward = new THREE.Vector3();
  public isMobileDevice: boolean = false;
  public weaponSystem!: WeaponSystem;
  private touchAttackHeld: boolean = false;
  private bubblePoints!: THREE.Points;
  private bubblePositions!: Float32Array;
  private bubbleSpeeds!: Float32Array;
  private readonly bubbleCount = 90;
  private wasCameraUnderwater: boolean = false;
  private readonly underwaterColor = new THREE.Color(0x042b3c);
  private readonly underwaterDarkColor = new THREE.Color(0x0a1c2e);
  private readonly savedDaySkyColor = new THREE.Color(0x0e1c2b);
  private savedPreUnderwaterFogDensity: number = 0.0011;
  private readonly tmpShotOrigin = new THREE.Vector3();
  private readonly tmpShotDir = new THREE.Vector3();
  private readonly tmpKnockbackDir = new THREE.Vector3();

  // Collision obstacles aggregate
  private allObstacles: WorldObstacle[] = [];

  // State
  private state: GameState = GameState.TITLE;
  private lastTime: number = 0;
  private activeInteractiveTarget: InteractiveTarget | null = null;
  private activeCompanionDialogueId: string | null = null;
  private companionContext!: CompanionContext;
  private hasTriggeredVictory: boolean = false;
  private lastSprintState: boolean = false;
  private lastWasSwimming: boolean = false;
  private lastCameraIsFirstPerson: boolean = false;
  private isContextLost: boolean = false;
  private splashRemoved: boolean = false;
  private lastMinimapRenderMs: number = -999;
  private lastModalRenderMs: number = -999;
  private lastTitleRenderMs: number = -999;
  private lastRenderDurationMs: number = 16;
  private needsModalBackdropRender: boolean = false;
  private enemyBlipsBuffer: { pos: { x: number; z: number } }[] = [];
  private allyBlipsBuffer: { pos: { x: number; z: number }; name?: string; color?: number }[] = [];
  private prologueTimerId: number | null = null;
  private victoryTimerId: number | null = null;

  constructor(private container: HTMLElement) {
    this.performanceManager = new PerformanceManager();
    const settings = this.performanceManager.getSettings();

    // 1. Three.js Renderer setup with mobile GPU awareness and quality scaling
    const isMobileDevice = detectMobileOrTablet();
    this.isMobileDevice = isMobileDevice;
    this.renderer = new THREE.WebGLRenderer({
      antialias: settings.preset === 'ultra' && !isMobileDevice, // MSAA only on Ultra on desktop
      powerPreference: 'high-performance',
      alpha: false,
      precision: isMobileDevice ? 'mediump' : 'highp',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const safeDpr = Math.max(0.75, Math.min(window.devicePixelRatio * settings.dprMultiplier, settings.maxDpr));
    this.renderer.setPixelRatio(safeDpr);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = settings.shadowsEnabled;
    this.renderer.shadowMap.type = settings.shadowMapType;

    this.renderer.domElement.id = 'echo-webgl-canvas';
    this.renderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.isContextLost = true;
    });
    this.renderer.domElement.addEventListener('webglcontextrestored', () => {
      this.isContextLost = false;
      this.applyQualityLevel(this.performanceManager.getPreset());
    });
    this.container.appendChild(this.renderer.domElement);

    // 2. Scene, Pooled Lights & Environment
    this.scene = new THREE.Scene();
    this.worldLightPool = new WorldLightPool(this.scene);

    if (settings.preset !== 'low') {
      try {
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
        pmremGenerator.dispose();
      } catch (e) {
        console.warn('RoomEnvironment fallback:', e);
      }
    }

    // 4. Subsystems initialization
    this.sound = new SoundSynth();
    this.cameraSystem = new ThirdPersonCamera(55, window.innerWidth / window.innerHeight);
    this.cameraSystem.camera.far = settings.farPlane;
    this.cameraSystem.camera.updateProjectionMatrix();
    this.scene.add(this.cameraSystem.camera);

    // World entities
    this.atmosphere = new Atmosphere(this.scene, isMobileDevice);
    this.scene.add(this.atmosphere.group);

    this.terrain = new Terrain(isMobileDevice);
    this.scene.add(this.terrain.group);

    this.lake = new BioluminescentLake();
    this.scene.add(this.lake.group);

    this.temple = new AncientTemple(this.terrain);
    this.scene.add(this.temple.group);

    this.portal = new GreatPortal(this.terrain);
    this.scene.add(this.portal.group);

    // Expose Portal & Temple platform/staircase floor heights before spawning roads, crystals, and interactions
    this.terrain.floorHeightProvider = (x, z) =>
      this.portal.getFloorHeightAt(x, z) ?? this.temple.getFloorHeightAt(x, z);

    this.forest = new Forest(this.terrain);
    this.scene.add(this.forest.group);

    this.crystals = new EchoCrystals(this.terrain);
    this.scene.add(this.crystals.group);

    this.worldInteractions = new WorldInteractions(this.terrain);
    this.scene.add(this.worldInteractions.group);

    this.memorySystem = new EchoMemorySystem(this.terrain);
    this.scene.add(this.memorySystem.group);

    // Procedural Village Houses, Cottages & Street Network
    this.villageHouses = new VillageHouses(this.terrain);
    this.scene.add(this.villageHouses.group);

    // Shared Inventory, Crafting & Minecraft-Style House Building (World 1 & World 2)
    this.sharedProgress = new DarkRealmProgress();
    this.world1Textures = createDarkRealmTextures();
    this.world1VoxelBuilder = new VoxelBuilder(this.world1Textures);
    this.scene.add(this.world1VoxelBuilder.group);
    this.loadSharedBuilding();

    // Compose Portal, Temple, Village House interiors, Coastal Pier, and Built Houses into unified floorHeightProvider
    this.terrain.floorHeightProvider = (x, z) =>
      this.portal.getFloorHeightAt(x, z) ??
      this.temple.getFloorHeightAt(x, z) ??
      this.villageHouses.getFloorHeightAt(x, z) ??
      this.forest.getFloorHeightAt(x, z) ??
      this.world1VoxelBuilder.getBlockingWallHeightAt(x, z, this.player ? this.player.position.y : 0) ??
      this.world1VoxelBuilder.getFloorHeightAt(x, z, this.player ? this.player.position.y : 0);

    // Gather collision obstacles
    this.allObstacles = [
      ...this.forest.obstacles,
      ...this.temple.obstacles,
      ...this.portal.obstacles,
      ...this.worldInteractions.obstacles,
      ...this.villageHouses.obstacles,
    ];

    // Player character spawned at southern shoreline
    const spawnX = Terrain.SPAWN_POS.x;
    const spawnZ = Terrain.SPAWN_POS.z;
    const spawnY = this.terrain.getHeightAt(spawnX, spawnZ);
    this.player = new Character(new THREE.Vector3(spawnX, spawnY, spawnZ));
    this.scene.add(this.player.group);
    this.weaponSystem = new WeaponSystem(this.scene, this.player, this.cameraSystem, this.sound);
    this.initUnderwaterBubbles();

    // Initialize Quest & Story System
    this.questSystem = new QuestSystem();
    this.questSystem.onObjectiveUpdated = (quest, obj) => {
      this.ui.updateQuestTracker(quest, obj);
    };
    this.questSystem.onObjectiveCompleted = (quest, obj, nextObj) => {
      this.sound.playQuestObjectiveComplete();
      this.ui.showObjectiveCompleteBanner(obj, nextObj);
      this.ui.updateQuestTracker(quest, nextObj);
      this.saveGame();
    };
    this.questSystem.onQuestCompleted = (quest, nextQuest) => {
      this.sound.playQuestCompletedFanfare();
      this.ui.updateQuestTracker(nextQuest || quest, nextQuest ? nextQuest.objectives[0] : null);
      this.ui.showToast('🎉 اكتملت مهمة الذاكرة الأولى بنجاح! · The First Memory Awakened');
      this.saveGame();
    };
    this.questSystem.onStoryNarrativeTriggered = () => {
      // Unnecessary popup notifications disabled per design request
    };

    // Initialize NPC & Creature World Manager
    this.npcManager = new NPCManager(this.terrain, this.sound, this.questSystem, this.memorySystem);
    this.scene.add(this.npcManager.group);

    // Initialize Dynamic Combat System (Player attacks, dodges, Echo Pulse & Wood Wraith AI)
    this.combatSystem = new CombatSystem(this.terrain, this.player, this.sound);
    this.scene.add(this.combatSystem.group);

    this.combatSystem.onPlayerDamaged = () => {
      this.ui.showHurtEffect();
      this.syncMinecraftHud();
    };

    this.combatSystem.onPlayerDied = () => {
      this.ui.openDeathModal(() => {
        this.resetPlayerPosition();
        this.combatSystem.respawnPlayer(this.player.position);
        this.syncMinecraftHud();
        this.ui.closeDeathModal();
        this.ui.showToast('✦ استعدت عافيتك من طاقة الجزيرة · Restored by Island Light');
      });
    };

    this.combatSystem.onStatsChanged = () => {
      this.syncMinecraftHud();
    };

    this.combatSystem.onEnemyDamaged = (enemy, _damage, died) => {
      this.multiplayer.broadcastEnemyDamage(
        'ISLAND',
        enemy.id,
        enemy.hp,
        enemy.maxHp,
        died,
        {
          x: enemy.group.position.x,
          y: enemy.group.position.y,
          z: enemy.group.position.z,
        }
      );
    };
    this.combatSystem.onMeleeHitConfirm = (died) => {
      this.ui.triggerHitmarker(died);
    };

    this.combatSystem.onLootCollected = (dropPos: THREE.Vector3) => {
      this.worldInteractions.spawnCollectionBurst(dropPos, 0x00f5d4);

      if (this.worldInteractions.getCollectedShardsCount() < 10) {
        const uncollectedShard = this.worldInteractions.shards.find((s) => !s.collected);
        if (uncollectedShard) {
          const collectedShard = this.worldInteractions.collectShard(uncollectedShard.id);
          if (collectedShard) {
            const shardCount = this.worldInteractions.getCollectedShardsCount();
            this.ui.updateShardProgress(shardCount, 10);
            this.questSystem.recordShardCollected(shardCount);
            this.sharedProgress.addXp(22);
            this.syncMinecraftHud();
            this.saveGame();
            this.multiplayer.broadcastWorldProgressUpdate({
              shards: [collectedShard.id],
              questProgress: this.questSystem.serialize(),
              darkProgress: this.sharedProgress.serialize(),
            });
            this.ui.showToast(`✦ استخلصت من الطيف ${collectedShard.nameAr}! (${shardCount}/10)`);
            return;
          }
        }
      }

      this.sharedProgress.inventory.wood += 1;
      this.sharedProgress.addXp(22);
      this.syncMinecraftHud();
      this.saveSharedBuilding();
      this.broadcastSharedProgressDelta();
      this.ui.showToast('✦ استعدت +35 صحة و +40 طاقة صدى + 1 خشب!');
    };

    // Initialize Central Multiplayer & Party Coordinator (Supports isolated player data & remote peers)
    this.multiplayer = new MultiplayerCoordinator();
    this.multiplayer.init(this);
    this.player.applyProfileAppearance(this.multiplayer.account.getProfile());

    // Initialize Quest Companion Characters (Layan & Saden) who fight, scout, and complete quests with the player
    this.companions = new QuestCompanionsManager(this.terrain, this.sound);
    this.scene.add(this.companions.group);
    this.companionContext = {
      playerPos: this.player.position,
      playerFacingAngle: this.player.currentFacingAngle,
      questSystem: this.questSystem,
      crystals: this.crystals,
      worldInteractions: this.worldInteractions,
      combatSystem: this.combatSystem,
      obstacles: this.allObstacles,
      onShardCollectedByCompanion: (companionNameAr, shardNameAr, totalShards) => {
        this.ui.updateShardProgress(totalShards, 10);
        this.ui.showToast(`✦ جمعت ${companionNameAr} ${shardNameAr} معك! (${totalShards}/10)`);
        this.saveGame();
      },
      onEnemyDefeatedByCompanion: (companionNameAr) => {
        this.ui.updateCombatStats(this.combatSystem.getStats());
        this.ui.showToast(`⚔️ قضى ${companionNameAr} على طيف الفساد!`);
      },
      onGateAssistedByCompanion: (companionNameAr, isOpen) => {
        if (isOpen) {
          this.ui.showToast(`✦ فتح ${companionNameAr} بوابة المعبد الحجرية معك! · Gate Unsealed`);
        }
        this.saveGame();
      },
      onShowToast: (msg) => {
        this.ui.showToast(msg);
      },
    };

    // Inputs & UI
    this.input = new InputController(this.container, this.isMobileDevice);
    this.ui = new GameUI({
      onNewGame: () => this.startNewGame(),
      onContinueGame: () => this.continueGame(),
      onOpenSettings: () => this.ui.openSettingsModal(),
      onExitGame: () => this.exitToTitle(),
      onToggleSound: () => {
        const isMuted = this.sound.toggleMute();
        this.ui.setSoundIcon(isMuted);
      },
      onPauseToggle: () => {
        if (this.state === GameState.PLAYING) {
          this.state = GameState.PAUSED;
        } else if (this.state === GameState.PAUSED) {
          this.state = GameState.PLAYING;
        }
      },
      onSaveGame: () => this.saveGame(),
      onResetPosition: () => this.resetPlayerPosition(),
      onInteract: () => {
        if (this.isInDarkRealm && this.darkRealm) {
          if (this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused()) {
            this.darkRealm.triggerInteract();
            if (this.isInDarkRealm) {
              this.ui.updateCombatStats(this.darkRealm.getSharedHudCombatStats());
              this.ui.showTargetInteractPrompt(this.darkRealm.getSharedInteractTarget());
            }
          }
          return;
        }
        this.handleInteract();
      },
      onJump: () => {
        if (this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused() && this.player.jump()) {
          this.sound.playJump();
        }
      },
      onCombatAttack: () => {
        if (this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused()) {
          if (this.isInDarkRealm && this.darkRealm) {
            this.darkRealm.triggerPrimaryAction();
            this.syncMinecraftHud();
            this.ui.updateBuildModeBar(this.sharedProgress.buildMode, this.sharedProgress.activeBlockKind);
            this.saveSharedBuilding();
          } else {
            this.handlePrimaryActionWorld1();
          }
        }
      },
      onCombatDodge: () => {
        if (this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused()) {
          if (this.isInDarkRealm && this.darkRealm) {
            this.darkRealm.triggerDodge(this.input);
            this.syncMinecraftHud();
          } else {
            this.combatSystem.executePlayerDodge(this.input.moveInput, this.cameraSystem.getYaw());
            this.multiplayer.broadcastCombatDodge(this.input.moveInput.x, this.input.moveInput.y);
            this.syncMinecraftHud();
          }
        }
      },
      onCombatPulse: () => {
        if (this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused()) {
          if (this.isInDarkRealm && this.darkRealm) {
            this.darkRealm.triggerEchoPulse();
            this.syncMinecraftHud();
          } else {
            this.combatSystem.executeEchoPulse();
            this.multiplayer.broadcastCombatPulse();
            this.syncMinecraftHud();
          }
        }
      },
      onRespawnRequested: () => {
        this.resetPlayerPosition();
        this.combatSystem.respawnPlayer(this.player.position);
        this.syncMinecraftHud();
        this.ui.closeDeathModal();
        this.ui.showToast('✦ استعدت عافيتك من طاقة الجزيرة · Restored by Island Light');
      },
      onTouchMove: (x: number, y: number, isSprint: boolean) => {
        this.input.touchMoveInput.set(x, y);
        this.input.touchJoystickSprinting = isSprint;
      },
      onJoystickTouchState: (touchId: number | null) => {
        this.input.setJoystickTouchId(touchId);
      },
      onTouchSprintState: (isPressed: boolean) => {
        this.input.touchButtonSprinting = isPressed;
      },
      onTouchSprintToggle: () => {
        this.input.touchButtonSprinting = !this.input.touchButtonSprinting;
        return this.input.touchButtonSprinting;
      },
      onUpdateVolume: (master: number, music: number) => {
        this.sound.setMasterVolume(master);
        this.sound.setMusicVolume(music);
      },
      onUpdateCameraSens: (sens: number) => {
        this.cameraSystem.sensitivity = sens;
      },
      getMemoryProfile: () => this.memorySystem.profile,
      getQuestSystem: () => this.questSystem,
      getMultiplayerCoordinator: () => this.multiplayer,
      getCurrentQualityPreset: () => this.performanceManager.getPreset(),
      onQualityPresetChanged: (preset: QualityPreset) => this.setQualityPreset(preset),
      onEnterShadowRealm: () => this.enterDarkRealm(),
      onOpenBuildMenu: () => this.openSharedBuildModal(),
      onRotateBlock: () => this.rotateActiveBlock(),
      onBreakBlock: () => this.handleBreakBlock(),
      onExitBuildMode: () => this.setBuildMode(false),
      onSelectHotbarSlot: (slotIdx: number) => this.handleSelectHotbarSlot(slotIdx),
      onOpenDarkMap: () => this.darkRealm?.openMapModal(),
      onOpenDarkQuests: () => this.darkRealm?.openQuestCodex(),
      onCycleDarkCompanionMode: () => {
        if (!this.darkRealm) return;
        const mode = this.darkRealm.cycleCompanionMode();
        this.ui.updateDarkQuickLabels(mode, undefined);
      },
      onCycleDarkWeather: () => {
        if (!this.darkRealm) return;
        const env = this.darkRealm.cycleWeather();
        this.ui.updateDarkQuickLabels(undefined, `${env.phaseEn} · ${env.weather}`);
      },
      onCastDarkFireball: () => {
        if (this.isInDarkRealm && this.darkRealm && this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused()) {
          this.darkRealm.castFireballSpell();
          this.syncMinecraftHud();
        }
      },
      onReturnToIsland: () => this.exitDarkRealmToIsland(),
      onToggleCameraMode: () => {
        const fpp = this.cameraSystem.togglePerspective();
        this.lastCameraIsFirstPerson = fpp;
        this.player.setFirstPersonMode(fpp, this.cameraSystem.shouldHideCharacterMesh());
        this.ui.showToast(
          fpp
            ? '👁️ First-Person View · منظور الشخص الأول'
            : '🎥 Third-Person View · منظور الشخص الثالث'
        );
        return fpp;
      },
      onSelectWeapon: (weapon: WeaponType) => this.selectActiveWeapon(weapon),
      onReloadWeapon: () => {
        this.weaponSystem?.startReload();
      },
      onAttackHoldChange: (held: boolean) => {
        this.touchAttackHeld = held;
      },
      onSecondaryHoldChange: (held: boolean) => {
        this.input.setTouchRightHold(held);
      },
    });

    // Apply adaptive PC/Mobile mode & multiplayer UI bindings
    this.ui.setMobileMode(this.isMobileDevice);
    this.ui.initMultiplayerBindings();
    this.input.onCursorLockChanged = (locked: boolean) => {
      this.ui.setCursorLockedCrosshair(locked);
      if (this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused()) {
        this.ui.showToast(
          locked
            ? '🎯 Cursor Locked & Hidden (Press F1 to unlock)'
            : '🖱️ Cursor Unlocked & Visible (Press F1 to lock)'
        );
      }
    };

    // Unlock WebRTC audio playback on first user interaction (browser autoplay compliance on PC & mobile)
    const unlockVoice = () => this.multiplayer.unlockVoiceAudio();
    window.addEventListener('pointerdown', unlockVoice, { passive: true });
    window.addEventListener('touchstart', unlockVoice, { passive: true });
    window.addEventListener('keydown', unlockVoice, { passive: true });

    // Apply initial quality configuration to world subsystems
    this.applyQualityLevel(this.performanceManager.getPreset());

    // Initialize continue button badge, shard counter, and combat stats
    const saveInfo = this.checkSavedProgress();
    this.ui.setContinueBadge(saveInfo.hasSave, saveInfo.count);
    this.ui.updateShardProgress(saveInfo.shardCount, 10);
    this.ui.updateQuestTracker(this.questSystem.getActiveQuest(), this.questSystem.getActiveObjective());
    this.syncMinecraftHud();
    this.ui.updateCameraModeButton(this.cameraSystem.isFirstPerson);
    this.ui.updateWeaponHud(this.weaponSystem.getHudState(this.sharedProgress.inventory.arrows));

    // Window resize, focus loss, visibility, & orientation change handlers
    window.addEventListener('resize', () => this.onWindowResize());
    window.addEventListener('blur', () => {
      this.input.resetAllInputs();
      this.ui.resetAllTouchStates();
      this.touchAttackHeld = false;
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.input.resetAllInputs();
        this.ui.resetAllTouchStates();
        this.touchAttackHeld = false;
      } else {
        this.lastTime = performance.now();
      }
    });
    window.addEventListener('orientationchange', () => {
      this.input.resetAllInputs();
      this.ui.resetAllTouchStates();
      setTimeout(() => this.onWindowResize(), 100);
    });
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', () => {
        setTimeout(() => this.onWindowResize(), 100);
      });
    }

    // Initial check for orientation layout
    this.ui.handleOrientationOrResize();

    // Prime pooled lights and pre-compile scene shaders before first frame to avoid rotation/combat hitches
    const bootNow = performance.now();
    this.worldLightPool.update(this.cameraSystem.camera.position, this.getMaxPooledLights(), bootNow, true);
    try {
      this.renderer.compile(this.scene, this.cameraSystem.camera);
    } catch {
      // Safe fallback if driver skips pre-compile
    }

    // Start game loop
    this.lastTime = bootNow;
    requestAnimationFrame((t) => this.tick(t));
  }

  private getMaxPooledLights(): number {
    const preset = this.performanceManager.getPreset();
    if (preset === 'low') return 4;
    if (preset === 'medium') return 6;
    return 8;
  }

  private dismissBootSplash(): void {
    if (this.splashRemoved) return;
    this.splashRemoved = true;
    const splash = document.getElementById('echo-boot-splash');
    if (splash) {
      splash.style.opacity = '0';
      setTimeout(() => splash.remove(), 220);
    }
  }

  private clearPendingTimers(): void {
    if (this.prologueTimerId !== null) {
      window.clearTimeout(this.prologueTimerId);
      this.prologueTimerId = null;
    }
    if (this.victoryTimerId !== null) {
      window.clearTimeout(this.victoryTimerId);
      this.victoryTimerId = null;
    }
  }

  public startNewGame(): void {
    this.clearPendingTimers();
    this.input.resetAllInputs();
    this.ui.resetAllTouchStates();

    this.sound.init();
    this.sound.resume();
    this.sound.playUIClick();

    // Reset game world state
    this.crystals.resetAll();
    this.worldInteractions.resetAll();
    this.memorySystem.reset();
    this.questSystem.resetAll();
    this.combatSystem.resetAll();
    this.hasTriggeredVictory = false;
    this.portal.updateCrystalProgress(0);
    this.ui.updateCrystalProgress(0);
    this.ui.updateShardProgress(0, 10);
    this.ui.updateQuestTracker(this.questSystem.getActiveQuest(), this.questSystem.getActiveObjective());
    this.ui.updateCombatStats(this.combatSystem.getStats());

    // Reset player position to southern shoreline
    const spawnX = Terrain.SPAWN_POS.x;
    const spawnZ = Terrain.SPAWN_POS.z;
    const spawnY = this.terrain.getHeightAt(spawnX, spawnZ);
    this.player.position.set(spawnX, spawnY, spawnZ);
    this.player.velocity.set(0, 0, 0);
    this.player.isGrounded = true;
    this.companions.resetNearPlayer(this.player.position);

    this.state = GameState.PLAYING;
    this.multiplayer.remotePlayers.setLocalRealm('ISLAND');
    this.cameraSystem.isCinematic = false;
    this.cameraSystem.setPerspectiveMode(false);
    this.player.setFirstPersonMode(false);
    this.ui.updateCameraModeButton(false);
    this.cameraSystem.yaw = Math.PI; // Face north toward island center
    this.ui.showHUD();
    this.ui.updateBuildModeBar(this.sharedProgress.buildMode, this.sharedProgress.activeBlockKind);
    this.syncMinecraftHud();
    this.ui.updateWeaponHud(this.weaponSystem.getHudState(this.sharedProgress.inventory.arrows));
    this.multiplayer.broadcastLocalTransform();

    // Auto-save initial state
    this.saveGame();
  }

  public continueGame(): void {
    this.clearPendingTimers();
    this.input.resetAllInputs();
    this.ui.resetAllTouchStates();

    this.sound.init();
    this.sound.resume();
    this.sound.playUIClick();

    const loaded = this.loadSavedProgress();
    if (!loaded) {
      // If no valid save, fallback to new game
      this.startNewGame();
      return;
    }

    this.combatSystem.respawnPlayer(this.player.position);
    this.companions.resetNearPlayer(this.player.position);
    this.syncMinecraftHud();

    this.state = GameState.PLAYING;
    this.multiplayer.remotePlayers.setLocalRealm('ISLAND');
    this.cameraSystem.isCinematic = false;
    this.ui.showHUD();
    this.ui.showToast('تم استعادة التقدم · Progress restored');
    this.multiplayer.broadcastLocalTransform();
  }

  public exitToTitle(): void {
    this.clearPendingTimers();
    this.input.resetAllInputs();
    this.input.releasePointerLock();
    this.ui.resetAllTouchStates();

    if (this.isInDarkRealm && this.darkRealm) {
      this.darkRealm.deactivate();
      this.isInDarkRealm = false;
      this.companions.setExternalControl(false);
      this.companions.resetNearPlayer(this.player.position);
      this.setOriginalWorldVisible(true);
      this.ui.setDarkRealmActive(false);
      this.ui.updateDarkBossBar(null);
      this.ui.updateQuestTracker(this.questSystem.getActiveQuest(), this.questSystem.getActiveObjective());
      this.syncMinecraftHud();
      this.ui.showTargetInteractPrompt(null);
    }

    this.multiplayer.remotePlayers.setLocalRealm('ISLAND');
    this.sound.playUIClick();
    this.saveGame();

    this.state = GameState.TITLE;
    this.cameraSystem.isCinematic = true;
    this.cameraSystem.setPerspectiveMode(false);
    this.player.setFirstPersonMode(false);
    this.ui.updateCameraModeButton(false);
    this.ui.setUnderwaterEffect(false, false);
    this.sound.setUnderwater(false);
    this.wasCameraUnderwater = false;
    this.ui.showTitleScreen();

    const saveInfo = this.checkSavedProgress();
    this.ui.setContinueBadge(saveInfo.hasSave, saveInfo.count);
  }

  private setOriginalWorldVisible(visible: boolean): void {
    this.atmosphere.group.visible = visible;
    this.terrain.group.visible = visible;
    this.lake.group.visible = visible;
    this.temple.group.visible = visible;
    this.portal.group.visible = visible;
    this.forest.group.visible = visible;
    this.crystals.group.visible = visible;
    this.worldInteractions.group.visible = visible;
    this.memorySystem.group.visible = visible;
    this.villageHouses.group.visible = visible;
    this.world1VoxelBuilder.group.visible = visible;
    this.npcManager.group.visible = visible;
    this.combatSystem.group.visible = visible;
    this.companions.group.visible = visible;
  }

  public enterDarkRealm(fromRemoteSync: boolean = false): void {
    // Enforce collecting all 7 Echo Crystals before unlocking the Shadow Realm portal
    if (this.state === GameState.TITLE) {
      const saveInfo = this.checkSavedProgress();
      if (saveInfo.count < 7 && !fromRemoteSync) {
        this.sound.init();
        this.sound.resume();
        this.sound.playUIClick();
        this.ui.showToast(
          `🔒 اجمع سبعة بلورات لفتح البوابة (${saveInfo.count}/7) · Collect 7 Crystals First`
        );
        return;
      }
      if (saveInfo.hasSave) {
        this.loadSavedProgress();
      }
    } else if (!fromRemoteSync) {
      const count = this.crystals.getCollectedCount();
      if (count < 7) {
        this.sound.playUIClick();
        this.ui.showToast(
          `🔒 اجمع سبعة بلورات لفتح البوابة (${count}/7) · Collect 7 Crystals First`
        );
        return;
      }
    }

    this.clearPendingTimers();
    this.input.resetAllInputs();
    this.ui.resetAllTouchStates();
    this.ui.closeBuildCraftModal();

    this.sound.init();
    this.sound.resume();
    this.sound.playPortalActivation();

    if (!this.darkRealm) {
      this.darkRealm = new DarkRealmManager(
        this.scene,
        this.player,
        this.cameraSystem,
        this.sound,
        this.isMobileDevice,
        this.companions.getSharedCompanionUnits(),
        () => this.exitDarkRealmToIsland(),
        (msg) => this.ui.showToast(msg),
        () => this.ui.showHurtEffect(),
        this.sharedProgress
      );
      this.darkRealm.weaponSystem = this.weaponSystem;
      this.scene.add(this.darkRealm.group);
      this.wireDarkRealmMultiplayer(this.darkRealm);
    } else {
      this.darkRealm.weaponSystem = this.weaponSystem;
    }

    this.companions.setExternalControl(true);
    this.setOriginalWorldVisible(false);
    this.isInDarkRealm = true;
    this.state = GameState.PLAYING;
    this.multiplayer.remotePlayers.setLocalRealm('DARK_REALM');
    this.ui.setDarkRealmActive(true);
    this.ui.showHUD();
    this.darkRealm.activate();
    this.applyPendingDarkSnapshot();
    this.player.externalSpeedMultiplier = this.sharedProgress.getSpeedMultiplier();
    this.ui.updateBuildModeBar(
      this.sharedProgress.buildMode,
      this.sharedProgress.activeBlockKind,
      this.darkRealm.buildRotation
    );
    this.syncMinecraftHud();
    this.ui.updateWeaponHud(this.weaponSystem.getHudState(this.sharedProgress.inventory.arrows));
    this.syncDarkRealmHudExtras();
    this.ui.showTargetInteractPrompt(this.darkRealm.getSharedInteractTarget());
    this.multiplayer.broadcastLocalTransform(true);
    if (!fromRemoteSync) {
      this.multiplayer.broadcastPortalTravel('DARK_REALM');
    }
  }

  public exitDarkRealmToIsland(fromRemoteSync: boolean = false): void {
    if (!this.isInDarkRealm) return;
    this.input.resetAllInputs();
    this.ui.resetAllTouchStates();
    this.ui.closeBuildCraftModal();
    this.resetWorld1MiningState();

    this.darkRealm?.deactivate();
    this.isInDarkRealm = false;
    this.multiplayer.remotePlayers.setLocalRealm('ISLAND');
    this.companions.setExternalControl(false);
    this.setOriginalWorldVisible(true);
    this.ui.setDarkRealmActive(false);
    this.ui.updateDarkBossBar(null);
    this.ui.updateQuestTracker(this.questSystem.getActiveQuest(), this.questSystem.getActiveObjective());

    const px = Terrain.PORTAL_POS.x;
    const pz = Terrain.PORTAL_POS.z + 10;
    const py = this.terrain.getHeightAt(px, pz);
    this.player.position.set(px, py, pz);
    this.player.velocity.set(0, 0, 0);
    this.player.isGrounded = true;
    this.companions.resetNearPlayer(this.player.position);

    this.state = GameState.PLAYING;
    this.cameraSystem.isCinematic = false;
    this.cameraSystem.yaw = Math.PI;
    this.ui.showHUD();
    this.setBuildMode(this.sharedProgress.buildMode);
    this.ui.showTargetInteractPrompt(null);
    this.saveSharedBuilding();
    this.multiplayer.broadcastLocalTransform(true);
    if (!fromRemoteSync) {
      this.multiplayer.broadcastPortalTravel('ISLAND');
    }
  }

  public saveGame(): boolean {
    try {
      const collectedIds = this.crystals.crystals
        .filter((c) => c.collected)
        .map((c) => c.id);

      const collectedShards = this.worldInteractions.shards
        .filter((s) => s.collected)
        .map((s) => s.id);

      const readInscriptions = this.worldInteractions.inscriptions
        .filter((i) => i.read)
        .map((i) => i.id);

      const saveData = {
        collectedIds,
        collectedShards,
        readInscriptions,
        isTempleDoorOpen: this.worldInteractions.isTempleDoorOpen,
        memoryProfile: this.memorySystem.serialize(),
        questData: this.questSystem.serialize(),
        playerPos: {
          x: this.player.position.x,
          y: this.player.position.y,
          z: this.player.position.z,
        },
        cameraYaw: this.cameraSystem.getYaw(),
        timestamp: Date.now(),
      };

      localStorage.setItem('echo_the_world_remembers_save', JSON.stringify(saveData));
      this.saveSharedBuilding();

      // Also persist isolated multiplayer player & world datasets
      this.multiplayer?.saveGame();

      const saveInfo = this.checkSavedProgress();
      this.ui.setContinueBadge(saveInfo.hasSave, saveInfo.count);
      return true;
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
      return false;
    }
  }

  public loadSavedProgress(): boolean {
    try {
      const raw = localStorage.getItem('echo_the_world_remembers_save');
      if (!raw) return false;

      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.collectedIds)) return false;

      // Restore crystals
      this.crystals.setCollectedState(data.collectedIds);
      const count = this.crystals.getCollectedCount();
      this.ui.updateCrystalProgress(count);
      this.portal.updateCrystalProgress(count);

      // Restore memory shards, inscriptions, and temple door
      this.worldInteractions.restoreSavedState(
        data.collectedShards || [],
        data.readInscriptions || [],
        data.isTempleDoorOpen || false
      );
      const shardCount = this.worldInteractions.getCollectedShardsCount();
      this.ui.updateShardProgress(shardCount, 10);

      // Restore Echo Memory System (player profile and 3D manifestations)
      if (data.memoryProfile) {
        this.memorySystem.deserialize(data.memoryProfile);
      }

      // Restore Quest & Story System progress
      if (data.questData) {
        this.questSystem.deserialize(data.questData);
      }
      this.ui.updateQuestTracker(this.questSystem.getActiveQuest(), this.questSystem.getActiveObjective());

      // Restore player position
      if (data.playerPos && typeof data.playerPos.x === 'number') {
        const h = this.terrain.getHeightAt(data.playerPos.x, data.playerPos.z);
        this.player.position.set(
          data.playerPos.x,
          Math.max(data.playerPos.y, h),
          data.playerPos.z
        );
        this.player.velocity.set(0, 0, 0);
        this.player.isGrounded = true;
      }

      // Restore camera orientation
      if (typeof data.cameraYaw === 'number') {
        this.cameraSystem.yaw = data.cameraYaw;
      }

      this.hasTriggeredVictory = count >= 7;
      return true;
    } catch (e) {
      console.warn('LocalStorage load failed:', e);
      return false;
    }
  }

  public checkSavedProgress(): { hasSave: boolean; count: number; shardCount: number } {
    try {
      const raw = localStorage.getItem('echo_the_world_remembers_save');
      if (!raw) return { hasSave: false, count: 0, shardCount: 0 };
      const data = JSON.parse(raw);
      if (data && Array.isArray(data.collectedIds)) {
        const shardCount = Array.isArray(data.collectedShards) ? data.collectedShards.length : 0;
        return { hasSave: true, count: data.collectedIds.length, shardCount };
      }
    } catch {
      // ignore
    }
    return { hasSave: false, count: 0, shardCount: 0 };
  }

  public setQualityPreset(preset: QualityPreset): void {
    this.performanceManager.setPreset(preset);
    this.applyQualityLevel(preset);
  }

  public applyQualityLevel(preset: QualityPreset): void {
    const settings = this.performanceManager.getSettings();

    // 1. Renderer shadows and pixel ratio
    if (this.renderer.shadowMap.enabled !== settings.shadowsEnabled) {
      this.renderer.shadowMap.enabled = settings.shadowsEnabled;
    }
    this.renderer.shadowMap.type = settings.shadowMapType;
    const safeDpr = Math.max(0.75, Math.min(window.devicePixelRatio * settings.dprMultiplier, settings.maxDpr));
    if (this.renderer.getPixelRatio() !== safeDpr) {
      this.renderer.setPixelRatio(safeDpr);
    }
    this.needsModalBackdropRender = true;

    // 2. Camera clipping plane
    if (this.cameraSystem?.camera) {
      this.cameraSystem.camera.far = settings.farPlane;
      this.cameraSystem.camera.updateProjectionMatrix();
    }

    // 3. Atmosphere lighting & fog
    if (this.atmosphere) {
      this.atmosphere.applyQuality(
        settings.shadowsEnabled,
        settings.shadowMapSize,
        settings.fogDensity,
        settings.maxParticleCount
      );
    }

    // 4. Forest foliage LOD & Grass density
    if (this.forest) {
      this.forest.applyQuality(
        settings.shadowsEnabled,
        settings.grassDensityPercent,
        settings.enableExtraPointLights
      );
    }

    // 5. Village houses shadows & lights
    if (this.villageHouses) {
      this.villageHouses.applyQuality(
        settings.shadowsEnabled,
        settings.enableExtraPointLights
      );
    }
  }

  public resetPlayerPosition(): void {
    this.input.resetAllInputs();
    this.ui.resetAllTouchStates();
    if (this.isInDarkRealm && this.darkRealm) {
      this.darkRealm.resetPlayerToSpawn();
      this.cameraSystem.yaw = 0;
      this.sound.playUIClick();
      return;
    }
    const spawnX = Terrain.SPAWN_POS.x;
    const spawnZ = Terrain.SPAWN_POS.z;
    const spawnY = this.terrain.getHeightAt(spawnX, spawnZ);
    this.player.position.set(spawnX, spawnY, spawnZ);
    this.player.velocity.set(0, 0, 0);
    this.player.isGrounded = true;
    this.companions.resetNearPlayer(this.player.position);
    this.cameraSystem.yaw = Math.PI;
    this.sound.playUIClick();
    this.ui.showToast('تم العودة إلى نقطة البداية · Returned to start');
  }

  private handleInteract(): void {
    if (this.state !== GameState.PLAYING || this.ui.getIsModalOrPaused()) return;
    if (!this.activeInteractiveTarget) return;
    const target = this.activeInteractiveTarget;

    // 0a. Quest Companion Interaction
    if ((target as any).companionId) {
      this.startCompanionDialogue((target as any).companionId as string);
      return;
    }

    // 0b. NPC & Creature Interaction (Dialogue, Lore, & Petting)
    if ((target as any).npcInfo) {
      const npcInfo = (target as any).npcInfo as InteractiveNPCInfo;
      this.startNPCDialogue(npcInfo.id);
      return;
    }

    // 1. Crystal Interaction
    if (target.type === 'crystal') {
      const crystalData = target.data as CrystalData;
      if (crystalData && !crystalData.collected) {
        this.collectCrystalAndNotify(crystalData, true);
      }
    }

    // 2. Memory Shard Collection (Prevent re-collection)
    else if (target.type === 'shard') {
      const shard = this.worldInteractions.collectShard(target.id as number);
      if (shard) {
        this.sound.playShardCollect();
        const shardCount = this.worldInteractions.getCollectedShardsCount();
        this.ui.updateShardProgress(shardCount, 10);
        this.ui.showToast(`✦ ${shard.nameAr} · ${shard.quoteAr}`);
        this.questSystem.recordShardCollected(shardCount);
        this.sharedProgress.addXp(28);
        this.syncMinecraftHud();
        this.saveGame();
        this.multiplayer.broadcastWorldProgressUpdate({
          shards: [shard.id],
          questProgress: this.questSystem.serialize(),
          darkProgress: this.sharedProgress.serialize(),
        });
      }
    }

    // 3. Ancient Inscription Reading
    else if (target.type === 'inscription') {
      const insc = target.data as AncientInscription;
      if (insc) {
        this.sound.playInscriptionRead();
        insc.read = true;
        this.ui.openInscriptionModal(insc);
        this.questSystem.recordInscriptionRead(insc.id);
        this.saveGame();
        this.multiplayer.broadcastWorldProgressUpdate({
          inscriptions: [insc.id],
          questProgress: this.questSystem.serialize(),
        });
      }
    }

    // 4. Temple Sanctuary Gate
    else if (target.type === 'door') {
      const isOpen = this.worldInteractions.toggleTempleDoor();
      this.sound.playStoneDoorSound();
      this.ui.showToast(
        isOpen
          ? 'فُتحت بوابة المعبد الحجرية العتيقة · Temple Gate Unsealed'
          : 'أُغلقت بوابة المعبد الحجرية · Temple Gate Sealed'
      );
      this.questSystem.recordStoneGateAction(isOpen);
      this.saveGame();
      this.multiplayer.broadcastWorldProgressUpdate({
        isTempleDoorOpen: isOpen,
        questProgress: this.questSystem.serialize(),
      });
    }

    // 5. Great Stone Portal
    else if (target.type === 'portal') {
      const crystalCount = this.crystals.getCollectedCount();
      if (crystalCount >= 7) {
        this.sound.playPortalActivation();
        this.ui.openVictoryModal();
      } else {
        const remaining = 7 - crystalCount;
        this.sound.playUIClick();
        this.ui.showToast(
          `🔒 اجمع سبعة بلورات لفتح البوابة (${crystalCount}/7) · متبقي ${remaining} بلورات!`
        );
      }
    }

    // 6. Village House Hearth Resting & Vitality Recovery
    else if ((target as any).type === 'hearth') {
      this.combatSystem.restoreFullHealth();
      this.sound.playHearthRest();
      this.ui.updateCombatStats(this.combatSystem.getStats());
      this.ui.showToast('✦ استرحت بجانب الموقد الحجري واستعدت كامل عافيتك وطاقتك · Restored by Warm Hearth');
      this.saveGame();
    }

    // 7. Ancient Village Well Spring Water
    else if ((target as any).type === 'well') {
      this.sound.playWellWater();
      this.ui.showToast('✦ شربت من مياه نبع الأثير العذبة وارتوت روحك · Pure Spring Water Drank');
    }

    // 8. Village House Ancient Lorebook
    else if ((target as any).type === 'village_lore') {
      const conf = (target as any).data;
      this.sound.playInscriptionRead();
      this.ui.showToast(
        conf?.loreTextAr || '«سجلات قديمة تحكي عن سكينة القرية ووئام أهلها مع صدى الجزيرة...»'
      );
    }
  }

  private startNPCDialogue(npcId: string, nodeKey: string = 'root'): void {
    const dialogueNode = this.npcManager.getDialogueFor(npcId, nodeKey);
    this.ui.openNPCDialogue(dialogueNode, (option) => {
      if (option.action === 'CLOSE') {
        this.ui.closeNPCDialogue();
        this.npcManager.closeDialogue();
      } else if (option.action === 'PET_CREATURE') {
        this.sound.playNPCVoice('creature');
        this.ui.showToast('✦ استشعرت روح الضياء نقاء خطواتك · Forest Harmony Gained');
        this.ui.closeNPCDialogue();
        this.npcManager.closeDialogue();
      } else if (option.action === 'QUEST_HINT') {
        this.ui.showToast('📍 تم تحديث إرشادات البوصلة · Quest Guidance Updated');
        if (option.nextDialogueId) {
          this.startNPCDialogue(npcId, option.nextDialogueId);
        } else {
          this.ui.closeNPCDialogue();
          this.npcManager.closeDialogue();
        }
      } else if (option.nextDialogueId) {
        this.startNPCDialogue(npcId, option.nextDialogueId);
      } else {
        this.ui.closeNPCDialogue();
        this.npcManager.closeDialogue();
      }
    });
  }

  private findBestBeaconTarget(): THREE.Vector3 | null {
    const activeObj = this.questSystem.getActiveObjective();
    if (activeObj) {
      if (activeObj.id === 'collect_3_shards') {
        let bestDist = Infinity;
        let bestPos: THREE.Vector3 | null = null;
        for (const s of this.worldInteractions.shards) {
          if (s.collected) continue;
          const d = s.pos.distanceTo(this.player.position);
          if (d < bestDist) {
            bestDist = d;
            bestPos = s.pos;
          }
        }
        if (bestPos) return bestPos;
      } else if (activeObj.id === 'discover_temple') {
        return Terrain.TEMPLE_POS;
      } else if (activeObj.id === 'read_temple_inscription') {
        return this.worldInteractions.inscriptions[2]?.pos ?? Terrain.TEMPLE_POS;
      } else if (activeObj.id === 'open_stone_gate') {
        return this.worldInteractions.templeDoorGroup.position;
      } else if (activeObj.id === 'activate_great_portal') {
        return Terrain.PORTAL_POS;
      }
    }

    let bestDist = Infinity;
    let bestCrystalPos: THREE.Vector3 | null = null;
    for (const c of this.crystals.crystals) {
      if (c.collected) continue;
      const d = c.pos.distanceTo(this.player.position);
      if (d < bestDist) {
        bestDist = d;
        bestCrystalPos = c.pos;
      }
    }
    return bestCrystalPos ?? Terrain.PORTAL_POS;
  }

  private startCompanionDialogue(companionId: string): void {
    const node = this.companions.getDialogueFor(companionId, this.questSystem, this.crystals);
    if (!node) return;
    this.activeCompanionDialogueId = companionId;
    this.sound.playNPCVoice('wanderer');

    this.ui.openNPCDialogue(node, (option) => {
      if (option.action === 'COMPANION_ASSIST') {
        this.companions.setAllModes('ASSIST');
        this.sound.playUIClick();
        this.ui.showToast('✦ افترق رفقاؤك لإنجاز المهام بشكل مستقل! · Companions Split Up');
      } else if (option.action === 'COMPANION_FOLLOW') {
        this.companions.setAllModes('FOLLOW');
        this.sound.playUIClick();
        this.ui.showToast('✦ رفقاؤك يسيرون بجانبك عن قرب · Follow Mode Active');
      } else if (option.action === 'COMPANION_PING') {
        const beaconPos = this.findBestBeaconTarget();
        if (beaconPos) {
          this.companions.pingObjectiveBeacon(beaconPos);
          this.sound.playCrystalResonance();
          this.ui.showToast('📍 تم إطلاق شعاع الضوء نحو الهدف / أقرب بلورة!');
        }
      } else if (option.action === 'COMPANION_HEAL') {
        if (this.companions.triggerHealFrom(companionId)) {
          this.combatSystem.healPlayer(25, 25);
          this.sound.playHearthRest();
          this.ui.showToast('✦ استعدت +25 صحة وطاقة صدى من طاقة رفيقك! · Companion Healing');
        }
      }
      this.ui.closeNPCDialogue();
      this.activeCompanionDialogueId = null;
    });
  }

  private tick(now: number): void {
    requestAnimationFrame((t) => this.tick(t));
    if (this.isContextLost) return;

    if (document.hidden) {
      this.lastTime = now;
      return;
    }

    const rawDt = (now - this.lastTime) / 1000;
    this.lastTime = now;
    const dt = Number.isFinite(rawDt) && rawDt > 0 ? Math.min(rawDt, 0.05) : 0.016;

    const isModalOrPaused = this.ui.getIsModalOrPaused();
    const isDarkModalOpen = this.isInDarkRealm && Boolean(this.darkRealm?.ui.isAnyModalOpen());
    if (isModalOrPaused || isDarkModalOpen || this.state !== GameState.PLAYING || this.ui.isChatFocused?.()) {
      this.input.releasePointerLock();
    }
    if (isModalOrPaused && this.splashRemoved) {
      // Keep UI Escape/Shortcuts immediately responsive every frame,
      // and avoid burning GPU/CPU re-rendering static frames behind dark modal overlays.
      this.input.update();
      if (this.input.pauseJustPressed) {
        this.ui.handleEscapeKey(this.state !== GameState.TITLE);
      }
      this.input.clearFrameDeltas();

      if (this.needsModalBackdropRender && now - this.lastModalRenderMs >= 200) {
        this.lastModalRenderMs = now;
        this.needsModalBackdropRender = false;
        const t0 = performance.now();
        this.renderer.render(this.scene, this.cameraSystem.camera);
        this.lastRenderDurationMs = performance.now() - t0;
      }
      return;
    }

    // On Title Screen, adaptively pace 3D background rendering so menus, modals, and scrolling never starve
    if (this.state === GameState.TITLE && this.splashRemoved) {
      const titleMinInterval = Math.min(250, Math.max(33, this.lastRenderDurationMs * 1.5));
      if (now - this.lastTitleRenderMs < titleMinInterval) {
        return;
      }
      this.lastTitleRenderMs = now;
    }

    this.lastModalRenderMs = -999;
    this.needsModalBackdropRender = false;
    this.performanceManager.recordFrame(now);
    this.update(dt, now / 1000, now);
    const renderStart = performance.now();
    this.renderer.render(this.scene, this.cameraSystem.camera);
    this.lastRenderDurationMs = performance.now() - renderStart;
    this.dismissBootSplash();
  }

  private update(dt: number, timeSec: number, nowMs: number = performance.now()): void {
    // 1. Process Inputs
    this.input.update();

    if (this.isInDarkRealm && this.darkRealm) {
      if (this.input.inventoryJustPressed && this.state === GameState.PLAYING) {
        if (this.ui.isBuildCraftModalOpen()) {
          this.ui.closeBuildCraftModal();
        } else {
          this.openSharedBuildModal();
        }
        this.input.inventoryJustPressed = false;
      }

      const darkModalWasOpen = this.darkRealm.ui.isAnyModalOpen();
      if (this.input.hotbarSlotPressed === 7 && this.state === GameState.PLAYING && !darkModalWasOpen && !this.ui.getIsModalOrPaused()) {
        this.openSharedBuildModal();
        this.input.hotbarSlotPressed = null;
      }

      if (this.input.viewToggleJustPressed && this.state === GameState.PLAYING && !darkModalWasOpen && !this.ui.getIsModalOrPaused()) {
        const fpp = this.cameraSystem.togglePerspective();
        this.lastCameraIsFirstPerson = fpp;
        this.ui.updateCameraModeButton(fpp);
        this.ui.showToast(fpp ? '👁️ First-Person View · منظور الشخص الأول' : '🎥 Third-Person View · منظور الشخص الثالث');
      }

      if (this.state === GameState.PLAYING && (!this.ui.getIsModalOrPaused() || darkModalWasOpen)) {
        this.darkRealm.update(dt, timeSec, this.input);
      }
      if (this.cameraSystem.isFirstPerson !== this.lastCameraIsFirstPerson) {
        this.lastCameraIsFirstPerson = this.cameraSystem.isFirstPerson;
        this.ui.updateCameraModeButton(this.cameraSystem.isFirstPerson);
      }
      const hideW2Char = this.cameraSystem.shouldHideCharacterMesh();
      if (
        this.player.isFirstPerson !== this.cameraSystem.isFirstPerson ||
        this.player.isCharacterMeshHidden() !== hideW2Char
      ) {
        this.player.setFirstPersonMode(this.cameraSystem.isFirstPerson, hideW2Char);
      }
      this.updateWeaponSystemForFrame(
        dt,
        'DARK_REALM',
        this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused() && !darkModalWasOpen
      );
      this.updateUnderwaterAtmosphere(dt, timeSec);
      // Keep remote players, voice state, & 20Hz transform sync alive in World 2!
      this.multiplayer.update(dt, timeSec, this.cameraSystem.camera.position);

      if (!darkModalWasOpen && this.input.pauseJustPressed) {
        this.ui.handleEscapeKey(this.state !== GameState.TITLE);
      }
      if (this.state === GameState.PLAYING) {
        this.ui.updateAutoRunUI(this.input.isSprinting);
        const wHud = this.weaponSystem.getHudState(this.sharedProgress.inventory.arrows);
        this.ui.updateWeaponHud(wHud);
        const showCombatReticle =
          !darkModalWasOpen &&
          !this.ui.getIsModalOrPaused() &&
          (this.cameraSystem.isFirstPerson ||
            wHud.isAiming ||
            wHud.bowDraw > 0.02 ||
            this.weaponSystem.activeWeapon !== 'sword');
        this.ui.setCombatReticleState(showCombatReticle, wHud.isAiming || wHud.bowDraw > 0.25);
        this.ui.updateBuildModeBar(
          this.sharedProgress.buildMode,
          this.sharedProgress.activeBlockKind,
          this.darkRealm.buildRotation
        );
        this.ui.showTargetInteractPrompt(this.darkRealm.getSharedInteractTarget());
        if (nowMs - this.lastMinimapRenderMs >= 66) {
          this.lastMinimapRenderMs = nowMs;
          this.syncMinecraftHud();
          this.syncDarkRealmHudExtras();
          const mp = this.darkRealm.getMinimapPayload();
          const remoteBlips = this.multiplayer.remotePlayers.getMinimapBlips('DARK_REALM');
          this.allyBlipsBuffer.length = 0;
          for (let i = 0; i < remoteBlips.length; i++) this.allyBlipsBuffer.push(remoteBlips[i]);
          for (let i = 0; i < mp.companions.length; i++) this.allyBlipsBuffer.push(mp.companions[i]);
          this.ui.renderDarkRealmMinimap(
            mp.playerX,
            mp.playerZ,
            mp.yaw,
            mp.landmarks,
            mp.monsters,
            this.allyBlipsBuffer,
            mp.returnPortalPos
          );
        }
      }
      this.input.clearFrameDeltas();
      return;
    }

    if (this.input.pauseJustPressed) {
      this.ui.handleEscapeKey(this.state !== GameState.TITLE);
    }

    if (this.input.questJustPressed && this.state === GameState.PLAYING) {
      this.ui.openQuestLogModal(this.questSystem);
    }

    if (this.input.buildToggleJustPressed && this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused()) {
      this.setBuildMode(!this.sharedProgress.buildMode);
    }

    if (
      this.input.rotateBlockJustPressed &&
      this.sharedProgress.buildMode &&
      this.state === GameState.PLAYING &&
      !this.ui.getIsModalOrPaused()
    ) {
      this.rotateActiveBlock();
    }

    if (this.input.hotbarSlotPressed !== null && this.state === GameState.PLAYING && !this.ui.getIsModalOrPaused()) {
      this.handleSelectHotbarSlot(this.input.hotbarSlotPressed);
    }

    if (this.input.inventoryJustPressed && this.state === GameState.PLAYING) {
      if (this.ui.isBuildCraftModalOpen()) {
        this.ui.closeBuildCraftModal();
      } else {
        this.openSharedBuildModal();
      }
    }

    const isModalOpen = this.ui.getIsModalOrPaused();

    // Update sprint button visual highlight in sync with active sprint state
    if (this.state === GameState.PLAYING) {
      this.ui.updateAutoRunUI(this.input.isSprinting);
      this.ui.updateBuildModeBar(
        this.sharedProgress.buildMode,
        this.sharedProgress.activeBlockKind,
        this.world1BuildRot
      );
    }

    // 2. Camera Controls
    if (!isModalOpen && this.state === GameState.PLAYING) {
      if (this.input.viewToggleJustPressed) {
        const fpp = this.cameraSystem.togglePerspective();
        this.lastCameraIsFirstPerson = fpp;
        this.ui.updateCameraModeButton(fpp);
        this.ui.showToast(fpp ? '👁️ First-Person View · منظور الشخص الأول' : '🎥 Third-Person View · منظور الشخص الثالث');
      }
      if (this.input.cameraDeltaX !== 0 || this.input.cameraDeltaY !== 0) {
        this.cameraSystem.rotate(this.input.cameraDeltaX, this.input.cameraDeltaY);
      }
      if (this.input.zoomDelta !== 0) {
        this.cameraSystem.zoom(this.input.zoomDelta);
      }
    }
    if (this.cameraSystem.isFirstPerson !== this.lastCameraIsFirstPerson) {
      this.lastCameraIsFirstPerson = this.cameraSystem.isFirstPerson;
      this.ui.updateCameraModeButton(this.cameraSystem.isFirstPerson);
    }
    const hideW1CharEarly = this.cameraSystem.shouldHideCharacterMesh();
    if (
      this.player.isFirstPerson !== this.cameraSystem.isFirstPerson ||
      this.player.isCharacterMeshHidden() !== hideW1CharEarly
    ) {
      this.player.setFirstPersonMode(this.cameraSystem.isFirstPerson, hideW1CharEarly);
    }

    // 3. Player Locomotion & Minecraft Building (Only when active playing and no modal)
    if (!isModalOpen && this.state === GameState.PLAYING) {
      this.cameraSystem.camera.getWorldDirection(this.aimForward);
      this.world1VoxelBuilder.updatePreview(
        this.sharedProgress.buildMode,
        this.player.position,
        this.aimForward,
        (x, z) => this.terrain.getHeightAt(x, z),
        this.cameraSystem.camera.position,
        this.world1BuildRot
      );

      if (this.input.jumpJustPressed) {
        if (this.player.jump()) {
          this.sound.playJump();
        }
      }

      // Combat Actions / Wood Chopping / Stone Mining / Block Building
      if (this.input.attackJustPressed) {
        this.handlePrimaryActionWorld1();
      }
      if (this.sharedProgress.buildMode) {
        if (this.input.isRightMouseHeld) {
          this.w1WasRightHeld = true;
          this.w1RightHoldElapsed += dt;
          const target = this.world1VoxelBuilder.findTargetedBlock(this.player.position, this.aimForward);
          if (target) {
            const tKey = `${target.gx},${target.gy},${target.gz}`;
            if (tKey !== this.w1MiningTargetKey) {
              this.w1MiningTargetKey = tKey;
              this.w1MiningTargetBlock = target;
              this.w1MiningProgress = 0;
              this.w1MiningHitTimer = 0;
            }
            this.w1MiningProgress += dt / 0.42;
            this.world1VoxelBuilder.setBreakingProgress(target, this.w1MiningProgress);
            this.player.setBreakingBlockAnimation(true);
            this.w1MiningHitTimer -= dt;
            if (this.w1MiningHitTimer <= 0) {
              this.w1MiningHitTimer = 0.13;
              this.sound.playBlockBreakHit(target.kind, Math.min(1, this.w1MiningProgress));
              this.world1VoxelBuilder.spawnDebrisParticles(
                target.gx,
                target.gy,
                target.gz,
                target.kind,
                target.yBase,
                3
              );
            }
            if (this.w1MiningProgress >= 1) {
              this.handleBreakBlock(target);
              this.resetWorld1MiningState();
            }
          } else {
            this.w1MiningTargetKey = null;
            this.w1MiningTargetBlock = null;
            this.w1MiningProgress = 0;
            this.world1VoxelBuilder.setBreakingProgress(null, 0);
            this.player.setBreakingBlockAnimation(false);
          }
        } else {
          if (this.w1WasRightHeld && this.w1RightHoldElapsed < 0.16 && this.w1MiningTargetBlock) {
            this.handleBreakBlock(this.w1MiningTargetBlock);
          } else if (!this.w1WasRightHeld && this.input.rightClickJustPressed) {
            this.handleBreakBlock();
          }
          if (this.w1WasRightHeld || this.w1MiningTargetKey !== null) {
            this.resetWorld1MiningState();
          }
        }
      } else {
        if (this.w1WasRightHeld || this.w1MiningTargetKey !== null) {
          this.resetWorld1MiningState();
        }
        if (
          this.input.pulseJustPressed &&
          !(this.input.reloadJustPressed && this.weaponSystem.activeWeapon === 'pistol')
        ) {
          this.combatSystem.executeEchoPulse();
          this.multiplayer.broadcastCombatPulse();
          this.syncMinecraftHud();
        }
      }
      if (this.input.dodgeJustPressed) {
        this.combatSystem.executePlayerDodge(this.input.moveInput, this.cameraSystem.getYaw());
        this.multiplayer.broadcastCombatDodge(this.input.moveInput.x, this.input.moveInput.y);
        this.syncMinecraftHud();
      }

      const strafeOnly = this.input.isStrafingLeft && Math.abs(this.input.moveInput.y) < 0.01;
      this.player.update(
        dt,
        this.input.moveInput,
        this.cameraSystem.getYaw(),
        this.input.isSprinting,
        this.terrain,
        this.allObstacles,
        strafeOnly
      );

      // Track distance traveled & proximity for quest objectives
      this.questSystem.updatePlayerMovement(this.player.position);

      // Swimming and Footstep sound synthesis
      if (this.player.isSwimming) {
        if (!this.lastWasSwimming) {
          this.sound.playWaterSplash(1.2);
        }
        if (this.player.isMoving || this.player.isRunningInPlace) {
          this.sound.playSwimStroke(this.player.isSprinting);
        }
      } else {
        if (this.lastWasSwimming) {
          this.sound.playWaterSplash(0.7);
        }
        if ((this.player.isMoving || this.player.isRunningInPlace) && this.player.isGrounded) {
          this.sound.playFootstep(this.player.isSprinting);
        }
      }
      this.lastWasSwimming = this.player.isSwimming;

      // Automatic close-range pickup when walking right into an uncollected Echo Crystal
      const autoCrystal = this.crystals.checkNearbyCrystal(this.player.position, 1.65);
      if (autoCrystal) {
        this.collectCrystalAndNotify(autoCrystal, false);
      }

      // Unified Proximity Detection for all interactive entities (Crystals, Shards, Inscriptions, Gates, NPCs, Companions)
      const crystal = this.crystals.checkNearbyCrystal(this.player.position, 4.2);
      const worldTarget = this.worldInteractions.findClosestInteraction(this.player.position);
      const npcTarget = this.npcManager.findClosestNPC(this.player.position, 3.8);
      const compTarget = this.companions.findClosestCompanion(this.player.position, 3.6);

      let bestTarget: InteractiveTarget | null = null;
      let bestDist = Infinity;

      if (crystal) {
        const crystalDist = Math.hypot(
          this.player.position.x - crystal.pos.x,
          this.player.position.z - crystal.pos.z
        );
        bestDist = crystalDist;
        bestTarget = {
          id: crystal.id,
          type: 'crystal',
          titleAr: crystal.nameAr,
          titleEn: crystal.nameEn,
          actionAr: 'تواصل مع صدى البلورة',
          actionEn: 'Commune with Echo Crystal',
          pos: crystal.pos,
          dist: crystalDist,
          color: crystal.color,
          data: crystal,
        };
      }

      if (worldTarget && worldTarget.dist < bestDist) {
        bestDist = worldTarget.dist;
        bestTarget = worldTarget;
      }

      if (npcTarget && npcTarget.distance < bestDist) {
        bestDist = npcTarget.distance;
        bestTarget = {
          id: npcTarget.id,
          type: 'door' as any,
          titleAr: npcTarget.nameAr,
          titleEn: npcTarget.nameEn,
          actionAr: npcTarget.actionPromptAr,
          actionEn: npcTarget.actionPromptEn,
          pos: npcTarget.position,
          dist: npcTarget.distance,
          color: npcTarget.type === 'WANDERER' ? 0x00f5d4 : npcTarget.type === 'GUARDIAN' ? 0x9b5de5 : 0x5eead4,
          data: npcTarget,
        };
        (bestTarget as any).npcInfo = npcTarget;
      }

      if (compTarget && compTarget.distance < bestDist) {
        bestDist = compTarget.distance;
        bestTarget = {
          id: compTarget.id,
          type: 'door' as any,
          titleAr: compTarget.nameAr,
          titleEn: compTarget.nameEn,
          actionAr: compTarget.actionPromptAr,
          actionEn: compTarget.actionPromptEn,
          pos: compTarget.position,
          dist: compTarget.distance,
          color: compTarget.color,
          data: compTarget,
        };
        (bestTarget as any).companionId = compTarget.id;
      }

      // Village houses interactions (hearth healing, well water, lorebook)
      const villageTarget = this.villageHouses.findClosestInteraction(this.player.position, 3.8);
      if (villageTarget && villageTarget.dist < bestDist) {
        bestDist = villageTarget.dist;
        bestTarget = villageTarget as unknown as InteractiveTarget;
      }

      this.activeInteractiveTarget = bestTarget;
      this.ui.showTargetInteractPrompt(this.activeInteractiveTarget);

      if (this.input.interactJustPressed && this.activeInteractiveTarget) {
        this.handleInteract();
      }
    }

    // 4. Update Camera (مع تتبع دوران وحركة الشخصية بسلاسة)
    this.cameraSystem.update(
      dt,
      this.player.position,
      this.terrain,
      this.player.currentFacingAngle,
      this.player.isMoving
    );
    const hideW1Char = this.cameraSystem.shouldHideCharacterMesh();
    if (
      this.player.isFirstPerson !== this.cameraSystem.isFirstPerson ||
      this.player.isCharacterMeshHidden() !== hideW1Char
    ) {
      this.player.setFirstPersonMode(this.cameraSystem.isFirstPerson, hideW1Char);
    }
    this.updateWeaponSystemForFrame(dt, 'ISLAND', !isModalOpen && this.state === GameState.PLAYING);
    if (this.state === GameState.PLAYING) {
      const wHud = this.weaponSystem.getHudState(this.sharedProgress.inventory.arrows);
      this.ui.updateWeaponHud(wHud);
      const showCombatReticle =
        !isModalOpen &&
        (this.cameraSystem.isFirstPerson ||
          wHud.isAiming ||
          wHud.bowDraw > 0.02 ||
          this.weaponSystem.activeWeapon !== 'sword');
      this.ui.setCombatReticleState(showCombatReticle, wHud.isAiming || wHud.bowDraw > 0.25);
    } else {
      this.ui.setCombatReticleState(false, false);
    }

    // 5. Update Echo Memory System (Telemetry tracking & real-time world alterations)
    if (this.state === GameState.PLAYING) {
      // Record sprint trigger when sprint begins
      if (this.input.isSprinting && !this.lastSprintState) {
        this.memorySystem.recordSprintTrigger();
      }
      this.lastSprintState = this.input.isSprinting;

      const crystalCount = this.crystals.getCollectedCount();
      const shardCount = this.worldInteractions.getCollectedShardsCount();
      const readInscriptionsCount = this.worldInteractions.inscriptions.filter((i) => i.read).length;

      this.memorySystem.updatePlayerTracking(
        dt,
        this.player.position,
        this.input.isSprinting && this.player.isMoving,
        crystalCount,
        shardCount,
        readInscriptionsCount
      );
    }

    // 6. Update World Visuals, Subsystems, Manifestations, NPCs, Enemies & Interactive VFX
    this.terrain.update(timeSec, this.cameraSystem.camera.position);
    this.forest.update(timeSec, dt);
    this.lake.update(timeSec, this.player.position);
    this.temple.update(timeSec);
    this.portal.update(timeSec);
    this.crystals.update(timeSec);
    this.worldInteractions.update(dt, timeSec);
    this.villageHouses.update(dt, timeSec, this.player.position);
    this.npcManager.update(dt, timeSec, this.player.position, this.input.isSprinting);
    this.combatSystem.update(dt, timeSec, this.cameraSystem.camera.position);
    this.world1VoxelBuilder.updateAnimations(dt);
    if (this.state === GameState.PLAYING) {
      if (this.activeCompanionDialogueId && !this.ui.isNPCDialogueOpen()) {
        this.activeCompanionDialogueId = null;
      }
      this.companionContext.playerFacingAngle = this.player.currentFacingAngle;
      this.companions.update(
        dt,
        timeSec,
        this.cameraSystem.camera.position,
        this.companionContext,
        this.activeCompanionDialogueId
      );
    }
    this.multiplayer.update(dt, timeSec, this.cameraSystem.camera.position);
    this.memorySystem.update(timeSec);
    this.atmosphere.update(timeSec, this.player.position, this.cameraSystem.camera.position);
    this.updateUnderwaterAtmosphere(dt, timeSec);

    const lightFocus = this.state === GameState.TITLE ? this.cameraSystem.camera.position : this.player.position;
    this.worldLightPool.update(lightFocus, this.getMaxPooledLights(), nowMs);

    // 7. Update Minimap & Minecraft HUD (~15 FPS throttle with pre-allocated blip buffer)
    if (this.state === GameState.PLAYING && nowMs - this.lastMinimapRenderMs >= 66) {
      this.lastMinimapRenderMs = nowMs;
      this.syncMinecraftHud();
      let blipIdx = 0;
      for (const e of this.combatSystem.enemies) {
        if (e.isDead) continue;
        if (blipIdx < this.enemyBlipsBuffer.length) {
          this.enemyBlipsBuffer[blipIdx].pos.x = e.group.position.x;
          this.enemyBlipsBuffer[blipIdx].pos.z = e.group.position.z;
        } else {
          this.enemyBlipsBuffer.push({ pos: { x: e.group.position.x, z: e.group.position.z } });
        }
        blipIdx++;
      }
      this.enemyBlipsBuffer.length = blipIdx;

      const remoteBlips = this.multiplayer.remotePlayers.getMinimapBlips();
      const compBlips = this.companions.getMinimapBlips();
      this.allyBlipsBuffer.length = 0;
      for (let i = 0; i < remoteBlips.length; i++) this.allyBlipsBuffer.push(remoteBlips[i]);
      for (let i = 0; i < compBlips.length; i++) this.allyBlipsBuffer.push(compBlips[i]);

      this.ui.renderMinimap(
        this.player.position.x,
        this.player.position.z,
        this.cameraSystem.getYaw(),
        this.crystals.crystals,
        this.worldInteractions.shards,
        this.npcManager.getNPCMinimapBlips(),
        this.enemyBlipsBuffer,
        this.allyBlipsBuffer,
        this.villageHouses.getMinimapHouseBlips()
      );
    }

    // Clear one-frame input triggers
    this.input.clearFrameDeltas();
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.cameraSystem.updateAspect(width / height);
    this.renderer.setSize(width, height);
    this.needsModalBackdropRender = true;
    const nextMobile = detectMobileOrTablet();
    if (nextMobile !== this.isMobileDevice) {
      this.isMobileDevice = nextMobile;
      this.input.setMobileMode(nextMobile);
      this.ui?.setMobileMode(nextMobile);
    }
    this.ui?.handleOrientationOrResize();
  }

  private collectCrystalAndNotify(crystalData: CrystalData, openLore: boolean): void {
    const collected = this.crystals.collectCrystal(crystalData.id);
    if (!collected) return;

    this.sound.playCrystalResonance();
    this.worldInteractions.spawnCollectionBurst(crystalData.pos, crystalData.color);
    const count = this.crystals.getCollectedCount();
    this.ui.updateCrystalProgress(count);
    this.portal.updateCrystalProgress(count);
    this.questSystem.recordCrystalCount(count);
    this.sharedProgress.addXp(60);
    this.syncMinecraftHud();

    if (openLore) {
      this.ui.openLoreModal(collected);
    } else if (count < 7) {
      this.ui.showToast(`💎 جمعت ${collected.nameAr} (${count}/7 لفتح البوابة)`);
    } else {
      this.ui.showToast('💎 اكتملت البلورات السبع (7/7)! البوابة مفتوحة الآن!');
    }

    this.saveGame();
    this.multiplayer.broadcastWorldProgressUpdate({
      crystals: [collected.id],
      questProgress: this.questSystem.serialize(),
      darkProgress: this.sharedProgress.serialize(),
    });

    if (count >= 7 && !this.hasTriggeredVictory) {
      this.hasTriggeredVictory = true;
      this.victoryTimerId = window.setTimeout(() => {
        this.victoryTimerId = null;
        if (this.state !== GameState.PLAYING) return;
        this.sound.playPortalActivation();
        this.ui.openVictoryModal();
      }, 1200);
    }
  }

  private resetWorld1MiningState(): void {
    this.w1MiningTargetBlock = null;
    this.w1MiningTargetKey = null;
    this.w1MiningProgress = 0;
    this.w1MiningHitTimer = 0;
    this.w1RightHoldElapsed = 0;
    this.w1WasRightHeld = false;
    this.world1VoxelBuilder?.setBreakingProgress(null, 0);
    this.player?.setBreakingBlockAnimation(false);
  }

  private rotateActiveBlock(): void {
    if (this.isInDarkRealm && this.darkRealm) {
      const rot = this.darkRealm.rotateActiveBlock();
      this.ui.updateBuildModeBar(this.sharedProgress.buildMode, this.sharedProgress.activeBlockKind, rot);
      return;
    }
    this.world1BuildRot = (this.world1BuildRot + 1) % 4;
    this.sound.playBlockRotate();
    this.ui.updateBuildModeBar(
      this.sharedProgress.buildMode,
      this.sharedProgress.activeBlockKind,
      this.world1BuildRot
    );
    this.ui.showToast(`🔄 Block Rotation: ${this.world1BuildRot * 90}°`);
  }

  public selectActiveWeapon(weapon: WeaponType): void {
    this.sharedProgress.buildMode = false;
    this.sharedProgress.activeSlotIndex = weapon === 'bow' ? 3 : 0;
    this.weaponSystem.setWeapon(weapon, true);

    if (this.isInDarkRealm && this.darkRealm) {
      this.darkRealm.syncEquippedToolVisual();
      this.darkRealm.ui.refreshHUD();
      this.ui.updateBuildModeBar(false, this.sharedProgress.activeBlockKind, this.darkRealm.buildRotation);
    } else {
      this.resetWorld1MiningState();
      this.player.setDarkRealmToolVisual(weapon, 0x00f5d4);
      this.ui.updateBuildModeBar(false, this.sharedProgress.activeBlockKind, this.world1BuildRot);
    }

    this.syncMinecraftHud();
    this.ui.updateWeaponHud(this.weaponSystem.getHudState(this.sharedProgress.inventory.arrows));
    const names: Record<WeaponType, string> = {
      sword: '⚔️ Echo Sword Equipped · السيف',
      pistol: '🔫 Echo Pistol Equipped · المسدس',
      bow: '🏹 Recurve Bow Equipped · القوس',
    };
    this.ui.showToast(names[weapon]);
  }

  private setBuildMode(active: boolean): void {
    this.sharedProgress.buildMode = active;
    if (this.isInDarkRealm && this.darkRealm) {
      this.darkRealm.syncEquippedToolVisual();
      this.ui.updateBuildModeBar(active, this.sharedProgress.activeBlockKind, this.darkRealm.buildRotation);
    } else {
      if (active) {
        this.player.setDarkRealmToolVisual('block');
        this.player.setHeldBlockAppearance(VOXEL_COLORS[this.sharedProgress.activeBlockKind] ?? 0x9c6644);
      } else {
        this.resetWorld1MiningState();
        const slot = this.sharedProgress.activeSlotIndex;
        const tool: 'sword' | 'pickaxe' | 'axe' | 'bow' | 'pistol' =
          slot === 1 ? 'axe' : slot === 2 ? 'pickaxe' : (this.weaponSystem?.activeWeapon ?? 'sword');
        this.player.setDarkRealmToolVisual(tool, 0x00f5d4);
      }
      this.ui.updateBuildModeBar(active, this.sharedProgress.activeBlockKind, this.world1BuildRot);
    }
    this.syncMinecraftHud();
    this.ui.updateWeaponHud(this.weaponSystem.getHudState(this.sharedProgress.inventory.arrows));
  }

  private handleSelectHotbarSlot(idx: number): void {
    const clamped = Math.max(0, Math.min(7, idx));
    if (this.isInDarkRealm && this.darkRealm) {
      if (clamped === 7) {
        this.openSharedBuildModal();
        return;
      }
      this.darkRealm.selectHotbarSlot(clamped);
      this.syncMinecraftHud();
      this.ui.updateWeaponHud(this.weaponSystem.getHudState(this.sharedProgress.inventory.arrows));
      this.saveSharedBuilding();
      return;
    }

    this.sharedProgress.activeSlotIndex = clamped;
    if (clamped === 4) {
      this.sharedProgress.activeBlockKind = 'wood_plank';
      this.setBuildMode(true);
      this.ui.showToast('🧱 تم اختيار ألواح الخشب للبناء · Oak Planks Ready');
    } else if (clamped === 5) {
      this.sharedProgress.activeBlockKind = 'cobblestone';
      this.setBuildMode(true);
      this.ui.showToast('🪨 تم اختيار الحجارة للبناء · Cobblestone Ready');
    } else if (clamped === 6) {
      this.setBuildMode(false);
      this.consumeFoodWorld1();
    } else if (clamped === 7) {
      this.setBuildMode(false);
      this.openSharedBuildModal();
    } else {
      if (clamped === 0) {
        this.weaponSystem?.setWeapon('sword', false);
      } else if (clamped === 3) {
        this.weaponSystem?.setWeapon('bow', false);
      }
      this.setBuildMode(false);
    }
    this.syncMinecraftHud();
    this.ui.updateWeaponHud(this.weaponSystem.getHudState(this.sharedProgress.inventory.arrows));
  }

  private consumeFoodWorld1(): void {
    const inv = this.sharedProgress.inventory;
    let ate = false;
    if (inv.cookedFood > 0) {
      inv.cookedFood -= 1;
      this.combatSystem.healPlayer(45, 25);
      ate = true;
    } else if (inv.potions > 0) {
      inv.potions -= 1;
      this.combatSystem.healPlayer(70, 50);
      ate = true;
    } else if (inv.food > 0) {
      inv.food -= 1;
      this.combatSystem.healPlayer(25, 15);
      ate = true;
    }

    if (ate) {
      this.sound.playHearthRest();
      this.saveSharedBuilding();
      this.syncMinecraftHud();
      this.ui.showToast('🍖 تناولت طعاماً واستعدت عافيتك! · Health Restored');
    } else {
      this.ui.showToast('❌ لا يوجد طعام متبقي! · Out of Food');
    }
  }

  private syncMinecraftHud(): void {
    const stats =
      this.isInDarkRealm && this.darkRealm
        ? this.darkRealm.getSharedHudCombatStats()
        : this.combatSystem.getStats();
    const inv = this.sharedProgress.inventory;
    this.ui.updateMinecraftHud({
      hp: stats.hp,
      maxHp: stats.maxHp,
      energy: stats.energy,
      maxEnergy: stats.maxEnergy,
      level: this.sharedProgress.level,
      xpRatio: this.sharedProgress.xp / Math.max(1, this.sharedProgress.xpToNext),
      activeSlot: this.sharedProgress.activeSlotIndex,
      counts: {
        3: inv.arrows,
        4: inv.woodPlanks,
        5: inv.cobbleBlocks,
        6: inv.cookedFood + inv.food + inv.potions,
      },
      isDarkRealm: this.isInDarkRealm,
    });
  }

  private syncDarkRealmHudExtras(): void {
    if (!this.isInDarkRealm || !this.darkRealm) return;
    const p = this.sharedProgress;
    const completedCount = p.quests.filter((q) => q.completed).length;
    this.ui.updateDarkQuestTracker(
      p.getActiveMainQuest(),
      p.getHighlightedNewQuest(),
      completedCount,
      p.quests.length
    );
    this.ui.updateDarkBossBar(this.darkRealm.entities.getActiveBossHudInfo(this.player.position));
    this.ui.updateDarkQuickLabels(
      this.darkRealm.entities.companionMode,
      `${this.darkRealm.atmosphere.getPhaseLabel().en} · ${this.darkRealm.atmosphere.weather}`
    );
  }

  private openSharedBuildModal(): void {
    if (this.state !== GameState.PLAYING) return;
    this.ui.openBuildCraftModal(this.sharedProgress, {
      onSelectBlock: (kind: VoxelBlockKind) => {
        this.sharedProgress.activeBlockKind = kind;
        this.setBuildMode(true);
      },
      onToggleBuildMode: () => {
        this.setBuildMode(!this.sharedProgress.buildMode);
      },
      onCraft: (recipe: CraftRecipe) => {
        if (this.sharedProgress.craft(recipe)) {
          this.sound.playCrystalResonance();
          this.syncMinecraftHud();
          this.darkRealm?.ui.refreshHUD();
          this.saveSharedBuilding();
          this.darkRealm?.saveState();
          this.broadcastSharedProgressDelta();
          this.ui.showToast(`✨ Crafted: ${recipe.nameEn} · ${recipe.nameAr}`);
        }
      },
      onUpgradeStat: (stat) => {
        if (this.sharedProgress.upgradeSkill(stat)) {
          this.sound.playLevelUp();
          this.player.externalSpeedMultiplier = this.sharedProgress.getSpeedMultiplier();
          this.syncMinecraftHud();
          this.darkRealm?.ui.refreshHUD();
          this.saveSharedBuilding();
          this.darkRealm?.saveState();
          this.broadcastSharedProgressDelta();
          this.ui.showToast(`⭐ Upgraded ${stat} to Rank ${this.sharedProgress.statRanks[stat]}`);
          return true;
        }
        return false;
      },
      onQuickBuildHouse: () => {
        this.quickBuildHouseInActiveWorld();
      },
    });
  }

  private quickBuildHouseInActiveWorld(): void {
    this.cameraSystem.camera.getWorldDirection(this.aimForward);
    this.aimForward.y = 0;
    if (this.aimForward.lengthSq() < 0.001) this.aimForward.set(0, 0, -1);
    this.aimForward.normalize();
    const buildOrigin = this.player.position.clone().addScaledVector(this.aimForward, 6.2);

    const builder =
      this.isInDarkRealm && this.darkRealm
        ? this.darkRealm.voxelBuilder
        : this.world1VoxelBuilder;
    const heightFn =
      this.isInDarkRealm && this.darkRealm
        ? (x: number, z: number) => this.darkRealm!.terrain.getMeshHeightAt(x, z)
        : (x: number, z: number) => this.terrain.getHeightAt(x, z);

    const placedList: PlacedVoxel[] = [];
    const placed = builder.buildStarterHouseBlueprint(buildOrigin, heightFn, placedList);
    if (placed > 0) {
      this.sound.playBlockPlace('wood_plank');
      this.sharedProgress.recordProgress('blocks_placed', placed);
      this.sharedProgress.recordProgress('houses_built', 1);
      this.sharedProgress.addXp(25);
      this.syncMinecraftHud();
      this.saveSharedBuilding();
      this.darkRealm?.saveState();
      this.multiplayer.broadcastVoxelUpdate(
        this.isInDarkRealm ? 'DARK_REALM' : 'ISLAND',
        'PLACE',
        placedList.map((b) => ({ gx: b.gx, gy: b.gy, gz: b.gz, kind: b.kind, rot: b.rot, yBase: b.yBase }))
      );
      this.broadcastSharedProgressDelta();
      this.ui.showToast(`🏠 تم بناء منزل مخصص (${placed} مكعب)!`);
    }
  }

  private handlePrimaryActionWorld1(): void {
    if (this.sharedProgress.buildMode) {
      this.cameraSystem.camera.getWorldDirection(this.aimForward);
      this.world1VoxelBuilder.updatePreview(
        true,
        this.player.position,
        this.aimForward,
        (x, z) => this.terrain.getHeightAt(x, z),
        this.cameraSystem.camera.position,
        this.world1BuildRot
      );
      const g = this.world1VoxelBuilder.getPreviewGrid();
      if (!g.valid) return;
      const kind = this.sharedProgress.activeBlockKind;
      const invKey = this.sharedProgress.getBlockInventoryKey(kind);
      if (this.sharedProgress.inventory[invKey] <= 0) {
        this.ui.showToast('❌ لا توجد مكعبات كافية! اصنع المزيد من [•••]');
        return;
      }
      if (this.world1VoxelBuilder.placeBlockAtGrid(g.gx, g.gy, g.gz, kind, g.rot, g.yBase)) {
        this.sharedProgress.inventory[invKey] -= 1;
        this.player.triggerBuildPlaceAnimation();
        this.world1VoxelBuilder.spawnPlacePopAnimation(g.gx, g.gy, g.gz, kind, g.yBase, g.rot);
        this.sound.playBlockPlace(kind);
        this.sharedProgress.recordProgress('blocks_placed', 1);
        this.sharedProgress.addXp(8);
        this.syncMinecraftHud();
        this.saveSharedBuilding();
        this.multiplayer.broadcastVoxelUpdate('ISLAND', 'PLACE', [
          { gx: g.gx, gy: g.gy, gz: g.gz, kind, rot: g.rot, yBase: g.yBase },
        ]);
        this.broadcastSharedProgressDelta();
      }
      return;
    }

    const slot = this.sharedProgress.activeSlotIndex;
    if (slot === 6) {
      this.consumeFoodWorld1();
      return;
    }

    if (slot === 1) {
      // Axe: prioritize chopping nearest tree, fallback to combat swing
      const hitTree = this.forest.damageNearestTree(this.player.position, 28);
      if (hitTree) {
        this.player.triggerAttackAnimation();
        this.multiplayer.broadcastCombatAttack(1);
        this.sound.playWoodChop();
        this.multiplayer.broadcastResourceHit({
          resourceType: 'WORLD1_TREE',
          x: hitTree.pos.x,
          z: hitTree.pos.z,
          destroyed: hitTree.destroyed,
        });
        if (hitTree.destroyed) {
          this.sharedProgress.inventory.wood += 3;
          this.sharedProgress.inventory.woodPlanks += 2;
          this.sharedProgress.recordProgress('gather_wood', 3);
          this.sharedProgress.addXp(14);
          this.saveSharedBuilding();
          this.broadcastSharedProgressDelta();
          this.ui.showToast('🪓 قطعت شجرة (+3 خشب، +2 ألواح بناء)');
        }
        this.syncMinecraftHud();
        return;
      }
    } else if (slot === 2) {
      // Pickaxe: prioritize mining nearest boulder, fallback to combat swing
      const hitRock = this.forest.damageNearestBoulder(this.player.position, 28);
      if (hitRock) {
        this.player.triggerAttackAnimation();
        this.multiplayer.broadcastCombatAttack(1);
        this.sound.playPickaxeHit();
        this.multiplayer.broadcastResourceHit({
          resourceType: 'WORLD1_BOULDER',
          x: hitRock.pos.x,
          z: hitRock.pos.z,
          destroyed: hitRock.destroyed,
        });
        if (hitRock.destroyed) {
          this.sharedProgress.inventory.stone += 3;
          this.sharedProgress.inventory.cobbleBlocks += 2;
          if (hitRock.kind === 'iron') {
            this.sharedProgress.inventory.iron += 1;
            this.sharedProgress.recordProgress('gather_iron', 1);
          }
          this.sharedProgress.recordProgress('gather_stone', 3);
          this.sharedProgress.addXp(16);
          this.saveSharedBuilding();
          this.broadcastSharedProgressDelta();
          this.ui.showToast(
            hitRock.kind === 'iron'
              ? '⛏️ استخرجت حجارة وحديد (+3 حجر، +2 طوب، +1 حديد)'
              : '⛏️ استخرجت حجارة (+3 حجر، +2 طوب)'
          );
        }
        this.syncMinecraftHud();
        return;
      }
    }

    if (
      slot !== 1 &&
      slot !== 2 &&
      (this.weaponSystem.activeWeapon === 'pistol' || this.weaponSystem.activeWeapon === 'bow')
    ) {
      // WeaponSystem handles Pistol firing & Bow draw/release in update loop
      return;
    }

    this.combatSystem.executePlayerAttack();
    this.multiplayer.broadcastCombatAttack(this.player.attackComboStep || 1);
    if (this.combatSystem.lastAttackHits === 0) {
      const hitTree = this.forest.damageNearestTree(this.player.position, 24);
      if (hitTree) {
        this.sound.playWoodChop();
        this.sound.playSwordImpact(false, this.player.attackComboStep || 1);
        this.multiplayer.broadcastResourceHit({
          resourceType: 'WORLD1_TREE',
          x: hitTree.pos.x,
          z: hitTree.pos.z,
          destroyed: hitTree.destroyed,
        });
        if (hitTree.destroyed) {
          this.sharedProgress.inventory.wood += 3;
          this.sharedProgress.inventory.woodPlanks += 2;
          this.sharedProgress.recordProgress('gather_wood', 3);
          this.sharedProgress.addXp(14);
          this.saveSharedBuilding();
          this.broadcastSharedProgressDelta();
          this.ui.showToast('🪵 قطعت شجرة (+3 خشب، +2 ألواح بناء)');
        }
      } else {
        const hitRock = this.forest.damageNearestBoulder(this.player.position, 22);
        if (hitRock) {
          this.sound.playPickaxeHit();
          this.sound.playSwordImpact(false, this.player.attackComboStep || 1);
          this.multiplayer.broadcastResourceHit({
            resourceType: 'WORLD1_BOULDER',
            x: hitRock.pos.x,
            z: hitRock.pos.z,
            destroyed: hitRock.destroyed,
          });
          if (hitRock.destroyed) {
            this.sharedProgress.inventory.stone += 3;
            this.sharedProgress.inventory.cobbleBlocks += 2;
            if (hitRock.kind === 'iron') {
              this.sharedProgress.inventory.iron += 1;
              this.sharedProgress.recordProgress('gather_iron', 1);
            }
            this.sharedProgress.recordProgress('gather_stone', 3);
            this.sharedProgress.addXp(16);
            this.saveSharedBuilding();
            this.broadcastSharedProgressDelta();
            this.ui.showToast('⛏️ استخرجت حجارة (+3 حجر، +2 طوب)');
          }
        }
      }
    }
    this.syncMinecraftHud();
  }

  private handleBreakBlock(explicitTarget?: PlacedVoxel | null): void {
    this.cameraSystem.camera.getWorldDirection(this.aimForward);
    const builder =
      this.isInDarkRealm && this.darkRealm
        ? this.darkRealm.voxelBuilder
        : this.world1VoxelBuilder;
    const target = explicitTarget ?? builder.findTargetedBlock(this.player.position, this.aimForward);
    if (!target) return;
    const removed = builder.removeBlockAtGrid(target.gx, target.gy, target.gz);
    if (removed) {
      this.player.triggerBuildBreakHitAnimation();
      builder.spawnDebrisParticles(target.gx, target.gy, target.gz, removed, target.yBase, 12);
      this.sound.playBlockBreak(removed);
      const key = this.sharedProgress.getBlockInventoryKey(removed);
      this.sharedProgress.inventory[key] += 1;
      this.syncMinecraftHud();
      this.saveSharedBuilding();
      this.darkRealm?.saveState();
      this.multiplayer.broadcastVoxelUpdate(
        this.isInDarkRealm ? 'DARK_REALM' : 'ISLAND',
        'REMOVE',
        [{ gx: target.gx, gy: target.gy, gz: target.gz, kind: removed, rot: target.rot, yBase: target.yBase }]
      );
      this.broadcastSharedProgressDelta();
    }
  }

  // ==========================================
  // REAL-TIME MULTIPLAYER WORLD SYNCHRONIZATION
  // ==========================================

  private wireDarkRealmMultiplayer(darkRealm: DarkRealmManager): void {
    darkRealm.onVoxelChanged = (op, blocks) => {
      this.multiplayer.broadcastVoxelUpdate(
        'DARK_REALM',
        op,
        blocks.map((b) => ({ gx: b.gx, gy: b.gy, gz: b.gz, kind: b.kind, rot: b.rot, yBase: b.yBase }))
      );
    };
    darkRealm.onMonsterDamaged = (spawnId, hp, maxHp, alive, pos) => {
      this.multiplayer.broadcastEnemyDamage('DARK_REALM', spawnId, hp, maxHp, alive, pos);
    };
    darkRealm.onNodeDamaged = (nodeId, hp, destroyed) => {
      this.multiplayer.broadcastResourceHit({
        resourceType: 'DARK_NODE',
        nodeId,
        hp,
        destroyed,
      });
    };
    darkRealm.onChestOpened = (chestId) => {
      this.multiplayer.broadcastResourceHit({
        resourceType: 'DARK_CHEST',
        chestId,
        destroyed: true,
      });
    };
    darkRealm.onSharedProgressChanged = () => {
      this.broadcastSharedProgressDelta();
    };
    darkRealm.onCombatAction = (kind) => {
      if (kind === 'ATTACK') {
        this.multiplayer.broadcastCombatAttack(1);
      } else if (kind === 'DODGE') {
        this.multiplayer.broadcastCombatDodge(this.input.moveInput.x, this.input.moveInput.y);
      } else {
        this.multiplayer.broadcastCombatPulse();
      }
    };
  }

  private broadcastSharedProgressDelta(): void {
    this.multiplayer.broadcastWorldProgressUpdate({
      questProgress: this.questSystem.serialize(),
      darkProgress: this.sharedProgress.serialize(),
    });
  }

  public buildLocalRoomSnapshot(): Partial<RoomWorldSnapshot> {
    return {
      crystals: this.crystals.crystals.filter((c) => c.collected).map((c) => c.id),
      shards: this.worldInteractions.shards.filter((s) => s.collected).map((s) => s.id),
      inscriptions: this.worldInteractions.inscriptions.filter((i) => i.read).map((i) => i.id),
      isTempleDoorOpen: this.worldInteractions.isTempleDoorOpen,
      questProgress: this.questSystem.serialize(),
      darkProgress: this.sharedProgress.serialize(),
      world1Voxels: this.world1VoxelBuilder
        .serialize()
        .map((v) => ({ gx: v.gx, gy: v.gy, gz: v.gz, kind: v.kind, rot: v.rot, yBase: v.yBase })),
      world2Voxels: this.darkRealm
        ? this.darkRealm.voxelBuilder
            .serialize()
            .map((v) => ({ gx: v.gx, gy: v.gy, gz: v.gz, kind: v.kind, rot: v.rot, yBase: v.yBase }))
        : [],
    };
  }

  public applyRemoteWorldSnapshot(snap: RoomWorldSnapshot): void {
    if (!snap) return;

    if (Array.isArray(snap.crystals) && snap.crystals.length > 0) {
      this.crystals.setCollectedState(snap.crystals);
      const count = this.crystals.getCollectedCount();
      this.ui.updateCrystalProgress(count);
      this.portal.updateCrystalProgress(count);
    }

    if (
      (Array.isArray(snap.shards) && snap.shards.length > 0) ||
      (Array.isArray(snap.inscriptions) && snap.inscriptions.length > 0) ||
      typeof snap.isTempleDoorOpen === 'boolean'
    ) {
      this.worldInteractions.restoreSavedState(
        snap.shards || [],
        snap.inscriptions || [],
        Boolean(snap.isTempleDoorOpen)
      );
      this.ui.updateShardProgress(this.worldInteractions.getCollectedShardsCount(), 10);
    }

    if (snap.questProgress) {
      this.questSystem.deserialize(snap.questProgress);
      this.ui.updateQuestTracker(
        this.questSystem.getActiveQuest(),
        this.questSystem.getActiveObjective()
      );
    }

    if (snap.darkProgress) {
      this.sharedProgress.deserialize(snap.darkProgress);
      this.syncMinecraftHud();
      this.darkRealm?.ui.refreshHUD();
    }

    if (Array.isArray(snap.world1Voxels) && snap.world1Voxels.length > 0) {
      this.world1VoxelBuilder.applyRemoteBlocks(
        'PLACE',
        snap.world1Voxels.map((b) => ({
          gx: b.gx,
          gy: b.gy,
          gz: b.gz,
          kind: b.kind as VoxelBlockKind,
          rot: b.rot,
          yBase: b.yBase,
        }))
      );
    }

    if (Array.isArray(snap.world1Enemies)) {
      for (const e of snap.world1Enemies) {
        this.combatSystem.applyRemoteEnemyState(e.id, e.hp, e.maxHp, e.isDead);
      }
    }

    if (Array.isArray(snap.world1HarvestedTrees)) {
      for (const t of snap.world1HarvestedTrees) {
        this.forest.applyRemoteTreeHarvest(t.x, t.z, true);
      }
    }

    if (Array.isArray(snap.world1HarvestedBoulders)) {
      for (const b of snap.world1HarvestedBoulders) {
        this.forest.applyRemoteBoulderHarvest(b.x, b.z, true);
      }
    }

    const hasDarkPayload =
      (Array.isArray(snap.world2Voxels) && snap.world2Voxels.length > 0) ||
      (Array.isArray(snap.darkMonsters) && snap.darkMonsters.length > 0) ||
      (Array.isArray(snap.darkNodes) && snap.darkNodes.length > 0) ||
      (Array.isArray(snap.darkChests) && snap.darkChests.length > 0);

    if (hasDarkPayload) {
      if (this.darkRealm) {
        this.applyDarkSnapshotParts(snap);
      } else {
        this.multiplayer.pendingDarkSnapshot = snap;
      }
    }
  }

  private applyPendingDarkSnapshot(): void {
    const pending = this.multiplayer.consumePendingDarkSnapshot();
    if (pending && this.darkRealm) {
      this.applyDarkSnapshotParts(pending);
    }
  }

  private applyDarkSnapshotParts(snap: Partial<RoomWorldSnapshot>): void {
    if (!this.darkRealm) return;
    if (Array.isArray(snap.world2Voxels) && snap.world2Voxels.length > 0) {
      this.darkRealm.voxelBuilder.applyRemoteBlocks(
        'PLACE',
        snap.world2Voxels.map((b) => ({
          gx: b.gx,
          gy: b.gy,
          gz: b.gz,
          kind: b.kind as VoxelBlockKind,
          rot: b.rot,
          yBase: b.yBase,
        }))
      );
    }
    if (Array.isArray(snap.darkMonsters)) {
      for (const m of snap.darkMonsters) {
        this.darkRealm.entities.applyRemoteMonsterState(m.spawnId, m.hp, m.alive);
      }
    }
    if (Array.isArray(snap.darkNodes)) {
      for (const n of snap.darkNodes) {
        this.darkRealm.landmarks.applyRemoteNodeState(n.nodeId, n.hp, n.alive);
      }
    }
    if (Array.isArray(snap.darkChests)) {
      for (const cid of snap.darkChests) {
        this.darkRealm.landmarks.applyRemoteChestOpened(cid);
      }
    }
  }

  public applyRemoteWorldDelta(delta: Partial<RoomWorldSnapshot>): void {
    if (!delta) return;

    if (Array.isArray(delta.crystals)) {
      for (const id of delta.crystals) {
        this.crystals.collectCrystal(Number(id));
      }
      const count = this.crystals.getCollectedCount();
      this.ui.updateCrystalProgress(count);
      this.portal.updateCrystalProgress(count);
    }

    if (Array.isArray(delta.shards)) {
      for (const id of delta.shards) {
        this.worldInteractions.collectShard(Number(id));
      }
      this.ui.updateShardProgress(this.worldInteractions.getCollectedShardsCount(), 10);
    }

    if (Array.isArray(delta.inscriptions)) {
      for (const id of delta.inscriptions) {
        const insc = this.worldInteractions.inscriptions.find((i) => i.id === Number(id));
        if (insc) insc.read = true;
      }
    }

    if (
      typeof delta.isTempleDoorOpen === 'boolean' &&
      delta.isTempleDoorOpen !== this.worldInteractions.isTempleDoorOpen
    ) {
      this.worldInteractions.toggleTempleDoor();
    }

    if (delta.questProgress) {
      this.questSystem.deserialize(delta.questProgress);
      this.ui.updateQuestTracker(
        this.questSystem.getActiveQuest(),
        this.questSystem.getActiveObjective()
      );
    }

    if (delta.darkProgress) {
      this.sharedProgress.deserialize(delta.darkProgress);
      this.syncMinecraftHud();
      this.darkRealm?.ui.refreshHUD();
    }
  }

  public applyRemoteVoxelUpdate(
    realm: RealmId,
    op: 'PLACE' | 'REMOVE',
    blocks: PlacedVoxelData[]
  ): void {
    const typedBlocks = blocks.map((b) => ({
      gx: b.gx,
      gy: b.gy,
      gz: b.gz,
      kind: b.kind as VoxelBlockKind,
      rot: b.rot,
      yBase: b.yBase,
    }));

    if (realm === 'ISLAND') {
      this.world1VoxelBuilder.applyRemoteBlocks(op, typedBlocks);
      this.saveSharedBuilding();
      return;
    }

    if (this.darkRealm) {
      this.darkRealm.voxelBuilder.applyRemoteBlocks(op, typedBlocks);
      this.darkRealm.saveState();
    } else if (op === 'PLACE') {
      const existing = this.multiplayer.pendingDarkSnapshot || {};
      const prevBlocks = existing.world2Voxels || [];
      this.multiplayer.pendingDarkSnapshot = {
        ...existing,
        world2Voxels: [...prevBlocks, ...blocks],
      };
    }
  }

  public applyRemoteEnemyState(
    packet: Extract<ServerPacket, { type: 'S_ENEMY_STATE' }>
  ): void {
    if (packet.realm === 'ISLAND' && packet.enemyId) {
      this.combatSystem.applyRemoteEnemyState(
        packet.enemyId,
        packet.hp,
        packet.maxHp,
        Boolean(packet.isDead),
        packet.pos?.x,
        packet.pos?.y,
        packet.pos?.z
      );
    } else if (packet.realm === 'DARK_REALM' && typeof packet.spawnId === 'number') {
      if (this.darkRealm) {
        this.darkRealm.entities.applyRemoteMonsterState(
          packet.spawnId,
          packet.hp,
          Boolean(packet.alive),
          packet.pos?.x,
          packet.pos?.y,
          packet.pos?.z
        );
      } else {
        const pending = this.multiplayer.pendingDarkSnapshot || {};
        const list = pending.darkMonsters || [];
        list.push({
          spawnId: packet.spawnId,
          hp: packet.hp,
          maxHp: packet.maxHp,
          alive: Boolean(packet.alive),
        });
        this.multiplayer.pendingDarkSnapshot = { ...pending, darkMonsters: list };
      }
    }
  }

  public applyRemoteResourceState(
    packet: Extract<ServerPacket, { type: 'S_RESOURCE_STATE' }>
  ): void {
    if (
      packet.resourceType === 'WORLD1_TREE' &&
      typeof packet.x === 'number' &&
      typeof packet.z === 'number'
    ) {
      this.forest.applyRemoteTreeHarvest(packet.x, packet.z, Boolean(packet.destroyed));
    } else if (
      packet.resourceType === 'WORLD1_BOULDER' &&
      typeof packet.x === 'number' &&
      typeof packet.z === 'number'
    ) {
      this.forest.applyRemoteBoulderHarvest(packet.x, packet.z, Boolean(packet.destroyed));
    } else if (packet.resourceType === 'DARK_NODE' && typeof packet.nodeId === 'number') {
      if (this.darkRealm) {
        this.darkRealm.landmarks.applyRemoteNodeState(
          packet.nodeId,
          packet.hp ?? 0,
          !packet.destroyed
        );
      } else {
        const pending = this.multiplayer.pendingDarkSnapshot || {};
        const nodes = pending.darkNodes || [];
        nodes.push({
          nodeId: packet.nodeId,
          hp: packet.hp ?? 0,
          alive: !packet.destroyed,
        });
        this.multiplayer.pendingDarkSnapshot = { ...pending, darkNodes: nodes };
      }
    } else if (packet.resourceType === 'DARK_CHEST' && packet.chestId) {
      if (this.darkRealm) {
        this.darkRealm.landmarks.applyRemoteChestOpened(packet.chestId);
      } else {
        const pending = this.multiplayer.pendingDarkSnapshot || {};
        const chests = pending.darkChests || [];
        chests.push(packet.chestId);
        this.multiplayer.pendingDarkSnapshot = { ...pending, darkChests: chests };
      }
    }
  }

  private saveSharedBuilding(): void {
    try {
      localStorage.setItem('echo_shared_progress_v1', JSON.stringify(this.sharedProgress.serialize()));
      localStorage.setItem('echo_world1_voxels_v1', JSON.stringify(this.world1VoxelBuilder.serialize()));
    } catch {
      // Ignore storage quota errors
    }
  }

  private loadSharedBuilding(): void {
    try {
      const rawProg = localStorage.getItem('echo_shared_progress_v1');
      if (rawProg) {
        this.sharedProgress.deserialize(JSON.parse(rawProg));
      } else {
        const legacyDark = localStorage.getItem('echo_dark_realm_save_v1');
        if (legacyDark) {
          const parsed = JSON.parse(legacyDark);
          if (parsed?.progress) this.sharedProgress.deserialize(parsed.progress);
        }
      }
      const rawVox = localStorage.getItem('echo_world1_voxels_v1');
      if (rawVox) {
        this.world1VoxelBuilder.deserialize(JSON.parse(rawVox));
      }
    } catch {
      // Ignore corrupted local cache
    }
  }

  private updateWeaponSystemForFrame(
    dt: number,
    realm: 'ISLAND' | 'DARK_REALM',
    enabled: boolean
  ): void {
    const w2 = realm === 'DARK_REALM' ? this.darkRealm : null;
    this.weaponSystem.update(dt, {
      realm,
      enabled,
      buildMode: this.sharedProgress.buildMode,
      hotbarSlot: this.sharedProgress.activeSlotIndex,
      isAttackPressed: this.input.attackJustPressed,
      isAttackHeld: this.input.isAttackHeld || this.touchAttackHeld,
      isRightHeld: this.input.isSecondaryHeld,
      reloadPressed: this.input.reloadJustPressed,
      arrowsAvailable: this.sharedProgress.inventory.arrows,
      baseDamageBonus: this.sharedProgress.statRanks.strength * 8,
      getGroundHeight: (x, z) =>
        w2 ? w2.terrain.getMeshHeightAt(x, z) : this.terrain.getHeightAt(x, z),
      w1Enemies: realm === 'ISLAND' ? this.combatSystem.enemies : undefined,
      onW1EnemyHit: (enemy, dmg, hitPos) => {
        this.tmpKnockbackDir.copy(hitPos).sub(this.player.position);
        this.tmpKnockbackDir.y = 0;
        if (this.tmpKnockbackDir.lengthSq() > 0.0001) {
          this.tmpKnockbackDir.normalize().multiplyScalar(0.6);
        }
        const died = enemy.takeDamage(dmg, this.tmpKnockbackDir);
        this.sound.playEnemyHit();
        this.combatSystem.onEnemyDamaged?.(enemy, dmg, died);
        if (died) {
          this.combatSystem.notifyEnemyDefeated(enemy);
        }
        this.syncMinecraftHud();
        return died;
      },
      onW1ResourceHit: (hitPos, dmg) => {
        const hitTree = this.forest.damageNearestTree(hitPos, dmg);
        if (hitTree) {
          this.sound.playWoodChop();
          this.multiplayer.broadcastResourceHit({
            resourceType: 'WORLD1_TREE',
            x: hitTree.pos.x,
            z: hitTree.pos.z,
            destroyed: hitTree.destroyed,
          });
          if (hitTree.destroyed) {
            this.sharedProgress.inventory.wood += 3;
            this.sharedProgress.inventory.woodPlanks += 2;
            this.sharedProgress.recordProgress('gather_wood', 3);
            this.sharedProgress.addXp(14);
            this.saveSharedBuilding();
            this.broadcastSharedProgressDelta();
            this.ui.showToast('🪵 قطعت شجرة (+3 خشب، +2 ألواح بناء)');
          }
          this.syncMinecraftHud();
          return true;
        }
        const hitRock = this.forest.damageNearestBoulder(hitPos, dmg);
        if (hitRock) {
          this.sound.playPickaxeHit();
          this.multiplayer.broadcastResourceHit({
            resourceType: 'WORLD1_BOULDER',
            x: hitRock.pos.x,
            z: hitRock.pos.z,
            destroyed: hitRock.destroyed,
          });
          if (hitRock.destroyed) {
            this.sharedProgress.inventory.stone += 3;
            this.sharedProgress.inventory.cobbleBlocks += 2;
            if (hitRock.kind === 'iron') {
              this.sharedProgress.inventory.iron += 1;
              this.sharedProgress.recordProgress('gather_iron', 1);
            }
            this.sharedProgress.recordProgress('gather_stone', 3);
            this.sharedProgress.addXp(16);
            this.saveSharedBuilding();
            this.broadcastSharedProgressDelta();
            this.ui.showToast('⛏️ استخرجت حجارة (+3 حجر، +2 طوب)');
          }
          this.syncMinecraftHud();
          return true;
        }
        return false;
      },
      w2Monsters: w2 ? w2.entities.spawns : undefined,
      onW2MonsterHit: (spawnId, dmg) => {
        if (!w2) return false;
        const spawn = w2.entities.spawns.find((s) => s.id === spawnId);
        if (!spawn || !spawn.alive) return false;
        const died = w2.entities.damageMonster(spawn, dmg);
        this.sound.playEnemyHit();
        this.syncMinecraftHud();
        return died;
      },
      onW2NodeHit: (hitPos, dmg) => {
        if (!w2) return false;
        const res = w2.landmarks.damageNearestNode(hitPos, dmg);
        if (!res) return false;
        w2.onNodeDamaged?.(res.nodeId, res.hp, res.destroyed);
        this.sound.playPickaxeHit();
        if (res.destroyed) {
          this.sharedProgress.inventory[res.kind] += 2;
          if (res.kind === 'wood') this.sharedProgress.recordProgress('gather_wood', 2);
          else if (res.kind === 'stone') this.sharedProgress.recordProgress('gather_stone', 2);
          else if (res.kind === 'iron') this.sharedProgress.recordProgress('gather_iron', 2);
          else if (res.kind === 'crystal') this.sharedProgress.recordProgress('gather_crystal', 2);
          else if (res.kind === 'food') this.sharedProgress.recordProgress('gather_food', 2);
          this.saveSharedBuilding();
          w2.saveState();
          this.broadcastSharedProgressDelta();
          this.ui.showToast(`✦ Harvested +2 ${res.kind}`);
        }
        this.syncMinecraftHud();
        return true;
      },
      onHitConfirm: (isKill) => {
        this.ui.triggerHitmarker(isKill);
      },
      onConsumeArrow: () => {
        if (this.sharedProgress.inventory.arrows > 0) {
          this.sharedProgress.inventory.arrows -= 1;
          this.syncMinecraftHud();
          this.saveSharedBuilding();
          this.darkRealm?.saveState();
          return true;
        }
        return false;
      },
      onShotFired: (weapon, origin, dir, power) => {
        this.multiplayer.broadcastWeaponShot(weapon, origin, dir, power);
      },
    });
  }

  public handleRemoteWeaponShot(
    weapon: 'pistol' | 'bow',
    origin: { x: number; y: number; z: number },
    dir: { x: number; y: number; z: number },
    power: number = 1.0
  ): void {
    this.tmpShotOrigin.set(origin.x, origin.y, origin.z);
    this.tmpShotDir.set(dir.x, dir.y, dir.z).normalize();
    this.weaponSystem.spawnRemoteShot(weapon, this.tmpShotOrigin, this.tmpShotDir, power);
    if (this.player.position.distanceToSquared(this.tmpShotOrigin) < 48 * 48) {
      if (weapon === 'pistol') this.sound.playPistolShoot();
      else this.sound.playBowRelease(power);
    }
  }

  private initUnderwaterBubbles(): void {
    this.bubblePositions = new Float32Array(this.bubbleCount * 3);
    this.bubbleSpeeds = new Float32Array(this.bubbleCount);
    for (let i = 0; i < this.bubbleCount; i++) {
      this.bubblePositions[i * 3 + 0] = (Math.random() - 0.5) * 18;
      this.bubblePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      this.bubblePositions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      this.bubbleSpeeds[i] = 0.8 + Math.random() * 1.6;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.bubblePositions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 2, 16, 16, 15);
    grad.addColorStop(0, 'rgba(220, 252, 255, 0.95)');
    grad.addColorStop(0.55, 'rgba(103, 232, 249, 0.55)');
    grad.addColorStop(1, 'rgba(0, 245, 212, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.PointsMaterial({
      size: 0.22,
      map: tex,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.bubblePoints = new THREE.Points(geo, mat);
    this.bubblePoints.frustumCulled = false;
    this.bubblePoints.visible = false;
    this.scene.add(this.bubblePoints);
  }

  private updateUnderwaterAtmosphere(dt: number, _timeSec: number): void {
    const camPos = this.cameraSystem.camera.position;
    let waterY: number | null = null;
    if (this.isInDarkRealm && this.darkRealm) {
      waterY = this.darkRealm.terrain.getWaterLevelAt(camPos.x, camPos.z);
    } else {
      const lakeDist = Math.hypot(camPos.x - Terrain.LAKE_CENTER.x, camPos.z - Terrain.LAKE_CENTER.y);
      waterY = lakeDist < Terrain.LAKE_RADIUS + 4 ? Terrain.LAKE_WATER_Y : Terrain.WATER_LEVEL;
    }

    const isUnderwater =
      this.state === GameState.PLAYING && waterY !== null && camPos.y < waterY - 0.08;

    if (isUnderwater !== this.wasCameraUnderwater) {
      this.wasCameraUnderwater = isUnderwater;
      this.sound.setUnderwater(isUnderwater);
      this.ui.setUnderwaterEffect(isUnderwater, this.isInDarkRealm);
      if (!this.isInDarkRealm && this.scene.fog && 'density' in this.scene.fog) {
        if (isUnderwater) {
          this.savedPreUnderwaterFogDensity = (this.scene.fog as THREE.FogExp2).density;
        } else {
          (this.scene.fog as THREE.FogExp2).density = this.savedPreUnderwaterFogDensity;
          (this.scene.fog as THREE.FogExp2).color.copy(this.savedDaySkyColor);
          if (this.scene.background && (this.scene.background as THREE.Color).copy) {
            (this.scene.background as THREE.Color).copy(this.savedDaySkyColor);
          }
        }
      }
    }

    if (isUnderwater) {
      const tint = this.isInDarkRealm ? this.underwaterDarkColor : this.underwaterColor;
      if (this.scene.fog && 'density' in this.scene.fog) {
        (this.scene.fog as THREE.FogExp2).color.copy(tint);
        (this.scene.fog as THREE.FogExp2).density = this.isInDarkRealm ? 0.026 : 0.032;
      }
      if (this.scene.background && (this.scene.background as THREE.Color).copy) {
        (this.scene.background as THREE.Color).copy(tint);
      }

      this.bubblePoints.visible = true;
      const surfaceLimit = waterY !== null ? waterY - 0.05 : camPos.y + 4;
      const attr = this.bubblePoints.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < this.bubbleCount; i++) {
        const idx = i * 3;
        this.bubblePositions[idx + 1] += this.bubbleSpeeds[i] * dt;
        const bx = this.bubblePositions[idx];
        const by = this.bubblePositions[idx + 1];
        const bz = this.bubblePositions[idx + 2];
        if (
          by > surfaceLimit ||
          by < camPos.y - 8 ||
          Math.abs(bx - camPos.x) > 12 ||
          Math.abs(bz - camPos.z) > 12
        ) {
          this.bubblePositions[idx] = camPos.x + (Math.random() - 0.5) * 16;
          this.bubblePositions[idx + 1] = camPos.y - 5.5 + Math.random() * 2.5;
          this.bubblePositions[idx + 2] = camPos.z + (Math.random() - 0.5) * 16;
        }
      }
      attr.needsUpdate = true;
    } else if (this.bubblePoints.visible) {
      this.bubblePoints.visible = false;
    }
  }

  public dispose(): void {
    this.clearPendingTimers();
    this.saveSharedBuilding();
    this.weaponSystem?.dispose();
    if (this.bubblePoints) {
      this.scene.remove(this.bubblePoints);
      this.bubblePoints.geometry?.dispose();
      const bMat = this.bubblePoints.material as THREE.PointsMaterial;
      bMat.map?.dispose();
      bMat.dispose();
    }
    this.world1VoxelBuilder?.dispose();
    this.darkRealm?.dispose();
    WorldLightPool.clearAll();
    this.villageHouses.dispose();
    this.companions.dispose();
    this.multiplayer.dispose();
    this.sound.dispose();
    this.renderer.dispose();
  }
}
