var app = app || {};

$(function () {
  'use strict';
  new app.AppView();
  new app.UploadsView();
  new app.UsersView();
  new app.ChartsView({el: '#solar .charts', collection: app.solar});
  new app.ChartsView({el: '#wind .charts', collection: app.wind});
});

