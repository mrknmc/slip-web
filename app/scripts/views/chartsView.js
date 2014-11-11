var Backbone = require('backbone');
var ChartView = require('./chartView');
var PolarChartView = require('./polarChartView');

module.exports = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.collection.fetch();
  },

  addOne: function(model) {
    var view = new ChartView({'model': model});
    this.$el.append(view.render().el);
    view = new PolarChartView({'model': model});
    this.$el.append(view.render().el);
  },

  addAll: function (collection) {
    this.$el.html('');
    collection.each(this.addOne, this);
  },

  render: function (collection) {
    this.addAll(collection);
  },

});
