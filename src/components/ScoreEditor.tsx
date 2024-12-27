import { Game } from "../game";
import { useState } from "react";

interface Props {
    game: Game;
    playerIndex: number;
    onSubmit: (updatedGame: Game) => void;
    onCancel: () => void;
}

export default function ScoreEditor({ game, playerIndex, onSubmit, onCancel }: Props) {
    const player = game.players[playerIndex];
    const [scores, setScores] = useState<number[]>([...player.turnScores]);

    const handleScoreChange = (turnIndex: number, value: string) => {
        const newScores = [...scores];
        newScores[turnIndex] = value === '' ? 0 : parseInt(value);
        setScores(newScores);
    };

    const handleSubmit = () => {
        const updatedGame = {
            ...game,
            players: game.players.map((p, index) => 
                index === playerIndex 
                    ? { ...p, turnScores: scores }
                    : p
            )
        };
        onSubmit(updatedGame);
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Scores for {player.name}</h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={onCancel}
                        />
                    </div>
                    <div className="modal-body">
                        <div style={{ 
                            maxHeight: '300px', 
                            overflowY: scores.length > 5 ? 'auto' : 'visible'
                        }}>
                            {[...scores].reverse().map((score, index) => {
                                const actualTurnIndex = scores.length - 1 - index;
                                return (
                                    <div key={actualTurnIndex} className="mb-3">
                                        <div className="input-group">
                                            <span className="input-group-text">Turn {actualTurnIndex + 1}</span>
                                            <input
                                                type="number"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                className="form-control"
                                                value={score}
                                                onChange={(e) => handleScoreChange(actualTurnIndex, e.target.value)}
                                                placeholder="Enter score"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {scores.length === 0 && (
                                <div className="text-muted text-center">
                                    No turns recorded yet
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button 
                            className="btn btn-secondary" 
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
