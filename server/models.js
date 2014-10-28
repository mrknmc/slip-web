var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var measurementSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  deviceId: String,
  xCoord: Number,
  yCoord: Number,
  created: Date,
  measurements: [{
    timestamp: Number,
    lightIntensity: Number,
    windDirection: Number,
    windSpeed: Number,
  }],
});

var userSchema = new mongoose.Schema({
  oauthID: {
    type: String,
    select: false,
  },
  name: String,
  email: String,
  created: Date,
});

var Measurement = mongoose.model('Measurement', measurementSchema);
var User = mongoose.model('User', userSchema);

exports.Measurement = Measurement;
exports.User = User;
