var five = require("johnny-five");
var board = new five.Board();

//var Board = require("firmata");
//var board = new Board();

const ENABLED = true;
const DISABLED = !ENABLED;

board.on("ready", function () {

  /*let stepper = new five.Stepper({
		type: five.Stepper.TYPE.DRIVER,
		stepsPerRev: 1600,
		pins: {
			step: 3,
			dir: 2
		}
	});*/

  board.io.accelStepperConfig({
		deviceNum: 0,
		type: this.io.STEPPER.TYPE.DRIVER,
		stepPin: 0,
		directionPin: 1,
    enablePin: 33,
    invertPins: [33]
 	});

  board.io.accelStepperEnable(0, ENABLED)

  this.repl.inject({
    step: ( steps = 1600, direction = 1, speed = 1000 ) => {
      this.io.accelStepperSpeed(0, speed);
			this.io.accelStepperStep(0,steps, (position) => {
      	console.log("Current position: " + position);
    	});
    },
    to: (loc, speed = 1000) =>{
      this.io.accelStepperSpeed(0, speed);
      this.io.accelStepperTo(0,loc);
    },
    loc: () => {
      console.log( this.io.accelStepperReportPosition(0) );
    },
		enable: () => {
			this.io.accelStepperEnable(0, ENABLED)
    },
    disable: () => {
			this.io.accelStepperEnable(0, DISABLED)
    },
    zero: () => {
      this.io.accelStepperZero(0);
    }
  });

});
