import { useState } from "react";
import { Game } from "./game";
import GameList from "./components/GameList";

function App() {
    // Initialize state from localStorage, falling back to empty array if nothing stored
    const [games, setGames] = useState<Game[]>(() => {
        const savedGames = localStorage.getItem('games');
        if (!savedGames) return [];
        
        // Parse JSON and convert date strings back to Date objects
        const parsedGames = JSON.parse(savedGames);
        return parsedGames.map((game: any) => ({
            ...game,
            lastViewedAt: new Date(game.lastViewedAt)
        }));
    });

    // Create a wrapper function for setGames that also updates localStorage
    const updateGames = (newGames: Game[] | ((prev: Game[]) => Game[])) => {
        setGames((prevGames) => {
            const updatedGames = typeof newGames === 'function' ? newGames(prevGames) : newGames;
            localStorage.setItem('games', JSON.stringify(updatedGames));
            return updatedGames;
        });
    };

    return (
        <div style={{ 
            width: '100vw', 
            height: '100vh', 
            overflow: 'hidden' // Prevent window scrolling
        }} className="container p-2">
            <GameList games={games} setGames={updateGames} />
        </div>
    )
}

export default App
