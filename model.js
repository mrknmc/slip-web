var mongoose = require('mongoose');

var measurementSchema = new mongoose.Schema({
  deviceId: Number,
  timestamp: Number,
  xCoord: Number,
  yCoord: Number,
  lightIntensity: Number,
  windDirection: Number,
  windSpeed: Number,
});

var Measurement = mongoose.model('Measurement', measurementSchema);

module.exports = Measurement;
