// app.js
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var logfmt = require('logfmt');
var _ = require('underscore');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
mongoose.connect(process.env.MONGOHQ_URL);

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

app.route('/measurements')
.get(function(req, res) {
  var query = Measurement.find();
  query.exec(function (err, measurements) {
    if (err) {
      return res.json(err);
    } else {
      return res.json(measurements);
    }
  });
})
.post(function(req, res) {
  var measurements = req.body;
  _.map(measurements, function(measurement) {
    Measurement.create(measurement, function (err, small) {
      if (err) {
        res.status(400).json(err);
        console.log(err);
      } else {
        res.status(201);
      }
    });
  });
});

app.use(logfmt.requestLogger());
app.use(express.static('./dist'));

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
