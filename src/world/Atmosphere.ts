/**
 * ECHO – THE WORLD REMEMBERS
 * Cinematic Atmosphere, Sky Dome, Lighting Rig & Horizon Fog
 */

import * as THREE from 'three';

export class Atmosphere {
  public group: THREE.Group;
  public dirLight: THREE.DirectionalLight;
  public hemiLight: THREE.HemisphereLight;
  private fireflies: THREE.Points;
  private fireflyPositions: Float32Array;
  private fireflySpeeds: Float32Array;
  private fireflyCount: number = 380;
  private sceneRef: THREE.Scene;
  private skyDome: THREE.Mesh;

  public applyQuality(shadows: boolean, shadowSize: number, fogDensity: number, maxParticles: number): void {
    this.dirLight.castShadow = shadows;
    if (shadows && this.dirLight.shadow.mapSize.width !== shadowSize) {
      this.dirLight.shadow.mapSize.width = shadowSize;
      this.dirLight.shadow.mapSize.height = shadowSize;
      if (this.dirLight.shadow.map) {
        this.dirLight.shadow.map.dispose();
        (this.dirLight.shadow as any).map = null;
      }
    }

    if (this.sceneRef.fog && 'density' in this.sceneRef.fog) {
      (this.sceneRef.fog as THREE.FogExp2).density = fogDensity;
    }

    if (this.fireflies && this.fireflies.geometry) {
      const activeCount = Math.min(this.fireflyCount, maxParticles);
      this.fireflies.geometry.setDrawRange(0, activeCount);
    }
  }

  constructor(scene: THREE.Scene, isMobile: boolean = false) {
    this.sceneRef = scene;
    this.group = new THREE.Group();

    // 1. Cinematic Horizon Fog (Matching twilight sky hue with expansive draw distance)
    const fogColor = new THREE.Color(0x0e1c2b);
    scene.fog = new THREE.FogExp2(fogColor, 0.0011);
    scene.background = fogColor;

    // 2. Vast Celestial Sky Dome with Stars & Nebula (sized inside camera far plane & centered on camera)
    const skyGeo = new THREE.SphereGeometry(680, isMobile ? 18 : 28, isMobile ? 14 : 20);
    const skyMat = new THREE.MeshBasicMaterial({
      map: this.createSkyTexture(isMobile),
      side: THREE.BackSide,
      depthWrite: false,
      fog: false,
    });
    this.skyDome = new THREE.Mesh(skyGeo, skyMat);
    this.skyDome.renderOrder = -100;
    this.skyDome.frustumCulled = false;
    this.group.add(this.skyDome);

    // 3. Three-point Lighting Rig:
    // Warm key directional light (Sunset/Dusk golden rim) with mobile-optimized shadow frustum
    this.dirLight = new THREE.DirectionalLight(0xffdfba, 2.2);
    this.dirLight.position.set(-140, 140, -100);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 1024;
    this.dirLight.shadow.mapSize.height = 1024;
    this.dirLight.shadow.camera.near = 10;
    this.dirLight.shadow.camera.far = 450;
    const d = 135;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.dirLight.shadow.bias = -0.0008;
    this.dirLight.shadow.normalBias = 0.03;
    this.group.add(this.dirLight);
    this.group.add(this.dirLight.target);

    // Cool celestial sky / warm ground HemisphereLight fill
    this.hemiLight = new THREE.HemisphereLight(0x2d5a88, 0x1a2e1d, 1.4);
    this.group.add(this.hemiLight);

    // Subtle soft rim backlight
    const rimLight = new THREE.DirectionalLight(0x40916c, 0.6);
    rimLight.position.set(160, 80, 140);
    this.group.add(rimLight);

    // Solid ambient baseline light
    const ambLight = new THREE.AmbientLight(0x4a6d8c, 1.2);
    this.group.add(ambLight);

    // 4. Continent-Wide Ambient Fireflies / Stardust Motes
    const fGeo = new THREE.BufferGeometry();
    this.fireflyCount = isMobile ? 90 : 280;
    this.fireflyPositions = new Float32Array(this.fireflyCount * 3);
    this.fireflySpeeds = new Float32Array(this.fireflyCount);

    for (let i = 0; i < this.fireflyCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 880;
      this.fireflyPositions[i * 3] = Math.cos(angle) * radius;
      this.fireflyPositions[i * 3 + 1] = 4 + Math.random() * 26;
      this.fireflyPositions[i * 3 + 2] = Math.sin(angle) * radius;
      this.fireflySpeeds[i] = 0.5 + Math.random() * 1.0;
    }

    fGeo.setAttribute('position', new THREE.BufferAttribute(this.fireflyPositions, 3));

    const fTexture = this.createFireflyTexture();
    const fMat = new THREE.PointsMaterial({
      size: 0.6,
      map: fTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x99ffe0,
    });

    this.fireflies = new THREE.Points(fGeo, fMat);
    this.group.add(this.fireflies);
  }

  private createSkyTexture(isMobile: boolean = false): THREE.CanvasTexture {
    const w = isMobile ? 512 : 1024;
    const h = isMobile ? 256 : 512;
    const scale = w / 1024;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;

    // Gradient from deep space twilight down to dusk horizon
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#060a12');     // Deep void zenith
    grad.addColorStop(0.35, '#0b1624');  // Indigo dusk
    grad.addColorStop(0.7, '#11293e');   // Atmospheric cyan-navy
    grad.addColorStop(0.9, '#1a3b4f');   // Horizon glow
    grad.addColorStop(1, '#0e1c2b');     // Fog line

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Distant soft nebula cloud
    const neb = ctx.createRadialGradient(680 * scale, 180 * scale, 20 * scale, 680 * scale, 180 * scale, 240 * scale);
    neb.addColorStop(0, 'rgba(80, 180, 210, 0.35)');
    neb.addColorStop(0.5, 'rgba(120, 90, 200, 0.15)');
    neb.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = neb;
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = '#ffffff';
    const starCount = isMobile ? 420 : 750;
    for (let s = 0; s < starCount; s++) {
      const sx = Math.random() * w;
      const sy = Math.random() * (380 * scale);
      const radius = Math.random() > 0.95 ? 1.5 * Math.max(0.7, scale) : 0.8 * Math.max(0.7, scale);
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
  }

  private createFireflyTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(100, 255, 200, 0.8)');
    grad.addColorStop(0.7, 'rgba(50, 200, 150, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }

  private fireflyFrameCounter: number = 0;

  public update(time: number, playerPos?: THREE.Vector3, cameraPos?: THREE.Vector3): void {
    // Keep sky dome centered around active camera so it never clips at far plane
    const center = cameraPos || playerPos;
    if (center) {
      this.skyDome.position.copy(center);
    }

    // Dynamically center directional shadow light over player position
    if (playerPos) {
      this.dirLight.position.set(playerPos.x - 120, playerPos.y + 130, playerPos.z - 80);
      this.dirLight.target.position.set(playerPos.x, playerPos.y, playerPos.z);
    }

    // Drifting fireflies (Throttle position buffer re-uploads to every 2nd frame for 50% CPU savings)
    this.fireflyFrameCounter++;
    if (this.fireflyFrameCounter % 2 === 0) {
      const pos = this.fireflies.geometry.attributes.position;
      const step = 2; // Stride for smooth low-overhead motes
      for (let i = 0; i < this.fireflyCount; i += step) {
        let y = pos.getY(i) + Math.sin(time * this.fireflySpeeds[i] + i) * 0.04;
        if (y < 2) y = 14;
        if (y > 35) y = 6;
        pos.setY(i, y);

        const x = pos.getX(i) + Math.cos(time * 0.5 + i) * 0.03;
        const z = pos.getZ(i) + Math.sin(time * 0.5 + i) * 0.03;
        pos.setX(i, x);
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }
  }
}
