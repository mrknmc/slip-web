var app = app || {};

(function() {
  app.UsersView = Backbone.View.extend({
    el: '#users',

    events: {
      'click #add-user-form .submit' : 'create'
    },

    initialize: function () {
      this.$list = this.$('.list-group');
      this.listenTo(app.users, 'add', this.addOne);
      // this.listenTo(app.users, 'sync', this.render);
      app.users.fetch();
    },

    create: function(e) {
      // e.preventDefault();
      app.users.create({
        name: this.$('#name').val().trim(),
        email: this.$('#email').val().trim(),
      });
    },

    addOne: function (user) {
      console.log('u wot m8');
      var view = new app.UserView({model: user});
      this.$list.append(view.render().el);
      console.log('meh?');
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
