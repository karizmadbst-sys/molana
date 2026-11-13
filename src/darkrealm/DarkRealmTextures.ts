/**
 * ECHO – DARK FANTASY REALM
 * Procedural Voxel & Dark Fantasy PBR Texture Generator
 * Generates crisp pixel-styled CanvasTextures with zero external asset requests.
 */

import * as THREE from 'three';

export interface DarkTextureSet {
  grassTop: THREE.CanvasTexture;
  grassSide: THREE.CanvasTexture;
  darkDirt: THREE.CanvasTexture;
  cobblestone: THREE.CanvasTexture;
  woodPlanks: THREE.CanvasTexture;
  logBark: THREE.CanvasTexture;
  castleBrick: THREE.CanvasTexture;
  glowLantern: THREE.CanvasTexture;
  crystalOre: THREE.CanvasTexture;
  ironOre: THREE.CanvasTexture;
  goldOre: THREE.CanvasTexture;
  glass: THREE.CanvasTexture;
  roofSlate: THREE.CanvasTexture;
  moon: THREE.CanvasTexture;
  water: THREE.CanvasTexture;
  skyBackdrop: THREE.CanvasTexture;
}

function makePixelCanvas(size: number, draw: (ctx: CanvasRenderingContext2D, s: number) => void): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function drawGridNoise(
  ctx: CanvasRenderingContext2D,
  size: number,
  grid: number,
  palette: string[],
  seedOffset: number = 1
): void {
  const cell = size / grid;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      const h = Math.abs(Math.sin((x + 17 * seedOffset) * 12.9898 + (y + 31 * seedOffset) * 78.233) * 43758.5453);
      const idx = Math.floor((h % 1) * palette.length);
      ctx.fillStyle = palette[idx];
      ctx.fillRect(x * cell, y * cell, cell + 0.5, cell + 0.5);
    }
  }
}

export function createDarkRealmTextures(): DarkTextureSet {
  const grassTop = makePixelCanvas(128, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#284a30', '#315739', '#213c27', '#3a6442', '#2b4d33'], 2);
  });
  grassTop.repeat.set(90, 90);

  const grassSide = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#483426', '#3c2b1f', '#563f2e', '#332419'], 4);
    ctx.fillStyle = '#2f5336';
    ctx.fillRect(0, 0, s, s * 0.28);
    ctx.fillStyle = '#3f6b47';
    for (let x = 0; x < 16; x++) {
      if (x % 2 === 0) ctx.fillRect(x * 4, s * 0.22, 4, 8);
    }
  });

  const darkDirt = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#3a291e', '#473225', '#312219', '#523b2c'], 5);
  });

  const cobblestone = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#4c5362', '#5c6475', '#3c4250', '#697284'], 7);
    ctx.strokeStyle = '#272c36';
    ctx.lineWidth = 2;
    for (let y = 0; y < s; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(s, y);
      ctx.stroke();
      const offset = (y / 16) % 2 === 0 ? 0 : 8;
      for (let x = offset; x < s; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 16);
        ctx.stroke();
      }
    }
  });

  const woodPlanks = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#7d5533', '#8c603a', '#6b4729', '#996a42'], 9);
    ctx.fillStyle = '#472e19';
    for (let y = 0; y < s; y += 16) {
      ctx.fillRect(0, y, s, 2);
      const split = ((y / 16) % 2) * 28 + 16;
      ctx.fillRect(split, y, 2, 16);
    }
  });

  const logBark = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#453022', '#523a29', '#38261b', '#5e4430'], 11);
    ctx.fillStyle = '#241810';
    for (let x = 4; x < s; x += 12) {
      ctx.fillRect(x, 0, 2, s);
    }
  });

  const castleBrick = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#32354a', '#3d415a', '#282b3d', '#494e6b'], 13);
    ctx.strokeStyle = '#181a26';
    ctx.lineWidth = 2;
    for (let y = 0; y < s; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(s, y);
      ctx.stroke();
      const offset = (y / 16) % 2 === 0 ? 4 : 12;
      for (let x = offset; x < s; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 16);
        ctx.stroke();
      }
    }
  });

  const glowLantern = makePixelCanvas(64, (ctx, s) => {
    ctx.fillStyle = '#241a14';
    ctx.fillRect(0, 0, s, s);
    const grad = ctx.createRadialGradient(s / 2, s / 2, 4, s / 2, s / 2, s * 0.45);
    grad.addColorStop(0, '#fff7cc');
    grad.addColorStop(0.45, '#ffb703');
    grad.addColorStop(0.85, '#e85d04');
    grad.addColorStop(1, '#241a14');
    ctx.fillStyle = grad;
    ctx.fillRect(6, 6, s - 12, s - 12);
    ctx.strokeStyle = '#1b1410';
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, s - 8, s - 8);
  });

  const crystalOre = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#2b2d38', '#343744', '#22242d'], 15);
    ctx.fillStyle = '#b54cff';
    const spots = [
      [14, 14, 10],
      [38, 18, 12],
      [20, 42, 11],
      [44, 44, 8],
    ];
    for (const [x, y, r] of spots) {
      ctx.fillStyle = '#9d4edd';
      ctx.fillRect(x, y, r, r);
      ctx.fillStyle = '#e0aaff';
      ctx.fillRect(x + 2, y + 2, r * 0.45, r * 0.45);
    }
  });

  const ironOre = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#3a3f4a', '#484e5c', '#2c303a'], 17);
    const spots = [[12, 16], [36, 12], [22, 38], [44, 40]];
    for (const [x, y] of spots) {
      ctx.fillStyle = '#b08968';
      ctx.fillRect(x, y, 10, 8);
      ctx.fillStyle = '#e6ccb2';
      ctx.fillRect(x + 2, y + 2, 4, 4);
    }
  });

  const goldOre = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#313440', '#3d4150', '#242731'], 19);
    const spots = [[12, 14], [38, 18], [18, 42], [44, 38]];
    for (const [x, y] of spots) {
      ctx.fillStyle = '#ffb703';
      ctx.fillRect(x, y, 10, 9);
      ctx.fillStyle = '#fff3b0';
      ctx.fillRect(x + 2, y + 2, 4, 4);
    }
  });

  const glass = makePixelCanvas(64, (ctx, s) => {
    ctx.fillStyle = 'rgba(130, 210, 255, 0.28)';
    ctx.fillRect(0, 0, s, s);
    ctx.strokeStyle = 'rgba(205, 240, 255, 0.85)';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, s - 4, s - 4);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(12, 24);
    ctx.lineTo(26, 10);
    ctx.moveTo(38, 52);
    ctx.lineTo(52, 38);
    ctx.stroke();
  });

  const roofSlate = makePixelCanvas(64, (ctx, s) => {
    drawGridNoise(ctx, s, 16, ['#3d2c4d', '#4b365e', '#322440', '#563e6c'], 21);
  });

  const moon = makePixelCanvas(256, (ctx, s) => {
    ctx.clearRect(0, 0, s, s);
    const r = s * 0.44;
    const cx = s / 2;
    const cy = s / 2;

    const halo = ctx.createRadialGradient(cx, cy, r * 0.7, cx, cy, s * 0.5);
    halo.addColorStop(0, 'rgba(225, 232, 255, 0.92)');
    halo.addColorStop(0.85, 'rgba(190, 200, 255, 0.35)');
    halo.addColorStop(1, 'rgba(160, 170, 255, 0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy, s * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    const grad = ctx.createRadialGradient(cx - 24, cy - 20, 10, cx, cy, r);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.65, '#dbe3f8');
    grad.addColorStop(1, '#98a6cc');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, s, s);

    // Moon craters & maria
    const craters = [
      [cx - 32, cy - 24, 24, 'rgba(120, 134, 170, 0.36)'],
      [cx + 28, cy - 30, 18, 'rgba(110, 125, 165, 0.32)'],
      [cx + 12, cy + 28, 30, 'rgba(105, 118, 158, 0.38)'],
      [cx - 42, cy + 18, 16, 'rgba(115, 128, 168, 0.30)'],
      [cx + 42, cy + 4, 14, 'rgba(125, 138, 175, 0.28)'],
    ] as const;
    for (const [mx, my, mr, col] of craters) {
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(mx, my, mr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  });
  moon.magFilter = THREE.LinearFilter;
  moon.wrapS = THREE.ClampToEdgeWrapping;
  moon.wrapT = THREE.ClampToEdgeWrapping;

  const water = makePixelCanvas(128, (ctx, s) => {
    const grad = ctx.createLinearGradient(0, 0, 0, s);
    grad.addColorStop(0, '#2a6f97');
    grad.addColorStop(0.5, '#468faf');
    grad.addColorStop(1, '#61a5c2');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = 'rgba(210, 244, 255, 0.42)';
    for (let i = 0; i < 40; i++) {
      const rx = (i * 23) % s;
      const ry = (i * 17) % s;
      ctx.fillRect(rx, ry, 10, 3);
    }
  });
  water.repeat.set(8, 8);

  const skyBackdrop = makePixelCanvas(512, (ctx, s) => {
    const h = s;
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#111530');
    grad.addColorStop(0.32, '#222152');
    grad.addColorStop(0.58, '#382c6e');
    grad.addColorStop(0.78, '#563878');
    grad.addColorStop(0.92, '#402b5c');
    grad.addColorStop(1, '#262148');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, s, h);

    // Distant purple/indigo nebula clouds
    const neb = ctx.createRadialGradient(s * 0.48, h * 0.42, 10, s * 0.48, h * 0.42, s * 0.36);
    neb.addColorStop(0, 'rgba(130, 88, 220, 0.35)');
    neb.addColorStop(0.5, 'rgba(85, 65, 165, 0.16)');
    neb.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = neb;
    ctx.fillRect(0, 0, s, h);

    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 420; i++) {
      const x = Math.abs(Math.sin(i * 12.989) * 43758.5) % 1;
      const y = Math.abs(Math.sin(i * 78.233) * 19341.3) % 1;
      const r = i % 19 === 0 ? 1.8 : 0.9;
      ctx.globalAlpha = 0.45 + (i % 5) * 0.12;
      ctx.fillRect(x * s, y * (h * 0.65), r, r);
    }
    ctx.globalAlpha = 1;
  });
  skyBackdrop.magFilter = THREE.LinearFilter;

  return {
    grassTop,
    grassSide,
    darkDirt,
    cobblestone,
    woodPlanks,
    logBark,
    castleBrick,
    glowLantern,
    crystalOre,
    ironOre,
    goldOre,
    glass,
    roofSlate,
    moon,
    water,
    skyBackdrop,
  };
}
