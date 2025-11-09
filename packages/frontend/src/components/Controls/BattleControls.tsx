import { useGameStore } from '../../store/gameStore';
import { socket } from '../../services/socket';

export default function BattleControls() {
  const { selectedBots, currentBattle } = useGameStore();

  const handleStartBattle = () => {
    if (selectedBots.length < 2) {
      alert('Select at least 2 bots to start a battle!');
      return;
    }
    socket.emit('battle:start', selectedBots);
  };

  const handlePauseBattle = () => {
    if (currentBattle) {
      socket.emit('battle:pause', currentBattle.id);
    }
  };

  const handleResumeBattle = () => {
    if (currentBattle) {
      socket.emit('battle:resume', currentBattle.id);
    }
  };

  const handleStopBattle = () => {
    if (currentBattle && confirm('Are you sure you want to stop the battle?')) {
      socket.emit('battle:stop', currentBattle.id);
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-600 p-4">
      <h2 className="text-xl font-bold mb-4">Battle Controls</h2>

      <div className="space-y-3">
        {!currentBattle || currentBattle.status === 'completed' ? (
          <button
            onClick={handleStartBattle}
            disabled={selectedBots.length < 2}
            className={`w-full px-4 py-3 rounded font-semibold transition-colors ${
              selectedBots.length >= 2
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Start Battle {selectedBots.length >= 2 && `(${selectedBots.length} bots)`}
          </button>
        ) : (
          <>
            {currentBattle.status === 'running' && (
              <button
                onClick={handlePauseBattle}
                className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 rounded font-semibold transition-colors"
              >
                Pause Battle
              </button>
            )}

            {currentBattle.status === 'paused' && (
              <button
                onClick={handleResumeBattle}
                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded font-semibold transition-colors"
              >
                Resume Battle
              </button>
            )}

            <button
              onClick={handleStopBattle}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 rounded font-semibold transition-colors"
            >
              Stop Battle
            </button>
          </>
        )}
      </div>

      {currentBattle && currentBattle.winner && (
        <div className="mt-4 p-3 bg-green-900 border border-green-600 rounded">
          <p className="text-center font-semibold">
            Winner: {currentBattle.bots.find(b => b.id === currentBattle.winner)?.name}
          </p>
        </div>
      )}
    </div>
  );
}
