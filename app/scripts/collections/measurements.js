var app = app || {};

(function() {
  var Measurements = Backbone.Collection.extend({

  });

  var solar = new Measurements([], {model: app.Solar});
  solar.url = '/api/solar';
  app.solar = solar;

  var wind = new Measurements([], {model: app.Wind});
  wind.url = '/api/wind';
  app.wind = wind;
})();
