import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { socket } from '../../services/socket';
import CodeEditor from '../CodeEditor/CodeEditor';

export default function BotList() {
  const { bots, selectedBots, toggleBotSelection } = useGameStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newBotName, setNewBotName] = useState('');
  const [newBotCode, setNewBotCode] = useState('');

  const handleCreateBot = () => {
    if (newBotName.trim()) {
      socket.emit('bot:create', {
        name: newBotName,
        algorithm: newBotCode
      });
      setNewBotName('');
      setNewBotCode('');
      setIsCreating(false);
    }
  };

  const handleDeleteBot = (botId: string) => {
    if (confirm('Are you sure you want to delete this bot?')) {
      socket.emit('bot:delete', botId);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-800 rounded-lg border border-slate-600 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Bots</h2>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-sm transition-colors"
        >
          {isCreating ? 'Cancel' : '+ New Bot'}
        </button>
      </div>

      {isCreating && (
        <div className="mb-4 p-4 bg-slate-900 rounded border border-slate-700">
          <input
            type="text"
            placeholder="Bot Name"
            value={newBotName}
            onChange={(e) => setNewBotName(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded mb-2 focus:outline-none focus:border-blue-500"
          />
          <div className="h-48 mb-2">
            <CodeEditor value={newBotCode} onChange={(val) => setNewBotCode(val || '')} />
          </div>
          <button
            onClick={handleCreateBot}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold transition-colors"
          >
            Create Bot
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-2">
        {bots.length === 0 ? (
          <div className="text-center text-slate-400 py-8">
            <p>No bots yet. Create your first bot!</p>
          </div>
        ) : (
          bots.map((bot) => (
            <div
              key={bot.id}
              className={`p-3 rounded border transition-all cursor-pointer ${
                selectedBots.includes(bot.id)
                  ? 'bg-blue-900 border-blue-500'
                  : 'bg-slate-900 border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => toggleBotSelection(bot.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold">{bot.name}</h3>
                  <div className="text-xs text-slate-400 mt-1">
                    HP: {bot.stats.health}/{bot.stats.maxHealth} |
                    Energy: {bot.stats.energy}/{bot.stats.maxEnergy}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Status: {bot.status}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBot(bot.id);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-slate-400">
        {selectedBots.length > 0 && (
          <p>{selectedBots.length} bot(s) selected for battle</p>
        )}
      </div>
    </div>
  );
}
