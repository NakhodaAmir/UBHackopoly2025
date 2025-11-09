import { useGameStore } from '../../store/gameStore';
import BotSprite from './BotSprite';

export default function BattleArena() {
  const { currentBattle } = useGameStore();

  if (!currentBattle) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-800 rounded-lg border border-slate-600">
        <div className="text-center text-slate-400">
          <h3 className="text-xl font-semibold mb-2">No Active Battle</h3>
          <p>Select bots and start a battle to see the action!</p>
        </div>
      </div>
    );
  }

  const arenaSize = 10;

  return (
    <div className="h-full flex flex-col bg-slate-800 rounded-lg border border-slate-600 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Battle Arena</h2>
        <div className="flex gap-4 text-sm">
          <span className="text-slate-400">
            Turn: <span className="text-white font-semibold">{currentBattle.currentTurn}</span> / {currentBattle.maxTurns}
          </span>
          <span className={`font-semibold ${
            currentBattle.status === 'running' ? 'text-green-400' :
            currentBattle.status === 'completed' ? 'text-blue-400' :
            'text-yellow-400'
          }`}>
            {currentBattle.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Arena Grid */}
      <div className="flex-1 relative bg-slate-900 rounded border border-slate-700">
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${arenaSize}, 1fr)`,
            gridTemplateRows: `repeat(${arenaSize}, 1fr)`
          }}
        >
          {Array.from({ length: arenaSize * arenaSize }).map((_, i) => (
            <div
              key={i}
              className="border border-slate-800"
            />
          ))}
        </div>

        {/* Bots */}
        <div className="absolute inset-0">
          {currentBattle.bots.map((bot) => (
            <BotSprite
              key={bot.id}
              bot={bot}
              arenaSize={arenaSize}
            />
          ))}
        </div>
      </div>

      {/* Battle Log */}
      <div className="mt-4 h-32 bg-slate-900 rounded border border-slate-700 p-3 overflow-y-auto">
        <h3 className="text-sm font-semibold mb-2 text-slate-300">Battle Log</h3>
        <div className="space-y-1 text-xs text-slate-400">
          {currentBattle.turns.slice(-5).reverse().map((turn) => (
            <div key={turn.number}>
              <span className="text-slate-500">Turn {turn.number}:</span>{' '}
              {turn.actions.map((action, i) => (
                <span key={i} className="ml-2">{action.result.message}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
