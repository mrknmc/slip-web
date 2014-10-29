var Backbone = require('backbone');
var Upload = require('../models/upload');

var Uploads = Backbone.Collection.extend({
  model: Upload,
  url: '/api/measurements',

  comparator: function (a, b) {
    if (a.get('created') > b.get('created')) {
      return -1;
    }
    else if (a.get('created') < b.get('created')) {
      return 1;
    } else {
      return 0;
    }
  },
});

module.exports = new Uploads();
