var app=app||{};!function(e){"use strict";app.Wind=Backbone.Model.extend({defaults:{yAxis:{title:"Wind Speed"},xAxis:{type:"datetime",title:{text:"Date"}},plotOptions:{areaspline:{fillOpacity:.4,marker:{enabled:!1,symbol:"circle",radius:2,states:{hover:{enabled:!0}}},tooltip:{valueDecimals:2}}},filter:{start:e().add(-7,"days"),end:e()}},title:function(){return{text:this.get("_id")+": Wind Speed"}},getData:function(){var e=this.get("filter");return _.chain(this.get("measurements")).map(function(e){return{x:new Date(1e3*e.timestamp),y:e.windSpeed}}).filter(function(t){return t.x>=e.start&&t.x<=e.end}).value()}})}(moment);