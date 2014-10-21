var app = app || {};

(function() {
  app.AppView = Backbone.View.extend({
    el: 'body',

    events: {
      'click #menu ul li a': 'changeTab',
    },

    initialize: function() {
    },

    changeTab: function (e) {
      var target = $(e.currentTarget);
      app.router.navigate(target.data('url'), {trigger: true});
    },

  });

})();
