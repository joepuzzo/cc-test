var five = require("johnny-five");
var board = new five.Board();

//var Board = require("firmata");
//var board = new Board();

const ENABLED = true;
const DISABLED = !ENABLED;

board.on("ready", function () {

	const swtch = new five.Switch({
  	pin: 26, 
		type: "NC"
	});

	swtch.on("open", () => {
    console.log("Open");
  });

  swtch.on("close", () => {
    console.log("Close");

    // Disable the stepper
    //board.io.accelStepperEnable(0, DISABLED);
    
    // Stop the stepper 
    board.io.accelStepperStop(0);

		board.io.accelStepperReportPosition(0, (pos)=>{
			console.log('Report', pos);
		})
  });


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
      this.io.accelStepperTo(0,loc, (pos) =>{
        console.log('At:', pos);
      });
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
