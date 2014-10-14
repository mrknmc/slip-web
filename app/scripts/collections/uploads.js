var app = app || {};
(function() {
  var Uploads = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: app.Upload,
    url: '/api/measurements',

    nextOrder: function () {
      return this.length ? this.last().get('order') + 1 : 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: 'order'
  });

  app.uploads = new Uploads();
})();
