/**
 * ECHO – THE WORLD REMEMBERS
 * Main Application Entry Point
 * Robust lifecycle check ensuring initialization on both immediate and deferred loading
 */

import { Game } from './Game.ts';

function start(): void {
  const container = document.getElementById('root') || document.body;
  try {
    (window as any).__echoGame = new Game(container);

    const isDesktopApp = Boolean((window as any).echoDesktop?.isDesktop) || navigator.userAgent.toLowerCase().includes('electron');

    // Request browser HTML5 Fullscreen on first touch/click interaction if in web/PWA mode
    const requestFullScreenOnce = () => {
      try {
        const docEl = document.documentElement as any;
        if (!document.fullscreenElement && !docEl.webkitFullscreenElement) {
          if (docEl.requestFullscreen) {
            docEl.requestFullscreen().catch(() => {});
          } else if (docEl.webkitRequestFullscreen) {
            docEl.webkitRequestFullscreen();
          }
        }
      } catch {
        // Ignore if prevented by browser security policy
      }
      window.removeEventListener('pointerdown', requestFullScreenOnce);
      window.removeEventListener('touchstart', requestFullScreenOnce);
    };

    if (!isDesktopApp) {
      window.addEventListener('pointerdown', requestFullScreenOnce, { passive: true, once: true });
      window.addEventListener('touchstart', requestFullScreenOnce, { passive: true, once: true });
    }
  } catch (error) {
    console.error('Error starting ECHO Game:', error);
    document.getElementById('echo-boot-splash')?.remove();
    const fallback = document.createElement('div');
    fallback.id = 'echo-boot-error';
    fallback.style.cssText =
      'position:fixed;inset:0;z-index:9999;background:#060a12;color:#e0fbf6;display:flex;align-items:center;justify-content:center;padding:1.5rem;font-family:sans-serif;';
    fallback.innerHTML = `
      <div style="max-width:440px;width:100%;background:rgba(12,20,34,0.96);border:1.5px solid rgba(0,245,212,0.45);border-radius:16px;padding:1.4rem;text-align:center;">
        <h2 style="margin:0 0 0.6rem 0;color:#00f5d4;font-size:1.25rem;">تعذر تشغيل الرسوميات ثلاثية الأبعاد · WebGL Error</h2>
        <p style="margin:0 0 1rem 0;font-size:0.9rem;line-height:1.5;color:#cbd5e1;">تأكد من تفعيل تسريع الرسوميات (WebGL) على جهازك ثم أعد المحاولة.</p>
        <button id="echo-retry-boot-btn" style="padding:0.65rem 1.4rem;border-radius:10px;border:none;background:#00f5d4;color:#061214;font-weight:700;cursor:pointer;">إعادة المحاولة · Retry</button>
      </div>
    `;
    container.appendChild(fallback);
    document.getElementById('echo-retry-boot-btn')?.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  // Already interactive or complete
  start();
}
