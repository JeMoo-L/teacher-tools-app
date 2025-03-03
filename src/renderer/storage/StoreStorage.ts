import { defaultSessionsForCN } from '../packages/initial_data';
import BaseStorage from './BaseStorage';

export enum StorageKey {
  ChatSessions = 'chat-sessions',
  Settings = 'settings',
}

export default class StoreStorage extends BaseStorage {
  constructor() {
    super();
  }
  public async getItem<T>(key: string, initialValue: T): Promise<T> {
    let value: T = await super.getItem(key, initialValue);
    if (key === StorageKey.ChatSessions && value === initialValue) {
      value = defaultSessionsForCN as T;
      await super.setItem(key, value);
    }
    return value;
  }
}
