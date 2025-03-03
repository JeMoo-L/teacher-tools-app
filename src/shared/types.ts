import { v4 as uuidv4 } from 'uuid';

export const MessageRoleEnum = {
  System: 'system',
  User: 'user',
  Assistant: 'assistant',
} as const;

export type MessageRole = (typeof MessageRoleEnum)[keyof typeof MessageRoleEnum];

export interface Message {
  id: string;

  role: MessageRole;
  content: string;
  name?: string;

  cancel?: () => void;
  generating?: boolean;

  aiProvider?: ModelProvider;
  model?: string;

  errorCode?: number;
  error?: string;
  errorExtra?: {
    [key: string]: any;
  };

  wordCount?: number;
  // tokenCount?: number;
  tokensUsed?: number;
  timestamp?: number;
}

export enum ModelProvider {
  ChatboxAI = 'chatbox-ai',
  OpenAI = 'openai',
  Claude = 'claude',
  Ollama = 'ollama',
  SiliconFlow = 'silicon-flow',
  LMStudio = 'lm-studio',
  PPIO = 'ppio',
}

export interface ModelSettings {
  temperature: number;
}

export interface Settings extends ModelSettings {
  theme: Theme;
  fontSize: number;

  defaultPrompt?: string;

  //是否显示左侧的Sidebar
  showSidebar: boolean;
}

export interface Config {
  uuid: string;
}

export enum Theme {
  DarkMode,
  LightMode,
  FollowSystem,
}

export type SessionType = 'chat';
export interface Session {
  id: string;
  type?: SessionType;
  name: string;
  picUrl?: string;
  messages: Message[];
  copilotId?: string;
}

export function createMessage(
  role: MessageRole = MessageRoleEnum.User,
  content: string = '',
): Message {
  return {
    id: uuidv4(),
    content: content,
    role: role,
    timestamp: new Date().getTime(),
  };
}
