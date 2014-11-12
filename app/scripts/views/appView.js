var Backbone = require('backbone');
var router = require('../routers/router');
var measurements = require('../collections/measurements');
var UploadsView = require('./uploadsView');
var DevicesView = require('./devicesView');
var UsersView = require('./usersView');
var ChartsView = require('./chartsView');


module.exports = Backbone.View.extend({
  el: 'body',

  events: {
    'click #menu ul li a': 'changeTab',
  },

  initialize: function() {
    new UploadsView();
    new UsersView();
    new DevicesView();
    new ChartsView({el: '#solar .charts', collection: measurements.solar});
    new ChartsView({el: '#wind .charts', collection: measurements.wind});
  },

  changeTab: function (e) {
    var target = $(e.currentTarget);
    router.navigate(target.data('url'), {trigger: true});
  },

});
