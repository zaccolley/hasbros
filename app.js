'use strict';

var http = require('http'),
    path = require('path'),

    express = require('express'),
    socket = require('socket.io'),

    scheduler = require('./scheduler'),
    // Input = require('./input'),

    app = express(),
    // input = new Input(),

    game = {
        inputs: [
            'press',
            'twist',
            'flick',
            'bev'
        ],
        roundTime: 3,
        roundDifInc: 2,
        leaderboards: [],
        currentPlayer: '',
        currentScore: 0,
        currentUserEvent: ''
    };

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static('public'));

var server = http.createServer(app);
server.listen(5000);


console.log('Server listening on 5000');

var io = socket.listen(server);

io.sockets.on('connection', function (socket) {
    socket.on('start', function (msg) {
        game.leaderboards.msg = 0;
        game.currentPlayer = msg;

        scheduler(game, io);
    });
});

// input.on('ready', function() {
//     input.on('action', function(data) {
//         game.currentUserEvent = data;
//     });
// });
