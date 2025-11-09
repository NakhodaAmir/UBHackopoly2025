import { Bot } from './bot';
import { Battle, BotAction } from './battle';

// Client -> Server events
export interface ClientToServerEvents {
  'bot:create': (data: CreateBotData) => void;
  'bot:update': (botId: string, data: UpdateBotData) => void;
  'bot:delete': (botId: string) => void;
  'battle:start': (botIds: string[]) => void;
  'battle:pause': (battleId: string) => void;
  'battle:resume': (battleId: string) => void;
  'battle:stop': (battleId: string) => void;
}

// Server -> Client events
export interface ServerToClientEvents {
  'bot:created': (bot: Bot) => void;
  'bot:updated': (bot: Bot) => void;
  'bot:deleted': (botId: string) => void;
  'battle:created': (battle: Battle) => void;
  'battle:started': (battle: Battle) => void;
  'battle:turn': (battleId: string, turnNumber: number, actions: BotAction[]) => void;
  'battle:completed': (battle: Battle) => void;
  'battle:error': (error: string) => void;
  'bots:list': (bots: Bot[]) => void;
  'battles:list': (battles: Battle[]) => void;
  'error': (message: string) => void;
}

export interface CreateBotData {
  name: string;
  algorithm: string; // Code as string
}

export interface UpdateBotData {
  name?: string;
  algorithm?: string;
}
