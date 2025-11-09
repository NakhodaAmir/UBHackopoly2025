# Architecture Documentation

## Overview

This is a full-stack TypeScript monorepo for a bot programming battle game.

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Monaco Editor** - Code editor (VS Code's editor)
- **Socket.io Client** - Real-time WebSocket connection
- **Zustand** - State management

### Backend
- **Express.js** - Web server
- **Socket.io** - WebSocket server for real-time communication
- **TypeScript** - Type safety
- **In-memory storage** - No database (for now)

### Shared
- **TypeScript types** - Shared between frontend and backend

## Project Structure

```
packages/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BattleArena/       # Battle visualization
│   │   │   │   ├── BattleArena.tsx
│   │   │   │   └── BotSprite.tsx
│   │   │   ├── BotList/           # Bot management
│   │   │   │   └── BotList.tsx
│   │   │   ├── CodeEditor/        # Monaco editor wrapper
│   │   │   │   └── CodeEditor.tsx
│   │   │   └── Controls/          # Battle controls
│   │   │       └── BattleControls.tsx
│   │   ├── hooks/
│   │   │   └── useSocket.ts       # WebSocket hook
│   │   ├── services/
│   │   │   └── socket.ts          # Socket.io client setup
│   │   ├── store/
│   │   │   └── gameStore.ts       # Zustand store
│   │   ├── App.tsx                # Main app component
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Tailwind styles
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── game-engine/
│   │   │   ├── BattleEngine.ts    # Battle simulation logic
│   │   │   └── BotExecutor.ts     # Bot algorithm execution
│   │   ├── services/
│   │   │   ├── BotService.ts      # Bot CRUD operations
│   │   │   └── BattleService.ts   # Battle CRUD operations
│   │   ├── websocket/
│   │   │   └── socketHandlers.ts  # Socket.io event handlers
│   │   └── index.ts               # Express + Socket.io setup
│   └── package.json
│
└── shared/
    ├── src/
    │   ├── types/
    │   │   ├── bot.ts             # Bot-related types
    │   │   ├── battle.ts          # Battle-related types
    │   │   └── websocket.ts       # WebSocket event types
    │   └── index.ts               # Export all types
    └── package.json
```

## Data Flow

### Bot Creation Flow
1. User enters bot name and code in frontend
2. Frontend emits `bot:create` event via Socket.io
3. Backend `BotService` creates bot with unique ID
4. Backend emits `bot:created` to all clients
5. Frontend updates local state via Zustand

### Battle Flow
1. User selects bots and clicks "Start Battle"
2. Frontend emits `battle:start` with bot IDs
3. Backend `BattleService` creates battle instance
4. Backend `BattleEngine` starts turn-based simulation
5. Every turn (1 second):
   - `BotExecutor` runs each bot's algorithm
   - Actions are applied to bots
   - Backend emits `battle:turn` with actions
   - Frontend updates arena visualization
6. Battle ends when one bot remains or max turns reached
7. Backend emits `battle:completed` with winner

## Key Components

### Frontend

#### GameStore (Zustand)
```typescript
{
  bots: Bot[]              // All created bots
  battles: Battle[]        // Battle history
  currentBattle: Battle    // Active battle
  selectedBots: string[]   // Selected bot IDs
}
```

#### useSocket Hook
Manages all WebSocket event listeners and updates the store.

#### BattleArena
Visualizes the battle on a grid with bot sprites and health bars.

### Backend

#### BotService
- In-memory Map of bots
- CRUD operations for bots
- Bot stats management

#### BattleService
- In-memory Map of battles
- Battle lifecycle management
- Battle status updates

#### BattleEngine
- Turn-based battle simulation
- Runs battles at 1 second per turn
- Applies bot actions
- Determines winner

#### BotExecutor
- **Current**: Returns random actions (placeholder)
- **Future**: Parse and execute user algorithms

## WebSocket Events

### Client → Server
- `bot:create` - Create a new bot
- `bot:update` - Update bot code
- `bot:delete` - Delete a bot
- `battle:start` - Start a battle with selected bots
- `battle:pause` - Pause active battle
- `battle:resume` - Resume paused battle
- `battle:stop` - Stop battle early

### Server → Client
- `bots:list` - All bots (sent on connect)
- `bot:created` - New bot created
- `bot:updated` - Bot updated
- `bot:deleted` - Bot deleted
- `battles:list` - All battles (sent on connect)
- `battle:created` - New battle created
- `battle:started` - Battle started
- `battle:turn` - Turn executed with actions
- `battle:completed` - Battle finished
- `battle:error` - Battle error occurred
- `error` - General error

## Type System

All types are defined in `packages/shared/src/types/` and shared between frontend and backend.

### Key Types

**Bot:**
```typescript
interface Bot {
  id: string;
  name: string;
  stats: BotStats;      // health, energy
  position: Position;   // x, y on grid
  algorithm: Algorithm; // user's code
  status: 'alive' | 'dead';
}
```

**Battle:**
```typescript
interface Battle {
  id: string;
  bots: Bot[];
  status: BattleStatus;     // waiting, running, paused, completed
  currentTurn: number;
  maxTurns: number;
  winner?: string;          // Bot ID
  turns: Turn[];            // Battle history
}
```

## Future Implementation Notes

### Algorithm Execution

**Option 1: Custom DSL Parser**
- Safe by design
- Full control over available actions
- Need to build parser
- Recommended for MVP

**Option 2: JavaScript Sandbox**
- Use `isolated-vm` or `vm2`
- More flexible
- Security concerns
- For advanced users

### Game Rules to Implement
- Attack damage calculations
- Defense mechanics (shields, damage reduction)
- Movement logic (collision, arena boundaries)
- Energy system (actions cost energy)
- Cooldowns for powerful actions
- Status effects (stun, poison, etc.)

### Authentication
- User registration/login
- Associate bots with users
- Private/public bot algorithms
- Rate limiting

### Additional Features
- Battle replay system
- Leaderboard (win rate, ELO rating)
- Tournament system
- Bot versioning
- Code sharing/marketplace
- Statistics dashboard

## Development Guidelines

1. **Type Safety**: Always use TypeScript types from `@ubhackopoly/shared`
2. **State Management**: Use Zustand for frontend state
3. **WebSocket**: All real-time communication via Socket.io
4. **No Database**: Current implementation uses in-memory storage
5. **Hot Reload**: Changes to frontend/backend auto-reload during development

## Performance Considerations

- Currently no limits on bot count or battle frequency
- Consider rate limiting for production
- Battle simulation runs on single thread (consider worker threads for scaling)
- In-memory storage will be lost on server restart
- No pagination implemented yet

## Security Considerations

- User code execution needs sandboxing
- Input validation on all WebSocket events
- Rate limiting to prevent spam
- CORS configured for localhost (update for production)
- No authentication yet (implement before production)
