var Input = require('./input.js'),
    input = new Input();

input.on('ready', function() {

    console.log('ready');

    input.on('action', function(data) {
        console.log(data);
    });

});
