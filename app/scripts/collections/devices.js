var Backbone = require('backbone');

var Devices = Backbone.Collection.extend({
  url: '/api/device',
});

module.exports = new Devices();
