var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function () {

  board.io.encoderAttach({
    encoderNum: 0,
    encoderPin1: 14,
    encoderPin2: 15,
 	});

  board.io.on('encoder-position-0', (event)=>{
    console.log(event);
  });

  board.io.encoderEnableReporting(true)

  // setInterval(() =>{
  //   board.io.encoderReport(0, (event)=>{
  //     console.log(event);
  //   });
  // }, 500)

  this.repl.inject({
    report: ( num ) => {
      this.io.encoderReport(num, (event) => {
      	console.log(event);
    	});
    },
		reportAll: () => {
			this.io.encoderReportAll((event) => {
      	console.log(event);
    	})
    },
    reset: (num) => {
			this.io.encoderResetToZero(num, true)
    },
    enableReporting: (enable) => {
      this.io.encoderEnableReporting(enable);
    }
  });

});
