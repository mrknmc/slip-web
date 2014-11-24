var Backbone = require('backbone');
var _ = require('lodash');
var moment = require('moment');
var Pikaday = require('pikaday');


module.exports = Backbone.View.extend({

  className: 'col-md-12 col-lg-6',

  // Cache the template function for a single item.
  template: _.template($('#chart-template').html()),

  initialize: function() {
    this.listenTo(this.model, 'filtered', this.rerender);
    this.listenTo(this.model, 'change', this.rerender);
  },

  rerender: function() {
    var model = this.model;

    this.$panelBody = this.$('.panel-body');
    this.$panelBody.highcharts({
      chart: {polar: true},
      legend: {enabled: false},
      credits: {enabled: false},
      title: model.title(),
      pane: {
        startAngle: 0,
        endAngle: 360
      },
      xAxis: {
        tickInterval: 45,
        min: 0,
        max: 360,
        labels: {
          formatter: function () {
            var idx = (this.value / 360) * 8;
            return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][idx];
          }
        }
      },
      yAxis: {
        min: 0
      },
      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 45
        },
        column: {
          pointPadding: 0,
          groupPadding: 0
        }
      },
      series: [{
        type: 'area',
        color: model.get('color'),
        name: model.get('_id'),
        // data: [1,2,3,4,5,6,7,8],
        data: model.intensities(),
      }]
    });
    // this.chart = this.$panelBody.highcharts();
    return this;
  },

  render: function() {
    var model = this.model;
    this.$el.html(this.template(model.toJSON()));
    var filter = model.get('filter');

    new Pikaday({
      field: this.$('.datepicker.start')[0],
      maxDate: new Date(),
      defaultDate: new Date(filter.start),
      // format: 'D MMM YYYY',
      setDefaultDate: true,
      onSelect: function(date) {
        model.set('filter', {
          end: model.get('filter').end,
          start: moment(date),
        });
        model.trigger('filtered');
      }
    });

    new Pikaday({
      field: this.$('.datepicker.end')[0],
      maxDate: new Date(),
      defaultDate: new Date(filter.end),
      setDefaultDate: true,
      // format: 'D MMM YYYY',
      onSelect: function(date) {
        model.set('filter', {
          start: model.get('filter').start,
          end: moment(date),
        });
        model.trigger('filtered');
      }
    });

    return this.rerender();
  },

});
