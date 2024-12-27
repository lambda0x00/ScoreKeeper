# Score Keeper

A React-based web application for tracking scores in multiplayer games. Built with TypeScript, Vite, and Bootstrap.

## Features

- Track scores for 2-15 players
- Support for both highest-score-wins and lowest-score-wins game types
- Real-time score tracking and updates
- Visual score history with interactive charts
- Persistent storage using localStorage
- Responsive design that works on mobile and desktop
- Dark theme support

## Key Capabilities

- Create and manage multiple games
- Edit player scores retroactively
- Duplicate existing games
- Start new games with the same players
- View game summaries with score progression charts
- Undo last turn
- Edit player names and scoring rules

## Technical Stack

- React 18
- TypeScript
- Vite
- Bootstrap 5
- Recharts for data visualization
- date-fns for date formatting

## Project Structure

The project follows a component-based architecture with the following key files:

- `src/game.ts` - Core game logic and types
- `src/App.tsx` - Main application component
- `src/components/` - React components including:
  - GameList - Game management interface
  - ScoreKeeper - Score tracking interface
  - GameSummary - Score visualization and statistics
  - GameSettings - Game creation and editing
  - PlayerScore - Individual player score display
  - ScoreEditor - Score editing interface
  - GameEntry - Game list entry