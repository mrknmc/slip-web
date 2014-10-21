var app = app || {};

(function () {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      'solar': 'solar',
      'wind': 'wind',
      'uploads': 'uploads',
      'map': 'map',
    },

  });

  app.router = new AppRouter();
  Backbone.history.start({pushState: true});
})();
