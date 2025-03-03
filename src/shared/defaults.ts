import { v4 as uuidv4 } from 'uuid';
import { Config, Session, Settings, Theme } from './types';

export function settings(): Settings {
  return {
    temperature: 0.7,
    theme: Theme.FollowSystem,
    fontSize: 12,

    defaultPrompt: getDefaultPrompt(),
    showSidebar: true,
  };
}

export function newConfigs(): Config {
  return { uuid: uuidv4() };
}

export function getDefaultPrompt() {
  return 'You are a helpful assistant. You can help me by answering my questions. You can also ask me questions.';
}

export function sessions(): Session[] {
  return [{ id: uuidv4(), name: 'Untitled', messages: [], type: 'chat' }];
}
