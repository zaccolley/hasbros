var Input = require('./input.js'),
    input = new Input();

input.on('bev', function() {
    console.log('bev');
});

input.on('twist', function() {
    console.log('twist');
});

input.on('press', function() {
    console.log('press');
});

input.on('flick', function() {
    console.log('flick');
});
