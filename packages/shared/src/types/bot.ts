export interface Position {
  x: number;
  y: number;
}

export interface BotStats {
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
}

export interface Bot {
  id: string;
  name: string;
  stats: BotStats;
  position: Position;
  algorithm: Algorithm;
  status: 'alive' | 'dead';
}

export interface Algorithm {
  code: string; // User's code as string
  statements?: Statement[]; // Parsed statements (for later implementation)
}

export type Statement = IfStatement | ForLoop | WhileLoop | Action;

export interface IfStatement {
  type: 'if';
  condition: Condition;
  then: Statement[];
  else?: Statement[];
}

export interface ForLoop {
  type: 'for';
  iterations: number;
  body: Statement[];
}

export interface WhileLoop {
  type: 'while';
  condition: Condition;
  body: Statement[];
}

export type ActionType = 'attack' | 'defend' | 'move' | 'heal' | 'wait';

export interface Action {
  type: 'action';
  action: ActionType;
  target?: string; // Bot ID or direction
  params?: Record<string, any>;
}

export interface Condition {
  left: string; // e.g., 'self.health', 'enemy.distance'
  operator: '<' | '>' | '<=' | '>=' | '==' | '!=';
  right: number | string;
}
