var models = require('./models');
var location = require('./location');
var _ = require('lodash');
var User = models.User;
var Upload = models.Upload;
var handleError = require('./util').handleError;


exports.findById = function (req, res) {
  Upload
    .findById(req.params.id)
    .populate('user', 'name email')
    .exec(function (err, upload) {
      if (err) {
        handleError(err, res);
      } else if (upload) {
        res.json(upload);
      } else {
        res.status(404).json({});
      }
  });
};


exports.deleteById = function (req, res) {
  Upload.findByIdAndRemove(req.params.id, function(err, upload) {
    if (err) {
      handleError(err, res);
    } else if (upload) {
      res.json(upload);
    } else {
      res.status(404).json({});
    }
  });
};


exports.findAll = function(req, res) {
  Upload
    .find()
    .populate('user', 'name email')
    .exec(function (err, uploads) {
      if (err) {
        handleError(err, res);
      } else {
        res.json(uploads);
      }
  });
};


exports.addUpload = function(req, res) {
  var upload = _.chain(req.body)
    .omit('token')
    .extend({user: req.user._id, created: Date.now()})
    .value();

  upload.solar = _.map(upload.solar, function(solar) {
    solar.values = _.map(solar.values, function(val) {
      return val * (1362 / 31);
    });
    return solar;
  });

  upload.wind = _.map(upload.wind, function(wind) {
    // 360/8 = 45
    wind.windDirection = Math.round(wind.windDirection / 45);
    return wind;
  });

  location.getLocation(upload.xCoord, upload.yCoord, function(err, loc) {
    if (loc) {
      var prettyLoc = location.prettyLocation(loc);
      if (prettyLoc) {
        upload = _.extend(upload, {'location': prettyLoc});
      }
    }
    Upload.create(upload, function(err, upload) {
      if (err) {
        handleError(err, res);
      } else if (upload) {
        res.status(201).json(upload);
      }
    });
  });

};
