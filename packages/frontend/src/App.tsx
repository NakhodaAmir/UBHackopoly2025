import { useEffect } from 'react';
import { useSocket } from './hooks/useSocket';
import BattleArena from './components/BattleArena/BattleArena';
import BotList from './components/BotList/BotList';
import BattleControls from './components/Controls/BattleControls';

function App() {
  const socket = useSocket();

  useEffect(() => {
    console.log('App mounted, socket connected:', socket.connected);
  }, [socket]);

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          UB Hackopoly 2025 - Bot Battle Arena
        </h1>
        <p className="text-center text-slate-400 mt-2">
          Create bots, write algorithms, and watch them battle!
        </p>
      </header>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">
        {/* Left Sidebar - Bot List */}
        <div className="col-span-3">
          <BotList />
        </div>

        {/* Main Area - Battle Arena */}
        <div className="col-span-6">
          <BattleArena />
        </div>

        {/* Right Sidebar - Controls */}
        <div className="col-span-3">
          <BattleControls />
        </div>
      </div>
    </div>
  );
}

export default App;
