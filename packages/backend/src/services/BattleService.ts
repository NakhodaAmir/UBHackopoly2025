import { Battle, BattleStatus, Bot, BattleConfig } from '@ubhackopoly/shared';
import { v4 as uuidv4 } from 'uuid';

class BattleService {
  private battles: Map<string, Battle> = new Map();
  private defaultConfig: BattleConfig = {
    maxTurns: 100,
    arenaSize: { width: 10, height: 10 },
    startingHealth: 100,
    startingEnergy: 100
  };

  createBattle(bots: Bot[], config?: Partial<BattleConfig>): Battle {
    const battleConfig = { ...this.defaultConfig, ...config };

    const battle: Battle = {
      id: uuidv4(),
      bots: bots.map(bot => ({ ...bot })), // Clone bots
      status: 'waiting',
      currentTurn: 0,
      maxTurns: battleConfig.maxTurns,
      turns: [],
      createdAt: new Date()
    };

    this.battles.set(battle.id, battle);
    return battle;
  }

  getBattle(id: string): Battle | undefined {
    return this.battles.get(id);
  }

  getAllBattles(): Battle[] {
    return Array.from(this.battles.values());
  }

  updateBattleStatus(id: string, status: BattleStatus): Battle | null {
    const battle = this.battles.get(id);
    if (!battle) return null;

    battle.status = status;

    if (status === 'running' && !battle.startedAt) {
      battle.startedAt = new Date();
    }

    if (status === 'completed' && !battle.completedAt) {
      battle.completedAt = new Date();
    }

    this.battles.set(id, battle);
    return battle;
  }

  deleteBattle(id: string): boolean {
    return this.battles.delete(id);
  }
}

export const battleService = new BattleService();
