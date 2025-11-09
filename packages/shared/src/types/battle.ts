import { Bot, ActionType } from './bot';

export type BattleStatus = 'waiting' | 'running' | 'completed' | 'paused';

export interface Battle {
  id: string;
  bots: Bot[];
  status: BattleStatus;
  currentTurn: number;
  maxTurns: number;
  winner?: string; // Bot ID
  turns: Turn[];
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export interface Turn {
  number: number;
  actions: BotAction[];
  timestamp: Date;
}

export interface BotAction {
  botId: string;
  action: ActionType;
  target?: string;
  result: ActionResult;
}

export interface ActionResult {
  success: boolean;
  damage?: number;
  healAmount?: number;
  message: string;
  effects?: StatusEffect[];
}

export interface StatusEffect {
  type: 'shield' | 'stun' | 'poison' | 'boost';
  duration: number;
  value: number;
}

export interface BattleConfig {
  maxTurns: number;
  arenaSize: { width: number; height: number };
  startingHealth: number;
  startingEnergy: number;
}
