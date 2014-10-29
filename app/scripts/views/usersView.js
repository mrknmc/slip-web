var Backbone = require('backbone');
var UserView = require('./userView');
var users = require('../collections/users');

module.exports = Backbone.View.extend({
  el: '#users',

  events: {
    'click #add-user-form .submit' : 'create'
  },

  initialize: function () {
    this.$list = this.$('.list-group');
    this.listenTo(users, 'add', this.addOne);
    // this.listenTo(users, 'sync', this.render);
    users.fetch();
  },

  create: function(e) {
    // e.preventDefault();
    users.create({
      name: this.$('#name').val().trim(),
      email: this.$('#email').val().trim(),
    });
  },

  addOne: function (user) {
    var view = new UserView({model: user});
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
