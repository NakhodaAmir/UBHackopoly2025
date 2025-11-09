import { Bot } from '@ubhackopoly/shared';

interface BotSpriteProps {
  bot: Bot;
  arenaSize: number;
}

export default function BotSprite({ bot, arenaSize }: BotSpriteProps) {
  const cellSize = 100 / arenaSize;
  const healthPercentage = (bot.stats.health / bot.stats.maxHealth) * 100;

  // Position bot in grid
  const style = {
    left: `${bot.position.x * cellSize}%`,
    top: `${bot.position.y * cellSize}%`,
    width: `${cellSize}%`,
    height: `${cellSize}%`,
  };

  return (
    <div
      className="absolute flex flex-col items-center justify-center transition-all duration-300"
      style={style}
    >
      {/* Bot Avatar */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
          bot.status === 'alive' ? 'bg-blue-500' : 'bg-gray-500'
        }`}
      >
        {bot.name.charAt(0).toUpperCase()}
      </div>

      {/* Bot Name */}
      <div className="text-xs font-semibold mt-1 text-white truncate max-w-full px-1">
        {bot.name}
      </div>

      {/* Health Bar */}
      <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            healthPercentage > 50 ? 'bg-green-500' :
            healthPercentage > 25 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${healthPercentage}%` }}
        />
      </div>

      {/* Health Text */}
      <div className="text-xs text-slate-300 mt-0.5">
        {bot.stats.health}/{bot.stats.maxHealth}
      </div>
    </div>
  );
}
