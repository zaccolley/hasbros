module.exports = function schedule(round) {
    var roundNo = round === undefined ? 1 : round,
        roundTime = game.roundTime,
        complexity = roundNo / game.roundDifInc + 1;

    roundTime -= roundNo % game.roundDifInc === 0 ? 0.1 * complexity : 0;
    userEvent = '';

    var task = {
        task: game.inputs[Math.floor(Math.random() * game.inputs.length)],
        timer: roundTime
    };

    io.emit('event', JSON.stringify(task));

    setTimeout(function () {
        if (userEvent === task.task) {
            game.currentScore += 20;

            var success = {
                player: game.currentPlayer,
                score: game.currentScore
            };

            io.emit('success', JSON.stringify(success));

            schedule(round + 1);
        } else {
            var failure = {
                msg: 'You failed!',
                player: game.currentPlayer,
                score: game.currentScore
            };

            game.leaderboards.push({player: game.currentPlayer, score: game.currentScore});

            io.emit('fail', JSON.stringify(failure));

            game.currentPlayer = '';
            game.currentScore = 0;
        }
    }, roundTime * 1000);
};