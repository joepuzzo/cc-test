var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  const swtch =  new five.Switch({
  	pin: 1, 
		type: "NC"
	});

	swtch.on("open", () => {
    console.log("On");
  });

  swtch.on("close", () => {
    console.log("Off");
  });

});

