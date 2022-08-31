var five = require("johnny-five");
var board = new five.Board();

//var Board = require("firmata");
//var board = new Board();

const ENABLED = true;
const DISABLED = !ENABLED;

board.on("ready", function () {

  board.io.accelStepperConfig({
		deviceNum: 0,
		type: this.io.STEPPER.TYPE.DRIVER,
		stepPin: 0,
		directionPin: 1,
    enablePin: 33,
    invertPins: [33]
 	});

	board.io.accelStepperConfig({
		deviceNum: 1,
		type: this.io.STEPPER.TYPE.DRIVER,
		stepPin: 6,
		directionPin: 7,
    enablePin: 36,
 	});

	board.io.accelStepperSpeed(0, 1000);
	board.io.accelStepperSpeed(1, 1000);

  board.io.multiStepperConfig({
    groupNum: 0,
    devices: [0, 1]
  });

  board.io.accelStepperEnable(1, ENABLED)
  board.io.accelStepperEnable(0, ENABLED)

  const steppers = [0,0];

  this.repl.inject({
		to: (id, loc, speed = 1000) =>{
      this.io.accelStepperSpeed(id, speed);
      this.io.accelStepperTo(id,loc);
    },
    multi: (loc, speed = 1000) =>{

			//this.io.accelStepperSpeed(0, speed);
      //this.io.accelStepperSpeed(1, speed);

  		board.io.multiStepperTo(0, [2000, 3000], () => {

        console.log("Moved Multi")

    		this.io.accelStepperReportPosition(0, value => {
      		console.log(`Stepper 0 position: ${value}`);
   			});

    		this.io.accelStepperReportPosition(1, value => {
      		console.log(`Stepper 1 position: ${value}`);
    		});

  		});

    },
    my: (positions) =>{

      // First find the stepper that will take the longest time
      let longestTime = 0;

      for(let i = 0; i < 2; i++ ){
         const thisDistance = positions[i] - steppers[i];
         const thisTime = Math.abs(thisDistance) / 1000;

         if(thisTime > longestTime){
           longestTime = thisTime;
         }
      }

      console.log('Longest Time:', longestTime);

			// Set speed for each based on time
      for(let i = 0; i < 2; i++ ){
       	const thisDistance = positions[i] - steppers[i];
	    	const thisSpeed = thisDistance / longestTime;
      	this.io.accelStepperSpeed(i, thisSpeed);
      }

			// Now go!
			for(let i = 0; i < 2; i++ ){
      	this.io.accelStepperTo(i, positions[i], (pos) =>{
          // update pos for this stepper
          console.log('Update:', pos);
          steppers[i] = pos;
        });
      }
  
    },

    loc: (id) => {
      console.log( this.io.accelStepperReportPosition(id) );
    },
		enable: (id) => {
			this.io.accelStepperEnable(id, ENABLED)
    },
    disable: (id) => {
			this.io.accelStepperEnable(id, DISABLED)
    },
    zero: (id) => {
      this.io.accelStepperZero(id);
    }
  });

});
