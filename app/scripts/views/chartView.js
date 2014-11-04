var Backbone = require('backbone');
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
      chart: {type: 'areaspline'},
      legend: {enabled: false},
      credits: {enabled: false},
      title: model.title(),
      xAxis: model.get('xAxis'),
      yAxis: model.get('yAxis'),
      plotOptions: model.get('plotOptions'),
      series: [{
        color: model.get('color'),
        name: model.get('_id'),
        data: model.getData(),
      }]
    });
    this.chart = this.$panelBody.highcharts();
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
