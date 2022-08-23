var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  const button =  new five.Button({
    pin: 2, 
    //isPulldown: true
    isPullup: true
  });

  let pin = new five.Pin(1);
  pin.low();

	button.on("down", () => {
    console.log("down");
  });

  button.on("up", () => {
    console.log("up");
  });

  button.on("hold", () => {
    console.log("holding");
  });

});

