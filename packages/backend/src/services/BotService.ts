import { Bot, BotStats, Position } from '@ubhackopoly/shared';
import { v4 as uuidv4 } from 'uuid';

class BotService {
  private bots: Map<string, Bot> = new Map();

  createBot(name: string, algorithm: string): Bot {
    const bot: Bot = {
      id: uuidv4(),
      name,
      stats: {
        health: 100,
        maxHealth: 100,
        energy: 100,
        maxEnergy: 100
      },
      position: {
        x: 0,
        y: 0
      },
      algorithm: {
        code: algorithm
      },
      status: 'alive'
    };

    this.bots.set(bot.id, bot);
    return bot;
  }

  getBot(id: string): Bot | undefined {
    return this.bots.get(id);
  }

  getAllBots(): Bot[] {
    return Array.from(this.bots.values());
  }

  updateBot(id: string, name?: string, algorithm?: string): Bot | null {
    const bot = this.bots.get(id);
    if (!bot) return null;

    if (name) bot.name = name;
    if (algorithm) bot.algorithm.code = algorithm;

    this.bots.set(id, bot);
    return bot;
  }

  deleteBot(id: string): boolean {
    return this.bots.delete(id);
  }

  resetBot(bot: Bot): void {
    bot.stats.health = bot.stats.maxHealth;
    bot.stats.energy = bot.stats.maxEnergy;
    bot.status = 'alive';
  }
}

export const botService = new BotService();
