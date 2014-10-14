$('#menu .item').tab();
$('.ui.dropdown').dropdown();

var app = app || {};

$(function () {
  'use strict';
  new app.UploadsView();
});

var solarOptions = {
  showArea: true,
  low: 0,
  // width: '780px',
  // height: '260px',
};

var windOptions = {
  showArea: true,
  low: 0,
  // width: '780px',
  // height: '260px',
};

var solarChart = Chartist.Line('#solar-chart', {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, 5]
  ]
}, solarOptions);


var windChart = Chartist.Line('#wind-chart', {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  series: [
    [12, 9, 7, 8, 5]
  ]
}, windOptions);
