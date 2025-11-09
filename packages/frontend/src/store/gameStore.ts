import { create } from 'zustand';
import { Bot, Battle, BotAction } from '@ubhackopoly/shared';

interface GameState {
  bots: Bot[];
  battles: Battle[];
  currentBattle: Battle | null;
  selectedBots: string[];

  // Actions
  setBots: (bots: Bot[]) => void;
  addBot: (bot: Bot) => void;
  updateBot: (bot: Bot) => void;
  removeBot: (botId: string) => void;

  setBattles: (battles: Battle[]) => void;
  setCurrentBattle: (battle: Battle | null) => void;
  updateCurrentBattle: (battle: Battle) => void;

  toggleBotSelection: (botId: string) => void;
  clearBotSelection: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  bots: [],
  battles: [],
  currentBattle: null,
  selectedBots: [],

  setBots: (bots) => set({ bots }),

  addBot: (bot) => set((state) => ({
    bots: [...state.bots, bot]
  })),

  updateBot: (bot) => set((state) => ({
    bots: state.bots.map(b => b.id === bot.id ? bot : b)
  })),

  removeBot: (botId) => set((state) => ({
    bots: state.bots.filter(b => b.id !== botId),
    selectedBots: state.selectedBots.filter(id => id !== botId)
  })),

  setBattles: (battles) => set({ battles }),

  setCurrentBattle: (battle) => set({ currentBattle: battle }),

  updateCurrentBattle: (battle) => set({ currentBattle: battle }),

  toggleBotSelection: (botId) => set((state) => {
    const isSelected = state.selectedBots.includes(botId);
    return {
      selectedBots: isSelected
        ? state.selectedBots.filter(id => id !== botId)
        : [...state.selectedBots, botId]
    };
  }),

  clearBotSelection: () => set({ selectedBots: [] })
}));
