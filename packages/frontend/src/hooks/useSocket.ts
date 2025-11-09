import { useEffect } from 'react';
import { socket } from '../services/socket';
import { useGameStore } from '../store/gameStore';

export function useSocket() {
  const {
    setBots,
    addBot,
    updateBot,
    removeBot,
    setBattles,
    setCurrentBattle,
    updateCurrentBattle,
    clearBotSelection
  } = useGameStore();

  useEffect(() => {
    // Bot events
    socket.on('bots:list', (bots) => {
      setBots(bots);
    });

    socket.on('bot:created', (bot) => {
      addBot(bot);
    });

    socket.on('bot:updated', (bot) => {
      updateBot(bot);
    });

    socket.on('bot:deleted', (botId) => {
      removeBot(botId);
    });

    // Battle events
    socket.on('battles:list', (battles) => {
      setBattles(battles);
    });

    socket.on('battle:created', (battle) => {
      setCurrentBattle(battle);
    });

    socket.on('battle:started', (battle) => {
      setCurrentBattle(battle);
      clearBotSelection();
    });

    socket.on('battle:turn', (battleId, turnNumber, actions) => {
      // Update battle state with new turn data
      // This will be used to update the UI in real-time
      console.log(`Turn ${turnNumber}:`, actions);
    });

    socket.on('battle:completed', (battle) => {
      updateCurrentBattle(battle);
      console.log('Battle completed!', battle.winner);
    });

    socket.on('battle:error', (error) => {
      console.error('Battle error:', error);
    });

    socket.on('error', (message) => {
      console.error('Socket error:', message);
    });

    // Cleanup
    return () => {
      socket.off('bots:list');
      socket.off('bot:created');
      socket.off('bot:updated');
      socket.off('bot:deleted');
      socket.off('battles:list');
      socket.off('battle:created');
      socket.off('battle:started');
      socket.off('battle:turn');
      socket.off('battle:completed');
      socket.off('battle:error');
      socket.off('error');
    };
  }, []);

  return socket;
}
