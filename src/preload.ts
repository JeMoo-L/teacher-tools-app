import { contextBridge, ipcRenderer } from 'electron';
import { ElectronIPC } from './shared/electron-types';

const electronHandler: ElectronIPC = {
  invoke: ipcRenderer.invoke,
  onSystemThemeChange: (callback: () => void) => {
    ipcRenderer.on('system-theme-updated', callback);
    return () => ipcRenderer.off('system-theme-updated', callback);
  },
  onWindowShow: (callback: () => void) => {
    ipcRenderer.on('window-show', callback);
    return () => ipcRenderer.off('window-show', callback);
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronHandler);
