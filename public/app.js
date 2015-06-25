window.addEventListener('load', function () {
    var socket = io();

    var msgs = document.getElementById('msgs');
    var task = document.getElementById('task');
    var status = document.getElementById('status');
    var leaderboards = document.getElementById('leaderboards');
    var name = document.getElementById('name');
    var start = document.getElementById('start');
    var timer = document.getElementById('timer');
    var failed = document.getElementById('failed');

    start.addEventListener('click', function (e) {
        e.preventDefault();

        socket.emit('start', name.value);
        // leaderboards.innerHTML += '<tr><td>' + name.value + '</td><td>0</td></tr>';

        start.disabled = 'disabled';
    });

    socket.on('success', function (msg) {
        msg = JSON.parse(msg);
        task.innerHTML = "";
        timer.innerHTML = "";
    });

    socket.on('event', function (msg) {
        msg = JSON.parse(msg);

        task.innerHTML = msg.task;
        timer.innerHTML = msg.timer;
    });

    socket.on('fail', function (msg) {
        msg = JSON.parse(msg);

        failed.innerHTML = msg.msg;

        start.removeAttribute('disabled');

        leaderboards.innerHTML += '<tr><td>' + msg.player + '</td><td>' + msg.score + '</td></tr>';
    });
});