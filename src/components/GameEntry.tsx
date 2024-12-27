import { Game } from "../game";
import { format, isThisYear } from "date-fns";

interface Props {
    onDuplicate: () => void;
    onDelete: () => void;
    onEdit: () => void;
    game: Game;
    onClick: () => void;
    onNewWithSamePlayers: () => void;
}

export default function GameEntry({ game, onDelete, onDuplicate, onClick, onEdit, onNewWithSamePlayers }: Props) {
    const dateFormat = isThisYear(game.lastViewedAt) 
        ? "h:mm a, MMMM d"
        : "h:mm a, MMMM d, yyyy";

    return (
        <div className="card mb-3 hover-card" onClick={onClick}>
            <div className="card-body">
                <h5 className="card-title">
                    {format(game.lastViewedAt, dateFormat)}
                </h5>
                <p className="card-text text-muted">
                    {game.players.map(player => player.name).join(', ')}
                    <br/>
                    <small>
                        {game.scoringType === 'highest' ? 'Highest' : 'Lowest'} score wins
                    </small>
                </p>
                <div className="btn-group">
                    <button 
                        className="btn btn-outline-light" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                    >
                        Edit
                    </button>
                    <button 
                        className="btn btn-outline-primary" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDuplicate();
                        }}
                    >
                        Duplicate
                    </button>
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNewWithSamePlayers();
                        }}
                    >
                        New with Same Players
                    </button>
                    <button 
                        className="btn btn-outline-danger" 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
