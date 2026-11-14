/**
 * ECHO – THE WORLD REMEMBERS
 * Professional Cinematic Main Menu, Pause Menu, Settings, Minimap, Lore Modal & Mobile Touch Controls
 * Inspired by the reference design with luminous typography and glowing ancient portal backdrop.
 */

import { CrystalData } from '../world/EchoCrystals.ts';
import { InteractiveTarget, AncientInscription, MemoryShard } from '../world/WorldInteractions.ts';
import { PlayerMemoryProfile, BIOMES, BiomeType } from '../world/EchoMemorySystem.ts';
import { QuestSystem, StoryQuest, QuestObjective, NarrativeStoryEvent } from '../story/QuestSystem.ts';
import { DialogueNode, DialogueOption } from '../npc/NPCManager.ts';
import { CombatStats } from '../combat/CombatSystem.ts';
import type { WeaponHudState, WeaponType } from '../combat/WeaponSystem.ts';
import {
  DarkRealmProgress,
  VoxelBlockKind,
  CRAFT_RECIPES,
  CraftRecipe,
  WEAPON_TIERS,
  ARMOR_TIERS,
  DarkQuest,
} from '../darkrealm/DarkRealmProgress.ts';
import { VOXEL_LABELS } from '../darkrealm/VoxelBuilder.ts';
import {
  ChatMessage,
  CharacterClass,
  MultiplayerInvite,
  RoomSummary,
  FriendEntry,
  VoicePeerState,
} from '../multiplayer/types.ts';
import type { MultiplayerCoordinator } from '../multiplayer/MultiplayerCoordinator.ts';

export type CustomizableControlId = 'joystick' | 'sprint' | 'jump' | 'attack' | 'dodge' | 'pulse' | 'interact';

export interface ControlPlacement {
  xPercent: number; // 0..1 horizontal ratio from left edge
  yPercent: number; // 0..1 vertical ratio from top edge
  scale: number;    // 0.70 .. 1.60
}

export type LayoutConfiguration = Record<CustomizableControlId, ControlPlacement>;

export interface UIEventCallbacks {
  onNewGame: () => void;
  onContinueGame: () => void;
  onOpenSettings: () => void;
  onExitGame: () => void;
  onToggleSound: () => void;
  onPauseToggle: () => void;
  onSaveGame: () => boolean;
  onResetPosition: () => void;
  onInteract: () => void;
  onJump: () => void;
  onTouchMove: (x: number, y: number, isSprint: boolean) => void;
  onTouchSprintToggle: () => boolean;
  onTouchSprintState?: (isPressed: boolean) => void;
  onUpdateVolume: (master: number, music: number) => void;
  onUpdateCameraSens: (sens: number) => void;
  getMemoryProfile: () => PlayerMemoryProfile;
  getQuestSystem?: () => QuestSystem;
  onCombatAttack?: () => void;
  onCombatDodge?: () => void;
  onCombatPulse?: () => void;
  onRespawnRequested?: () => void;
  getMultiplayerCoordinator?: () => any;
  onJoystickTouchState?: (touchId: number | null) => void;
  onQualityPresetChanged?: (preset: 'low' | 'medium' | 'ultra') => void;
  getCurrentQualityPreset?: () => 'low' | 'medium' | 'ultra';
  onEnterShadowRealm?: () => void;
  onOpenBuildMenu?: () => void;
  onRotateBlock?: () => void;
  onBreakBlock?: () => void;
  onExitBuildMode?: () => void;
  onSelectHotbarSlot?: (slotIdx: number) => void;
  onOpenDarkMap?: () => void;
  onOpenDarkQuests?: () => void;
  onCycleDarkCompanionMode?: () => void;
  onCycleDarkWeather?: () => void;
  onCastDarkFireball?: () => void;
  onReturnToIsland?: () => void;
  onToggleCameraMode?: () => boolean;
  onSelectWeapon?: (weapon: WeaponType) => void;
  onReloadWeapon?: () => void;
  onAttackHoldChange?: (held: boolean) => void;
  onSecondaryHoldChange?: (held: boolean) => void;
}

export class GameUI {
  public suppressOriginalHotkeys: boolean = false;
  private root: HTMLElement;
  private titleScreen!: HTMLElement;
  private inGameHUD!: HTMLElement;
  private loreModal!: HTMLElement;
  private victoryModal!: HTMLElement;
  private pauseModal!: HTMLElement;
  private settingsModal!: HTMLElement;
  private multiplayerModal!: HTMLElement;
  private inscriptionModal!: HTMLElement;
  private worldMemoryModal!: HTMLElement;
  private toastNotification!: HTMLElement;
  private interactPrompt!: HTMLElement;
  private crystalSlotsContainer!: HTMLElement;
  private minimapCanvas!: HTMLCanvasElement;
  private soundBtn!: HTMLElement;
  private sprintTouchBtn!: HTMLElement;
  private touchInteractBtn!: HTMLElement;
  private joystickBase!: HTMLElement;
  private joystickKnob!: HTMLElement;
  private continueBtn!: HTMLElement;
  private continueStatus!: HTMLElement;

  private shardCountText!: HTMLElement;
  private shardProgressFill!: HTMLElement;

  // Quest Tracker & Story System UI elements
  private questCluster!: HTMLElement;
  private questChapterBadge!: HTMLElement;
  private questTitleText!: HTMLElement;
  private questObjectiveBadge!: HTMLElement;
  private questObjectiveTitleAr!: HTMLElement;
  private questObjectiveTitleEn!: HTMLElement;
  private questObjectiveHint!: HTMLElement;
  private questProgressBar!: HTMLElement;
  private questProgressText!: HTMLElement;
  private objectiveCompleteBanner!: HTMLElement;
  private objectiveCompleteTitle!: HTMLElement;
  private objectiveCompleteNext!: HTMLElement;
  private storyNarrativeModal!: HTMLElement;
  private storyNarrativeBadge!: HTMLElement;
  private storyNarrativeTitleAr!: HTMLElement;
  private storyNarrativeTitleEn!: HTMLElement;
  private storyNarrativeContentAr!: HTMLElement;
  private storyNarrativeContentEn!: HTMLElement;
  private storyNarrativeQuoteAr!: HTMLElement;
  private storyNarrativeQuoteEn!: HTMLElement;
  private questLogModal!: HTMLElement;
  private questLogList!: HTMLElement;

  private loreTitleAr!: HTMLElement;
  private loreTitleEn!: HTMLElement;
  private loreTextAr!: HTMLElement;
  private loreTextEn!: HTMLElement;
  private loreLocation!: HTMLElement;

  private inscriptionTitleAr!: HTMLElement;
  private inscriptionTitleEn!: HTMLElement;
  private inscriptionGlyph!: HTMLElement;
  private inscriptionLocation!: HTMLElement;
  private inscriptionTextAr!: HTMLElement;
  private inscriptionTextEn!: HTMLElement;

  private isPaused: boolean = false;
  private isModalOpen: boolean = false;
  private isTouchSprinting: boolean = false;
  public isAutoRunning: boolean = false;

  // Control Layout Customization properties
  public isCustomizingControls: boolean = false;
  private selectedControlId: CustomizableControlId = 'joystick';
  private currentDraftLayout: LayoutConfiguration | null = null;
  private controlsLayer!: HTMLElement;
  private layoutEditorOverlay!: HTMLElement;
  private editorScaleSlider!: HTMLInputElement;
  private editorScaleValueText!: HTMLElement;
  private editorSelectedNameText!: HTMLElement;
  private editorOrientationBadge!: HTMLElement;
  private isDraggingControl: boolean = false;
  private dragStartPointer = { x: 0, y: 0 };
  private dragStartPos = { x: 0, y: 0 };
  private activeDragElement: HTMLElement | null = null;
  private openedFromTitleScreen: boolean = false;

  // NPC Dialogue System UI elements
  private npcDialogueModal!: HTMLElement;
  private npcPortraitImg!: HTMLImageElement;
  private npcTitleBadge!: HTMLElement;
  private npcNameAr!: HTMLElement;
  private npcNameEn!: HTMLElement;
  private npcDialogueMessageAr!: HTMLElement;
  private npcDialogueMessageEn!: HTMLElement;
  private npcDialogueOptionsContainer!: HTMLElement;
  private onDialogueOptionSelectedCallback: ((option: DialogueOption) => void) | null = null;

  // Combat System UI elements
  private playerHpBarFill!: HTMLElement;
  private playerHpText!: HTMLElement;
  private playerEnergyBarFill!: HTMLElement;
  private playerEnergyText!: HTMLElement;
  private playerPulseBadge!: HTMLElement;
  private hurtVignetteOverlay!: HTMLElement;
  private deathModal!: HTMLElement;
  private deathReviveBtn!: HTMLElement;
  private touchAttackBtn!: HTMLElement;
  private touchDodgeBtn!: HTMLElement;
  private touchPulseBtn!: HTMLElement;
  private onDeathReviveCallback: (() => void) | null = null;

  // Minecraft-style HUD elements
  private mcXpLevelEl!: HTMLElement;
  private mcXpFillEl!: HTMLElement;
  private mcHotbarEl!: HTMLElement;
  private mcCrystalCountEl!: HTMLElement;
  private shadowRealmStatusBadge!: HTMLElement;
  private toastTimer: number | null = null;

  // Shared House Building & Crafting UI (World 1 & World 2)
  private buildCraftModal!: HTMLElement;
  private buildCraftBody!: HTMLElement;
  private buildModeBar!: HTMLElement;
  private buildModeBlockLabel!: HTMLElement;
  private buildCrosshairEl!: HTMLElement;
  private isBuildModeActive: boolean = false;
  private isCursorLockedCrosshair: boolean = false;
  private activeBuildTab: 'build' | 'gear' = 'build';
  private buildCraftCallbacks: {
    onSelectBlock: (kind: VoxelBlockKind) => void;
    onToggleBuildMode: () => void;
    onCraft: (recipe: CraftRecipe) => void;
    onQuickBuildHouse: () => void;
    onUpgradeStat?: (stat: keyof DarkRealmProgress['statRanks']) => boolean | void;
  } | null = null;
  private darkQuickBarEl!: HTMLElement;
  private darkBossBarEl!: HTMLElement;
  private darkBossNameEl!: HTMLElement;
  private darkBossFillEl!: HTMLElement;
  private darkCompanionQuickBtn!: HTMLElement;
  private darkWeatherQuickBtn!: HTMLElement;
  private pauseReturnIslandBtn!: HTMLElement;

  // Joystick & sprint touch state
  private joystickTouchId: number | null = null;
  private sprintTouchId: number | null = null;
  private sprintPointerId: number | null = null;
  private isSprintHeld: boolean = false;
  private sprintPressTime: number = 0;
  private joystickCenter = { x: 0, y: 0 };
  private joystickRadius = 55;

  // Adaptive PC/Mobile & Live Multiplayer/Chat/Voice UI state
  private isMobileDevice: boolean = false;
  private mpChatPanel!: HTMLElement;
  private mpChatMessagesEl!: HTMLElement;
  private mpChatInput!: HTMLInputElement;
  private activeChatChannel: 'ROOM' | 'PARTY' | 'FRIENDS' = 'ROOM';
  private isChatCollapsed: boolean = false;
  private unreadChatCount: number = 0;
  private underwaterOverlay!: HTMLElement;
  private cameraModeBtn!: HTMLElement;
  private cameraModeLabelEl!: HTMLElement;
  private weaponAmmoBadgeEl!: HTMLElement;
  private weaponReloadBtn!: HTMLElement;
  private weaponAimBtn: HTMLElement | null = null;
  private weaponSwitchBtns: HTMLElement[] = [];
  private mcHotbarSlots: HTMLElement[] = [];
  private mcSlotCountEls: Partial<Record<number, HTMLElement>> = {};
  private sprintSpans: NodeListOf<HTMLSpanElement> | null = null;
  private interactLabelEl: HTMLElement | null = null;
  private interactTouchSpans: NodeListOf<HTMLSpanElement> | null = null;
  private bowDrawMeterFillEl!: HTMLElement;
  private bowDrawMeterEl!: HTMLElement;
  private isCombatReticleActive: boolean = false;
  private hitmarkerTimer: number | null = null;
  private lastWeaponHudKey: string = '';
  private lastAutoRunState: boolean | null = null;
  private lastCombatStatsKey: string = '';
  private lastBuildBarKey: string = '';
  private lastMcHudKey: string = '';
  private lastInteractKey: string = '';
  private currentWeaponState: WeaponHudState = {
    weapon: 'sword',
    ammoInMag: 12,
    magSize: 12,
    isReloading: false,
    reloadProgress: 1,
    bowDraw: 0,
    isBlocking: false,
    isAiming: false,
    arrowsCount: 24,
  };
  private activeMpTab: 'rooms' | 'party' | 'friends' | 'voice' = 'rooms';
  private voicePermModal!: HTMLElement;
  private mpInviteToast!: HTMLElement;
  private mpPortalToast!: HTMLElement;
  private activeToastInviteId: string | null = null;
  private pendingPortalTravel: { targetRealm: 'ISLAND' | 'DARK_REALM'; crystalsCount?: number } | null = null;
  private portalToastTimer: number | null = null;
  private mpBindingsInitialized: boolean = false;

  constructor(private callbacks: UIEventCallbacks) {
    this.root = document.getElementById('root') || document.body;
    this.buildDOM();
    this.setupVirtualJoystick();
  }

  private buildDOM(): void {
    const existing = document.getElementById('echo-ui-wrapper');
    if (existing) existing.remove();

    const wrapper = document.createElement('div');
    wrapper.id = 'echo-ui-wrapper';
    wrapper.innerHTML = `
      <style>
        #echo-ui-wrapper {
          position: absolute;
          inset: 0;
          pointer-events: none;
          user-select: none;
          -webkit-user-select: none;
          font-family: 'Plus Jakarta Sans', 'Google Sans', sans-serif;
          color: #ffffff;
          overflow: hidden;
          z-index: 20;
        }

        .interactive {
          pointer-events: auto;
        }

        /* Cinematic Main Menu */
        #title-screen {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1rem;
          padding: clamp(1.2rem, 4vw, 4rem);
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          overscroll-behavior: contain;
          background: linear-gradient(
            to right,
            rgba(4, 9, 16, 0.92) 0%,
            rgba(4, 9, 16, 0.72) 38%,
            rgba(4, 9, 16, 0.25) 70%,
            rgba(4, 9, 16, 0.4) 100%
          );
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s;
          pointer-events: auto;
          box-sizing: border-box;
        }

        #title-screen.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* Top-Left / Left Menu Column */
        .title-brand-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 460px;
        }

        .title-brand-lockup {
          margin-bottom: 2.4rem;
        }

        .title-main-glow {
          font-family: 'Cinzel', serif;
          font-size: clamp(3.2rem, 8vw, 5.8rem);
          font-weight: 900;
          letter-spacing: 0.35rem;
          line-height: 0.95;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 30%, #70e1ff 75%, #00b4d8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 28px rgba(0, 245, 212, 0.65));
        }

        .title-tagline {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.75rem, 1.8vw, 1.05rem);
          font-weight: 700;
          letter-spacing: 0.25rem;
          color: #7ce8ff;
          text-transform: uppercase;
          margin-top: 0.5rem;
          opacity: 0.95;
          text-shadow: 0 0 12px rgba(0, 180, 216, 0.6);
        }

        .title-arabic-sub {
          font-family: 'Amiri', serif;
          font-size: clamp(1.2rem, 2.4vw, 1.7rem);
          color: #c4e9e4;
          margin-top: 0.35rem;
          letter-spacing: 0.05rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
        }

        /* Menu Options Stack (Inspired by reference screenshot) */
        .menu-options-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.15rem;
          margin-top: 0.5rem;
        }

        .menu-nav-btn {
          position: relative;
          background: none;
          border: none;
          padding: 0.5rem 0;
          font-family: 'Cinzel', serif;
          font-size: clamp(1.25rem, 2.6vw, 1.75rem);
          font-weight: 700;
          letter-spacing: 0.16rem;
          color: #a5d8ea;
          cursor: pointer;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          transition: all 0.25s ease;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        .menu-nav-btn::before {
          content: '';
          display: inline-block;
          width: 0;
          height: 3px;
          background: #00f5d4;
          box-shadow: 0 0 12px #00f5d4;
          border-radius: 2px;
          transition: width 0.25s ease;
        }

        .menu-nav-btn:hover {
          color: #ffffff;
          transform: translateX(8px);
          text-shadow: 0 0 18px rgba(0, 245, 212, 0.85);
        }

        .menu-nav-btn:hover::before {
          width: 22px;
        }

        .menu-nav-btn.primary {
          color: #00f5d4;
        }

        .menu-nav-btn .sub-label {
          font-family: 'Amiri', serif;
          font-size: clamp(0.95rem, 1.8vw, 1.2rem);
          color: #72a5b8;
          font-weight: 400;
          letter-spacing: 0;
          text-transform: none;
          margin-left: 0.4rem;
        }

        .menu-nav-btn:hover .sub-label {
          color: #c4f5ea;
        }

        .btn-status-badge {
          font-size: 0.72rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: rgba(0, 245, 212, 0.18);
          border: 1px solid rgba(0, 245, 212, 0.4);
          color: #80ffea;
          padding: 0.15rem 0.6rem;
          border-radius: 9999px;
          letter-spacing: 0.05rem;
        }

        /* Bottom Menu Footer Hints */
        .title-bottom-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          border-top: 1px solid rgba(0, 245, 212, 0.15);
          padding-top: 1.2rem;
          font-size: 0.85rem;
          color: #78a2b5;
        }

        .controls-hint-inline {
          display: flex;
          gap: 1.2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .controls-hint-inline kbd {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(0, 245, 212, 0.3);
          border-radius: 4px;
          padding: 0.15rem 0.45rem;
          color: #00f5d4;
          font-size: 0.75rem;
        }

        /* In-Game HUD */
        #ingame-hud {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.4rem;
          transition: opacity 0.4s ease;
        }

        #ingame-hud.hidden {
          display: none;
        }

        .hud-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .quest-cluster {
          display: none !important;
          background: rgba(8, 18, 30, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 245, 212, 0.35);
          border-radius: 12px;
          padding: 0.55rem 0.75rem;
          flex-direction: column;
          gap: 0.3rem;
          max-width: 295px;
          margin-top: 6px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5), inset 0 0 12px rgba(0, 245, 212, 0.06);
          transition: all 0.3s ease;
          pointer-events: auto;
        }

        .quest-cluster.open {
          display: flex !important;
        }

        /* Minecraft Top-Left Player Card */
        #mc-player-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          pointer-events: auto;
        }

        .mc-top-status-row {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(10, 14, 22, 0.55);
          padding: 4px 8px 4px 4px;
          border-radius: 6px;
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.45);
        }

        .mc-avatar-frame {
          width: 46px;
          height: 46px;
          background: #1b2230;
          border: 2px solid #d1d5db;
          box-shadow: inset 0 0 0 2px #0f172a, 0 2px 6px rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .mc-bars-col {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 132px;
        }

        .mc-bar-row {
          position: relative;
          display: flex;
          align-items: center;
          height: 16px;
          padding-left: 10px;
        }

        .mc-bar-icon {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          z-index: 3;
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.9));
        }

        .mc-bar-track {
          position: relative;
          width: 124px;
          height: 15px;
          background: #1f242d;
          border: 1.5px solid #090c12;
          box-shadow: inset 0 2px 3px rgba(0, 0, 0, 0.7);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mc-bar-fill {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          transition: width 0.2s ease;
        }

        .mc-bar-fill.hp {
          background: linear-gradient(180deg, #ef4444 0%, #dc2626 55%, #991b1b 100%);
        }

        .mc-bar-fill.hp.low {
          animation: pulseHealth 0.7s infinite alternate;
        }

        .mc-bar-fill.energy {
          background: linear-gradient(180deg, #38bdf8 0%, #2563eb 55%, #1e40af 100%);
        }

        .mc-bar-value {
          position: relative;
          z-index: 2;
          font-size: 0.72rem;
          font-weight: 800;
          color: #ffffff;
          text-shadow: 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
          letter-spacing: 0.02rem;
        }

        .mc-sub-pills-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .mc-crystal-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(15, 20, 32, 0.78);
          border: 1.5px solid rgba(168, 85, 247, 0.65);
          border-radius: 6px;
          padding: 2px 8px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #e9d5ff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
        }

        .mc-quest-pill-btn {
          background: rgba(15, 20, 32, 0.78);
          border: 1.5px solid rgba(56, 189, 248, 0.55);
          border-radius: 6px;
          padding: 2px 8px;
          font-size: 0.7rem;
          font-weight: 800;
          color: #bae6fd;
          cursor: pointer;
        }

        .quest-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.45rem;
          border-bottom: 1px solid rgba(0, 245, 212, 0.18);
          padding-bottom: 0.3rem;
        }

        .quest-chapter-badge {
          font-family: 'Cinzel', serif;
          font-size: 0.64rem;
          letter-spacing: 0.1rem;
          color: #fee440;
          font-weight: 700;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .quest-title-text {
          font-family: 'Cinzel', serif;
          font-size: 0.82rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.05rem;
          text-shadow: 0 0 10px rgba(0, 245, 212, 0.5);
        }

        .quest-journal-shortcut-btn {
          background: rgba(0, 245, 212, 0.1);
          border: 1px solid rgba(0, 245, 212, 0.3);
          border-radius: 6px;
          color: #80ffea;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.2s ease;
        }

        .quest-journal-shortcut-btn:hover {
          background: rgba(0, 245, 212, 0.22);
          color: #ffffff;
          border-color: #00f5d4;
          transform: scale(1.03);
        }

        .quest-objective-active-card {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(254, 228, 64, 0.22);
          border-radius: 9px;
          padding: 0.45rem 0.65rem;
          display: flex;
          flex-direction: column;
          gap: 0.22rem;
        }

        .quest-objective-headline {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .quest-step-pill {
          background: linear-gradient(135deg, #00f5d4, #00bbf9);
          color: #041018;
          font-weight: 900;
          font-size: 0.65rem;
          padding: 0.1rem 0.35rem;
          border-radius: 9999px;
          letter-spacing: 0.03rem;
          box-shadow: 0 0 8px rgba(0, 245, 212, 0.45);
        }

        .quest-objective-names {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .quest-objective-name-ar {
          font-family: 'Amiri', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
        }

        .quest-objective-name-en {
          font-size: 0.68rem;
          color: #80ffea;
          opacity: 0.85;
          letter-spacing: 0.03rem;
        }

        .quest-objective-hint-text {
          font-size: 0.7rem;
          color: #c4e9e4;
          line-height: 1.3;
          display: flex;
          align-items: flex-start;
          gap: 0.25rem;
          background: rgba(254, 228, 64, 0.06);
          border-left: 2px solid #fee440;
          padding: 0.25rem 0.4rem;
          border-radius: 4px;
        }

        .quest-progress-track {
          width: 100%;
          height: 5px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          overflow: hidden;
          margin-top: 0.1rem;
        }

        .quest-progress-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #00f5d4, #fee440);
          box-shadow: 0 0 10px #00f5d4;
          border-radius: 9999px;
          transition: width 0.4s ease;
        }

        /* Objective Complete Sliding Top Banner (hidden) */
        #objective-complete-banner {
          display: none !important;
          position: absolute;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%) translateY(-120%);
          background: linear-gradient(135deg, rgba(8, 22, 36, 0.96) 0%, rgba(14, 38, 54, 0.98) 100%);
          border: 1.5px solid #fee440;
          border-radius: 20px;
          padding: 0.85rem 2.2rem;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          box-shadow: 0 10px 45px rgba(254, 228, 64, 0.45), 0 0 30px rgba(0, 245, 212, 0.3);
          z-index: 60;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
          opacity: 0;
          pointer-events: none;
          text-align: center;
          min-width: 320px;
        }

        #objective-complete-banner.show {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }

        .banner-kicker {
          font-family: 'Cinzel', serif;
          font-size: 0.8rem;
          letter-spacing: 0.2rem;
          color: #fee440;
          font-weight: 800;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(254, 228, 64, 0.8);
        }

        .banner-title {
          font-family: 'Amiri', serif;
          font-size: 1.55rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .banner-next-unlocked {
          font-size: 0.85rem;
          color: #80ffea;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Story Narrative Dialog Card */
        #story-narrative-modal .modal-card {
          max-width: 650px;
          border: 1.5px solid #00f5d4;
          background: linear-gradient(
            165deg,
            rgba(10, 24, 38, 0.98) 0%,
            rgba(6, 15, 24, 0.99) 50%,
            rgba(4, 9, 16, 0.99) 100%
          );
          box-shadow: 0 10px 60px rgba(0, 245, 212, 0.35), 0 0 30px rgba(0, 180, 216, 0.25);
          position: relative;
        }

        #story-narrative-modal .modal-card::before {
          content: '';
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 240px;
          height: 120px;
          background: radial-gradient(ellipse at center, rgba(0, 245, 212, 0.45) 0%, transparent 70%);
          pointer-events: none;
        }

        .story-narrative-text-box {
          background: rgba(0, 0, 0, 0.38);
          border: 1px solid rgba(0, 245, 212, 0.25);
          border-radius: 16px;
          padding: 1.3rem 1.6rem;
          text-align: right;
          direction: rtl;
          margin: 0.4rem 0;
        }

        .story-narrative-ar {
          font-family: 'Amiri', serif;
          font-size: 1.35rem;
          line-height: 1.85;
          color: #f0f7f4;
          margin: 0;
          white-space: pre-line;
        }

        .story-narrative-en {
          font-size: 0.92rem;
          line-height: 1.6;
          color: #a5d8ea;
          margin-top: 0.8rem;
          padding-top: 0.8rem;
          border-top: 1px dashed rgba(0, 245, 212, 0.2);
          text-align: left;
          direction: ltr;
        }

        /* Quest Journal Checklist Items */
        .quest-checklist-item {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 0.85rem 1.1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
          transition: all 0.25s ease;
        }

        .quest-checklist-item.completed {
          background: rgba(0, 245, 212, 0.07);
          border-color: rgba(0, 245, 212, 0.35);
        }

        .quest-checklist-item.active {
          background: rgba(254, 228, 64, 0.09);
          border-color: rgba(254, 228, 64, 0.45);
          box-shadow: 0 0 16px rgba(254, 228, 64, 0.2);
        }

        .quest-checklist-item.locked {
          opacity: 0.45;
        }

        .quest-status-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .quest-status-icon.done {
          background: #00f5d4;
          color: #041018;
          box-shadow: 0 0 10px #00f5d4;
        }

        .quest-status-icon.current {
          background: #fee440;
          color: #041018;
          box-shadow: 0 0 12px #fee440;
          animation: pulseIcon 1.5s infinite;
        }

        .quest-status-icon.lock {
          background: rgba(255, 255, 255, 0.1);
          color: #728994;
        }

        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }

        .crystal-slots {
          display: flex;
          gap: 0.45rem;
          margin-top: 0.2rem;
        }

        .crystal-slot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .crystal-slot.active {
          box-shadow: 0 0 10px currentColor;
          transform: scale(1.15);
        }

        .hud-actions {
          display: flex;
          gap: 0.6rem;
        }

        .icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(10, 22, 34, 0.82);
          border: 1px solid rgba(0, 245, 212, 0.3);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .icon-btn:hover {
          background: rgba(0, 245, 212, 0.25);
          border-color: #00f5d4;
          transform: scale(1.06);
        }

        /* Minimap / Minecraft Compass */
        .mc-compass-wrap {
          position: relative;
          width: 112px;
          height: 112px;
          flex-shrink: 0;
          pointer-events: auto;
        }

        .minimap-box {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2.5px solid #cbd5e1;
          background: rgba(12, 22, 16, 0.88);
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.65), inset 0 0 0 2px #0f172a;
        }

        .mc-compass-dir {
          position: absolute;
          background: #111827;
          border: 1px solid #cbd5e1;
          color: #ffffff;
          font-size: 0.62rem;
          font-weight: 900;
          line-height: 1;
          padding: 2px 4px;
          border-radius: 3px;
          z-index: 5;
          pointer-events: none;
          text-shadow: 0 1px 2px #000;
        }
        .mc-compass-dir.n { top: -6px; left: 50%; transform: translateX(-50%); color: #fef08a; }
        .mc-compass-dir.s { bottom: -6px; left: 50%; transform: translateX(-50%); }
        .mc-compass-dir.w { left: -6px; top: 50%; transform: translateY(-50%); }
        .mc-compass-dir.e { right: -6px; top: 50%; transform: translateY(-50%); }

        #minimap-canvas {
          width: 100%;
          height: 100%;
        }

        /* Interaction Prompt */
        #interact-prompt {
          position: absolute;
          bottom: 7.2rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(10, 22, 34, 0.92);
          border: 1.5px solid #00f5d4;
          border-radius: 9999px;
          padding: 0.75rem 1.8rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          font-size: 0.95rem;
          color: #ffffff;
          box-shadow: 0 0 25px rgba(0, 245, 212, 0.45);
          transition: all 0.3s ease;
          opacity: 0;
          visibility: hidden;
          cursor: pointer;
        }

        #interact-prompt.visible {
          opacity: 1;
          visibility: visible;
        }

        #interact-prompt kbd {
          background: #00f5d4;
          color: #061019;
          font-weight: 800;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
        }

        /* Touch Controls Layer & Customizable Controls */
        #touch-controls-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 25;
        }

        .customizable-control {
          position: absolute !important;
          pointer-events: auto;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          transform-origin: center center;
          transition: box-shadow 0.2s ease, outline 0.2s ease;
        }

        .control-edit-badge {
          display: none;
          position: absolute;
          top: -24px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(4, 18, 28, 0.95);
          border: 1px solid #00f5d4;
          color: #00f5d4;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 9999px;
          white-space: nowrap;
          pointer-events: none;
          z-index: 40;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        .hud-editing .control-edit-badge {
          display: block;
        }

        .hud-editing .customizable-control {
          outline: 2px dashed rgba(0, 245, 212, 0.75);
          outline-offset: 4px;
          cursor: grab;
        }

        .hud-editing .customizable-control:active {
          cursor: grabbing;
        }

        .hud-editing .customizable-control.selected-edit-target {
          outline: 3px solid #ffffff;
          outline-offset: 4px;
          box-shadow: 0 0 25px rgba(0, 245, 212, 0.95), 0 0 40px rgba(0, 180, 216, 0.6);
        }

        /* Minecraft Cross D-Pad Touch Controls */
        #virtual-joystick-container {
          width: 138px;
          height: 138px;
        }

        #joystick-base {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 3px;
          align-items: stretch;
          justify-items: stretch;
          pointer-events: none;
        }

        .mc-dpad-arm {
          background: rgba(34, 38, 46, 0.68);
          border: 2px solid rgba(226, 232, 240, 0.42);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 3px 8px rgba(0, 0, 0, 0.45);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(248, 250, 252, 0.88);
          font-size: 0.95rem;
          font-weight: 900;
          transition: background 0.1s ease, border-color 0.1s ease;
        }

        .mc-dpad-arm.active {
          background: rgba(71, 85, 105, 0.92);
          border-color: #ffffff;
          color: #ffffff;
        }

        .mc-dpad-up { grid-column: 2; grid-row: 1; }
        .mc-dpad-left { grid-column: 1; grid-row: 2; }
        .mc-dpad-center { grid-column: 2; grid-row: 2; font-size: 1rem; background: rgba(26, 30, 38, 0.72); }
        .mc-dpad-right { grid-column: 3; grid-row: 2; }
        .mc-dpad-down { grid-column: 2; grid-row: 3; }

        #joystick-knob {
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -17px;
          margin-top: -17px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.16);
          border: 2px solid rgba(255, 255, 255, 0.55);
          transform: translate(0px, 0px);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.12s ease;
        }

        #virtual-joystick-container.dragging #joystick-knob {
          opacity: 1;
        }

        /* Fullscreen HUD Controls Layout Editor (Edit Mode) */
        #hud-layout-editor-overlay {
          position: absolute;
          inset: 0;
          background: rgba(4, 9, 16, 0.72);
          backdrop-filter: blur(4px);
          pointer-events: none;
          z-index: 2000;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.8rem 1.2rem;
          box-sizing: border-box;
        }

        #hud-layout-editor-overlay.active {
          display: flex;
          pointer-events: none;
        }

        .editor-toolbar {
          pointer-events: auto !important;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.8rem;
          background: rgba(8, 20, 32, 0.96);
          border: 1.5px solid rgba(0, 245, 212, 0.65);
          border-radius: 18px;
          padding: 0.75rem 1.25rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.85);
          z-index: 2200 !important;
        }

        .editor-toolbar button,
        .editor-toolbar input {
          pointer-events: auto !important;
          touch-action: manipulation;
        }

        .editor-footer {
          pointer-events: auto !important;
          align-self: center;
          background: rgba(8, 20, 32, 0.94);
          border: 1px solid rgba(0, 245, 212, 0.55);
          border-radius: 9999px;
          padding: 0.55rem 1.5rem;
          font-size: 0.85rem;
          color: #e2f1f8;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.75);
          text-align: center;
          z-index: 2200 !important;
          user-select: none;
        }

        .hud-editing #touch-controls-layer {
          z-index: 1000 !important;
          pointer-events: none !important;
        }

        .hud-editing .customizable-control {
          z-index: 1500 !important;
          pointer-events: auto !important;
        }

        /* Mobile Touch Action Cluster (Minecraft Square Buttons) */
        .action-touch-btn {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: rgba(28, 33, 42, 0.72);
          border: 2px solid rgba(226, 232, 240, 0.45);
          color: #f8fafc;
          font-weight: 800;
          font-size: 0.72rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.55);
          cursor: pointer;
          touch-action: none;
          transition: transform 0.12s ease, background 0.12s ease, border-color 0.12s ease;
        }

        .action-touch-btn.mc-jump-square {
          width: 56px;
          height: 56px;
          border-radius: 10px;
          border: 2px solid rgba(241, 245, 249, 0.52);
          background: rgba(30, 35, 44, 0.74);
        }

        .action-touch-btn.active,
        .action-touch-btn:active {
          background: rgba(100, 116, 139, 0.9);
          border-color: #ffffff;
          color: #ffffff;
          transform: scale(0.93);
        }

        .action-touch-btn.auto-run-active {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.92) 0%, rgba(16, 185, 129, 0.92) 100%) !important;
          color: #04121a !important;
          border-color: #ffffff !important;
          box-shadow: 0 0 16px rgba(34, 197, 94, 0.85) !important;
        }

        .action-touch-btn.auto-run-active span {
          color: #04121a !important;
          font-weight: 900 !important;
        }

        .action-touch-btn span:first-child {
          font-size: 0.74rem;
          font-weight: 800;
          line-height: 1.05;
        }

        .action-touch-btn span:last-child {
          font-family: 'Amiri', serif;
          font-size: 0.64rem;
          opacity: 0.88;
          line-height: 1;
        }

        /* Modals: Lore, Victory, Pause, Settings */
        .modal-overlay {
          position: absolute;
          inset: 0;
          z-index: 100;
          background: rgba(4, 9, 15, 0.88);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: clamp(0.75rem, 3vw, 2rem);
          box-sizing: border-box;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          overscroll-behavior: contain;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.18s ease, visibility 0.18s ease;
          pointer-events: auto;
        }

        /* Ensure Settings & Multiplayer overlays always stack above Pause Menu */
        #settings-modal,
        #multiplayer-hub-modal {
          z-index: 120;
        }

        .modal-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .modal-overlay:not(.open) {
          pointer-events: none;
        }

        .modal-card {
          background: linear-gradient(145deg, rgba(14, 28, 43, 0.96) 0%, rgba(8, 16, 26, 0.98) 100%);
          border: 1.5px solid rgba(0, 245, 212, 0.45);
          border-radius: 24px;
          padding: clamp(1.1rem, 3vw, 2.2rem);
          max-width: 560px;
          width: 100%;
          max-height: min(90dvh, calc(100dvh - 1.5rem));
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          overscroll-behavior: contain;
          margin: auto;
          box-sizing: border-box;
          box-shadow: 0 10px 50px rgba(0, 245, 212, 0.28);
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          transform: translateY(14px);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-card button,
        .modal-card select,
        .modal-card input:not([type="range"]) {
          touch-action: manipulation;
        }

        .modal-card input[type="range"] {
          touch-action: pan-x;
        }

        .modal-overlay.open .modal-card {
          transform: translateY(0);
        }

        .modal-badge {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          letter-spacing: 0.2rem;
          color: #00f5d4;
          text-transform: uppercase;
        }

        .modal-title-ar {
          font-family: 'Amiri', serif;
          font-size: 2.2rem;
          color: #ffffff;
          margin: 0;
        }

        .modal-title-en {
          font-family: 'Cinzel', serif;
          font-size: 1.25rem;
          color: #80ffea;
          margin: 0;
        }

        .modal-btn {
          align-self: center;
          background: linear-gradient(135deg, #00f5d4 0%, #00bbf9 100%);
          color: #061924;
          border: none;
          padding: 0.85rem 2.2rem;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.1rem;
          border-radius: 9999px;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(0, 245, 212, 0.4);
          transition: transform 0.2s ease;
        }

        .modal-btn:hover {
          transform: scale(1.04);
        }

        .modal-btn.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          box-shadow: none;
          border: 1px solid rgba(0, 245, 212, 0.3);
        }

        .modal-btn.secondary:hover {
          background: rgba(0, 245, 212, 0.2);
          border-color: #00f5d4;
        }

        /* Settings Sliders & Controls */
        .setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.95rem;
        }

        .setting-label {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2rem;
        }

        .setting-sub {
          font-size: 0.78rem;
          color: #72a5b8;
        }

        input[type="range"] {
          accent-color: #00f5d4;
          cursor: pointer;
          width: 140px;
        }

        /* Toast Notifications */
        #toast-notification {
          position: absolute;
          top: 4.5rem;
          left: 50%;
          transform: translateX(-50%) translateY(-20px);
          background: rgba(12, 20, 32, 0.94);
          border: 1.5px solid #c084fc;
          color: #ffffff;
          padding: 0.55rem 1.35rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.55);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 65;
          max-width: min(520px, 90vw);
          text-align: center;
        }

        #toast-notification.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        /* Minecraft Bottom-Center XP Bar + 8-Slot Hotbar */
        .combat-cluster {
          position: absolute;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          width: auto;
          background: transparent !important;
          border: none !important;
          pointer-events: auto;
          z-index: 26;
        }

        .mc-xp-container {
          position: relative;
          width: 100%;
          max-width: 396px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .mc-xp-level {
          font-size: 0.9rem;
          font-weight: 900;
          color: #4ade80;
          text-shadow: 1px 1px 0 #052e16, -1px -1px 0 #052e16, 1px -1px 0 #052e16, -1px 1px 0 #052e16;
          line-height: 1;
          margin-bottom: 1px;
        }

        .mc-xp-bar {
          position: relative;
          width: 100%;
          height: 8px;
          background: rgba(15, 23, 42, 0.9);
          border: 1.5px solid #090c12;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.65);
        }

        .mc-xp-fill {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 15%;
          background: linear-gradient(180deg, #86efac 0%, #22c55e 55%, #15803d 100%);
          transition: width 0.25s ease;
        }

        .mc-xp-segments {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent calc(100% / 18 - 1px),
            rgba(0, 0, 0, 0.55) calc(100% / 18 - 1px),
            rgba(0, 0, 0, 0.55) calc(100% / 18)
          );
        }

        #mc-hotbar {
          display: flex;
          align-items: center;
          background: rgba(22, 26, 34, 0.84);
          border: 2px solid #0f172a;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255, 255, 255, 0.14);
          padding: 2px;
          gap: 2px;
          pointer-events: auto;
        }

        .mc-hotbar-slot {
          position: relative;
          width: 44px;
          height: 44px;
          background: rgba(34, 40, 50, 0.85);
          border: 2px solid #475569;
          box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.45), inset -1px -1px 0 rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          touch-action: manipulation;
          padding: 0;
          transition: transform 0.1s ease, border-color 0.1s ease;
        }

        .mc-hotbar-slot.active {
          border: 2.5px solid #38bdf8;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.85), inset 0 0 0 1px #ffffff;
          background: rgba(45, 58, 76, 0.95);
          transform: translateY(-1px);
          z-index: 2;
        }

        .mc-slot-count {
          position: absolute;
          right: 2px;
          bottom: 1px;
          font-size: 0.66rem;
          font-weight: 900;
          color: #ffffff;
          text-shadow: 1px 1px 0 #000, -1px -1px 0 #000;
          line-height: 1;
          pointer-events: none;
        }

        #portrait-rotate-prompt {
          display: none !important;
        }

        /* Screen Orientation: Compact Adaptations */
        @media (orientation: portrait), (max-width: 920px), (max-height: 560px) {
          #ingame-hud {
            padding: 0.55rem 0.75rem;
          }
          .mc-compass-wrap {
            width: 82px;
            height: 82px;
          }
          .mc-avatar-frame {
            width: 38px;
            height: 38px;
          }
          .mc-bar-track {
            width: 102px;
            height: 13px;
          }
          .mc-bar-value {
            font-size: 0.62rem;
          }
          .icon-btn {
            width: 34px;
            height: 34px;
          }
          .icon-btn svg {
            width: 16px;
            height: 16px;
          }
          #virtual-joystick-container {
            width: 122px;
            height: 122px;
          }
          .mc-hotbar-slot {
            width: 35px;
            height: 35px;
          }
          .mc-hotbar-slot svg {
            width: 22px;
            height: 22px;
          }
          .mc-slot-count {
            font-size: 0.58rem;
          }
          .mc-xp-container {
            max-width: 312px;
          }
          .mc-xp-level {
            font-size: 0.78rem;
          }
          .mc-xp-bar {
            height: 6px;
          }
          .action-touch-btn {
            width: 40px;
            height: 40px;
          }
          .action-touch-btn.mc-jump-square {
            width: 50px;
            height: 50px;
          }
          .combat-touch-btn.attack {
            width: 50px;
            height: 50px;
          }
          .combat-touch-btn {
            width: 40px;
            height: 40px;
          }
          #interact-prompt {
            bottom: 4.8rem;
            padding: 0.45rem 1.1rem;
            font-size: 0.78rem;
          }
        }

        @media (orientation: landscape) and (max-height: 560px) {
          #title-screen {
            padding: 1rem 1.8rem;
            gap: 0.65rem;
          }
          .title-brand-lockup {
            margin-bottom: 0.75rem;
          }
          .title-main-glow {
            font-size: clamp(2.2rem, 6vw, 3.2rem);
          }
          .title-tagline {
            font-size: 0.72rem;
            margin-top: 0.25rem;
          }
          .title-arabic-sub {
            font-size: 1rem;
            margin-top: 0.2rem;
          }
          .menu-options-stack {
            gap: 0.35rem;
            margin-top: 0.2rem;
          }
          .menu-nav-btn {
            font-size: clamp(0.95rem, 2.2vw, 1.18rem);
            padding: 0.28rem 0;
            gap: 0.55rem;
          }
          .menu-nav-btn .sub-label {
            font-size: 0.9rem;
          }
          .title-bottom-footer {
            padding-top: 0.55rem;
            font-size: 0.74rem;
            gap: 0.5rem;
            flex-wrap: wrap;
          }
          .modal-overlay {
            padding: 0.65rem;
          }
          .modal-card {
            padding: 1rem 1.25rem;
            gap: 0.65rem;
            max-height: min(94dvh, calc(100dvh - 1.3rem));
            border-radius: 18px;
          }
          .modal-title-ar {
            font-size: 1.55rem;
          }
          .modal-title-en {
            font-size: 1rem;
          }
        }

        @media (min-height: 561px) and (max-height: 820px) {
          #title-screen {
            padding: 1.75rem 3rem;
            gap: 0.65rem;
          }
          .title-brand-lockup {
            margin-bottom: 1.15rem;
          }
          .title-main-glow {
            font-size: clamp(2.8rem, 6.5vw, 4.4rem);
          }
          .menu-options-stack {
            gap: 0.55rem;
            margin-top: 0.25rem;
          }
          .menu-nav-btn {
            font-size: clamp(1.1rem, 2.1vw, 1.45rem);
            padding: 0.35rem 0;
          }
          .title-bottom-footer {
            padding-top: 0.75rem;
          }
        }

        /* Upside-down Prevention Blocker Overlay */
        .upside-down-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at center, #0a1828 0%, #03060a 100%);
          z-index: 99999;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
          pointer-events: auto;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .upside-down-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.1rem;
          max-width: 380px;
          border: 1.5px solid rgba(0, 245, 212, 0.5);
          border-radius: 24px;
          padding: 2.2rem;
          background: linear-gradient(145deg, rgba(14, 28, 43, 0.96) 0%, rgba(8, 16, 26, 0.98) 100%);
          box-shadow: 0 10px 50px rgba(0, 245, 212, 0.3);
        }

        .upside-down-icon {
          font-size: 3.4rem;
          animation: rotateHintAnim 2.2s infinite ease-in-out;
        }

        @keyframes rotateHintAnim {
          0%, 100% { transform: rotate(180deg); }
          50% { transform: rotate(0deg); }
        }

        .upside-down-title-ar {
          font-family: 'Amiri', serif;
          font-size: 1.7rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .upside-down-title-en {
          font-family: 'Cinzel', serif;
          font-size: 0.95rem;
          color: #80ffea;
          letter-spacing: 0.06rem;
          margin: 0;
        }

        .upside-down-desc {
          font-size: 0.85rem;
          color: #a5d8ea;
          line-height: 1.4;
          margin: 0;
        }

        /* Underwater Immersion Overlay (Pure Gradient - No backdrop-filter) */
        #underwater-fx-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 25%, rgba(56, 189, 248, 0.16) 0%, rgba(4, 38, 62, 0.48) 72%, rgba(2, 18, 36, 0.72) 100%),
            linear-gradient(180deg, rgba(14, 165, 233, 0.24) 0%, rgba(3, 52, 84, 0.42) 100%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.28s ease-out;
          z-index: 17;
        }
        #underwater-fx-overlay.active {
          opacity: 1;
        }
        #underwater-fx-overlay.dark-water {
          background:
            radial-gradient(circle at 50% 25%, rgba(168, 85, 247, 0.18) 0%, rgba(24, 12, 48, 0.56) 72%, rgba(10, 4, 24, 0.78) 100%),
            linear-gradient(180deg, rgba(139, 92, 246, 0.24) 0%, rgba(15, 10, 34, 0.46) 100%);
        }

        /* Weapon Switcher Bar & Bow Draw Meter */
        #weapon-switcher-bar {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 6px;
          border-radius: 10px;
          background: rgba(6, 12, 22, 0.84);
          border: 1px solid rgba(0, 245, 212, 0.3);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
          margin-bottom: 2px;
        }
        .weapon-switch-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 9px;
          border-radius: 7px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
          font-size: 0.7rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .weapon-switch-btn:hover {
          border-color: rgba(0, 245, 212, 0.65);
          color: #ffffff;
        }
        .weapon-switch-btn.active {
          background: rgba(0, 245, 212, 0.22);
          border-color: #00f5d4;
          color: #ffffff;
          box-shadow: 0 0 10px rgba(0, 245, 212, 0.32);
        }
        #weapon-ammo-badge {
          font-size: 0.68rem;
          font-weight: 800;
          color: #fee440;
          padding: 2px 6px;
          border-radius: 6px;
          background: rgba(254, 228, 64, 0.12);
          border: 1px solid rgba(254, 228, 64, 0.35);
          white-space: nowrap;
        }
        #weapon-reload-btn,
        #weapon-aim-btn {
          display: none;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(56, 189, 248, 0.65);
          background: rgba(56, 189, 248, 0.2);
          color: #e0f2fe;
          font-size: 0.66rem;
          font-weight: 800;
          cursor: pointer;
          touch-action: none;
        }
        #weapon-aim-btn {
          display: inline-block;
          border-color: rgba(254, 228, 64, 0.55);
          background: rgba(254, 228, 64, 0.14);
          color: #fef08a;
        }
        #weapon-aim-btn.active {
          border-color: #00f5d4;
          background: rgba(0, 245, 212, 0.28);
          color: #ffffff;
          box-shadow: 0 0 10px rgba(0, 245, 212, 0.45);
        }
        #bow-draw-meter {
          display: none;
          width: 110px;
          height: 5px;
          border-radius: 9999px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.25);
          overflow: hidden;
        }
        #bow-draw-fill {
          width: 0%;
          height: 100%;
          background: linear-gradient(90deg, #38bdf8, #4ade80, #fee440);
          transition: width 0.04s linear;
        }
        .hud-cam-pill {
          width: auto !important;
          padding: 0 10px !important;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 800;
        }

        /* Hurt Vignette */
        #hurt-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(240, 20, 60, 0.55) 100%);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease-out;
          z-index: 18;
        }

        #hurt-vignette.active {
          opacity: 1;
        }

        /* Death Screen Modal */
        #death-modal .modal-card {
          border-color: #ff3366;
          box-shadow: 0 10px 60px rgba(255, 51, 102, 0.4), 0 0 30px rgba(160, 10, 40, 0.3);
          background: linear-gradient(165deg, rgba(30, 8, 14, 0.98) 0%, rgba(12, 4, 8, 0.99) 100%);
        }

        .death-rune-symbol {
          font-size: 3rem;
          color: #ff3366;
          text-shadow: 0 0 25px rgba(255, 51, 102, 0.8);
          animation: deathPulse 2s infinite ease-in-out;
        }

        @keyframes deathPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; text-shadow: 0 0 35px #ff3366; }
        }

        /* Touch Combat Action Buttons (Minecraft Rounded Squares) */
        .combat-touch-btn {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          border: 2px solid rgba(226, 232, 240, 0.45);
          background: rgba(28, 33, 42, 0.72);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 4px 12px rgba(0, 0, 0, 0.55);
          touch-action: none;
          cursor: pointer;
          transition: transform 0.12s ease, border-color 0.15s ease, background 0.15s ease;
        }

        .combat-touch-btn:active {
          transform: scale(0.92);
          border-color: #ffffff;
          background: rgba(100, 116, 139, 0.85);
        }

        .combat-touch-btn.attack {
          width: 56px;
          height: 56px;
          border-radius: 10px;
          border-color: rgba(241, 245, 249, 0.55);
          background: rgba(30, 35, 44, 0.74);
        }
        .combat-touch-btn.attack:active {
          background: rgba(100, 116, 139, 0.9);
        }

        .combat-touch-btn.pulse {
          border-color: rgba(192, 132, 252, 0.75);
        }
        .combat-touch-btn.pulse:active {
          background: rgba(160, 90, 255, 0.4);
        }

        /* Active Build Mode Helper Bar (shown only while Build Mode is active) */
        #build-mode-bar {
          position: absolute;
          top: 56px;
          left: 50%;
          transform: translateX(-50%);
          display: none;
          align-items: center;
          gap: 6px;
          background: rgba(8, 18, 30, 0.92);
          border: 1.5px solid rgba(56, 189, 248, 0.65);
          border-radius: 9999px;
          padding: 4px 10px;
          max-width: calc(100vw - 340px);
          overflow-x: auto;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);
          pointer-events: auto;
          z-index: 40;
          white-space: nowrap;
        }
        #build-mode-bar.active {
          display: flex;
        }
        .build-bar-btn {
          background: rgba(56, 189, 248, 0.18);
          border: 1px solid rgba(56, 189, 248, 0.55);
          color: #e0f2fe;
          border-radius: 9999px;
          padding: 4px 10px;
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
          pointer-events: auto;
        }
        .build-bar-btn:hover {
          background: rgba(56, 189, 248, 0.35);
        }
        .build-bar-btn.danger {
          background: rgba(244, 63, 94, 0.18);
          border-color: rgba(244, 63, 94, 0.55);
          color: #fecdd3;
        }
        #build-crosshair {
          position: fixed;
          left: 50%;
          top: 50%;
          width: 22px;
          height: 22px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          display: none;
          z-index: 35;
          transition: width 0.12s ease, height 0.12s ease, filter 0.12s ease;
        }
        #build-crosshair.active {
          display: block;
        }
        #build-crosshair.tight {
          width: 14px;
          height: 14px;
        }
        #build-crosshair.hit::before,
        #build-crosshair.hit::after {
          background: #fee440;
          box-shadow: 0 0 8px rgba(254, 228, 64, 0.95);
        }
        #build-crosshair.kill::before,
        #build-crosshair.kill::after {
          background: #fb7185;
          box-shadow: 0 0 10px rgba(244, 63, 94, 0.95);
        }
        #build-crosshair::before,
        #build-crosshair::after {
          content: '';
          position: absolute;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.95);
          transition: transform 0.08s ease, background 0.08s ease;
        }
        #build-crosshair::before {
          left: 50%;
          top: 2px;
          width: 2px;
          height: calc(100% - 4px);
          transform: translateX(-50%);
        }
        #build-crosshair::after {
          top: 50%;
          left: 2px;
          width: calc(100% - 4px);
          height: 2px;
          transform: translateY(-50%);
        }
        #build-crosshair.hit::before {
          transform: translateX(-50%) rotate(45deg);
        }
        #build-crosshair.hit::after {
          transform: translateY(-50%) rotate(45deg);
        }
        .build-res-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
          gap: 8px;
          margin-bottom: 10px;
        }
        .build-res-pill {
          background: rgba(0, 0, 0, 0.38);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 6px 8px;
          font-size: 0.76rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #e2e8f0;
        }
        .build-block-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(124px, 1fr));
          gap: 8px;
          margin-bottom: 12px;
        }
        .build-block-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1.5px solid rgba(255, 255, 255, 0.14);
          border-radius: 10px;
          padding: 7px 8px;
          text-align: left;
          color: #f8fafc;
          cursor: pointer;
          font-size: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .build-block-btn.selected {
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.18);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
        }
        .build-recipe-row {
          background: rgba(0, 0, 0, 0.32);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 8px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          text-align: left;
        }
        .build-craft-btn {
          background: linear-gradient(135deg, #00f5d4 0%, #00bbf9 100%);
          color: #05141f;
          border: none;
          border-radius: 8px;
          padding: 6px 12px;
          font-weight: 800;
          font-size: 0.75rem;
          cursor: pointer;
          white-space: nowrap;
        }
        .build-craft-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .build-tab-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .build-tab-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1.5px solid rgba(255, 255, 255, 0.14);
          color: #cbd5e1;
          border-radius: 10px;
          padding: 7px 10px;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .build-tab-btn.active {
          background: rgba(56, 189, 248, 0.18);
          border-color: #38bdf8;
          color: #38bdf8;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.25);
        }

        /* World 2 Unified Quick Controls & Boss Bar */
        #dark-realm-quick-bar {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: none;
          align-items: center;
          gap: 5px;
          background: rgba(12, 10, 26, 0.86);
          border: 1px solid rgba(168, 85, 247, 0.55);
          border-radius: 9999px;
          padding: 4px 8px;
          max-width: calc(100vw - 440px);
          overflow-x: auto;
          white-space: nowrap;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);
          pointer-events: auto;
          z-index: 38;
        }
        #echo-ui-wrapper.dark-realm-active #dark-realm-quick-bar {
          display: flex;
        }
        #echo-ui-wrapper.mobile-mode #dark-realm-quick-bar {
          top: 6px;
          max-width: calc(100vw - 290px);
          padding: 3px 6px;
        }
        .dark-quick-btn {
          background: rgba(168, 85, 247, 0.16);
          border: 1px solid rgba(192, 132, 252, 0.45);
          color: #f3e8ff;
          border-radius: 9999px;
          padding: 4px 9px;
          font-size: 0.72rem;
          font-weight: 800;
          cursor: pointer;
          pointer-events: auto;
          white-space: nowrap;
        }
        .dark-quick-btn:hover {
          background: rgba(168, 85, 247, 0.34);
          border-color: #d8b4fe;
        }
        .dark-quick-btn.fire {
          background: rgba(249, 115, 22, 0.22);
          border-color: rgba(251, 146, 60, 0.6);
          color: #ffedd5;
        }
        .dark-quick-btn.portal {
          background: rgba(0, 245, 212, 0.16);
          border-color: rgba(0, 245, 212, 0.5);
          color: #99f6e4;
        }
        #dark-boss-hud-bar {
          position: absolute;
          top: 52px;
          left: 50%;
          transform: translateX(-50%);
          width: min(420px, 76vw);
          display: none;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          background: rgba(18, 6, 18, 0.86);
          border: 1.5px solid rgba(244, 63, 94, 0.65);
          border-radius: 10px;
          padding: 5px 12px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.65);
          pointer-events: none;
          z-index: 37;
        }
        #dark-boss-hud-bar.visible {
          display: flex;
        }
        #echo-ui-wrapper.dark-realm-active #build-mode-bar {
          top: 92px;
        }
        .dark-boss-track {
          width: 100%;
          height: 8px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 9999px;
          overflow: hidden;
          border: 1px solid rgba(244, 63, 94, 0.4);
        }
        #dark-boss-fill {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #dc2626, #f43f5e, #fb7185);
          transition: width 0.15s ease;
        }
        #pause-return-island-btn {
          display: none;
        }
        #echo-ui-wrapper.dark-realm-active #pause-return-island-btn {
          display: block;
        }

        /* Adaptive PC vs Mobile Mode */
        #echo-ui-wrapper.pc-mode #touch-controls-layer,
        #echo-ui-wrapper.pc-mode #settings-customize-controls-row {
          display: none !important;
        }

        /* HUD Multiplayer Badge & Live Voice Control Bar */
        #hud-multiplayer-btn {
          position: relative;
        }
        .hud-mp-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 17px;
          height: 17px;
          padding: 0 4px;
          border-radius: 9999px;
          background: #00f5d4;
          color: #041018;
          font-size: 0.62rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 8px rgba(0, 245, 212, 0.7);
          pointer-events: none;
        }
        .hud-mp-badge.offline {
          background: #64748b;
          color: #fff;
          box-shadow: none;
        }
        .hud-mp-badge.invite-alert {
          background: #f59e0b;
          color: #090d14;
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.85);
        }

        #voice-hud-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(8, 15, 24, 0.78);
          border: 1px solid rgba(0, 245, 212, 0.32);
          border-radius: 9999px;
          padding: 4px 10px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          pointer-events: auto;
        }
        .voice-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #e2e8f0;
          border-radius: 9999px;
          padding: 4px 9px;
          font-size: 0.72rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .voice-pill-btn:hover {
          background: rgba(0, 245, 212, 0.18);
          border-color: #00f5d4;
        }
        .voice-pill-btn.active {
          background: rgba(16, 185, 129, 0.25);
          border-color: #10b981;
          color: #6ee7b7;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.35);
        }
        .voice-pill-btn.speaking {
          box-shadow: 0 0 16px rgba(0, 245, 212, 0.85);
          border-color: #00f5d4;
          color: #ffffff;
        }
        .voice-pill-btn.muted {
          background: rgba(244, 63, 94, 0.22);
          border-color: #f43f5e;
          color: #fda4af;
        }
        .voice-vol-wrap {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          color: #cbd5e1;
        }
        #voice-speaker-slider {
          width: 68px;
          accent-color: #00f5d4;
          cursor: pointer;
        }

        /* Live World 1 & World 2 Multiplayer Chat Panel */
        #mp-chat-panel {
          position: absolute;
          bottom: 14px;
          left: 14px;
          width: 330px;
          max-width: calc(100vw - 28px);
          background: rgba(6, 12, 20, 0.72);
          border: 1px solid rgba(0, 245, 212, 0.28);
          border-radius: 14px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          pointer-events: auto;
          z-index: 52;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        #mp-chat-panel.focused {
          background: rgba(6, 12, 20, 0.92);
          border-color: #00f5d4;
          box-shadow: 0 8px 28px rgba(0, 245, 212, 0.22);
        }
        #mp-chat-panel.collapsed #mp-chat-body {
          display: none;
        }
        #echo-ui-wrapper.mobile-mode #mp-chat-panel {
          top: 118px;
          bottom: auto;
          left: 10px;
          width: 248px;
        }
        .mp-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          padding: 5px 8px;
          background: rgba(255, 255, 255, 0.04);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.72rem;
        }
        .mp-chat-ch-tabs {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .mp-chat-ch-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #94a3b8;
          border-radius: 6px;
          padding: 2px 7px;
          font-size: 0.68rem;
          font-weight: 800;
          cursor: pointer;
        }
        .mp-chat-ch-btn.active {
          background: rgba(0, 245, 212, 0.18);
          border-color: #00f5d4;
          color: #00f5d4;
        }
        #mp-chat-messages {
          height: 130px;
          max-height: 24vh;
          overflow-y: auto;
          padding: 6px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.76rem;
          line-height: 1.35;
          text-align: left;
          user-select: text;
          -webkit-user-select: text;
        }
        #echo-ui-wrapper.mobile-mode #mp-chat-messages {
          height: 92px;
        }
        .mp-chat-line {
          word-break: break-word;
          color: #e2e8f0;
        }
        .mp-chat-realm {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 800;
          padding: 0 4px;
          border-radius: 4px;
          margin-right: 4px;
          background: rgba(56, 189, 248, 0.2);
          color: #7dd3fc;
        }
        .mp-chat-realm.w2 {
          background: rgba(168, 85, 247, 0.24);
          color: #e9d5ff;
        }
        .mp-chat-input-row {
          display: flex;
          gap: 5px;
          padding: 5px 6px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 0, 0, 0.35);
        }
        #mp-chat-input {
          flex: 1;
          min-width: 0;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 5px 8px;
          color: #ffffff;
          font-size: 0.76rem;
          outline: none;
        }
        #mp-chat-input:focus {
          border-color: #00f5d4;
          background: rgba(0, 0, 0, 0.65);
        }
        #mp-chat-send-btn {
          background: #00f5d4;
          color: #04121b;
          border: none;
          border-radius: 8px;
          padding: 5px 10px;
          font-size: 0.74rem;
          font-weight: 800;
          cursor: pointer;
        }

        /* Live Invite Toast */
        #mp-invite-toast {
          position: fixed;
          top: 74px;
          left: 50%;
          transform: translateX(-50%) translateY(-16px);
          opacity: 0;
          pointer-events: none;
          background: rgba(8, 18, 30, 0.96);
          border: 1.5px solid #f59e0b;
          border-radius: 14px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.65), 0 0 20px rgba(245, 158, 11, 0.25);
          z-index: 95;
          transition: opacity 0.25s ease, transform 0.25s ease;
          max-width: min(92vw, 480px);
        }
        #mp-invite-toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        #mp-portal-toast {
          position: fixed;
          top: 132px;
          left: 50%;
          transform: translateX(-50%) translateY(-16px);
          opacity: 0;
          pointer-events: none;
          background: rgba(12, 16, 36, 0.96);
          border: 1.5px solid #a855f7;
          border-radius: 14px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.7), 0 0 24px rgba(168, 85, 247, 0.35);
          z-index: 96;
          transition: opacity 0.25s ease, transform 0.25s ease;
          max-width: min(92vw, 500px);
        }
        #mp-portal-toast.show {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }

        /* Multiplayer Hub Tabs & Lists */
        .mp-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          margin-bottom: 0.75rem;
          width: 100%;
        }
        .mp-tab-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #cbd5e1;
          border-radius: 10px;
          padding: 7px 6px;
          font-size: 0.76rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mp-tab-btn.active {
          background: rgba(0, 245, 212, 0.18);
          border-color: #00f5d4;
          color: #00f5d4;
          box-shadow: 0 0 12px rgba(0, 245, 212, 0.22);
        }
        .mp-tab-panel {
          display: none;
          width: 100%;
        }
        .mp-tab-panel.active {
          display: block;
        }
        .mp-card-box {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.8rem;
          margin-bottom: 0.7rem;
        }
        .mp-list-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          background: rgba(0, 0, 0, 0.32);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 7px 10px;
          margin-top: 6px;
        }
        .mp-mini-btn {
          background: rgba(0, 245, 212, 0.16);
          border: 1px solid rgba(0, 245, 212, 0.45);
          color: #00f5d4;
          border-radius: 7px;
          padding: 4px 8px;
          font-size: 0.7rem;
          font-weight: 800;
          cursor: pointer;
          white-space: nowrap;
        }
        .mp-mini-btn.warn {
          background: rgba(244, 63, 94, 0.16);
          border-color: rgba(244, 63, 94, 0.5);
          color: #fda4af;
        }
        .mp-mini-btn.gold {
          background: rgba(250, 204, 21, 0.16);
          border-color: rgba(250, 204, 21, 0.5);
          color: #fde047;
        }
        .mp-ping-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 6px;
          margin-top: 8px;
        }
      </style>

      <!-- Underwater Gradient Overlay -->
      <div id="underwater-fx-overlay"></div>

      <!-- Hurt Vignette Screen Flash -->
      <div id="hurt-vignette"></div>

      <!-- Toast Notification -->
      <div id="toast-notification">Notification</div>

      <!-- Objective Complete Sliding Banner -->
      <div id="objective-complete-banner">
        <div class="banner-kicker">✦ هدف مكتمل · OBJECTIVE COMPLETED ✦</div>
        <div id="objective-complete-title" class="banner-title">استكشف الجزيرة</div>
        <div id="objective-complete-next" class="banner-next-unlocked">
          <span>الهدف التالي: اجمع ثلاث شظايا ذاكرة</span>
        </div>
      </div>

      <!-- Cinematic Main Menu Screen -->
      <div id="title-screen">
        <div class="title-brand-column">
          <div class="title-brand-lockup">
            <h1 class="title-main-glow">ECHO</h1>
            <div class="title-tagline">THE WORLD REMEMBERS</div>
            <div class="title-arabic-sub">صَدَى – العَالَمُ يَتَذَكَّر</div>
          </div>

          <!-- Menu Stack (Matches Reference Image Layout) -->
          <div class="menu-options-stack">
            <button id="menu-continue-btn" class="menu-nav-btn primary interactive">
              <span>CONTINUE</span>
              <span class="sub-label">متابعة</span>
              <span id="continue-status-badge" class="btn-status-badge">Resume</span>
            </button>

            <button id="menu-new-game-btn" class="menu-nav-btn interactive">
              <span>NEW JOURNEY</span>
              <span class="sub-label">رحلة جديدة</span>
            </button>

            <button id="menu-shadow-realm-btn" class="menu-nav-btn interactive" style="color: #c084fc; border-color: rgba(192, 132, 252, 0.45);">
              <span>SHADOW REALM PORTAL</span>
              <span class="sub-label">بوابة عالم الظلال</span>
              <span id="shadow-realm-status-badge" class="btn-status-badge" style="border-color: rgba(192, 132, 252, 0.55); color: #e9d5ff;">🔒 0/7</span>
            </button>

            <button id="menu-quest-log-btn" class="menu-nav-btn interactive" style="color: #00f5d4;">
              <span>THE FIRST MEMORY</span>
              <span class="sub-label">القصة والمهام</span>
            </button>

            <button id="menu-memory-btn" class="menu-nav-btn interactive" style="color: #fee440;">
              <span>WORLD MEMORY</span>
              <span class="sub-label">ذاكرة العالم</span>
            </button>

            <button id="menu-multiplayer-btn" class="menu-nav-btn interactive" style="color: #00f5d4; border-color: rgba(0, 245, 212, 0.4);">
              <span>CO-OP & MULTIPLAYER</span>
              <span class="sub-label">اللعب الجماعي والمجموعات</span>
            </button>

            <button id="menu-settings-btn" class="menu-nav-btn interactive">
              <span>SETTINGS</span>
              <span class="sub-label">الإعدادات</span>
            </button>

            <button id="menu-exit-btn" class="menu-nav-btn interactive">
              <span>EXIT GAME</span>
              <span class="sub-label">خروج</span>
            </button>
          </div>
        </div>

        <div class="title-bottom-footer">
          <div class="controls-hint-inline">
            <div><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Move</div>
            <div><kbd>SHIFT</kbd> Sprint</div>
            <div><kbd>SPACE</kbd> Jump</div>
            <div><kbd>E</kbd> Interact</div>
            <div><kbd>Q</kbd> Quest Log</div>
            <div><kbd>M</kbd> World Memory</div>
            <div><kbd>ESC</kbd> Pause</div>
          </div>
          <div style="opacity: 0.7; font-size: 0.8rem;">
            The Forgotten Island · 3D Adventure
          </div>
        </div>
      </div>

      <!-- In-Game HUD -->
      <div id="ingame-hud" class="hidden">
        <div class="hud-top">
          <div id="mc-player-card">
            <div class="mc-top-status-row">
              <!-- Minecraft Blocky Hero Avatar SVG -->
              <div class="mc-avatar-frame" title="Echo Adventurer">
                <svg width="42" height="42" viewBox="0 0 16 16" shape-rendering="crispEdges">
                  <rect width="16" height="16" fill="#2b3648"/>
                  <rect x="6" y="0" width="4" height="2" fill="#18202c"/>
                  <rect x="4" y="2" width="8" height="3" fill="#5c3822"/>
                  <rect x="3" y="3" width="1" height="4" fill="#462918"/>
                  <rect x="12" y="3" width="1" height="4" fill="#462918"/>
                  <rect x="4" y="5" width="8" height="5" fill="#f1c29b"/>
                  <rect x="5" y="6" width="2" height="2" fill="#1e293b"/>
                  <rect x="9" y="6" width="2" height="2" fill="#1e293b"/>
                  <rect x="7" y="8" width="2" height="1" fill="#d99b72"/>
                  <rect x="3" y="10" width="10" height="6" fill="#0284c7"/>
                  <rect x="5" y="10" width="6" height="6" fill="#e2e8f0"/>
                  <rect x="6" y="11" width="4" height="5" fill="#38bdf8"/>
                </svg>
              </div>
              <div class="mc-bars-col">
                <div class="mc-bar-row">
                  <svg class="mc-bar-icon" viewBox="0 0 16 16" shape-rendering="crispEdges">
                    <path d="M2 5h2V3h3v2h2V3h3v2h2v4h-2v2h-2v2H6v-2H4V9H2V5z" fill="#ef4444" stroke="#090c12" stroke-width="1"/>
                    <rect x="4" y="5" width="2" height="2" fill="#fca5a5"/>
                  </svg>
                  <div class="mc-bar-track">
                    <div id="player-hp-fill" class="mc-bar-fill hp" style="width: 100%;"></div>
                    <span id="player-hp-text" class="mc-bar-value">100/100</span>
                  </div>
                </div>
                <div class="mc-bar-row">
                  <svg class="mc-bar-icon" viewBox="0 0 16 16" shape-rendering="crispEdges">
                    <path d="M8 1l5 6-5 8-5-8 5-6z" fill="#38bdf8" stroke="#090c12" stroke-width="1"/>
                    <polygon points="8,3 10,7 8,12 6,7" fill="#bae6fd"/>
                  </svg>
                  <div class="mc-bar-track">
                    <div id="player-energy-fill" class="mc-bar-fill energy" style="width: 100%;"></div>
                    <span id="player-energy-text" class="mc-bar-value">100/100</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mc-sub-pills-row">
              <div class="mc-crystal-pill" title="Collect 7 Crystals to Unlock Portal">
                <span>💎</span>
                <span id="mc-crystal-count-text">0/7</span>
              </div>
              <button id="mc-quest-toggle-btn" type="button" class="mc-quest-pill-btn interactive" title="Toggle Quest Card (Q)">
                📜 Quests
              </button>
            </div>

            <!-- Collapsible Quest Tracker HUD (preserves legacy IDs) -->
            <div id="quest-cluster" class="quest-cluster">
              <div class="quest-header-row">
                <div id="quest-chapter-badge" class="quest-chapter-badge">
                  <span>✦ CHAPTER I</span>
                  <span style="opacity: 0.65;">·</span>
                  <span>الفصل الأول</span>
                </div>
                <button id="quest-journal-shortcut-btn" class="quest-journal-shortcut-btn interactive" title="Open Quest Log (J)">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
                    <path d="M6 6h10"></path>
                    <path d="M6 10h10"></path>
                  </svg>
                  <span>سجل المهام (J)</span>
                </button>
              </div>

              <div id="quest-title-text" class="quest-title-text">THE FIRST MEMORY · الذاكرة الأولى</div>

              <div class="quest-objective-active-card">
                <div class="quest-objective-headline">
                  <span id="quest-objective-badge" class="quest-step-pill">١ / ٥</span>
                  <div class="quest-objective-names">
                    <span id="quest-objective-title-ar" class="quest-objective-name-ar">استكشف الجزيرة</span>
                    <span id="quest-objective-title-en" class="quest-objective-name-en">Explore the Island</span>
                  </div>
                  <span id="quest-progress-text" style="font-size: 0.85rem; font-weight: 800; color: #fee440; white-space: nowrap;">0 / 35m</span>
                </div>

                <div class="quest-progress-track">
                  <div id="quest-progress-fill" class="quest-progress-fill" style="width: 0%;"></div>
                </div>

                <div id="quest-objective-hint" class="quest-objective-hint-text">
                  <span>📍</span>
                  <span>انهض من رمال الشاطئ وتحرك لاكتشاف معالم الجزيرة</span>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.2rem; padding-top: 0.35rem; border-top: 1px dashed rgba(255, 255, 255, 0.1);">
                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <span style="font-size: 0.72rem; color: #80ffea; font-weight: 700;">ECHOES:</span>
                  <div id="crystal-slots" class="crystal-slots"></div>
                  <span id="crystal-count-text" style="color: #00f5d4; font-weight: 800; font-size: 0.75rem;">0/7</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.35rem; font-size: 0.75rem;">
                  <span style="color: #fee440;">✦</span>
                  <span style="color: #c4e9e4;">SHARDS:</span>
                  <span id="shard-count-text" style="color: #fee440; font-weight: 800;">0/10</span>
                </div>
              </div>
              <div style="width: 100%; height: 3px; background: rgba(255, 255, 255, 0.08); border-radius: 9999px; overflow: hidden;">
                <div id="shard-progress-fill" style="width: 0%; height: 100%; background: linear-gradient(90deg, #fee440, #00f5d4); transition: width 0.4s ease;"></div>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
              <div class="hud-actions">
                <button id="hud-multiplayer-btn" class="icon-btn interactive" title="Multiplayer, Friends, Party & Voice (P)" style="border-color: rgba(0, 245, 212, 0.75); color: #00f5d4; box-shadow: 0 0 12px rgba(0, 245, 212, 0.25);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span id="hud-mp-badge" class="hud-mp-badge">1</span>
                </button>
                <button id="hud-camera-mode-btn" class="icon-btn hud-cam-pill interactive" title="Toggle First-Person / Third-Person Camera [T / V]" style="border-color: rgba(254, 228, 64, 0.65); color: #fee440;">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span id="hud-camera-mode-label">3P</span>
                </button>
                <button id="hud-build-btn" class="icon-btn interactive" title="House Builder & Inventory · البناء والمخزون (B / I)" style="border-color: rgba(56, 189, 248, 0.75); color: #38bdf8; box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 10.5L12 3l9 7.5"></path>
                    <path d="M5 9.5V21h14V9.5"></path>
                    <path d="M9 21v-6h6v6"></path>
                  </svg>
                </button>
                <button id="sound-btn" class="icon-btn interactive" title="Toggle Audio">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </button>
                <button id="hud-settings-btn" class="icon-btn interactive" title="Settings">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </button>
                <button id="reset-btn" class="icon-btn interactive" title="Respawn Position">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </button>
                <button id="pause-btn" class="icon-btn interactive" title="Pause Menu (ESC)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                </button>
              </div>

              <!-- Live WebRTC Voice Chat Quick Bar (Works in World 1 & World 2) -->
              <div id="voice-hud-bar" class="interactive">
                <button id="voice-mic-btn" type="button" class="voice-pill-btn interactive" title="Enable / Disable Live Voice Chat">
                  🎙️ Voice Off
                </button>
                <button id="voice-mute-btn" type="button" class="voice-pill-btn interactive" style="display:none;" title="Mute / Unmute Microphone">
                  🔊 Unmuted
                </button>
                <div class="voice-vol-wrap" title="Voice Speaker Volume">
                  <span>🔊</span>
                  <input id="voice-speaker-slider" type="range" min="0" max="100" value="85" class="interactive" />
                  <span id="voice-speaker-pct" style="font-size:0.65rem;min-width:26px;">85%</span>
                </div>
              </div>
            </div>

            <div class="mc-compass-wrap">
              <span class="mc-compass-dir n">N</span>
              <span class="mc-compass-dir e">E</span>
              <span class="mc-compass-dir s">S</span>
              <span class="mc-compass-dir w">W</span>
              <div class="minimap-box">
                <canvas id="minimap-canvas" width="120" height="120"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Multiplayer Chat Panel (World 1 & World 2) -->
        <div id="mp-chat-panel" class="interactive">
          <div class="mp-chat-header">
            <div class="mp-chat-ch-tabs">
              <button id="mp-chat-ch-room" type="button" class="mp-chat-ch-btn active interactive">ROOM · الغرفة</button>
              <button id="mp-chat-ch-party" type="button" class="mp-chat-ch-btn interactive">PARTY · الفريق</button>
              <button id="mp-chat-ch-friends" type="button" class="mp-chat-ch-btn interactive">FRIENDS · الأصدقاء</button>
            </div>
            <button id="mp-chat-collapse-btn" type="button" class="mp-chat-ch-btn interactive" title="Collapse / Expand Chat">▾</button>
          </div>
          <div id="mp-chat-body">
            <div id="mp-chat-messages"></div>
            <div class="mp-chat-input-row">
              <input id="mp-chat-input" type="text" maxlength="300" placeholder="Press Enter to chat... · اضغط Enter للدردشة" class="interactive" />
              <button id="mp-chat-send-btn" type="button" class="interactive">Send</button>
            </div>
          </div>
        </div>

        <!-- World 2 Quick Actions & Boss Bar (Shown Only Inside Shadow Realm) -->
        <div id="dark-realm-quick-bar" class="interactive">
          <button id="dark-quick-map-btn" type="button" class="dark-quick-btn interactive" title="Shadow Realm Map & Fast Travel (M)">🗺️ Map [M]</button>
          <button id="dark-quick-quests-btn" type="button" class="dark-quick-btn interactive" title="122-Quest Codex (K / J)">📜 Codex [K]</button>
          <button id="dark-quick-companion-btn" type="button" class="dark-quick-btn interactive" title="Cycle Companion AI Mode">⚔️ Allies</button>
          <button id="dark-quick-weather-btn" type="button" class="dark-quick-btn interactive" title="Cycle Dark Realm Weather">🌙 Weather</button>
          <button id="dark-quick-fireball-btn" type="button" class="dark-quick-btn fire interactive" title="Cast Shadow Fireball (G)">🔥 Spell [G]</button>
          <button id="dark-quick-island-btn" type="button" class="dark-quick-btn portal interactive" title="Return to Forgotten Island">⛩️ Island</button>
        </div>

        <div id="dark-boss-hud-bar">
          <div id="dark-boss-name" style="font-size:0.74rem;font-weight:900;color:#fda4af;letter-spacing:0.04rem;">SHADOW SOVEREIGN MALAKOR</div>
          <div class="dark-boss-track"><div id="dark-boss-fill"></div></div>
        </div>

        <!-- Center Crosshair (Visible in Build Mode or F1 Cursor Lock) -->
        <div id="build-crosshair"></div>

        <!-- Floating Build-Mode-Only Helper Bar -->
        <div id="build-mode-bar" class="interactive">
          <span id="build-mode-block-label" style="font-size:0.78rem;font-weight:800;color:#38bdf8;">🧱 Wood Planks · 0°</span>
          <button id="build-bar-rotate-btn" type="button" class="build-bar-btn interactive">🔄 Rotate [R]</button>
          <button id="build-bar-break-btn" type="button" class="build-bar-btn interactive">🔨 Break</button>
          <button id="build-bar-kit-btn" type="button" class="build-bar-btn interactive">🏠 House Kit</button>
          <button id="build-bar-exit-btn" type="button" class="build-bar-btn danger interactive">✕ Done</button>
        </div>

        <!-- Floating Interaction Prompt -->
        <div id="interact-prompt" class="interactive">
          <kbd>E</kbd>
          <span id="interact-label">Commune with Echo · تواصل مع صدى البلورة</span>
        </div>

        <!-- Minecraft XP Bar & 8-Slot Interactive Hotbar (Bottom Center) -->
        <div id="combat-cluster" class="combat-cluster">
          <div id="weapon-switcher-bar" class="interactive">
            <button type="button" class="weapon-switch-btn active interactive" data-weapon="sword" title="Echo Sword (LMB Slash / RMB Block)">⚔️ Sword</button>
            <button type="button" class="weapon-switch-btn interactive" data-weapon="pistol" title="Echo Pistol (LMB Fire / RMB Aim / R Reload)">🔫 Pistol</button>
            <button type="button" class="weapon-switch-btn interactive" data-weapon="bow" title="Recurve Bow (Hold LMB Draw / RMB Aim)">🏹 Bow</button>
            <span id="weapon-ammo-badge">RMB Block</span>
            <button id="weapon-aim-btn" type="button" class="interactive" title="Hold to Aim / Block [RMB]">🎯 Aim</button>
            <button id="weapon-reload-btn" type="button" class="interactive" title="Reload Pistol [R]">🔄 Reload</button>
            <div id="bow-draw-meter"><div id="bow-draw-fill"></div></div>
          </div>
          <div class="mc-xp-container">
            <div id="mc-xp-level" class="mc-xp-level">1</div>
            <div class="mc-xp-bar">
              <div id="mc-xp-fill" class="mc-xp-fill" style="width: 10%;"></div>
              <div class="mc-xp-segments"></div>
            </div>
          </div>
          <div id="mc-hotbar" class="interactive">
            <button type="button" class="mc-hotbar-slot active interactive" data-slot="0" title="Sword [1]">
              <svg width="28" height="28" viewBox="0 0 16 16" shape-rendering="crispEdges">
                <path d="M12 1h3v3l-7 7-3-3 7-7z" fill="#38bdf8" stroke="#082f49" stroke-width="0.6"/>
                <rect x="4" y="9" width="3" height="3" fill="#0284c7"/>
                <rect x="2" y="10" width="2" height="2" fill="#78350f"/>
                <rect x="1" y="13" width="2" height="2" fill="#a16207"/>
              </svg>
            </button>
            <button type="button" class="mc-hotbar-slot interactive" data-slot="1" title="Axe (Chop Wood) [2]">
              <svg width="28" height="28" viewBox="0 0 16 16" shape-rendering="crispEdges">
                <path d="M8 2h5v5h-3V5H8V2z" fill="#cbd5e1" stroke="#334155" stroke-width="0.6"/>
                <rect x="6" y="4" width="2" height="10" transform="rotate(35 7 9)" fill="#92400e"/>
              </svg>
            </button>
            <button type="button" class="mc-hotbar-slot interactive" data-slot="2" title="Pickaxe (Mine Stone) [3]">
              <svg width="28" height="28" viewBox="0 0 16 16" shape-rendering="crispEdges">
                <path d="M3 4c3-2 7-2 10 2l-2 1C9 4 6 4 4 6L3 4z" fill="#e2e8f0" stroke="#334155" stroke-width="0.6"/>
                <rect x="7" y="4" width="2" height="10" transform="rotate(40 8 9)" fill="#92400e"/>
              </svg>
            </button>
            <button type="button" class="mc-hotbar-slot interactive" data-slot="3" title="Bow / Ranged [4]">
              <svg width="28" height="28" viewBox="0 0 16 16" shape-rendering="crispEdges">
                <path d="M5 2c5 1 8 5 7 11" fill="none" stroke="#92400e" stroke-width="2"/>
                <line x1="5" y1="2" x2="12" y2="13" stroke="#e2e8f0" stroke-width="1"/>
                <line x1="3" y1="12" x2="13" y2="3" stroke="#cbd5e1" stroke-width="1.5"/>
              </svg>
              <span id="mc-slot-count-3" class="mc-slot-count">24</span>
            </button>
            <button type="button" class="mc-hotbar-slot interactive" data-slot="4" title="Wood Planks (Build) [5]">
              <svg width="26" height="26" viewBox="0 0 16 16" shape-rendering="crispEdges">
                <polygon points="8,1 14,4 8,7 2,4" fill="#d99b52"/>
                <polygon points="2,4 8,7 8,14 2,11" fill="#b77938"/>
                <polygon points="8,7 14,4 14,11 8,14" fill="#8f5b25"/>
              </svg>
              <span id="mc-slot-count-4" class="mc-slot-count">64</span>
            </button>
            <button type="button" class="mc-hotbar-slot interactive" data-slot="5" title="Cobblestone (Build) [6]">
              <svg width="26" height="26" viewBox="0 0 16 16" shape-rendering="crispEdges">
                <polygon points="8,1 14,4 8,7 2,4" fill="#94a3b8"/>
                <polygon points="2,4 8,7 8,14 2,11" fill="#64748b"/>
                <polygon points="8,7 14,4 14,11 8,14" fill="#475569"/>
              </svg>
              <span id="mc-slot-count-5" class="mc-slot-count">32</span>
            </button>
            <button type="button" class="mc-hotbar-slot interactive" data-slot="6" title="Food (Eat & Heal) [7]">
              <svg width="26" height="26" viewBox="0 0 16 16" shape-rendering="crispEdges">
                <ellipse cx="8" cy="8" rx="6" ry="4.5" transform="rotate(-20 8 8)" fill="#dc2626" stroke="#450a0a" stroke-width="1"/>
                <ellipse cx="7.5" cy="7.5" rx="3" ry="2" transform="rotate(-20 7.5 7.5)" fill="#fca5a5"/>
                <rect x="6" y="7" width="3" height="1.5" fill="#fef2f2"/>
              </svg>
              <span id="mc-slot-count-6" class="mc-slot-count">16</span>
            </button>
            <button type="button" class="mc-hotbar-slot interactive" data-slot="7" title="Inventory, Crafting & House Builder [I / 8]">
              <span style="font-size:1.15rem;font-weight:900;color:#e2e8f0;letter-spacing:1px;">•••</span>
            </button>
          </div>
        </div>

        <!-- Customizable Minecraft Touch Controls Layer -->
        <div id="touch-controls-layer" class="touch-controls-layer">
          <!-- Minecraft Cross D-Pad -->
          <div id="virtual-joystick-container" class="customizable-control interactive" data-control-id="joystick">
            <div class="control-edit-badge">🕹️ D-Pad</div>
            <div id="joystick-base">
              <div class="mc-dpad-arm mc-dpad-up" data-dir="up">▲</div>
              <div class="mc-dpad-arm mc-dpad-left" data-dir="left">◀</div>
              <div class="mc-dpad-arm mc-dpad-center" data-dir="center">◇</div>
              <div class="mc-dpad-arm mc-dpad-right" data-dir="right">▶</div>
              <div class="mc-dpad-arm mc-dpad-down" data-dir="down">▼</div>
              <div id="joystick-knob"></div>
            </div>
          </div>

          <!-- Combat: Minecraft Attack Button -->
          <button id="touch-attack-btn" class="customizable-control combat-touch-btn attack interactive" data-control-id="attack" title="Attack / Use Tool [F]">
            <div class="control-edit-badge">⚔️ هجوم Attack</div>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="square">
              <path d="M19 5L9 15"/>
              <path d="M15 4h5v5"/>
              <path d="M7 13l4 4"/>
              <path d="M5 19l3-3"/>
            </svg>
          </button>

          <!-- Combat: Dodge Roll -->
          <button id="touch-dodge-btn" class="customizable-control combat-touch-btn interactive" data-control-id="dodge" title="Dodge Roll [C]">
            <div class="control-edit-badge">💨 تفادي Dodge</div>
            <span style="font-size: 0.95rem;">💨</span>
            <span style="font-size: 0.52rem; font-weight: 800;">DODGE</span>
          </button>

          <!-- Combat: Echo Pulse -->
          <button id="touch-pulse-btn" class="customizable-control combat-touch-btn pulse interactive" data-control-id="pulse" title="Echo Pulse [R]">
            <div class="control-edit-badge">💫 نبض Pulse</div>
            <span style="font-size: 0.95rem;">💫</span>
            <span style="font-size: 0.52rem; font-weight: 800;">PULSE</span>
          </button>

          <!-- Action: Sprint / Run -->
          <button id="touch-sprint-btn" class="customizable-control action-touch-btn interactive" data-control-id="sprint" title="Sprint [Shift]">
            <div class="control-edit-badge">🏃 ركض Sprint</div>
            <span>RUN</span>
            <span>ركض</span>
          </button>

          <!-- Action: Interact / Commune -->
          <button id="touch-interact-btn" class="customizable-control action-touch-btn interactive" data-control-id="interact" title="Interact [E]">
            <div class="control-edit-badge">✨ تواصل Echo</div>
            <span>USE</span>
            <span>تفاعل</span>
          </button>

          <!-- Action: Minecraft Square Jump -->
          <button id="touch-jump-btn" class="customizable-control action-touch-btn mc-jump-square interactive" data-control-id="jump" title="Jump [Space]">
            <div class="control-edit-badge">⬆️ قفز Jump</div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 4l-7 7h4v8h6v-8h4l-7-7z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Fullscreen HUD Controls Layout Editor (Edit Mode) -->
      <div id="hud-layout-editor-overlay">
        <!-- Top Control Bar -->
        <div class="editor-toolbar">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="display: flex; flex-direction: column;">
              <span style="font-weight: 800; font-size: 0.95rem; color: #00f5d4; letter-spacing: 0.5px;">🎮 CUSTOMIZE CONTROLS</span>
              <span style="font-size: 0.75rem; color: #a8dadc; font-family: 'Amiri', serif;">تخصيص واجهة التحكم والأزرار</span>
            </div>
            <div id="editor-orientation-badge" style="background: rgba(0, 245, 212, 0.15); border: 1px solid rgba(0, 245, 212, 0.5); padding: 0.2rem 0.6rem; border-radius: 9999px; font-size: 0.75rem; color: #00f5d4; font-weight: 700;">
              📱 Landscape
            </div>
          </div>

          <!-- Target Selection & Scale Controls -->
          <div style="display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(0, 0, 0, 0.4); padding: 0.35rem 0.8rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
              <span style="font-size: 0.78rem; opacity: 0.8;">العنصر:</span>
              <span id="editor-selected-name" style="font-size: 0.85rem; font-weight: 800; color: #ffffff;">🕹️ أنالوج Joystick</span>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(0, 0, 0, 0.4); padding: 0.35rem 0.8rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
              <span style="font-size: 0.78rem; opacity: 0.8;">الحجم:</span>
              <button id="editor-scale-minus-btn" type="button" class="interactive" style="background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.25); color: #fff; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 1rem;">−</button>
              <input type="range" id="editor-scale-slider" min="70" max="150" value="100" class="interactive" style="width: 90px; accent-color: #00f5d4; cursor: pointer;" />
              <button id="editor-scale-plus-btn" type="button" class="interactive" style="background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.25); color: #fff; width: 28px; height: 28px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 1rem;">+</button>
              <span id="editor-scale-value" style="font-size: 0.85rem; font-weight: 800; color: #00f5d4; min-width: 42px;">100%</span>
            </div>
          </div>

          <!-- Actions: Reset, Cancel, Save -->
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <button id="editor-reset-btn" type="button" class="modal-btn secondary interactive" style="padding: 0.45rem 0.9rem; font-size: 0.82rem; border-color: rgba(255, 200, 100, 0.5); color: #ffe8a1;">
              🔄 RESET · استعادة
            </button>
            <button id="editor-cancel-btn" type="button" class="modal-btn secondary interactive" style="padding: 0.45rem 0.9rem; font-size: 0.82rem; border-color: rgba(255, 120, 120, 0.5); color: #ffadad;">
              ✕ CANCEL · إلغاء
            </button>
            <button id="editor-save-btn" type="button" class="modal-btn interactive" style="padding: 0.45rem 1.1rem; font-size: 0.85rem; font-weight: 800; background: #00f5d4; color: #06111a; box-shadow: 0 0 16px rgba(0, 245, 212, 0.5);">
              💾 SAVE · حفظ
            </button>
          </div>
        </div>

        <!-- Bottom Guidance Footer -->
        <div class="editor-footer">
          <span>💡 اسحب أي زر لتغيير مكانه على الشاشة · اضغط على أي زر لتحديده وتعديل حجمه بالشريط أعلاه · Drag to move, tap to select & resize</span>
        </div>
      </div>

      <!-- Settings Modal -->
      <div id="settings-modal" class="modal-overlay">
        <div class="modal-card">
          <div class="modal-badge">Preferences · إعدادات اللعبة</div>
          <h2 class="modal-title-ar">الإعدادات</h2>
          <h3 class="modal-title-en">Game Settings</h3>

            <!-- GRAPHICS QUALITY PRESET SELECTOR (إعدادات جودة الرسومات) -->
            <div class="setting-row" style="flex-direction: column; align-items: stretch; gap: 0.6rem; padding-bottom: 0.8rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="setting-label">
                  <span style="font-weight: 800; color: #fee440; font-size: 0.95rem;">GRAPHICS QUALITY</span>
                  <span class="setting-sub" style="color: #ffd166;">مستوى جودة الرسومات والأداء</span>
                </div>
                <span id="active-quality-badge" style="font-size: 0.75rem; background: rgba(0, 245, 212, 0.15); border: 1px solid #00f5d4; color: #00f5d4; padding: 0.2rem 0.6rem; border-radius: 9999px; font-weight: 700;">
                  قياسي · Medium
                </span>
              </div>

              <!-- 3 Quality Level Buttons -->
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.45rem;">
                <button type="button" id="quality-btn-low" class="quality-tier-btn interactive" data-preset="low" style="background: rgba(255, 255, 255, 0.05); border: 1.5px solid rgba(255, 255, 255, 0.15); border-radius: 10px; padding: 0.6rem 0.3rem; text-align: center; cursor: pointer; transition: all 0.25s ease;">
                  <div style="font-weight: 800; font-size: 0.85rem; color: #80ffea;">ناعم</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.15rem;">Low · أداء عالي</div>
                  <div style="font-size: 0.65rem; color: #10b981; margin-top: 0.15rem;">60+ FPS للأجهزة الضعيفة</div>
                </button>

                <button type="button" id="quality-btn-medium" class="quality-tier-btn interactive active" data-preset="medium" style="background: rgba(0, 245, 212, 0.14); border: 1.5px solid #00f5d4; border-radius: 10px; padding: 0.6rem 0.3rem; text-align: center; cursor: pointer; transition: all 0.25s ease; box-shadow: 0 0 14px rgba(0, 245, 212, 0.25);">
                  <div style="font-weight: 800; font-size: 0.85rem; color: #fee440;">قياسي</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.15rem;">Medium · متوازن</div>
                  <div style="font-size: 0.65rem; color: #38bdf8; margin-top: 0.15rem;">جودة وأداء متزنان</div>
                </button>

                <button type="button" id="quality-btn-ultra" class="quality-tier-btn interactive" data-preset="ultra" style="background: rgba(255, 255, 255, 0.05); border: 1.5px solid rgba(255, 255, 255, 0.15); border-radius: 10px; padding: 0.6rem 0.3rem; text-align: center; cursor: pointer; transition: all 0.25s ease;">
                  <div style="font-weight: 800; font-size: 0.85rem; color: #ff70a6;">فائق</div>
                  <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 0.15rem;">Ultra · أعلى دقة</div>
                  <div style="font-size: 0.65rem; color: #f43f5e; margin-top: 0.15rem;">أقصى ظلال وتفاصيل</div>
                </button>
              </div>

              <div id="quality-description-text" style="font-size: 0.74rem; color: #94d2bd; background: rgba(0, 0, 0, 0.35); padding: 0.45rem 0.75rem; border-radius: 8px; border: 1px dashed rgba(0, 245, 212, 0.25); text-align: right; direction: rtl;">
                متوازن: دقة عرض طبيعية، ظلال تفاعلية ناعمة، كثافة أعشاب متوازنة 60 إطاراً.
              </div>
            </div>

            <div class="setting-row">
              <div class="setting-label">
                <span>Master Volume</span>
                <span class="setting-sub">الصوت العام</span>
              </div>
              <input type="range" id="setting-master-vol" min="0" max="100" value="80" class="interactive" />
            </div>

            <div class="setting-row">
              <div class="setting-label">
                <span>Ambient Music</span>
                <span class="setting-sub">الموسيقى الأثيرية</span>
              </div>
              <input type="range" id="setting-music-vol" min="0" max="100" value="65" class="interactive" />
            </div>

            <div class="setting-row">
              <div class="setting-label">
                <span>Camera Orbit Speed</span>
                <span class="setting-sub">حساسية الكاميرا</span>
              </div>
              <input type="range" id="setting-cam-sens" min="50" max="200" value="100" class="interactive" />
            </div>

            <!-- CUSTOMIZE CONTROLS Section in Settings (Mobile Only) -->
            <div id="settings-customize-controls-row" class="setting-row" style="flex-direction: column; align-items: stretch; gap: 0.5rem; margin-top: 0.6rem; padding-top: 0.8rem; border-top: 1px solid rgba(0, 245, 212, 0.2);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="setting-label">
                  <span style="font-weight: 800; color: #00f5d4; font-size: 0.95rem;">CUSTOMIZE CONTROLS</span>
                  <span class="setting-sub" style="color: #94d2bd;">تخصيص أزرار التحكم والأنالوج</span>
                </div>
                <span style="font-size: 1.35rem;">🎮</span>
              </div>
              <button id="open-control-customizer-btn" type="button" class="modal-btn secondary interactive" style="width: 100%; border-color: rgba(0, 245, 212, 0.5); background: rgba(0, 245, 212, 0.12); color: #00f5d4; display: flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 0.75rem; font-weight: 700;">
                <span>⚙️ تعديل واجهة التحكم · Edit HUD Controls</span>
              </button>
            </div>

          <button id="close-settings-btn" class="modal-btn interactive">
            Done · تم
          </button>
        </div>
      </div>

      <!-- Pause Menu Modal (ESC Key) -->
      <div id="pause-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 440px;">
          <div class="modal-badge">Game Paused · متوقف مؤقتاً</div>
          <h2 class="modal-title-ar">الجزيرة المنسية</h2>
          <h3 class="modal-title-en">The Forgotten Island</h3>

          <div style="display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0;">
            <button id="resume-btn" class="modal-btn interactive" style="width: 100%;">
              Resume · متابعة اللعب
            </button>
            <button id="save-progress-btn" class="modal-btn secondary interactive" style="width: 100%;">
              Save Progress · حفظ التقدم
            </button>
            <button id="pause-multiplayer-btn" class="modal-btn secondary interactive" style="width: 100%; border-color: rgba(0, 245, 212, 0.4); color: #00f5d4;">
              👥 Party & Co-Op Hub · المجموعات واللعب الجماعي
            </button>
            <button id="pause-settings-btn" class="modal-btn secondary interactive" style="width: 100%;">
              Settings · الإعدادات
            </button>
            <button id="pause-reset-btn" class="modal-btn secondary interactive" style="width: 100%;">
              Respawn at Shore · العودة للشاطئ
            </button>
            <button id="pause-return-island-btn" class="modal-btn secondary interactive" style="width: 100%; border-color: rgba(0, 245, 212, 0.5); color: #00f5d4;">
              ⛩️ Return to Forgotten Island · العودة للجزيرة المنسية
            </button>
            <button id="pause-main-menu-btn" class="modal-btn secondary interactive" style="width: 100%; border-color: rgba(255, 100, 100, 0.4); color: #ff9999;">
              Return to Main Menu · القائمة الرئيسية
            </button>
          </div>
        </div>
      </div>

      <!-- Multiplayer, Friends, Party & Voice Hub Modal -->
      <div id="multiplayer-hub-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 700px; max-height: 90vh; overflow-y: auto; text-align: left; border-color: rgba(0, 245, 212, 0.45); box-shadow: 0 10px 50px rgba(0, 245, 212, 0.25);">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 8px; margin-bottom: 0.4rem;">
            <div class="modal-badge" style="color: #00f5d4; border-color: rgba(0, 245, 212, 0.4); background: rgba(0, 245, 212, 0.12);">
              LIVE ONLINE MULTIPLAYER · اللعب الجماعي المباشر
            </div>
            <span id="mp-network-status-badge" style="font-size: 0.74rem; color: #38bdf8; font-weight: 800; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35); padding: 0.2rem 0.65rem; border-radius: 9999px;">
              🟡 Connecting...
            </span>
          </div>

          <!-- 4 Hub Navigation Tabs -->
          <div class="mp-tabs">
            <button type="button" class="mp-tab-btn active interactive" data-mp-tab="rooms">🌍 Rooms · الغرف</button>
            <button type="button" class="mp-tab-btn interactive" data-mp-tab="party">🛡️ Party (4) · الفريق</button>
            <button type="button" class="mp-tab-btn interactive" data-mp-tab="friends">🤝 Friends · الأصدقاء</button>
            <button type="button" class="mp-tab-btn interactive" data-mp-tab="voice">🎙️ Voice & ID · الصوت</button>
          </div>

          <!-- TAB 1: ROOMS & CO-OP WORLD -->
          <div id="mp-panel-rooms" class="mp-tab-panel active">
            <div class="mp-card-box">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
                <div>
                  <div style="font-size:0.72rem;color:#94a3b8;font-weight:700;">CURRENT WORLD SESSION · الجلسة الحالية</div>
                  <div id="mp-current-room-name" style="font-size:0.95rem;font-weight:800;color:#fff;">Forgotten Island · Public Sanctuary</div>
                  <div style="font-size:0.75rem;color:#38bdf8;font-family:monospace;">ROOM ID: <span id="mp-current-room-id">ECHO-PUBLIC-1</span></div>
                </div>
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                  <button id="mp-copy-room-id-btn" type="button" class="mp-mini-btn interactive">📋 Copy ID</button>
                  <button id="mp-copy-invite-link-btn" type="button" class="mp-mini-btn gold interactive">🔗 Invite Link</button>
                  <button id="mp-leave-room-btn" type="button" class="mp-mini-btn warn interactive" style="display:none;">Leave to Public</button>
                </div>
              </div>
            </div>

            <div class="mp-card-box">
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:4px;">
                <span style="font-size:0.74rem;color:#38bdf8;font-weight:800;">CLOUDFLARE SERVER · خادم اللعب المباشر</span>
                <span id="mp-server-source-label" style="font-size:0.68rem;color:#94a3b8;font-family:monospace;">unconfigured</span>
              </div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
                <input id="mp-server-url-input" type="text" class="interactive" placeholder="wss://echo-multiplayer.your-subdomain.workers.dev" style="flex:1;min-width:190px;background:rgba(0,0,0,0.5);border:1px solid rgba(56,189,248,0.35);border-radius:8px;padding:6px 9px;color:#fff;font-size:0.78rem;font-family:monospace;" />
                <button id="mp-server-connect-btn" type="button" class="mp-mini-btn interactive">⚡ Connect</button>
              </div>
              <div id="mp-server-status-hint" style="font-size:0.68rem;color:#94a3b8;margin-top:5px;"></div>
            </div>

            <div class="mp-card-box">
              <div style="font-size:0.74rem;color:#00f5d4;font-weight:800;margin-bottom:6px;">CREATE FRIEND WORLD · إنشاء عالم مشترك</div>
              <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
                <input id="mp-create-room-name" type="text" class="interactive" placeholder="World Name (e.g. Our Sanctuary)" style="flex:2;min-width:150px;background:rgba(0,0,0,0.5);border:1px solid rgba(0,245,212,0.3);border-radius:8px;padding:6px 9px;color:#fff;font-size:0.8rem;" />
                <label style="display:flex;align-items:center;gap:5px;font-size:0.75rem;color:#cbd5e1;cursor:pointer;">
                  <input id="mp-create-room-private" type="checkbox" class="interactive" /> Private
                </label>
                <input id="mp-create-room-pass" type="text" class="interactive" placeholder="Passcode (optional)" style="width:120px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 8px;color:#fff;font-size:0.78rem;" />
                <button id="mp-create-room-btn" type="button" class="mp-mini-btn gold interactive">+ Create Room</button>
              </div>
            </div>

            <div class="mp-card-box">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-size:0.74rem;color:#94a3b8;font-weight:800;">JOIN BY CODE OR LIVE ROOMS · الانضمام لعالم</span>
                <button id="mp-refresh-rooms-btn" type="button" class="mp-mini-btn interactive">🔄 Refresh</button>
              </div>
              <div style="display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap;">
                <input id="mp-join-room-id-input" type="text" class="interactive" placeholder="Room ID (e.g. ECHO-PUB...)" style="flex:1;min-width:130px;background:rgba(0,0,0,0.5);border:1px solid rgba(56,189,248,0.35);border-radius:8px;padding:6px 8px;color:#fff;font-size:0.8rem;" />
                <input id="mp-join-room-pass-input" type="text" class="interactive" placeholder="Passcode" style="width:110px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 8px;color:#fff;font-size:0.8rem;" />
                <button id="mp-join-room-btn" type="button" class="mp-mini-btn interactive">Join Room</button>
              </div>
              <div id="mp-rooms-list" style="max-height:130px;overflow-y:auto;"></div>
            </div>

            <div class="mp-card-box">
              <div style="font-size:0.74rem;color:#94a3b8;font-weight:800;margin-bottom:4px;">PLAYERS IN THIS WORLD · اللاعبون في الغرفة</div>
              <div id="mp-room-players-list" style="max-height:150px;overflow-y:auto;"></div>
            </div>
          </div>

          <!-- TAB 2: CO-OP PARTY (4 MAX) -->
          <div id="mp-panel-party" class="mp-tab-panel">
            <div class="mp-card-box">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
                <span style="font-size:0.75rem;color:#94a3b8;font-weight:800;">CO-OP PARTY (4 MAX) · مجموعة الاستكشاف التعاونية</span>
                <div style="display:flex;align-items:center;gap:6px;">
                  <span id="mp-party-code-badge" style="font-size:0.75rem;color:#fee440;font-family:monospace;font-weight:800;background:rgba(254,228,64,0.12);padding:0.18rem 0.55rem;border-radius:5px;border:1px solid rgba(254,228,64,0.35);">CODE: ECHO-XXXX</span>
                  <button id="mp-copy-party-code-btn" type="button" class="mp-mini-btn gold interactive">Copy</button>
                </div>
              </div>

              <div id="mp-party-slots-container" style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.45rem;margin-bottom:0.6rem;">
                <div style="background:rgba(0,245,212,0.08);border:1px solid rgba(0,245,212,0.4);border-radius:8px;padding:0.5rem;text-align:center;">
                  <div style="font-size:1.1rem;">👑</div>
                  <div id="mp-slot-1-name" style="font-size:0.74rem;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">You</div>
                  <div style="font-size:0.65rem;color:#10b981;">100 HP</div>
                </div>
              </div>

              <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
                <input id="mp-join-party-code-input" type="text" class="interactive" placeholder="Party Passcode (e.g. ECHO-AB12)" style="flex:1;min-width:140px;background:rgba(0,0,0,0.5);border:1px solid rgba(254,228,64,0.35);border-radius:8px;padding:6px 8px;color:#fff;font-size:0.8rem;" />
                <button id="mp-join-party-btn" type="button" class="mp-mini-btn gold interactive">Join Party</button>
                <button id="mp-create-party-btn" type="button" class="mp-mini-btn interactive">New Party</button>
                <button id="mp-leave-party-btn" type="button" class="mp-mini-btn warn interactive">Leave Party</button>
              </div>

              <div style="font-size:0.72rem;color:#c4e9e4;background:rgba(0,0,0,0.35);padding:0.45rem 0.65rem;border-radius:6px;">
                <span>🎯 الهدف المشترك:</span> <span id="mp-shared-objective-text" style="color:#fee440;font-weight:700;">استكشاف أسرار المعبد العتيق والبلورات السبع</span>
              </div>

              <div style="font-size:0.72rem;color:#94a3b8;font-weight:700;margin-top:8px;">PARTY WAYPOINT PINGS · إشارات الخريطة للفريق</div>
              <div class="mp-ping-row">
                <button type="button" class="mp-mini-btn interactive mp-ping-btn" data-ping="EXPLORE">🧭 Explore</button>
                <button type="button" class="mp-mini-btn warn interactive mp-ping-btn" data-ping="DANGER">⚔️ Danger</button>
                <button type="button" class="mp-mini-btn gold interactive mp-ping-btn" data-ping="SHRINE">💎 Shrine</button>
                <button type="button" class="mp-mini-btn interactive mp-ping-btn" data-ping="HELP">🆘 Help</button>
              </div>
            </div>
          </div>

          <!-- TAB 3: FRIENDS & INVITES -->
          <div id="mp-panel-friends" class="mp-tab-panel">
            <div class="mp-card-box">
              <div style="font-size:0.74rem;color:#00f5d4;font-weight:800;margin-bottom:6px;">ADD FRIEND BY NAME OR UUID · إضافة صديق</div>
              <div style="display:flex;gap:6px;">
                <input id="mp-add-friend-input" type="text" class="interactive" placeholder="Enter friend username or UUID..." style="flex:1;background:rgba(0,0,0,0.5);border:1px solid rgba(0,245,212,0.35);border-radius:8px;padding:6px 9px;color:#fff;font-size:0.8rem;" />
                <button id="mp-add-friend-btn" type="button" class="mp-mini-btn interactive">+ Add Friend</button>
              </div>
            </div>

            <div class="mp-card-box">
              <div style="font-size:0.74rem;color:#f59e0b;font-weight:800;margin-bottom:4px;">PENDING INVITATIONS · الدعوات الواردة</div>
              <div id="mp-invites-list"></div>
            </div>

            <div class="mp-card-box">
              <div style="font-size:0.74rem;color:#94a3b8;font-weight:800;margin-bottom:4px;">FRIENDS LIST · قائمة الأصدقاء</div>
              <div id="mp-friends-list" style="max-height:190px;overflow-y:auto;"></div>
            </div>
          </div>

          <!-- TAB 4: VOICE CHAT & PROFILE -->
          <div id="mp-panel-voice" class="mp-tab-panel">
            <div class="mp-card-box">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
                <div>
                  <div style="font-size:0.74rem;color:#00f5d4;font-weight:800;">LIVE WEBRTC VOICE CHAT · الدردشة الصوتية الحية</div>
                  <div id="mp-voice-status-desc" style="font-size:0.72rem;color:#94a3b8;">Microphone is off. Click Enable to talk with your Room or Party.</div>
                </div>
                <div style="display:flex;gap:6px;">
                  <button id="mp-voice-enable-btn" type="button" class="mp-mini-btn interactive">🎙️ Enable Mic</button>
                  <button id="mp-voice-mute-btn" type="button" class="mp-mini-btn gold interactive" style="display:none;">🔊 Unmuted</button>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:10px;background:rgba(0,0,0,0.32);padding:7px 10px;border-radius:8px;margin-bottom:8px;">
                <span style="font-size:0.76rem;color:#cbd5e1;">🔊 Speaker Volume:</span>
                <input id="mp-voice-speaker-slider" type="range" min="0" max="100" value="85" class="interactive" style="flex:1;accent-color:#00f5d4;" />
                <span id="mp-voice-speaker-pct" style="font-size:0.76rem;font-weight:800;color:#00f5d4;min-width:38px;">85%</span>
              </div>
              <div style="font-size:0.72rem;color:#94a3b8;font-weight:700;">SESSION & PARTY VOICE PEERS (SCOPED) · المشاركون في الصوت</div>
              <div id="mp-voice-peers-list" style="max-height:110px;overflow-y:auto;"></div>
            </div>

            <!-- Player Identity & UUID Card -->
            <div class="mp-card-box">
              <div style="font-size:0.74rem;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:0.35rem;">
                Player Identity, Colors & Independent UUID · الهوية والألوان
              </div>
              <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.55rem;">
                <input type="text" id="mp-player-name-input" class="interactive" style="flex:1;background:rgba(0,0,0,0.5);border:1px solid rgba(0,245,212,0.35);border-radius:8px;padding:0.45rem 0.75rem;color:#fff;font-size:0.86rem;" placeholder="Adventurer Name" />
                <label title="Robe Color" style="display:flex;align-items:center;gap:4px;font-size:0.7rem;color:#cbd5e1;">
                  Robe <input id="mp-robe-color-input" type="color" value="#1e293b" class="interactive" style="width:28px;height:28px;border:none;background:none;cursor:pointer;" />
                </label>
                <label title="Aura Color" style="display:flex;align-items:center;gap:4px;font-size:0.7rem;color:#cbd5e1;">
                  Aura <input id="mp-aura-color-input" type="color" value="#00f5d4" class="interactive" style="width:28px;height:28px;border:none;background:none;cursor:pointer;" />
                </label>
                <button id="mp-save-name-btn" class="modal-btn interactive" style="padding:0.45rem 0.9rem;font-size:0.78rem;">
                  Save · حفظ
                </button>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.76rem;background:rgba(0,0,0,0.35);padding:0.4rem 0.65rem;border-radius:6px;">
                <span style="color:#64748b;">UUID:</span>
                <span id="mp-player-uuid-text" style="color:#38bdf8;font-family:monospace;">echo_usr_...</span>
                <button id="mp-copy-uuid-btn" class="interactive" style="background:transparent;border:1px solid rgba(56,189,248,0.3);color:#38bdf8;border-radius:4px;padding:0.15rem 0.45rem;font-size:0.7rem;cursor:pointer;">
                  Copy
                </button>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);">
                <div>
                  <div style="font-size:0.72rem;color:#00f5d4;font-weight:800;">☁️ CLOUDFLARE D1 CLOUD SAVE · الحفظ السحابي</div>
                  <div id="mp-cloud-status-text" style="font-size:0.68rem;color:#94a3b8;">Local save active · Connect Cloudflare Worker for D1 backup.</div>
                </div>
                <div style="display:flex;gap:6px;">
                  <button id="mp-cloud-sync-btn" type="button" class="mp-mini-btn interactive">☁️ Save Cloud</button>
                  <button id="mp-cloud-restore-btn" type="button" class="mp-mini-btn gold interactive">⬇️ Restore</button>
                </div>
              </div>
            </div>

            <!-- Character Class Selector -->
            <div class="mp-card-box">
              <div style="font-size:0.74rem;color:#94a3b8;font-weight:700;text-transform:uppercase;margin-bottom:0.45rem;">
                Adventurer Class Role · فئة ودور المغامر
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.45rem;">
                <button class="mp-class-btn interactive active" data-class="SPIRIT_WEAVER" style="background:rgba(0,245,212,0.12);border:1px solid #00f5d4;color:#fff;padding:0.45rem;border-radius:8px;text-align:left;cursor:pointer;">
                  <div style="font-weight:800;color:#00f5d4;font-size:0.82rem;">Spirit Weaver · نساج الأرواح</div>
                  <div style="font-size:0.68rem;color:#94a3b8;">Cyan Staff • Echo Resonance</div>
                </button>
                <button class="mp-class-btn interactive" data-class="ANCIENT_WARDEN" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:#fff;padding:0.45rem;border-radius:8px;text-align:left;cursor:pointer;">
                  <div style="font-weight:800;color:#a855f7;font-size:0.82rem;">Ancient Warden · حارس الأطلال</div>
                  <div style="font-size:0.68rem;color:#94a3b8;">Violet Shield • Temple Bastion</div>
                </button>
                <button class="mp-class-btn interactive" data-class="MIND_SEEKER" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:#fff;padding:0.45rem;border-radius:8px;text-align:left;cursor:pointer;">
                  <div style="font-weight:800;color:#38bdf8;font-size:0.82rem;">Mind Seeker · باحث الذاكرة</div>
                  <div style="font-size:0.68rem;color:#94a3b8;">Blue Ray • Memory Extraction</div>
                </button>
                <button class="mp-class-btn interactive" data-class="ECHO_BLADE" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);color:#fff;padding:0.45rem;border-radius:8px;text-align:left;cursor:pointer;">
                  <div style="font-weight:800;color:#f59e0b;font-size:0.82rem;">Echo Blade · سياف الصدى</div>
                  <div style="font-size:0.68rem;color:#94a3b8;">Golden Arc • Kinetic Slashes</div>
                </button>
              </div>
            </div>
          </div>

          <button id="close-multiplayer-btn" class="modal-btn interactive" style="width: 100%; margin-top: 0.35rem;">
            Done · تم
          </button>
        </div>
      </div>

      <!-- World Memory System Modal (ECHO MEMORY) -->
      <div id="world-memory-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 620px; max-height: 85vh; overflow-y: auto; text-align: left; border-color: rgba(254, 228, 64, 0.45); box-shadow: 0 10px 50px rgba(254, 228, 64, 0.22);">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div class="modal-badge" style="color: #fee440; border-color: rgba(254, 228, 64, 0.4); background: rgba(254, 228, 64, 0.12);">
              ECHO MEMORY SYSTEM · نظام ذاكرة العالم
            </div>
            <div id="memory-current-biome" style="font-size: 0.8rem; color: #70e1ff; font-weight: 700; background: rgba(0, 245, 212, 0.12); border: 1px solid rgba(0, 245, 212, 0.3); padding: 0.25rem 0.75rem; border-radius: 9999px;">
              📍 Southern Shoreline
            </div>
          </div>

          <div style="text-align: center; margin: 0.4rem 0;">
            <h2 class="modal-title-ar" style="margin: 0; font-size: 1.8rem; color: #ffffff;">كَيْفَ يَتَذَكَّرُكَ العَالَمُ</h2>
            <h3 class="modal-title-en" style="margin: 0; color: #a5d8ea;">The Island's Memory of You</h3>
          </div>

          <!-- Player Archetype Badge -->
          <div style="background: linear-gradient(135deg, rgba(0, 245, 212, 0.12) 0%, rgba(254, 228, 64, 0.08) 100%); border: 1.5px solid rgba(0, 245, 212, 0.35); border-radius: 16px; padding: 1.1rem; text-align: center;">
            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15rem; color: #72a5b8;">Current Soul Resonance · صدى الروح</div>
            <div id="memory-archetype-ar" style="font-family: 'Amiri', serif; font-size: 1.7rem; font-weight: 700; color: #00f5d4; margin: 0.2rem 0;">الرَّحَّالَةُ الصَّبُور</div>
            <div id="memory-archetype-en" style="font-family: 'Cinzel', serif; font-size: 0.95rem; letter-spacing: 0.1rem; color: #fee440;">The Patient Wanderer</div>
            <div style="margin-top: 0.6rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem;">
              <span style="font-size: 0.8rem; color: #a5d8ea;">Resonance Rank:</span>
              <span id="memory-resonance-level" style="font-weight: 800; color: #00f5d4; font-size: 0.95rem;">Rank 1</span>
            </div>
          </div>

          <!-- Behavior Statistics Grid -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(125px, 1fr)); gap: 0.65rem; margin: 0.8rem 0;">
            <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 0.75rem;">
              <div style="font-size: 0.72rem; color: #78a2b5;">Exploration Time · الوقت</div>
              <div id="stat-play-time" style="font-size: 1.15rem; font-weight: 800; color: #ffffff;">00:00</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 0.75rem;">
              <div style="font-size: 0.72rem; color: #78a2b5;">Sprint Distance · الركض</div>
              <div id="stat-sprint-dist" style="font-size: 1.15rem; font-weight: 800; color: #ffffff;">0 m</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 0.75rem;">
              <div style="font-size: 0.72rem; color: #78a2b5;">Zones Visited · المناطق</div>
              <div id="stat-zones-count" style="font-size: 1.15rem; font-weight: 800; color: #00f5d4;">1 / 8</div>
            </div>
            <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 0.75rem;">
              <div style="font-size: 0.72rem; color: #78a2b5;">Secrets Found · الأسرار</div>
              <div id="stat-secrets-count" style="font-size: 1.15rem; font-weight: 800; color: #fee440;">0</div>
            </div>
          </div>

          <!-- Unlocked World Transformations (Real 3D Changes) -->
          <div style="margin: 0.6rem 0;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #fee440; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>✦</span>
              <span>Active World Transformations · تحولات العالم الحقيقية</span>
            </div>
            <div id="manifestations-list" style="display: flex; flex-direction: column; gap: 0.45rem;">
            </div>
          </div>

          <!-- Time per Biome Breakdown -->
          <div style="margin-top: 0.6rem;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #a5d8ea; margin-bottom: 0.4rem;">
              Time Spent per Biome · التواجد في البيئات
            </div>
            <div id="biome-breakdown-list" style="display: flex; flex-direction: column; gap: 0.35rem;">
            </div>
          </div>

          <button id="close-memory-btn" class="modal-btn interactive" style="margin-top: 1rem; width: 100%; background: linear-gradient(135deg, #fee440 0%, #e09f3e 100%); color: #0d1b2a;">
            Return to World · العودة إلى الجزيرة
          </button>
        </div>
      </div>

      <!-- Lore Echo Memory Modal -->
      <div id="lore-modal" class="modal-overlay">
        <div class="modal-card">
          <div class="modal-badge">Ancient Memory Restored · صدى الذاكرة القديمة</div>
          <h2 id="lore-title-ar" class="modal-title-ar">بلورة الفجر</h2>
          <h3 id="lore-title-en" class="modal-title-en">Crystal of Dawn</h3>
          <div id="lore-location" class="modal-location">Whispering Pine Forest · غابة الصنوبر الهامسة</div>

          <p id="lore-text-ar" class="modal-quote-ar"></p>
          <p id="lore-text-en" class="modal-quote-en"></p>

          <button id="close-lore-btn" class="modal-btn interactive">
            Absorb Echo · استوعب الصدى
          </button>
        </div>
      </div>

      <!-- Ancient Inscription Modal -->
      <div id="inscription-modal" class="modal-overlay">
        <div class="modal-card" style="border-color: rgba(254, 228, 64, 0.45); box-shadow: 0 10px 50px rgba(254, 228, 64, 0.22);">
          <div class="modal-badge" style="color: #fee440; border-color: rgba(254, 228, 64, 0.4); background: rgba(254, 228, 64, 0.12);">
            Ancient Inscription · نقوش حجرية مقدسة
          </div>
          <div id="inscription-glyph" style="font-size: 2.4rem; letter-spacing: 0.6rem; color: #fee440; text-shadow: 0 0 20px rgba(254, 228, 64, 0.8); margin: 0.1rem 0;">ᚱ · ᛟ</div>
          <h2 id="inscription-title-ar" class="modal-title-ar" style="color: #ffffff; margin-top: 0;">مسلة العبور الأولى</h2>
          <h3 id="inscription-title-en" class="modal-title-en" style="color: #ffe875; margin-bottom: 0.4rem;">Stele of the First Crossing</h3>
          <div id="inscription-location" class="modal-location">Southern Arrival Beach · شاطئ الوصول الجنوبي</div>

          <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(254, 228, 64, 0.2); border-radius: 14px; padding: 1.2rem; margin: 0.4rem 0;">
            <p id="inscription-text-ar" class="modal-quote-ar" style="color: #f0f7f4; margin-bottom: 0.75rem; font-size: 1.25rem;"></p>
            <p id="inscription-text-en" class="modal-quote-en" style="color: #ccd7e0; font-size: 0.95rem;"></p>
          </div>

          <button id="close-inscription-btn" class="modal-btn interactive" style="background: linear-gradient(135deg, #fee440 0%, #e09f3e 100%); color: #0d1b2a;">
            Finish Reading · تم الانتهاء من القراءة
          </button>
        </div>
      </div>

      <!-- Victory / Portal Awakening Modal -->
      <div id="victory-modal" class="modal-overlay">
        <div class="modal-card">
          <div class="modal-badge">The Great Portal Awakens · استيقاظ البوابة العظيمة</div>
          <h2 class="modal-title-ar">العَالَمُ يَتَذَكَّر</h2>
          <h3 class="modal-title-en">The World Remembers</h3>
          <p style="font-size: 1.05rem; line-height: 1.6; color: #d0f0ec;">
            All 7 Echo Crystals have been harmonized! The celestial vortex of the Great Stone Portal has awakened, opening a radiant pathway across worlds.
          </p>
          <p style="font-family: 'Amiri', serif; font-size: 1.4rem; color: #00f5d4;">
            اكتملت أصداء الجزيرة المنسية، وانبثق النور الخالد من قلب البوابة الحجرية العتيقة!
          </p>
          <button id="victory-shadow-realm-btn" class="modal-btn interactive" style="background: linear-gradient(135deg, #7c3aed 0%, #db2777 100%); color: #ffffff; margin-bottom: 0.6rem;">
            Step Through Portal · اعبر البوابة إلى عالم الظلال
          </button>
          <button id="close-victory-btn" class="modal-btn interactive">
            Continue Journey · استمر في الرحلة
          </button>
        </div>
      </div>

      <!-- Death Screen Modal -->
      <div id="death-modal" class="modal-overlay">
        <div class="modal-card">
          <div class="death-rune-symbol">ᛋ · ᛟ</div>
          <div class="modal-badge" style="color: #ff3366;">ECHO SEVERED · انقطاع الصدى</div>
          <h2 class="modal-title-ar" style="color: #ff3366;">تلاشى صدى روحك</h2>
          <h3 class="modal-title-en" style="color: #fda4af;">Your Echo has Dissolved</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: #fecdd3; margin: 0.4rem 0;">
            لقد حاصرتك كائنات الخشب الفاسد وتلاشى جسدك الأثيري مؤقتاً. رمال الشاطئ تتذكرك وستعيد تكوين صدى روحك عند الملاذ.
          </p>
          <button id="death-revive-btn" class="modal-btn interactive" style="background: linear-gradient(135deg, #ff3366 0%, #be123c 100%); color: #ffffff; width: 100%;">
            Revive at Shore · استعادة الصدى عند الشاطئ
          </button>
        </div>
      </div>

      <!-- Story Narrative Modal (رسائل قصصية ومؤثرات عند اكتشاف الأحداث) -->
      <div id="story-narrative-modal" class="modal-overlay">
        <div class="modal-card">
          <div id="story-narrative-badge" class="modal-badge" style="color: #00f5d4; border-color: rgba(0, 245, 212, 0.4); background: rgba(0, 245, 212, 0.12);">
            بداية الرحلة · THE AWAKENING
          </div>
          <div style="font-size: 2.2rem; color: #00f5d4; text-shadow: 0 0 24px rgba(0, 245, 212, 0.8); margin: 0.2rem 0;">ᚱ · ᛟ · ᛋ</div>
          <h2 id="story-narrative-title-ar" class="modal-title-ar" style="color: #ffffff; margin-top: 0;">الاستيقاظ على شاطئ النسيان</h2>
          <h3 id="story-narrative-title-en" class="modal-title-en" style="color: #80ffea; margin-bottom: 0.35rem;">Awakening on Forgotten Sands</h3>

          <div class="story-narrative-text-box">
            <p id="story-narrative-content-ar" class="story-narrative-ar"></p>
            <div id="story-narrative-quote-box" style="margin: 0.8rem 0; padding: 0.6rem 0.85rem; background: rgba(0, 245, 212, 0.08); border-right: 3px solid #00f5d4; border-radius: 6px;">
              <p id="story-narrative-quote-ar" style="font-family: 'Amiri', serif; font-size: 1.15rem; color: #80ffea; font-style: italic; margin: 0;"></p>
            </div>
            <p id="story-narrative-content-en" class="story-narrative-en"></p>
          </div>

          <button id="close-story-narrative-btn" class="modal-btn interactive" style="background: linear-gradient(135deg, #00f5d4 0%, #00bbf9 100%); color: #061924; width: 100%; max-width: 320px;">
            Continue Journey · استمر في الرحلة
          </button>
        </div>
      </div>

      <!-- Quest & Story Chronicle Journal Modal (سجل المهام والقصة) -->
      <div id="quest-log-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 680px; max-height: 85vh; overflow-y: auto; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div class="modal-badge" style="color: #00f5d4; border-color: rgba(0, 245, 212, 0.4); background: rgba(0, 245, 212, 0.12);">
              QUEST & STORY JOURNAL · سجل المهام والقصة
            </div>
            <div style="font-size: 0.8rem; color: #fee440; font-weight: 700; background: rgba(254, 228, 64, 0.12); border: 1px solid rgba(254, 228, 64, 0.3); padding: 0.25rem 0.75rem; border-radius: 9999px;">
              ECHO SYSTEM
            </div>
          </div>

          <h2 class="modal-title-ar" style="text-align: right; margin-top: 0.2rem;">الذاكرة الأولى · The First Memory</h2>
          
          <!-- Story Premise Card -->
          <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(0, 245, 212, 0.25); border-radius: 14px; padding: 1rem 1.25rem; direction: rtl; text-align: right;">
            <div style="font-size: 0.78rem; font-weight: 800; color: #fee440; letter-spacing: 0.1rem; margin-bottom: 0.35rem;">
              حكاية الجزيرة المنسية · STORY PREMISE
            </div>
            <p style="font-family: 'Amiri', serif; font-size: 1.15rem; line-height: 1.7; color: #e4f7f4; margin: 0;">
              يستيقظ اللاعب في جزيرة مجهولة ولا يتذكر كيف وصل إليها. يكتشف أن العالم يحتفظ بذكريات كل من دخله، وتتردد أصداء أرواحهم في الحجر والماء والبلورات. لإيقاظ الجزيرة واستعادة الهوية، يجب إكمال أهداف الذاكرة الأولى تباعاً.
            </p>
          </div>

          <!-- Quest 1: The 5 Sequential Objectives -->
          <div style="margin-top: 0.4rem;">
            <div style="font-size: 0.85rem; font-weight: 800; color: #80ffea; letter-spacing: 0.08rem; text-transform: uppercase; margin-bottom: 0.6rem; display: flex; justify-content: space-between; align-items: center;">
              <span>أهداف المهمة الأولى · The First Memory</span>
              <span id="quest-log-progress-badge" style="color: #fee440; font-size: 0.8rem;">١ / ٥ مكتمل</span>
            </div>
            <div id="quest-log-list" style="display: flex; flex-direction: column; gap: 0.65rem;">
              <!-- Populated dynamically via renderQuestLog() -->
            </div>
          </div>

          <button id="close-quest-log-btn" class="modal-btn interactive" style="margin-top: 0.8rem; width: 100%;">
            Return to Exploration · العودة للاستكشاف
          </button>
        </div>
      </div>

      <!-- NPC Dialogue Modal (حوارات الشخصيات والمخلوقات التفاعلية) -->
      <div id="npc-dialogue-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 620px; padding: 1.8rem; border-color: rgba(0, 245, 212, 0.55); box-shadow: 0 15px 60px rgba(0, 245, 212, 0.35);">
          <!-- Header with Portrait and Title -->
          <div style="display: flex; gap: 1.1rem; align-items: center; width: 100%; border-bottom: 1px solid rgba(0, 245, 212, 0.25); padding-bottom: 1rem;">
            <div style="position: relative; width: 78px; height: 78px; border-radius: 50%; border: 2.5px solid #00f5d4; overflow: hidden; box-shadow: 0 0 20px rgba(0, 245, 212, 0.6); flex-shrink: 0; background: #000;">
              <img id="npc-portrait-img" src="./assets/aistudio/902496527_1823591332005868_4146964911404786464_n_35a4a4fd.jpg" alt="NPC Portrait" referrerpolicy="no-referrer" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="flex: 1; text-align: right; direction: rtl;">
              <div id="npc-title-badge" class="modal-badge" style="font-size: 0.75rem; color: #fee440; margin-bottom: 0.2rem;">
                حارس أسرار الغابة الهامسة · KEEPER
              </div>
              <h2 id="npc-name-ar" style="font-family: 'Amiri', serif; font-size: 1.8rem; color: #ffffff; margin: 0; line-height: 1.2;">
                عابر الغابة الغامض
              </h2>
              <div id="npc-name-en" style="font-size: 0.82rem; color: #80ffea; letter-spacing: 0.05rem; direction: ltr; text-align: left;">
                The Shrouded Wanderer
              </div>
            </div>
          </div>

          <!-- Dialogue Speech Box -->
          <div style="background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(0, 245, 212, 0.2); border-radius: 14px; padding: 1.25rem 1.4rem; text-align: right; direction: rtl; max-height: 240px; overflow-y: auto;">
            <p id="npc-dialogue-message-ar" style="font-family: 'Amiri', serif; font-size: 1.25rem; line-height: 1.7; color: #f0fdf4; margin: 0 0 0.8rem 0; white-space: pre-line;"></p>
            <p id="npc-dialogue-message-en" style="font-size: 0.88rem; line-height: 1.5; color: #94a7b0; margin: 0; direction: ltr; text-align: left; font-style: italic;"></p>
          </div>

          <!-- Dialogue Choices / Options Container -->
          <div id="npc-dialogue-options" style="display: flex; flex-direction: column; gap: 0.65rem; width: 100%; margin-top: 0.4rem;">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </div>

      <!-- Shared House Builder, Inventory & Crafting Modal (World 1 & World 2) -->
      <div id="build-craft-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 720px; text-align: left; border-color: rgba(56, 189, 248, 0.5);">
          <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
            <div class="modal-badge" style="color:#38bdf8;">HOUSE BUILDER & INVENTORY · بناء المنزل والمخزون</div>
            <button id="close-build-craft-btn" type="button" class="modal-btn secondary interactive" style="padding:0.35rem 0.9rem;font-size:0.82rem;">✕ Close</button>
          </div>
          <div id="build-craft-body"></div>
        </div>
      </div>

      <!-- Microphone Permission Request Modal (Triggered BEFORE navigator.mediaDevices.getUserMedia) -->
      <div id="voice-permission-modal" class="modal-overlay">
        <div class="modal-card" style="max-width: 460px; border-color: rgba(0, 245, 212, 0.55);">
          <div class="modal-badge" style="color: #00f5d4;">LIVE VOICE CHAT · الدردشة الصوتية الحية</div>
          <h2 class="modal-title-ar" style="font-size: 1.55rem;">إذن استخدام الميكروفون</h2>
          <h3 class="modal-title-en" style="margin-bottom: 0.4rem;">Microphone Access Permission</h3>
          <p style="font-size: 0.86rem; color: #cbd5e1; line-height: 1.5; margin: 0;">
            ECHO requests access to your microphone for real-time live WebRTC voice chat. Audio is shared strictly with players in your current Game Session or Party across World 1 and World 2, and you can mute or disable it anytime.
          </p>
          <p style="font-size: 0.84rem; color: #94d2bd; line-height: 1.5; margin: 0.45rem 0 0 0; direction: rtl;">
            يتطلب اللعب الجماعي إذن الوصول إلى الميكروفون للتحدث مع أصدقائك مباشرة في نفس الجلسة أو الفريق، ويمكنك كتم الصوت أو إيقافه في أي لحظة.
          </p>
          <div style="display:flex;gap:0.65rem;width:100%;margin-top:0.8rem;">
            <button id="voice-perm-cancel-btn" type="button" class="modal-btn secondary interactive" style="flex:1;">Cancel · إلغاء</button>
            <button id="voice-perm-allow-btn" type="button" class="modal-btn interactive" style="flex:1.4;background:#00f5d4;color:#04121b;font-weight:800;">🎙️ Allow Microphone</button>
          </div>
        </div>
      </div>

      <!-- Live Friend Invitation Toast -->
      <div id="mp-invite-toast" class="interactive">
        <div style="flex:1;">
          <div id="mp-invite-toast-title" style="font-size:0.8rem;font-weight:800;color:#fde047;">Friend Invitation</div>
          <div id="mp-invite-toast-sub" style="font-size:0.72rem;color:#cbd5e1;">You have been invited to join!</div>
        </div>
        <button id="mp-invite-accept-btn" type="button" class="mp-mini-btn interactive">Accept</button>
        <button id="mp-invite-decline-btn" type="button" class="mp-mini-btn warn interactive">Decline</button>
      </div>

      <!-- Synchronized Portal Travel Prompt -->
      <div id="mp-portal-toast" class="interactive">
        <div style="flex:1;">
          <div id="mp-portal-toast-title" style="font-size:0.82rem;font-weight:800;color:#e9d5ff;">🌀 Portal Synchronized</div>
          <div id="mp-portal-toast-sub" style="font-size:0.72rem;color:#cbd5e1;">A companion entered the portal!</div>
        </div>
        <button id="mp-portal-accept-btn" type="button" class="mp-mini-btn interactive">Travel Together · السفر معاً</button>
        <button id="mp-portal-stay-btn" type="button" class="mp-mini-btn warn interactive">Stay</button>
      </div>

      <!-- Landscape Orientation Enforcer (تثبيت الوضع الأفقي فقط على الهواتف) -->
      <div id="portrait-rotate-prompt">
        <div class="rotate-phone-icon">🔄 📱</div>
        <h2>PLEASE ROTATE DEVICE TO LANDSCAPE</h2>
        <p>الرجاء تدوير جهازك أو تفعيل الوضع الأفقي (Landscape 16:9) لتجربة اللعبة بأعلى دقة وسلاسة كما تم تصميمها.</p>
      </div>
    `;

    this.root.appendChild(wrapper);

    // Bind element references
    this.titleScreen = document.getElementById('title-screen')!;
    this.inGameHUD = document.getElementById('ingame-hud')!;
    this.loreModal = document.getElementById('lore-modal')!;
    this.inscriptionModal = document.getElementById('inscription-modal')!;
    this.victoryModal = document.getElementById('victory-modal')!;
    this.pauseModal = document.getElementById('pause-modal')!;
    this.settingsModal = document.getElementById('settings-modal')!;
    this.multiplayerModal = document.getElementById('multiplayer-hub-modal')!;
    this.voicePermModal = document.getElementById('voice-permission-modal')!;
    this.mpInviteToast = document.getElementById('mp-invite-toast')!;
    this.mpPortalToast = document.getElementById('mp-portal-toast')!;
    this.mpChatPanel = document.getElementById('mp-chat-panel')!;
    this.mpChatMessagesEl = document.getElementById('mp-chat-messages')!;
    this.mpChatInput = document.getElementById('mp-chat-input') as HTMLInputElement;
    this.toastNotification = document.getElementById('toast-notification')!;
    this.interactPrompt = document.getElementById('interact-prompt')!;

    // NPC Dialogue elements
    this.npcDialogueModal = document.getElementById('npc-dialogue-modal')!;
    this.npcPortraitImg = document.getElementById('npc-portrait-img') as HTMLImageElement;
    this.npcTitleBadge = document.getElementById('npc-title-badge')!;
    this.npcNameAr = document.getElementById('npc-name-ar')!;
    this.npcNameEn = document.getElementById('npc-name-en')!;
    this.npcDialogueMessageAr = document.getElementById('npc-dialogue-message-ar')!;
    this.npcDialogueMessageEn = document.getElementById('npc-dialogue-message-en')!;
    this.npcDialogueOptionsContainer = document.getElementById('npc-dialogue-options')!;

    // Quest & Story DOM elements
    this.questCluster = document.getElementById('quest-cluster')!;
    this.questChapterBadge = document.getElementById('quest-chapter-badge')!;
    this.questTitleText = document.getElementById('quest-title-text')!;
    this.questObjectiveBadge = document.getElementById('quest-objective-badge')!;
    this.questObjectiveTitleAr = document.getElementById('quest-objective-title-ar')!;
    this.questObjectiveTitleEn = document.getElementById('quest-objective-title-en')!;
    this.questObjectiveHint = document.getElementById('quest-objective-hint')!;
    this.questProgressBar = document.getElementById('quest-progress-fill')!;
    this.questProgressText = document.getElementById('quest-progress-text')!;

    this.objectiveCompleteBanner = document.getElementById('objective-complete-banner')!;
    this.objectiveCompleteTitle = document.getElementById('objective-complete-title')!;
    this.objectiveCompleteNext = document.getElementById('objective-complete-next')!;

    this.storyNarrativeModal = document.getElementById('story-narrative-modal')!;
    this.storyNarrativeBadge = document.getElementById('story-narrative-badge')!;
    this.storyNarrativeTitleAr = document.getElementById('story-narrative-title-ar')!;
    this.storyNarrativeTitleEn = document.getElementById('story-narrative-title-en')!;
    this.storyNarrativeContentAr = document.getElementById('story-narrative-content-ar')!;
    this.storyNarrativeContentEn = document.getElementById('story-narrative-content-en')!;
    this.storyNarrativeQuoteAr = document.getElementById('story-narrative-quote-ar')!;

    this.questLogModal = document.getElementById('quest-log-modal')!;
    this.questLogList = document.getElementById('quest-log-list')!;
    this.crystalSlotsContainer = document.getElementById('crystal-slots')!;
    this.minimapCanvas = document.getElementById('minimap-canvas') as HTMLCanvasElement;
    this.soundBtn = document.getElementById('sound-btn')!;
    this.sprintTouchBtn = document.getElementById('touch-sprint-btn')!;
    this.touchInteractBtn = document.getElementById('touch-interact-btn')!;
    this.joystickBase = document.getElementById('joystick-base')!;
    this.joystickKnob = document.getElementById('joystick-knob')!;
    this.continueBtn = document.getElementById('menu-continue-btn')!;
    this.continueStatus = document.getElementById('continue-status-badge')!;

    this.shardCountText = document.getElementById('shard-count-text')!;
    this.shardProgressFill = document.getElementById('shard-progress-fill')!;

    this.loreTitleAr = document.getElementById('lore-title-ar')!;
    this.loreTitleEn = document.getElementById('lore-title-en')!;
    this.loreLocation = document.getElementById('lore-location')!;
    this.loreTextAr = document.getElementById('lore-text-ar')!;
    this.loreTextEn = document.getElementById('lore-text-en')!;

    this.inscriptionTitleAr = document.getElementById('inscription-title-ar')!;
    this.inscriptionTitleEn = document.getElementById('inscription-title-en')!;
    this.inscriptionGlyph = document.getElementById('inscription-glyph')!;
    this.inscriptionLocation = document.getElementById('inscription-location')!;
    this.inscriptionTextAr = document.getElementById('inscription-text-ar')!;
    this.inscriptionTextEn = document.getElementById('inscription-text-en')!;

    this.worldMemoryModal = document.getElementById('world-memory-modal')!;

    // Combat HUD & Action elements
    this.playerHpBarFill = document.getElementById('player-hp-fill')!;
    this.playerHpText = document.getElementById('player-hp-text')!;
    this.playerEnergyBarFill = document.getElementById('player-energy-fill')!;
    this.playerEnergyText = document.getElementById('player-energy-text')!;
    this.underwaterOverlay = document.getElementById('underwater-fx-overlay')!;
    this.cameraModeBtn = document.getElementById('hud-camera-mode-btn')!;
    this.cameraModeLabelEl = document.getElementById('hud-camera-mode-label')!;
    this.weaponAmmoBadgeEl = document.getElementById('weapon-ammo-badge')!;
    this.weaponAimBtn = document.getElementById('weapon-aim-btn');
    this.weaponReloadBtn = document.getElementById('weapon-reload-btn')!;
    this.weaponSwitchBtns = Array.from(document.querySelectorAll('.weapon-switch-btn')) as HTMLElement[];
    this.bowDrawMeterEl = document.getElementById('bow-draw-meter')!;
    this.bowDrawMeterFillEl = document.getElementById('bow-draw-fill')!;
    this.sprintSpans = this.sprintTouchBtn?.querySelectorAll('span') ?? null;
    this.interactLabelEl = document.getElementById('interact-label');
    this.interactTouchSpans = this.touchInteractBtn?.querySelectorAll('span') ?? null;
    this.hurtVignetteOverlay = document.getElementById('hurt-vignette')!;
    this.deathModal = document.getElementById('death-modal')!;
    this.deathReviveBtn = document.getElementById('death-revive-btn')!;
    this.touchAttackBtn = document.getElementById('touch-attack-btn')!;
    this.touchDodgeBtn = document.getElementById('touch-dodge-btn')!;
    this.touchPulseBtn = document.getElementById('touch-pulse-btn')!;

    this.buildCraftModal = document.getElementById('build-craft-modal')!;
    this.buildCraftBody = document.getElementById('build-craft-body')!;
    this.buildModeBar = document.getElementById('build-mode-bar')!;
    this.buildModeBlockLabel = document.getElementById('build-mode-block-label')!;
    this.buildCrosshairEl = document.getElementById('build-crosshair')!;
    this.mcXpLevelEl = document.getElementById('mc-xp-level')!;
    this.mcXpFillEl = document.getElementById('mc-xp-fill')!;
    this.mcHotbarEl = document.getElementById('mc-hotbar')!;
    this.mcHotbarSlots = this.mcHotbarEl
      ? (Array.from(this.mcHotbarEl.querySelectorAll('.mc-hotbar-slot')) as HTMLElement[])
      : [];
    for (const k of [3, 4, 5, 6]) {
      const el = document.getElementById(`mc-slot-count-${k}`);
      if (el) this.mcSlotCountEls[k] = el;
    }
    this.mcCrystalCountEl = document.getElementById('mc-crystal-count-text')!;
    this.shadowRealmStatusBadge = document.getElementById('shadow-realm-status-badge')!;
    this.darkQuickBarEl = document.getElementById('dark-realm-quick-bar')!;
    this.darkBossBarEl = document.getElementById('dark-boss-hud-bar')!;
    this.darkBossNameEl = document.getElementById('dark-boss-name')!;
    this.darkBossFillEl = document.getElementById('dark-boss-fill')!;
    this.darkCompanionQuickBtn = document.getElementById('dark-quick-companion-btn')!;
    this.darkWeatherQuickBtn = document.getElementById('dark-quick-weather-btn')!;
    this.pauseReturnIslandBtn = document.getElementById('pause-return-island-btn')!;

    // Initialize 7 crystal slot indicators
    const colors = ['#00f5d4', '#00bbf9', '#9b5de5', '#f15bb5', '#fee440', '#52b788', '#ff70a6'];
    for (let i = 0; i < 7; i++) {
      const slot = document.createElement('div');
      slot.className = 'crystal-slot';
      slot.dataset.index = i.toString();
      slot.dataset.color = colors[i];
      this.crystalSlotsContainer.appendChild(slot);
    }

    // Initialize Customizable Controls & Layout Editor elements
    this.controlsLayer = document.getElementById('touch-controls-layer')!;
    this.layoutEditorOverlay = document.getElementById('hud-layout-editor-overlay')!;
    this.editorScaleSlider = document.getElementById('editor-scale-slider') as HTMLInputElement;
    this.editorScaleValueText = document.getElementById('editor-scale-value')!;
    this.editorSelectedNameText = document.getElementById('editor-selected-name')!;
    this.editorOrientationBadge = document.getElementById('editor-orientation-badge')!;

    this.initControlsLayout();

    // Attach Event Listeners
    // Main Menu Buttons
    this.continueBtn.addEventListener('click', () => {
      this.callbacks.onContinueGame();
    });

    document.getElementById('menu-new-game-btn')?.addEventListener('click', () => {
      this.callbacks.onNewGame();
    });

    document.getElementById('menu-shadow-realm-btn')?.addEventListener('click', () => {
      this.callbacks.onEnterShadowRealm?.();
    });

    document.getElementById('menu-memory-btn')?.addEventListener('click', () => {
      this.openWorldMemoryModal(this.callbacks.getMemoryProfile());
    });

    document.getElementById('menu-settings-btn')?.addEventListener('click', () => {
      this.openSettingsModal();
    });

    document.getElementById('menu-exit-btn')?.addEventListener('click', () => {
      this.callbacks.onExitGame();
    });

    document.getElementById('menu-quest-log-btn')?.addEventListener('click', () => {
      if (this.callbacks.getQuestSystem) {
        this.openQuestLogModal(this.callbacks.getQuestSystem());
      }
    });

    document.getElementById('mc-quest-toggle-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.questCluster?.classList.toggle('open');
    });

    document.getElementById('quest-journal-shortcut-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.suppressOriginalHotkeys && this.callbacks.onOpenDarkQuests) {
        this.callbacks.onOpenDarkQuests();
        return;
      }
      if (this.callbacks.getQuestSystem) {
        this.openQuestLogModal(this.callbacks.getQuestSystem());
      }
    });

    // World 2 Quick Action Bar & Pause Return to Island
    document.getElementById('dark-quick-map-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onOpenDarkMap?.();
    });
    document.getElementById('dark-quick-quests-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onOpenDarkQuests?.();
    });
    this.darkCompanionQuickBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onCycleDarkCompanionMode?.();
    });
    this.darkWeatherQuickBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onCycleDarkWeather?.();
    });
    document.getElementById('dark-quick-fireball-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onCastDarkFireball?.();
    });
    document.getElementById('dark-quick-island-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onReturnToIsland?.();
    });

    // Minecraft 8-Slot Hotbar Events
    this.mcHotbarEl?.querySelectorAll('.mc-hotbar-slot').forEach((btn) => {
      const activateSlot = (e: Event) => {
        if (this.isCustomizingControls) return;
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt((btn as HTMLElement).dataset.slot || '0', 10);
        if (!Number.isNaN(idx)) {
          this.callbacks.onSelectHotbarSlot?.(idx);
        }
      };
      btn.addEventListener('pointerdown', activateSlot);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    // Weapon Switcher Bar Events
    document.querySelectorAll('.weapon-switch-btn').forEach((btn) => {
      const selectW = (e: Event) => {
        if (this.isCustomizingControls) return;
        e.preventDefault();
        e.stopPropagation();
        const w = (btn as HTMLElement).dataset.weapon as WeaponType | undefined;
        if (w) {
          this.callbacks.onSelectWeapon?.(w);
        }
      };
      btn.addEventListener('pointerdown', selectW);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    this.weaponReloadBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onReloadWeapon?.();
    });

    if (this.weaponAimBtn) {
      this.weaponAimBtn.addEventListener('pointerdown', (e) => {
        if (this.isCustomizingControls) return;
        e.preventDefault();
        e.stopPropagation();
        this.callbacks.onSecondaryHoldChange?.(true);
      });
      const releaseAim = () => {
        this.callbacks.onSecondaryHoldChange?.(false);
      };
      this.weaponAimBtn.addEventListener('pointerup', releaseAim);
      this.weaponAimBtn.addEventListener('pointercancel', releaseAim);
      window.addEventListener('pointerup', releaseAim);
      window.addEventListener('pointercancel', releaseAim);
    }

    this.cameraModeBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isFpp = this.callbacks.onToggleCameraMode?.();
      if (typeof isFpp === 'boolean') {
        this.updateCameraModeButton(isFpp);
      }
    });

    // Top HUD Actions
    document.getElementById('hud-build-btn')?.addEventListener('click', () => {
      this.callbacks.onOpenBuildMenu?.();
    });

    document.getElementById('close-build-craft-btn')?.addEventListener('click', () => {
      this.closeBuildCraftModal();
    });

    document.getElementById('build-bar-rotate-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onRotateBlock?.();
    });

    document.getElementById('build-bar-break-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onBreakBlock?.();
    });

    document.getElementById('build-bar-kit-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onOpenBuildMenu?.();
    });

    document.getElementById('build-bar-exit-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.callbacks.onExitBuildMode?.();
    });

    this.soundBtn.addEventListener('click', () => {
      this.callbacks.onToggleSound();
    });

    document.getElementById('hud-settings-btn')?.addEventListener('click', () => {
      this.openSettingsModal();
    });

    document.getElementById('reset-btn')?.addEventListener('click', () => {
      this.callbacks.onResetPosition();
    });

    document.getElementById('pause-btn')?.addEventListener('click', () => {
      this.togglePause();
    });

    // Pause Modal Buttons
    document.getElementById('resume-btn')?.addEventListener('click', () => {
      this.togglePause();
    });

    document.getElementById('save-progress-btn')?.addEventListener('click', () => {
      const success = this.callbacks.onSaveGame();
      this.showToast(success ? 'Progress Saved! · تم حفظ التقدم بنجاح' : 'Could not save progress');
    });

    document.getElementById('pause-settings-btn')?.addEventListener('click', () => {
      this.openSettingsModal();
    });

    document.getElementById('pause-reset-btn')?.addEventListener('click', () => {
      this.togglePause();
      this.callbacks.onResetPosition();
    });

    this.pauseReturnIslandBtn?.addEventListener('click', () => {
      this.pauseModal.classList.remove('open');
      this.isPaused = false;
      this.callbacks.onReturnToIsland?.();
    });

    document.getElementById('pause-main-menu-btn')?.addEventListener('click', () => {
      this.pauseModal.classList.remove('open');
      this.isPaused = false;
      this.callbacks.onExitGame();
    });

    // Settings Modal
    document.getElementById('close-settings-btn')?.addEventListener('click', () => {
      this.closeSettingsModal();
    });

    // EDIT HUD CONTROLS Button in Settings
    document.getElementById('open-control-customizer-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.enterControlsEditMode();
    });

    // World Memory Modal
    document.getElementById('close-memory-btn')?.addEventListener('click', () => {
      this.closeWorldMemoryModal();
    });

    // Multiplayer Hub Modal Triggers
    document.getElementById('menu-multiplayer-btn')?.addEventListener('click', () => {
      this.openMultiplayerModal();
    });
    document.getElementById('hud-multiplayer-btn')?.addEventListener('click', () => {
      this.openMultiplayerModal();
    });
    document.getElementById('pause-multiplayer-btn')?.addEventListener('click', () => {
      this.openMultiplayerModal();
    });
    document.getElementById('close-multiplayer-btn')?.addEventListener('click', () => {
      this.closeMultiplayerModal();
    });

    // Save Name, Robe & Aura Colors Button
    document.getElementById('mp-save-name-btn')?.addEventListener('click', () => {
      const input = document.getElementById('mp-player-name-input') as HTMLInputElement;
      const robeInput = document.getElementById('mp-robe-color-input') as HTMLInputElement;
      const auraInput = document.getElementById('mp-aura-color-input') as HTMLInputElement;
      const coord = this.callbacks.getMultiplayerCoordinator?.() as MultiplayerCoordinator | undefined;
      if (coord && input && input.value.trim()) {
        const cls = coord.account.getProfile().characterClass;
        coord.updateLocalIdentity(
          input.value.trim(),
          cls,
          robeInput?.value || undefined,
          auraInput?.value || undefined
        );
        this.showToast(`✦ تم تحديث هوية المغامر: ${input.value.trim()}`);
        this.updateMultiplayerModalContent();
      }
    });

    // Copy UUID Button
    document.getElementById('mp-copy-uuid-btn')?.addEventListener('click', () => {
      const coord = this.callbacks.getMultiplayerCoordinator?.() as MultiplayerCoordinator | undefined;
      if (coord) {
        const uuid = coord.account.getProfile().id;
        navigator.clipboard?.writeText(uuid).catch(() => {});
        this.showToast('📋 تم نسخ معرف اللاعب الفريد (Player UUID)');
      }
    });

    // Class selection buttons
    document.querySelectorAll('.mp-class-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const cls = target.getAttribute('data-class') as CharacterClass | null;
        if (cls) {
          const coord = this.callbacks.getMultiplayerCoordinator?.() as MultiplayerCoordinator | undefined;
          if (coord) {
            const p = coord.account.getProfile();
            coord.updateLocalIdentity(p.username, cls, p.robeColor, p.auraColor);
            this.showToast(`✦ تم اختيار فئة المغامر: ${cls}`);
            this.updateMultiplayerModalContent();
          }
        }
      });
    });

    // Story Narrative Modal Close
    document.getElementById('close-story-narrative-btn')?.addEventListener('click', () => {
      this.closeStoryNarrativeModal();
    });

    // Quest Log Modal Close
    document.getElementById('close-quest-log-btn')?.addEventListener('click', () => {
      this.closeQuestLogModal();
    });

    // Listen for 'Escape', 'M' (World Memory), 'J' (Quest Journal), 'P' (Multiplayer), and 'T'/'Enter' (Chat)
    window.addEventListener('keydown', (e) => {
      const targetEl = e.target instanceof HTMLElement ? e.target : null;
      if (targetEl?.closest('input, textarea, select')) return;

      if (e.code === 'Escape') {
        if (document.querySelector('.dr-modal.open')) return;
        e.preventDefault();
        this.handleEscapeKey(this.titleScreen.classList.contains('hidden'));
        return;
      }

      if (!this.suppressOriginalHotkeys) {
        if ((e.code === 'KeyM' || e.key === 'm' || e.key === 'M' || e.key === 'ة') && !this.isModalOpen && !this.isPaused) {
          this.openWorldMemoryModal(this.callbacks.getMemoryProfile());
        } else if ((e.code === 'KeyM' || e.key === 'm' || e.key === 'M' || e.key === 'ة') && this.worldMemoryModal.classList.contains('open')) {
          this.closeWorldMemoryModal();
        }
      }

      if ((e.code === 'KeyJ' || e.key === 'j' || e.key === 'J' || e.key === 'ت') && !this.isModalOpen && !this.isPaused) {
        if (this.suppressOriginalHotkeys && this.callbacks.onOpenDarkQuests) {
          this.callbacks.onOpenDarkQuests();
        } else if (this.callbacks.getQuestSystem) {
          this.openQuestLogModal(this.callbacks.getQuestSystem());
        }
      } else if ((e.code === 'KeyJ' || e.key === 'j' || e.key === 'J' || e.key === 'ت') && this.questLogModal.classList.contains('open')) {
        this.closeQuestLogModal();
      }

      if ((e.code === 'KeyP' || e.key === 'p' || e.key === 'P' || e.key === 'ح') && !this.isModalOpen && !this.isPaused) {
        this.openMultiplayerModal();
      } else if ((e.code === 'KeyP' || e.key === 'p' || e.key === 'P' || e.key === 'ح') && this.multiplayerModal?.classList.contains('open')) {
        this.closeMultiplayerModal();
      }

      if (
        e.code === 'Enter' &&
        !this.isModalOpen &&
        !this.isPaused &&
        this.titleScreen.classList.contains('hidden')
      ) {
        e.preventDefault();
        this.focusChatInput();
      }
    });

    const masterVolSlider = document.getElementById('setting-master-vol') as HTMLInputElement;
    const musicVolSlider = document.getElementById('setting-music-vol') as HTMLInputElement;
    const onVolChange = () => {
      const master = parseFloat(masterVolSlider.value) / 100;
      const music = parseFloat(musicVolSlider.value) / 100;
      this.callbacks.onUpdateVolume(master, music);
    };
    masterVolSlider?.addEventListener('input', onVolChange);
    musicVolSlider?.addEventListener('input', onVolChange);

    const sensSlider = document.getElementById('setting-cam-sens') as HTMLInputElement;
    sensSlider?.addEventListener('input', () => {
      const sens = parseFloat(sensSlider.value) / 100;
      this.callbacks.onUpdateCameraSens(sens);
    });

    // Quality Preset Buttons (Low, Medium, Ultra)
    const qualityBtns = document.querySelectorAll('.quality-tier-btn');
    const qualityBadge = document.getElementById('active-quality-badge');
    const qualityDesc = document.getElementById('quality-description-text');

    const updateQualityUI = (preset: 'low' | 'medium' | 'ultra') => {
      qualityBtns.forEach((btn) => {
        const p = btn.getAttribute('data-preset');
        if (p === preset) {
          btn.classList.add('active');
          (btn as HTMLElement).style.background = 'rgba(0, 245, 212, 0.16)';
          (btn as HTMLElement).style.borderColor = '#00f5d4';
          (btn as HTMLElement).style.boxShadow = '0 0 16px rgba(0, 245, 212, 0.3)';
        } else {
          btn.classList.remove('active');
          (btn as HTMLElement).style.background = 'rgba(255, 255, 255, 0.04)';
          (btn as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)';
          (btn as HTMLElement).style.boxShadow = 'none';
        }
      });

      if (qualityBadge) {
        if (preset === 'low') {
          qualityBadge.textContent = 'ناعم · Low (أقصى سرعة)';
          qualityBadge.style.color = '#80ffea';
          qualityBadge.style.borderColor = '#80ffea';
        } else if (preset === 'medium') {
          qualityBadge.textContent = 'قياسي · Medium (متوازن)';
          qualityBadge.style.color = '#fee440';
          qualityBadge.style.borderColor = '#fee440';
        } else {
          qualityBadge.textContent = 'فائق · Ultra (أعلى دقة)';
          qualityBadge.style.color = '#ff70a6';
          qualityBadge.style.borderColor = '#ff70a6';
        }
      }

      if (qualityDesc) {
        if (preset === 'low') {
          qualityDesc.textContent = 'ناعم: إيقاف الظلال الكثيفة، تقليل كثافة الأعشاب، دقة شاشة محسنة للأجهزة الضعيفة ومعدل 60+ FPS ثابت.';
        } else if (preset === 'medium') {
          qualityDesc.textContent = 'متوازن: دقة عرض طبيعية، ظلال تفاعلية ناعمة، كثافة أعشاب متوازنة 60 إطاراً.';
        } else {
          qualityDesc.textContent = 'فائق: أعلى دقة بصرية، أقصى عمق للظلال والإضاءة وتفاصيل كاملة للأشجار والمؤثرات للأجهزة القوية.';
        }
      }
    };

    // Initial quality state from manager
    const initialPreset = this.callbacks.getCurrentQualityPreset?.() || 'medium';
    updateQualityUI(initialPreset);

    qualityBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const preset = btn.getAttribute('data-preset') as 'low' | 'medium' | 'ultra';
        if (preset) {
          updateQualityUI(preset);
          this.callbacks.onQualityPresetChanged?.(preset);
          this.showToast(
            preset === 'low'
              ? '⚡ تم تفعيل نمط الجودة الناعم (أقصى أداء وسلاسة)'
              : preset === 'medium'
              ? '⚖️ تم تفعيل النمط القياسي (جودة متوازنة)'
              : '✨ تم تفعيل النمط الفائق (أعلى دقة رسومية وظلال)'
          );
        }
      });
    });

    // Lore Modal
    document.getElementById('close-lore-btn')?.addEventListener('click', () => {
      this.closeLoreModal();
    });

    // Inscription Modal
    document.getElementById('close-inscription-btn')?.addEventListener('click', () => {
      this.closeInscriptionModal();
    });

    // Victory Modal
    document.getElementById('victory-shadow-realm-btn')?.addEventListener('click', () => {
      this.victoryModal.classList.remove('open');
      this.syncModalOpenState();
      this.callbacks.onEnterShadowRealm?.();
    });
    document.getElementById('close-victory-btn')?.addEventListener('click', () => {
      this.victoryModal.classList.remove('open');
      this.syncModalOpenState();
    });

    // Interaction Prompts
    this.interactPrompt.addEventListener('click', () => {
      this.callbacks.onInteract();
    });

    const bindDebouncedAction = (el: HTMLElement | null, cb: () => void, cooldownMs: number = 160) => {
      if (!el) return;
      let lastTrigger = 0;
      const trigger = (e: Event) => {
        if (this.isCustomizingControls) return;
        e.preventDefault();
        e.stopPropagation();
        const now = performance.now();
        if (now - lastTrigger < cooldownMs) return;
        lastTrigger = now;
        cb();
      };
      el.addEventListener('pointerdown', trigger);
      el.addEventListener('click', trigger);
    };

    bindDebouncedAction(document.getElementById('touch-jump-btn'), () => this.callbacks.onJump());
    bindDebouncedAction(document.getElementById('touch-interact-btn'), () => this.callbacks.onInteract());

    // 1. Sprint Button (Tap to toggle auto-run forward / Hold to run forward while held)
    const startSprint = (e: Event) => {
      if (this.isCustomizingControls) return;
      e.preventDefault();
      e.stopPropagation();

      if (typeof TouchEvent !== 'undefined' && e instanceof TouchEvent) {
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (this.sprintTouchId === null) {
            this.sprintTouchId = t.identifier;
            break;
          }
        }
      } else if (typeof PointerEvent !== 'undefined' && e instanceof PointerEvent) {
        if (e.pointerType === 'touch') return; // Handled via touchstart/touchend for multi-touch precision
        this.sprintPointerId = e.pointerId;
      }

      if (this.isSprintHeld) return;
      this.isSprintHeld = true;
      this.sprintPressTime = performance.now();

      if (!this.isAutoRunning) {
        this.updateAutoRunUI(true);
        this.callbacks.onTouchSprintState?.(true);
      }
    };

    const stopSprint = (e?: Event) => {
      if (!this.isSprintHeld) return;
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.isSprintHeld = false;
      this.sprintTouchId = null;
      this.sprintPointerId = null;
      const duration = performance.now() - this.sprintPressTime;

      if (duration < 320) {
        this.isAutoRunning = !this.isAutoRunning;
        this.updateAutoRunUI(this.isAutoRunning);
        this.callbacks.onTouchSprintState?.(this.isAutoRunning);
      } else {
        this.isAutoRunning = false;
        this.updateAutoRunUI(false);
        this.callbacks.onTouchSprintState?.(false);
      }
    };

    this.sprintTouchBtn.addEventListener('pointerdown', startSprint);
    this.sprintTouchBtn.addEventListener('pointerup', (e: PointerEvent) => {
      if (e.pointerType !== 'touch' && e.pointerId === this.sprintPointerId) stopSprint(e);
    });
    this.sprintTouchBtn.addEventListener('pointercancel', (e: PointerEvent) => {
      if (e.pointerType !== 'touch' && e.pointerId === this.sprintPointerId) stopSprint(e);
    });
    this.sprintTouchBtn.addEventListener('pointerleave', (e: PointerEvent) => {
      if (e.pointerType !== 'touch' && this.isSprintHeld && e.pointerId === this.sprintPointerId) stopSprint(e);
    });

    // Multi-touch safe mobile sprint listeners (strictly track sprintTouchId)
    this.sprintTouchBtn.addEventListener('touchstart', startSprint, { passive: false });
    this.sprintTouchBtn.addEventListener('touchend', (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === this.sprintTouchId) {
          stopSprint(e);
          break;
        }
      }
    }, { passive: false });
    this.sprintTouchBtn.addEventListener('touchcancel', (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === this.sprintTouchId) {
          stopSprint(e);
          break;
        }
      }
    }, { passive: false });

    // Window release listeners filtered strictly by active sprint touch/pointer ID
    window.addEventListener('pointerup', (e: PointerEvent) => {
      if (e.pointerType !== 'touch' && this.isSprintHeld && e.pointerId === this.sprintPointerId) stopSprint();
    });
    window.addEventListener('touchend', (e: TouchEvent) => {
      if (!this.isSprintHeld || this.sprintTouchId === null) return;
      const liftedSprint = Array.from(e.changedTouches).some((t) => t.identifier === this.sprintTouchId);
      const stillPresent = Array.from(e.touches).some((t) => t.identifier === this.sprintTouchId);
      if (liftedSprint || !stillPresent) stopSprint();
    });
    window.addEventListener('touchcancel', (e: TouchEvent) => {
      if (!this.isSprintHeld || this.sprintTouchId === null) return;
      const canceledSprint = Array.from(e.changedTouches).some((t) => t.identifier === this.sprintTouchId);
      const stillPresent = Array.from(e.touches).some((t) => t.identifier === this.sprintTouchId);
      if (canceledSprint || !stillPresent) stopSprint();
    });
    window.addEventListener('blur', () => this.resetAllTouchStates());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.resetAllTouchStates();
    });

    // Combat Touch Actions (Instant pointer response with pointerdown+click deduplication)
    const bindCombatTouch = (el: HTMLElement | null, cb?: () => void) => {
      if (!el) return;
      let lastTrigger = 0;
      const trigger = (e: Event) => {
        if (this.isCustomizingControls) return;
        e.preventDefault();
        e.stopPropagation();
        const now = performance.now();
        if (now - lastTrigger < 160) return;
        lastTrigger = now;
        cb?.();
      };
      el.addEventListener('pointerdown', trigger);
      el.addEventListener('click', trigger);
    };
    bindCombatTouch(this.touchAttackBtn, () => this.callbacks.onCombatAttack?.());
    this.touchAttackBtn?.addEventListener('pointerdown', () => {
      if (!this.isCustomizingControls) this.callbacks.onAttackHoldChange?.(true);
    });
    const releaseTouchAttack = () => {
      this.callbacks.onAttackHoldChange?.(false);
    };
    this.touchAttackBtn?.addEventListener('pointerup', releaseTouchAttack);
    this.touchAttackBtn?.addEventListener('pointercancel', releaseTouchAttack);
    window.addEventListener('pointerup', releaseTouchAttack);
    bindCombatTouch(this.touchDodgeBtn, () => this.callbacks.onCombatDodge?.());
    bindCombatTouch(this.touchPulseBtn, () => this.callbacks.onCombatPulse?.());

    // Death Modal Revive Action
    this.deathReviveBtn?.addEventListener('click', () => {
      if (this.onDeathReviveCallback) {
        this.onDeathReviveCallback();
      } else {
        this.callbacks.onRespawnRequested?.();
      }
    });
  }

  /**
   * Toggles Auto Run state (الركض التلقائي)
   */
  public toggleAutoRun(forceState?: boolean): boolean {
    if (this.isCustomizingControls) return this.isAutoRunning;
    this.isAutoRunning = forceState !== undefined ? forceState : !this.isAutoRunning;
    this.updateAutoRunUI(this.isAutoRunning);
    this.callbacks.onTouchSprintState?.(this.isAutoRunning);
    return this.isAutoRunning;
  }

  public updateAutoRunUI(active: boolean): void {
    if (!this.sprintTouchBtn || this.lastAutoRunState === active) return;
    this.lastAutoRunState = active;
    if (active) {
      this.sprintTouchBtn.classList.add('auto-run-active');
      if (this.sprintSpans && this.sprintSpans.length >= 2) {
        this.sprintSpans[0].textContent = 'SPRINT';
        this.sprintSpans[1].textContent = 'ركض نشط';
      }
    } else {
      this.sprintTouchBtn.classList.remove('auto-run-active');
      if (this.sprintSpans && this.sprintSpans.length >= 2) {
        this.sprintSpans[0].textContent = 'RUN';
        this.sprintSpans[1].textContent = 'ركض';
      }
    }
  }

  // ==========================================
  // CUSTOMIZABLE CONTROLS & HUD LAYOUT SYSTEM
  // ==========================================

  private readonly CONTROL_LABELS: Record<CustomizableControlId, { ar: string; en: string }> = {
    joystick: { ar: 'أنالوج الحركة', en: 'Movement Joystick' },
    sprint:   { ar: 'زر الركض', en: 'Sprint Button' },
    jump:     { ar: 'زر القفز', en: 'Jump Button' },
    attack:   { ar: 'زر الهجوم بالسيف', en: 'Attack / Slash' },
    dodge:    { ar: 'زر التدحرج والتفادي', en: 'Dodge Roll' },
    pulse:    { ar: 'زر نبض الأثير', en: 'Echo Pulse' },
    interact: { ar: 'زر التواصل والصدى', en: 'Commune / Interact' },
  };

  private readonly DEFAULT_LANDSCAPE_LAYOUT: LayoutConfiguration = {
    joystick: { xPercent: 0.025, yPercent: 0.62, scale: 1.0 },
    sprint:   { xPercent: 0.79,  yPercent: 0.80, scale: 1.0 },
    jump:     { xPercent: 0.89,  yPercent: 0.78, scale: 1.0 },
    interact: { xPercent: 0.71,  yPercent: 0.80, scale: 1.0 },
    attack:   { xPercent: 0.90,  yPercent: 0.56, scale: 1.0 },
    dodge:    { xPercent: 0.80,  yPercent: 0.60, scale: 1.0 },
    pulse:    { xPercent: 0.72,  yPercent: 0.60, scale: 1.0 },
  };

  private readonly DEFAULT_PORTRAIT_LAYOUT: LayoutConfiguration = {
    joystick: { xPercent: 0.025, yPercent: 0.62, scale: 1.0 },
    sprint:   { xPercent: 0.79,  yPercent: 0.80, scale: 1.0 },
    jump:     { xPercent: 0.89,  yPercent: 0.78, scale: 1.0 },
    interact: { xPercent: 0.71,  yPercent: 0.80, scale: 1.0 },
    attack:   { xPercent: 0.90,  yPercent: 0.56, scale: 1.0 },
    dodge:    { xPercent: 0.80,  yPercent: 0.60, scale: 1.0 },
    pulse:    { xPercent: 0.72,  yPercent: 0.60, scale: 1.0 },
  };

  public getCurrentOrientation(): 'landscape' | 'portrait' {
    // Game is strictly locked to Landscape mode (16:9)
    return 'landscape';
  }

  public loadControlsLayout(orientation: 'landscape' | 'portrait' = 'landscape'): LayoutConfiguration {
    const key = `echo_controls_layout_landscape_v4`;
    const fallback = this.DEFAULT_LANDSCAPE_LAYOUT;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...fallback, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Failed to load saved controls layout:', e);
    }
    return JSON.parse(JSON.stringify(fallback));
  }

  public saveControlsLayout(orientation: 'landscape' | 'portrait', layout: LayoutConfiguration): void {
    const key = `echo_controls_layout_landscape_v4`;
    try {
      localStorage.setItem(key, JSON.stringify(layout));
    } catch (e) {
      console.warn('Failed to save controls layout:', e);
    }
  }

  public applyControlsLayout(orientation?: 'landscape' | 'portrait'): void {
    const ori = orientation || this.getCurrentOrientation();
    const layout = this.isCustomizingControls && this.currentDraftLayout
      ? this.currentDraftLayout
      : this.loadControlsLayout(ori);

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const controlIds: CustomizableControlId[] = ['joystick', 'sprint', 'jump', 'attack', 'dodge', 'pulse', 'interact'];

    controlIds.forEach((id) => {
      const element = this.getControlElement(id);
      if (!element) return;

      const placement = layout[id] || (ori === 'landscape' ? this.DEFAULT_LANDSCAPE_LAYOUT[id] : this.DEFAULT_PORTRAIT_LAYOUT[id]);
      if (!placement) return;

      const scale = placement.scale || 1.0;
      element.style.transform = `scale(${scale})`;

      const elWidth = (element.offsetWidth || 62) * scale;
      const elHeight = (element.offsetHeight || 62) * scale;

      let posX = Math.round(placement.xPercent * screenW);
      let posY = Math.round(placement.yPercent * screenH);

      // Boundaries: Strict screen clamping
      const minX = 8;
      const maxX = Math.max(minX, screenW - elWidth - 8);
      const minY = this.isCustomizingControls ? 70 : 8;
      const maxY = Math.max(minY, screenH - elHeight - 8);

      posX = Math.max(minX, Math.min(maxX, posX));
      posY = Math.max(minY, Math.min(maxY, posY));

      element.style.left = `${posX}px`;
      element.style.top = `${posY}px`;
      element.style.bottom = 'auto';
      element.style.right = 'auto';
    });

    // Dynamically refresh joystick center and proportional radius
    if (this.joystickBase) {
      const rect = this.joystickBase.getBoundingClientRect();
      this.joystickCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      (this as any).joystickRadius = Math.max(35, (rect.width / 2) * 0.85);
    }
  }

  private getControlElement(id: CustomizableControlId): HTMLElement | null {
    switch (id) {
      case 'joystick': return document.getElementById('virtual-joystick-container');
      case 'sprint': return this.sprintTouchBtn;
      case 'jump': return document.getElementById('touch-jump-btn');
      case 'attack': return this.touchAttackBtn;
      case 'dodge': return this.touchDodgeBtn;
      case 'pulse': return this.touchPulseBtn;
      case 'interact': return this.touchInteractBtn;
      default: return null;
    }
  }

  private initControlsLayout(): void {
    const ori = this.getCurrentOrientation();
    this.applyControlsLayout(ori);

    // Bind Edit Mode Actions (supporting click and pointerdown with debounce and drag-state cleanup)
    const bindActionButton = (id: string, action: () => void) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      let lastTrigger = 0;
      const handler = (e: Event) => {
        const now = Date.now();
        if (now - lastTrigger < 180) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        lastTrigger = now;
        e.preventDefault();
        e.stopPropagation();
        this.isDraggingControl = false;
        this.activeDragElement = null;
        action();
      };
      btn.addEventListener('pointerdown', handler);
      btn.addEventListener('click', handler);
    };

    bindActionButton('editor-reset-btn', () => this.resetControlsToDefault());
    bindActionButton('editor-cancel-btn', () => this.exitControlsEditMode(false));
    bindActionButton('editor-save-btn', () => this.exitControlsEditMode(true));

    const handleSliderChange = (e: Event) => {
      e.stopPropagation();
      this.isDraggingControl = false;
      this.activeDragElement = null;
      const val = parseInt((e.target as HTMLInputElement).value, 10);
      if (!isNaN(val)) {
        this.updateSelectedControlScale(val);
      }
    };
    this.editorScaleSlider?.addEventListener('input', handleSliderChange);
    this.editorScaleSlider?.addEventListener('change', handleSliderChange);
    this.editorScaleSlider?.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      this.isDraggingControl = false;
      this.activeDragElement = null;
    });
    this.editorScaleSlider?.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      this.isDraggingControl = false;
      this.activeDragElement = null;
    }, { passive: true });

    const bindScaleButton = (id: string, delta: number) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      let lastTrigger = 0;
      const handler = (e: Event) => {
        const now = Date.now();
        if (now - lastTrigger < 120) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        lastTrigger = now;
        e.preventDefault();
        e.stopPropagation();
        this.isDraggingControl = false;
        this.activeDragElement = null;
        const current = parseInt(this.editorScaleSlider.value, 10) || 100;
        this.updateSelectedControlScale(current + delta);
      };
      btn.addEventListener('pointerdown', handler);
      btn.addEventListener('click', handler);
    };

    bindScaleButton('editor-scale-minus-btn', -5);
    bindScaleButton('editor-scale-plus-btn', +5);

    this.setupControlDraggables();
  }

  public enterControlsEditMode(): void {
    // Record if opened from title screen so we restore correctly on exit
    this.openedFromTitleScreen = !this.titleScreen.classList.contains('hidden');
    if (this.openedFromTitleScreen) {
      this.titleScreen.classList.add('hidden');
    }

    this.closeSettingsModal();
    this.isCustomizingControls = true;
    this.isDraggingControl = false;
    this.activeDragElement = null;
    const ori = this.getCurrentOrientation();
    this.currentDraftLayout = JSON.parse(JSON.stringify(this.loadControlsLayout(ori)));

    this.root.classList.add('hud-editing');
    this.layoutEditorOverlay.classList.add('active');
    this.inGameHUD.classList.remove('hidden');

    if (this.editorOrientationBadge) {
      this.editorOrientationBadge.textContent = '🖥️ Landscape 16:9 (أفقي)';
    }

    this.selectControlForEdit('joystick');
    this.applyControlsLayout(ori);
    this.showToast('🎮 وضع تخصيص أزرار التحكم نشط · اسحب أي زر لتغيير مكانه، أو عدّل حجمه');
  }

  public exitControlsEditMode(save: boolean): void {
    const ori = this.getCurrentOrientation();
    if (save && this.currentDraftLayout) {
      this.saveControlsLayout(ori, this.currentDraftLayout);
      this.showToast('✦ تم حفظ إعدادات التحكم بنجاح · Controls saved successfully');
    } else {
      // Revert unsaved modifications and restore last saved layout
      this.currentDraftLayout = this.loadControlsLayout(ori);
      this.showToast('تم إلغاء التعديلات · Changes discarded');
    }

    this.isCustomizingControls = false;
    this.isDraggingControl = false;
    this.activeDragElement = null;
    this.currentDraftLayout = null;
    this.root.classList.remove('hud-editing');
    this.layoutEditorOverlay.classList.remove('active');

    // Remove selection highlights
    document.querySelectorAll('.customizable-control').forEach((el) => {
      el.classList.remove('selected-edit-target');
    });

    this.applyControlsLayout(ori);

    // If opened from title screen, restore title screen; otherwise keep in-game HUD and return to settings
    if (this.openedFromTitleScreen) {
      this.titleScreen.classList.remove('hidden');
      this.inGameHUD.classList.add('hidden');
      this.openedFromTitleScreen = false;
    }
    this.openSettingsModal();
  }

  public resetControlsToDefault(): void {
    const ori = this.getCurrentOrientation();
    const defaults = ori === 'landscape' ? this.DEFAULT_LANDSCAPE_LAYOUT : this.DEFAULT_PORTRAIT_LAYOUT;
    this.currentDraftLayout = JSON.parse(JSON.stringify(defaults));
    this.applyControlsLayout(ori);
    this.selectControlForEdit(this.selectedControlId);
    this.showToast('✦ تمت استعادة المواقع والأحجام الافتراضية · Controls reset to defaults');
  }

  public selectControlForEdit(id: CustomizableControlId): void {
    this.selectedControlId = id;
    document.querySelectorAll('.customizable-control').forEach((el) => {
      el.classList.remove('selected-edit-target');
    });
    const targetEl = this.getControlElement(id);
    if (targetEl) {
      targetEl.classList.add('selected-edit-target');
    }

    const label = this.CONTROL_LABELS[id];
    if (this.editorSelectedNameText) {
      this.editorSelectedNameText.textContent = `${label.ar} · ${label.en}`;
    }

    const ori = this.getCurrentOrientation();
    const layout = this.currentDraftLayout || this.loadControlsLayout(ori);
    const currentScale = Math.round((layout[id]?.scale || 1.0) * 100);
    if (this.editorScaleSlider && this.editorScaleValueText) {
      this.editorScaleSlider.value = currentScale.toString();
      this.editorScaleValueText.textContent = `${currentScale}%`;
    }
  }

  public updateSelectedControlScale(scalePercent: number): void {
    if (!this.currentDraftLayout) return;
    const clampedPercent = Math.max(70, Math.min(150, scalePercent));
    const scale = clampedPercent / 100;
    if (this.currentDraftLayout[this.selectedControlId]) {
      this.currentDraftLayout[this.selectedControlId].scale = scale;
    }
    if (this.editorScaleSlider && this.editorScaleValueText) {
      this.editorScaleSlider.value = clampedPercent.toString();
      this.editorScaleValueText.textContent = `${clampedPercent}%`;
    }

    const element = this.getControlElement(this.selectedControlId);
    if (element) {
      element.style.transform = `scale(${scale})`;
    }
    this.applyControlsLayout();
  }

  private setupControlDraggables(): void {
    const controlIds: CustomizableControlId[] = ['joystick', 'sprint', 'jump', 'attack', 'dodge', 'pulse', 'interact'];

    controlIds.forEach((id) => {
      const el = this.getControlElement(id);
      if (!el) return;

      const onStart = (clientX: number, clientY: number, e: Event) => {
        if (!this.isCustomizingControls) return;
        e.preventDefault();
        e.stopPropagation();

        this.selectControlForEdit(id);
        this.isDraggingControl = true;
        this.activeDragElement = el;
        this.dragStartPointer = { x: clientX, y: clientY };

        const rect = el.getBoundingClientRect();
        this.dragStartPos = { x: rect.left, y: rect.top };
      };

      el.addEventListener('pointerdown', (e) => onStart(e.clientX, e.clientY, e));
    });

    const onMove = (clientX: number, clientY: number, e: Event) => {
      if (!this.isCustomizingControls || !this.isDraggingControl || !this.activeDragElement || !this.currentDraftLayout) return;
      e.preventDefault();

      const deltaX = clientX - this.dragStartPointer.x;
      const deltaY = clientY - this.dragStartPointer.y;

      const scale = this.currentDraftLayout[this.selectedControlId]?.scale || 1.0;
      const width = (this.activeDragElement.offsetWidth || 62) * scale;
      const height = (this.activeDragElement.offsetHeight || 62) * scale;

      let newX = this.dragStartPos.x + deltaX;
      let newY = this.dragStartPos.y + deltaY;

      // Boundaries: Strict screen clamping below the editor toolbar
      const minX = 8;
      const maxX = Math.max(minX, window.innerWidth - width - 8);
      const minY = 75; // Below editor toolbar
      const maxY = Math.max(minY, window.innerHeight - height - 8);

      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      this.activeDragElement.style.left = `${newX}px`;
      this.activeDragElement.style.top = `${newY}px`;
      this.activeDragElement.style.bottom = 'auto';
      this.activeDragElement.style.right = 'auto';

      // Update in draft layout
      this.currentDraftLayout[this.selectedControlId].xPercent = newX / window.innerWidth;
      this.currentDraftLayout[this.selectedControlId].yPercent = newY / window.innerHeight;
    };

    const onEnd = () => {
      if (this.isDraggingControl) {
        this.isDraggingControl = false;
        this.activeDragElement = null;
        this.applyControlsLayout();
      }
    };

    window.addEventListener('pointermove', (e) => onMove(e.clientX, e.clientY, e));
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        onMove(e.touches[0].clientX, e.touches[0].clientY, e);
      }
    }, { passive: false });

    window.addEventListener('pointerup', onEnd);
    window.addEventListener('touchend', onEnd);
    window.addEventListener('pointercancel', onEnd);
    window.addEventListener('touchcancel', onEnd);
  }

  private setupVirtualJoystick(): void {
    const container = document.getElementById('virtual-joystick-container');
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      if (this.isCustomizingControls) return;
      e.preventDefault();
      e.stopPropagation();

      // Self-heal orphaned joystick touch if OS dropped an earlier touchend/touchcancel
      if (this.joystickTouchId !== null) {
        const stillAlive = Array.from(e.touches).some((t) => t.identifier === this.joystickTouchId);
        if (!stillAlive) {
          this.joystickTouchId = null;
          this.resetJoystick();
        }
      }

      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (this.joystickTouchId === null) {
          this.joystickTouchId = touch.identifier;
          this.callbacks.onJoystickTouchState?.(touch.identifier);
          const rect = this.joystickBase.getBoundingClientRect();
          this.joystickCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
          this.joystickRadius = Math.max(35, (rect.width / 2) * 0.85);
          this.updateJoystickPosition(touch.clientX, touch.clientY);
          break;
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (this.isCustomizingControls || this.joystickTouchId === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === this.joystickTouchId) {
          e.preventDefault();
          e.stopPropagation();
          this.updateJoystickPosition(touch.clientX, touch.clientY);
          return;
        }
      }
      // Fallback: if tracked touch is no longer in active touches list, release cleanly
      const stillAlive = Array.from(e.touches).some((t) => t.identifier === this.joystickTouchId);
      if (!stillAlive) {
        this.joystickTouchId = null;
        this.resetJoystick();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (this.joystickTouchId === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === this.joystickTouchId) {
          e.preventDefault();
          e.stopPropagation();
          this.joystickTouchId = null;
          this.resetJoystick();
          return;
        }
      }
      if (e.touches.length === 0) {
        this.joystickTouchId = null;
        this.resetJoystick();
      }
    };

    container.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: false });
    window.addEventListener('touchcancel', onTouchEnd, { passive: false });

    // Mouse dragging joystick on desktop
    let isMouseDown = false;
    container.addEventListener('mousedown', (e) => {
      if (this.isCustomizingControls) return;
      e.stopPropagation();
      isMouseDown = true;
      const rect = this.joystickBase.getBoundingClientRect();
      this.joystickCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      this.joystickRadius = Math.max(35, (rect.width / 2) * 0.85);
      this.updateJoystickPosition(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      if (isMouseDown && !this.isCustomizingControls) {
        this.updateJoystickPosition(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false;
        this.resetJoystick();
      }
    });
  }

  public handleOrientationOrResize(): void {
    // Attempt standard Screen Orientation API lock to landscape if supported on mobile
    try {
      if (window.screen?.orientation && 'lock' in window.screen.orientation) {
        (window.screen.orientation as any).lock('landscape').catch(() => {
          // Ignore lock failures when user hasn't interacted or unsupported
        });
      }
    } catch {
      // Ignore unsupported browser errors
    }

    const rotatePrompt = document.getElementById('portrait-rotate-prompt');
    if (rotatePrompt) {
      rotatePrompt.style.display = 'none';
    }

    if (this.editorOrientationBadge) {
      this.editorOrientationBadge.textContent = '🖥️ Landscape 16:9 (أفقي)';
    }

    // Apply layout for landscape orientation with boundary clamps
    this.applyControlsLayout('landscape');
  }

  private updateJoystickPosition(clientX: number, clientY: number): void {
    const dx = clientX - this.joystickCenter.x;
    const dy = clientY - this.joystickCenter.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const radius = (this as any).joystickRadius || 55;
    const clampedDist = Math.min(dist, radius);
    const angle = Math.atan2(dy, dx);

    const knobX = Math.cos(angle) * clampedDist;
    const knobY = Math.sin(angle) * clampedDist;

    this.joystickKnob.style.transform = `translate(${knobX}px, ${knobY}px)`;
    document.getElementById('virtual-joystick-container')?.classList.add('dragging');

    // Deadzone and smooth linear interpolation
    const deadzone = 4;
    let normX = 0;
    let normY = 0;

    if (dist > deadzone) {
      const factor = Math.min(1.0, Math.max(0.55, (dist - deadzone) / (radius - deadzone)));
      // Right is +X, Left is -X; Up is +Y, Down is -Y (screen coords have down as +Y, so invert dy)
      normX = Math.cos(angle) * factor;
      normY = -Math.sin(angle) * factor;

      // If player pulls backward on the joystick while auto-running, stop auto-run
      if (this.isAutoRunning && normY < -0.45) {
        this.isAutoRunning = false;
        this.updateAutoRunUI(false);
        this.callbacks.onTouchSprintState?.(false);
      }
    }

    this.highlightDpadDirection(normX, normY);
    const isSprinting = clampedDist >= radius * 0.9;
    this.callbacks.onTouchMove(normX, normY, isSprinting);
  }

  private highlightDpadDirection(nx: number, ny: number): void {
    if (!this.joystickBase) return;
    const arms = this.joystickBase.querySelectorAll('.mc-dpad-arm');
    arms.forEach((el) => {
      const dir = (el as HTMLElement).dataset.dir;
      let active = false;
      if (dir === 'up') active = ny > 0.35;
      else if (dir === 'down') active = ny < -0.35;
      else if (dir === 'left') active = nx < -0.35;
      else if (dir === 'right') active = nx > 0.35;
      else if (dir === 'center') active = Math.abs(nx) <= 0.35 && Math.abs(ny) <= 0.35 && (nx !== 0 || ny !== 0);
      el.classList.toggle('active', active);
    });
  }

  public resetAllTouchStates(): void {
    this.joystickTouchId = null;
    this.sprintTouchId = null;
    this.sprintPointerId = null;
    this.isSprintHeld = false;
    this.callbacks.onAttackHoldChange?.(false);
    this.callbacks.onSecondaryHoldChange?.(false);
    this.resetJoystick();
  }

  private resetJoystick(): void {
    document.getElementById('virtual-joystick-container')?.classList.remove('dragging');
    this.highlightDpadDirection(0, 0);
    if (this.joystickKnob) {
      this.joystickKnob.style.transform = 'translate(0px, 0px)';
    }
    this.callbacks.onTouchMove(0, 0, false);
    this.callbacks.onJoystickTouchState?.(null);
  }

  private syncModalOpenState(): void {
    this.isModalOpen = Boolean(this.root.querySelector('.modal-overlay.open:not(#pause-modal)'));
  }

  public closeAllModals(keepPause: boolean = false): void {
    this.root.querySelectorAll('.modal-overlay.open').forEach((el) => {
      if (keepPause && el.id === 'pause-modal') return;
      el.classList.remove('open');
    });
    if (!keepPause) {
      this.isPaused = false;
    }
    this.onDialogueOptionSelectedCallback = null;
    this.onDeathReviveCallback = null;
    this.syncModalOpenState();
  }

  public showHUD(): void {
    this.closeAllModals(false);
    this.resetAllTouchStates();
    this.titleScreen.classList.add('hidden');
    this.inGameHUD.classList.remove('hidden');
    this.applyControlsLayout('landscape');
  }

  public showTitleScreen(): void {
    this.closeAllModals(false);
    this.resetAllTouchStates();
    this.isAutoRunning = false;
    this.updateAutoRunUI(false);
    this.callbacks.onTouchSprintState?.(false);
    this.titleScreen.classList.remove('hidden');
    this.inGameHUD.classList.add('hidden');
  }

  public setDarkRealmActive(active: boolean): void {
    this.suppressOriginalHotkeys = active;
    this.closeAllModals(false);
    this.resetAllTouchStates();
    const wrapper = document.getElementById('echo-ui-wrapper');
    wrapper?.classList.toggle('dark-realm-active', active);
    if (!active) {
      this.updateDarkBossBar(null);
    }
    if (active) {
      this.titleScreen.classList.add('hidden');
    }
    // Keep the exact same HUD & mobile controls visible and unchanged across both worlds
    this.inGameHUD.classList.remove('hidden');
    this.applyControlsLayout('landscape');
  }

  public updateDarkBossBar(info: { nameEn: string; hp: number; maxHp: number } | null): void {
    if (!this.darkBossBarEl) return;
    if (!info || info.hp <= 0) {
      this.darkBossBarEl.classList.remove('visible');
      return;
    }
    this.darkBossBarEl.classList.add('visible');
    if (this.darkBossNameEl) {
      this.darkBossNameEl.textContent = `💀 ${info.nameEn} (${Math.ceil(info.hp)} / ${info.maxHp})`;
    }
    if (this.darkBossFillEl) {
      const pct = Math.max(0, Math.min(100, (info.hp / Math.max(1, info.maxHp)) * 100));
      this.darkBossFillEl.style.width = `${pct}%`;
    }
  }

  public updateDarkQuickLabels(companionMode?: string, envLabel?: string): void {
    if (companionMode && this.darkCompanionQuickBtn) {
      const shortMap: Record<string, string> = {
        FOLLOW_FIGHT: '⚔️ Allies: Fight',
        EXPLORE_GATHER: '🪓 Allies: Gather',
        GUARD: '🛡️ Allies: Guard',
      };
      this.darkCompanionQuickBtn.textContent = shortMap[companionMode] || '⚔️ Allies';
    }
    if (envLabel && this.darkWeatherQuickBtn) {
      this.darkWeatherQuickBtn.textContent = `🌙 ${envLabel}`;
    }
  }

  public updateDarkQuestTracker(
    mainQuest: DarkQuest,
    bossQuest: DarkQuest,
    completedCount: number,
    totalCount: number
  ): void {
    if (!this.questCluster) return;
    if (this.questChapterBadge) {
      this.questChapterBadge.innerHTML = `<span>🌑 SHADOW REALM</span><span style="opacity:0.65;">·</span><span>${completedCount}/${totalCount} Quests</span>`;
    }
    if (this.questTitleText) {
      this.questTitleText.textContent = `${mainQuest.titleEn} · ${mainQuest.titleAr}`;
    }
    const targetQ = mainQuest.completed ? bossQuest : mainQuest;
    if (this.questObjectiveBadge) {
      this.questObjectiveBadge.textContent = targetQ.completed ? '✓' : `${completedCount}`;
    }
    if (this.questObjectiveTitleAr) {
      this.questObjectiveTitleAr.textContent = targetQ.titleAr;
    }
    if (this.questObjectiveTitleEn) {
      this.questObjectiveTitleEn.textContent = targetQ.titleEn;
    }
    if (this.questProgressText && this.questProgressBar) {
      const prog = Math.min(targetQ.progress, targetQ.target);
      this.questProgressText.textContent = `${prog} / ${targetQ.target}`;
      const pct = Math.min(100, Math.round((prog / Math.max(1, targetQ.target)) * 100));
      this.questProgressBar.style.width = `${pct}%`;
      this.questProgressBar.style.display = 'block';
    }
    if (this.questObjectiveHint) {
      this.questObjectiveHint.innerHTML = `<span>🎯</span><span>${bossQuest.titleAr} (${bossQuest.progress}/${bossQuest.target}) · [K/J] Codex</span>`;
    }
  }

  public setContinueBadge(hasSave: boolean, count?: number): void {
    if (hasSave && count !== undefined) {
      this.continueStatus.textContent = `${count}/7 Echoes`;
      this.continueStatus.style.display = 'inline-block';
    } else {
      this.continueStatus.textContent = 'Start';
      this.continueStatus.style.display = 'inline-block';
    }
    const cCount = count ?? 0;
    if (this.shadowRealmStatusBadge) {
      if (cCount >= 7) {
        this.shadowRealmStatusBadge.textContent = '✦ Unlocked 7/7';
        this.shadowRealmStatusBadge.style.borderColor = '#34d399';
        this.shadowRealmStatusBadge.style.color = '#6ee7b7';
      } else {
        this.shadowRealmStatusBadge.textContent = `🔒 ${cCount}/7`;
        this.shadowRealmStatusBadge.style.borderColor = 'rgba(192, 132, 252, 0.55)';
        this.shadowRealmStatusBadge.style.color = '#e9d5ff';
      }
    }
  }

  public showToast(message: string): void {
    if (!this.toastNotification || !message) return;
    this.toastNotification.textContent = message;
    this.toastNotification.classList.add('show');
    if (this.toastTimer !== null) {
      window.clearTimeout(this.toastTimer);
    }
    this.toastTimer = window.setTimeout(() => {
      this.toastNotification?.classList.remove('show');
      this.toastTimer = null;
    }, 2800);
  }

  public openSettingsModal(): void {
    this.resetAllTouchStates();
    this.settingsModal.classList.add('open');
    this.syncModalOpenState();
  }

  public closeSettingsModal(): void {
    this.settingsModal.classList.remove('open');
    this.syncModalOpenState();
  }

  public setSoundIcon(isMuted: boolean): void {
    if (isMuted) {
      this.soundBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
    } else {
      this.soundBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
    }
  }

  public updateCrystalProgress(collectedCount: number): void {
    const countEl = document.getElementById('crystal-count-text');
    if (countEl) {
      countEl.textContent = `${collectedCount} / 7`;
    }
    if (this.mcCrystalCountEl) {
      this.mcCrystalCountEl.textContent = `${collectedCount}/7`;
    }

    const slots = this.crystalSlotsContainer.children;
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i] as HTMLElement;
      if (i < collectedCount) {
        slot.classList.add('active');
        slot.style.backgroundColor = slot.dataset.color || '#00f5d4';
        slot.style.color = slot.dataset.color || '#00f5d4';
        slot.style.borderColor = slot.dataset.color || '#00f5d4';
      } else {
        slot.classList.remove('active');
        slot.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        slot.style.borderColor = 'rgba(255, 255, 255, 0.25)';
      }
    }
  }

  public updateMinecraftHud(data: {
    hp: number;
    maxHp: number;
    energy: number;
    maxEnergy: number;
    level: number;
    xpRatio: number;
    activeSlot: number;
    counts: Record<number, number>;
    isDarkRealm?: boolean;
  }): void {
    this.updateCombatStats({
      hp: data.hp,
      maxHp: data.maxHp,
      energy: data.energy,
      maxEnergy: data.maxEnergy,
      isInvulnerable: false,
      enemiesDefeated: 0,
    });
    const pct = Math.max(0, Math.min(100, Math.round(data.xpRatio * 100)));
    const mcKey = `${data.level}|${pct}|${data.activeSlot}|${data.counts[3] ?? 0}|${data.counts[4] ?? 0}|${data.counts[5] ?? 0}|${data.counts[6] ?? 0}`;
    if (mcKey === this.lastMcHudKey) return;
    this.lastMcHudKey = mcKey;

    if (this.mcXpLevelEl) {
      this.mcXpLevelEl.textContent = `${Math.max(1, data.level)}`;
    }
    if (this.mcXpFillEl) {
      this.mcXpFillEl.style.width = `${pct}%`;
    }
    for (let i = 0; i < this.mcHotbarSlots.length; i++) {
      const slotEl = this.mcHotbarSlots[i];
      const idx = parseInt(slotEl.dataset.slot || '-1', 10);
      slotEl.classList.toggle('active', idx === data.activeSlot);
    }
    for (const key of [3, 4, 5, 6]) {
      const countSpan = this.mcSlotCountEls[key];
      if (countSpan && data.counts[key] !== undefined) {
        countSpan.textContent = `${Math.max(0, data.counts[key])}`;
      }
    }
  }

  public updateShardProgress(collectedCount: number, total: number = 10): void {
    if (this.shardCountText) {
      this.shardCountText.textContent = `${collectedCount} / ${total}`;
    }
    if (this.shardProgressFill) {
      const pct = Math.min(100, (collectedCount / total) * 100);
      this.shardProgressFill.style.width = `${pct}%`;
    }
  }

  public showTargetInteractPrompt(target: InteractiveTarget | null): void {
    const key = target ? `${target.type}|${target.id}|${target.titleAr}` : 'NONE';
    if (key === this.lastInteractKey) return;
    this.lastInteractKey = key;

    const label = this.interactLabelEl;
    const touchBtn = this.touchInteractBtn;

    if (target) {
      this.interactPrompt.classList.add('visible');
      if (label) {
        label.textContent = `${target.actionEn} · ${target.actionAr} (${target.titleAr})`;
      }

      if (touchBtn) {
        touchBtn.style.borderColor = '#fee440';
        touchBtn.style.boxShadow = '0 0 16px rgba(254, 228, 64, 0.7)';
        const firstSpan = this.interactTouchSpans?.[0];
        const lastSpan = this.interactTouchSpans && this.interactTouchSpans.length > 0
          ? this.interactTouchSpans[this.interactTouchSpans.length - 1]
          : undefined;
        if (target.type === 'shard') {
          if (firstSpan) firstSpan.textContent = 'SHARD';
          if (lastSpan) lastSpan.textContent = 'شظية';
        } else if (target.type === 'inscription') {
          if (firstSpan) firstSpan.textContent = 'READ';
          if (lastSpan) lastSpan.textContent = 'اقرأ';
        } else if (target.type === 'door') {
          if (firstSpan) firstSpan.textContent = 'GATE';
          if (lastSpan) lastSpan.textContent = 'بوابة';
        } else if (target.type === 'portal') {
          if (firstSpan) firstSpan.textContent = 'PORTAL';
          if (lastSpan) lastSpan.textContent = 'عتبة';
        } else {
          if (firstSpan) firstSpan.textContent = 'ECHO';
          if (lastSpan) lastSpan.textContent = 'تواصل';
        }
      }
    } else {
      this.interactPrompt.classList.remove('visible');
      if (touchBtn) {
        touchBtn.style.borderColor = 'rgba(0, 245, 212, 0.55)';
        touchBtn.style.boxShadow = '0 4px 18px rgba(0, 0, 0, 0.5)';
        const firstSpan = this.interactTouchSpans?.[0];
        const lastSpan = this.interactTouchSpans && this.interactTouchSpans.length > 0
          ? this.interactTouchSpans[this.interactTouchSpans.length - 1]
          : undefined;
        if (firstSpan) firstSpan.textContent = 'ECHO';
        if (lastSpan) lastSpan.textContent = 'تواصل';
      }
    }
  }

  public showInteractPrompt(crystal: CrystalData | null): void {
    if (crystal && !crystal.collected) {
      this.showTargetInteractPrompt({
        id: crystal.id,
        type: 'crystal',
        titleAr: crystal.nameAr,
        titleEn: crystal.nameEn,
        actionAr: 'تواصل مع صدى البلورة',
        actionEn: 'Commune with Echo Crystal',
        pos: crystal.pos,
        dist: 0,
      });
    } else {
      this.showTargetInteractPrompt(null);
    }
  }

  public openLoreModal(crystal: CrystalData): void {
    this.resetAllTouchStates();
    this.loreTitleAr.textContent = crystal.nameAr;
    this.loreTitleEn.textContent = crystal.nameEn;
    this.loreLocation.textContent = `${crystal.locationEn} · ${crystal.locationAr}`;
    this.loreTextAr.textContent = crystal.memoryAr;
    this.loreTextEn.textContent = crystal.memoryEn;

    this.loreModal.classList.add('open');
    this.syncModalOpenState();
  }

  public closeLoreModal(): void {
    this.loreModal.classList.remove('open');
    this.syncModalOpenState();
  }

  public openInscriptionModal(inscription: AncientInscription): void {
    this.resetAllTouchStates();
    this.inscriptionTitleAr.textContent = inscription.titleAr;
    this.inscriptionTitleEn.textContent = inscription.titleEn;
    this.inscriptionGlyph.textContent = inscription.glyph;
    this.inscriptionLocation.textContent = `${inscription.locationEn} · ${inscription.locationAr}`;
    this.inscriptionTextAr.textContent = inscription.contentAr;
    this.inscriptionTextEn.textContent = inscription.contentEn;

    this.inscriptionModal.classList.add('open');
    this.syncModalOpenState();
  }

  public closeInscriptionModal(): void {
    this.inscriptionModal.classList.remove('open');
    this.syncModalOpenState();
  }

  public openVictoryModal(): void {
    this.resetAllTouchStates();
    this.victoryModal.classList.add('open');
    this.syncModalOpenState();
  }

  public openWorldMemoryModal(profile: PlayerMemoryProfile): void {
    // 1. Archetype and Resonance
    const archAr = document.getElementById('memory-archetype-ar');
    const archEn = document.getElementById('memory-archetype-en');
    const rankEl = document.getElementById('memory-resonance-level');
    if (archAr) archAr.textContent = profile.archetypeAr;
    if (archEn) archEn.textContent = profile.archetypeEn;
    if (rankEl) rankEl.textContent = `Rank ${profile.worldResonanceLevel} · المرتبة ${profile.worldResonanceLevel}`;

    // 2. Playtime format MM:SS
    const timeEl = document.getElementById('stat-play-time');
    if (timeEl) {
      const minutes = Math.floor(profile.totalPlayTimeSec / 60);
      const seconds = Math.floor(profile.totalPlayTimeSec % 60);
      timeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // 3. Sprint Distance & Sprints
    const sprintEl = document.getElementById('stat-sprint-dist');
    if (sprintEl) {
      sprintEl.textContent = `${Math.round(profile.sprintDistanceMeters)} m (${profile.sprintCount}x)`;
    }

    // 4. Zones Count
    const zonesEl = document.getElementById('stat-zones-count');
    if (zonesEl) {
      zonesEl.textContent = `${profile.zonesVisited.length} / 8`;
    }

    // 5. Secrets Count
    const secretsEl = document.getElementById('stat-secrets-count');
    if (secretsEl) {
      secretsEl.textContent = `${profile.secretsFound.length}`;
    }

    // 6. Active World Manifestations List
    const manList = document.getElementById('manifestations-list');
    if (manList) {
      const allManifestations = [
        {
          key: 'elder_tree_heart',
          titleAr: 'يقظة قلب شجرة الخلود العتيقة',
          titleEn: 'Heart of the Colossal Elder Tree',
          descAr: 'استيقظت النواة السماوية الزرقاء في جذع الشجرة وتفتحت أزهار الأثير الضوئية.',
          descEn: 'The radiant cyan ocular vortex inside the elder trunk pulses with ancient lifeforce.',
        },
        {
          key: 'crystalline_bridge',
          titleAr: 'المسار البلوري فوق بحيرة الضياء',
          titleEn: 'Secret Crystalline Lake Bridge',
          descAr: 'برزت أحجار سحرية عائمة تمكّن من عبور البحيرة دون الغرق نحو الكهوف السرية.',
          descEn: 'Ethereal floating stones raised from the radiant depths, paving a hidden path.',
        },
        {
          key: 'forest_spirit',
          titleAr: 'طيف وعائل الغابة الروحي',
          titleEn: 'Slumbering Forest Spirit Stag',
          descAr: 'استيقظ حارس الصنوبر الأثيري وقرونه المتوهجة لحراسة خطواتك السريعة.',
          descEn: 'The celestial guardian awakened by your vigorous pace through the woods.',
        },
        {
          key: 'temple_deep_runes',
          titleAr: 'نقوش أرضية المعبد الغائرة',
          titleEn: 'Sanctuary Deep Floor Runes',
          descAr: 'توهجت رموز البنّائين الأوائل الذهبية في أرضية رواق المعبد العتيق.',
          descEn: 'Hidden sacred glyphs illuminated upon repeated reverence to the sanctuary.',
        },
        {
          key: 'celestial_aurora',
          titleAr: 'شفق الجزيرة الكوني المتلألئ',
          titleEn: 'Celestial Island Aurora',
          descAr: 'تموجات أثيرية تضيء سماء الجزيرة المنسية تعبيراً عن تناغم الأصداء.',
          descEn: 'Shimmering celestial ribbons dancing across the mystic atmosphere.',
        },
      ];

      manList.innerHTML = allManifestations
        .map((m) => {
          const isUnlocked = Boolean(profile.manifestations[m.key]);
          return `
            <div style="background: ${isUnlocked ? 'rgba(0, 245, 212, 0.08)' : 'rgba(0, 0, 0, 0.35)'}; border: 1px solid ${isUnlocked ? 'rgba(0, 245, 212, 0.35)' : 'rgba(255, 255, 255, 0.08)'}; border-radius: 12px; padding: 0.65rem 0.85rem; display: flex; justify-content: space-between; align-items: center; gap: 0.8rem;">
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.15rem;">
                  <span style="font-weight: 700; color: ${isUnlocked ? '#ffffff' : '#728994'}; font-size: 0.95rem;">${m.titleAr} · ${m.titleEn}</span>
                </div>
                <div style="font-size: 0.78rem; color: ${isUnlocked ? '#95d5d8' : '#576f7a'}; line-height: 1.3;">
                  ${isUnlocked ? m.descAr : 'لا تزال هذه القوة نائمة في العالم... استكشف الجزيرة لتوقظها.'}
                </div>
              </div>
              <div style="font-size: 0.75rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 9999px; white-space: nowrap; ${
                isUnlocked
                  ? 'background: rgba(0, 245, 212, 0.2); color: #00f5d4; border: 1px solid rgba(0, 245, 212, 0.5); box-shadow: 0 0 10px rgba(0, 245, 212, 0.3);'
                  : 'background: rgba(255, 255, 255, 0.05); color: #58717d; border: 1px solid rgba(255, 255, 255, 0.1);'
              }">
                ${isUnlocked ? '✦ AWAKENED · مستيقظ' : '🔒 DORMANT · نائم'}
              </div>
            </div>
          `;
        })
        .join('');
    }

    // 7. Time Spent per Biome Breakdown
    const biomeList = document.getElementById('biome-breakdown-list');
    if (biomeList) {
      const biomes = Object.keys(BIOMES) as BiomeType[];
      const totalSec = Math.max(1, profile.totalPlayTimeSec);

      biomeList.innerHTML = biomes
        .map((bKey) => {
          const info = BIOMES[bKey];
          const timeSec = profile.biomeTimeSec[bKey] || 0;
          const pct = Math.min(100, Math.round((timeSec / totalSec) * 100));
          const mins = Math.floor(timeSec / 60);
          const secs = Math.floor(timeSec % 60);

          return `
            <div style="background: rgba(0, 0, 0, 0.25); border-radius: 8px; padding: 0.4rem 0.65rem; border: 1px solid rgba(255, 255, 255, 0.05);">
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; margin-bottom: 0.25rem;">
                <span style="color: ${info.color}; font-weight: 700;">${info.nameAr} · ${info.nameEn}</span>
                <span style="color: #ccd7e0; font-family: monospace;">${mins}m ${secs}s (${pct}%)</span>
              </div>
              <div style="height: 5px; width: 100%; background: rgba(255, 255, 255, 0.07); border-radius: 9999px; overflow: hidden;">
                <div style="height: 100%; width: ${pct}%; background: ${info.color}; border-radius: 9999px; transition: width 0.3s ease;"></div>
              </div>
            </div>
          `;
        })
        .join('');
    }

    this.resetAllTouchStates();
    this.worldMemoryModal.classList.add('open');
    this.syncModalOpenState();
  }

  public closeWorldMemoryModal(): void {
    this.worldMemoryModal.classList.remove('open');
    this.syncModalOpenState();
  }

  public setMobileMode(isMobile: boolean): void {
    this.isMobileDevice = isMobile;
    const wrapper = document.getElementById('echo-ui-wrapper');
    if (wrapper) {
      wrapper.classList.toggle('pc-mode', !isMobile);
      wrapper.classList.toggle('mobile-mode', isMobile);
    }
    if (this.controlsLayer && !this.isCustomizingControls) {
      this.controlsLayer.style.display = isMobile ? '' : 'none';
    }
    const promptKbd = this.interactPrompt?.querySelector('kbd');
    if (promptKbd) {
      promptKbd.textContent = isMobile ? 'TAP' : 'E';
    }
    if (isMobile) {
      this.isChatCollapsed = true;
      this.mpChatPanel?.classList.add('collapsed');
      const collapseBtn = document.getElementById('mp-chat-collapse-btn');
      if (collapseBtn) collapseBtn.textContent = '💬';
    }
  }

  public isChatFocused(): boolean {
    return document.activeElement === this.mpChatInput || this.mpChatPanel?.classList.contains('focused');
  }

  private focusChatInput(): void {
    if (!this.mpChatPanel || !this.mpChatInput) return;
    if (document.pointerLockElement) {
      document.exitPointerLock?.();
    }
    this.isChatCollapsed = false;
    this.mpChatPanel.classList.remove('collapsed');
    this.mpChatPanel.classList.add('focused');
    const collapseBtn = document.getElementById('mp-chat-collapse-btn');
    if (collapseBtn) collapseBtn.textContent = '▾';
    this.mpChatInput.focus();
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  public initMultiplayerBindings(): void {
    if (this.mpBindingsInitialized) return;
    this.mpBindingsInitialized = true;

    const getCoord = (): MultiplayerCoordinator | undefined =>
      this.callbacks.getMultiplayerCoordinator?.() as MultiplayerCoordinator | undefined;

    // 1. Live Chat Bindings (works identically in World 1 & World 2)
    const setChatChannel = (ch: 'ROOM' | 'PARTY' | 'FRIENDS') => {
      this.activeChatChannel = ch;
      document.getElementById('mp-chat-ch-room')?.classList.toggle('active', ch === 'ROOM');
      document.getElementById('mp-chat-ch-party')?.classList.toggle('active', ch === 'PARTY');
      document.getElementById('mp-chat-ch-friends')?.classList.toggle('active', ch === 'FRIENDS');
      this.renderChatMessages();
    };
    document.getElementById('mp-chat-ch-room')?.addEventListener('click', () => setChatChannel('ROOM'));
    document.getElementById('mp-chat-ch-party')?.addEventListener('click', () => setChatChannel('PARTY'));
    document.getElementById('mp-chat-ch-friends')?.addEventListener('click', () => setChatChannel('FRIENDS'));

    document.getElementById('mp-chat-collapse-btn')?.addEventListener('click', () => {
      this.isChatCollapsed = !this.isChatCollapsed;
      this.mpChatPanel?.classList.toggle('collapsed', this.isChatCollapsed);
      const btn = document.getElementById('mp-chat-collapse-btn');
      if (btn) {
        if (this.isChatCollapsed) {
          btn.textContent = this.unreadChatCount > 0 ? `💬 ${this.unreadChatCount}` : '💬';
        } else {
          this.unreadChatCount = 0;
          btn.textContent = '▾';
        }
      }
    });

    const submitChat = () => {
      const coord = getCoord();
      if (!coord || !this.mpChatInput) return;
      const text = this.mpChatInput.value.trim();
      if (text) {
        coord.sendChat(text, this.activeChatChannel);
        this.mpChatInput.value = '';
      }
      this.mpChatInput.blur();
      this.mpChatPanel?.classList.remove('focused');
    };

    document.getElementById('mp-chat-send-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      submitChat();
    });

    this.mpChatInput?.addEventListener('focus', () => {
      if (document.pointerLockElement) document.exitPointerLock?.();
      this.mpChatPanel?.classList.add('focused');
      this.resetAllTouchStates();
    });
    this.mpChatInput?.addEventListener('blur', () => {
      this.mpChatPanel?.classList.remove('focused');
    });
    this.mpChatInput?.addEventListener('keydown', (e: KeyboardEvent) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        e.preventDefault();
        submitChat();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.mpChatInput.blur();
        this.mpChatPanel?.classList.remove('focused');
      }
    });

    // 2. Voice Chat HUD & Pre-Permission Modal Bindings
    const requestEnableOrDisableVoice = () => {
      const coord = getCoord();
      if (!coord) return;
      coord.unlockVoiceAudio();
      if (coord.voice.isEnabled) {
        coord.disableVoice();
        this.showToast('🎙️ Voice chat disabled');
      } else {
        this.openVoicePermissionModal();
      }
    };

    document.getElementById('voice-mic-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      requestEnableOrDisableVoice();
    });
    document.getElementById('mp-voice-enable-btn')?.addEventListener('click', () => {
      requestEnableOrDisableVoice();
    });

    const toggleMute = () => {
      const coord = getCoord();
      if (!coord || !coord.voice.isEnabled) return;
      const muted = coord.toggleSelfMute();
      this.showToast(muted ? '🔇 Microphone muted' : '🎙️ Microphone live');
    };
    document.getElementById('voice-mute-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMute();
    });
    document.getElementById('mp-voice-mute-btn')?.addEventListener('click', () => {
      toggleMute();
    });

    const onSpeakerVolInput = (valStr: string) => {
      const pct = Math.max(0, Math.min(100, parseInt(valStr, 10) || 0));
      const coord = getCoord();
      coord?.setSpeakerVolume(pct / 100);
      this.updateVoiceHudUI();
    };
    const hudVolSlider = document.getElementById('voice-speaker-slider') as HTMLInputElement | null;
    const modalVolSlider = document.getElementById('mp-voice-speaker-slider') as HTMLInputElement | null;
    hudVolSlider?.addEventListener('input', () => onSpeakerVolInput(hudVolSlider.value));
    modalVolSlider?.addEventListener('input', () => onSpeakerVolInput(modalVolSlider.value));

    document.getElementById('voice-perm-cancel-btn')?.addEventListener('click', () => {
      this.closeVoicePermissionModal();
    });
    document.getElementById('voice-perm-allow-btn')?.addEventListener('click', async () => {
      this.closeVoicePermissionModal();
      const coord = getCoord();
      if (!coord) return;
      const res = await coord.enableVoiceWithPermissionGranted();
      if (res.ok) {
        this.showToast('🎙️ Live Voice Chat connected for your Session / Party!');
      } else {
        this.showToast(`⚠️ ${res.error || 'Could not start voice chat'}`);
      }
      this.updateVoiceHudUI();
      this.updateMultiplayerModalContent();
    });

    // 3. Invite Toast Buttons
    document.getElementById('mp-invite-accept-btn')?.addEventListener('click', () => {
      const coord = getCoord();
      if (coord && this.activeToastInviteId) {
        coord.respondToInvite(this.activeToastInviteId, true);
      }
      this.mpInviteToast?.classList.remove('show');
      this.activeToastInviteId = null;
    });
    document.getElementById('mp-invite-decline-btn')?.addEventListener('click', () => {
      const coord = getCoord();
      if (coord && this.activeToastInviteId) {
        coord.respondToInvite(this.activeToastInviteId, false);
      }
      this.mpInviteToast?.classList.remove('show');
      this.activeToastInviteId = null;
    });

    // 4. Multiplayer Hub Tabs & Actions
    document.querySelectorAll('.mp-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-mp-tab') as 'rooms' | 'party' | 'friends' | 'voice' | null;
        if (!tab) return;
        this.activeMpTab = tab;
        document.querySelectorAll('.mp-tab-btn').forEach((b) => b.classList.toggle('active', b === btn));
        document.querySelectorAll('.mp-tab-panel').forEach((p) => {
          p.classList.toggle('active', p.id === `mp-panel-${tab}`);
        });
        if (tab === 'rooms') getCoord()?.refreshRooms();
        this.updateMultiplayerModalContent();
      });
    });

    document.getElementById('mp-copy-room-id-btn')?.addEventListener('click', () => {
      const coord = getCoord();
      if (!coord) return;
      navigator.clipboard?.writeText(coord.currentRoomId).catch(() => {});
      this.showToast(`📋 Copied Room ID: ${coord.currentRoomId}`);
    });
    document.getElementById('mp-copy-invite-link-btn')?.addEventListener('click', () => {
      const coord = getCoord();
      if (!coord) return;
      const link = coord.buildRoomInviteLink();
      navigator.clipboard?.writeText(link).catch(() => {});
      this.showToast(`🔗 Copied Invite Link for Room ${coord.currentRoomId}`);
    });
    document.getElementById('mp-server-connect-btn')?.addEventListener('click', async () => {
      const coord = getCoord();
      if (!coord) return;
      const input = document.getElementById('mp-server-url-input') as HTMLInputElement | null;
      const raw = input?.value.trim() || null;
      this.showToast(raw ? '⚡ Connecting to Cloudflare Worker...' : 'ℹ️ Cleared custom server URL');
      const ok = await coord.configureAndConnectServer(raw);
      if (ok) {
        this.showToast('🟢 Connected to real-time multiplayer server!');
      } else if (raw) {
        this.showToast('⚠️ Could not connect to WebSocket server. Check URL.');
      }
      this.updateMultiplayerModalContent();
    });
    document.getElementById('mp-cloud-sync-btn')?.addEventListener('click', async () => {
      const coord = getCoord();
      if (!coord) return;
      const ok = await coord.syncCloudSaveNow();
      this.showToast(ok ? '☁️ Progress saved to Cloudflare D1!' : '⚠️ Connect Cloudflare Worker to sync D1 cloud save.');
      this.updateMultiplayerModalContent();
    });
    document.getElementById('mp-cloud-restore-btn')?.addEventListener('click', async () => {
      const coord = getCoord();
      if (!coord) return;
      const ok = await coord.restoreCloudSave();
      this.showToast(ok ? '⬇️ Progress restored from Cloudflare D1!' : 'ℹ️ No Cloudflare D1 cloud save found yet.');
      this.updateMultiplayerModalContent();
    });
    document.getElementById('mp-portal-accept-btn')?.addEventListener('click', () => {
      const coord = getCoord();
      if (coord && this.pendingPortalTravel) {
        coord.acceptPortalTravel(this.pendingPortalTravel.targetRealm, this.pendingPortalTravel.crystalsCount);
      }
      this.hidePortalTravelToast();
    });
    document.getElementById('mp-portal-stay-btn')?.addEventListener('click', () => {
      this.hidePortalTravelToast();
    });
    document.getElementById('mp-leave-room-btn')?.addEventListener('click', () => {
      getCoord()?.leaveRoomToPublic();
    });
    document.getElementById('mp-refresh-rooms-btn')?.addEventListener('click', () => {
      getCoord()?.refreshRooms();
    });
    document.getElementById('mp-create-room-btn')?.addEventListener('click', () => {
      const coord = getCoord();
      if (!coord) return;
      const nameEl = document.getElementById('mp-create-room-name') as HTMLInputElement | null;
      const privEl = document.getElementById('mp-create-room-private') as HTMLInputElement | null;
      const passEl = document.getElementById('mp-create-room-pass') as HTMLInputElement | null;
      coord.createRoom(nameEl?.value || '', Boolean(privEl?.checked), passEl?.value || undefined);
    });
    document.getElementById('mp-join-room-btn')?.addEventListener('click', () => {
      const coord = getCoord();
      if (!coord) return;
      const idEl = document.getElementById('mp-join-room-id-input') as HTMLInputElement | null;
      const passEl = document.getElementById('mp-join-room-pass-input') as HTMLInputElement | null;
      if (idEl?.value.trim()) {
        coord.joinRoom(idEl.value.trim(), passEl?.value || undefined);
      }
    });

    // Party Controls
    document.getElementById('mp-copy-party-code-btn')?.addEventListener('click', () => {
      const code = getCoord()?.party.getParty()?.passCode;
      if (code) {
        navigator.clipboard?.writeText(code).catch(() => {});
        this.showToast(`📋 Copied Party Code: ${code}`);
      }
    });
    document.getElementById('mp-join-party-btn')?.addEventListener('click', () => {
      const input = document.getElementById('mp-join-party-code-input') as HTMLInputElement | null;
      if (input?.value.trim()) {
        getCoord()?.joinParty(input.value.trim());
        input.value = '';
      }
    });
    document.getElementById('mp-create-party-btn')?.addEventListener('click', () => {
      getCoord()?.createParty();
    });
    document.getElementById('mp-leave-party-btn')?.addEventListener('click', () => {
      getCoord()?.leaveParty();
    });
    document.querySelectorAll('.mp-ping-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const coord = getCoord();
        if (!coord) return;
        const type = (btn.getAttribute('data-ping') || 'EXPLORE') as 'EXPLORE' | 'DANGER' | 'SHRINE' | 'HELP';
        const p = (coord as any).game?.player;
        coord.sendPartyPing(p?.position.x || 0, p?.position.y || 0, p?.position.z || 0, type);
        this.showToast(`📍 Sent ${type} ping to Party!`);
      });
    });

    // Friends Controls
    document.getElementById('mp-add-friend-btn')?.addEventListener('click', () => {
      const input = document.getElementById('mp-add-friend-input') as HTMLInputElement | null;
      if (input?.value.trim()) {
        getCoord()?.addFriend(input.value.trim());
        input.value = '';
      }
    });

    // 5. Subscribe to Coordinator Live Events
    const coord = getCoord();
    if (coord) {
      coord.onStateUpdated = () => {
        this.updateVoiceHudUI();
        this.updateHudMultiplayerBadge();
        if (this.multiplayerModal?.classList.contains('open')) {
          this.updateMultiplayerModalContent();
        }
      };
      coord.onVoiceStateChanged = () => {
        this.updateVoiceHudUI();
        if (this.multiplayerModal?.classList.contains('open')) {
          this.updateMultiplayerModalContent();
        }
      };
      coord.onChatMessage = (msg: ChatMessage) => {
        this.appendChatMessage(msg);
      };
      coord.onInviteReceived = (invite: MultiplayerInvite) => {
        this.showInviteToast(invite);
        this.updateHudMultiplayerBadge();
        if (this.multiplayerModal?.classList.contains('open')) {
          this.updateMultiplayerModalContent();
        }
      };
      coord.onPortalTravelReceived = (payload) => {
        this.showPortalTravelToast(payload);
      };
      this.renderChatMessages();
      this.updateVoiceHudUI();
      this.updateHudMultiplayerBadge();
    }
  }

  private updateHudMultiplayerBadge(): void {
    const coord = this.callbacks.getMultiplayerCoordinator?.() as MultiplayerCoordinator | undefined;
    const badge = document.getElementById('hud-mp-badge');
    if (!coord || !badge) return;

    const pendingInvites = coord.friends.getPendingInvites().length;
    const totalPlayers = 1 + coord.remotePlayers.getAllPlayers().length;
    badge.classList.remove('offline', 'invite-alert');
    if (pendingInvites > 0) {
      badge.classList.add('invite-alert');
      badge.textContent = `!${pendingInvites}`;
    } else if (coord.connectionStatus !== 'ONLINE') {
      badge.classList.add('offline');
      badge.textContent = '•';
    } else {
      badge.textContent = String(totalPlayers);
    }
  }

  private renderChatMessages(): void {
    const coord = this.callbacks.getMultiplayerCoordinator?.() as MultiplayerCoordinator | undefined;
    if (!coord || !this.mpChatMessagesEl) return;

    const filtered = coord.chatMessages.filter(
      (m) => m.channel === 'SYSTEM' || m.channel === this.activeChatChannel
    );
    this.mpChatMessagesEl.innerHTML = filtered
      .slice(-45)
      .map((m) => this.formatChatLineHtml(m))
      .join('');
    this.mpChatMessagesEl.scrollTop = this.mpChatMessagesEl.scrollHeight;
  }

  private appendChatMessage(msg: ChatMessage): void {
    if (!this.mpChatMessagesEl) return;
    if (msg.channel !== 'SYSTEM' && msg.channel !== this.activeChatChannel) {
      if (msg.channel === 'PARTY') {
        this.showToast(`🛡️ [Party] ${msg.senderName}: ${msg.text}`);
      } else if (msg.channel === 'FRIENDS') {
        this.showToast(`🤝 [Friend] ${msg.senderName}: ${msg.text}`);
      }
      return;
    }
    const div = document.createElement('div');
    div.className = 'mp-chat-line';
    div.innerHTML = this.formatChatLineHtml(msg);
    this.mpChatMessagesEl.appendChild(div);
    while (this.mpChatMessagesEl.children.length > 50) {
      this.mpChatMessagesEl.removeChild(this.mpChatMessagesEl.firstChild!);
    }
    this.mpChatMessagesEl.scrollTop = this.mpChatMessagesEl.scrollHeight;

    if (this.isChatCollapsed) {
      this.unreadChatCount++;
      const btn = document.getElementById('mp-chat-collapse-btn');
      if (btn) btn.textContent = `💬 ${this.unreadChatCount}`;
    }
  }

  private formatChatLineHtml(msg: ChatMessage): string {
    const realmTag = msg.realm === 'DARK_REALM' ? 'W2' : 'W1';
    const realmCls = msg.realm === 'DARK_REALM' ? 'w2' : '';
    const chPrefix =
      msg.channel === 'PARTY' ? '[Party] ' : msg.channel === 'FRIENDS' ? '[Friend] ' : '';
    const safeColor = /^#[0-9a-fA-F]{3,8}$/.test(msg.senderColor) ? msg.senderColor : '#00f5d4';
    return `<span class="mp-chat-realm ${realmCls}">${realmTag}</span><strong style="color:${safeColor}">${this.escapeHtml(chPrefix + msg.senderName)}:</strong> <span>${this.escapeHtml(msg.text)}</span>`;
  }

  private showInviteToast(invite: MultiplayerInvite): void {
    if (!this.mpInviteToast) return;
    this.activeToastInviteId = invite.inviteId;
    const titleEl = document.getElementById('mp-invite-toast-title');
    const subEl = document.getElementById('mp-invite-toast-sub');
    const kindLabel = invite.kind === 'PARTY' ? 'Party' : 'World Session';
    const realmLabel = invite.realm === 'DARK_REALM' ? 'World 2' : 'World 1';
    if (titleEl) titleEl.textContent = `✉️ ${invite.fromUsername} invited you to ${kindLabel}`;
    if (subEl) subEl.textContent = `Currently in ${realmLabel} · Room ${invite.roomId}`;
    this.mpInviteToast.classList.add('show');
  }

  private showPortalTravelToast(payload: {
    initiatorId: string;
    initiatorName: string;
    targetRealm: 'ISLAND' | 'DARK_REALM';
    scope: 'PARTY' | 'ROOM';
    crystalsCount?: number;
  }): void {
    if (!this.mpPortalToast) return;
    this.pendingPortalTravel = {
      targetRealm: payload.targetRealm,
      crystalsCount: payload.crystalsCount,
    };
    const titleEl = document.getElementById('mp-portal-toast-title');
    const subEl = document.getElementById('mp-portal-toast-sub');
    const destLabel = payload.targetRealm === 'DARK_REALM' ? 'World 2 (Shadow Realm)' : 'World 1 (Forgotten Island)';
    if (titleEl) titleEl.textContent = `🌀 ${payload.initiatorName} entered ${destLabel}`;
    if (subEl) subEl.textContent = `Join your ${payload.scope === 'PARTY' ? 'party' : 'room'} through the portal?`;
    this.mpPortalToast.classList.add('show');
    if (this.portalToastTimer !== null) {
      window.clearTimeout(this.portalToastTimer);
    }
    this.portalToastTimer = window.setTimeout(() => {
      this.hidePortalTravelToast();
    }, 15000);
  }

  private hidePortalTravelToast(): void {
    if (this.portalToastTimer !== null) {
      window.clearTimeout(this.portalToastTimer);
      this.portalToastTimer = null;
    }
    this.pendingPortalTravel = null;
    this.mpPortalToast?.classList.remove('show');
  }

  private openVoicePermissionModal(): void {
    this.resetAllTouchStates();
    if (document.pointerLockElement) document.exitPointerLock?.();
    this.voicePermModal?.classList.add('open');
    this.syncModalOpenState();
  }

  private closeVoicePermissionModal(): void {
    this.voicePermModal?.classList.remove('open');
    this.syncModalOpenState();
  }

  private updateVoiceHudUI(): void {
    const coord = this.callbacks.getMultiplayerCoordinator?.() as MultiplayerCoordinator | undefined;
    if (!coord) return;
    const v = coord.voice;

    const micBtn = document.getElementById('voice-mic-btn');
    const muteBtn = document.getElementById('voice-mute-btn');
    const hudVolSlider = document.getElementById('voice-speaker-slider') as HTMLInputElement | null;
    const hudVolPct = document.getElementById('voice-speaker-pct');

    const modalEnableBtn = document.getElementById('mp-voice-enable-btn');
    const modalMuteBtn = document.getElementById('mp-voice-mute-btn');
    const modalVolSlider = document.getElementById('mp-voice-speaker-slider') as HTMLInputElement | null;
    const modalVolPct = document.getElementById('mp-voice-speaker-pct');
    const modalDesc = document.getElementById('mp-voice-status-desc');

    const volPct = Math.round(v.speakerVolume * 100);
    if (hudVolSlider && hudVolSlider.value !== String(volPct)) hudVolSlider.value = String(volPct);
    if (hudVolPct) hudVolPct.textContent = `${volPct}%`;
    if (modalVolSlider && modalVolSlider.value !== String(volPct)) modalVolSlider.value = String(volPct);
    if (modalVolPct) modalVolPct.textContent = `${volPct}%`;

    if (micBtn) {
      micBtn.classList.toggle('active', v.isEnabled && !v.isMuted);
      micBtn.classList.toggle('speaking', v.isEnabled && v.isSpeaking && !v.isMuted);
      micBtn.classList.toggle('muted', v.isEnabled && v.isMuted);
      micBtn.textContent = v.isEnabled
        ? v.isSpeaking && !v.isMuted
          ? '🎙️ Speaking'
          : '🎙️ Voice On'
        : '🎙️ Voice Off';
    }
    if (muteBtn) {
      muteBtn.style.display = v.isEnabled ? 'inline-flex' : 'none';
      muteBtn.classList.toggle('muted', v.isMuted);
      muteBtn.textContent = v.isMuted ? '🔇 Muted' : '🔊 Live';
    }
    if (modalEnableBtn) {
      modalEnableBtn.textContent = v.isEnabled ? '⏹️ Disable Mic' : '🎙️ Enable Mic';
      modalEnableBtn.classList.toggle('warn', v.isEnabled);
    }
    if (modalMuteBtn) {
      modalMuteBtn.style.display = v.isEnabled ? 'inline-block' : 'none';
      modalMuteBtn.textContent = v.isMuted ? '🔇 Muted (Unmute)' : '🔊 Live (Mute)';
      modalMuteBtn.classList.toggle('warn', v.isMuted);
    }
    if (modalDesc) {
      if (!v.isSupported()) {
        modalDesc.textContent = 'WebRTC microphone requires HTTPS/localhost in this browser.';
      } else if (v.lastError) {
        modalDesc.textContent = v.lastError;
      } else if (v.isEnabled) {
        modalDesc.textContent = v.isMuted
          ? 'Connected to Session/Party voice (Microphone Muted).'
          : v.isSpeaking
            ? 'Speaking live to your Session / Party across World 1 & World 2!'
            : 'Voice active — shared strictly with players in your Room or Party.';
      } else {
        modalDesc.textContent = 'Microphone is off. Click Enable to talk with your Room or Party.';
      }
    }
  }

  public openMultiplayerModal(): void {
    this.resetAllTouchStates();
    if (document.pointerLockElement) document.exitPointerLock?.();
    const coord = this.callbacks.getMultiplayerCoordinator?.() as MultiplayerCoordinator | undefined;
    coord?.refreshRooms();
    this.updateMultiplayerModalContent();
    this.multiplayerModal.classList.add('open');
    this.syncModalOpenState();
  }

  public closeMultiplayerModal(): void {
    this.multiplayerModal.classList.remove('open');
    this.syncModalOpenState();
  }

  public updateMultiplayerModalContent(): void {
    const coord = this.callbacks.getMultiplayerCoordinator?.() as MultiplayerCoordinator | undefined;
    if (!coord) return;

    const profile = coord.account.getProfile();
    const party = coord.party.getParty();

    // Status badge
    const statusBadge = document.getElementById('mp-network-status-badge');
    if (statusBadge) {
      if (coord.connectionStatus === 'ONLINE') {
        statusBadge.textContent = `🟢 Live Online (${coord.transport.pingMs}ms)`;
        statusBadge.style.color = '#10b981';
        statusBadge.style.borderColor = 'rgba(16, 185, 129, 0.45)';
        statusBadge.style.background = 'rgba(16, 185, 129, 0.15)';
      } else if (coord.connectionStatus === 'CONNECTING') {
        statusBadge.textContent = '🟡 Connecting to Server...';
        statusBadge.style.color = '#facc15';
      } else if (!coord.endpoints.isConfigured) {
        statusBadge.textContent = '⚙️ Set Cloudflare URL';
        statusBadge.style.color = '#f59e0b';
      } else {
        statusBadge.textContent = '🔴 Reconnecting / Offline';
        statusBadge.style.color = '#fb7185';
      }
    }

    // Cloudflare Server Endpoint & Cloud Save status
    const serverUrlInput = document.getElementById('mp-server-url-input') as HTMLInputElement | null;
    if (serverUrlInput && document.activeElement !== serverUrlInput) {
      serverUrlInput.value = coord.endpoints.wsUrl || '';
    }
    const serverSourceLabel = document.getElementById('mp-server-source-label');
    if (serverSourceLabel) {
      serverSourceLabel.textContent = `source: ${coord.endpoints.source}`;
    }
    const serverStatusHint = document.getElementById('mp-server-status-hint');
    if (serverStatusHint) {
      serverStatusHint.textContent = coord.endpoints.isConfigured
        ? `Endpoint: ${coord.endpoints.wsUrl}`
        : 'Enter your Cloudflare Worker URL (wss://...workers.dev) or set VITE_MULTIPLAYER_WS_URL in GitHub Variables.';
    }
    const cloudStatusText = document.getElementById('mp-cloud-status-text');
    if (cloudStatusText) {
      if (coord.cloudSaveLastSyncAt > 0) {
        const t = new Date(coord.cloudSaveLastSyncAt).toLocaleTimeString();
        cloudStatusText.textContent = `✅ Synced to Cloudflare D1 at ${t}`;
      } else if (coord.endpoints.apiUrl) {
        cloudStatusText.textContent = 'Cloudflare D1 ready · Auto-syncs on every save.';
      } else {
        cloudStatusText.textContent = 'Local save active · Connect Cloudflare Worker for D1 backup.';
      }
    }

    // Room header
    const curRoomName = document.getElementById('mp-current-room-name');
    const curRoomId = document.getElementById('mp-current-room-id');
    const leaveRoomBtn = document.getElementById('mp-leave-room-btn');
    if (curRoomName) curRoomName.textContent = coord.currentRoomName;
    if (curRoomId) curRoomId.textContent = coord.currentRoomId;
    if (leaveRoomBtn) {
      leaveRoomBtn.style.display = coord.currentRoomId !== 'ECHO-PUBLIC-1' ? 'inline-block' : 'none';
    }

    // Profile fields
    const nameInput = document.getElementById('mp-player-name-input') as HTMLInputElement | null;
    if (nameInput && document.activeElement !== nameInput) nameInput.value = profile.username;
    const robeInput = document.getElementById('mp-robe-color-input') as HTMLInputElement | null;
    if (robeInput && document.activeElement !== robeInput) robeInput.value = profile.robeColor || '#1e293b';
    const auraInput = document.getElementById('mp-aura-color-input') as HTMLInputElement | null;
    if (auraInput && document.activeElement !== auraInput) auraInput.value = profile.auraColor || '#00f5d4';

    const uuidText = document.getElementById('mp-player-uuid-text');
    if (uuidText) uuidText.textContent = profile.id;

    // Class highlight
    document.querySelectorAll('.mp-class-btn').forEach((btn) => {
      const cls = btn.getAttribute('data-class');
      if (cls === profile.characterClass) {
        (btn as HTMLElement).style.borderColor = '#00f5d4';
        (btn as HTMLElement).style.background = 'rgba(0, 245, 212, 0.12)';
      } else {
        (btn as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.12)';
        (btn as HTMLElement).style.background = 'rgba(255, 255, 255, 0.04)';
      }
    });

    // Rooms list
    const roomsListEl = document.getElementById('mp-rooms-list');
    if (roomsListEl) {
      const rooms: RoomSummary[] = coord.rooms || [];
      if (rooms.length === 0) {
        roomsListEl.innerHTML = `<div style="font-size:0.75rem;color:#64748b;padding:4px 0;">No other public rooms listed yet. Create one above!</div>`;
      } else {
        roomsListEl.innerHTML = rooms
          .map((r) => {
            const isHere = r.roomId === coord.currentRoomId;
            return `
              <div class="mp-list-item">
                <div>
                  <div style="font-size:0.78rem;font-weight:800;color:#fff;">${r.isPrivate ? '🔒 ' : '🌍 '}${this.escapeHtml(r.name)}</div>
                  <div style="font-size:0.68rem;color:#94a3b8;font-family:monospace;">${this.escapeHtml(r.roomId)} · ${r.playerCount} player(s)</div>
                </div>
                ${
                  isHere
                    ? `<span style="font-size:0.7rem;color:#10b981;font-weight:800;">Joined ✓</span>`
                    : `<button type="button" class="mp-mini-btn interactive mp-quick-join-room-btn" data-room-id="${this.escapeHtml(r.roomId)}">Join</button>`
                }
              </div>
            `;
          })
          .join('');
        roomsListEl.querySelectorAll('.mp-quick-join-room-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const rid = (btn as HTMLElement).getAttribute('data-room-id');
            if (rid) coord.joinRoom(rid);
          });
        });
      }
    }

    // Room Players list
    const roomPlayersEl = document.getElementById('mp-room-players-list');
    if (roomPlayersEl) {
      const remotes = coord.remotePlayers.getAllPlayers();
      const peersMap = new Map(coord.getVoicePeers().map((vp) => [vp.playerId, vp]));
      if (remotes.length === 0) {
        roomPlayersEl.innerHTML = `<div style="font-size:0.75rem;color:#64748b;padding:4px 0;">You are currently the only adventurer in this room. Invite a friend or share your Room ID!</div>`;
      } else {
        roomPlayersEl.innerHTML = remotes
          .map((rp) => {
            const pid = rp.profile.id;
            const isFriend = coord.friends.isFriend(pid);
            const realmLabel = rp.realm === 'DARK_REALM' ? 'World 2' : 'World 1';
            const vp = peersMap.get(pid);
            const voiceBadge = vp?.enabled ? (vp.muted ? '🔇' : vp.speaking ? '🗣️' : '🎙️') : '';
            const peerMuteLabel = vp?.localMuted ? 'Unmute Peer' : 'Mute Peer';
            return `
              <div class="mp-list-item">
                <div>
                  <div style="font-size:0.8rem;font-weight:800;color:#fff;">${voiceBadge} ${this.escapeHtml(rp.profile.username)}</div>
                  <div style="font-size:0.68rem;color:#94a3b8;">${this.escapeHtml(rp.profile.characterClass)} · ${realmLabel}</div>
                </div>
                <div style="display:flex;gap:5px;flex-wrap:wrap;">
                  ${!isFriend ? `<button type="button" class="mp-mini-btn interactive mp-rp-friend-btn" data-pid="${this.escapeHtml(pid)}">+ Friend</button>` : ''}
                  <button type="button" class="mp-mini-btn gold interactive mp-rp-party-btn" data-pid="${this.escapeHtml(pid)}">Invite Party</button>
                  ${vp?.enabled ? `<button type="button" class="mp-mini-btn ${vp.localMuted ? 'warn' : ''} interactive mp-rp-mute-btn" data-pid="${this.escapeHtml(pid)}">${peerMuteLabel}</button>` : ''}
                </div>
              </div>
            `;
          })
          .join('');
        roomPlayersEl.querySelectorAll('.mp-rp-friend-btn').forEach((b) =>
          b.addEventListener('click', () => {
            const pid = b.getAttribute('data-pid');
            if (pid) coord.addFriend(pid);
          })
        );
        roomPlayersEl.querySelectorAll('.mp-rp-party-btn').forEach((b) =>
          b.addEventListener('click', () => {
            const pid = b.getAttribute('data-pid');
            if (pid) coord.sendInvite(pid, 'PARTY');
          })
        );
        roomPlayersEl.querySelectorAll('.mp-rp-mute-btn').forEach((b) =>
          b.addEventListener('click', () => {
            const pid = b.getAttribute('data-pid');
            if (pid) {
              coord.togglePeerMute(pid);
              this.updateMultiplayerModalContent();
            }
          })
        );
      }
    }

    // Party slots
    const partyCodeBadge = document.getElementById('mp-party-code-badge');
    if (partyCodeBadge) partyCodeBadge.textContent = party ? `CODE: ${party.passCode}` : 'NO ACTIVE PARTY';
    const sharedObj = document.getElementById('mp-shared-objective-text');
    if (sharedObj && party) sharedObj.textContent = party.sharedObjectiveAr;

    const slotsEl = document.getElementById('mp-party-slots-container');
    if (slotsEl) {
      const members = party?.members || [];
      const cards: string[] = [];
      for (let i = 0; i < 4; i++) {
        const m = members[i];
        if (m) {
          const realmTag = m.realm === 'DARK_REALM' ? 'W2' : 'W1';
          cards.push(`
            <div style="background:rgba(0,245,212,0.09);border:1px solid rgba(0,245,212,0.45);border-radius:8px;padding:0.45rem;text-align:center;">
              <div style="font-size:1.05rem;">${m.isLeader ? '👑' : '⚔️'}</div>
              <div ${i === 0 ? 'id="mp-slot-1-name"' : ''} style="font-size:0.74rem;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${this.escapeHtml(m.username)}</div>
              <div style="font-size:0.64rem;color:#10b981;">${Math.round(m.hp)}/${Math.round(m.maxHp)} HP · ${realmTag}</div>
            </div>
          `);
        } else {
          cards.push(`
            <div style="background:rgba(255,255,255,0.02);border:1px dashed rgba(255,255,255,0.15);border-radius:8px;padding:0.45rem;text-align:center;opacity:0.6;">
              <div style="font-size:1.05rem;color:#64748b;">+</div>
              <div style="font-size:0.68rem;color:#94a3b8;">Open Slot</div>
              <div style="font-size:0.62rem;color:#64748b;">Waiting</div>
            </div>
          `);
        }
      }
      slotsEl.innerHTML = cards.join('');
    }

    // Invites list
    const invitesEl = document.getElementById('mp-invites-list');
    if (invitesEl) {
      const invites: MultiplayerInvite[] = coord.friends.getPendingInvites();
      if (invites.length === 0) {
        invitesEl.innerHTML = `<div style="font-size:0.73rem;color:#64748b;">No pending invitations.</div>`;
      } else {
        invitesEl.innerHTML = invites
          .map(
            (inv) => `
            <div class="mp-list-item">
              <div>
                <div style="font-size:0.78rem;font-weight:800;color:#fde047;">${this.escapeHtml(inv.fromUsername)} → ${inv.kind} Invite</div>
                <div style="font-size:0.68rem;color:#94a3b8;">Room ${this.escapeHtml(inv.roomId)} · ${inv.realm === 'DARK_REALM' ? 'World 2' : 'World 1'}</div>
              </div>
              <div style="display:flex;gap:5px;">
                <button type="button" class="mp-mini-btn interactive mp-inv-accept" data-iid="${this.escapeHtml(inv.inviteId)}">Accept</button>
                <button type="button" class="mp-mini-btn warn interactive mp-inv-decline" data-iid="${this.escapeHtml(inv.inviteId)}">Decline</button>
              </div>
            </div>
          `
          )
          .join('');
        invitesEl.querySelectorAll('.mp-inv-accept').forEach((b) =>
          b.addEventListener('click', () => {
            const iid = b.getAttribute('data-iid');
            if (iid) coord.respondToInvite(iid, true);
          })
        );
        invitesEl.querySelectorAll('.mp-inv-decline').forEach((b) =>
          b.addEventListener('click', () => {
            const iid = b.getAttribute('data-iid');
            if (iid) coord.respondToInvite(iid, false);
          })
        );
      }
    }

    // Friends list
    const friendsEl = document.getElementById('mp-friends-list');
    if (friendsEl) {
      const friends: FriendEntry[] = coord.friends.getFriends();
      if (friends.length === 0) {
        friendsEl.innerHTML = `<div style="font-size:0.74rem;color:#64748b;">No friends added yet. Enter a player's name or UUID above to connect!</div>`;
      } else {
        friendsEl.innerHTML = friends
          .map((f) => {
            const statusText = f.online
              ? `🟢 Online (${f.realm === 'DARK_REALM' ? 'World 2' : 'World 1'})`
              : '⚫ Offline';
            return `
              <div class="mp-list-item">
                <div>
                  <div style="font-size:0.8rem;font-weight:800;color:#fff;">${this.escapeHtml(f.username)}</div>
                  <div style="font-size:0.68rem;color:${f.online ? '#34d399' : '#64748b'};">${statusText}</div>
                </div>
                <div style="display:flex;gap:4px;flex-wrap:wrap;">
                  ${
                    f.online
                      ? `
                        <button type="button" class="mp-mini-btn interactive mp-fr-inv-room" data-pid="${this.escapeHtml(f.playerId)}">Invite Room</button>
                        <button type="button" class="mp-mini-btn gold interactive mp-fr-inv-party" data-pid="${this.escapeHtml(f.playerId)}">Invite Party</button>
                        ${f.roomId && f.roomId !== coord.currentRoomId ? `<button type="button" class="mp-mini-btn interactive mp-fr-join-room" data-rid="${this.escapeHtml(f.roomId)}">Join</button>` : ''}
                      `
                      : ''
                  }
                  <button type="button" class="mp-mini-btn warn interactive mp-fr-remove" data-pid="${this.escapeHtml(f.playerId)}">✕</button>
                </div>
              </div>
            `;
          })
          .join('');
        friendsEl.querySelectorAll('.mp-fr-inv-room').forEach((b) =>
          b.addEventListener('click', () => {
            const pid = b.getAttribute('data-pid');
            if (pid) coord.sendInvite(pid, 'ROOM');
          })
        );
        friendsEl.querySelectorAll('.mp-fr-inv-party').forEach((b) =>
          b.addEventListener('click', () => {
            const pid = b.getAttribute('data-pid');
            if (pid) coord.sendInvite(pid, 'PARTY');
          })
        );
        friendsEl.querySelectorAll('.mp-fr-join-room').forEach((b) =>
          b.addEventListener('click', () => {
            const rid = b.getAttribute('data-rid');
            if (rid) coord.joinRoom(rid);
          })
        );
        friendsEl.querySelectorAll('.mp-fr-remove').forEach((b) =>
          b.addEventListener('click', () => {
            const pid = b.getAttribute('data-pid');
            if (pid) coord.removeFriend(pid);
          })
        );
      }
    }

    // Voice Peers list
    const peersEl = document.getElementById('mp-voice-peers-list');
    if (peersEl) {
      const peers: VoicePeerState[] = coord.getVoicePeers();
      if (peers.length === 0) {
        peersEl.innerHTML = `<div style="font-size:0.73rem;color:#64748b;margin-top:4px;">No other players in your current Room or Party right now.</div>`;
      } else {
        peersEl.innerHTML = peers
          .map((vp) => {
            const stateStr = !vp.enabled
              ? 'Voice Off'
              : vp.muted
                ? 'Muted'
                : vp.speaking
                  ? 'Speaking...'
                  : vp.connected
                    ? 'Connected'
                    : 'Ready';
            return `
              <div class="mp-list-item">
                <div>
                  <div style="font-size:0.78rem;font-weight:800;color:#fff;">${vp.speaking ? '🗣️ ' : '🎙️ '}${this.escapeHtml(vp.username)}</div>
                  <div style="font-size:0.68rem;color:#94a3b8;">${stateStr}</div>
                </div>
                <button type="button" class="mp-mini-btn ${vp.localMuted ? 'warn' : ''} interactive mp-vp-mute-btn" data-pid="${this.escapeHtml(vp.playerId)}">
                  ${vp.localMuted ? '🔇 Unmute Peer' : '🔊 Mute Peer'}
                </button>
              </div>
            `;
          })
          .join('');
        peersEl.querySelectorAll('.mp-vp-mute-btn').forEach((b) =>
          b.addEventListener('click', () => {
            const pid = b.getAttribute('data-pid');
            if (pid) {
              coord.togglePeerMute(pid);
              this.updateMultiplayerModalContent();
            }
          })
        );
      }
    }

    this.updateVoiceHudUI();
  }

  public handleEscapeKey(allowPauseToggle: boolean = true): void {
    if (this.isCustomizingControls) {
      this.exitControlsEditMode(false);
      return;
    }
    if (this.voicePermModal?.classList.contains('open')) {
      this.closeVoicePermissionModal();
      return;
    }
    if (this.settingsModal?.classList.contains('open')) {
      this.closeSettingsModal();
      return;
    }
    if (this.multiplayerModal?.classList.contains('open')) {
      this.closeMultiplayerModal();
      return;
    }
    if (this.worldMemoryModal?.classList.contains('open')) {
      this.closeWorldMemoryModal();
      return;
    }
    if (this.questLogModal?.classList.contains('open')) {
      this.closeQuestLogModal();
      return;
    }
    if (this.npcDialogueModal?.classList.contains('open')) {
      this.closeNPCDialogue();
      return;
    }
    if (this.storyNarrativeModal?.classList.contains('open')) {
      this.closeStoryNarrativeModal();
      return;
    }
    if (this.loreModal?.classList.contains('open')) {
      this.closeLoreModal();
      return;
    }
    if (this.inscriptionModal?.classList.contains('open')) {
      this.closeInscriptionModal();
      return;
    }
    if (this.victoryModal?.classList.contains('open')) {
      this.victoryModal.classList.remove('open');
      this.syncModalOpenState();
      return;
    }
    if (this.buildCraftModal?.classList.contains('open')) {
      this.closeBuildCraftModal();
      return;
    }
    if (this.deathModal?.classList.contains('open')) {
      return;
    }
    if (allowPauseToggle) {
      this.togglePause();
    }
  }

  public togglePause(): void {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.resetAllTouchStates();
      this.pauseModal.classList.add('open');
    } else {
      this.pauseModal.classList.remove('open');
      this.syncModalOpenState();
    }
    this.callbacks.onPauseToggle();
  }

  public getIsModalOrPaused(): boolean {
    const domOpen =
      Boolean(this.root.querySelector('.modal-overlay.open:not(#pause-modal)')) ||
      Boolean(document.querySelector('.dr-modal.open'));
    if (this.isModalOpen !== domOpen) {
      this.isModalOpen = domOpen;
    }
    return domOpen || this.isPaused || this.isCustomizingControls;
  }

  /**
   * Draws circular minimap radar
   */
  public renderMinimap(
    playerX: number,
    playerZ: number,
    playerAngle: number,
    crystals: CrystalData[],
    shards?: MemoryShard[],
    npcs?: { pos: { x: number; z: number }; type: string }[],
    enemies?: { pos: { x: number; z: number } }[],
    allies?: { pos: { x: number; z: number }; name?: string; color?: number }[],
    houses?: { x: number; z: number; style: string; nameAr: string }[]
  ): void {
    const ctx = this.minimapCanvas.getContext('2d');
    if (!ctx) return;

    const w = this.minimapCanvas.width;
    const h = this.minimapCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radarScale = 0.42;

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(playerAngle);

    // 1. Continent coastline representation (Vast open world)
    ctx.strokeStyle = 'rgba(0, 245, 212, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(-playerX * radarScale, -playerZ * radarScale, 1050 * radarScale, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Bioluminescent Lake
    ctx.fillStyle = 'rgba(0, 245, 212, 0.35)';
    ctx.beginPath();
    ctx.arc(-playerX * radarScale, (-15 - playerZ) * radarScale, 36 * radarScale, 0, Math.PI * 2);
    ctx.fill();

    // 3. Ancient Temple icon
    ctx.fillStyle = '#82848c';
    ctx.fillRect((-85 - playerX) * radarScale - 3, (25 - playerZ) * radarScale - 3, 6, 6);

    // 4. Great Portal icon
    ctx.fillStyle = '#00ffff';
    ctx.fillRect((95 - playerX) * radarScale - 4, (-30 - playerZ) * radarScale - 4, 8, 8);

    // 4.5. Village Houses & Rustic Cottages (Cozy rooftops with glowing hearth dots)
    if (houses) {
      houses.forEach((h) => {
        const mx = (h.x - playerX) * radarScale;
        const my = (h.z - playerZ) * radarScale;
        const size = h.style === 'large' ? 6 : h.style === 'medium' ? 4.5 : 3.5;

        // Wooden/stone cabin foundation & roof
        ctx.fillStyle = h.style === 'large' ? '#c89666' : '#b07d4f';
        ctx.fillRect(mx - size / 2, my - size / 2, size, size);

        // Roof ridge line
        ctx.strokeStyle = '#5a3818';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(mx - size / 2, my);
        ctx.lineTo(mx + size / 2, my);
        ctx.stroke();

        // Warm glowing hearth marker
        ctx.fillStyle = '#ff7722';
        ctx.beginPath();
        ctx.arc(mx, my, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 5. Memory Shard blips (delicate golden points)
    if (shards) {
      shards.forEach((s) => {
        if (s.collected) return;
        const mx = (s.pos.x - playerX) * radarScale;
        const my = (s.pos.z - playerZ) * radarScale;

        ctx.fillStyle = '#fee440';
        ctx.beginPath();
        ctx.arc(mx, my, 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 6. Echo Crystal blips (with crisp halo so every crystal including Crystal #7 stands out cleanly)
    crystals.forEach((c) => {
      if (c.collected) return;
      const mx = (c.pos.x - playerX) * radarScale;
      const my = (c.pos.z - playerZ) * radarScale;

      ctx.fillStyle = '#' + c.color.toString(16).padStart(6, '0');
      ctx.beginPath();
      ctx.arc(mx, my, 4.0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.25;
      ctx.stroke();
    });

    // 7. NPC & Spirit Creature blips
    if (npcs) {
      npcs.forEach((npc) => {
        const mx = (npc.pos.x - playerX) * radarScale;
        const my = (npc.pos.z - playerZ) * radarScale;
        if (npc.type === 'WANDERER') {
          ctx.fillStyle = '#00f5d4';
          ctx.beginPath();
          ctx.arc(mx, my, 4.0, 0, Math.PI * 2);
          ctx.fill();
        } else if (npc.type === 'GUARDIAN') {
          ctx.fillStyle = '#9b5de5';
          ctx.fillRect(mx - 3.5, my - 3.5, 7, 7);
        } else {
          ctx.fillStyle = '#5eead4';
          ctx.beginPath();
          ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    // 8. Enemy blips (Corrupted Wood Wraiths - ominous crimson diamond markers)
    if (enemies) {
      enemies.forEach((enemy) => {
        const mx = (enemy.pos.x - playerX) * radarScale;
        const my = (enemy.pos.z - playerZ) * radarScale;
        ctx.fillStyle = '#ff3366';
        ctx.beginPath();
        ctx.arc(mx, my, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ff758f';
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }

    // 9. Co-Op Party Allies & Quest Companions (Luminous Cyan/Gold rings)
    if (allies) {
      allies.forEach((ally) => {
        const mx = (ally.pos.x - playerX) * radarScale;
        const my = (ally.pos.z - playerZ) * radarScale;
        ctx.fillStyle = typeof ally.color === 'number' ? '#' + ally.color.toString(16).padStart(6, '0') : '#00f5d4';
        ctx.beginPath();
        ctx.arc(mx, my, 4.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });
    }

    ctx.restore();

    // Player marker at center of compass (facing UP)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 6);
    ctx.lineTo(cx - 4, cy + 5);
    ctx.lineTo(cx + 4, cy + 5);
    ctx.closePath();
    ctx.fill();
  }

  public renderDarkRealmMinimap(
    playerX: number,
    playerZ: number,
    playerAngle: number,
    landmarks: Array<{ pos: { x: number; z: number }; kind: string }>,
    monsters: Array<{ x: number; z: number; isBoss: boolean }>,
    companions: Array<{ pos: { x: number; z: number }; color?: number }>,
    returnPortalPos: { x: number; z: number }
  ): void {
    const ctx = this.minimapCanvas.getContext('2d');
    if (!ctx) return;

    const w = this.minimapCanvas.width;
    const h = this.minimapCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radarScale = 0.28;

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(playerAngle);

    // Shadow Realm boundary ring
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(-playerX * radarScale, -playerZ * radarScale, 900 * radarScale, 0, Math.PI * 2);
    ctx.stroke();

    // Landmarks
    for (const lm of landmarks) {
      const mx = (lm.pos.x - playerX) * radarScale;
      const my = (lm.pos.z - playerZ) * radarScale;
      ctx.fillStyle =
        lm.kind === 'castle'
          ? '#f43f5e'
          : lm.kind === 'village'
            ? '#fbbf24'
            : lm.kind === 'floating'
              ? '#38bdf8'
              : '#c084fc';
      ctx.beginPath();
      ctx.arc(mx, my, lm.kind === 'castle' ? 5 : 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Return Portal to Forgotten Island
    const rx = (returnPortalPos.x - playerX) * radarScale;
    const ry = (returnPortalPos.z - playerZ) * radarScale;
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(rx - 4, ry - 4, 8, 8);

    // Monsters & Boss
    for (const m of monsters) {
      const mx = (m.x - playerX) * radarScale;
      const my = (m.z - playerZ) * radarScale;
      ctx.fillStyle = m.isBoss ? '#fb7185' : '#ef4444';
      ctx.beginPath();
      ctx.arc(mx, my, m.isBoss ? 4.2 : 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Shared 3 Companions
    for (const ally of companions) {
      const mx = (ally.pos.x - playerX) * radarScale;
      const my = (ally.pos.z - playerZ) * radarScale;
      ctx.fillStyle = typeof ally.color === 'number' ? '#' + ally.color.toString(16).padStart(6, '0') : '#00f5d4';
      ctx.beginPath();
      ctx.arc(mx, my, 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();

    // Player marker at center of compass (facing UP)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(cx, cy - 6);
    ctx.lineTo(cx - 4, cy + 5);
    ctx.lineTo(cx + 4, cy + 5);
    ctx.closePath();
    ctx.fill();
  }

  // ==========================================
  // COMBAT SYSTEM HUD & STATS METHODS
  // ==========================================

  public updateCombatStats(stats: CombatStats): void {
    const key = `${Math.ceil(stats.hp)}/${stats.maxHp}|${Math.ceil(stats.energy)}/${stats.maxEnergy}`;
    if (key === this.lastCombatStatsKey) return;
    this.lastCombatStatsKey = key;

    if (this.playerHpBarFill && this.playerHpText) {
      const hpPct = Math.max(0, Math.min(100, (stats.hp / stats.maxHp) * 100));
      this.playerHpBarFill.style.width = `${hpPct}%`;
      this.playerHpText.textContent = `${Math.ceil(stats.hp)}/${stats.maxHp}`;
      if (hpPct <= 30) {
        this.playerHpBarFill.classList.add('low');
      } else {
        this.playerHpBarFill.classList.remove('low');
      }
    }

    if (this.playerEnergyBarFill && this.playerEnergyText) {
      const energyPct = Math.max(0, Math.min(100, (stats.energy / stats.maxEnergy) * 100));
      this.playerEnergyBarFill.style.width = `${energyPct}%`;
      this.playerEnergyText.textContent = `${Math.ceil(stats.energy)}/${stats.maxEnergy}`;
      if (energyPct >= 40) {
        this.playerEnergyBarFill.classList.add('pulse-ready');
      } else {
        this.playerEnergyBarFill.classList.remove('pulse-ready');
      }
    }
  }

  public showHurtEffect(): void {
    if (this.hurtVignetteOverlay) {
      this.hurtVignetteOverlay.classList.add('active');
      setTimeout(() => {
        this.hurtVignetteOverlay.classList.remove('active');
      }, 220);
    }
  }

  public openDeathModal(onRevive: () => void): void {
    this.resetAllTouchStates();
    this.onDeathReviveCallback = onRevive;
    if (this.deathModal) {
      this.deathModal.classList.add('open');
    }
    this.syncModalOpenState();
  }

  public closeDeathModal(): void {
    if (this.deathModal) {
      this.deathModal.classList.remove('open');
    }
    this.syncModalOpenState();
    this.onDeathReviveCallback = null;
  }

  // ==========================================
  // NPC DIALOGUE SYSTEM METHODS
  // ==========================================

  /**
   * Opens the interactive NPC Dialogue modal with branching choices
   */
  public openNPCDialogue(node: DialogueNode, onOptionSelected: (option: DialogueOption) => void): void {
    if (!this.npcDialogueModal) return;
    this.resetAllTouchStates();
    this.onDialogueOptionSelectedCallback = onOptionSelected;

    this.npcPortraitImg.src = node.portraitUrl;
    this.npcTitleBadge.textContent = `${node.titleAr} · ${node.titleEn}`;
    this.npcNameAr.textContent = node.speakerNameAr;
    this.npcNameEn.textContent = node.speakerNameEn;
    this.npcDialogueMessageAr.textContent = node.messageAr;
    this.npcDialogueMessageEn.textContent = node.messageEn;

    // Render dialogue choice buttons
    this.npcDialogueOptionsContainer.innerHTML = '';
    node.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'modal-btn interactive';
      btn.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.75rem 1.1rem;
        background: rgba(0, 245, 212, 0.08);
        border: 1.5px solid rgba(0, 245, 212, 0.35);
        border-radius: 10px;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: right;
        direction: rtl;
      `;
      btn.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 0.15rem; flex: 1;">
          <span style="font-family: 'Amiri', serif; font-size: 1.15rem; color: #e0fbf6;">${opt.textAr}</span>
          <span style="font-size: 0.78rem; color: #80ffea; direction: ltr; text-align: left;">${opt.textEn}</span>
        </div>
        <span style="font-size: 1.1rem; color: #00f5d4; margin-right: 0.75rem;">❮</span>
      `;

      btn.addEventListener('mouseenter', () => {
        btn.style.background = 'rgba(0, 245, 212, 0.22)';
        btn.style.borderColor = '#00f5d4';
        btn.style.transform = 'translateX(-4px)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = 'rgba(0, 245, 212, 0.08)';
        btn.style.borderColor = 'rgba(0, 245, 212, 0.35)';
        btn.style.transform = 'translateX(0)';
      });

      btn.addEventListener('click', () => {
        if (this.onDialogueOptionSelectedCallback) {
          this.onDialogueOptionSelectedCallback(opt);
        }
      });

      this.npcDialogueOptionsContainer.appendChild(btn);
    });

    this.npcDialogueModal.classList.add('open');
    this.syncModalOpenState();
  }

  public closeNPCDialogue(): void {
    if (this.npcDialogueModal) {
      this.npcDialogueModal.classList.remove('open');
    }
    this.syncModalOpenState();
    this.onDialogueOptionSelectedCallback = null;
  }

  public isNPCDialogueOpen(): boolean {
    return this.npcDialogueModal ? this.npcDialogueModal.classList.contains('open') : false;
  }


  // ==========================================
  // QUEST & STORY NARRATIVE SYSTEM METHODS
  // ==========================================

  /**
   * Updates the in-game HUD Quest Tracker card with current quest and active objective
   */
  public updateQuestTracker(quest: StoryQuest, activeObj: QuestObjective | null): void {
    if (!this.questCluster) return;

    // Update quest chapter and title
    if (this.questChapterBadge) {
      this.questChapterBadge.innerHTML = `<span>✦ CHAPTER ${quest.chapter === 1 ? 'I' : 'II'}</span><span style="opacity: 0.65;">·</span><span>${quest.chapter === 1 ? 'المهمة الأولى' : 'المهمة الثانية'}</span>`;
    }
    if (this.questTitleText) {
      this.questTitleText.textContent = `${quest.titleEn} · ${quest.titleAr}`;
    }

    if (activeObj) {
      const arabicNumerals = ['١', '٢', '٣', '٤', '٥', '٦', '٧'];
      const totalArabic = arabicNumerals[quest.objectives.length - 1] || `${quest.objectives.length}`;
      const objIdx = quest.objectives.findIndex((o) => o.id === activeObj.id);
      const curArabic = arabicNumerals[objIdx] || `${objIdx + 1}`;

      if (this.questObjectiveBadge) {
        this.questObjectiveBadge.textContent = `${curArabic} / ${totalArabic}`;
      }
      if (this.questObjectiveTitleAr) {
        this.questObjectiveTitleAr.textContent = activeObj.titleAr;
      }
      if (this.questObjectiveTitleEn) {
        this.questObjectiveTitleEn.textContent = activeObj.titleEn;
      }
      if (this.questObjectiveHint) {
        this.questObjectiveHint.innerHTML = `<span>📍</span><span>${activeObj.hintAr}</span>`;
      }

      // Progress bar and counter
      if (this.questProgressText && this.questProgressBar) {
        if (activeObj.targetCount > 1) {
          const unit = activeObj.id === 'explore_island' ? 'm' : '';
          this.questProgressText.textContent = `${activeObj.currentCount} / ${activeObj.targetCount}${unit}`;
          const pct = Math.min(100, Math.round((activeObj.currentCount / activeObj.targetCount) * 100));
          this.questProgressBar.style.width = `${pct}%`;
          this.questProgressBar.style.display = 'block';
        } else {
          this.questProgressText.textContent = activeObj.isCompleted ? 'مكتمل ✓' : 'قيد التنفيذ ✦';
          this.questProgressBar.style.width = activeObj.isCompleted ? '100%' : '20%';
        }
      }
    } else {
      // All objectives completed
      if (this.questObjectiveBadge) this.questObjectiveBadge.textContent = '✓';
      if (this.questObjectiveTitleAr) this.questObjectiveTitleAr.textContent = 'اكتملت جميع أهداف المهمة!';
      if (this.questObjectiveTitleEn) this.questObjectiveTitleEn.textContent = 'All Objectives Completed!';
      if (this.questProgressText) this.questProgressText.textContent = '100%';
      if (this.questProgressBar) this.questProgressBar.style.width = '100%';
      if (this.questObjectiveHint) {
        this.questObjectiveHint.innerHTML = `<span>🌟</span><span>الذاكرة مستيقظة بالكامل · The World Remembers</span>`;
      }
    }
  }

  /**
   * Displays the celebratory sliding objective completed banner
   */
  public showObjectiveCompleteBanner(_completedObj: QuestObjective, _nextObj: QuestObjective | null): void {
    // Unnecessary popup notifications disabled per design request
    return;
  }

  public setCursorLockedCrosshair(locked: boolean): void {
    this.isCursorLockedCrosshair = locked;
    this.refreshCrosshairVisibility();
  }

  private refreshCrosshairVisibility(): void {
    if (!this.buildCrosshairEl) return;
    if (this.isBuildModeActive || this.isCursorLockedCrosshair || this.isCombatReticleActive) {
      this.buildCrosshairEl.classList.add('active');
    } else {
      this.buildCrosshairEl.classList.remove('active');
    }
  }

  public setCombatReticleState(active: boolean, tight: boolean): void {
    if (this.isCombatReticleActive !== active) {
      this.isCombatReticleActive = active;
      this.refreshCrosshairVisibility();
    }
    this.buildCrosshairEl?.classList.toggle('tight', active && tight);
  }

  public triggerHitmarker(isKill: boolean = false): void {
    if (!this.buildCrosshairEl) return;
    this.buildCrosshairEl.classList.add('active', 'hit');
    this.buildCrosshairEl.classList.toggle('kill', isKill);
    if (this.hitmarkerTimer !== null) {
      window.clearTimeout(this.hitmarkerTimer);
    }
    this.hitmarkerTimer = window.setTimeout(() => {
      this.hitmarkerTimer = null;
      this.buildCrosshairEl?.classList.remove('hit', 'kill');
      this.refreshCrosshairVisibility();
    }, isKill ? 190 : 120);
  }

  public updateBuildModeBar(active: boolean, blockKind?: VoxelBlockKind, rotStep: number = 0): void {
    const key = `${active ? 1 : 0}|${blockKind || ''}|${Math.round(rotStep)}`;
    if (key === this.lastBuildBarKey) return;
    this.lastBuildBarKey = key;

    this.isBuildModeActive = active;
    this.refreshCrosshairVisibility();
    if (!this.buildModeBar) return;
    if (active) {
      this.buildModeBar.classList.add('active');
      if (blockKind && this.buildModeBlockLabel) {
        const deg = (((Math.round(rotStep) % 4) + 4) % 4) * 90;
        this.buildModeBlockLabel.textContent = `🧱 ${VOXEL_LABELS[blockKind].en} · ${VOXEL_LABELS[blockKind].ar} · ${deg}°`;
      }
    } else {
      this.buildModeBar.classList.remove('active');
    }
  }

  public isBuildCraftModalOpen(): boolean {
    return Boolean(this.buildCraftModal?.classList.contains('open'));
  }

  public openBuildCraftModal(
    progress: DarkRealmProgress,
    callbacks: {
      onSelectBlock: (kind: VoxelBlockKind) => void;
      onToggleBuildMode: () => void;
      onCraft: (recipe: CraftRecipe) => void;
      onQuickBuildHouse: () => void;
      onUpgradeStat?: (stat: keyof DarkRealmProgress['statRanks']) => boolean | void;
    }
  ): void {
    this.resetAllTouchStates();
    this.buildCraftCallbacks = callbacks;
    this.refreshBuildCraftModal(progress);
    this.buildCraftModal.classList.add('open');
    this.syncModalOpenState();
  }

  public refreshBuildCraftModal(progress: DarkRealmProgress): void {
    if (!this.buildCraftBody) return;
    const inv = progress.inventory;
    const blockKinds = Object.keys(VOXEL_LABELS) as VoxelBlockKind[];
    const buildRecipes = CRAFT_RECIPES.filter(
      (r) => r.category === 'building' || r.category === 'consumable'
    );
    const gearRecipes = CRAFT_RECIPES.filter((r) => r.category === 'gear');
    const wStats = progress.getWeaponStats();
    const aStats = progress.getArmorStats();
    const nextWeapon = WEAPON_TIERS[progress.weaponTier + 1];
    const nextArmor = ARMOR_TIERS[progress.armorTier + 1];

    const resItems: Array<[string, number]> = [
      ['🪵 Wood', inv.wood],
      ['🪨 Stone', inv.stone],
      ['🔩 Iron', inv.iron],
      ['🔮 Crystal', inv.crystal],
      ['🪙 Gold', inv.gold],
      ['🌑 Essence', inv.essence],
      ['🏹 Arrows', inv.arrows],
      ['🍖 Rations', inv.cookedFood + inv.food],
      ['🧪 Potions', inv.potions],
      ['🪵 Planks', inv.woodPlanks],
      ['🏠 Roofs', inv.roofBlocks],
      ['🚪 Doors', inv.doorBlocks],
      ['🪟 Windows', inv.glassBlocks],
      ['🛏️ Beds', inv.bedBlocks],
      ['🪑 Tables', inv.tableBlocks],
      ['🪑 Chairs', inv.chairBlocks],
      ['🧰 Chests', inv.chestBlocks],
      ['🛠️ Bench', inv.workbenchBlocks],
    ];

    const statDefs: Array<{ key: keyof DarkRealmProgress['statRanks']; label: string; ar: string }> = [
      { key: 'vitality', label: 'Vitality (+25 Max HP)', ar: 'الحيوية' },
      { key: 'arcana', label: 'Arcana (+15 Max Mana)', ar: 'طاقة السحر' },
      { key: 'strength', label: 'Strength (+8 Melee/Bow DMG)', ar: 'القوة القتالية' },
      { key: 'bastion', label: 'Bastion (+4% Defense)', ar: 'الدفاع والصلابة' },
      { key: 'swiftness', label: 'Swiftness (+6% Speed)', ar: 'السرعة والرشاقة' },
    ];

    this.buildCraftBody.innerHTML = `
      <div style="background:rgba(0,0,0,0.42);border:1px solid rgba(0,245,212,0.28);border-radius:12px;padding:10px;margin-bottom:10px;">
        <div style="font-size:0.74rem;font-weight:800;color:#00f5d4;margin-bottom:6px;">
          COMBAT ARSENAL · تبديل الأسلحة (Sword · Pistol · Bow)
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="build-tab-btn interactive bc-weapon-pick ${this.currentWeaponState.weapon === 'sword' ? 'active' : ''}" data-weapon="sword" style="flex:1;min-width:110px;">
            ⚔️ Echo Sword · السيف
          </button>
          <button type="button" class="build-tab-btn interactive bc-weapon-pick ${this.currentWeaponState.weapon === 'pistol' ? 'active' : ''}" data-weapon="pistol" style="flex:1;min-width:110px;">
            🔫 Echo Pistol · المسدس
          </button>
          <button type="button" class="build-tab-btn interactive bc-weapon-pick ${this.currentWeaponState.weapon === 'bow' ? 'active' : ''}" data-weapon="bow" style="flex:1;min-width:110px;">
            🏹 Recurve Bow · القوس
          </button>
        </div>
      </div>

      <div class="build-tab-row">
        <button id="bc-tab-build" type="button" class="build-tab-btn interactive ${this.activeBuildTab === 'build' ? 'active' : ''}">
          🧱 Build & Craft · البناء والصناعة
        </button>
        <button id="bc-tab-gear" type="button" class="build-tab-btn interactive ${this.activeBuildTab === 'gear' ? 'active' : ''}">
          ⚔️ Gear & Skills (${progress.skillPoints} SP) · الأسلحة والمهارات
        </button>
      </div>

      ${
        this.activeBuildTab === 'build'
          ? `
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
          <button id="bc-quick-house-btn" type="button" class="modal-btn interactive" style="flex:1;min-width:200px;padding:0.6rem 1rem;font-size:0.84rem;">
            🏠 Build Furnished Minecraft House · بناء منزل كامل
          </button>
          <button id="bc-toggle-mode-btn" type="button" class="modal-btn secondary interactive" style="flex:1;min-width:170px;padding:0.6rem 1rem;font-size:0.84rem;border-color:${progress.buildMode ? '#38bdf8' : 'rgba(255,255,255,0.25)'};color:${progress.buildMode ? '#38bdf8' : '#ffffff'};">
            ${progress.buildMode ? '🔨 Build Mode: ON (Tap to Exit)' : '🔨 Enable Free Build Mode [B]'}
          </button>
        </div>

        <div style="font-size:0.78rem;font-weight:800;color:#80ffea;margin-bottom:6px;">
          INVENTORY & RESOURCES · المخزون والموارد
        </div>
        <div class="build-res-grid">
          ${resItems
            .map(
              ([label, count]) => `
            <div class="build-res-pill"><span>${label}</span><strong style="color:#fee440;">${count}</strong></div>
          `
            )
            .join('')}
        </div>

        <div style="font-size:0.78rem;font-weight:800;color:#38bdf8;margin-bottom:6px;">
          SELECT BUILDING BLOCK OR FURNITURE · اختر مكعب البناء أو الأثاث
        </div>
        <div class="build-block-grid">
          ${blockKinds
            .map((kind) => {
              const key = progress.getBlockInventoryKey(kind);
              const count = inv[key];
              const selected = progress.buildMode && progress.activeBlockKind === kind;
              return `
                <button type="button" class="build-block-btn interactive ${selected ? 'selected' : ''}" data-kind="${kind}">
                  <span style="font-weight:800;color:#ffffff;">${VOXEL_LABELS[kind].en}</span>
                  <span style="font-size:0.7rem;color:#94d2bd;">${VOXEL_LABELS[kind].ar} · x${count}</span>
                </button>
              `;
            })
            .join('')}
        </div>

        <div style="font-size:0.78rem;font-weight:800;color:#fee440;margin-bottom:6px;">
          CRAFT WALLS, ROOFS, FURNITURE & RATIONS · صناعة البناء والمؤن
        </div>
        <div style="display:flex;flex-direction:column;gap:7px;">
          ${buildRecipes
            .map((r) => {
              const can = progress.canCraft(r);
              const costStr = Object.entries(r.costs)
                .map(([k, v]) => `${v} ${k}`)
                .join(' + ');
              return `
                <div class="build-recipe-row">
                  <div>
                    <div style="font-weight:800;font-size:0.82rem;color:#ffffff;">${r.nameEn} · ${r.nameAr}</div>
                    <div style="font-size:0.72rem;color:#94a3b8;">Cost: ${costStr} — ${r.desc}</div>
                  </div>
                  <button type="button" class="build-craft-btn interactive" data-recipe="${r.id}" ${can ? '' : 'disabled'}>Craft</button>
                </div>
              `;
            })
            .join('')}
        </div>
      `
          : `
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px;margin-bottom:12px;">
          <div style="background:rgba(0,0,0,0.36);border:1px solid rgba(56,189,248,0.3);border-radius:12px;padding:10px;">
            <div style="font-size:0.74rem;font-weight:800;color:#38bdf8;margin-bottom:6px;">EQUIPPED GEAR · العتاد الحالي</div>
            <div style="font-size:0.84rem;color:#f8fafc;line-height:1.6;">
              <div>🗡️ Weapon: <b style="color:#38bdf8;">${wStats.name}</b> <span style="color:#fee440;">(${wStats.damage + progress.statRanks.strength * 8} DMG)</span></div>
              ${nextWeapon ? `<div style="font-size:0.72rem;color:#94a3b8;">Next Tier: ${nextWeapon.name} (${nextWeapon.damage} base DMG)</div>` : `<div style="font-size:0.72rem;color:#34d399;">✦ Max Weapon Tier Reached</div>`}
              <div style="margin-top:4px;">🛡️ Armor: <b style="color:#c084fc;">${aStats.name}</b> <span style="color:#fee440;">(${Math.round((aStats.defense + progress.statRanks.bastion * 0.04) * 100)}% DEF)</span></div>
              ${nextArmor ? `<div style="font-size:0.72rem;color:#94a3b8;">Next Tier: ${nextArmor.name} (${Math.round(nextArmor.defense * 100)}% base DEF)</div>` : `<div style="font-size:0.72rem;color:#34d399;">✦ Max Armor Tier Reached</div>`}
              <div style="margin-top:6px;font-size:0.75rem;color:#a5d8ea;">⭐ Level ${progress.level} · XP ${progress.xp}/${progress.xpToNext}</div>
            </div>
          </div>

          <div style="background:rgba(0,0,0,0.36);border:1px solid rgba(254,228,64,0.35);border-radius:12px;padding:10px;">
            <div style="font-size:0.74rem;font-weight:800;color:#fee440;margin-bottom:6px;">
              HERO SKILL UPGRADES (${progress.skillPoints} SP) · تطوير القدرات
            </div>
            <div style="display:flex;flex-direction:column;gap:5px;">
              ${statDefs
                .map(
                  (s) => `
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;background:rgba(255,255,255,0.04);padding:4px 8px;border-radius:7px;font-size:0.76rem;">
                  <span><b style="color:#fff;">${s.label}</b> <span style="color:#94a3b8;">(${s.ar})</span> <b style="color:#fee440;">[Lv.${progress.statRanks[s.key]}]</b></span>
                  <button type="button" class="build-craft-btn build-stat-up-btn interactive" data-stat="${s.key}" ${progress.skillPoints <= 0 ? 'disabled' : ''}>+1</button>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>

        <div style="font-size:0.78rem;font-weight:800;color:#c084fc;margin-bottom:6px;">
          FORGE WEAPONS & ARMOR TIERS · حدادة الأسلحة والدروع
        </div>
        <div style="display:flex;flex-direction:column;gap:7px;">
          ${gearRecipes
            .map((r) => {
              const can = progress.canCraft(r);
              const costStr = Object.entries(r.costs)
                .map(([k, v]) => `${v} ${k}`)
                .join(' + ');
              return `
                <div class="build-recipe-row">
                  <div>
                    <div style="font-weight:800;font-size:0.82rem;color:#ffffff;">${r.nameEn} · ${r.nameAr}</div>
                    <div style="font-size:0.72rem;color:#94a3b8;">Cost: ${costStr} — ${r.desc}</div>
                  </div>
                  <button type="button" class="build-craft-btn interactive" data-recipe="${r.id}" ${can ? '' : 'disabled'}>Forge</button>
                </div>
              `;
            })
            .join('')}
        </div>
      `
      }
    `;

    this.buildCraftBody.querySelectorAll('.bc-weapon-pick').forEach((btn) => {
      btn.addEventListener('click', () => {
        const w = btn.getAttribute('data-weapon') as WeaponType | null;
        if (w) {
          this.callbacks.onSelectWeapon?.(w);
          this.refreshBuildCraftModal(progress);
        }
      });
    });

    document.getElementById('bc-tab-build')?.addEventListener('click', () => {
      this.activeBuildTab = 'build';
      this.refreshBuildCraftModal(progress);
    });
    document.getElementById('bc-tab-gear')?.addEventListener('click', () => {
      this.activeBuildTab = 'gear';
      this.refreshBuildCraftModal(progress);
    });

    document.getElementById('bc-quick-house-btn')?.addEventListener('click', () => {
      this.buildCraftCallbacks?.onQuickBuildHouse();
      this.closeBuildCraftModal();
    });
    document.getElementById('bc-toggle-mode-btn')?.addEventListener('click', () => {
      this.buildCraftCallbacks?.onToggleBuildMode();
      this.refreshBuildCraftModal(progress);
    });
    this.buildCraftBody.querySelectorAll('.build-block-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const kind = btn.getAttribute('data-kind') as VoxelBlockKind;
        if (kind) {
          this.buildCraftCallbacks?.onSelectBlock(kind);
          this.closeBuildCraftModal();
        }
      });
    });
    this.buildCraftBody.querySelectorAll('.build-craft-btn[data-recipe]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const rid = btn.getAttribute('data-recipe');
        const recipe = CRAFT_RECIPES.find((r) => r.id === rid);
        if (recipe) {
          this.buildCraftCallbacks?.onCraft(recipe);
          this.refreshBuildCraftModal(progress);
        }
      });
    });
    this.buildCraftBody.querySelectorAll('.build-stat-up-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const stat = btn.getAttribute('data-stat') as keyof DarkRealmProgress['statRanks'] | null;
        if (stat && this.buildCraftCallbacks?.onUpgradeStat) {
          this.buildCraftCallbacks.onUpgradeStat(stat);
          this.refreshBuildCraftModal(progress);
        }
      });
    });
  }

  public updateCameraModeButton(isFirstPerson: boolean): void {
    if (this.cameraModeLabelEl) {
      this.cameraModeLabelEl.textContent = isFirstPerson ? '1P' : '3P';
    }
    if (this.cameraModeBtn) {
      this.cameraModeBtn.style.borderColor = isFirstPerson
        ? 'rgba(0, 245, 212, 0.85)'
        : 'rgba(254, 228, 64, 0.65)';
      this.cameraModeBtn.style.color = isFirstPerson ? '#00f5d4' : '#fee440';
    }
  }

  public updateWeaponHud(state: WeaponHudState): void {
    this.currentWeaponState = state;
    const key = `${state.weapon}|${state.ammoInMag}/${state.magSize}|${state.isReloading ? Math.round(state.reloadProgress * 100) : 0}|${Math.round(state.bowDraw * 100)}|${state.isBlocking ? 1 : 0}|${state.isAiming ? 1 : 0}|${state.arrowsCount}`;
    if (key === this.lastWeaponHudKey) return;
    this.lastWeaponHudKey = key;

    for (let i = 0; i < this.weaponSwitchBtns.length; i++) {
      const btn = this.weaponSwitchBtns[i];
      btn.classList.toggle('active', btn.dataset.weapon === state.weapon);
    }

    if (this.weaponAmmoBadgeEl) {
      if (state.weapon === 'pistol') {
        this.weaponAmmoBadgeEl.textContent = state.isReloading
          ? `RELOADING ${Math.round(state.reloadProgress * 100)}%`
          : `${state.ammoInMag} / ${state.magSize} 🔫`;
      } else if (state.weapon === 'bow') {
        this.weaponAmmoBadgeEl.textContent = `🏹 ${state.arrowsCount}`;
      } else {
        this.weaponAmmoBadgeEl.textContent = state.isBlocking ? '🛡️ BLOCKING' : 'RMB Block';
      }
    }

    if (this.weaponAimBtn) {
      const isSecondaryActive = state.weapon === 'sword' ? state.isBlocking : state.isAiming;
      this.weaponAimBtn.textContent = state.weapon === 'sword' ? '🛡️ Block' : '🎯 Aim';
      this.weaponAimBtn.classList.toggle('active', isSecondaryActive);
    }

    if (this.weaponReloadBtn) {
      this.weaponReloadBtn.style.display =
        state.weapon === 'pistol' && !state.isReloading && state.ammoInMag < state.magSize
          ? 'inline-block'
          : 'none';
    }

    if (this.bowDrawMeterEl && this.bowDrawMeterFillEl) {
      const showMeter = state.weapon === 'bow' && state.bowDraw > 0.01;
      this.bowDrawMeterEl.style.display = showMeter ? 'block' : 'none';
      if (showMeter) {
        this.bowDrawMeterFillEl.style.width = `${Math.round(state.bowDraw * 100)}%`;
      }
    }
  }

  public setUnderwaterEffect(active: boolean, isDarkRealm: boolean): void {
    if (!this.underwaterOverlay) return;
    this.underwaterOverlay.classList.toggle('active', active);
    this.underwaterOverlay.classList.toggle('dark-water', active && isDarkRealm);
  }

  public closeBuildCraftModal(): void {
    this.buildCraftModal?.classList.remove('open');
    this.syncModalOpenState();
  }

  /**
   * Opens the cinematic story narrative dialog
   */
  public openStoryNarrativeModal(event: NarrativeStoryEvent): void {
    if (!this.storyNarrativeModal) return;

    if (this.storyNarrativeBadge) {
      this.storyNarrativeBadge.textContent = `${event.badgeAr} · ${event.badgeEn}`;
    }
    if (this.storyNarrativeTitleAr) {
      this.storyNarrativeTitleAr.textContent = event.titleAr;
    }
    if (this.storyNarrativeTitleEn) {
      this.storyNarrativeTitleEn.textContent = event.titleEn;
    }
    if (this.storyNarrativeContentAr) {
      this.storyNarrativeContentAr.textContent = event.contentAr;
    }
    if (this.storyNarrativeContentEn) {
      this.storyNarrativeContentEn.textContent = event.contentEn;
    }
    if (this.storyNarrativeQuoteAr) {
      this.storyNarrativeQuoteAr.textContent = event.quoteAr || '«هذا العالم يحفظ كل خطوة تخطوها.»';
    }

    this.resetAllTouchStates();
    this.storyNarrativeModal.classList.add('open');
    this.syncModalOpenState();
  }

  public closeStoryNarrativeModal(): void {
    if (this.storyNarrativeModal) {
      this.storyNarrativeModal.classList.remove('open');
    }
    this.syncModalOpenState();
  }

  /**
   * Opens the Quest & Story Journal Modal
   */
  public openQuestLogModal(questSystem: QuestSystem): void {
    if (!this.questLogModal) return;
    this.resetAllTouchStates();
    this.renderQuestLog(questSystem);
    this.questLogModal.classList.add('open');
    this.syncModalOpenState();
  }

  public closeQuestLogModal(): void {
    if (this.questLogModal) {
      this.questLogModal.classList.remove('open');
    }
    this.syncModalOpenState();
  }

  /**
   * Renders all 5 objectives and chapters inside the Quest Log Journal
   */
  public renderQuestLog(questSystem: QuestSystem): void {
    if (!this.questLogList) return;

    const quest = questSystem.getActiveQuest();
    const completedCount = quest.objectives.filter((o) => o.isCompleted).length;
    const arabicNumerals = ['١', '٢', '٣', '٤', '٥'];

    const progressBadge = document.getElementById('quest-log-progress-badge');
    if (progressBadge) {
      const curAr = arabicNumerals[completedCount] || `${completedCount}`;
      const totalAr = arabicNumerals[quest.objectives.length - 1] || `${quest.objectives.length}`;
      progressBadge.textContent = `${curAr} / ${totalAr} مكتمل`;
    }

    this.questLogList.innerHTML = quest.objectives
      .map((obj, idx) => {
        const stepNumAr = arabicNumerals[idx] || `${idx + 1}`;
        const isCurrent = obj.isUnlocked && !obj.isCompleted;
        const statusClass = obj.isCompleted ? 'completed' : isCurrent ? 'active' : 'locked';

        const iconSymbol = obj.isCompleted ? '✓' : isCurrent ? '✦' : '🔒';
        const iconClass = obj.isCompleted ? 'done' : isCurrent ? 'current' : 'lock';

        let progressLabel = '';
        if (obj.isCompleted) {
          progressLabel = '<span style="color: #00f5d4; font-weight: 800; font-size: 0.78rem;">مكتمل ✓ Completed</span>';
        } else if (isCurrent) {
          if (obj.targetCount > 1) {
            const unit = obj.id === 'explore_island' ? 'm' : '';
            progressLabel = `<span style="color: #fee440; font-weight: 800; font-size: 0.78rem;">قيد الإنجاز (${obj.currentCount}/${obj.targetCount}${unit})</span>`;
          } else {
            progressLabel = '<span style="color: #fee440; font-weight: 800; font-size: 0.78rem;">الهدف النشط الحالي ✦ Active</span>';
          }
        } else {
          progressLabel = '<span style="color: #728994; font-size: 0.75rem;">مقفل · يفتح بعد إكمال السابق 🔒</span>';
        }

        return `
          <div class="quest-checklist-item ${statusClass}">
            <div class="quest-status-icon ${iconClass}">${iconSymbol}</div>
            <div style="flex: 1; text-align: right; direction: rtl;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                <div style="font-family: 'Amiri', serif; font-size: 1.25rem; font-weight: 700; color: ${obj.isCompleted ? '#00f5d4' : isCurrent ? '#ffffff' : '#728994'};">
                  ${stepNumAr}. ${obj.titleAr}
                </div>
                ${progressLabel}
              </div>
              <div style="font-size: 0.8rem; color: #80ffea; margin-bottom: 0.35rem; direction: ltr; text-align: left;">
                ${obj.titleEn}
              </div>
              <div style="font-size: 0.85rem; color: ${isCurrent ? '#e4f7f4' : '#94a7b0'}; line-height: 1.45;">
                ${obj.descAr}
              </div>
              ${
                isCurrent
                  ? `<div style="font-size: 0.78rem; color: #fee440; background: rgba(254, 228, 64, 0.1); border-right: 2px solid #fee440; padding: 0.3rem 0.6rem; border-radius: 4px; margin-top: 0.4rem;">
                      📍 إرشاد: ${obj.hintAr}
                    </div>`
                  : ''
              }
            </div>
          </div>
        `;
      })
      .join('');
  }
}

