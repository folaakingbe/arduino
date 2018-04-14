var plotly = require('plotly')('folaakingbe','MZkC90Kex43WR0J7uXuL');
var five = require("johnny-five");
var board = new five.Board();

// plotly init data
var data = [{
    x : [],
    y : [],
    stream : {
        token : 'epx3speuut',
        maxpoints : 5000
    }
}];
var layout = {fileopt : "overwrite", filename : "photoresistor nodey arduino!"};

// lets do this
board.on("ready", function() {
  // create a new `photoresistor` sensor object
  var photoresistor = new five.Sensor({
    pin: "A0",
    freq: 250 // send reading every 250ms
  });
  // initialize that plotly graph
  plotly.plot(data,layout,function (err, res) {
    if (err) console.log(err);
    console.log(res);
    //once it's initialized, create a plotly stream
    //to pipe your data!
    var stream = plotly.stream('epx3speuut', function (err, res) {
      if (err) console.log(err);
      console.log(res);
    });
    // this gets called every time photoresistor returns its value
    photoresistor.on("data", function() {
      data = {
        x : Date(),
        y : this.value
      };
      console.log(this.value);
      // write the data to the plotly stream
      stream.write(JSON.stringify(data)+'\n');
    });
  });
});

// little helper function to get a nicely formatted date string
// function getDateString () {
//   var time = new Date();
//   // 14400000 is (GMT-4 Montreal)
//   // for your timezone just multiply +/-GMT by 3600000
//   var datestr = new Date(time - 14400000).toISOString().replace(/T/, ' ').replace(/Z/, '');
//   return datestr;