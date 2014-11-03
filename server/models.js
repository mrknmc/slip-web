var mongoose = require('mongoose');


var uploadSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  deviceId: String,
  xCoord: Number,
  yCoord: Number,
  created: Date,
  measurements: [{
    timestamp: Number,
    lightIntensities: [Number],
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


// Legacy Measurements
var measurementSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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


exports.Measurement = mongoose.model('Measurement', measurementSchema);
exports.Upload = mongoose.model('Upload', uploadSchema);
exports.User = mongoose.model('User', userSchema);
