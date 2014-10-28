var app = app || {};

(function(moment) {
  var Users = Backbone.Collection.extend({
    model: app.User,
    url: '/api/users',
  });

  app.users = new Users();
})(moment);
