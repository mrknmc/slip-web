var app = app || {};
(function() {
  app.UploadsView = Backbone.View.extend({
    el: '#uploads',

    initialize: function () {
      this.$tbody = this.$('tbody');
      // this.$thead = this.$('thead');
      this.listenTo(app.uploads, 'sync', this.render);
      app.uploads.fetch();
    },

    addOne: function (upload) {
      var view = new app.UploadView({model: upload});
      this.$tbody.append(view.render().el);
    },

    addAll: function (collection) {
      this.$tbody.html('');
      collection.each(this.addOne, this);
    },

    render: function (collection) {
      this.addAll(collection);
    },

  });
})();
