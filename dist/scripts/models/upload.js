var app = app || {};
(function() {
  app.Upload = Backbone.Model.extend({
    sync: function(method, model, options) {
      if (method === 'read') {
        Backbone.sync(method, model, options);
      } else {
        console.error('You can not ' + method + ' the Upload model');
      }
    },
  });
})();
