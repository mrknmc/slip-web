var _ = require('underscore');
var User = require('./models').User;


exports.addUser = function (req, res) {
  var data = _.extend(req.body, {created: Date.now()});
  User.create(data, function(err, obj) {
    if (err) {
      res.status(400).json({'error': err.message});
    } else if (obj) {
      res.status(201).json(obj);
    }
  });
};


exports.findAll = function (req, res) {
  User.find(function (err, users) {
    if (err) {
      res.json({'error': err.message});
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
      // Error while executing
      res.json({'error': err.message});
    } else if (user) {
      // Retrieved a user
      res.json(user);
    } else {
      // User not found
      res.status(404).json({});
    }
  });
};


exports.deleteById = function (req, res) {
  User.findByIdAndRemove(req.params.id, function(err, msrment) {
    if (err) {
      res.json({'error': err.message});
    } else if (msrment) {
      res.json(msrment);
    } else {
      res.status(404).json({});
    }
  });
};
