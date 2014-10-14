var app = app || {};

(function() {
  var Measurements = Backbone.Collection.extend({
    model: Backbone.Model,

    nextOrder: function () {
      return this.length ? this.last().get('order') + 1 : 1;
    },

    comparator: 'order'
  });

  var solar = new Measurements();
  solar.url = '/api/solar';
  app.solar = solar;

  var wind = new Measurements();
  wind.url = '/api/wind';
  app.wind = wind;
})();
