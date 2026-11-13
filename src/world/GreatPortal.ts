/**
 * ECHO – THE WORLD REMEMBERS
 * The Great Stone Portal (البوابة الحجرية الضخمة)
 * Monolithic gateway with 7 ancient rune sockets that ignite as crystals are gathered,
 * and a swirling celestial vortex.
 */

import * as THREE from 'three';
import { Terrain } from './Terrain.ts';
import { WorldObstacle } from './Forest.ts';
import { PooledPointLightProxy } from './WorldLightPool.ts';

export class GreatPortal {
  public group: THREE.Group;
  public obstacles: WorldObstacle[] = [];
  private vortexRings: THREE.Mesh[] = [];
  private runeMeshes: THREE.Mesh[] = [];
  private portalLight: PooledPointLightProxy;
  private particleVortex: THREE.Points;
  private particleCount = 140;
  private particleAngles: Float32Array;
  private particleRadii: Float32Array;
  private particleSpeeds: Float32Array;
  private isFullyAwakened: boolean = false;
  private bannerGroup!: THREE.Group;
  private bannerCanvas!: HTMLCanvasElement;
  private bannerCtx!: CanvasRenderingContext2D;
  private bannerTexture!: THREE.CanvasTexture;
  private bannerBaseY = 22.9;
  private lastBannerCount = -1;
  private readonly center: THREE.Vector3;
  private readonly baseY: number;
  private readonly cosR: number;
  private readonly sinR: number;

  public static getStairFootWorldPos(): { x: number; z: number } {
    const ry = -Math.PI * 0.65;
    const dist = 13.2;
    return {
      x: Terrain.PORTAL_POS.x + dist * Math.sin(ry),
      z: Terrain.PORTAL_POS.z + dist * Math.cos(ry),
    };
  }

  constructor(terrain: Terrain) {
    this.group = new THREE.Group();

    const center = Terrain.PORTAL_POS;
    const baseY = terrain.getMeshHeightAt(center.x, center.z);
    const ry = -Math.PI * 0.65;
    this.center = center.clone();
    this.baseY = baseY;
    this.cosR = Math.cos(ry);
    this.sinR = Math.sin(ry);

    this.group.position.set(center.x, baseY, center.z);
    // Face towards the center of the island / lake
    this.group.rotation.y = ry;

    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x484b55,
      roughness: 0.85,
      metalness: 0.15,
    });

    const carvedStoneMat = new THREE.MeshStandardMaterial({
      color: 0x3b3d45,
      roughness: 0.9,
      metalness: 0.1,
    });

    // 1. Megalithic Foundation Platform (deep stone skirt anchored 3.8m below terrain surface)
    const floorY = 1.8;
    const skirtHeight = 5.6;
    const platGeo = new THREE.BoxGeometry(24, skirtHeight, 14);
    const platform = new THREE.Mesh(platGeo, stoneMat);
    platform.position.y = floorY - skirtHeight / 2;
    platform.receiveShadow = true;
    platform.castShadow = true;
    this.group.add(platform);

    // 1b. Grand Front Stone Staircase (+Z facing the island & road approach)
    const stairWidth = 9.0;
    const stepCount = 6;
    const zStart = 7.0;
    const zEnd = 13.0;
    const stepDepth = (zEnd - zStart) / stepCount;
    for (let s = 0; s < stepCount; s++) {
      const topY = floorY - s * (floorY / stepCount);
      const slabHeight = Math.max(0.4, topY + 2.0);
      const stepGeo = new THREE.BoxGeometry(stairWidth, slabHeight, stepDepth + 0.12);
      const stepMesh = new THREE.Mesh(stepGeo, s % 2 === 0 ? stoneMat : carvedStoneMat);
      stepMesh.position.set(0, topY - slabHeight / 2, zStart + (s + 0.5) * stepDepth);
      stepMesh.receiveShadow = true;
      stepMesh.castShadow = true;
      this.group.add(stepMesh);
    }

    // Flanking stone stair balustrades + glowing entrance braziers (keep central 8.4m clear)
    const postGeo = new THREE.BoxGeometry(1.1, 2.2, 6.2);
    const brazierBowlGeo = new THREE.CylinderGeometry(0.42, 0.25, 0.35, 8);
    const brazierOrbGeo = new THREE.OctahedronGeometry(0.24, 0);
    const brazierOrbMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4 });

    for (const side of [-1, 1]) {
      const lx = side * 5.05;
      const parapet = new THREE.Mesh(postGeo, carvedStoneMat);
      parapet.position.set(lx, floorY - 0.5, 9.9);
      parapet.castShadow = true;
      parapet.receiveShadow = true;
      this.group.add(parapet);

      // Entrance brazier pillar at foot of stairs
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.8, 0.95), stoneMat);
      pillar.position.set(lx, 0.4, 12.6);
      pillar.castShadow = true;
      this.group.add(pillar);

      const bowl = new THREE.Mesh(brazierBowlGeo, carvedStoneMat);
      bowl.position.set(lx, 1.95, 12.6);
      this.group.add(bowl);

      const flame = new THREE.Mesh(brazierOrbGeo, brazierOrbMat);
      flame.position.set(lx, 2.28, 12.6);
      this.group.add(flame);

      // Stair post collision obstacle (world space)
      this.obstacles.push({
        x: center.x + lx * this.cosR + 10.6 * this.sinR,
        z: center.z - lx * this.sinR + 10.6 * this.cosR,
        radius: 0.75,
      });
    }

    // 2. Colossal Twin Pillars (Left and Right)
    const pillarWidth = 3.2;
    const pillarDepth = 3.6;
    const pillarHeight = 14.0;
    const pillarSpacing = 10.0;

    const leftCol = this.createMegalithPillar(pillarWidth, pillarHeight, pillarDepth, stoneMat, carvedStoneMat);
    leftCol.position.set(-pillarSpacing / 2, floorY, 0);
    this.group.add(leftCol);

    const rightCol = this.createMegalithPillar(pillarWidth, pillarHeight, pillarDepth, stoneMat, carvedStoneMat);
    rightCol.position.set(pillarSpacing / 2, floorY, 0);
    this.group.add(rightCol);

    // Exact rotated world coordinates for left/right pillars (central arch remains open!)
    const halfSpan = pillarSpacing / 2;
    this.obstacles.push(
      {
        x: center.x - halfSpan * this.cosR,
        z: center.z + halfSpan * this.sinR,
        radius: 1.9,
      },
      {
        x: center.x + halfSpan * this.cosR,
        z: center.z - halfSpan * this.sinR,
        radius: 1.9,
      }
    );

    // 3. Colossal Lintel (Top Arch Stone)
    const lintelGeo = new THREE.BoxGeometry(pillarSpacing + pillarWidth + 4, 3.2, 4.4);
    const lintel = new THREE.Mesh(lintelGeo, stoneMat);
    lintel.position.set(0, floorY + pillarHeight + 1.6, 0);
    lintel.castShadow = true;
    this.group.add(lintel);

    // Top Crown Pediment
    const crownGeo = new THREE.ConeGeometry(pillarSpacing * 0.7, 3.4, 4);
    crownGeo.rotateY(Math.PI / 4);
    const crown = new THREE.Mesh(crownGeo, stoneMat);
    crown.position.set(0, floorY + pillarHeight + 4.9, 0);
    this.group.add(crown);

    // Floating Arabic Portal Banner ("اجمع سبعة بلورات لفتح البوابة" + "0 / 7")
    this.bannerBaseY = floorY + pillarHeight + 7.6;
    this.createCrystalBanner(this.bannerBaseY);

    // 4. 7 Ancient Rune Sockets (3 on left pillar, 3 on right pillar, 1 on lintel apex)
    this.createRuneSockets(pillarSpacing, floorY, pillarHeight);

    // 5. Swirling Celestial Vortex
    this.createPortalVortex(floorY, pillarHeight);

    // 6. Portal Glow Light (pooled)
    this.portalLight = new PooledPointLightProxy(0x00f0ff, 2.5, 35);
    this.portalLight.position.set(0, floorY + pillarHeight * 0.5, 1.2);
    this.group.add(this.portalLight);

    // 7. Swirling Energy Stardust Particles
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(this.particleCount * 3);
    this.particleAngles = new Float32Array(this.particleCount);
    this.particleRadii = new Float32Array(this.particleCount);
    this.particleSpeeds = new Float32Array(this.particleCount);

    for (let i = 0; i < this.particleCount; i++) {
      this.particleAngles[i] = Math.random() * Math.PI * 2;
      this.particleRadii[i] = 1.2 + Math.random() * 4.2;
      this.particleSpeeds[i] = 0.8 + Math.random() * 1.5;

      pPos[i * 3] = Math.cos(this.particleAngles[i]) * this.particleRadii[i];
      pPos[i * 3 + 1] = floorY + pillarHeight * 0.5 + Math.sin(this.particleAngles[i]) * (this.particleRadii[i] * 1.3);
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pTexture = this.createParticleTexture();
    const pMat = new THREE.PointsMaterial({
      size: 0.45,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x88ffff,
    });

    this.particleVortex = new THREE.Points(pGeo, pMat);
    this.group.add(this.particleVortex);
  }

  private createMegalithPillar(w: number, h: number, d: number, mat1: THREE.Material, mat2: THREE.Material): THREE.Group {
    const col = new THREE.Group();

    // Main column
    const mainGeo = new THREE.BoxGeometry(w, h, d);
    const main = new THREE.Mesh(mainGeo, mat1);
    main.position.y = h / 2;
    main.castShadow = true;
    main.receiveShadow = true;
    col.add(main);

    // Carved runic bands (accent details)
    const bandGeo = new THREE.BoxGeometry(w + 0.3, 0.6, d + 0.3);
    for (let b = 1; b <= 3; b++) {
      const band = new THREE.Mesh(bandGeo, mat2);
      band.position.y = b * (h / 4);
      col.add(band);
    }

    return col;
  }

  private createRuneSockets(spacing: number, floorY: number, height: number): void {
    const socketGeo = new THREE.OctahedronGeometry(0.55);

    // 7 sockets layout:
    // Sockets 0, 1, 2 on left pillar
    // Sockets 3 on lintel apex
    // Sockets 4, 5, 6 on right pillar
    const socketPositions: [number, number, number][] = [
      [-spacing / 2, floorY + height * 0.3, 1.9],
      [-spacing / 2, floorY + height * 0.55, 1.9],
      [-spacing / 2, floorY + height * 0.8, 1.9],
      [0, floorY + height + 2.2, 2.3],
      [spacing / 2, floorY + height * 0.8, 1.9],
      [spacing / 2, floorY + height * 0.55, 1.9],
      [spacing / 2, floorY + height * 0.3, 1.9],
    ];

    socketPositions.forEach(([x, y, z]) => {
      // Inactive dormant rune
      const runeMat = new THREE.MeshStandardMaterial({
        color: 0x223344,
        emissive: 0x112233,
        emissiveIntensity: 0.1,
        roughness: 0.4,
        metalness: 0.8,
      });

      const rune = new THREE.Mesh(socketGeo, runeMat);
      rune.position.set(x, y, z);
      this.group.add(rune);
      this.runeMeshes.push(rune);
    });
  }

  private createPortalVortex(floorY: number, pillarHeight: number): void {
    // 3 concentric energy rings
    const ringRadii = [4.8, 3.6, 2.4];
    const ringColors = [0x00f0ff, 0x4895ef, 0x7209b7];

    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.22, 16, 48);
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColors[idx],
        emissive: ringColors[idx],
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.75,
        roughness: 0.1,
      });

      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, floorY + pillarHeight * 0.5, 0);
      ring.scale.set(1.0, 1.35, 1.0); // Oval portal shape
      this.group.add(ring);
      this.vortexRings.push(ring);
    });

    // Central semi-transparent vortex backdrop
    const vortexBackGeo = new THREE.CircleGeometry(4.6, 32);
    const vortexBackMat = new THREE.MeshBasicMaterial({
      color: 0x002244,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    });
    const vortexBack = new THREE.Mesh(vortexBackGeo, vortexBackMat);
    vortexBack.scale.set(1.0, 1.35, 1.0);
    vortexBack.position.set(0, floorY + pillarHeight * 0.5, 0);
    this.group.add(vortexBack);
  }

  private createParticleTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.4, 'rgba(0, 240, 255, 0.9)');
    grad.addColorStop(0.8, 'rgba(100, 150, 255, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    return new THREE.CanvasTexture(canvas);
  }

  private createCrystalBanner(bannerY: number): void {
    this.bannerGroup = new THREE.Group();
    this.bannerGroup.position.set(0, bannerY, 1.3);

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 336;
    this.bannerCanvas = canvas;
    this.bannerCtx = canvas.getContext('2d')!;

    this.bannerTexture = new THREE.CanvasTexture(canvas);
    this.bannerTexture.colorSpace = THREE.SRGBColorSpace;
    this.bannerTexture.minFilter = THREE.LinearFilter;
    this.bannerTexture.magFilter = THREE.LinearFilter;

    this.updateBannerCanvas(0);

    const planeGeo = new THREE.PlaneGeometry(13.6, 4.45);
    const planeMat = new THREE.MeshBasicMaterial({
      map: this.bannerTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const signMesh = new THREE.Mesh(planeGeo, planeMat);
    this.bannerGroup.add(signMesh);
    this.group.add(this.bannerGroup);
  }

  private updateBannerCanvas(activeCount: number): void {
    if (this.lastBannerCount === activeCount || !this.bannerCtx) return;
    this.lastBannerCount = activeCount;

    const ctx = this.bannerCtx;
    const w = this.bannerCanvas.width;
    const h = this.bannerCanvas.height;
    const unlocked = activeCount >= 7;

    ctx.clearRect(0, 0, w, h);

    // Rounded purple-framed translucent card
    const pad = 22;
    const bw = w - pad * 2;
    const bh = h - pad * 2;
    const r = 24;

    const drawRoundRect = (x: number, y: number, rw: number, rh: number, rad: number) => {
      ctx.beginPath();
      ctx.moveTo(x + rad, y);
      ctx.lineTo(x + rw - rad, y);
      ctx.quadraticCurveTo(x + rw, y, x + rw, y + rad);
      ctx.lineTo(x + rw, y + rh - rad);
      ctx.quadraticCurveTo(x + rw, y + rh, x + rw - rad, y + rh);
      ctx.lineTo(x + rad, y + rh);
      ctx.quadraticCurveTo(x, y + rh, x, y + rh - rad);
      ctx.lineTo(x, y + rad);
      ctx.quadraticCurveTo(x, y, x + rad, y);
      ctx.closePath();
    };

    ctx.save();
    ctx.shadowColor = unlocked ? 'rgba(0, 245, 212, 0.85)' : 'rgba(168, 85, 247, 0.9)';
    ctx.shadowBlur = 24;
    drawRoundRect(pad, pad, bw, bh, r);
    const bgGrad = ctx.createLinearGradient(0, pad, 0, pad + bh);
    bgGrad.addColorStop(0, unlocked ? 'rgba(12, 34, 48, 0.92)' : 'rgba(20, 12, 46, 0.92)');
    bgGrad.addColorStop(1, unlocked ? 'rgba(8, 22, 34, 0.92)' : 'rgba(12, 8, 30, 0.92)');
    ctx.fillStyle = bgGrad;
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = unlocked ? '#00f5d4' : '#b86bff';
    ctx.stroke();
    ctx.restore();

    // Inner accent border
    drawRoundRect(pad + 10, pad + 10, bw - 20, bh - 20, r - 8);
    ctx.lineWidth = 2;
    ctx.strokeStyle = unlocked ? 'rgba(0, 245, 212, 0.45)' : 'rgba(232, 121, 249, 0.45)';
    ctx.stroke();

    // Glowing crystal cluster icon on the left side
    const cx = 132;
    const cy = h * 0.48;
    const drawShard = (ox: number, oy: number, sx: number, sy: number, rot: number, fillA: string, fillB: string) => {
      ctx.save();
      ctx.translate(cx + ox, cy + oy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(0, -sy);
      ctx.lineTo(sx, -sy * 0.2);
      ctx.lineTo(sx * 0.72, sy * 0.85);
      ctx.lineTo(0, sy);
      ctx.lineTo(-sx * 0.72, sy * 0.85);
      ctx.lineTo(-sx, -sy * 0.2);
      ctx.closePath();
      const grad = ctx.createLinearGradient(-sx, -sy, sx, sy);
      grad.addColorStop(0, fillA);
      grad.addColorStop(1, fillB);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = unlocked ? '#a5f3fc' : '#f5d0fe';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();
    };
    drawShard(-26, 12, 18, 40, -0.35, unlocked ? '#22d3ee' : '#c084fc', unlocked ? '#0891b2' : '#7e22ce');
    drawShard(28, 16, 17, 36, 0.38, unlocked ? '#2dd4bf' : '#e879f9', unlocked ? '#0f766e' : '#9333ea');
    drawShard(0, -4, 24, 58, 0.0, unlocked ? '#67e8f9' : '#f0abfc', unlocked ? '#06b6d4' : '#a855f7');

    // Arabic requirement text centered to the right of crystal icon
    const textCenterX = w * 0.56;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.direction = 'rtl';

    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 10;
    ctx.font = '800 50px "Cairo", "Tajawal", "Segoe UI", Tahoma, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('اجمع سبعة بلورات', textCenterX, 102);

    ctx.font = '800 48px "Cairo", "Tajawal", "Segoe UI", Tahoma, sans-serif';
    ctx.fillStyle = unlocked ? '#00f5d4' : '#fbbf24';
    ctx.fillText(unlocked ? 'البوابة مفتوحة الآن' : 'لفتح البوابة', textCenterX, 168);

    // Divider line above counter
    ctx.shadowBlur = 0;
    ctx.strokeStyle = unlocked ? 'rgba(0, 245, 212, 0.35)' : 'rgba(192, 132, 252, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.34, 214);
    ctx.lineTo(w * 0.78, 214);
    ctx.stroke();

    // Live 0 / 7 counter
    ctx.direction = 'ltr';
    ctx.shadowColor = unlocked ? 'rgba(0, 245, 212, 0.85)' : 'rgba(168, 85, 247, 0.75)';
    ctx.shadowBlur = 12;
    ctx.font = '900 56px "Outfit", "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = unlocked ? '#00f5d4' : '#ffffff';
    ctx.fillText(`${activeCount} / 7`, textCenterX, 262);
    ctx.shadowBlur = 0;

    this.bannerTexture.needsUpdate = true;
  }

  /**
   * Returns floor height for the Great Portal's raised platform and front staircase,
   * or null if (worldX, worldZ) lies outside the structure.
   */
  public getFloorHeightAt(worldX: number, worldZ: number): number | null {
    const dx = worldX - this.center.x;
    const dz = worldZ - this.center.z;
    if (dx * dx + dz * dz > 17.5 * 17.5) return null;

    const lx = dx * this.cosR - dz * this.sinR;
    const lz = dx * this.sinR + dz * this.cosR;

    // Raised stone platform (24 x 14)
    if (Math.abs(lx) <= 12.1 && Math.abs(lz) <= 7.1) {
      return this.baseY + 1.8;
    }

    // Front grand stone staircase (+Z ramp from lz=13.0 up to lz=7.0)
    if (Math.abs(lx) <= 4.6 && lz > 7.1 && lz <= 13.1) {
      const t = Math.max(0, Math.min(1, (13.1 - lz) / (13.1 - 7.1)));
      return this.baseY + t * 1.8;
    }

    return null;
  }

  /**
   * Updates illuminated rune sockets as player gathers Echo Crystals (0 to 7)
   */
  public updateCrystalProgress(collectedCount: number): void {
    const activeCount = Math.min(collectedCount, 7);

    for (let i = 0; i < 7; i++) {
      const rune = this.runeMeshes[i];
      const mat = rune.material as THREE.MeshStandardMaterial;

      if (i < activeCount) {
        // Awakened glowing rune
        mat.color.setHex(0x00ffff);
        mat.emissive.setHex(0x00f0ff);
        mat.emissiveIntensity = 2.2;
      } else {
        mat.color.setHex(0x223344);
        mat.emissive.setHex(0x112233);
        mat.emissiveIntensity = 0.1;
      }
    }

    if (activeCount >= 7 && !this.isFullyAwakened) {
      this.isFullyAwakened = true;
      this.portalLight.color.setHex(0x00ffff);
      this.portalLight.intensity = 8.5;
    } else if (activeCount < 7 && this.isFullyAwakened) {
      this.isFullyAwakened = false;
      this.portalLight.color.setHex(0x00f0ff);
      this.portalLight.intensity = 2.5;
    }

    this.updateBannerCanvas(activeCount);
  }

  public update(time: number): void {
    if (this.bannerGroup) {
      this.bannerGroup.position.y = this.bannerBaseY + Math.sin(time * 1.8) * 0.16;
    }

    // Rotate vortex rings in opposing directions
    this.vortexRings.forEach((ring, idx) => {
      const dir = idx % 2 === 0 ? 1 : -1;
      ring.rotation.z += 0.012 * dir * (idx + 1);
      const pulse = 1.0 + Math.sin(time * 2.5 + idx) * 0.04;
      ring.scale.set(pulse, pulse * 1.35, pulse);
    });

    // Animate stardust particles spiraling into portal
    const pos = this.particleVortex.geometry.attributes.position;
    const floorY = 1.8;
    const pillarHeight = 14.0;

    for (let i = 0; i < this.particleCount; i++) {
      this.particleAngles[i] += this.particleSpeeds[i] * 0.025;
      // Slowly spiral inwards then reset
      this.particleRadii[i] -= 0.012;
      if (this.particleRadii[i] < 0.6) {
        this.particleRadii[i] = 4.4;
      }

      const px = Math.cos(this.particleAngles[i]) * this.particleRadii[i];
      const py = floorY + pillarHeight * 0.5 + Math.sin(this.particleAngles[i]) * (this.particleRadii[i] * 1.3);
      pos.setX(i, px);
      pos.setY(i, py);
    }
    pos.needsUpdate = true;

    // Portal light pulse
    const baseIntensity = this.isFullyAwakened ? 8.0 : 2.5;
    this.portalLight.intensity = baseIntensity + Math.sin(time * 3.0) * 0.8;
  }
}
