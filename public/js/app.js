window.addEventListener('load', function () {
    var socket = io();

    var msgs = document.getElementById('msgs');
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

        removeAction();
    });

    socket.on('event', function (msg) {
        msg = JSON.parse(msg);

        playSound(msg.task);
        changeAction(msg.task);
    });

    socket.on('fail', function (msg) {
        msg = JSON.parse(msg);

        removeAction();
        failedAction();

        start.removeAttribute('disabled');

        leaderboards.innerHTML += '<tr><td>' + msg.player + '</td><td>' + msg.score + '</td></tr>';
    });

});

// sounds

function playSound(action){
    var sfx = document.createElement('audio');
    sfx.setAttribute('src', 'resources/'+action+'.mp3');
    sfx.setAttribute('type', 'audio/mp3');
    sfx.volume = 1;
    sfx.play();
}

// actions

function failedAction(){

    $('.action').removeClass().addClass('action action--failed');
    $('.action').text('Failed!');

}

function removeAction(){

    $('.action').removeClass().addClass('action');
    $('.action').text('');

}

function changeAction(action){

    $('.action').removeClass().addClass('action action--fade action--'+action);
    $('.action').text(action);
    setTimeout(function(){
        $('.action').removeClass('action--fade');
    }, 3000);

}
