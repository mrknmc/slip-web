var Backbone = require('backbone');
var Device = require('../models/device');

var Devices = Backbone.Collection.extend({
  model: Device,
  url: '/api/device',
});

module.exports = new Devices();
