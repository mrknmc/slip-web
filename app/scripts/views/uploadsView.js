var app = app || {};
(function() {
  app.UploadsView = Backbone.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#uploads',

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function () {
      this.$tbody = this.$('tbody');
      // this.$thead = this.$('thead');
      this.listenTo(app.uploads, 'sync', this.render);

      // Suppresses 'add' events with {reset: true} and prevents the app view
      // from being re-rendered for every model. Only renders when the 'reset'
      // event is triggered at the end of the fetch.
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
    }

    // filterOne: function (todo) {
    //   todo.trigger('visible');
    // },

    // filterAll: function () {
    //   app.todos.each(this.filterOne, this);
    // },
  });
})();
