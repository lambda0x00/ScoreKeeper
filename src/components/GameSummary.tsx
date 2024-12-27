import { Game, getTotalScores, themeColors } from "../game";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
    game: Game;
    onClose: () => void;
}

export default function GameSummary({ game, onClose }: Props) {
    const totalScores = getTotalScores(game);
    const playerScores = game.players.map((player, index) => ({
        name: player.name,
        score: totalScores[index]
    }));

    // Sort based on scoring type
    playerScores.sort((a, b) => {
        if (game.scoringType === 'highest') {
            return b.score - a.score;
        }
        return a.score - b.score;
    });

    // Calculate rankings (handling ties)
    const rankings: number[] = [];
    playerScores.forEach((player, index) => {
        if (index === 0) {
            rankings.push(1);
        } else {
            rankings.push(
                playerScores[index - 1].score === player.score
                    ? rankings[index - 1]  // Same rank for tied scores
                    : index + 1            // New rank if score is different
            );
        }
    });

    // Prepare data for the line chart
    const chartData = game.players[0].turnScores.map((_, turnIndex) => {
        const turnData: { [key: string]: number } = {
            turn: turnIndex + 1
        };

        game.players.forEach((player) => {
            // Calculate running total up to this turn
            turnData[player.name] = player.turnScores
                .slice(0, turnIndex + 1)
                .reduce((sum, score) => sum + score, 0);
        });

        return turnData;
    });

    const colors = themeColors.slice(0, game.players.length);

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Game Summary</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>
                    <div className="modal-body">
                        <div className="list-group mb-4">
                            {playerScores.map((player, index) => (
                                <div key={index} className="list-group-item">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>
                                            {rankings[index]}. {player.name}
                                        </span>
                                        <span className="badge bg-primary rounded-pill">
                                            {player.score} points
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData} margin={{ top: 10, bottom: 25, right: 10, left: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="turn"
                                    label={{ value: 'Turn', position: 'insideBottom', offset: -10 }}
                                />
                                <YAxis
                                    label={{
                                        value: 'Score',
                                        angle: -90,
                                        position: 'insideLeft'
                                    }}
                                />
                                <Tooltip />
                                <Legend verticalAlign="top" height={36}/>
                                {game.players.map((player, index) => (
                                    <Line
                                        key={player.name}
                                        type="monotone"
                                        dataKey={player.name}
                                        stroke={colors[index]}
                                        dot={false}
                                    />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
