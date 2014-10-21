var app = app || {};

(function () {
  'use strict';

  app.Wind = Backbone.Model.extend({
    defaults: {
      yAxis: {
        title: 'Wind Power',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
      },
    },

    title: function() {
      return {text: this.get('_id') + ': Wind Power'};
    },

    getData: function() {
      return _.map(this.get('measurements'), function(msrment) {
        return {
          // convert to millis
          x: new Date(msrment.timestamp * 1000),
          y: msrment.windSpeed
        };
      });
    },

  });
})();
