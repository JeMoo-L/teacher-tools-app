import { atom, SetStateAction } from 'jotai';
import { focusAtom } from 'jotai-optics';
import { atomWithStorage, selectAtom } from 'jotai/utils';
import * as defaults from '../../shared/defaults';
import { Message, Session, Settings } from '../../shared/types';
import storage, { StorageKey } from '../storage';

const _settingsAtom = atomWithStorage<Settings>(StorageKey.Settings, defaults.settings(), storage);

export const settingsAtom = atom(
  (get) => {
    const settings = get(_settingsAtom);
    return Object.assign({}, defaults.settings(), settings);
  },
  (get, set, update: SetStateAction<Settings>) => {
    const settings = get(_settingsAtom);
    let newSettings = typeof update === 'function' ? update(settings as Settings) : update;
    set(_settingsAtom, newSettings);
  },
);

export const themeAtom = focusAtom(settingsAtom, (optic) => optic.prop('theme'));
export const fontSizeAtom = focusAtom(settingsAtom, (optic) => optic.prop('fontSize'));

export const activeThemeAtom = atom<'light' | 'dark'>('light');

// sessions

const _sessionsAtom = atomWithStorage<Session[]>(StorageKey.ChatSessions, [], storage);
export const sessionsAtom = atom(
  (get) => {
    let sessions = get(_sessionsAtom);
    if (Array.isArray(sessions) && sessions.length === 0) {
      sessions = defaults.sessions();
    }
    return sessions;
  },
  (get, set, update: SetStateAction<Session[]>) => {
    const sessions = get(_sessionsAtom);
    let newSessions = typeof update === 'function' ? update(sessions as Session[]) : update;
    if (newSessions.length === 0) {
      newSessions = defaults.sessions();
    }
    set(_sessionsAtom, newSessions);
  },
);

export const sortedSessionsAtom = atom((get) => {
  const sessions = get(sessionsAtom);
  if (!Array.isArray(sessions)) {
    console.error('sortedSessionsAtom中 sessions 必须是数组，当前值：', sessions);
    return [];
  }
  return sortSessions(sessions);
});

export function sortSessions(sessions: Session[]): Session[] {
  if (!Array.isArray(sessions)) {
    console.error('sortSessions中 sessions 必须是数组，当前值：', sessions);
    return [];
  }
  return [...sessions].reverse();
}

const _currentSessionIdCachedAtom = atomWithStorage<string | null>(
  '_currentSessionIdCachedAtom',
  null,
);
export const currentSessionIdAtom = atom(
  (get) => {
    const idCached = get(_currentSessionIdCachedAtom);
    const sessions = get(sortedSessionsAtom);
    if (idCached && sessions.some((session) => session.id === idCached)) {
      return idCached;
    }
    return sessions[0]?.id;
  },
  (_get, set, update: string) => {
    set(_currentSessionIdCachedAtom, update);
  },
);

export const currentSessionAtom = atom((get) => {
  const id = get(currentSessionIdAtom);
  const sessions = get(sessionsAtom);
  if (Array.isArray(sessions)) {
    let current = sessions.find((session) => session.id === id);
    if (!current) {
      return sessions[sessions.length - 1]; // fallback to the last session
    }
    return current;
  }
  return defaults.sessions()[0];
});

export const currentMessageListAtom = selectAtom(currentSessionAtom, (s) => {
  let messageContext: Message[] = [];
  if (s.messages) {
    messageContext = messageContext.concat(s.messages);
  }
  return messageContext;
});

export const messageListRefAtom = atom<null | React.RefObject<HTMLDivElement | null>>(null);

export const chatConfigDialogAtom = atom<Session | null>(null);
