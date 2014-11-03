var Backbone = require('backbone');
var moment = require('moment');
var Pikaday = require('pikaday');


module.exports = Backbone.View.extend({

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
      credit: {enabled: false},
      title: model.title(),
      xAxis: model.get('xAxis'),
      yAxis: model.get('yAxis'),
      plotOptions: model.get('plotOptions'),
      series: [{
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
      onSelect: function() {
        filter.start = this.getMoment();
        model.set('filter', filter);
        model.trigger('filtered');
      }
    });

    new Pikaday({
      field: this.$('.datepicker.end')[0],
      maxDate: new Date(),
      defaultDate: new Date(filter.end),
      setDefaultDate: true,
      onSelect: function() {
        filter.end = this.getMoment();
        model.set('filter', filter);
        model.trigger('filtered');
      }
    });

    return this.rerender();
  },

});
