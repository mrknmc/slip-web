var models = require('./models');
var _ = require('underscore');
var User = models.User;
var Upload = models.Upload;


exports.findById = function (req, res) {
  Upload
    .findById(req.params.id)
    .populate('user', 'name email')
    .exec(function (err, upload) {
      if (err) {
        // Error while executing
        res.json({'error': err.message});
      } else if (upload) {
        // Retrieved a measurement
        res.json(upload);
      } else {
        // Measurement not found
        res.status(404).json({});
      }
  });
};


exports.deleteById = function (req, res) {
  Upload.findByIdAndRemove(req.params.id, function(err, upload) {
    if (err) {
      res.json({'error': err.message});
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
        // Error while executing
        res.json({'error': err.message});
      } else {
        // Measurements found or not
        res.json(uploads);
      }
  });
};


exports.addUpload = function(req, res) {
  var upload = _.chain(req.body)
    .omit('token')
    .extend({user: req.user._id, created: Date.now()})
    .value();

  Upload.create(upload, function(err, upload) {
    if (err) {
      res.status(400).json({'error': err.message});
    } else if (upload) {
      res.status(201).json(upload);
    }
  });
};
