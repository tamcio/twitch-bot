
async function getPlayerInfo(nickname) {
    try {
        const response = await fetch(`https://api.chess.com/pub/player/${nickname}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

async function getStats(nickname) {
    try {
        const response = await fetch(`https://api.chess.com/pub/player/${nickname}/stats`);
        const data = await response.json();

        const values = Object.entries(data).map(([section, dane]) => {
            switch (section) {
                case 'chess_rapid':
                case 'chess_blitz':
                    return dane.last.rating;
                case 'fide':
                case 'message':
                    return dane;
                case 'tactics':
                    return dane.highest.rating;
                case 'puzzle_rush':
                    return dane.best.score;
                default:
                    return undefined;
            }
        }).filter(value => value !== undefined);

        return values;
    } catch (error) {
        console.error('Wystąpił błąd:', error);
        return [];
    }
}

module.exports = {getStats};

