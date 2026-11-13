/**
 * ECHO – DARK FANTASY REALM
 * Complete Dark Fantasy HUD (Matching Reference Screenshot Layout),
 * Circular Minimap, 8-Slot Interactive Hotbar, Inventory/Crafting/Skill Upgrade Modal,
 * Interactive 2000x2000 World Map & Fast Travel, 122-Quest Codex, and Victory Screen.
 */

import {
  CRAFT_RECIPES,
  CraftRecipe,
  DarkQuest,
  DarkRealmProgress,
  HotbarSlotKind,
  QuestCategory,
  VoxelBlockKind,
  WEAPON_TIERS,
  ARMOR_TIERS,
} from './DarkRealmProgress.ts';
import { DarkLandmarkZone } from './DarkRealmTerrain.ts';
import { DarkWeatherType, WEATHER_LABELS } from './DarkRealmAtmosphere.ts';
import { CompanionAIMode } from './DarkRealmEntities.ts';
import { VOXEL_LABELS } from './VoxelBuilder.ts';

export interface DarkRealmUICallbacks {
  onSelectSlot: (idx: number) => void;
  onSelectBlockKind: (kind: VoxelBlockKind) => void;
  onToggleBuildMode: () => void;
  onCraftRecipe: (recipe: CraftRecipe) => void;
  onUpgradeStat: (stat: keyof DarkRealmProgress['statRanks']) => void;
  onBuildStarterHouse: () => void;
  onCycleCompanionMode: () => void;
  onFastTravel: (landmark: DarkLandmarkZone) => void;
  onCycleWeather: () => void;
  onSetTimePreset: (t: number) => void;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  onCastFireball: () => void;
  onConsumeFood: () => void;
  onInteract: () => void;
  onReturnToIsland: () => void;
  onToast?: (msg: string) => void;
}

const SLOT_DEFS: Array<{ kind: HotbarSlotKind; label: string; key: string }> = [
  { kind: 'sword', label: 'Sword', key: '1' },
  { kind: 'axe', label: 'Axe', key: '2' },
  { kind: 'pickaxe', label: 'Pickaxe', key: '3' },
  { kind: 'bow', label: 'Bow', key: '4' },
  { kind: 'wood', label: 'Planks', key: '5' },
  { kind: 'stone', label: 'Stone', key: '6' },
  { kind: 'food', label: 'Food', key: '7' },
  { kind: 'more', label: 'More', key: '8' },
];

export class DarkRealmUI {
  private root: HTMLElement;
  private container!: HTMLElement;
  private progress: DarkRealmProgress;
  private callbacks: DarkRealmUICallbacks;

  private activeModal: 'none' | 'inventory' | 'map' | 'quests' | 'victory' = 'none';
  private activeQuestTab: QuestCategory = 'main';
  private isMoreMenuOpen = false;
  private toastTimeout: number | null = null;

  // Cached DOM Elements
  private hpFill!: HTMLElement;
  private hpText!: HTMLElement;
  private manaFill!: HTMLElement;
  private manaText!: HTMLElement;
  private xpFill!: HTMLElement;
  private levelText!: HTMLElement;
  private mainQuestText!: HTMLElement;
  private newQuestText!: HTMLElement;
  private envBadge!: HTMLElement;
  private compModeBtn!: HTMLElement;
  private bossBar!: HTMLElement;
  private bossName!: HTMLElement;
  private bossFill!: HTMLElement;
  private interactPill!: HTMLElement;
  private buildBadge!: HTMLElement;
  private minimapCanvas!: HTMLCanvasElement;
  private minimapCtx!: CanvasRenderingContext2D;
  private morePopup!: HTMLElement;
  private toastEl!: HTMLElement;

  // Modals
  private invModal!: HTMLElement;
  private mapModal!: HTMLElement;
  private questModal!: HTMLElement;
  private victoryModal!: HTMLElement;

  constructor(progress: DarkRealmProgress, callbacks: DarkRealmUICallbacks) {
    this.progress = progress;
    this.callbacks = callbacks;
    this.root = document.getElementById('ui-root') || document.body;

    this.injectStyles();
    this.buildDOM();
    this.refreshHUD();
  }

  private injectStyles(): void {
    if (document.getElementById('dark-realm-styles')) return;
    const style = document.createElement('style');
    style.id = 'dark-realm-styles';
    style.textContent = `
      #dark-realm-hud {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 45;
        display: none;
        font-family: 'Cinzel', 'Cairo', system-ui, sans-serif;
        color: #f8fafc;
        user-select: none;
      }
      #dark-realm-hud.active { display: block; }
      #dark-realm-hud .dr-interactive { pointer-events: auto; }

      .dr-portrait-cluster {
        position: absolute;
        top: 14px;
        left: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-width: 295px;
      }
      .dr-hero-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .dr-avatar-ring {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        border: 2.5px solid #cbd5e1;
        background: radial-gradient(circle, #1e293b 0%, #090d16 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.75);
        flex-shrink: 0;
      }
      .dr-bars-col {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 175px;
      }
      .dr-lv-line {
        font-weight: 800;
        font-size: 0.95rem;
        text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .dr-bar-track {
        height: 16px;
        background: rgba(10, 12, 20, 0.88);
        border: 1.5px solid rgba(255, 255, 255, 0.25);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
      }
      .dr-bar-fill {
        height: 100%;
        transition: width 0.18s ease;
      }
      .dr-bar-label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.72rem;
        font-weight: 800;
        text-shadow: 0 1px 3px #000;
      }
      .dr-xp-track {
        height: 5px;
        background: rgba(15, 23, 42, 0.9);
        border-radius: 3px;
        overflow: hidden;
      }
      .dr-xp-fill {
        height: 100%;
        background: linear-gradient(90deg, #a855f7, #ec4899);
        width: 0%;
      }
      .dr-quest-box {
        background: rgba(8, 12, 22, 0.82);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 8px;
        padding: 8px 11px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.55);
      }
      .dr-quest-header {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: 800;
        font-size: 0.84rem;
        color: #fbbf24;
      }
      .dr-quest-sub {
        font-size: 0.78rem;
        color: #e2e8f0;
        margin-top: 2px;
        line-height: 1.3;
      }
      .dr-pill-row {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      .dr-mini-pill {
        background: rgba(12, 16, 28, 0.86);
        border: 1px solid rgba(192, 132, 252, 0.35);
        color: #e9d5ff;
        padding: 4px 9px;
        border-radius: 6px;
        font-size: 0.74rem;
        font-weight: 700;
        cursor: pointer;
      }
      .dr-mini-pill:hover { background: rgba(88, 28, 135, 0.65); }

      /* Top-Right Circular Minimap */
      .dr-minimap-cluster {
        position: absolute;
        top: 14px;
        right: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
      }
      .dr-minimap-ring {
        position: relative;
        width: 136px;
        height: 136px;
        border-radius: 50%;
        border: 3px solid #94a3b8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.85), inset 0 0 18px rgba(0, 0, 0, 0.7);
        overflow: hidden;
        background: #0d1618;
      }
      .dr-compass-dir {
        position: absolute;
        font-size: 0.7rem;
        font-weight: 900;
        color: #f8fafc;
        text-shadow: 0 1px 3px #000;
        pointer-events: none;
      }
      .dr-top-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        justify-content: flex-end;
        max-width: 240px;
      }
      .dr-action-btn {
        background: rgba(12, 16, 28, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.22);
        color: #f8fafc;
        padding: 5px 9px;
        border-radius: 7px;
        font-size: 0.73rem;
        font-weight: 700;
        cursor: pointer;
      }
      .dr-action-btn:hover { border-color: #38bdf8; color: #38bdf8; }

      /* Boss Health Bar */
      #dr-boss-bar {
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        width: min(440px, 52vw);
        background: rgba(12, 8, 20, 0.9);
        border: 1.5px solid #f43f5e;
        border-radius: 8px;
        padding: 7px 12px;
        display: none;
        box-shadow: 0 0 24px rgba(244, 63, 94, 0.4);
      }
      #dr-boss-bar.visible { display: block; }

      /* Bottom-Left Keybind Hints */
      .dr-bottom-left {
        position: absolute;
        bottom: 14px;
        left: 16px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .dr-key-hint {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.84rem;
        font-weight: 700;
        text-shadow: 0 2px 4px #000;
      }
      .dr-kbd {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background: rgba(15, 23, 42, 0.9);
        border: 1.5px solid rgba(255, 255, 255, 0.42);
        border-radius: 5px;
        font-size: 0.76rem;
        font-weight: 900;
        color: #ffffff;
      }

      /* Bottom-Center 8-Slot Hotbar matching screenshot */
      .dr-hotbar-wrap {
        position: absolute;
        bottom: 14px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .dr-hotbar {
        display: flex;
        gap: 5px;
        padding: 6px;
        background: rgba(12, 16, 26, 0.88);
        border: 1.5px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        box-shadow: 0 8px 26px rgba(0, 0, 0, 0.8);
      }
      .dr-slot {
        width: 54px;
        height: 54px;
        background: rgba(24, 31, 48, 0.92);
        border: 2px solid rgba(148, 163, 184, 0.35);
        border-radius: 7px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.12s ease, border-color 0.12s ease;
      }
      .dr-slot:hover { transform: translateY(-2px); border-color: #93c5fd; }
      .dr-slot.active {
        border-color: #38bdf8;
        box-shadow: 0 0 14px rgba(56, 189, 248, 0.75);
        background: rgba(30, 58, 138, 0.45);
      }
      .dr-slot-key {
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: 0.62rem;
        color: #94a3b8;
        font-weight: 800;
      }
      .dr-slot-count {
        position: absolute;
        bottom: 2px;
        right: 4px;
        font-size: 0.72rem;
        font-weight: 900;
        color: #ffffff;
        text-shadow: 0 1px 3px #000;
      }

      /* More Blocks & Spells Popup */
      #dr-more-popup {
        display: none;
        background: rgba(10, 14, 24, 0.97);
        border: 1.5px solid #c084fc;
        border-radius: 10px;
        padding: 8px;
        gap: 6px;
        flex-wrap: wrap;
        max-width: 390px;
        justify-content: center;
      }
      #dr-more-popup.open { display: flex; }

      /* Bottom-Right New Quest! Card & Combat Touch Action Pills */
      .dr-bottom-right {
        position: absolute;
        bottom: 14px;
        right: 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
      }
      .dr-new-quest-card {
        background: rgba(10, 14, 24, 0.88);
        border: 1.5px solid rgba(168, 85, 247, 0.55);
        border-radius: 9px;
        padding: 9px 14px;
        min-width: 215px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.75);
      }
      .dr-combat-pills {
        display: flex;
        gap: 6px;
      }
      .dr-combat-btn {
        background: rgba(17, 24, 39, 0.92);
        border: 1.5px solid rgba(56, 189, 248, 0.55);
        color: #f8fafc;
        padding: 7px 11px;
        border-radius: 8px;
        font-size: 0.76rem;
        font-weight: 800;
        cursor: pointer;
      }
      .dr-combat-btn:hover { background: rgba(56, 189, 248, 0.22); }

      /* Modals (Opaque solid backdrop — no backdrop-filter blur) */
      .dr-modal {
        position: fixed;
        inset: 0;
        background: rgba(5, 8, 16, 0.88);
        z-index: 90;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 16px;
        pointer-events: auto;
      }
      .dr-modal.open { display: flex; }
      .dr-modal-card {
        background: #0d1322;
        border: 1.5px solid rgba(168, 85, 247, 0.55);
        border-radius: 14px;
        width: min(860px, 95vw);
        max-height: 88vh;
        overflow-y: auto;
        padding: 18px 22px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.9);
      }
      .dr-modal-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        padding-bottom: 10px;
        margin-bottom: 14px;
      }
      .dr-close-btn {
        background: #1e293b;
        border: 1px solid #475569;
        color: #f8fafc;
        padding: 6px 14px;
        border-radius: 7px;
        cursor: pointer;
        font-weight: 700;
      }
      .dr-grid-2 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 12px;
      }
      .dr-panel-box {
        background: #141c2f;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 12px;
      }
      .dr-btn-primary {
        background: linear-gradient(135deg, #6366f1, #a855f7);
        border: none;
        color: #ffffff;
        padding: 7px 12px;
        border-radius: 7px;
        font-weight: 800;
        cursor: pointer;
        font-size: 0.8rem;
      }
      .dr-btn-primary:disabled { opacity: 0.35; cursor: not-allowed; }
      #dr-toast {
        position: fixed;
        top: 84px;
        left: 50%;
        transform: translateX(-50%);
        background: #12172a;
        border: 1.5px solid #c084fc;
        color: #f8fafc;
        padding: 8px 18px;
        border-radius: 999px;
        font-weight: 800;
        font-size: 0.86rem;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        z-index: 95;
      }
      #dr-toast.show { opacity: 1; }

      @media (max-width: 760px) {
        .dr-slot { width: 42px; height: 42px; }
        .dr-minimap-ring { width: 108px; height: 108px; }
        .dr-bottom-left { display: none; }
      }
    `;
    document.head.appendChild(style);
  }

  private getSlotSVG(kind: HotbarSlotKind): string {
    switch (kind) {
      case 'sword':
        return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M19 3L9 13l-2-2-2 2 2 2-3 3 2 2 3-3 2 2 2-2-2-2L21 5V3h-2z" fill="#38bdf8" stroke="#e0f2fe" stroke-width="1.2"/></svg>`;
      case 'pickaxe':
        return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M14 4c3 0 6 2 7 5l-2 1c-1-2-3-3-5-3l-9 9-2-2 9-9c0-1 1-1 2-1z" fill="#cbd5e1"/><path d="M5 19l8-8" stroke="#92400e" stroke-width="2.5"/></svg>`;
      case 'axe':
        return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M13 3l7 5-4 4-3-3-8 10-2-2 8-10-1-3 3-1z" fill="#e2e8f0" stroke="#78350f" stroke-width="1.2"/></svg>`;
      case 'bow':
        return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M16 3c3 4 3 14 0 18" stroke="#b45309" stroke-width="2.5" stroke-linecap="round"/><line x1="16" y1="3" x2="16" y2="21" stroke="#cbd5e1" stroke-width="1"/><line x1="4" y1="12" x2="19" y2="12" stroke="#4ade80" stroke-width="2"/></svg>`;
      case 'wood':
        return `<div style="width:28px;height:28px;background:#7b5332;border:2px solid #3c2614;border-radius:3px;box-shadow:inset 0 4px 0 #9c6b43;"></div>`;
      case 'stone':
        return `<div style="width:28px;height:28px;background:#4a505d;border:2px solid #1b1e24;border-radius:3px;box-shadow:inset 0 4px 0 #64748b;"></div>`;
      case 'food':
        return `<svg width="30" height="30" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="8" ry="6" fill="#dc2626" stroke="#fca5a5" stroke-width="1.5"/><circle cx="10" cy="11" r="2.2" fill="#fde68a"/></svg>`;
      case 'more':
        return `<span style="font-size:1.3rem;font-weight:900;letter-spacing:2px;">•••</span>`;
    }
  }

  private buildDOM(): void {
    this.container = document.createElement('div');
    this.container.id = 'dark-realm-hud';

    const hotbarHtml = SLOT_DEFS.map(
      (s, idx) => `
      <div class="dr-slot dr-interactive ${idx === 0 ? 'active' : ''}" data-slot="${idx}" title="${s.label} [${s.key}]">
        <span class="dr-slot-key">${s.key}</span>
        ${this.getSlotSVG(s.kind)}
        <span class="dr-slot-count" id="dr-slot-count-${idx}"></span>
      </div>
    `
    ).join('');

    this.container.innerHTML = `
      <!-- Top-Left Hero Portrait & Quest -->
      <div class="dr-portrait-cluster">
        <div class="dr-hero-row">
          <div class="dr-avatar-ring">
            <svg width="40" height="40" viewBox="0 0 32 32">
              <rect x="9" y="4" width="14" height="12" rx="2" fill="#e2b89b"/>
              <rect x="9" y="3" width="14" height="5" fill="#18151a"/>
              <circle cx="13" cy="10" r="1.3" fill="#0f172a"/>
              <circle cx="19" cy="10" r="1.3" fill="#0f172a"/>
              <rect x="8" y="16" width="16" height="12" rx="2" fill="#1d4ed8"/>
              <rect x="11" y="16" width="10" height="12" fill="#e2e8f0"/>
            </svg>
          </div>
          <div class="dr-bars-col">
            <div class="dr-lv-line">
              <span id="dr-lv-text">Lv. 1</span>
              <span id="dr-build-badge" style="display:none;color:#38bdf8;font-size:0.75rem;">🔨 BUILD MODE</span>
            </div>
            <div class="dr-bar-track">
              <div id="dr-hp-fill" class="dr-bar-fill" style="width:100%;background:linear-gradient(90deg,#b91c1c,#ef4444);"></div>
              <div id="dr-hp-text" class="dr-bar-label">100 / 100</div>
            </div>
            <div class="dr-bar-track" style="height:14px;">
              <div id="dr-mana-fill" class="dr-bar-fill" style="width:100%;background:linear-gradient(90deg,#1d4ed8,#3b82f6);"></div>
              <div id="dr-mana-text" class="dr-bar-label">50 / 50</div>
            </div>
            <div class="dr-xp-track"><div id="dr-xp-fill" class="dr-xp-fill"></div></div>
          </div>
        </div>

        <div class="dr-quest-box">
          <div class="dr-quest-header">◆ Main Quest:</div>
          <div id="dr-main-quest-text" class="dr-quest-sub">Explore the new world (0 / 1)</div>
        </div>

        <div class="dr-pill-row">
          <button id="dr-env-badge" class="dr-mini-pill dr-interactive">🌙 Moonlit Night</button>
          <button id="dr-comp-mode-btn" class="dr-mini-pill dr-interactive">⚔️ Companions: Follow & Fight</button>
        </div>
      </div>

      <!-- Top-Center Boss HP Bar -->
      <div id="dr-boss-bar">
        <div id="dr-boss-name" style="font-size:0.84rem;font-weight:900;text-align:center;color:#fda4af;margin-bottom:4px;">MALAKOR</div>
        <div class="dr-bar-track" style="height:14px;">
          <div id="dr-boss-fill" class="dr-bar-fill" style="width:100%;background:linear-gradient(90deg,#9f1239,#f43f5e);"></div>
        </div>
      </div>

      <!-- Top-Right Circular Minimap & Quick Buttons -->
      <div class="dr-minimap-cluster">
        <div class="dr-minimap-ring">
          <canvas id="dr-minimap-canvas" width="136" height="136"></canvas>
          <span class="dr-compass-dir" style="top:3px;left:50%;transform:translateX(-50%);">N</span>
          <span class="dr-compass-dir" style="bottom:3px;left:50%;transform:translateX(-50%);">S</span>
          <span class="dr-compass-dir" style="left:5px;top:50%;transform:translateY(-50%);">W</span>
          <span class="dr-compass-dir" style="right:5px;top:50%;transform:translateY(-50%);">E</span>
        </div>
        <div class="dr-top-actions">
          <button id="dr-btn-map" class="dr-action-btn dr-interactive">🗺️ [M] Map</button>
          <button id="dr-btn-inv" class="dr-action-btn dr-interactive">🎒 [I] Bag/Craft</button>
          <button id="dr-btn-quests" class="dr-action-btn dr-interactive">📜 [J] 122 Quests</button>
          <button id="dr-btn-island" class="dr-action-btn dr-interactive" style="border-color:#00f5d4;color:#5eead4;">⛩️ Return Island</button>
        </div>
      </div>

      <!-- Bottom-Left Classic RPG Keybind Hints -->
      <div class="dr-bottom-left">
        <div class="dr-key-hint"><span class="dr-kbd">B</span> Build / Place</div>
        <div class="dr-key-hint"><span class="dr-kbd">I</span> Inventory & Craft</div>
        <div class="dr-key-hint"><span class="dr-kbd">M</span> Map & Fast Travel</div>
        <div class="dr-key-hint"><span class="dr-kbd">G</span> Fireball · <span class="dr-kbd">R</span> Nova</div>
        <div class="dr-key-hint"><span class="dr-kbd">H</span> Eat Food / Heal</div>
      </div>

      <!-- Bottom-Center 8-Slot Hotbar -->
      <div class="dr-hotbar-wrap">
        <div id="dr-more-popup" class="dr-interactive"></div>
        <div class="dr-hotbar">
          ${hotbarHtml}
        </div>
      </div>

      <!-- Bottom-Right New Quest! Card & Combat Action Buttons -->
      <div class="dr-bottom-right">
        <div id="dr-interact-pill" class="dr-mini-pill dr-interactive" style="display:none;border-color:#fbbf24;color:#fde68a;font-size:0.86rem;padding:7px 14px;">
          [E] Open Treasure Chest
        </div>
        <div class="dr-combat-pills dr-interactive">
          <button id="dr-act-primary" class="dr-combat-btn">⚔️ Attack / Use</button>
          <button id="dr-act-spell" class="dr-combat-btn" style="border-color:#c084fc;">🔥 Spell [G]</button>
          <button id="dr-act-build" class="dr-combat-btn" style="border-color:#fbbf24;">🔨 Build [B]</button>
          <button id="dr-act-break" class="dr-combat-btn" style="border-color:#f87171;">⛏️ Break</button>
        </div>
        <div class="dr-new-quest-card">
          <div style="display:flex;align-items:center;gap:6px;font-weight:900;color:#e9d5ff;font-size:0.86rem;">
            <span style="color:#a855f7;">◆</span> New Quest!
          </div>
          <div id="dr-new-quest-text" style="font-size:0.78rem;color:#cbd5e1;margin-top:3px;">
            Defeat the Dark Boss (0 / 1)
          </div>
        </div>
      </div>

      <div id="dr-toast"></div>
    `;

    this.root.appendChild(this.container);

    // Modals injected into root so they center reliably
    const modalsHtml = document.createElement('div');
    modalsHtml.innerHTML = `
      <!-- Inventory, Crafting, Gear & Skill Upgrades Modal -->
      <div id="dr-inv-modal" class="dr-modal">
        <div class="dr-modal-card">
          <div class="dr-modal-head">
            <div>
              <div style="font-size:1.15rem;font-weight:900;color:#c084fc;">INVENTORY, CRAFTING & HERO UPGRADES</div>
              <div style="font-size:0.82rem;color:#94a3b8;">الحقيبة، التصنيع، ترقية الدروع والأسلحة، وبناء المنازل</div>
            </div>
            <button id="dr-inv-close" class="dr-close-btn">✕ Close [I / ESC]</button>
          </div>
          <div id="dr-inv-body"></div>
        </div>
      </div>

      <!-- World Map & Fast Travel Modal -->
      <div id="dr-map-modal" class="dr-modal">
        <div class="dr-modal-card">
          <div class="dr-modal-head">
            <div>
              <div style="font-size:1.15rem;font-weight:900;color:#38bdf8;">SHADOW REALM WORLD MAP (2000×2000)</div>
              <div style="font-size:0.82rem;color:#94a3b8;">خريطة العالم المفتوح والتنقل السريع والتحكم بالطقس والوقت</div>
            </div>
            <button id="dr-map-close" class="dr-close-btn">✕ Close [M / ESC]</button>
          </div>
          <div id="dr-map-body"></div>
        </div>
      </div>

      <!-- 122-Quest Codex Modal -->
      <div id="dr-quest-modal" class="dr-modal">
        <div class="dr-modal-card">
          <div class="dr-modal-head">
            <div>
              <div style="font-size:1.15rem;font-weight:900;color:#fbbf24;">CHRONICLES OF SHADOW · 122 QUESTS</div>
              <div style="font-size:0.82rem;color:#94a3b8;">سجل القصة والمهام والتحديات في عالم الظلال</div>
            </div>
            <button id="dr-quest-close" class="dr-close-btn">✕ Close [J / ESC]</button>
          </div>
          <div id="dr-quest-body"></div>
        </div>
      </div>

      <!-- Dark Boss Defeated Victory Modal -->
      <div id="dr-victory-modal" class="dr-modal">
        <div class="dr-modal-card" style="max-width:560px;text-align:center;border-color:#fbbf24;">
          <div style="font-size:2.4rem;">👑 ⚔️ 🌑</div>
          <h2 style="color:#fbbf24;margin:8px 0 4px;">MALAKOR VANQUISHED!</h2>
          <h3 style="color:#e9d5ff;margin:0 0 12px;">انتصار أسطوري · سقوط زعيم الظلام</h3>
          <p style="color:#cbd5e1;font-size:0.92rem;line-height:1.6;">
            You and your three companions conquered the Obsidian Castle and defeated Malakor, Lord of Eclipse! The Shadow Realm bows to your light. You may continue building & exploring or return to the Forgotten Island anytime.
          </p>
          <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap;">
            <button id="dr-victory-continue" class="dr-btn-primary">Continue Exploring · استمر باللعب</button>
            <button id="dr-victory-return" class="dr-close-btn" style="border-color:#00f5d4;color:#5eead4;">⛩️ Return to Original Island</button>
          </div>
        </div>
      </div>
    `;
    this.root.appendChild(modalsHtml);

    // Bind elements
    this.hpFill = document.getElementById('dr-hp-fill')!;
    this.hpText = document.getElementById('dr-hp-text')!;
    this.manaFill = document.getElementById('dr-mana-fill')!;
    this.manaText = document.getElementById('dr-mana-text')!;
    this.xpFill = document.getElementById('dr-xp-fill')!;
    this.levelText = document.getElementById('dr-lv-text')!;
    this.mainQuestText = document.getElementById('dr-main-quest-text')!;
    this.newQuestText = document.getElementById('dr-new-quest-text')!;
    this.envBadge = document.getElementById('dr-env-badge')!;
    this.compModeBtn = document.getElementById('dr-comp-mode-btn')!;
    this.bossBar = document.getElementById('dr-boss-bar')!;
    this.bossName = document.getElementById('dr-boss-name')!;
    this.bossFill = document.getElementById('dr-boss-fill')!;
    this.interactPill = document.getElementById('dr-interact-pill')!;
    this.buildBadge = document.getElementById('dr-build-badge')!;
    this.morePopup = document.getElementById('dr-more-popup')!;
    this.toastEl = document.getElementById('dr-toast')!;

    this.minimapCanvas = document.getElementById('dr-minimap-canvas') as HTMLCanvasElement;
    this.minimapCtx = this.minimapCanvas.getContext('2d')!;

    this.invModal = document.getElementById('dr-inv-modal')!;
    this.mapModal = document.getElementById('dr-map-modal')!;
    this.questModal = document.getElementById('dr-quest-modal')!;
    this.victoryModal = document.getElementById('dr-victory-modal')!;

    this.buildMorePopup();
    this.bindEvents();
  }

  private buildMorePopup(): void {
    const blocks: VoxelBlockKind[] = [
      'wood_plank',
      'cobblestone',
      'castle_brick',
      'glow_lantern',
      'glass',
      'roof_slate',
      'crystal_block',
    ];
    this.morePopup.innerHTML =
      blocks
        .map(
          (b) => `
      <button class="dr-action-btn dr-more-block-btn" data-block="${b}">
        🧱 ${VOXEL_LABELS[b].en}
      </button>
    `
        )
        .join('') +
      `<button id="dr-quick-cabin-btn" class="dr-btn-primary">🏠 Quick-Build Cabin</button>`;
  }

  private bindEvents(): void {
    this.container.querySelectorAll('.dr-slot').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(el.getAttribute('data-slot'));
        if (idx === 7) {
          this.isMoreMenuOpen = !this.isMoreMenuOpen;
          this.morePopup.classList.toggle('open', this.isMoreMenuOpen);
        } else {
          this.isMoreMenuOpen = false;
          this.morePopup.classList.remove('open');
          this.callbacks.onSelectSlot(idx);
        }
      });
    });

    this.morePopup.querySelectorAll('.dr-more-block-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const kind = btn.getAttribute('data-block') as VoxelBlockKind;
        this.callbacks.onSelectBlockKind(kind);
        this.isMoreMenuOpen = false;
        this.morePopup.classList.remove('open');
      });
    });

    document.getElementById('dr-quick-cabin-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.callbacks.onBuildStarterHouse();
      this.isMoreMenuOpen = false;
      this.morePopup.classList.remove('open');
    });

    document.getElementById('dr-btn-map')?.addEventListener('click', () => this.toggleModal('map'));
    document.getElementById('dr-btn-inv')?.addEventListener('click', () => this.toggleModal('inventory'));
    document.getElementById('dr-btn-quests')?.addEventListener('click', () => this.toggleModal('quests'));
    document.getElementById('dr-btn-island')?.addEventListener('click', () => this.callbacks.onReturnToIsland());

    document.getElementById('dr-env-badge')?.addEventListener('click', () => this.callbacks.onCycleWeather());
    document.getElementById('dr-comp-mode-btn')?.addEventListener('click', () => this.callbacks.onCycleCompanionMode());
    this.interactPill.addEventListener('click', () => this.callbacks.onInteract());

    document.getElementById('dr-act-primary')?.addEventListener('click', () => this.callbacks.onPrimaryAction());
    document.getElementById('dr-act-spell')?.addEventListener('click', () => this.callbacks.onCastFireball());
    document.getElementById('dr-act-build')?.addEventListener('click', () => this.callbacks.onToggleBuildMode());
    document.getElementById('dr-act-break')?.addEventListener('click', () => this.callbacks.onSecondaryAction());

    document.getElementById('dr-inv-close')?.addEventListener('click', () => this.closeModals());
    document.getElementById('dr-map-close')?.addEventListener('click', () => this.closeModals());
    document.getElementById('dr-quest-close')?.addEventListener('click', () => this.closeModals());
    document.getElementById('dr-victory-continue')?.addEventListener('click', () => this.closeModals());
    document.getElementById('dr-victory-return')?.addEventListener('click', () => {
      this.closeModals();
      this.callbacks.onReturnToIsland();
    });
  }

  public setVisible(visible: boolean): void {
    // Keep the second World 2 HUD permanently hidden so both worlds use ONE shared HUD
    this.container.classList.remove('active');
    if (!visible) this.closeModals();
  }

  public isAnyModalOpen(): boolean {
    return this.activeModal !== 'none';
  }

  public closeModals(): void {
    this.activeModal = 'none';
    this.invModal.classList.remove('open');
    this.mapModal.classList.remove('open');
    this.questModal.classList.remove('open');
    this.victoryModal.classList.remove('open');
  }

  public toggleModal(
    which: 'inventory' | 'map' | 'quests' | 'victory',
    landmarks?: DarkLandmarkZone[],
    playerPos?: { x: number; z: number },
    companions?: Array<{ x: number; z: number }>,
    weather?: DarkWeatherType
  ): void {
    if (this.activeModal === which) {
      this.closeModals();
      return;
    }
    this.closeModals();
    this.activeModal = which;
    if (which === 'inventory') {
      this.renderInventoryModal();
      this.invModal.classList.add('open');
    } else if (which === 'map') {
      this.renderMapModal(landmarks || [], playerPos || { x: 0, z: 92 }, companions || [], weather || 'CLEAR');
      this.mapModal.classList.add('open');
    } else if (which === 'quests') {
      this.renderQuestModal();
      this.questModal.classList.add('open');
    } else if (which === 'victory') {
      this.victoryModal.classList.add('open');
    }
  }

  public showToast(msg: string): void {
    this.callbacks.onToast?.(msg);
  }

  public updateEnvironmentLabel(phaseEn: string, weather: DarkWeatherType): void {
    const wLabel = WEATHER_LABELS[weather]?.en || weather;
    const icon = weather === 'RAIN' ? '🌧️' : weather === 'THUNDERSTORM' ? '⛈️' : weather === 'EMBERS' ? '🔥' : '🌙';
    this.envBadge.textContent = `${icon} ${phaseEn} · ${wLabel}`;
  }

  public updateCompanionModeLabel(mode: CompanionAIMode): void {
    if (mode === 'FOLLOW_FIGHT') this.compModeBtn.textContent = '⚔️ Companions: Follow & Fight';
    else if (mode === 'EXPLORE_GATHER') this.compModeBtn.textContent = '🪓 Companions: Explore & Gather';
    else this.compModeBtn.textContent = '🛡️ Companions: Guard Here';
  }

  public setBossBar(info: { nameEn: string; hp: number; maxHp: number } | null): void {
    if (!info) {
      this.bossBar.classList.remove('visible');
      return;
    }
    this.bossBar.classList.add('visible');
    this.bossName.textContent = `${info.nameEn} (${Math.ceil(info.hp)} / ${info.maxHp})`;
    this.bossFill.style.width = `${Math.max(0, (info.hp / info.maxHp) * 100)}%`;
  }

  public setInteractPrompt(label: string | null): void {
    if (!label) {
      this.interactPill.style.display = 'none';
    } else {
      this.interactPill.style.display = 'inline-block';
      this.interactPill.textContent = `[E] ${label}`;
    }
  }

  public refreshHUD(): void {
    const p = this.progress;
    this.levelText.textContent = `Lv. ${p.level}`;
    this.hpFill.style.width = `${Math.max(0, (p.hp / p.maxHp) * 100)}%`;
    this.hpText.textContent = `${Math.ceil(p.hp)}/${p.maxHp}`;
    this.manaFill.style.width = `${Math.max(0, (p.mana / p.maxMana) * 100)}%`;
    this.manaText.textContent = `${Math.floor(p.mana)}/${p.maxMana}`;
    this.xpFill.style.width = `${Math.min(100, (p.xp / p.xpToNext) * 100)}%`;
    this.buildBadge.style.display = p.buildMode ? 'inline' : 'none';

    const mainQ = p.getActiveMainQuest();
    this.mainQuestText.textContent = `${mainQ.titleEn} (${mainQ.progress}/${mainQ.target})`;

    const bossQ = p.getHighlightedNewQuest();
    this.newQuestText.textContent = `${bossQ.titleEn} (${bossQ.progress}/${bossQ.target})`;

    // Hotbar active slot + item counts matching screenshot (Wood=64, Stone=32, Food=16...)
    this.container.querySelectorAll('.dr-slot').forEach((el, idx) => {
      el.classList.toggle('active', idx === p.activeSlotIndex);
    });
    const setCount = (idx: number, val: number | string) => {
      const el = document.getElementById(`dr-slot-count-${idx}`);
      if (el) el.textContent = String(val);
    };
    setCount(3, p.inventory.arrows);
    setCount(4, p.inventory.woodPlanks);
    setCount(5, p.inventory.cobbleBlocks);
    setCount(6, p.inventory.cookedFood + p.inventory.food);

    if (this.activeModal === 'inventory') {
      this.renderInventoryModal();
    } else if (this.activeModal === 'quests') {
      this.renderQuestModal();
    }
  }

  public renderMinimap(
    px: number,
    pz: number,
    yaw: number,
    landmarks: DarkLandmarkZone[],
    monsters: Array<{ x: number; z: number; isBoss: boolean }>,
    companions: Array<{ x: number; z: number }>
  ): void {
    const ctx = this.minimapCtx;
    const w = this.minimapCanvas.width;
    const r = w / 2;
    const scale = 0.28; // 240m radius visible inside minimap

    ctx.clearRect(0, 0, w, w);
    ctx.save();
    ctx.beginPath();
    ctx.arc(r, r, r - 2, 0, Math.PI * 2);
    ctx.clip();

    // Dark forest ground
    ctx.fillStyle = '#15251e';
    ctx.fillRect(0, 0, w, w);

    // Subtle terrain rings
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.14)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(r, r, r * 0.5, 0, Math.PI * 2);
    ctx.stroke();

    // Landmarks (Castle, Villages, Caves, Floating Islands)
    for (const lm of landmarks) {
      const sx = r + (lm.pos.x - px) * scale;
      const sy = r + (lm.pos.z - pz) * scale;
      ctx.fillStyle =
        lm.kind === 'castle'
          ? '#a855f7'
          : lm.kind === 'floating'
          ? '#38bdf8'
          : lm.kind === 'cave'
          ? '#f97316'
          : '#fbbf24';
      ctx.beginPath();
      ctx.arc(sx, sy, lm.kind === 'castle' ? 5.5 : 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Monsters
    for (const m of monsters) {
      const sx = r + (m.x - px) * scale;
      const sy = r + (m.z - pz) * scale;
      ctx.fillStyle = m.isBoss ? '#f43f5e' : '#fb7185';
      ctx.fillRect(sx - (m.isBoss ? 2.5 : 1.5), sy - (m.isBoss ? 2.5 : 1.5), m.isBoss ? 5 : 3, m.isBoss ? 5 : 3);
    }

    // 3 Companions (cyan-green)
    for (const c of companions) {
      const sx = r + (c.x - px) * scale;
      const sy = r + (c.z - pz) * scale;
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.arc(sx, sy, 2.8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Player Arrow at center facing -yaw (top = North / -Z)
    ctx.translate(r, r);
    ctx.rotate(-yaw);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.moveTo(0, -6.5);
    ctx.lineTo(4.5, 5);
    ctx.lineTo(0, 2.5);
    ctx.lineTo(-4.5, 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  private renderInventoryModal(): void {
    const body = document.getElementById('dr-inv-body');
    if (!body) return;
    const p = this.progress;
    const wStats = p.getWeaponStats();
    const aStats = p.getArmorStats();

    body.innerHTML = `
      <div class="dr-grid-2">
        <div class="dr-panel-box">
          <h4 style="margin:0 0 8px;color:#38bdf8;">⚔️ Gear & Resources · المعدات والموارد</h4>
          <div style="font-size:0.82rem;line-height:1.7;color:#cbd5e1;">
            <div>🗡️ Weapon: <b style="color:#38bdf8;">${wStats.name}</b> (${wStats.damage} DMG)</div>
            <div>🛡️ Armor: <b style="color:#a855f7;">${aStats.name}</b> (${Math.round(aStats.defense * 100)}% DEF)</div>
            <hr style="border-color:rgba(255,255,255,0.1);margin:6px 0;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">
              <span>🪵 Wood: <b>${p.inventory.wood}</b></span>
              <span>🪨 Stone: <b>${p.inventory.stone}</b></span>
              <span>⛓️ Iron: <b>${p.inventory.iron}</b></span>
              <span>🪙 Gold: <b>${p.inventory.gold}</b></span>
              <span>💎 Crystal: <b>${p.inventory.crystal}</b></span>
              <span>🌑 Essence: <b>${p.inventory.essence}</b></span>
              <span>🥩 Rations: <b>${p.inventory.cookedFood + p.inventory.food}</b></span>
              <span>🏹 Arrows: <b>${p.inventory.arrows}</b></span>
              <span>🧱 Planks: <b>${p.inventory.woodPlanks}</b></span>
              <span>🏰 Bricks: <b>${p.inventory.brickBlocks}</b></span>
            </div>
          </div>
          <button id="dr-modal-build-house" class="dr-btn-primary" style="width:100%;margin-top:10px;">
            🏠 Quick-Build Cabin Blueprint Here (5×5 House)
          </button>
        </div>

        <div class="dr-panel-box">
          <h4 style="margin:0 0 8px;color:#fbbf24;">✨ Character Upgrades · نقاط التطوير (${p.skillPoints} SP)</h4>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${(
              [
                ['vitality', 'Vitality (+25 Max HP)'],
                ['arcana', 'Arcana (+15 Max Mana)'],
                ['strength', 'Strength (+8 Melee/Bow DMG)'],
                ['bastion', 'Bastion (+4% Defense)'],
                ['swiftness', 'Swiftness (+6% Speed)'],
              ] as const
            )
              .map(
                ([k, label]) => `
              <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;background:#0b101d;padding:5px 8px;border-radius:6px;">
                <span>${label} <b style="color:#fbbf24;">[Rank ${p.statRanks[k]}]</b></span>
                <button class="dr-btn-primary dr-up-btn" data-stat="${k}" ${p.skillPoints <= 0 ? 'disabled' : ''}>+1</button>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>

      <h4 style="margin:14px 0 8px;color:#c084fc;">🔨 Crafting & Forging Station · التصنيع والحدادة</h4>
      <div class="dr-grid-2">
        ${CRAFT_RECIPES.map((r) => {
          const can = p.canCraft(r);
          const costStr = Object.entries(r.costs)
            .map(([k, v]) => `${v} ${k}`)
            .join(', ');
          return `
            <div class="dr-panel-box" style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
              <div>
                <div style="font-weight:800;font-size:0.84rem;color:#f8fafc;">${r.nameEn}</div>
                <div style="font-size:0.74rem;color:#94a3b8;">${r.nameAr} · Cost: ${costStr}</div>
              </div>
              <button class="dr-btn-primary dr-craft-btn" data-craft="${r.id}" ${can ? '' : 'disabled'}>Craft</button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    document.getElementById('dr-modal-build-house')?.addEventListener('click', () => {
      this.callbacks.onBuildStarterHouse();
      this.closeModals();
    });

    body.querySelectorAll('.dr-up-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const stat = btn.getAttribute('data-stat') as keyof DarkRealmProgress['statRanks'];
        this.callbacks.onUpgradeStat(stat);
      });
    });

    body.querySelectorAll('.dr-craft-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-craft');
        const rec = CRAFT_RECIPES.find((x) => x.id === id);
        if (rec) this.callbacks.onCraftRecipe(rec);
      });
    });
  }

  private renderMapModal(
    landmarks: DarkLandmarkZone[],
    playerPos: { x: number; z: number },
    companions: Array<{ x: number; z: number }>,
    weather: DarkWeatherType
  ): void {
    const body = document.getElementById('dr-map-body');
    if (!body) return;

    body.innerHTML = `
      <div style="display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start;">
        <div>
          <canvas id="dr-full-map-canvas" width="460" height="340" style="background:#080d18;border:1.5px solid #334155;border-radius:10px;max-width:100%;"></canvas>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
            <button class="dr-action-btn dr-time-btn" data-time="0.86">🌙 Moonlit Night</button>
            <button class="dr-action-btn dr-time-btn" data-time="0.28">🌅 Dawn</button>
            <button class="dr-action-btn dr-time-btn" data-time="0.50">☀️ Day</button>
            <button class="dr-action-btn" id="dr-map-weather-btn">🌦️ Weather: ${WEATHER_LABELS[weather].en}</button>
          </div>
        </div>
        <div style="flex:1;min-width:230px;max-height:360px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;">
          <div style="font-size:0.84rem;font-weight:800;color:#fbbf24;margin-bottom:4px;">⚡ Fast Travel Landmarks · السفر السريع</div>
          ${landmarks
            .map(
              (lm) => `
            <div style="display:flex;justify-content:space-between;align-items:center;background:#141c2f;padding:7px 10px;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
              <div>
                <div style="font-size:0.8rem;font-weight:800;">${lm.nameEn}</div>
                <div style="font-size:0.7rem;color:#94a3b8;">${lm.nameAr} (${lm.kind})</div>
              </div>
              <button class="dr-btn-primary dr-ft-btn" data-lm="${lm.id}">Travel</button>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    // Paint 460x340 Full World Map
    const c = document.getElementById('dr-full-map-canvas') as HTMLCanvasElement;
    if (c) {
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#0c1518';
      ctx.fillRect(0, 0, c.width, c.height);

      const toX = (x: number) => c.width / 2 + x * 0.42;
      const toY = (z: number) => c.height * 0.68 + z * 0.42;

      // River path
      ctx.strokeStyle = '#1d4ed8';
      ctx.lineWidth = 7;
      ctx.beginPath();
      for (let z = -240; z <= 200; z += 15) {
        const rx = Math.sin(z * 0.018) * 16 - 4;
        if (z === -240) ctx.moveTo(toX(rx), toY(z));
        else ctx.lineTo(toX(rx), toY(z));
      }
      ctx.stroke();

      for (const lm of landmarks) {
        const x = toX(lm.pos.x);
        const y = toY(lm.pos.z);
        ctx.fillStyle =
          lm.kind === 'castle' ? '#f43f5e' : lm.kind === 'floating' ? '#38bdf8' : lm.kind === 'cave' ? '#fb923c' : '#fbbf24';
        ctx.beginPath();
        ctx.arc(x, y, lm.kind === 'castle' ? 8 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px sans-serif';
        ctx.fillText(lm.nameEn.split(' ')[0], x + 7, y + 3);
      }

      for (const comp of companions) {
        ctx.fillStyle = '#4ade80';
        ctx.beginPath();
        ctx.arc(toX(comp.x), toY(comp.z), 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(toX(playerPos.x), toY(playerPos.z), 6, 0, Math.PI * 2);
      ctx.fill();
    }

    body.querySelectorAll('.dr-ft-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-lm');
        const found = landmarks.find((l) => l.id === id);
        if (found) {
          this.callbacks.onFastTravel(found);
          this.closeModals();
        }
      });
    });

    body.querySelectorAll('.dr-time-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.callbacks.onSetTimePreset(Number(btn.getAttribute('data-time')));
      });
    });

    document.getElementById('dr-map-weather-btn')?.addEventListener('click', () => {
      this.callbacks.onCycleWeather();
      this.closeModals();
    });
  }

  private renderQuestModal(): void {
    const body = document.getElementById('dr-quest-body');
    if (!body) return;

    const cats: Array<{ key: QuestCategory; label: string }> = [
      { key: 'main', label: 'Main Story (12)' },
      { key: 'hunting', label: 'Monster Hunts' },
      { key: 'gathering', label: 'Gathering & Build' },
      { key: 'exploration', label: 'Exploration' },
    ];

    const list = this.progress.quests.filter((q) => q.category === this.activeQuestTab);
    const doneTotal = this.progress.quests.filter((q) => q.completed).length;

    body.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${cats
            .map(
              (c) => `
            <button class="dr-action-btn dr-qtab-btn" data-cat="${c.key}" style="${
                c.key === this.activeQuestTab ? 'border-color:#fbbf24;color:#fbbf24;' : ''
              }">${c.label}</button>
          `
            )
            .join('')}
        </div>
        <div style="font-size:0.84rem;font-weight:800;color:#4ade80;">Completed: ${doneTotal} / ${this.progress.quests.length}</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:7px;max-height:56vh;overflow-y:auto;">
        ${list
          .map(
            (q: DarkQuest) => `
          <div style="background:#141c2f;border:1px solid ${
            q.completed ? 'rgba(74,222,128,0.45)' : 'rgba(255,255,255,0.1)'
          };border-radius:8px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;gap:10px;opacity:${
              q.unlocked ? 1 : 0.5
            };">
            <div>
              <div style="font-weight:800;font-size:0.85rem;color:${q.completed ? '#4ade80' : '#f8fafc'};">
                #${q.index} ${q.titleEn} · ${q.titleAr}
              </div>
              <div style="font-size:0.74rem;color:#94a3b8;">${q.descEn} (Reward: ${q.xpReward} XP, ${q.goldReward} Gold)</div>
            </div>
            <div style="font-weight:900;font-size:0.82rem;white-space:nowrap;color:${q.completed ? '#4ade80' : '#fbbf24'};">
              ${q.completed ? '✓ DONE' : `${q.progress} / ${q.target}`}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    body.querySelectorAll('.dr-qtab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.activeQuestTab = btn.getAttribute('data-cat') as QuestCategory;
        this.renderQuestModal();
      });
    });
  }

  public dispose(): void {
    this.container?.remove();
    this.invModal?.remove();
    this.mapModal?.remove();
    this.questModal?.remove();
    this.victoryModal?.remove();
  }
}
