var app=app||{};!function(){var e=Backbone.Collection.extend({model:Backbone.Model,url:"/api/solar",nextOrder:function(){return this.length?this.last().get("order")+1:1},comparator:"order"});app.solar=new e}();