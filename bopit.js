var five = require("johnny-five"),
    boards, button, potentiometer, flowmeter, joystick;

boards = new five.Boards(["A", "B"]);

boards.on("ready", function() {

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

    var prevLiters = 0;
    var pulses = 0; // count how many pulses!
    var lastflowpinstate; // track the state of the pulse pin
    var lastflowratetimer = 0; // you can try to keep time of how long it is between pulses
    var flowrate; // and use that to calculate a flow rate
    var flowData;

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

    // calculate flow
    setInterval(function(){
        calcFlow(function(){
            displayFlow();
        });
    }, 100);

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

        if( ( prevLiters + 0.05 ) <= liters ){
            console.log("flowmeter change");
            prevLiters = liters;
        }

    }

    // when the pot changes
    potentiometer.on("change", function() {
        console.log("pot change", this.value);
    });

    // when the joystick changes
    joystick.on("change", function() {
        console.log("joystick change", "  x: ", this.x, " y: ", this.y);
    });

    // "down" the button is pressed
    button.on("down", function() {
        console.log("button change");
    });

});
