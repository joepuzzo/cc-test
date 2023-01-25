var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  const servo = new five.Servo({
    pin: 10,
    startAt: 15
  });

  this.repl.inject({
    to: (loc, speed = 500) =>{
      servo.to(loc,speed);
    },
    center: () =>{
      servo.center();
    },
  });

});

