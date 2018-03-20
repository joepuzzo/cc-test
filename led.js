var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(13);
  led.on();

  board.on("exit", function() {
    led.off();
  });

  board.on("close", (e) =>{
   	console.log('Board closed')
  })
});

board.on("info", (e) =>{
  console.log(e)
})

board.on("warn", (e) =>{
  console.log(e)
})

board.on("fail", (e) =>{
  console.log(e)
})
