var app=app||{};$("#menu .item").tab(),$(function(){"use strict";new app.UploadsView,new app.MeasurementsView({el:"#solar",collection:app.solar}),new app.MeasurementsView({el:"#wind",collection:app.wind})});