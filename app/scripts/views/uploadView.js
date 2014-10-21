var app = app || {};

(function() {
  app.UploadView = Backbone.View.extend({
    tagName: 'tr',

    // Cache the template function for a single item.
    template: _.template($('#upload-template').html()),

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toDisplay()));
      return this;
    },

  });
})();
