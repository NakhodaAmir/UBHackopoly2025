import { Battle, BotAction, Turn, ActionType, Bot } from '@ubhackopoly/shared';
import { Server } from 'socket.io';
import { battleService } from '../services/BattleService';
import { botExecutor } from './BotExecutor';

class BattleEngine {
  private activeBattles: Map<string, NodeJS.Timeout> = new Map();

  async startBattle(battle: Battle, io: Server) {
    battleService.updateBattleStatus(battle.id, 'running');
    io.emit('battle:started', battle);

    // Initialize bot positions randomly
    this.initializeBotPositions(battle);

    // Run battle turns
    this.runBattleTurns(battle, io);
  }

  resumeBattle(battle: Battle, io: Server) {
    if (battle.status === 'paused') {
      battleService.updateBattleStatus(battle.id, 'running');
      this.runBattleTurns(battle, io);
    }
  }

  private initializeBotPositions(battle: Battle) {
    const arenaSize = 10;
    battle.bots.forEach((bot, index) => {
      // Simple positioning: spread bots around the arena
      bot.position = {
        x: Math.floor(Math.random() * arenaSize),
        y: Math.floor(Math.random() * arenaSize)
      };
    });
  }

  private async runBattleTurns(battle: Battle, io: Server) {
    const turnInterval = setInterval(() => {
      const updatedBattle = battleService.getBattle(battle.id);
      if (!updatedBattle) {
        clearInterval(turnInterval);
        return;
      }

      // Check if battle should continue
      if (updatedBattle.status === 'paused' || updatedBattle.status === 'completed') {
        clearInterval(turnInterval);
        this.activeBattles.delete(battle.id);
        return;
      }

      // Check win conditions
      const aliveBots = updatedBattle.bots.filter(bot => bot.status === 'alive');
      if (aliveBots.length <= 1 || updatedBattle.currentTurn >= updatedBattle.maxTurns) {
        this.endBattle(updatedBattle, aliveBots[0], io);
        clearInterval(turnInterval);
        this.activeBattles.delete(battle.id);
        return;
      }

      // Execute turn
      this.executeTurn(updatedBattle, io);
      updatedBattle.currentTurn++;

    }, 1000); // 1 second per turn

    this.activeBattles.set(battle.id, turnInterval);
  }

  private executeTurn(battle: Battle, io: Server) {
    const actions: BotAction[] = [];

    // Execute each bot's algorithm
    battle.bots.forEach(bot => {
      if (bot.status === 'alive') {
        const action = botExecutor.executeBot(bot, battle);
        actions.push(action);

        // Apply action effects
        this.applyAction(action, battle);
      }
    });

    // Create turn record
    const turn: Turn = {
      number: battle.currentTurn,
      actions,
      timestamp: new Date()
    };

    battle.turns.push(turn);

    // Emit turn to all clients
    io.emit('battle:turn', battle.id, battle.currentTurn, actions);
  }

  private applyAction(action: BotAction, battle: Battle) {
    const bot = battle.bots.find(b => b.id === action.botId);
    if (!bot) return;

    switch (action.action) {
      case 'attack':
        if (action.target) {
          const target = battle.bots.find(b => b.id === action.target);
          if (target && target.status === 'alive') {
            const damage = action.result.damage || 0;
            target.stats.health = Math.max(0, target.stats.health - damage);
            if (target.stats.health <= 0) {
              target.status = 'dead';
            }
          }
        }
        break;

      case 'defend':
        // TODO: Implement shield/defense logic
        break;

      case 'move':
        // TODO: Implement movement logic
        break;

      case 'heal':
        if (action.result.healAmount) {
          bot.stats.health = Math.min(
            bot.stats.maxHealth,
            bot.stats.health + action.result.healAmount
          );
        }
        break;

      case 'wait':
        // Do nothing
        break;
    }
  }

  private endBattle(battle: Battle, winner: Bot | undefined, io: Server) {
    battle.winner = winner?.id;
    battleService.updateBattleStatus(battle.id, 'completed');
    io.emit('battle:completed', battle);
    console.log(`🏆 Battle completed: ${battle.id}, Winner: ${winner?.name || 'None'}`);
  }
}

export const battleEngine = new BattleEngine();
