var Backbone = require('backbone');
var User = require('../models/user');

var Users = Backbone.Collection.extend({
  model: User,
  url: '/api/user',
});

module.exports = new Users();
