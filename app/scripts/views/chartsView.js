var app = app || {};

(function() {
  'use strict';

  app.ChartsView = Backbone.View.extend({

    initialize: function () {
      this.listenTo(this.collection, 'sync', this.render);
      this.collection.fetch();
    },

    addOne: function(model) {
      var view = new app.ChartView({'model': model});
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
})();
