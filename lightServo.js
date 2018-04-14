var five = require("johnny-five"),
  board, photoresistor, myServo;

board = new five.Board();

board.on("ready", function() {

  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A0",
    freq: 250
  });
  myServo = new five.Servo(9);

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor,
    servo: myServo
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log(this.value);
    if (this.value > 200) {
        myServo.sweep();
    }
    else {
        myServo.stop()
    }
  });
});

// var five = require("johnny-five"),
//     board, myPotentiometer;
// board = new five.Board();
// board.on("ready", function() {
//   myPotentiometer = new five.Sensor({
//     pin: "A2",
//     freq: 250
//   });
//   myLed = new five.Led(9);
//   myPotentiometer.on("read", function() {
//     var rawValue = this.raw;
//     myLed.brightness(Math.floor(rawValue / 4));
//   });
// });