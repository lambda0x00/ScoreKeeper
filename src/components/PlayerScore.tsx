interface Props {
  playerName: string;
  totalScore: number;
  isWinning: boolean;
  turnScore: string;
  onTurnScoreChange: (value: string) => void;
  onEdit: () => void;
}

export default function PlayerScore({ 
  playerName, 
  totalScore, 
  isWinning, 
  turnScore, 
  onTurnScoreChange,
  onEdit
}: Props) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div>
          <h6 className="card-title d-inline">{playerName}: </h6>
          <span className={`fw-bold ${isWinning ? 'text-primary' : ''}`}>
            {totalScore}
          </span>
        </div>
        <div className="form-group">
          <label className="form-label text-muted small">This turn:</label>
          <div className="input-group">
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="form-control"
              value={turnScore}
              onChange={(e) => onTurnScoreChange(e.target.value)}
            />
            <button
              className="btn btn-outline-light"
              onClick={onEdit}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
