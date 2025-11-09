# Quick Start Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Build Shared Package

```bash
cd packages/shared
npm run build
cd ../..
```

## 3. Start the Application

```bash
npm run dev
```

This will start both the frontend and backend servers:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## 4. Create Your First Bot

1. Open http://localhost:5173 in your browser
2. Click **"+ New Bot"** button
3. Enter a bot name (e.g., "Warrior Bot")
4. Write your bot's algorithm in the code editor
5. Click **"Create Bot"**

## 5. Start a Battle

1. Select at least 2 bots by clicking on them (they'll turn blue)
2. Click **"Start Battle"** in the right sidebar
3. Watch your bots fight in real-time!

## Example Bot Algorithm

Currently, the bots use placeholder logic (random actions). You can write any JavaScript code in the editor - the actual execution will be implemented in the next phase.

```javascript
// Example bot algorithm (placeholder)
if (enemy.health < 50) {
  attack(enemy);
} else {
  defend();
}

for (let i = 0; i < 3; i++) {
  move('forward');
}
```

## Troubleshooting

### Port already in use
If you get a port conflict error, kill the process using that port or change the port in the config files.

### WebSocket connection failed
Make sure the backend is running on port 3001.

### Monaco Editor not loading
Make sure all dependencies are installed (`npm install`).

## Development Tips

- **Hot Reload**: Both frontend and backend support hot reload during development
- **Console Logs**: Check browser console for frontend logs and terminal for backend logs
- **WebSocket Events**: Watch the terminal to see real-time battle events

## Next Steps

The current implementation has:
- ✅ Full TypeScript monorepo setup
- ✅ Frontend with React + Vite + Tailwind
- ✅ Monaco code editor
- ✅ Backend with Express + Socket.io
- ✅ Real-time WebSocket communication
- ✅ Basic battle visualization
- ✅ Bot creation and management

To implement:
- ⏳ Algorithm parsing and execution
- ⏳ Proper game rules (damage, defense, movement)
- ⏳ User authentication
- ⏳ Battle replay system
- ⏳ Leaderboard
- ⏳ Tournaments

Happy coding!
