var app=app||{};!function(e){app.ChartView=Backbone.View.extend({template:_.template($("#chart-template").html()),initialize:function(){this.listenTo(this.model,"filtered",this.rerender)},rerender:function(){var e=this.model;return this.$panelBody=this.$(".panel-body"),this.$panelBody.highcharts({chart:{type:"areaspline"},credit:{enabled:!1},title:e.title(),xAxis:e.get("xAxis"),yAxis:e.get("yAxis"),plotOptions:e.get("plotOptions"),series:[{name:e.get("_id"),data:e.getData()}]}),this.chart=this.$panelBody.highcharts(),this},render:function(){var t=this.model;this.$el.html(this.template(t.toJSON()));var i=t.get("filter");return new e({field:this.$(".datepicker.start")[0],maxDate:new Date,defaultDate:new Date(i.start),setDefaultDate:!0,onSelect:function(){i.start=this.getMoment(),t.set("filter",i),t.trigger("filtered")}}),new e({field:this.$(".datepicker.end")[0],maxDate:new Date,defaultDate:new Date(i.end),setDefaultDate:!0,onSelect:function(){i.end=this.getMoment(),t.set("filter",i),t.trigger("filtered")}}),this.rerender()}})}(Pikaday,moment);