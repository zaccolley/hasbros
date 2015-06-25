window.addEventListener('load', function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
        
        // canvas.addEventListener( "keydown", doKeyDown, true);

        
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;


    canvas.style.position = "absolute";
    canvas.setAttribute("width", canvasWidth);
    canvas.setAttribute("height", canvasHeight);


    mousexoffset = (viewportWidth - canvasWidth) / 2;
    mouseyoffset =  0;//(viewportHeight - canvasHeight) / 2;
    canvas.style.top = mouseyoffset + "px";
    canvas.style.left =  mousexoffset + "px";

    var img1 = new Image();
    img1.src = 'taibar.png';


    // Detect if the browser is IE or not.
    // If it is not IE, we assume that the browser is NS.
    var IE = document.all ? true : false

    // If NS -- that is, !IE -- then set up for mouse capture
    if (!IE) document.captureEvents(Event.MOUSEMOVE);

    document.captureEvents(Event.CLICK);

    document.captureEvents(Event.MOUSEDOWN);

    // Set-up to use getMouseXY function onMouseMove
    document.onmousemove = getMouseXY;
    document.onmousedown = clicky;
    document.onmouseup = clickyoff;
    //document.onclick = clicky;
    var tempX = 0;
    var tempY = 0;


    function getMouseXY(e) {
        if (IE) { // grab the x-y pos.s if browser is IE
            tempX = event.clientX + document.body.scrollLeft
            tempY = event.clientY + document.body.scrollTop
        } else { // grab the x-y pos.s if browser is NS
            tempX = e.pageX
            tempY = e.pageY
        }
        // catch possible negative values in NS4
        if (tempX < 0) {
            tempX = 0
        }
        if (tempY < 0) {
            tempY = 0
        }
        // show the position values in the form named Show
        // in the text fields named MouseX and MouseY


    }


    function clicky(e) {}
    function clickyoff(e) {}

    //KEYBOARD CONTROLS
    window.addEventListener("keydown", doKeyDown, false);

    function doKeyDown(l) {

        //alert( l.keyCode );
        //  alert(hej);
        console.log(l.keyCode);

        globalkeypress = l.keyCode;
        keypressed = 1;

        if (l.keyCode == 8) {
            if (l.preventDefault) {
                l.preventDefault();
            }
        }



        if (state == 9) {
            //  playername+=fromCharCode(l.keyCode);




            if (l.keyCode != 8) {

                var hej = String.fromCharCode(l.keyCode);

                if (playername.length < 8 && (l.keyCode > 47 || l.keyCode == 32)) playername += hej;
            } else {

                playername = playername.slice(0, -1);

                //playername+='G';

            }
        }

        //if (state==0) alert(l.keyCode);

        if (l.keyCode == 13) {
            launch = 1;
        }



        if (l.keyCode == 39) {
            rightarrowgo = 1;
        }
        if (l.keyCode == 37) {
            leftarrowgo = 1;
        }
        if (l.keyCode == 38) {
            uparrowgo = 1;
        }
        if (l.keyCode == 40) {
            downarrowgo = 1;
        }

        //if (l.keyCode==32) {goInvincible();}

        //if (l.keyCode==69) {if (state!='Dying') startDeath(); else resetDeath();}
        //if (l.keyCode==82) {triggerWorldReset=1; }

        if (l.keyCode == 32) {
            bump = 1;
        }




    }



    var sfx1 = document.createElement('audio');
    sfx1.setAttribute('src', 'hello.mp3');
    sfx1.setAttribute('type', 'audio/mp3');
    sfx1.volume = 1;




    var gtoggle = 0;


    var sfxplay = 0;


    function resetWorld() {
        triggerWorldReset = 0;
        globalkeypress = 0;
        keypressed = 0;
        state = 0;
        starttime = Date.now();

        tempo = 2;
        intime = tempo;


        gtoggle = 0;

        sfxplay = 0;

    };

    function Bopit() {

        if (triggerWorldReset > 0) resetWorld();

        context.clearRect(0, 0, canvas.width, canvas.height);

        var xpos = 0;
        var ypos = 0;
        var ddY = tempY - ypos - mouseyoffset;
        var ddX = tempX - xpos - mousexoffset;

        if (ddY > canvasHeight - 25) ddY = canvasHeight - 25;

        if (ddX > canvasWidth) ddX = canvasWidth;
        if (ddX < 0) ddX = 0;


        var tinterval = (Date.now() - starttime) / 1000;




        function resetintime() {
            tempo = tempo * 0.95;
            if (tempo < tempolimit) tempo = tempolimit;
            intime = tempo;
            starttime = Date.now();
        }

        var jjj = '';



        //      if ()

        jjj = 'Hello';




        if (keypressed == 1) {

            if (state == 0 && gtoggle == 1) {
                jjj = String.fromCharCode(globalkeypress);



                if (globalkeypress == 72) {
                    resetintime();
                    starttime = Date.now();
                    gtoggle = 0;
                    generictimer = Date.now();
                } else {
                    resetintime();
                    state = 1;

                    //  alert('fail');
                    deathmessage = "WRONG!!";
                }
                //sfxplay=1;
                //alert('hej');
            }


        }




        if (state == 0) {

            if (sfxplay) {
                sfx1.play();
                sfxplay = 0;
            }




            if (gtoggle == 0) {


                context.save();


                context.fillStyle = "#FFffff";
                //context.fillRect(0,0,canvasWidth,canvasHeight);




                context.fillStyle = 'blue';
                context.translate((canvasWidth / 2) - (jjj.length * 10), canvasHeight / 2);
                context.font = "30px 'Rock Salt'";
                //var jjj=toString(i);
                context.fillText("wait for it...", 0, 0);

                context.restore();



            }



            if (gtoggle == 1) {


                context.save();


                context.fillStyle = "#FFffff";
                //context.fillRect(0,0,canvasWidth,canvasHeight);




                context.fillStyle = 'blue';
                context.translate((canvasWidth / 2) - (jjj.length * 10), canvasHeight / 2);
                context.font = "30px 'Rock Salt'";
                //var jjj=toString(i);
                context.fillText(jjj, 0, 0);

                context.restore();



                context.save();
                //  context.translate(-30,100);

                //var ggg=intime-tinterval;

                //  context.fillText(ggg.toFixed(2),0,0);

                context.fillStyle = 'red';
                context.fillRect(0, canvasHeight - 100, canvasWidth, canvasHeight);

                var twid = (intime - tinterval) / tempo;
                //console.log(twid);



                context.fillStyle = 'blue';
                context.fillRect(0, canvasHeight - 100, canvasWidth * twid, canvasHeight);

                context.restore();

                context.save();
                context.translate(0, canvasHeight - 100, canvasWidth, canvasHeight);
                context.drawImage(img1, 0, 0);
                context.restore();

            }


        }


        if (tinterval > intime && state == 0 && gtoggle == 1) {
            state = 1;
            generictimer = Date.now();
            resetintime();
            gtoggle = 0;
        } else if (tinterval > intime && state == 0 && gtoggle == 0 && keypressed == 0) {
            gtoggle = 1;
            resetintime();
            sfxplay = 1;
            generictimer = Date.now();
            deathmessage = "Too Slow!!";

        }




        if (state == 1) {
            context.save();

            context.fillStyle = "#FFffff";
            //context.fillRect(0,0,canvasWidth,canvasHeight);

            context.fillStyle = 'red';
            context.translate((canvasWidth / 2) - (jjj.length * 20), canvasHeight / 2);
            context.font = "50px 'Rock Salt'";
            //var jjj=toString(i);
            context.fillText(deathmessage, 0, 0);

            context.restore();

            var getwaittime = (Date.now() - generictimer) / 1000;

            //alert(getwaittime);

            if (getwaittime > 5) {
                state = 0;
                resetWorld();

            }
        }

        if (keypressed != 0) keypressed = 0;

        {
            setTimeout("Bopit()", 5);
        }

    }

    Bopit();
});