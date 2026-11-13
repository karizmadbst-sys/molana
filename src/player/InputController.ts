/**
 * ECHO – THE WORLD REMEMBERS
 * Unified Input Controller: Keyboard, Mouse, Touch Joystick & Gamepad
 */

import * as THREE from 'three';

export function detectMobileOrTablet(): boolean {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua)) {
    return true;
  }
  // iPadOS reports Macintosh with touch points > 1
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) {
    return true;
  }
  const isCoarse = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  return isCoarse && navigator.maxTouchPoints > 0 && Math.max(window.innerWidth, window.innerHeight) <= 1366;
}

export class InputController {
  // Movement vector: x (-1 = left, 1 = right), y (-1 = back, 1 = forward)
  public moveInput = new THREE.Vector2();
  public isSprinting = false;
  public jumpJustPressed = false;
  public interactJustPressed = false;
  public pauseJustPressed = false;
  public questJustPressed = false;
  public viewToggleJustPressed = false;

  // Combat Inputs
  public attackJustPressed = false;
  public isAttackHeld = false;
  public dodgeJustPressed = false;
  public pulseJustPressed = false;
  public reloadJustPressed = false;
  public sprintToggleJustPressed = false;

  // Dark Realm RPG Hotkeys
  public hotbarSlotPressed: number | null = null;
  public buildToggleJustPressed = false;
  public rotateBlockJustPressed = false;
  public inventoryJustPressed = false;
  public mapToggleJustPressed = false;
  public codexJustPressed = false;
  public magicJustPressed = false;
  public healJustPressed = false;
  public rightClickJustPressed = false;
  public isRightMouseHeld = false;
  public touchRightMouseHeld = false;
  public isStrafingLeft = false;

  public setTouchRightHold(held: boolean): void {
    this.touchRightMouseHeld = held;
  }

  public get isSecondaryHeld(): boolean {
    return this.isRightMouseHeld || this.touchRightMouseHeld;
  }

  // F1 Cursor Lock Toggle (PC)
  public isCursorLockedMode = false;
  private userUnlockedCursor = false;
  public onCursorLockChanged?: (locked: boolean) => void;

  // External touch virtual stick contribution
  public touchMoveInput = new THREE.Vector2();
  public touchSprinting = false;
  public touchButtonSprinting = false;
  public touchJoystickSprinting = false;

  // Camera deltas
  public cameraDeltaX = 0;
  public cameraDeltaY = 0;
  public zoomDelta = 0;

  // Internal key & pointer states
  private keysHeld = new Set<string>();
  private isPointerDown = false;
  private isPointerLocked = false;
  private hoverInitialized = false;
  private lastHoverX = 0;
  private lastHoverY = 0;

  // Touch tracking for right-screen camera swipe
  private cameraTouchId: number | null = null;
  private lastTouchX = 0;
  private lastTouchY = 0;

  constructor(private container: HTMLElement, private isMobileDevice: boolean = false) {
    this.setupKeyboard();
    this.setupMouse();
    this.setupTouchCamera();
  }

  public setMobileMode(isMobile: boolean): void {
    this.isMobileDevice = isMobile;
    if (isMobile) {
      this.releasePointerLock();
      this.hoverInitialized = false;
    }
  }

  public releasePointerLock(fromUserToggle: boolean = false): void {
    try {
      if (document.pointerLockElement) {
        document.exitPointerLock?.();
      }
    } catch {
      // ignore
    }
    this.isPointerLocked = false;
    this.hoverInitialized = false;
    if (this.isCursorLockedMode || fromUserToggle) {
      this.isCursorLockedMode = false;
      this.container.style.cursor = '';
      document.body.style.cursor = '';
      if (fromUserToggle) {
        this.userUnlockedCursor = true;
      }
      this.onCursorLockChanged?.(false);
    }
  }

  public setCursorLockedMode(locked: boolean): void {
    if (this.isMobileDevice) return;
    if (locked) {
      this.userUnlockedCursor = false;
      this.isCursorLockedMode = true;
      this.container.style.cursor = 'none';
      document.body.style.cursor = 'none';
      this.hoverInitialized = false;
      if (!this.isPointerLocked && typeof this.container.requestPointerLock === 'function') {
        try {
          const res = this.container.requestPointerLock() as unknown as Promise<void> | undefined;
          if (res && typeof res.catch === 'function') {
            res.catch(() => {});
          }
        } catch {
          // Restricted iframe fallback: cursor remains hidden & hover-look tracks smoothly
        }
      }
      this.onCursorLockChanged?.(true);
    } else {
      this.releasePointerLock(true);
    }
  }

  public toggleCursorLock(): boolean {
    const next = !this.isCursorLockedMode;
    this.setCursorLockedMode(next);
    return next;
  }

  private isInputFocused(): boolean {
    const active = document.activeElement;
    if (active instanceof HTMLElement && active.matches('input, textarea, select, [contenteditable="true"]')) {
      return true;
    }
    return Boolean(document.getElementById('mp-chat-panel')?.classList.contains('focused'));
  }

  private isUIOverlayBlocking(target: EventTarget | null): boolean {
    if (
      document.getElementById('title-screen')?.matches(':not(.hidden)') ||
      document.querySelector('.modal-overlay.open') ||
      document.querySelector('.dr-modal.open') ||
      document.querySelector('#hud-layout-editor-overlay.active') ||
      this.isInputFocused()
    ) {
      return true;
    }
    const el = target instanceof HTMLElement ? target : null;
    if (!el) return false;
    return Boolean(
      el.closest('input, textarea, select, button, a, .modal-overlay, .dr-modal, #title-screen, #hud-layout-editor-overlay, #mp-chat-panel')
    );
  }

  private isInteractiveHudElement(el: HTMLElement | null): boolean {
    if (!el) return false;
    return Boolean(
      el.closest(
        '.interactive, #mc-hotbar, .mc-hotbar-slot, #virtual-joystick-container, #joystick-base, #joystick-knob, .customizable-control, #mp-chat-panel, #voice-hud-bar, #mp-invite-toast, .hud-actions, .minimap-box, .quest-cluster'
      )
    );
  }

  private setupKeyboard(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'F1' || e.key === 'F1') {
        e.preventDefault();
        e.stopPropagation();
        if (!this.isMobileDevice && !this.isInputFocused() && document.getElementById('title-screen')?.classList.contains('hidden')) {
          this.toggleCursorLock();
        }
        return;
      }

      if (this.isInputFocused()) {
        return;
      }
      if (this.isUIOverlayBlocking(e.target)) {
        return;
      }

      this.keysHeld.add(e.code);

      if (e.code === 'Space') {
        this.jumpJustPressed = true;
        e.preventDefault();
      }
      if (e.code === 'KeyE' || e.code === 'Enter') {
        this.interactJustPressed = true;
      }
      if (e.code === 'KeyJ') {
        this.questJustPressed = true;
      }
      if (e.code === 'KeyV' || e.key === 'v' || e.key === 'V' || e.key === 'ر' || e.code === 'KeyT' || e.key === 't' || e.key === 'T' || e.key === 'ف') {
        this.viewToggleJustPressed = true;
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        this.sprintToggleJustPressed = true;
      }

      // Combat key bindings (F = Attack, C / Alt = Dodge, R = Reload / Pulse, X = Echo Pulse)
      if (e.code === 'KeyF' || e.key === 'f' || e.key === 'F' || e.key === 'ب') {
        if (!this.isAttackHeld) {
          this.attackJustPressed = true;
        }
        this.isAttackHeld = true;
      }
      if (e.code === 'KeyC' || e.code === 'AltLeft' || e.key === 'c' || e.key === 'C' || e.key === 'ؤ') {
        this.dodgeJustPressed = true;
      }
      if (e.code === 'KeyR' || e.key === 'r' || e.key === 'R' || e.key === 'ق') {
        this.rotateBlockJustPressed = true;
        this.reloadJustPressed = true;
        this.pulseJustPressed = true;
      }
      if (e.code === 'KeyX') {
        this.pulseJustPressed = true;
      }

      // Dark Realm RPG bindings
      if (e.code === 'KeyB') {
        this.buildToggleJustPressed = true;
      }
      if (e.code === 'KeyI') {
        this.inventoryJustPressed = true;
      }
      if (e.code === 'KeyM') {
        this.mapToggleJustPressed = true;
      }
      if (e.code === 'KeyK') {
        this.codexJustPressed = true;
      }
      if (e.code === 'KeyG') {
        this.magicJustPressed = true;
      }
      if (e.code === 'KeyH') {
        this.healJustPressed = true;
      }
      if (e.code.startsWith('Digit')) {
        const d = Number(e.code.replace('Digit', ''));
        if (d >= 1 && d <= 8) {
          this.hotbarSlotPressed = d - 1;
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keysHeld.delete(e.code);
      if (e.code === 'KeyF' || e.key === 'f' || e.key === 'F' || e.key === 'ب') {
        this.isAttackHeld = false;
      }
    });

    window.addEventListener('blur', () => {
      this.resetAllInputs();
      this.releasePointerLock();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.resetAllInputs();
        this.releasePointerLock();
      }
    });
  }

  public resetAllInputs(): void {
    this.keysHeld.clear();
    this.isPointerDown = false;
    this.isAttackHeld = false;
    this.isRightMouseHeld = false;
    this.touchRightMouseHeld = false;
    this.isStrafingLeft = false;
    this.hoverInitialized = false;
    this.cameraTouchId = null;
    this.activeJoystickTouchId = null;
    this.touchMoveInput.set(0, 0);
    this.touchSprinting = false;
    this.touchButtonSprinting = false;
    this.touchJoystickSprinting = false;
    this.moveInput.set(0, 0);
    this.isSprinting = false;
    this.clearFrameDeltas();
  }

  // Active joystick touch identifier for absolute separation of inputs
  public activeJoystickTouchId: number | null = null;

  public setJoystickTouchId(id: number | null): void {
    this.activeJoystickTouchId = id;
    if (id !== null && this.cameraTouchId === id) {
      this.cameraTouchId = null;
    }
  }

  private setupMouse(): void {
    document.addEventListener('pointerlockchange', () => {
      const lockedNow = document.pointerLockElement === this.container;
      this.isPointerLocked = lockedNow;
      this.hoverInitialized = false;
      if (lockedNow) {
        this.isCursorLockedMode = true;
        this.userUnlockedCursor = false;
        this.container.style.cursor = 'none';
        document.body.style.cursor = 'none';
        this.onCursorLockChanged?.(true);
      } else if (this.isCursorLockedMode) {
        this.isCursorLockedMode = false;
        this.container.style.cursor = '';
        document.body.style.cursor = '';
        this.onCursorLockChanged?.(false);
      }
    });

    this.container.addEventListener('mouseenter', (e) => {
      this.lastHoverX = e.clientX;
      this.lastHoverY = e.clientY;
      this.hoverInitialized = true;
    });

    this.container.addEventListener('mouseleave', () => {
      this.hoverInitialized = false;
    });

    this.container.addEventListener('mousedown', (e) => {
      if (this.isMobileDevice) return;
      const target = e.target as HTMLElement | null;
      if (this.isUIOverlayBlocking(target) || this.isInteractiveHudElement(target)) {
        return;
      }

      if (e.button === 0) {
        this.isPointerDown = true;
        this.isAttackHeld = true;
        this.attackJustPressed = true;
        // Engage pointer lock unless player explicitly unlocked cursor via F1
        if (!this.userUnlockedCursor && !this.isPointerLocked && typeof this.container.requestPointerLock === 'function') {
          try {
            const res = this.container.requestPointerLock() as unknown as Promise<void> | undefined;
            if (res && typeof res.catch === 'function') {
              res.catch(() => {});
            }
          } catch {
            // Pointer lock may be unavailable in restricted iframes; hover fallback remains active
          }
        }
      } else if (e.button === 2) {
        this.isPointerDown = true;
        this.isRightMouseHeld = true;
        this.rightClickJustPressed = true;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isMobileDevice) return;

      if (this.isPointerLocked) {
        if (this.isUIOverlayBlocking(null)) {
          this.releasePointerLock();
          return;
        }
        const dx = Math.max(-140, Math.min(140, e.movementX || 0));
        const dy = Math.max(-140, Math.min(140, e.movementY || 0));
        this.cameraDeltaX += dx;
        this.cameraDeltaY += dy;
        return;
      }

      // Free mouse-look without holding any mouse button on PC (hover-to-look)
      const target = e.target as HTMLElement | null;
      if (
        this.isUIOverlayBlocking(target) ||
        this.isInteractiveHudElement(target) ||
        (target && !this.container.contains(target))
      ) {
        this.hoverInitialized = false;
        return;
      }

      if (!this.hoverInitialized) {
        this.lastHoverX = e.clientX;
        this.lastHoverY = e.clientY;
        this.hoverInitialized = true;
        return;
      }

      const dx = Math.max(-90, Math.min(90, e.clientX - this.lastHoverX));
      const dy = Math.max(-90, Math.min(90, e.clientY - this.lastHoverY));
      this.cameraDeltaX += dx;
      this.cameraDeltaY += dy;
      this.lastHoverX = e.clientX;
      this.lastHoverY = e.clientY;
    });

    window.addEventListener('mouseup', (e) => {
      this.isPointerDown = false;
      if (e.button === 0) {
        this.isAttackHeld = false;
      }
      if (e.button === 2 || e.buttons === 0) {
        if (e.buttons === 0) {
          this.isAttackHeld = false;
        }
        this.isRightMouseHeld = false;
      }
    });

    this.container.addEventListener('wheel', (e) => {
      if (this.isUIOverlayBlocking(e.target)) return;
      this.zoomDelta += e.deltaY;
    }, { passive: true });

    this.container.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  private setupTouchCamera(): void {
    const isInteractiveTouch = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      return Boolean(
        el.closest('.interactive') ||
        el.closest('#mc-hotbar') ||
        el.closest('.mc-hotbar-slot') ||
        el.closest('.modal-overlay') ||
        el.closest('.dr-modal') ||
        el.closest('#title-screen') ||
        el.closest('#virtual-joystick-container') ||
        el.closest('#joystick-base') ||
        el.closest('#joystick-knob') ||
        el.closest('.mobile-controls') ||
        el.closest('.quest-cluster') ||
        el.closest('#mc-player-card') ||
        el.closest('.hud-actions') ||
        el.closest('#mp-chat-panel') ||
        el.closest('#voice-hud-bar') ||
        el.closest('#mp-invite-toast') ||
        el.closest('.customizable-control') ||
        el.closest('.minimap-box') ||
        el.closest('#hud-layout-editor-overlay')
      );
    };

    this.container.addEventListener('touchstart', (e) => {
      if (this.isUIOverlayBlocking(e.target)) return;

      // Self-heal orphaned cameraTouchId if OS dropped an earlier touchend/touchcancel
      if (this.cameraTouchId !== null) {
        const stillAlive = Array.from(e.touches).some((t) => t.identifier === this.cameraTouchId);
        if (!stillAlive) {
          this.cameraTouchId = null;
        }
      }

      const joyEl = document.getElementById('virtual-joystick-container');
      const joyRect = joyEl && joyEl.offsetParent !== null ? joyEl.getBoundingClientRect() : null;

      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        const target = touch.target as HTMLElement;

        // 1. Strict separation: Ignore any touch assigned to the virtual analog joystick
        if (this.activeJoystickTouchId !== null && touch.identifier === this.activeJoystickTouchId) {
          continue;
        }

        // 2. Ignore touches inside the actual D-Pad / Joystick bounding box (with 14px padding)
        if (joyRect) {
          const pad = 14;
          if (
            touch.clientX >= joyRect.left - pad &&
            touch.clientX <= joyRect.right + pad &&
            touch.clientY >= joyRect.top - pad &&
            touch.clientY <= joyRect.bottom + pad
          ) {
            continue;
          }
        }

        // 3. Ignore touches on interactive HUD elements & combat action buttons
        if (isInteractiveTouch(target)) {
          continue;
        }

        // Start dedicated camera rotation swipe
        if (this.cameraTouchId === null) {
          this.cameraTouchId = touch.identifier;
          this.lastTouchX = touch.clientX;
          this.lastTouchY = touch.clientY;
          break;
        }
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.cameraTouchId === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];

        // Never let the joystick touch affect camera rotation
        if (touch.identifier === this.activeJoystickTouchId) {
          if (this.cameraTouchId === touch.identifier) {
            this.cameraTouchId = null;
          }
          continue;
        }

        if (touch.identifier === this.cameraTouchId) {
          const dx = touch.clientX - this.lastTouchX;
          const dy = touch.clientY - this.lastTouchY;

          // Safe delta clamping to prevent any erratic jumps
          const clampedDx = Math.max(-120, Math.min(120, dx));
          const clampedDy = Math.max(-120, Math.min(120, dy));

          this.cameraDeltaX += clampedDx * 1.25;
          this.cameraDeltaY += clampedDy * 1.25;
          this.lastTouchX = touch.clientX;
          this.lastTouchY = touch.clientY;
          return;
        }
      }
      const stillAlive = Array.from(e.touches).some((t) => t.identifier === this.cameraTouchId);
      if (!stillAlive) {
        this.cameraTouchId = null;
      }
    }, { passive: true });

    const handleTouchEnd = (e: TouchEvent) => {
      if (this.cameraTouchId === null) return;
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === this.cameraTouchId) {
          this.cameraTouchId = null;
          return;
        }
      }
      if (e.touches.length === 0) {
        this.cameraTouchId = null;
      }
    };

    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
  }

  public update(): void {
    // 1. Process keyboard movement
    let x = 0;
    let y = 0;

    if (this.keysHeld.has('KeyW') || this.keysHeld.has('ArrowUp')) y += 1;
    if (this.keysHeld.has('KeyS') || this.keysHeld.has('ArrowDown')) y -= 1;
    if (this.keysHeld.has('KeyA') || this.keysHeld.has('ArrowLeft')) x -= 1;
    if (this.keysHeld.has('KeyD') || this.keysHeld.has('ArrowRight')) x += 1;
    const qHeld = this.keysHeld.has('KeyQ');
    if (qHeld) x -= 1;
    this.isStrafingLeft = qHeld;

    let sprint =
      this.keysHeld.has('ShiftLeft') ||
      this.keysHeld.has('ShiftRight') ||
      this.touchButtonSprinting ||
      this.touchJoystickSprinting ||
      this.touchSprinting;

    // 2. Add touch joystick contribution if active
    if (this.touchMoveInput.lengthSq() > 0.001) {
      x += this.touchMoveInput.x;
      y += this.touchMoveInput.y;
    }

    // 3. Add Gamepad contribution
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gp = gamepads[0];
    if (gp) {
      const deadzone = 0.15;
      const gx = gp.axes[0];
      const gy = gp.axes[1];
      if (Math.abs(gx) > deadzone) x += gx;
      if (Math.abs(gy) > deadzone) y -= gy;

      const camX = gp.axes[2];
      const camY = gp.axes[3];
      if (Math.abs(camX) > deadzone) this.cameraDeltaX += camX * 8;
      if (Math.abs(camY) > deadzone) this.cameraDeltaY += camY * 8;

      if (gp.buttons[0]?.pressed) this.jumpJustPressed = true;
      if (gp.buttons[2]?.pressed) this.interactJustPressed = true;
      if (gp.buttons[10]?.pressed || gp.buttons[7]?.pressed) sprint = true;
      if (gp.buttons[9]?.pressed) this.pauseJustPressed = true;
    }

    // Normalize diagonal movement
    this.moveInput.set(x, y);
    if (this.moveInput.lengthSq() > 1.0) {
      this.moveInput.normalize();
    }

    // When sprinting is active without another directional input (e.g. pressing/holding sprint button or Shift),
    // automatically drive movement forward (y = 1.0) so the character runs forward instead of running in place
    if (sprint && this.moveInput.lengthSq() <= 0.001) {
      this.moveInput.set(0, 1.0);
    }

    this.isSprinting = sprint;
  }

  public clearFrameDeltas(): void {
    this.cameraDeltaX = 0;
    this.cameraDeltaY = 0;
    this.zoomDelta = 0;
    this.jumpJustPressed = false;
    this.interactJustPressed = false;
    this.pauseJustPressed = false;
    this.questJustPressed = false;
    this.viewToggleJustPressed = false;
    this.attackJustPressed = false;
    this.dodgeJustPressed = false;
    this.pulseJustPressed = false;
    this.reloadJustPressed = false;
    this.sprintToggleJustPressed = false;
    this.hotbarSlotPressed = null;
    this.buildToggleJustPressed = false;
    this.rotateBlockJustPressed = false;
    this.inventoryJustPressed = false;
    this.mapToggleJustPressed = false;
    this.codexJustPressed = false;
    this.magicJustPressed = false;
    this.healJustPressed = false;
    this.rightClickJustPressed = false;
  }
}
