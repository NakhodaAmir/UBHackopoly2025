# UBHackopoly2025 - Bot Battle Arena

A web-based bot programming game where players create algorithms for their bots to fight each other!

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- Tailwind CSS
- Monaco Editor (VS Code editor)
- Socket.io Client
- Zustand (state management)

**Backend:**
- Express.js + TypeScript
- Socket.io (WebSockets for real-time battles)
- In-memory storage (no database)

**Monorepo:**
- npm workspaces
- Shared TypeScript types package

## Project Structure

```
UBHackopoly2025/
├── packages/
│   ├── frontend/          # React frontend app
│   ├── backend/           # Express backend server
│   └── shared/            # Shared TypeScript types
├── package.json           # Root workspace config
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v10 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd UBHackopoly2025
```

2. Install all dependencies:
```bash
npm install
```

3. Build the shared types package:
```bash
cd packages/shared
npm run build
cd ../..
```

### Running the Application

#### Option 1: Run both frontend and backend together
```bash
npm run dev
```

#### Option 2: Run them separately

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## How to Use

1. **Create a Bot:**
   - Click "+ New Bot" in the left sidebar
   - Give your bot a name
   - Write your bot's algorithm in the Monaco editor
   - Click "Create Bot"

2. **Select Bots for Battle:**
   - Click on bots in the list to select them (at least 2)
   - Selected bots will be highlighted in blue

3. **Start a Battle:**
   - Click "Start Battle" in the right sidebar
   - Watch your bots fight in real-time in the arena!

4. **Control the Battle:**
   - Pause/Resume the battle
   - Stop the battle
   - View battle log and winner

## Features

- **Monaco Code Editor**: Professional code editing experience
- **Real-time Battles**: Watch bots fight with WebSocket updates
- **Visual Arena**: Grid-based battle visualization with health bars
- **Multiple Bots**: Support for multiple bots in one battle
- **Battle Controls**: Pause, resume, and stop battles
- **Battle Log**: See all actions happening in real-time

## Game Mechanics (To Be Implemented)

The following game features are planned:
- **Actions**: attack, defend, move, heal, wait
- **Programming Constructs**: if statements, for loops, while loops
- **Bot Attributes**: health, energy, position
- **Win Conditions**: Last bot standing

## Project Commands

```bash
# Development
npm run dev              # Run both frontend and backend
npm run dev:frontend     # Run only frontend
npm run dev:backend      # Run only backend

# Building
npm run build            # Build all packages

# Cleaning
npm run clean            # Clean all build artifacts
```

## Next Steps

1. Implement algorithm parsing (DSL or JavaScript sandbox)
2. Add proper game rules and mechanics
3. Implement action execution logic
4. Add user authentication
5. Add battle replay system
6. Add leaderboard
7. Add tournament system

## Contributing

This is a hackathon project. Feel free to contribute!

## License

ISC

## Enemy info
H:S:A
1. L1 atk	40	50	60
1. L1 def	60	50	40
1. L2 atk	50	60	65	Use Charge
   if status != charge:
      charge
   else:
      attack
1. L2 def	95	40	40	Use HEAL
   if AP == max:
      deffend
   else:
      attack
1. L3 atk	50	80	70	Use Poison
   if player != poison:
      poison
   else:
      attack
1. L3 def	70	50	80	Use Vulnerable
   if player != vulnerable:
      vulnerable
   else:
      attack
1. L4 atk	55	70	100	Use Stun
   if hp < 30:
      defend
   elif:
      Stun every three turn
   else:
      attack
1. L4 def	125	50	50	Use HEAL adn DEFEND
   if hp > 80:
      deffend
   elif hp < 30:
      heal
   else:
      attack
1. L5 atk	70	80	100
   if player != diffend:
      charge
      attack
   else:
      stun
1. L5 def	110	70	70
   if player have any stutus:
      vulnerable
   elif hp < 60
      deffend

STUN　On the next turn, the player will be unable to execute any of their three action slots.(able to counter)
POISON Lasts for 3 turns. At the start of each turn, you take **5% of your maximum HP** in damage.
VULNERBLE Lasts for 2 turns. All damage taken is doubled.

## action

ATTACK    2 AP   Deal damage (Attack value)

CHARGE    1 AP    For 3 turns, grants a buff that increases the next ATTACK damage by 20%.

HEAL    4 AP        Restores 100 HP to yourself.

DEFEND    2 AP        Reduces enemy damage taken by 80%.

COUNTER    3 AP    Success: Reflects 1.5 times the damage received. Failure: Takes 20% of maximum HP as damage.

CLEANSE　4 AP   Instantly removes all status ailments. Does not restore HP.



You can get 4 ap every single turn 
Start from 8 AP
