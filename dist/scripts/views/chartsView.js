var app=app||{};!function(){"use strict";app.ChartsView=Backbone.View.extend({initialize:function(){this.listenTo(this.collection,"sync",this.render),this.collection.fetch()},addOne:function(e){var i=new app.ChartView({model:e});this.$el.append(i.render().el)},addAll:function(e){this.$el.html(""),e.each(this.addOne,this)},render:function(e){this.addAll(e)}})}();