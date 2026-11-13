/**
 * ECHO – THE WORLD REMEMBERS
 * Procedural Island Terrain & Ocean
 * Generates continuous elevation, slopes, procedural ground texture, and ocean water.
 */

import * as THREE from 'three';

export interface TerrainHeights {
  getHeightAt(x: number, z: number): number;
  getNormalAt(x: number, z: number): THREE.Vector3;
}

export class Terrain {
  public mesh: THREE.Mesh;
  public oceanMesh: THREE.Mesh;
  public group: THREE.Group;
  private size: number = 2400;
  private segments: number = 200;
  private heightData: Float32Array;
  private oceanTexture!: THREE.CanvasTexture;
  private oceanUniforms = {
    uTime: { value: 0 },
    uCamPos: { value: new THREE.Vector3(0, 6, 80) },
  };

  private readonly portalTerraceY: number;
  private readonly templeTerraceY: number;

  // Island landmarks & Water Level
  public static readonly WATER_LEVEL = 1.6;
  public static readonly LAKE_CENTER = new THREE.Vector2(0, -15);
  public static readonly LAKE_RADIUS = 38;
  public static readonly LAKE_WATER_Y = 3.8;

  public static readonly TEMPLE_POS = new THREE.Vector3(-85, 14, 25);
  public static readonly PORTAL_POS = new THREE.Vector3(95, 16, -30);
  public static readonly SUMMIT_POS = new THREE.Vector3(15, 32, -100);
  public static readonly SPAWN_POS = new THREE.Vector3(0, 5, 80);

  constructor(isMobile: boolean = false) {
    this.group = new THREE.Group();
    this.segments = isMobile ? 110 : 190;
    this.heightData = new Float32Array((this.segments + 1) * (this.segments + 1));

    // Anchor heights for the Great Portal & Ancient Temple leveled terraces
    this.portalTerraceY = this.computeRawHeight(Terrain.PORTAL_POS.x, Terrain.PORTAL_POS.z);
    this.templeTerraceY = this.computeRawHeight(Terrain.TEMPLE_POS.x, Terrain.TEMPLE_POS.z);

    // Create procedural ground texture
    const groundTexture = this.createGroundTexture(isMobile ? 512 : 1024);
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(64, 64);
    groundTexture.colorSpace = THREE.SRGBColorSpace;

    // Normal map for rock/grass bumps
    const groundNormal = this.createGroundNormalMap(isMobile ? 256 : 512);
    groundNormal.wrapS = THREE.RepeatWrapping;
    groundNormal.wrapT = THREE.RepeatWrapping;
    groundNormal.repeat.set(96, 96);

    const terrainGeo = new THREE.PlaneGeometry(this.size, this.size, this.segments, this.segments);
    terrainGeo.rotateX(-Math.PI / 2);

    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const y = this.calculateHeight(x, z);
      posAttr.setY(i, y);
      this.heightData[i] = y;
    }

    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      map: groundTexture,
      normalMap: groundNormal,
      normalScale: new THREE.Vector2(0.65, 0.65),
      roughness: 0.82,
      metalness: 0.08,
      flatShading: false,
    });

    this.mesh = new THREE.Mesh(terrainGeo, terrainMat);
    this.mesh.receiveShadow = true;
    this.mesh.castShadow = false;
    this.group.add(this.mesh);

    // Expanded Realistic Blue Ocean plane (6400x6400) with GPU wave swells, Fresnel reflections & underside shimmer
    const oceanSeg = isMobile ? 28 : 56;
    const oceanGeo = new THREE.PlaneGeometry(6400, 6400, oceanSeg, oceanSeg);
    oceanGeo.rotateX(-Math.PI / 2);

    this.oceanTexture = this.createOceanTexture(isMobile ? 512 : 1024);
    this.oceanTexture.wrapS = THREE.RepeatWrapping;
    this.oceanTexture.wrapT = THREE.RepeatWrapping;
    this.oceanTexture.repeat.set(64, 64);
    this.oceanTexture.colorSpace = THREE.SRGBColorSpace;

    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x0b87bd,
      roughness: 0.09,
      metalness: 0.34,
      transparent: true,
      opacity: 0.90,
      side: THREE.DoubleSide,
      map: this.oceanTexture,
    });
    oceanMat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.oceanUniforms.uTime;
      shader.uniforms.uCamPos = this.oceanUniforms.uCamPos;

      shader.vertexShader =
        `
        uniform float uTime;
        varying vec3 vOceanWorldPos;
        varying float vWaveCrest;
        ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        `
        #include <beginnormal_vertex>
        vec3 wpPre = (modelMatrix * vec4(position, 1.0)).xyz;
        float distFade = 1.0 - smoothstep(140.0, 2200.0, length(wpPre.xz));
        float w1 = sin(wpPre.x * 0.09 + uTime * 1.35) * cos(wpPre.z * 0.07 + uTime * 0.95);
        float w2 = sin((wpPre.x * 0.06 - wpPre.z * 0.11) + uTime * 1.75);
        float dHx = (cos(wpPre.x * 0.09 + uTime * 1.35) * 0.09 * cos(wpPre.z * 0.07 + uTime * 0.95) * 0.22 +
                     cos((wpPre.x * 0.06 - wpPre.z * 0.11) + uTime * 1.75) * 0.06 * 0.14) * distFade;
        float dHz = (-sin(wpPre.x * 0.09 + uTime * 1.35) * sin(wpPre.z * 0.07 + uTime * 0.95) * 0.07 * 0.22 -
                     cos((wpPre.x * 0.06 - wpPre.z * 0.11) + uTime * 1.75) * 0.11 * 0.14) * distFade;
        objectNormal = normalize(vec3(-dHx, 1.0, -dHz));
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        float waveH = (w1 * 0.22 + w2 * 0.14) * distFade;
        transformed.y += waveH;
        vWaveCrest = clamp(waveH * 2.4 + 0.35, 0.0, 1.0);
        vOceanWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
        `
      );

      shader.fragmentShader =
        `
        uniform float uTime;
        uniform vec3 uCamPos;
        varying vec3 vOceanWorldPos;
        varying float vWaveCrest;
        ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        vec3 viewToOcean = normalize(uCamPos - vOceanWorldPos);
        float rippleA = sin(vOceanWorldPos.x * 0.42 + uTime * 2.1 + sin(vOceanWorldPos.z * 0.28 - uTime));
        float rippleB = cos(vOceanWorldPos.z * 0.37 - uTime * 1.85 + cos(vOceanWorldPos.x * 0.31 + uTime * 1.3));
        vec3 waveN = normalize(vec3((rippleA - rippleB) * 0.08, 1.0, (rippleA + rippleB) * 0.08));
        float fresnel = pow(1.0 - clamp(abs(dot(viewToOcean, waveN)), 0.0, 1.0), 3.0);

        // Sky & horizon reflection tint + crisp sun specular sparkle
        vec3 skyReflect = mix(vec3(0.04, 0.42, 0.68), vec3(0.56, 0.86, 0.98), fresnel);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, skyReflect, fresnel * 0.68);

        vec3 sunDir = normalize(vec3(0.55, 0.62, -0.45));
        vec3 halfVec = normalize(sunDir + viewToOcean);
        float glint = pow(max(dot(waveN, halfVec), 0.0), 64.0);
        gl_FragColor.rgb += vec3(0.95, 0.98, 1.0) * glint * 0.72;

        // Subtle crest foam shimmer
        float foam = smoothstep(0.68, 0.96, vWaveCrest + rippleA * 0.14);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.84, 0.96, 1.0), foam * 0.26);

        // Underwater surface shimmer when camera is submerged below wave plane
        if (uCamPos.y < vOceanWorldPos.y) {
          float underGlint = smoothstep(0.4, 0.95, rippleA * 0.5 + 0.5);
          gl_FragColor.rgb = mix(vec3(0.03, 0.24, 0.36), vec3(0.28, 0.78, 0.92), fresnel * 0.6 + underGlint * 0.35);
          gl_FragColor.a = mix(0.86, 0.62, clamp(abs(dot(viewToOcean, vec3(0.0, 1.0, 0.0))), 0.0, 1.0));
        }
        #include <dithering_fragment>
        `
      );
    };

    this.oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    this.oceanMesh.position.y = Terrain.WATER_LEVEL;
    this.oceanMesh.receiveShadow = false;
    this.group.add(this.oceanMesh);
  }

  /**
   * Unflattened continuous procedural terrain elevation before architectural terrace leveling.
   */
  private computeRawHeight(x: number, z: number): number {
    const distFromCenter = Math.sqrt(x * x + z * z);
    const continentRadius = 1050; // Vast continent spanning over 2km across

    // Smooth coastal shoreline falloff into outer ocean only near edge
    let landMask = 1.0;
    if (distFromCenter > 880) {
      const t = (distFromCenter - 880) / (continentRadius - 880);
      landMask = Math.max(0, 1.0 - Math.min(1, t));
      landMask = landMask * landMask * (3 - 2 * landMask); // Smoothstep
    }
    if (distFromCenter >= continentRadius) return -3.5;

    // Multi-octave continuous mathematical terrain across the continent
    const h1 = Math.sin(x * 0.006) * Math.cos(z * 0.006) * 12.0;
    const h2 = Math.sin(x * 0.015 + 1.2) * Math.sin(z * 0.016 - 0.8) * 6.5;
    const h3 = Math.cos(x * 0.04) * Math.sin(z * 0.038) * 3.2;
    const h4 = (Math.sin(x * 0.09) + Math.cos(z * 0.09)) * 1.2;

    let baseElevation = (h1 + h2 + h3 + h4) * landMask + 6.0 * landMask;

    // 1. The Great Northern Mountain Range & Alpine Crags (z: -70 to -650)
    const northDist = Math.sqrt((x - 15) * (x - 15) + (z + 180) * (z + 180));
    if (northDist < 260) {
      const mountainFalloff = Math.max(0, 1 - northDist / 260);
      const mPeak = Math.pow(mountainFalloff, 2.0) * 36.0;
      const ridgeNoise = Math.sin(x * 0.035) * Math.cos(z * 0.03) * 7.5 * mountainFalloff;
      baseElevation += mPeak + ridgeNoise;
    }

    // High Summit Landmark (15, 32, -100)
    const summitDist = Math.sqrt((x - Terrain.SUMMIT_POS.x) ** 2 + (z - Terrain.SUMMIT_POS.z) ** 2);
    if (summitDist < 75) {
      const sFactor = Math.max(0, 1 - summitDist / 75);
      baseElevation += Math.pow(sFactor, 1.8) * 16.0;
    }

    // 2. Eastern Portal Cliff & Highland Plateau (x: 80 to 450, z: -100 to 180)
    const portalDist = Math.sqrt((x - Terrain.PORTAL_POS.x) ** 2 + (z - Terrain.PORTAL_POS.z) ** 2);
    if (portalDist < 55) {
      const cliffFactor = Math.max(0, 1 - portalDist / 55);
      baseElevation += Math.pow(cliffFactor, 1.8) * 11.0;
    }

    // Eastern Windmill Ridges
    const eastDist = Math.sqrt((x - 260) ** 2 + (z - 40) ** 2);
    if (eastDist < 210) {
      const eFactor = Math.max(0, 1 - eastDist / 210);
      baseElevation += Math.sin(x * 0.02) * Math.cos(z * 0.02) * 8.0 * eFactor + eFactor * 10.0;
    }

    // 3. Western Temple Plateau & Deep Woods (x: -50 to -450, z: -120 to 180)
    const templeDist = Math.sqrt((x - Terrain.TEMPLE_POS.x) ** 2 + (z - Terrain.TEMPLE_POS.z) ** 2);
    if (templeDist < 50) {
      const templeFactor = Math.max(0, 1 - templeDist / 50);
      baseElevation += Math.pow(templeFactor, 1.5) * 8.5;
    }

    const westRidgeDist = Math.sqrt((x + 240) ** 2 + (z + 40) ** 2);
    if (westRidgeDist < 190) {
      const wFactor = Math.max(0, 1 - westRidgeDist / 190);
      baseElevation += Math.cos(x * 0.025) * Math.sin(z * 0.02) * 7.0 * wFactor + wFactor * 9.0;
    }

    // 4. Central Crater for the Bioluminescent Lake
    const lakeDist = Math.sqrt((x - Terrain.LAKE_CENTER.x) ** 2 + (z - Terrain.LAKE_CENTER.y) ** 2);
    if (lakeDist < Terrain.LAKE_RADIUS + 25) {
      const factor = Math.max(0, 1 - lakeDist / (Terrain.LAKE_RADIUS + 25));
      // Depression down below water level
      const depth = Math.pow(factor, 1.4) * 6.5;
      baseElevation -= depth;
    }

    // 5. South-Western Natural Sea Fjord / River Channel (x: -90 to -240, z: 120 to 320)
    // Creates a scenic fjord channel where sea enters land, creating swimming bays
    const fjordU = (x + 150) * 0.015;
    const fjordV = (z - 220) * 0.015;
    const fjordDist = Math.sqrt(fjordU * fjordU + fjordV * fjordV);
    if (fjordDist < 1.4) {
      const fFactor = Math.cos(fjordDist * (Math.PI / 2.8));
      if (fFactor > 0) {
        baseElevation -= Math.pow(fFactor, 1.5) * 7.5;
      }
    }

    // Ensure land stays comfortably above water inside continent, dropping smoothly to sea
    if (distFromCenter < 880) {
      return Math.max(0.6, baseElevation);
    }

    // Outer shoreline drops under the sea level (1.6) down to sea bed (-3.5)
    return THREE.MathUtils.lerp(Math.max(0.6, baseElevation), -3.5, 1.0 - landMask);
  }

  /**
   * Continuous procedural height function with leveled terraces under the Great Portal & Ancient Temple
   * so monumental stone structures and stairs rest flush on level earth with clear approach paths.
   */
  public calculateHeight(x: number, z: number): number {
    let h = this.computeRawHeight(x, z);

    // Flatten the Great Portal terrace (wide enough to cover all overlapping terrain grid cells under 24x14 platform + stairs)
    const pDist = Math.hypot(x - Terrain.PORTAL_POS.x, z - Terrain.PORTAL_POS.z);
    if (pDist <= 26.0) {
      return this.portalTerraceY;
    }
    if (pDist < 52.0) {
      const t = (pDist - 26.0) / (52.0 - 26.0);
      const smooth = t * t * (3 - 2 * t);
      h = THREE.MathUtils.lerp(this.portalTerraceY, h, smooth);
    }

    // Flatten the Ancient Temple terrace (covers 22.5m stepped circular foundation + adjacent terrain grid cells)
    const tDist = Math.hypot(x - Terrain.TEMPLE_POS.x, z - Terrain.TEMPLE_POS.z);
    if (tDist <= 32.0) {
      return this.templeTerraceY;
    }
    if (tDist < 56.0) {
      const t = (tDist - 32.0) / (56.0 - 32.0);
      const smooth = t * t * (3 - 2 * t);
      h = THREE.MathUtils.lerp(this.templeTerraceY, h, smooth);
    }

    return h;
  }

  /**
   * Exact barycentric interpolation matching the rendered PlaneGeometry triangle winding.
   * Ensures trees, props, buildings, and feet sit flush on the actual terrain triangles.
   */
  public getMeshHeightAt(x: number, z: number): number {
    const half = this.size * 0.5;
    if (x < -half || x > half || z < -half || z > half) {
      return this.calculateHeight(x, z);
    }

    const cellSize = this.size / this.segments;
    const gx = (x + half) / cellSize;
    const gz = (z + half) / cellSize;

    const ix = Math.min(Math.max(Math.floor(gx), 0), this.segments - 1);
    const iz = Math.min(Math.max(Math.floor(gz), 0), this.segments - 1);

    const fx = Math.min(Math.max(gx - ix, 0), 1);
    const fz = Math.min(Math.max(gz - iz, 0), 1);

    const stride = this.segments + 1;
    const ha = this.heightData[iz * stride + ix];
    const hb = this.heightData[(iz + 1) * stride + ix];
    const hc = this.heightData[(iz + 1) * stride + (ix + 1)];
    const hd = this.heightData[iz * stride + (ix + 1)];

    // PlaneGeometry splits each quad along diagonal b(0,1) -> d(1,0) where fx + fz = 1
    if (fx + fz <= 1) {
      return ha + fx * (hd - ha) + fz * (hb - ha);
    }
    return hc + (1 - fx) * (hb - hc) + (1 - fz) * (hd - hc);
  }

  public floorHeightProvider: ((x: number, z: number) => number | null) | null = null;

  /**
   * Returns whether a given coordinate is in water (elevation below water line)
   */
  public isWaterAt(x: number, z: number): boolean {
    return this.getHeightAt(x, z) < Terrain.WATER_LEVEL;
  }

  /**
   * Returns water depth at (x, z)
   */
  public getWaterDepthAt(x: number, z: number): number {
    const h = this.getHeightAt(x, z);
    return Math.max(0, Terrain.WATER_LEVEL - h);
  }

  /**
   * Returns exact elevation at any world (x, z)
   */
  public getHeightAt(x: number, z: number): number {
    if (this.floorHeightProvider) {
      const floorH = this.floorHeightProvider(x, z);
      if (floorH !== null) return floorH;
    }
    return this.getMeshHeightAt(x, z);
  }

  /**
   * Computes the slope normal at (x, z)
   */
  public getNormalAt(x: number, z: number): THREE.Vector3 {
    if (this.floorHeightProvider && this.floorHeightProvider(x, z) !== null) {
      return new THREE.Vector3(0, 1, 0);
    }
    const eps = 0.5;
    const hL = this.getMeshHeightAt(x - eps, z);
    const hR = this.getMeshHeightAt(x + eps, z);
    const hD = this.getMeshHeightAt(x, z - eps);
    const hU = this.getMeshHeightAt(x, z + eps);

    const normal = new THREE.Vector3(hL - hR, 2 * eps, hD - hU);
    normal.normalize();
    return normal;
  }

  /**
   * High-performance GPU wave and water caustics animation with zero CPU vertex buffer re-uploads
   */
  public update(time: number, camPos?: THREE.Vector3): void {
    this.oceanUniforms.uTime.value = time;
    if (camPos) {
      this.oceanUniforms.uCamPos.value.copy(camPos);
    }
    if (this.oceanTexture) {
      this.oceanTexture.offset.x = (time * 0.012) % 1;
      this.oceanTexture.offset.y = (time * 0.008) % 1;
    }
    // Subtle organic sea level breathing
    this.oceanMesh.position.y = Terrain.WATER_LEVEL + Math.sin(time * 0.85) * 0.07;
  }

  /**
   * Procedural texture with grass, moss, rock strata, and golden sand
   */
  private createGroundTexture(texSize: number = 1024): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = texSize;
    canvas.height = texSize;
    const ctx = canvas.getContext('2d')!;

    // Base deep emerald-moss green
    ctx.fillStyle = '#263b27';
    ctx.fillRect(0, 0, texSize, texSize);

    // Speckle grass blades and soil patches
    const scale = texSize / 1024;
    const speckCount = Math.round(24000 * scale * scale);
    for (let i = 0; i < speckCount; i++) {
      const x = Math.random() * texSize;
      const y = Math.random() * texSize;
      const r = Math.random();

      if (r < 0.4) {
        ctx.fillStyle = '#3a5732'; // Fresh green
      } else if (r < 0.7) {
        ctx.fillStyle = '#1e2e1e'; // Dark damp loam
      } else if (r < 0.9) {
        ctx.fillStyle = '#4c6b41'; // Vibrant moss
      } else {
        ctx.fillStyle = '#7a7b5a'; // Slate stone pebble
      }

      const w = (1 + Math.random() * 3) * scale;
      const h = (1 + Math.random() * 4) * scale;
      ctx.fillRect(x, y, Math.max(1, w), Math.max(1, h));
    }

    // Mystical faint ancient glyph trails
    ctx.strokeStyle = 'rgba(78, 175, 145, 0.12)';
    ctx.lineWidth = Math.max(1.5, 3 * scale);
    for (let j = 0; j < 12; j++) {
      ctx.beginPath();
      const sx = Math.random() * texSize;
      const sy = Math.random() * texSize;
      ctx.arc(sx, sy, (40 + Math.random() * 80) * scale, 0, Math.PI * 1.5);
      ctx.stroke();
    }

    return new THREE.CanvasTexture(canvas);
  }

  /**
   * Procedural bump/normal map
   */
  private createGroundNormalMap(texSize: number = 512): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = texSize;
    canvas.height = texSize;
    const ctx = canvas.getContext('2d')!;

    const imgData = ctx.createImageData(texSize, texSize);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const nx = 128 + Math.floor((Math.random() - 0.5) * 45);
      const ny = 128 + Math.floor((Math.random() - 0.5) * 45);
      data[i] = nx;
      data[i + 1] = ny;
      data[i + 2] = 255;
      data[i + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);
    return new THREE.CanvasTexture(canvas);
  }

  /**
   * Procedural realistic azure-blue ocean texture with caustics, sun glints, and white sea foam
   */
  private createOceanTexture(texSize: number = 1024): THREE.CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = texSize;
    canvas.height = texSize;
    const ctx = canvas.getContext('2d')!;

    const scale = texSize / 1024;

    // Rich deep sapphire-azure base gradient
    const grad = ctx.createLinearGradient(0, 0, texSize, texSize);
    grad.addColorStop(0, '#005b8e');
    grad.addColorStop(0.5, '#0077b6');
    grad.addColorStop(1, '#0096c7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, texSize, texSize);

    // Turquoise caustics network
    ctx.strokeStyle = 'rgba(72, 202, 228, 0.42)';
    ctx.lineWidth = Math.max(1.2, 2.0 * scale);

    const causticCount = Math.round(900 * scale);
    for (let i = 0; i < causticCount; i++) {
      ctx.beginPath();
      const x = Math.random() * texSize;
      const y = Math.random() * texSize;
      const r = (12 + Math.random() * 32) * scale;
      ctx.ellipse(x, y, r, r * 0.48, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Sparkling sun highlights & fine foam streaks
    ctx.fillStyle = 'rgba(202, 240, 248, 0.55)';
    const sparkleCount = Math.round(1200 * scale);
    for (let j = 0; j < sparkleCount; j++) {
      const x = Math.random() * texSize;
      const y = Math.random() * texSize;
      const size = Math.max(1, (1.2 + Math.random() * 2.8) * scale);
      ctx.fillRect(x, y, size, size);
    }

    // Delicate wave crest lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)';
    ctx.lineWidth = Math.max(0.8, 1.2 * scale);
    const waveCount = Math.round(120 * scale);
    for (let k = 0; k < waveCount; k++) {
      ctx.beginPath();
      const sx = Math.random() * texSize;
      const sy = Math.random() * texSize;
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(
        sx + (20 + Math.random() * 30) * scale, sy + (Math.random() - 0.5) * 15 * scale,
        sx + (50 + Math.random() * 40) * scale, sy + (Math.random() - 0.5) * 20 * scale,
        sx + (90 + Math.random() * 50) * scale, sy + (Math.random() - 0.5) * 15 * scale
      );
      ctx.stroke();
    }

    return new THREE.CanvasTexture(canvas);
  }
}

