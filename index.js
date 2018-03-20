var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function () {

  let stepper = new five.Stepper({
		type: five.Stepper.TYPE.DRIVER,
		stepsPerRev: 1600,
		pins: {
			step: 3,
			dir: 2
		}
	});

  let pin = new five.Pin(1);
  pin.low();

  this.repl.inject({
    step: ( steps = 1600, direction = 1, rpm = 40 ) => {
      stepper.step({
        steps, 
        direction, 
        rpm
      }, ()=>{});
    }, 
    enable: () => {
      pin.low();
    }, 
    disable: () => { 
      pin.high();
    }
  });

});
