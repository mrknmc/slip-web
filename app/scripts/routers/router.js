var app = app || {};

(function () {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      'uploads': 'uploads',
      'solar': 'solar',
      'wind': 'wind',
      'map': 'map',
    },

  });

  app.router = new AppRouter();
  app.router.on('route', function() {
    $(window).resize();
  });


  Backbone.history.start({pushState: true});
})();
