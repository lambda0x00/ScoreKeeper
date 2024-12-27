export type ScoringType = 'highest' | 'lowest';

export const themeColors = [
    '#1f77b4', // Blue
    '#ff7f0e', // Orange
    '#2ca02c', // Green
    '#d62728', // Red
    '#9467bd', // Purple
    '#8c564b', // Brown
    '#e377c2', // Pink
    '#17becf', // Cyan
    '#bcbd22', // Olive
    '#7f7f7f', // Gray
    '#e6550d', // Dark Orange
    '#31a354', // Emerald
    '#756bb1', // Indigo
    '#d73027', // Crimson
    '#3182bd'  // Royal Blue
];

interface Player {
    name: string;
    turnScores: number[];
}

export interface Game {
    lastViewedAt: Date;
    players: Player[];
    scoringType: ScoringType;
}

export function duplicateGame(game: Game) {
    return {
        lastViewedAt: new Date(),
        players: game.players,
        scoringType: game.scoringType,
    }
}

export function createGame(players: string[], scoringType: ScoringType = 'highest') {
    return {
        lastViewedAt: new Date(),
        players: players.map((player) => ({
            name: player,
            turnScores: [],
        })),
        scoringType,
    }
}

export function doTurn(game: Game, scores: number[]) {
    return {
        ...game,
        players: game.players.map((player, index) => ({
            ...player,
            turnScores: [...player.turnScores, scores[index]],
        })),
    }
}

export function getTotalScores(game: Game) {
    return game.players.map(player => player.turnScores.reduce((a, b) => a + b, 0));
}