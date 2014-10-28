var app = app || {};

(function() {
  app.UsersView = Backbone.View.extend({
    el: '#users',

    initialize: function () {
      this.$list = this.$('.list-group');
      this.listenTo(app.users, 'sync', this.render);
      app.users.fetch();
    },

    addOne: function (user) {
      var view = new app.UserView({model: user});
      this.$list.append(view.render().el);
    },

    addAll: function (collection) {
      this.$list.html('');
      collection.each(this.addOne, this);
    },

    render: function (collection) {
      this.addAll(collection);
    },

  });
})();
