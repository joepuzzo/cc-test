var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function () {

  const stepper = new five.Stepper({
		type: five.Stepper.TYPE.DRIVER,
		stepsPerRev: 1600,
		pins: {
			step: 3,
			dir: 2
		}
	});

  const pin = new five.Pin(1);
  pin.low();

  const button =  new five.Button({
    pin: 5, 
    isPullup: true
  });

  let curDir = 0;

	button.on("down", () => {
    console.log("down");
    stepper.step({
      steps: 1,
      direction: curDir === 1 ? 0 : 1,
      rpm: 40
    },()=>{})
    //pin.high();
  });

  button.on("up", () => {
    console.log("up");
    //pin.low();
  });

  button.on("hold", () => {
    console.log("holding");
  });


  this.repl.inject({
    step: ( steps = 1600, direction = 1, rpm = 40, accel = 0, decel = 0 ) => {
      curDir = direction;
      console.log(decel)
      stepper.step({
        steps, 
        direction, 
        rpm,
        accel,
        decel
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
