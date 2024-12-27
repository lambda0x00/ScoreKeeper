import { Game, createGame, duplicateGame } from "../game";
import GameEntry from "./GameEntry";
import ScoreKeeper from "./ScoreKeeper";
import { useState } from "react";
import GameSettings from "./GameSettings";

interface Props {
    games: Game[]
    setGames: (games: Game[]) => void;
}

export default function GameList({ games, setGames }: Props) {
    const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(null);
    const [showGameCreation, setShowGameCreation] = useState(false);
    const [editingGameIndex, setEditingGameIndex] = useState<number | null>(null);

    if (selectedGameIndex !== null) {
        const selectedGame = games[selectedGameIndex];
        return (
            <div className="d-flex flex-column" style={{ height: '100%' }}>
                <div>
                    <button 
                        className="btn btn-outline-light mb-3"
                        onClick={() => setSelectedGameIndex(null)}
                    >
                        Back to List
                    </button>
                </div>
                <ScoreKeeper 
                    game={selectedGame}
                    setGame={(updatedGame) => {
                        setGames(games.map((g, i) => 
                            i === selectedGameIndex ? {
                                ...updatedGame,
                                lastViewedAt: new Date()
                            } : g
                        ));
                    }}
                />
            </div>
        );
    }

    return (
        <div className="d-flex flex-column" style={{ height: '100%' }}>
            <div>
                <button
                    className="btn btn-primary mb-3"
                    onClick={() => setShowGameCreation(true)}
                >
                    New Game
                </button>
            </div>

            <div style={{
                overflowY: "auto",
                flex: 1,
                minHeight: 0
            }}>
                {games.sort((a, b) => b.lastViewedAt.getTime() - a.lastViewedAt.getTime()).map((game, index) => (
                    <GameEntry
                        key={index}
                        game={game}
                        onDelete={() => {
                            setGames(games.filter((_, i) => i !== index));
                        }}
                        onDuplicate={() => {
                            const duplicatedGame = duplicateGame(game);
                            setGames([duplicatedGame, ...games]);
                        }}
                        onNewWithSamePlayers={() => {
                            const newGame = createGame(
                                game.players.map(p => p.name),
                                game.scoringType
                            );
                            setGames([newGame, ...games]);
                        }}
                        onEdit={() => {
                            setEditingGameIndex(index);
                        }}
                        onClick={() => {
                            setSelectedGameIndex(index);
                            setGames(games.map((g, i) => 
                                i === index ? { ...g, lastViewedAt: new Date() } : g
                            ));
                        }}
                    />
                ))}
            </div>

            {(showGameCreation || editingGameIndex !== null) && (
                <GameSettings
                    existingGame={editingGameIndex !== null ? games[editingGameIndex] : undefined}
                    onSubmit={(game) => {
                        if (editingGameIndex !== null) {
                            setGames(games.map((g, i) => 
                                i === editingGameIndex ? {
                                    ...game,
                                    lastViewedAt: new Date()
                                } : g
                            ));
                            setEditingGameIndex(null);
                        } else {
                            setGames([game, ...games]);
                            setShowGameCreation(false);
                        }
                    }}
                    onCancel={() => {
                        setEditingGameIndex(null);
                        setShowGameCreation(false);
                    }}
                />
            )}
        </div>
    );
}
