/**
 * ECHO – THE WORLD REMEMBERS
 * Third-Person Orbital Camera & Live Cinematic Title Cam
 * Smooth damping, pitch/yaw rotation, zoom control, and terrain collision avoidance.
 */

import * as THREE from 'three';
import { Terrain } from '../world/Terrain.ts';

export class ThirdPersonCamera {
  public camera: THREE.PerspectiveCamera;
  public target: THREE.Vector3;
  public currentPosition: THREE.Vector3;

  // Spherical angles
  public yaw: number = Math.PI; // Face towards island center
  public pitch: number = 0.28;  // Vertical tilt (radians)
  public distance: number = 6.8; // Distance behind player
  public sensitivity: number = 1.0; // Orbit speed multiplier

  // Perspective Mode (Third-Person vs First-Person)
  public isFirstPerson: boolean = false;
  public perspectiveBlend: number = 0; // 0 = 3P, 1 = 1P
  public smoothTarget: THREE.Vector3;
  public isCinematic: boolean = true;
  public cinematicTime: number = 0;

  // Manual camera rotation tracking (The camera NEVER auto-rotates with analog or movement)
  public manualRotateTimer: number = 999;

  // Constraints (nearly straight down & straight up without gimbal flip)
  private minPitch = -1.54;
  private maxPitch = 1.54;
  private minPitchFPP = -1.54;
  private maxPitchFPP = 1.54;
  private minDistance = 2.8;
  private maxDistance = 14.0;

  // Reusable scratchpad vectors for zero GC pressure in render loop
  private static readonly _scratchTarget = new THREE.Vector3();
  private static readonly _scratchDir = new THREE.Vector3();
  private static readonly _scratchTestPoint = new THREE.Vector3();
  private static readonly _scratchDesiredCam = new THREE.Vector3();
  private static readonly _scratchEyePos = new THREE.Vector3();
  private static readonly _scratchLookTarget = new THREE.Vector3();
  private static readonly _scratchFppCam = new THREE.Vector3();
  private static readonly _scratchFppLook = new THREE.Vector3();
  private static readonly _scratchTppCam = new THREE.Vector3();
  private static readonly _scratchTppLook = new THREE.Vector3();

  // Portrait mode adaptation (9:16 screens) & ADS Aim Zoom
  public isPortraitMode: boolean = false;
  private portraitDistanceMultiplier: number = 1.0;
  private baseFov: number = 55;
  private targetFov: number = 55;
  public isAiming: boolean = false;
  private recoilPitchOffset: number = 0;

  constructor(fov: number = 55, aspect: number = 16 / 9) {
    this.baseFov = fov;
    this.targetFov = fov;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.05, 3600);
    this.target = new THREE.Vector3(0, 5, 80);
    this.smoothTarget = this.target.clone();
    this.currentPosition = new THREE.Vector3(0, 10, 95);
    this.camera.position.copy(this.currentPosition);
    this.updateAspect(aspect);
  }

  public addRecoilKick(pitchKick: number, yawKick: number = 0): void {
    this.recoilPitchOffset = Math.min(0.18, this.recoilPitchOffset + pitchKick);
    this.yaw += yawKick;
  }

  /**
   * Adapts camera projection for 16:9 Landscape Cinema mode.
   * Fixed 16:9 landscape aspect ratio prevents visual distortions and provides a panoramic gaming experience.
   */
  public updateAspect(aspect: number): void {
    // Lock to widescreen landscape perspective
    this.camera.aspect = aspect;
    this.isPortraitMode = false;
    this.baseFov = 55;
    this.targetFov = this.isAiming ? (this.isFirstPerson ? 40 : 44) : this.baseFov;
    this.portraitDistanceMultiplier = 1.0;

    this.camera.fov = this.targetFov;
    this.camera.updateProjectionMatrix();
  }

  public getPerspectiveBlend(): number {
    return this.perspectiveBlend;
  }

  public shouldHideCharacterMesh(): boolean {
    return this.perspectiveBlend > 0.68;
  }

  public update(
    dt: number,
    playerPos: THREE.Vector3,
    terrain: Terrain,
    _playerFacingAngle?: number,
    _isMoving: boolean = false
  ): void {
    const clampedDt = Math.min(dt, 0.05);
    this.manualRotateTimer += clampedDt;

    // Smooth ADS FOV transition & recoil spring recovery
    const desiredFov = this.isAiming ? (this.isFirstPerson ? 40 : 44) : this.baseFov;
    if (Math.abs(this.camera.fov - desiredFov) > 0.05) {
      const fovAlpha = 1 - Math.exp(-16.0 * clampedDt);
      this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, desiredFov, fovAlpha);
      this.camera.updateProjectionMatrix();
    } else if (this.camera.fov !== desiredFov) {
      this.camera.fov = desiredFov;
      this.camera.updateProjectionMatrix();
    }
    if (this.recoilPitchOffset > 0.0001) {
      this.recoilPitchOffset *= Math.exp(-18.0 * clampedDt);
    } else {
      this.recoilPitchOffset = 0;
    }

    if (this.isCinematic) {
      // Cinematic live-world camera framing the glowing Great Portal with subtle mystical float
      this.cinematicTime += clampedDt * 0.25;
      const portalPos = Terrain.PORTAL_POS;
      const portalY = terrain.getHeightAt(portalPos.x, portalPos.z);

      const swayX = Math.sin(this.cinematicTime * 0.7) * 0.8;
      const swayY = Math.sin(this.cinematicTime * 1.1) * 0.35;
      const swayZ = Math.cos(this.cinematicTime * 0.6) * 0.8;

      // Position camera in front of the portal, angled so the portal sits on the right
      this.camera.position.set(
        portalPos.x - 17.5 + swayX,
        portalY + 4.2 + swayY,
        portalPos.z - 7.5 + swayZ
      );

      // Look slightly to the left of portal center so portal is framed on the right half
      ThirdPersonCamera._scratchLookTarget.set(
        portalPos.x - 3.0,
        portalY + 6.5,
        portalPos.z + 1.0
      );
      this.camera.lookAt(ThirdPersonCamera._scratchLookTarget);
      return;
    }

    // Smooth perspective blend between 3P (0) and 1P (1)
    const targetBlend = this.isFirstPerson ? 1.0 : 0.0;
    if (Math.abs(targetBlend - this.perspectiveBlend) > 0.002) {
      const blendAlpha = 1 - Math.exp(-13.0 * clampedDt);
      this.perspectiveBlend = THREE.MathUtils.lerp(this.perspectiveBlend, targetBlend, blendAlpha);
      if (Math.abs(targetBlend - this.perspectiveBlend) <= 0.002) {
        this.perspectiveBlend = targetBlend;
      }
    } else {
      this.perspectiveBlend = targetBlend;
    }

    const effectivePitch = Math.max(-1.54, Math.min(1.54, this.pitch));
    const fppPitch = Math.max(
      -1.54,
      Math.min(1.54, (this.isFirstPerson ? effectivePitch : -effectivePitch) + this.recoilPitchOffset)
    );
    const tppPitch = Math.max(
      -1.54,
      Math.min(1.54, (this.isFirstPerson ? -effectivePitch : effectivePitch) - this.recoilPitchOffset * 0.7)
    );

    const sinYaw = Math.sin(this.yaw);
    const cosYaw = Math.cos(this.yaw);

    // ==========================================
    // 1. COMPUTE FIRST-PERSON POSE
    // ==========================================
    if (this.perspectiveBlend > 0.001) {
      ThirdPersonCamera._scratchEyePos.set(playerPos.x, playerPos.y + 1.62, playerPos.z);

      const cosFpp = Math.cos(fppPitch);
      const sinFpp = Math.sin(fppPitch);
      const forwardX = -sinYaw * cosFpp;
      const forwardY = sinFpp;
      const forwardZ = -cosYaw * cosFpp;

      ThirdPersonCamera._scratchFppCam.set(
        ThirdPersonCamera._scratchEyePos.x - sinYaw * 0.12,
        ThirdPersonCamera._scratchEyePos.y,
        ThirdPersonCamera._scratchEyePos.z - cosYaw * 0.12
      );
      ThirdPersonCamera._scratchFppLook.set(
        ThirdPersonCamera._scratchFppCam.x + forwardX * 4.0,
        ThirdPersonCamera._scratchFppCam.y + forwardY * 4.0,
        ThirdPersonCamera._scratchFppCam.z + forwardZ * 4.0
      );
    }

    // ==========================================
    // 2. COMPUTE THIRD-PERSON POSE
    // ==========================================
    const targetYOffset = this.isPortraitMode ? 1.40 : 1.55;
    ThirdPersonCamera._scratchTarget.set(playerPos.x, playerPos.y + targetYOffset, playerPos.z);
    const targetAlpha = 1 - Math.exp(-18.0 * clampedDt);
    this.smoothTarget.lerp(ThirdPersonCamera._scratchTarget, targetAlpha);

    if (this.perspectiveBlend < 0.999) {
      const cosTpp = Math.cos(tppPitch);
      const sinTpp = Math.sin(tppPitch);

      const skyUpFactor = tppPitch < 0 ? Math.min(1, -tppPitch / 1.54) : 0;
      const baseDistance =
        this.distance *
        (this.isPortraitMode ? this.portraitDistanceMultiplier : 1.0) *
        (1.0 - skyUpFactor * 0.42);
      let effectiveDistance = baseDistance;

      ThirdPersonCamera._scratchDir.set(
        cosTpp * sinYaw,
        sinTpp,
        cosTpp * cosYaw
      ).normalize();

      for (let s = 1; s <= 6; s++) {
        const distSample = (baseDistance / 6) * s;
        ThirdPersonCamera._scratchTestPoint.copy(this.smoothTarget).addScaledVector(ThirdPersonCamera._scratchDir, distSample);
        const groundAtPoint = terrain.getHeightAt(ThirdPersonCamera._scratchTestPoint.x, ThirdPersonCamera._scratchTestPoint.z);
        if (ThirdPersonCamera._scratchTestPoint.y < groundAtPoint + 0.45) {
          effectiveDistance = Math.max(this.minDistance * 0.65, (baseDistance / 6) * (s - 0.5));
          break;
        }
      }

      const offsetX = effectiveDistance * cosTpp * sinYaw;
      const offsetY = effectiveDistance * sinTpp;
      const offsetZ = effectiveDistance * cosTpp * cosYaw;

      ThirdPersonCamera._scratchTppCam.set(
        this.smoothTarget.x + offsetX,
        this.smoothTarget.y + offsetY,
        this.smoothTarget.z + offsetZ
      );

      const terrainHeight = terrain.getHeightAt(
        ThirdPersonCamera._scratchTppCam.x,
        ThirdPersonCamera._scratchTppCam.z
      );
      const minCamY = terrainHeight + 0.55;
      if (ThirdPersonCamera._scratchTppCam.y < minCamY) {
        ThirdPersonCamera._scratchTppCam.y = minCamY;
      }

      if (tppPitch < -0.05) {
        const lookDist = Math.max(effectiveDistance, 4.0);
        const skyFwdX = -sinYaw * cosTpp;
        const skyFwdY = -sinTpp;
        const skyFwdZ = -cosYaw * cosTpp;
        ThirdPersonCamera._scratchTppLook.set(
          ThirdPersonCamera._scratchTppCam.x + skyFwdX * lookDist,
          ThirdPersonCamera._scratchTppCam.y + skyFwdY * lookDist,
          ThirdPersonCamera._scratchTppCam.z + skyFwdZ * lookDist
        );
        const skyBlend = THREE.MathUtils.smoothstep(-tppPitch, 0.05, 0.45);
        ThirdPersonCamera._scratchTppLook.lerp(this.smoothTarget, 1.0 - skyBlend);
      } else {
        ThirdPersonCamera._scratchTppLook.copy(this.smoothTarget);
      }
    }

    // ==========================================
    // 3. BLEND & APPLY CAMERA TRANSFORM
    // ==========================================
    if (this.perspectiveBlend >= 0.999) {
      const fppAlpha = 1 - Math.exp(-32.0 * clampedDt);
      this.currentPosition.lerp(ThirdPersonCamera._scratchFppCam, fppAlpha);
      this.camera.position.copy(this.currentPosition);
      ThirdPersonCamera._scratchLookTarget.copy(ThirdPersonCamera._scratchFppLook);
    } else if (this.perspectiveBlend <= 0.001) {
      const camAlpha = 1 - Math.exp(-22.0 * clampedDt);
      this.currentPosition.lerp(ThirdPersonCamera._scratchTppCam, camAlpha);
      this.camera.position.copy(this.currentPosition);
      ThirdPersonCamera._scratchLookTarget.copy(ThirdPersonCamera._scratchTppLook);
    } else {
      const b = THREE.MathUtils.smoothstep(this.perspectiveBlend, 0, 1);
      ThirdPersonCamera._scratchDesiredCam.copy(ThirdPersonCamera._scratchTppCam).lerp(
        ThirdPersonCamera._scratchFppCam,
        b
      );
      const transAlpha = 1 - Math.exp(-28.0 * clampedDt);
      this.currentPosition.lerp(ThirdPersonCamera._scratchDesiredCam, transAlpha);
      this.camera.position.copy(this.currentPosition);
      ThirdPersonCamera._scratchLookTarget.copy(ThirdPersonCamera._scratchTppLook).lerp(
        ThirdPersonCamera._scratchFppLook,
        b
      );
    }

    this.camera.lookAt(ThirdPersonCamera._scratchLookTarget);
  }

  public rotate(deltaYaw: number, deltaPitch: number): void {
    if (this.isCinematic) return;
    this.manualRotateTimer = 0; // Reset timer on manual camera interaction
    const sens = this.isAiming ? this.sensitivity * 0.65 : this.sensitivity;
    this.yaw -= deltaYaw * 0.0035 * sens;
    // In 1P, forwardY = sin(pitch): moving mouse up (negative deltaPitch) increases pitch to look at sky.
    // In 3P, positive pitch elevates camera above player to look down at ground.
    if (this.isFirstPerson) {
      this.pitch -= deltaPitch * 0.0035 * sens;
    } else {
      this.pitch += deltaPitch * 0.0035 * sens;
    }

    const minP = this.isFirstPerson ? this.minPitchFPP : this.minPitch;
    const maxP = this.isFirstPerson ? this.maxPitchFPP : this.maxPitch;
    this.pitch = Math.max(minP, Math.min(maxP, this.pitch));
  }

  public zoom(delta: number): void {
    if (this.isCinematic) return;
    if (this.isFirstPerson) {
      // Zooming out in first-person smoothly switches back to third-person
      if (delta > 0) {
        this.setPerspectiveMode(false);
        this.distance = this.minDistance;
      }
      return;
    }

    this.distance += delta * 0.005;
    if (this.distance < this.minDistance - 0.5) {
      // Zooming in very close switches to first-person
      this.setPerspectiveMode(true);
      return;
    }
    this.distance = Math.max(this.minDistance, Math.min(this.maxDistance, this.distance));
  }

  public togglePerspective(): boolean {
    return this.setPerspectiveMode(!this.isFirstPerson);
  }

  public setPerspectiveMode(firstPerson: boolean): boolean {
    const prevFpp = this.isFirstPerson;
    this.isFirstPerson = firstPerson;
    this.manualRotateTimer = 0;
    if (prevFpp !== firstPerson) {
      // Flip pitch sign when switching between FPP (forwardY = sin(pitch)) and TPP (offsetY = sin(pitch))
      // Wait: in original TPP, pitch > 0 elevates camera above player (looking down). In FPP, pitch < 0 looks down.
      // Inverting pitch preserves exact eye-line horizon orientation across toggle!
      this.pitch = Math.max(-1.54, Math.min(1.54, -this.pitch));
    } else {
      this.pitch = Math.max(-1.54, Math.min(1.54, this.pitch));
    }
    if (!this.isFirstPerson) {
      this.distance = Math.max(this.minDistance, Math.min(this.maxDistance, this.distance || 6.2));
    }
    return this.isFirstPerson;
  }

  public getYaw(): number {
    return this.yaw;
  }
}
