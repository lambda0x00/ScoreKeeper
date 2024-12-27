import { useState } from 'react';
import { Game, doTurn } from '../game';
import GameSummary from './GameSummary';
import PlayerScore from './PlayerScore';
import ScoreEditor from './ScoreEditor';

interface Props {
    game: Game;
    setGame: (game: Game) => void;
}

export default function ScoreKeeper({ game, setGame }: Props) {
    const [turnScores, setTurnScores] = useState<{ [key: number]: string }>({});
    const [showSummary, setShowSummary] = useState(false);
    const [editingPlayerIndex, setEditingPlayerIndex] = useState<number | null>(null);

    const isTurnEmpty = game.players[0].turnScores.length === 0;

    const handleTurnScoreChange = (playerIndex: number, value: string) => {
        setTurnScores(prev => ({
            ...prev,
            [playerIndex]: value
        }));
    };

    const handleEndTurn = () => {
        const scores = game.players.map((_, index) =>
            parseInt(turnScores[index] || '0') || 0
        );
        setGame(doTurn(game, scores));
        setTurnScores({});
    };

    const handleEdit = (game: Game) => {
        setGame(game);
        setEditingPlayerIndex(null);
    }

    const handleRollbackTurn = () => {
        if (game.players[0].turnScores.length > 0) {
            const newGame = {
                ...game,
                players: game.players.map(player => ({
                    ...player,
                    turnScores: player.turnScores.slice(0, -1)
                }))
            };
            setGame(newGame);
        }
    };

    const totalScores = game.players.map(player => player.turnScores.reduce((a, b) => a + b, 0));
    const winningScore = game.scoringType === 'highest'
        ? Math.max(...totalScores)
        : Math.min(...totalScores);

    const areAllScoresEntered = () => {
        return game.players.every((_, index) => 
            turnScores[index] !== undefined && turnScores[index] !== ''
        );
    };

    return (
        <>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3" style={{ overflowY: "auto" }}>
                {game.players.map((player, index) => (
                    <div key={player.name + index} className="col">
                        <PlayerScore
                            playerName={player.name}
                            totalScore={totalScores[index]}
                            isWinning={totalScores[index] === winningScore}
                            turnScore={turnScores[index] || ''}
                            onTurnScoreChange={(value) => handleTurnScoreChange(index, value)}
                            onEdit={() => setEditingPlayerIndex(index)}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-3 d-flex gap-2">
                <button
                    className="btn btn-outline-light"
                    onClick={handleEndTurn}
                    disabled={!areAllScoresEntered()}
                >
                    End Turn
                </button>
                <button
                    className="btn btn-warning"
                    onClick={handleRollbackTurn}
                    disabled={isTurnEmpty}
                >
                    Undo Last Turn
                </button>
            </div>
            <div className="mt-3">
                <button
                    className="btn btn-primary"
                    onClick={() => setShowSummary(true)}
                    disabled={isTurnEmpty}
                >
                    Show Summary
                </button>
            </div>
            {showSummary && (
                <GameSummary
                    game={game}
                    onClose={() => setShowSummary(false)}
                />
            )}
            {editingPlayerIndex !== null && (
                <ScoreEditor
                    game={game}
                    playerIndex={editingPlayerIndex}
                    onSubmit={handleEdit}
                    onCancel={() => setEditingPlayerIndex(null)}
                />
            )}
        </>
    );
}
