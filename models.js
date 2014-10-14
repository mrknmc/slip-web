var mongoose = require('mongoose');

var measurementSchema = new mongoose.Schema({
  user: String,
  deviceId: String,
  xCoord: Number,
  yCoord: Number,
  measurements: [{
    timestamp: Number,
    lightIntensity: Number,
    windDirection: Number,
    windSpeed: Number,
  }],
});

var userSchema = new mongoose.Schema({
  oauthID: String,
  name: String,
  email: String,
  created: Date
});

var Measurement = mongoose.model('Measurement', measurementSchema);
var User = mongoose.model('User', userSchema);

exports.Measurement = Measurement;
exports.User = User;
