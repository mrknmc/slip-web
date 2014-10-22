var app = app || {};

(function () {
  'use strict';

  app.Solar = Backbone.Model.extend({
    defaults: {
      yAxis: {
        title: 'Light Intensity',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Date',
        },
      },
      plotOptions: {
        areaspline: {
          fillOpacity: 0.4,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                  enabled: true
              }
            }
          },
          tooltip: {
            valueDecimals: 2,
          }
        },
      },
    },

    title: function() {
      return {text: this.get('_id') + ': Solar Power'};
    },

    getData: function() {
      return _.map(this.get('measurements'), function(msrment) {
        return {
          // convert to millis
          x: new Date(msrment.timestamp * 1000),
          y: msrment.lightIntensity
        };
      });
    },

  });
})();
