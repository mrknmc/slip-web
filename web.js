// app.js
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var logfmt = require('logfmt');
var _ = require('underscore');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

console.log(MONGOHQ_URL);

mongoose.connect('mongodb://heroku:ACRYKKX8Kw3XIOhpx_aVzrTDsVn0reDP6DNSpPtY71lZE5VvTzp7sS_0cpKLG-cYGxfvHF0USPS-ajbGEYAUAg@lennon.mongohq.com:10023/app30177543');

var measurementSchema = new mongoose.Schema({
  deviceId: String,
  timestamp: Number,
  xCoord: Number,
  yCoord: Number,
  lightIntensity: Number,
  windDirection: Number,
  windSpeed: Number,
});

var Measurement = mongoose.model('Measurement', measurementSchema);

app.get('/measurements', function(req, res) {
  var query = Measurement.find();
  query.exec(function (err, measurements) {
    if (err) {
      return res.json(err);
    } else {
      return res.json(measurements);
    }
  });
});

app.post('/measurements', function(req, res) {
  console.log('wololooo');
  var measurements = req.body;
  console.log(req.body);
  _.map(measurements, function(measurement) {
    Measurement.create(measurement, function (err, small) {
      if (err) {
        res.status(400).json(err);
      }
      res.status(200).json({});
    });
  });
});

app.use(logfmt.requestLogger());
app.use(express.static('./dist'));

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
