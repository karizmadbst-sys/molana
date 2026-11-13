/**
 * ECHO – DARK FANTASY REALM
 * Dynamic Day & Night Cycle, Moonlit Twilight SkyDome, Lightning, and Weather Particles
 */

import * as THREE from 'three';
import { DarkTextureSet } from './DarkRealmTextures.ts';

export type DarkWeatherType = 'CLEAR' | 'MIST' | 'RAIN' | 'THUNDERSTORM' | 'EMBERS';

export const WEATHER_LABELS: Record<DarkWeatherType, { en: string; ar: string }> = {
  CLEAR: { en: 'Moonlit Night', ar: 'ليل قمري صافي' },
  MIST: { en: 'Haunted Mist', ar: 'ضباب الأشباح' },
  RAIN: { en: 'Twilight Rain', ar: 'مطر الغسق' },
  THUNDERSTORM: { en: 'Shadow Storm', ar: 'عاصفة رعدية' },
  EMBERS: { en: 'Citadel Embers', ar: 'جمر القلعة' },
};

export class DarkRealmAtmosphere {
  public group: THREE.Group;
  public fog: THREE.FogExp2;

  // Starts at 0.86 = rich moonlit twilight matching the dark fantasy artwork
  public timeOfDay: number = 0.86;
  public cycleDurationSec: number = 360;
  public weather: DarkWeatherType = 'CLEAR';
  private weatherTimer: number = 0;
  private weatherCycleIdx: number = 0;
  private readonly weatherOrder: DarkWeatherType[] = ['CLEAR', 'MIST', 'RAIN', 'THUNDERSTORM', 'EMBERS'];

  private skyMat: THREE.MeshBasicMaterial;
  private skyDome: THREE.Mesh;
  private moonMesh: THREE.Mesh;
  private sunMesh: THREE.Mesh;
  private mainLight: THREE.DirectionalLight;
  private rimLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private ambientLight: THREE.AmbientLight;
  private lightningFlash: number = 0;
  private lightningCooldown: number = 6;
  private sceneRef: THREE.Scene | null = null;
  private readonly moonOffset = new THREE.Vector3(-45, 145, -365);
  private readonly sunOffset = new THREE.Vector3(100, -160, -355);

  private particlePoints: THREE.Points;
  private particlePositions: Float32Array;
  private readonly particleCount: number;

  public onWeatherChanged?: (weather: DarkWeatherType) => void;
  public onThunder?: () => void;

  private readonly tmpColorA = new THREE.Color();
  private readonly tmpColorB = new THREE.Color();

  private particleFrameSkip = 0;
  private isMobile: boolean = false;

  constructor(textures: DarkTextureSet, isMobile: boolean = false) {
    this.isMobile = isMobile;
    this.group = new THREE.Group();
    this.fog = new THREE.FogExp2(0x262148, 0.0020);

    // 1. Twilight SkyDome (sized safely inside farPlane & centered on camera)
    const skyGeo = new THREE.SphereGeometry(480, isMobile ? 16 : 24, isMobile ? 12 : 16);
    this.skyMat = new THREE.MeshBasicMaterial({
      map: textures.skyBackdrop,
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
      color: 0xffffff,
    });
    this.skyDome = new THREE.Mesh(skyGeo, this.skyMat);
    this.skyDome.renderOrder = -100;
    this.skyDome.frustumCulled = false;
    this.group.add(this.skyDome);

    // 2. Large Luminous Moon positioned over the valley/castle skyline
    const moonGeo = new THREE.PlaneGeometry(92, 92);
    const moonMat = new THREE.MeshBasicMaterial({
      map: textures.moon,
      transparent: true,
      depthWrite: false,
      fog: false,
      blending: THREE.NormalBlending,
    });
    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    this.moonMesh.renderOrder = -95;
    this.moonMesh.position.copy(this.moonOffset);
    this.group.add(this.moonMesh);

    // 3. Sun Disc for Dawn / Day phases
    const sunGeo = new THREE.CircleGeometry(30, 20);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xfde68a,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      fog: false,
    });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    this.sunMesh.renderOrder = -95;
    this.sunMesh.position.copy(this.sunOffset);
    this.group.add(this.sunMesh);

    // 4. Realm Lighting (Bright twilight so houses, roads, trees, and monsters stay clearly readable)
    this.hemiLight = new THREE.HemisphereLight(0xa5b4fc, 0x3b355e, 1.55);
    this.ambientLight = new THREE.AmbientLight(0x6c639c, 1.05);
    this.mainLight = new THREE.DirectionalLight(0xc7d2fe, 1.85);
    this.mainLight.position.set(-60, 140, -180);
    this.mainLight.castShadow = !isMobile;
    if (this.mainLight.castShadow) {
      this.mainLight.shadow.mapSize.set(1024, 1024);
      this.mainLight.shadow.camera.near = 10;
      this.mainLight.shadow.camera.far = 360;
      const d = 95;
      this.mainLight.shadow.camera.left = -d;
      this.mainLight.shadow.camera.right = d;
      this.mainLight.shadow.camera.top = d;
      this.mainLight.shadow.camera.bottom = -d;
    }
    this.rimLight = new THREE.DirectionalLight(0x818cf8, 0.72);
    this.rimLight.position.set(80, 75, 110);
    this.rimLight.castShadow = false;
    this.group.add(this.hemiLight, this.ambientLight, this.mainLight, this.mainLight.target, this.rimLight);

    // 5. Weather Particle Field (Rain / Mist / Ash Embers)
    this.particleCount = isMobile ? 110 : 300;
    this.particlePositions = new Float32Array(this.particleCount * 3);
    for (let i = 0; i < this.particleCount; i++) {
      this.particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      this.particlePositions[i * 3 + 1] = Math.random() * 28;
      this.particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(this.particlePositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xa5f3fc,
      size: 0.28,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    this.particlePoints = new THREE.Points(pGeo, pMat);
    this.particlePoints.frustumCulled = false;
    this.group.add(this.particlePoints);

    this.applyLightingForTime();
    this.applyWeatherVisuals();
  }

  public setScene(scene: THREE.Scene): void {
    this.sceneRef = scene;
    this.sceneRef.background = this.fog.color;
  }

  public setTimeOfDay(t: number): void {
    this.timeOfDay = ((t % 1) + 1) % 1;
    this.applyLightingForTime();
  }

  public setWeather(w: DarkWeatherType): void {
    if (this.weather === w) return;
    this.weather = w;
    this.weatherTimer = 0;
    this.applyWeatherVisuals();
    this.onWeatherChanged?.(w);
  }

  public cycleWeather(): DarkWeatherType {
    this.weatherCycleIdx = (this.weatherCycleIdx + 1) % this.weatherOrder.length;
    this.setWeather(this.weatherOrder[this.weatherCycleIdx]);
    return this.weather;
  }

  public getPhaseLabel(): { en: string; ar: string } {
    const t = this.timeOfDay;
    if (t >= 0.22 && t < 0.34) return { en: 'Dawn Twilight', ar: 'فجر الغسق' };
    if (t >= 0.34 && t < 0.68) return { en: 'Eclipsed Day', ar: 'نهار خافت' };
    if (t >= 0.68 && t < 0.80) return { en: 'Crimson Dusk', ar: 'غروب قرمزي' };
    return { en: 'Moonlit Night', ar: 'ليل قمري' };
  }

  private applyWeatherVisuals(): void {
    const pMat = this.particlePoints.material as THREE.PointsMaterial;
    switch (this.weather) {
      case 'CLEAR':
        pMat.color.setHex(0xc4b5fd);
        pMat.size = 0.24;
        pMat.opacity = 0.42;
        this.fog.density = 0.0020;
        break;
      case 'MIST':
        pMat.color.setHex(0x94a3b8);
        pMat.size = 0.55;
        pMat.opacity = 0.36;
        this.fog.density = 0.0040;
        break;
      case 'RAIN':
        pMat.color.setHex(0x7dd3fc);
        pMat.size = 0.28;
        pMat.opacity = 0.72;
        this.fog.density = 0.0032;
        break;
      case 'THUNDERSTORM':
        pMat.color.setHex(0x93c5fd);
        pMat.size = 0.32;
        pMat.opacity = 0.85;
        this.fog.density = 0.0038;
        break;
      case 'EMBERS':
        pMat.color.setHex(0xfb7185);
        pMat.size = 0.32;
        pMat.opacity = 0.82;
        this.fog.density = 0.0028;
        break;
    }
  }

  private applyLightingForTime(): void {
    // Sun/Moon angle across sky (0.5 = noon, 0.0/1.0 = midnight, 0.86 = rich moonlit night)
    const theta = (this.timeOfDay - 0.25) * Math.PI * 2;
    const sunH = Math.sin(theta);
    const dayAmount = THREE.MathUtils.clamp((sunH + 0.25) / 1.15, 0, 1);

    // Keep moon in majestic sky arc opposite the sun relative to camera
    const moonX = -45 + Math.cos(theta + Math.PI) * 110;
    const moonY = Math.max(-110, 95 + Math.sin(theta + Math.PI) * 115);
    this.moonOffset.set(moonX, moonY, -365);
    this.moonMesh.visible = moonY > -30;

    const sunX = Math.cos(theta) * 180;
    const sunY = sunH * 195;
    this.sunOffset.set(sunX, sunY, -355);
    this.sunMesh.visible = sunY > -20;

    // Sky & Fog colors blend between Deep Purple Moonlit Twilight and Luminous Dusk
    this.tmpColorA.setHex(0x262148);
    this.tmpColorB.setHex(0x5b588f);
    this.fog.color.copy(this.tmpColorA).lerp(this.tmpColorB, dayAmount);
    if (this.sceneRef && this.sceneRef.fog === this.fog) {
      this.sceneRef.background = this.fog.color;
    }

    this.tmpColorA.setHex(0xdcd6ff);
    this.tmpColorB.setHex(0xffffff);
    this.skyMat.color.copy(this.tmpColorA).lerp(this.tmpColorB, dayAmount);

    this.hemiLight.intensity = THREE.MathUtils.lerp(1.5, 2.0, dayAmount);
    this.ambientLight.intensity = THREE.MathUtils.lerp(1.05, 1.4, dayAmount);
    this.mainLight.intensity = THREE.MathUtils.lerp(1.85, 2.45, dayAmount) + this.lightningFlash;

    if (dayAmount > 0.45) {
      this.mainLight.color.setHex(0xfef3c7);
    } else {
      this.mainLight.color.setHex(0xc7d2fe);
    }
  }

  public update(dt: number, playerPos: THREE.Vector3, cameraPos: THREE.Vector3): void {
    // Advance Day & Night cycle smoothly
    this.timeOfDay = (this.timeOfDay + dt / this.cycleDurationSec) % 1;

    // Advance automatic Weather cycle every 85 seconds
    this.weatherTimer += dt;
    if (this.weatherTimer > 85) {
      this.cycleWeather();
    }

    // Lightning in thunderstorm weather
    if (this.weather === 'THUNDERSTORM') {
      this.lightningCooldown -= dt;
      if (this.lightningCooldown <= 0) {
        this.lightningFlash = 4.2;
        this.lightningCooldown = 7 + Math.random() * 11;
        this.onThunder?.();
      }
    }
    if (this.lightningFlash > 0) {
      this.lightningFlash = Math.max(0, this.lightningFlash - dt * 11);
    }

    this.applyLightingForTime();

    // Keep shadow camera centered around player so shadows stay sharp anywhere in the 2000m world
    this.mainLight.position.set(playerPos.x - 45, playerPos.y + 85, playerPos.z - 65);
    this.mainLight.target.position.copy(playerPos);
    this.mainLight.target.updateMatrixWorld();

    // Keep skyDome, Moon & Sun centered on camera so they never clip at far plane
    this.skyDome.position.copy(cameraPos);
    this.moonMesh.position.copy(cameraPos).add(this.moonOffset);
    this.sunMesh.position.copy(cameraPos).add(this.sunOffset);
    this.moonMesh.lookAt(cameraPos);
    this.sunMesh.lookAt(cameraPos);

    // Animate weather particles around player (throttled on mobile)
    if (this.isMobile) {
      this.particleFrameSkip = (this.particleFrameSkip + 1) & 1;
      if (this.particleFrameSkip === 1) return;
    }
    const pDt = this.isMobile ? dt * 2 : dt;
    const isRain = this.weather === 'RAIN' || this.weather === 'THUNDERSTORM';
    const isEmbers = this.weather === 'EMBERS';
    const fallSpeed = isRain ? 22.0 : isEmbers ? -2.2 : 1.4;
    const driftX = isRain ? -2.8 : isEmbers ? 1.8 : 0.9;

    const attr = this.particlePoints.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < this.particleCount; i++) {
      const ix = i * 3;
      arr[ix] += driftX * pDt;
      arr[ix + 1] -= fallSpeed * pDt;

      if (arr[ix + 1] < -2) arr[ix + 1] = 26;
      if (arr[ix + 1] > 28) arr[ix + 1] = 0;

      // Wrap relative to player position
      const dx = arr[ix] - playerPos.x;
      const dz = arr[ix + 2] - playerPos.z;
      if (dx > 30) arr[ix] -= 60;
      else if (dx < -30) arr[ix] += 60;
      if (dz > 30) arr[ix + 2] -= 60;
      else if (dz < -30) arr[ix + 2] += 60;

      if (Math.abs(arr[ix + 1] - playerPos.y) > 28) {
        arr[ix + 1] = playerPos.y + Math.random() * 24;
      }
    }
    attr.needsUpdate = true;
  }

  public dispose(): void {
    this.skyMat.dispose();
    (this.moonMesh.material as THREE.Material).dispose();
    (this.sunMesh.material as THREE.Material).dispose();
    this.particlePoints.geometry.dispose();
    (this.particlePoints.material as THREE.Material).dispose();
  }
}
