var app=app||{};!function(){var r=Backbone.Collection.extend({model:Backbone.Model,nextOrder:function(){return this.length?this.last().get("order")+1:1},comparator:"order"}),a=new r;a.url="/api/solar",app.solar=a;var e=new r;e.url="/api/wind",app.wind=e}();