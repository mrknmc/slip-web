(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./app/scripts/app.js":[function(require,module,exports){
var Backbone=window.Backbone,AppView=require("./views/appView");new AppView;
},{"./views/appView":"/Users/mark/slip-web/app/scripts/views/appView.js"}],"/Users/mark/slip-web/app/scripts/collections/measurements.js":[function(require,module,exports){
var Backbone=window.Backbone,Solar=require("../models/solar"),Wind=require("../models/wind"),Measurements=Backbone.Collection.extend({}),solar=new Measurements([],{model:Solar});solar.url="/api/solar",exports.solar=solar;var wind=new Measurements([],{model:Wind});wind.url="/api/wind",exports.wind=wind;
},{"../models/solar":"/Users/mark/slip-web/app/scripts/models/solar.js","../models/wind":"/Users/mark/slip-web/app/scripts/models/wind.js"}],"/Users/mark/slip-web/app/scripts/collections/uploads.js":[function(require,module,exports){
var Backbone=window.Backbone,Upload=require("../models/upload"),Uploads=Backbone.Collection.extend({model:Upload,url:"/api/upload",comparator:function(e,o){return e.get("created")>o.get("created")?-1:e.get("created")<o.get("created")?1:0}});module.exports=new Uploads;
},{"../models/upload":"/Users/mark/slip-web/app/scripts/models/upload.js"}],"/Users/mark/slip-web/app/scripts/collections/users.js":[function(require,module,exports){
var Backbone=window.Backbone,User=require("../models/user"),Users=Backbone.Collection.extend({model:User,url:"/api/user"});module.exports=new Users;
},{"../models/user":"/Users/mark/slip-web/app/scripts/models/user.js"}],"/Users/mark/slip-web/app/scripts/models/solar.js":[function(require,module,exports){
var Backbone=window.Backbone,_=window._,moment=window.moment,util=require("../util");module.exports=Backbone.Model.extend({defaults:function(){return{color:"#ff8c00",yAxis:{title:"Light Intensity"},xAxis:{type:"datetime"},plotOptions:{areaspline:{fillOpacity:.4,marker:{enabled:!1,symbol:"circle",radius:2,states:{hover:{enabled:!0}}},tooltip:{valueDecimals:2}}}}},initialize:function(){var t=this.get("measurements"),e=moment(t[t.length-1].timestamp,"X");this.set("filter",{end:e,start:moment(e).add(-7,"days")})},title:function(){return{text:this.get("_id")+": Solar Power"}},intensities:function(){var t=this.get("measurements");return _.map(t,function(t){var e=util.innerRing(t),n=util.middleRing(t),i=util.outerRing(t);return _.zip(e,n,i).map(function(t){return _.reduce(t,function(t,e){return t+e})})}).reduce(function(t,e){for(var n=e.length-1;n>=0;n--)t[n]+=e[n];return t})},getData:function(){var t=this.get("filter");return _(this.get("measurements")).map(function(t){return{x:moment(t.timestamp,"X"),y:util.intensitySum(t)}}).filter(function(e){return e.x>=t.start&&e.x<moment(t.end).add(1,"days")}).value()}});
},{"../util":"/Users/mark/slip-web/app/scripts/util.js"}],"/Users/mark/slip-web/app/scripts/models/upload.js":[function(require,module,exports){
var Backbone=window.Backbone,moment=window.moment;module.exports=Backbone.Model.extend({idAttribute:"_id",niceCreated:function(){return moment(this.get("created")).format("llll")},toDisplay:function(){return _.extend(this.toJSON(),{created:this.niceCreated(),url:this.url()})}});
},{}],"/Users/mark/slip-web/app/scripts/models/user.js":[function(require,module,exports){
module.exports=require("/Users/mark/slip-web/app/scripts/models/upload.js")
},{"/Users/mark/slip-web/app/scripts/models/upload.js":"/Users/mark/slip-web/app/scripts/models/upload.js"}],"/Users/mark/slip-web/app/scripts/models/wind.js":[function(require,module,exports){
var Backbone=window.Backbone,_=window._,moment=window.moment,util=require("../util");module.exports=Backbone.Model.extend({defaults:function(){return{color:"#87cefa",yAxis:{title:"Wind Speed"},xAxis:{type:"datetime"},plotOptions:{areaspline:{fillOpacity:.4,marker:{enabled:!1,symbol:"circle",radius:2,states:{hover:{enabled:!0}}},tooltip:{valueDecimals:2}}}}},initialize:function(){var e=this.get("measurements"),t=moment(e[e.length-1].timestamp,"X");this.set("filter",{end:t,start:moment(t).add(-7,"days")})},title:function(){return{text:this.get("_id")+": Wind Speed"}},intensities:function(){return[1,2,3,4,5,6,7,8]},getData:function(){var e=this.get("filter");return _.chain(this.get("measurements")).map(function(e){return{x:moment(e.timestamp,"X"),y:e.windSpeed}}).filter(function(t){return t.x>=e.start&&t.x<=e.end}).value()}});
},{"../util":"/Users/mark/slip-web/app/scripts/util.js"}],"/Users/mark/slip-web/app/scripts/routers/router.js":[function(require,module,exports){
var Backbone=window.Backbone,AppRouter=Backbone.Router.extend({routes:{uploads:"uploads",solar:"solar",wind:"wind",map:"map"}});router=new AppRouter,router.on("route",function(){$(window).resize()}),Backbone.history.start({pushState:!0}),module.exports=router;
},{}],"/Users/mark/slip-web/app/scripts/util.js":[function(require,module,exports){
function innerRing(n){return _.first(n.lightIntensities,8)}function middleRing(n){return _(n.lightIntensities).rest(8).first(8).value()}function outerRing(n){return _(n.lightIntensities).rest(16).first(8).value()}function intensitySum(n){return _.reduce(n.lightIntensities,function(n,t){return n+t})}function intensityAngle(n){var t,i=n.lightIntensities,e=2*Math.PI/i.length,r=_.map(i,function(n,i){return t=e*i,{x:n*Math.cos(t),y:n*Math.sin(t)}}),s=_.reduce(r,function(n,t){return n.x+=t.x,n.y+=t.y,n},{x:0,y:0});return Math.atan(s.y/s.x)}var _=window._;exports.innerRing=innerRing,exports.middleRing=middleRing,exports.outerRing=outerRing,exports.intensitySum=intensitySum,exports.intensityAngle=intensityAngle;
},{}],"/Users/mark/slip-web/app/scripts/views/appView.js":[function(require,module,exports){
var Backbone=window.Backbone,router=require("../routers/router"),measurements=require("../collections/measurements"),UploadsView=require("./uploadsView"),UsersView=require("./usersView"),ChartsView=require("./chartsView");module.exports=Backbone.View.extend({el:"body",events:{"click #menu ul li a":"changeTab"},initialize:function(){new UploadsView,new UsersView,new ChartsView({el:"#solar .charts",collection:measurements.solar}),new ChartsView({el:"#wind .charts",collection:measurements.wind})},changeTab:function(e){var r=$(e.currentTarget);router.navigate(r.data("url"),{trigger:!0})}});
},{"../collections/measurements":"/Users/mark/slip-web/app/scripts/collections/measurements.js","../routers/router":"/Users/mark/slip-web/app/scripts/routers/router.js","./chartsView":"/Users/mark/slip-web/app/scripts/views/chartsView.js","./uploadsView":"/Users/mark/slip-web/app/scripts/views/uploadsView.js","./usersView":"/Users/mark/slip-web/app/scripts/views/usersView.js"}],"/Users/mark/slip-web/app/scripts/views/chartView.js":[function(require,module,exports){
var Backbone=window.Backbone,moment=window.moment,Pikaday=require("pikaday");module.exports=Backbone.View.extend({className:"col-md-12 col-lg-6",template:_.template($("#chart-template").html()),initialize:function(){this.listenTo(this.model,"filtered",this.rerender),this.listenTo(this.model,"change",this.rerender)},rerender:function(){var e=this.model;return this.$panelBody=this.$(".panel-body"),this.$panelBody.highcharts({chart:{type:"areaspline"},legend:{enabled:!1},credits:{enabled:!1},title:e.title(),xAxis:e.get("xAxis"),yAxis:e.get("yAxis"),plotOptions:e.get("plotOptions"),series:[{color:e.get("color"),name:e.get("_id"),data:e.getData()}]}),this.chart=this.$panelBody.highcharts(),this},render:function(){var e=this.model;this.$el.html(this.template(e.toJSON()));var t=e.get("filter");return new Pikaday({field:this.$(".datepicker.start")[0],maxDate:new Date,defaultDate:new Date(t.start),setDefaultDate:!0,onSelect:function(t){e.set("filter",{end:e.get("filter").end,start:moment(t)}),e.trigger("filtered")}}),new Pikaday({field:this.$(".datepicker.end")[0],maxDate:new Date,defaultDate:new Date(t.end),setDefaultDate:!0,onSelect:function(t){e.set("filter",{start:e.get("filter").start,end:moment(t)}),e.trigger("filtered")}}),this.rerender()}});
},{"pikaday":"/Users/mark/slip-web/node_modules/pikaday/pikaday.js"}],"/Users/mark/slip-web/app/scripts/views/chartsView.js":[function(require,module,exports){
var Backbone=window.Backbone,ChartView=require("./chartView"),PolarChartView=require("./polarChartView");module.exports=Backbone.View.extend({initialize:function(){this.listenTo(this.collection,"sync",this.render),this.collection.fetch()},addOne:function(e){var i=new ChartView({model:e});this.$el.append(i.render().el),i=new PolarChartView({model:e}),this.$el.append(i.render().el)},addAll:function(e){this.$el.html(""),e.each(this.addOne,this)},render:function(e){this.addAll(e)}});
},{"./chartView":"/Users/mark/slip-web/app/scripts/views/chartView.js","./polarChartView":"/Users/mark/slip-web/app/scripts/views/polarChartView.js"}],"/Users/mark/slip-web/app/scripts/views/polarChartView.js":[function(require,module,exports){
var Backbone=window.Backbone,_=window._,moment=window.moment,Pikaday=require("pikaday");module.exports=Backbone.View.extend({className:"col-md-12 col-lg-6",template:_.template($("#chart-template").html()),initialize:function(){this.listenTo(this.model,"filtered",this.rerender),this.listenTo(this.model,"change",this.rerender)},rerender:function(){var e=this.model;return this.$panelBody=this.$(".panel-body"),this.$panelBody.highcharts({chart:{polar:!0},legend:{enabled:!1},credits:{enabled:!1},title:e.title(),pane:{startAngle:0,endAngle:360},xAxis:{tickInterval:45,min:0,max:360,labels:{formatter:function(){var e=this.value/360*8;return["N","NE","E","SE","S","SW","W","NW"][e]}}},yAxis:{min:0},plotOptions:{series:{pointStart:0,pointInterval:45},column:{pointPadding:0,groupPadding:0}},series:[{type:"area",color:e.get("color"),name:"Area",data:e.intensities()}]}),this},render:function(){var e=this.model;this.$el.html(this.template(e.toJSON()));var t=e.get("filter");return new Pikaday({field:this.$(".datepicker.start")[0],maxDate:new Date,defaultDate:new Date(t.start),setDefaultDate:!0,onSelect:function(t){e.set("filter",{end:e.get("filter").end,start:moment(t)}),e.trigger("filtered")}}),new Pikaday({field:this.$(".datepicker.end")[0],maxDate:new Date,defaultDate:new Date(t.end),setDefaultDate:!0,onSelect:function(t){e.set("filter",{start:e.get("filter").start,end:moment(t)}),e.trigger("filtered")}}),this.rerender()}});
},{"pikaday":"/Users/mark/slip-web/node_modules/pikaday/pikaday.js"}],"/Users/mark/slip-web/app/scripts/views/uploadView.js":[function(require,module,exports){
var Backbone=window.Backbone;module.exports=Backbone.View.extend({tagName:"tr",events:{"click a.delete":"delete"},template:_.template($("#upload-template").html()),initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.remove)},"delete":function(){this.model.destroy()},render:function(){return this.$el.html(this.template(this.model.toDisplay())),this}});
},{}],"/Users/mark/slip-web/app/scripts/views/uploadsView.js":[function(require,module,exports){
var Backbone=window.Backbone,uploads=require("../collections/uploads"),UploadView=require("./uploadView");module.exports=Backbone.View.extend({el:"#uploads",initialize:function(){this.$tbody=this.$("tbody"),this.listenTo(uploads,"sync",this.render),uploads.fetch()},addOne:function(e){var d=new UploadView({model:e});this.$tbody.append(d.render().el)},addAll:function(e){this.$tbody.html(""),e.each(this.addOne,this)},render:function(e){this.addAll(e)}});
},{"../collections/uploads":"/Users/mark/slip-web/app/scripts/collections/uploads.js","./uploadView":"/Users/mark/slip-web/app/scripts/views/uploadView.js"}],"/Users/mark/slip-web/app/scripts/views/userView.js":[function(require,module,exports){
var Backbone=window.Backbone;module.exports=Backbone.View.extend({tagName:"a",className:"list-group-item",events:{"click a.delete":"delete"},template:_.template($("#user-template").html()),initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.remove)},"delete":function(){this.model.destroy()},render:function(){return this.$el.html(this.template(this.model.toDisplay())),this}});
},{}],"/Users/mark/slip-web/app/scripts/views/usersView.js":[function(require,module,exports){
var Backbone=window.Backbone,UserView=require("./userView"),users=require("../collections/users");module.exports=Backbone.View.extend({el:"#users",events:{"click #add-user-form .submit":"create"},initialize:function(){this.$list=this.$(".list-group"),this.listenTo(users,"add",this.addOne),users.fetch()},create:function(){users.create({name:this.$("#name").val().trim(),email:this.$("#email").val().trim()})},addOne:function(e){var i=new UserView({model:e});this.$list.append(i.render().el)},addAll:function(e){this.$list.html(""),e.each(this.addOne,this)},render:function(e){this.addAll(e)}});
},{"../collections/users":"/Users/mark/slip-web/app/scripts/collections/users.js","./userView":"/Users/mark/slip-web/app/scripts/views/userView.js"}],"/Users/mark/slip-web/node_modules/browserify/lib/_empty.js":[function(require,module,exports){

},{}],"/Users/mark/slip-web/node_modules/pikaday/pikaday.js":[function(require,module,exports){
!function(t,e){"use strict";var n;if("object"==typeof exports){try{n=require("moment")}catch(i){}module.exports=e(n)}else"function"==typeof define&&define.amd?define(function(t){var i="moment";return n=t.defined&&t.defined(i)?t(i):void 0,e(n)}):t.Pikaday=e(t.moment)}(this,function(t){"use strict";var e="function"==typeof t,n=!!window.addEventListener,i=window.document,o=window.setTimeout,a=function(t,e,i,o){n?t.addEventListener(e,i,!!o):t.attachEvent("on"+e,i)},s=function(t,e,i,o){n?t.removeEventListener(e,i,!!o):t.detachEvent("on"+e,i)},r=function(t,e,n){var o;i.createEvent?(o=i.createEvent("HTMLEvents"),o.initEvent(e,!0,!1),o=v(o,n),t.dispatchEvent(o)):i.createEventObject&&(o=i.createEventObject(),o=v(o,n),t.fireEvent("on"+e,o))},u=function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")},l=function(t,e){return-1!==(" "+t.className+" ").indexOf(" "+e+" ")},h=function(t,e){l(t,e)||(t.className=""===t.className?e:t.className+" "+e)},f=function(t,e){t.className=u((" "+t.className+" ").replace(" "+e+" "," "))},d=function(t){return/Array/.test(Object.prototype.toString.call(t))},c=function(t){return/Date/.test(Object.prototype.toString.call(t))&&!isNaN(t.getTime())},m=function(t){return t%4===0&&t%100!==0||t%400===0},p=function(t,e){return[31,m(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]},g=function(t){c(t)&&t.setHours(0,0,0,0)},_=function(t,e){return t.getTime()===e.getTime()},v=function(t,e,n){var i,o;for(i in e)o=void 0!==t[i],o&&"object"==typeof e[i]&&void 0===e[i].nodeName?c(e[i])?n&&(t[i]=new Date(e[i].getTime())):d(e[i])?n&&(t[i]=e[i].slice(0)):t[i]=v({},e[i],n):(n||!o)&&(t[i]=e[i]);return t},D={field:null,bound:void 0,position:"bottom left",format:"YYYY-MM-DD",defaultDate:null,setDefaultDate:!1,firstDay:0,minDate:null,maxDate:null,yearRange:10,minYear:0,maxYear:9999,minMonth:void 0,maxMonth:void 0,isRTL:!1,yearSuffix:"",showMonthAfterYear:!1,numberOfMonths:1,i18n:{previousMonth:"Previous Month",nextMonth:"Next Month",months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},onSelect:null,onOpen:null,onClose:null,onDraw:null},y=function(t,e,n){for(e+=t.firstDay;e>=7;)e-=7;return n?t.i18n.weekdaysShort[e]:t.i18n.weekdays[e]},b=function(t,e,n,i,o){if(o)return'<td class="is-empty"></td>';var a=[];return i&&a.push("is-disabled"),n&&a.push("is-today"),e&&a.push("is-selected"),'<td data-day="'+t+'" class="'+a.join(" ")+'"><button class="pika-button" type="button">'+t+"</button></td>"},w=function(t,e){return"<tr>"+(e?t.reverse():t).join("")+"</tr>"},M=function(t){return"<tbody>"+t.join("")+"</tbody>"},x=function(t){var e,n=[];for(e=0;7>e;e++)n.push('<th scope="col"><abbr title="'+y(t,e)+'">'+y(t,e,!0)+"</abbr></th>");return"<thead>"+(t.isRTL?n.reverse():n).join("")+"</thead>"},k=function(t){var e,n,i,o,a,s=t._o,r=t._m,u=t._y,l=u===s.minYear,h=u===s.maxYear,f='<div class="pika-title">',c=!0,m=!0;for(i=[],e=0;12>e;e++)i.push('<option value="'+e+'"'+(e===r?" selected":"")+(l&&e<s.minMonth||h&&e>s.maxMonth?"disabled":"")+">"+s.i18n.months[e]+"</option>");for(o='<div class="pika-label">'+s.i18n.months[r]+'<select class="pika-select pika-select-month">'+i.join("")+"</select></div>",d(s.yearRange)?(e=s.yearRange[0],n=s.yearRange[1]+1):(e=u-s.yearRange,n=1+u+s.yearRange),i=[];n>e&&e<=s.maxYear;e++)e>=s.minYear&&i.push('<option value="'+e+'"'+(e===u?" selected":"")+">"+e+"</option>");return a='<div class="pika-label">'+u+s.yearSuffix+'<select class="pika-select pika-select-year">'+i.join("")+"</select></div>",f+=s.showMonthAfterYear?a+o:o+a,l&&(0===r||s.minMonth>=r)&&(c=!1),h&&(11===r||s.maxMonth<=r)&&(m=!1),f+='<button class="pika-prev'+(c?"":" is-disabled")+'" type="button">'+s.i18n.previousMonth+"</button>",f+='<button class="pika-next'+(m?"":" is-disabled")+'" type="button">'+s.i18n.nextMonth+"</button>",f+="</div>"},N=function(t,e){return'<table cellpadding="0" cellspacing="0" class="pika-table">'+x(t)+M(e)+"</table>"},T=function(s){var r=this,u=r.config(s);r._onMouseDown=function(t){if(r._v){t=t||window.event;var e=t.target||t.srcElement;if(e){if(!l(e,"is-disabled")){if(l(e,"pika-button")&&!l(e,"is-empty"))return r.setDate(new Date(r._y,r._m,parseInt(e.innerHTML,10))),void(u.bound&&o(function(){r.hide()},100));l(e,"pika-prev")?r.prevMonth():l(e,"pika-next")&&r.nextMonth()}if(l(e,"pika-select"))r._c=!0;else{if(!t.preventDefault)return t.returnValue=!1,!1;t.preventDefault()}}}},r._onChange=function(t){t=t||window.event;var e=t.target||t.srcElement;e&&(l(e,"pika-select-month")?r.gotoMonth(e.value):l(e,"pika-select-year")&&r.gotoYear(e.value))},r._onInputChange=function(n){var i;n.firedBy!==r&&(e?(i=t(u.field.value,u.format),i=i&&i.isValid()?i.toDate():null):i=new Date(Date.parse(u.field.value)),r.setDate(c(i)?i:null),r._v||r.show())},r._onInputFocus=function(){r.show()},r._onInputClick=function(){r.show()},r._onInputBlur=function(){r._c||(r._b=o(function(){r.hide()},50)),r._c=!1},r._onClick=function(t){t=t||window.event;var e=t.target||t.srcElement,i=e;if(e){!n&&l(e,"pika-select")&&(e.onchange||(e.setAttribute("onchange","return;"),a(e,"change",r._onChange)));do if(l(i,"pika-single"))return;while(i=i.parentNode);r._v&&e!==u.trigger&&r.hide()}},r.el=i.createElement("div"),r.el.className="pika-single"+(u.isRTL?" is-rtl":""),a(r.el,"mousedown",r._onMouseDown,!0),a(r.el,"change",r._onChange),u.field&&(u.bound?i.body.appendChild(r.el):u.field.parentNode.insertBefore(r.el,u.field.nextSibling),a(u.field,"change",r._onInputChange),u.defaultDate||(u.defaultDate=e&&u.field.value?t(u.field.value,u.format).toDate():new Date(Date.parse(u.field.value)),u.setDefaultDate=!0));var h=u.defaultDate;c(h)?u.setDefaultDate?r.setDate(h,!0):r.gotoDate(h):r.gotoDate(new Date),u.bound?(this.hide(),r.el.className+=" is-bound",a(u.trigger,"click",r._onInputClick),a(u.trigger,"focus",r._onInputFocus),a(u.trigger,"blur",r._onInputBlur)):this.show()};return T.prototype={config:function(t){this._o||(this._o=v({},D,!0));var e=v(this._o,t,!0);e.isRTL=!!e.isRTL,e.field=e.field&&e.field.nodeName?e.field:null,e.bound=!!(void 0!==e.bound?e.field&&e.bound:e.field),e.trigger=e.trigger&&e.trigger.nodeName?e.trigger:e.field;var n=parseInt(e.numberOfMonths,10)||1;if(e.numberOfMonths=n>4?4:n,c(e.minDate)||(e.minDate=!1),c(e.maxDate)||(e.maxDate=!1),e.minDate&&e.maxDate&&e.maxDate<e.minDate&&(e.maxDate=e.minDate=!1),e.minDate&&(g(e.minDate),e.minYear=e.minDate.getFullYear(),e.minMonth=e.minDate.getMonth()),e.maxDate&&(g(e.maxDate),e.maxYear=e.maxDate.getFullYear(),e.maxMonth=e.maxDate.getMonth()),d(e.yearRange)){var i=(new Date).getFullYear()-10;e.yearRange[0]=parseInt(e.yearRange[0],10)||i,e.yearRange[1]=parseInt(e.yearRange[1],10)||i}else e.yearRange=Math.abs(parseInt(e.yearRange,10))||D.yearRange,e.yearRange>100&&(e.yearRange=100);return e},toString:function(n){return c(this._d)?e?t(this._d).format(n||this._o.format):this._d.toDateString():""},getMoment:function(){return e?t(this._d):null},setMoment:function(n,i){e&&t.isMoment(n)&&this.setDate(n.toDate(),i)},getDate:function(){return c(this._d)?new Date(this._d.getTime()):null},setDate:function(t,e){if(!t)return this._d=null,this.draw();if("string"==typeof t&&(t=new Date(Date.parse(t))),c(t)){var n=this._o.minDate,i=this._o.maxDate;c(n)&&n>t?t=n:c(i)&&t>i&&(t=i),this._d=new Date(t.getTime()),g(this._d),this.gotoDate(this._d),this._o.field&&(this._o.field.value=this.toString(),r(this._o.field,"change",{firedBy:this})),e||"function"!=typeof this._o.onSelect||this._o.onSelect.call(this,this.getDate())}},gotoDate:function(t){c(t)&&(this._y=t.getFullYear(),this._m=t.getMonth(),this.draw())},gotoToday:function(){this.gotoDate(new Date)},gotoMonth:function(t){isNaN(t=parseInt(t,10))||(this._m=0>t?0:t>11?11:t,this.draw())},nextMonth:function(){++this._m>11&&(this._m=0,this._y++),this.draw()},prevMonth:function(){--this._m<0&&(this._m=11,this._y--),this.draw()},gotoYear:function(t){isNaN(t)||(this._y=parseInt(t,10),this.draw())},setMinDate:function(t){this._o.minDate=t},setMaxDate:function(t){this._o.maxDate=t},draw:function(t){if(this._v||t){var e=this._o,n=e.minYear,i=e.maxYear,a=e.minMonth,s=e.maxMonth;if(this._y<=n&&(this._y=n,!isNaN(a)&&this._m<a&&(this._m=a)),this._y>=i&&(this._y=i,!isNaN(s)&&this._m>s&&(this._m=s)),this.el.innerHTML=k(this)+this.render(this._y,this._m),e.bound&&(this.adjustPosition(),"hidden"!==e.field.type&&o(function(){e.trigger.focus()},1)),"function"==typeof this._o.onDraw){var r=this;o(function(){r._o.onDraw.call(r)},0)}}},adjustPosition:function(){var t,e,n,o=this._o.trigger,a=o,s=this.el.offsetWidth,r=this.el.offsetHeight,u=window.innerWidth||i.documentElement.clientWidth,l=window.innerHeight||i.documentElement.clientHeight,h=window.pageYOffset||i.body.scrollTop||i.documentElement.scrollTop;if("function"==typeof o.getBoundingClientRect)n=o.getBoundingClientRect(),t=n.left+window.pageXOffset,e=n.bottom+window.pageYOffset;else for(t=a.offsetLeft,e=a.offsetTop+a.offsetHeight;a=a.offsetParent;)t+=a.offsetLeft,e+=a.offsetTop;(t+s>u||this._o.position.indexOf("right")>-1&&t-s+o.offsetWidth>0)&&(t=t-s+o.offsetWidth),(e+r>l+h||this._o.position.indexOf("top")>-1&&e-r-o.offsetHeight>0)&&(e=e-r-o.offsetHeight),this.el.style.cssText=["position: absolute","left: "+t+"px","top: "+e+"px"].join(";")},render:function(t,e){var n=this._o,i=new Date,o=p(t,e),a=new Date(t,e,1).getDay(),s=[],r=[];g(i),n.firstDay>0&&(a-=n.firstDay,0>a&&(a+=7));for(var u=o+a,l=u;l>7;)l-=7;u+=7-l;for(var h=0,f=0;u>h;h++){var d=new Date(t,e,1+(h-a)),m=n.minDate&&d<n.minDate||n.maxDate&&d>n.maxDate,v=c(this._d)?_(d,this._d):!1,D=_(d,i),y=a>h||h>=o+a;r.push(b(1+(h-a),v,D,m,y)),7===++f&&(s.push(w(r,n.isRTL)),r=[],f=0)}return N(n,s)},isVisible:function(){return this._v},show:function(){this._v||(this._o.bound&&a(i,"click",this._onClick),f(this.el,"is-hidden"),this._v=!0,this.draw(),"function"==typeof this._o.onOpen&&this._o.onOpen.call(this))},hide:function(){var t=this._v;t!==!1&&(this._o.bound&&s(i,"click",this._onClick),this.el.style.cssText="",h(this.el,"is-hidden"),this._v=!1,void 0!==t&&"function"==typeof this._o.onClose&&this._o.onClose.call(this))},destroy:function(){this.hide(),s(this.el,"mousedown",this._onMouseDown,!0),s(this.el,"change",this._onChange),this._o.field&&(s(this._o.field,"change",this._onInputChange),this._o.bound&&(s(this._o.trigger,"click",this._onInputClick),s(this._o.trigger,"focus",this._onInputFocus),s(this._o.trigger,"blur",this._onInputBlur))),this.el.parentNode&&this.el.parentNode.removeChild(this.el)}},T});
},{"moment":"/Users/mark/slip-web/node_modules/browserify/lib/_empty.js"}]},{},["./app/scripts/app.js"]);
