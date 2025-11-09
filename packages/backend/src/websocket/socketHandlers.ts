import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from '@ubhackopoly/shared';
import { botService } from '../services/BotService';
import { battleService } from '../services/BattleService';
import { battleEngine } from '../game-engine/BattleEngine';

type SocketServer = Server<ClientToServerEvents, ServerToClientEvents>;
type SocketClient = Socket<ClientToServerEvents, ServerToClientEvents>;

export function setupSocketHandlers(io: SocketServer) {
  io.on('connection', (socket: SocketClient) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Send current bots list on connection
    socket.emit('bots:list', botService.getAllBots());
    socket.emit('battles:list', battleService.getAllBattles());

    // Bot creation
    socket.on('bot:create', (data) => {
      try {
        const bot = botService.createBot(data.name, data.algorithm);
        io.emit('bot:created', bot);
        io.emit('bots:list', botService.getAllBots());
        console.log(`🤖 Bot created: ${bot.name} (${bot.id})`);
      } catch (error) {
        socket.emit('error', 'Failed to create bot');
        console.error('Error creating bot:', error);
      }
    });

    // Bot update
    socket.on('bot:update', (botId, data) => {
      try {
        const bot = botService.updateBot(botId, data.name, data.algorithm);
        if (bot) {
          io.emit('bot:updated', bot);
          io.emit('bots:list', botService.getAllBots());
          console.log(`🔄 Bot updated: ${bot.name} (${bot.id})`);
        } else {
          socket.emit('error', 'Bot not found');
        }
      } catch (error) {
        socket.emit('error', 'Failed to update bot');
        console.error('Error updating bot:', error);
      }
    });

    // Bot deletion
    socket.on('bot:delete', (botId) => {
      try {
        const success = botService.deleteBot(botId);
        if (success) {
          io.emit('bot:deleted', botId);
          io.emit('bots:list', botService.getAllBots());
          console.log(`🗑️ Bot deleted: ${botId}`);
        } else {
          socket.emit('error', 'Bot not found');
        }
      } catch (error) {
        socket.emit('error', 'Failed to delete bot');
        console.error('Error deleting bot:', error);
      }
    });

    // Battle start
    socket.on('battle:start', async (botIds) => {
      try {
        const bots = botIds.map(id => botService.getBot(id)).filter(Boolean);

        if (bots.length < 2) {
          socket.emit('battle:error', 'Need at least 2 bots to start a battle');
          return;
        }

        const battle = battleService.createBattle(bots as any);
        io.emit('battle:created', battle);
        console.log(`⚔️ Battle created: ${battle.id} with ${bots.length} bots`);

        // Start the battle
        battleEngine.startBattle(battle, io);
      } catch (error) {
        socket.emit('battle:error', 'Failed to start battle');
        console.error('Error starting battle:', error);
      }
    });

    // Battle pause
    socket.on('battle:pause', (battleId) => {
      const battle = battleService.updateBattleStatus(battleId, 'paused');
      if (battle) {
        console.log(`⏸️ Battle paused: ${battleId}`);
      }
    });

    // Battle resume
    socket.on('battle:resume', (battleId) => {
      const battle = battleService.getBattle(battleId);
      if (battle) {
        battleService.updateBattleStatus(battleId, 'running');
        battleEngine.resumeBattle(battle, io);
        console.log(`▶️ Battle resumed: ${battleId}`);
      }
    });

    // Battle stop
    socket.on('battle:stop', (battleId) => {
      const battle = battleService.updateBattleStatus(battleId, 'completed');
      if (battle) {
        io.emit('battle:completed', battle);
        console.log(`🛑 Battle stopped: ${battleId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}
