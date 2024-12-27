import { useState } from "react";
import { Game, createGame, ScoringType } from "../game";

interface Props {
    onSubmit: (game: Game) => void;
    onCancel: () => void;
    existingGame?: Game;
}

export default function GameSettings({ onSubmit, onCancel, existingGame }: Props) {
    const [players, setPlayers] = useState<string[]>(
        existingGame 
            ? existingGame.players.map(p => p.name)
            : ['', '']
    );
    const [scoringType, setScoringType] = useState<ScoringType>(
        existingGame?.scoringType ?? 'highest'
    );

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {existingGame ? 'Edit Game' : 'New Game'}
                        </h5>
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={onCancel}
                        />
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Scoring Type</label>
                            <div className="btn-group w-100">
                                <button
                                    className={`btn btn-outline-primary ${scoringType === 'highest' ? 'active' : ''}`}
                                    onClick={() => setScoringType('highest')}
                                >
                                    Highest Score Wins
                                </button>
                                <button
                                    className={`btn btn-outline-primary ${scoringType === 'lowest' ? 'active' : ''}`}
                                    onClick={() => setScoringType('lowest')}
                                >
                                    Lowest Score Wins
                                </button>
                            </div>
                        </div>

                        <div className="mb-3" style={{ 
                            maxHeight: '400px', 
                            overflowY: 'auto'
                        }}>
                            {players.map((player, index) => (
                                <div key={index} className={index === players.length - 1 ? '' : 'mb-3'}>
                                    <label className="form-label">Player {index + 1}</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={player}
                                            onChange={(e) => {
                                                const newPlayers = [...players];
                                                newPlayers[index] = e.target.value;
                                                setPlayers(newPlayers);
                                            }}
                                            placeholder="Enter player name"
                                        />
                                        {players.length > 2 && (
                                            <button 
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    setPlayers(players.filter((_, i) => i !== index));
                                                }}
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            className="btn btn-outline-light"
                            onClick={() => setPlayers([...players, ''])}
                            disabled={players.length >= 15}
                        >
                            Add Player
                        </button>
                        {players.length >= 15 && (
                            <div className="text-muted small mt-2">
                                Maximum number of players (15) reached
                            </div>
                        )}
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
                            onClick={() => {
                                const validPlayers = players.filter(p => p.trim() !== '');
                                if (validPlayers.length >= 2) {
                                    if (existingGame) {
                                        const maxTurns = Math.max(...existingGame.players.map(p => p.turnScores.length));
                                        const updatedPlayers = validPlayers.map(name => {
                                            const existingPlayer = existingGame.players.find(p => p.name === name);
                                            return {
                                                name,
                                                turnScores: existingPlayer 
                                                    ? existingPlayer.turnScores 
                                                    : Array(maxTurns).fill(0)
                                            };
                                        });
                                        onSubmit({
                                            ...existingGame,
                                            players: updatedPlayers,
                                            scoringType
                                        });
                                    } else {
                                        onSubmit(createGame(validPlayers, scoringType));
                                    }
                                }
                            }}
                            disabled={players.filter(p => p.trim() !== '').length < 2}
                        >
                            {existingGame ? 'Save Changes' : 'Create Game'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
