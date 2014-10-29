var Backbone = require('backbone');

var AppRouter = Backbone.Router.extend({
  routes: {
    'uploads': 'uploads',
    'solar': 'solar',
    'wind': 'wind',
    'map': 'map',
  },

});

router = new AppRouter();
router.on('route', function() {
  $(window).resize();
});

Backbone.history.start({pushState: true});

module.exports = router;
