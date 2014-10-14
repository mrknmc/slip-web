var app = app || {};

(function() {
  var Uploads = Backbone.Collection.extend({
    model: Backbone.Model,
    url: '/api/measurements',

    nextOrder: function () {
      return this.length ? this.last().get('order') + 1 : 1;
    },

    comparator: 'order'
  });

  app.uploads = new Uploads();
})();