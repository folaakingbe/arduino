var five = require("johnny-five"),
  board, photoresistor, myLed2, myLed3, myLed4;

board = new five.Board();

board.on("ready", function() {

  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A0",
    freq: 250
  });
  myLed2 = new five.Led(2);
  myLed3 = new five.Led(3);
  myLed4 = new five.Led(4);


  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    if (this.value < 150) {
        console.log(this.value, "GREEN");
        myLed2.on();
        myLed3.off();
        myLed4.off();
    }
    else if (this.value < 300) {
        console.log(this.value, "YELLOW");
        myLed2.off();
        myLed3.on();
        myLed4.off();
    }
    else {
        console.log(this.value, "RED");
        myLed2.off();
        myLed3.off();
        myLed4.on();
    }
  });
});