var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  const swtch =  new five.Switch({
  	pin: 26, 
		type: "NC"
	});

	swtch.on("open", () => {
    console.log("Open");
  });

  swtch.on("close", () => {
    console.log("Close");
  });

});

