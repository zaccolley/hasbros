var util = require('util'),
    EventEmitter = require('events').EventEmitter,

    five = require("johnny-five"),
    boards, button, potentiometer, flowmeter, joystick;

function Input(){

    EventEmitter.call(this);

    var _self = this;

    boards = new five.Boards(["A", "B"]);

    boards.on("ready", function() {

        // i think we're ready
        _self.emit('ready');

        var boardA = this['0'],
            boardB = this['1'];

        // -- create the hardware instances

        // Create a new `potentiometer` hardware instance.
        potentiometer = new five.Sensor({
            pin: "A2",
            freq: 250,
            board: boardA
        });

        // Create a new `joystick` hardware instance.
        joystick = new five.Joystick({
            pins: ["A0", "A1"], // [ x, y ]
            board: boardA
        });

        flowmeter = new five.Sensor({
            pin: "A0",
            board: boardB
        });

        var prevLiters = 0,
            pulses = 0, // count how many pulses!
            lastflowpinstate, // track the state of the pulse pin
            lastflowratetimer = 0, // you can try to keep time of how long it is between pulses
            flowrate, // and use that to calculate a flow rate
            flowData;

        // Create a new `button` hardware instance.
        button = new five.Button({
            pin: 2,
            board: boardB
        });

        // -- detect any input

        // When the sensor value changes, log the value
        flowmeter.on("data", function() {
            // console.log("flow change", this.value);
            flowData = this.value;
        });

        function calcFlow(callback){
            if (flowData == lastflowpinstate) {
                lastflowratetimer++;
                callback();
                return false; // nothing changed!
            }

            if (flowData < 100) {
                // low to high transition!
                pulses++;
            }

            lastflowpinstate = flowData;
            flowrate = 1000;
            flowrate /= lastflowratetimer;  // in hertz
            lastflowratetimer = 0;

            callback();
        }

        function displayFlow(){

            // console.log("Freq: ", flowrate);
            // console.log("Pulses: ", pulses);

            // Sensor Frequency (Hz) = 7.5 * Q (Liters/min)
            // Liters = Q * time elapsed (seconds) / 60 (seconds/minute)
            // Liters = (Frequency (Pulses/second) / 7.5) * time elapsed (seconds) / 60
            // Liters = Pulses / (7.5 * 60)
            var liters = pulses;
            liters /= 7.5;
            liters /= 60.0;

            // console.log(liters, " Liters");

            if( ( prevLiters + 0.01 ) <= liters ){
                // console.log("flowmeter change");
                _self.emit('action', 'bev');
                prevLiters = liters;
            }


        }

        var prevPot = 0,
            currentPot = 0;

        // when the pot changes
        potentiometer.on("change", function() {
            currentPot = this.value;

            if( (prevPot - 2) > currentPot || (prevPot + 2) < currentPot ){
                // console.log("pot change", currentPot);
                _self.emit('action', 'twist');
            }

            prevPot = currentPot;

        });

        var prevJoy = 0,
            currentJoy = 0;

        // when the joystick changes
        joystick.on("change", function() {
            // console.log("joystick change", "  x: ", this.x, " y: ", this.y);

            // if it's 0, 0 it's likely it hasnt been flicked
            var noMovement = (this.x !== 0 && this.y !== 0);

            if( noMovement ){

                _self.emit('action', 'flick');

            }

        });

        // "down" the button is pressed
        button.on("down", function() {
            // console.log("button change");
            _self.emit('action', 'press');
        });

        // -- input cycle

        // limit some of the inputs

        setInterval(function(){

            // calculate flow
            calcFlow(function(){
                displayFlow();
            });

        }, 100);

    });

}

util.inherits(Input, EventEmitter);

module.exports = Input;
