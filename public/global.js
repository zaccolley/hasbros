   var canvasWidth = 1080; //viewportWidth * 0.8;
   var canvasHeight = 720;




   //player data:   
   var px = 0;
   var py = 0;

   var ax = 0;
   var ay = 0;


   var vx = 0;
   var vy = 0;
   var px = 0;
   var py = 0;

   var pxhit = 50;
   var pyhit = 100;

   var pspin = 0;

   var speeduptime = 500;
   var speeduptimer = 0;
   var globalspeed = 1;
   var defaultspeed = 1;
   var triggerWorldReset = 1;
   var triggerObjectsCheck = 0;

   var invincibilityTime = 2000;
   var invincibilityTimer = 0;


   var gotpearls = 0;

   var score = 0;

   var setnumcarrots = 0;
   var setnumrainbowcarrots = 0;
   var setnumtanglecoral = 0;
   var setnumpearls = 0;
   var setnumshells = 0;
   var setnumsheep = 0;

   var activecarrots = 0;
   var activerainbowcarrots = 0;
   var activetanglecoral = 0;
   var activepearls = 0;
   var activeshells = 0;
   var activesheep = 0;


   //SFX
   var soundcooldown = 0;

   var mousexoffset = 0;
   var mouseyoffset = 0;

   //MISC GFX
   var fader = 0;

   var coraltimer = 0.0;
   var swimtimer = 1;
   var swimMasterTimer = 0;
   var swimnudge = 0;



   var itemanimtimer = 1;

   var sheepTimer = 0;
   var sheepMasterTimer = 0;


   var messagetimer = 0;
   var defaultmessagetime = 1000;
   var messageflicker = 0;
   var messagetext = '';
   var messagepriority = 0;
   var mcalternator = 0;

   var mstate = 'normal';

   var state = 'Normal';
   var playername = 'defaultplayer';


   var gametime = 91;
   var elapsedtime = 0;
   var starttime = 0;


   var gamestate = 0;

   var scoreflash = 0;

   var numlives = 0;
   var resetlives = 3;

   var blinkcursor = 0;

   var reset = 0;

   var uparrowgo = 0;
   var downarrowgo = 0;
   var leftarrowgo = 0;
   var rightarrowgo = 0;



   var exists = localStorage.getItem("first_name");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("first_name", "h4x0r");

   exists = localStorage.getItem("first_score");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("first_score", 501);


   exists = localStorage.getItem("second_name");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("second_name", "pro");

   exists = localStorage.getItem("second_score");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("second_score", 401);

   exists = localStorage.getItem("third_name");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("third_name", "fluffy_cat");

   exists = localStorage.getItem("third_score");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("third_score", 266);

   exists = localStorage.getItem("fourth_name");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("fourth_name", "n00b");

   exists = localStorage.getItem("fourth_score");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("fourth_score", -50);

   exists = localStorage.getItem("fifth_name");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("fifth_name", "derp");

   exists = localStorage.getItem("fifth_score");
   if (reset == 1) exists = null;
   if (exists == null) localStorage.setItem("fifth_score", -501);



   //document.getElementById("first_name").innerHTML = localStorage.getItem("first_name");
   //document.getElementById("first_score").innerHTML = localStorage.getItem("first_score");

   /*
    document.getElementById("first_name").innerHTML = localStorage.getItem("first_name");
    if (
    
    
    document.getElementById("first_score").innerHTML = localStorage.getItem("first_score");

    document.getElementById("second_name").innerHTML = localStorage.getItem("second_name");
    document.getElementById("second_score").innerHTML = localStorage.getItem("second_score");

    document.getElementById("third_name").innerHTML = localStorage.getItem("third_name");
    document.getElementById("third_score").innerHTML = localStorage.getItem("third_score");

    document.getElementById("fourth_name").innerHTML = localStorage.getItem("fourth_name");
    document.getElementById("fourth_score").innerHTML = localStorage.getItem("fourth_score");

    document.getElementById("fifth_name").innerHTML = localStorage.getItem("fifth_name");
    document.getElementById("fifth_score").innerHTML = localStorage.getItem("fifth_score");
    
    
    if (
        localStorage.setItem("fifth_name", "n000b");
       localStorage.setItem("fourth_name", "Player 4");
       localStorage.setItem("third_name", "Player 3");
       localStorage.setItem("second_name", "Player 2");
       localStorage.setItem("first_name", "h4x0r");

      localStorage.setItem("first_score", 501);
     localStorage.setItem("second_score", 399);
     localStorage.setItem("third_score", 266);
     localStorage.setItem("fourth_score", -101);
     localStorage.setItem("fifth_score", -250);



   }
   */