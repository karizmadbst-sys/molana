const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('echoDesktop', {
  isDesktop: true,
  platform: process.platform,
  toggleFullscreen: () => ipcRenderer.invoke('echo:toggle-fullscreen'),
});
