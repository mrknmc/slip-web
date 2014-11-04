var _ = require('lodash');
var User = require('./models').User;
var handleError = require('./util').handleError;


exports.addUser = function (req, res) {
  var data = _.extend(req.body, {created: Date.now()});
  User.create(data, function(err, obj) {
    if (err) {
      handleError(err, res);
    } else if (obj) {
      res.status(201).json(obj);
    }
  });
};


exports.findAll = function (req, res) {
  User.find(function (err, users) {
    if (err) {
      handleError(err, res);
    } else if (users) {
      res.json(users);
    } else {
      res.status(404).json({});
    }
  });
};


exports.findById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      handleError(err, res);
    } else if (user) {
      res.json(user);
    } else {
      res.status(404).json({});
    }
  });
};


exports.deleteById = function (req, res) {
  User.findByIdAndRemove(req.params.id, function(err, msrment) {
    if (err) {
      handleError(err, res);
    } else if (msrment) {
      res.json(msrment);
    } else {
      res.status(404).json({});
    }
  });
};
