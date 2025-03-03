import { ElectronIPC } from 'src/shared/electron-types';
import Exporter from './exporter';

export class DesktopPlatform {
  public ipc: ElectronIPC;
  constructor(ipc: ElectronIPC) {
    this.ipc = ipc;
  }

  public exporter = new Exporter();

  public async shouldUseDarkColors(): Promise<boolean> {
    return await this.ipc.invoke('shouldUseDarkColors');
  }

  public async setStoreValue(key: string, value: any) {
    const valueJson = JSON.stringify(value);
    return this.ipc.invoke('setStoreValue', key, valueJson);
  }
  public async getStoreValue(key: string) {
    return this.ipc.invoke('getStoreValue', key);
  }
  public delStoreValue(key: string) {
    return this.ipc.invoke('delStoreValue', key);
  }
  public async getAllStoreValues(): Promise<{ [key: string]: any }> {
    const json = await this.ipc.invoke('getAllStoreValues');
    return JSON.parse(json);
  }
  public async setAllStoreValues(data: { [key: string]: any }) {
    await this.ipc.invoke('setAllStoreValues', JSON.stringify(data));
  }
}

export default new DesktopPlatform(window.electronAPI as any);
