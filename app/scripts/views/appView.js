var app = app || {};

(function() {
  app.AppView = Backbone.View.extend({
    el: 'body',

    events: {
      'click #bs-example-navbar-collapse-1 ul li a': 'changeTab'
    },

    initialize: function() {
      // this.listenTo(app.router, 'all', function() {
      //   console.log('all');
      // });
      // app.router.on('route', function() {
      //   console.log('woot');
      // });
    },

    changeTab: function (e) {
      var target = $(e.currentTarget);
      app.router.navigate(target.data('url'), {trigger: true});
    },

  });

})();
