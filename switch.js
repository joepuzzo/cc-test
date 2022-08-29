var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  const swtch =  new five.Switch({
  	pin: 26, 
		type: "NO"
	});

	swtch.on("open", () => {
    console.log("On");
  });

  swtch.on("close", () => {
    console.log("Off");
  });

});

