var app=app||{};!function(){app.AppView=Backbone.View.extend({el:"body",events:{"click #menu ul li a":"changeTab"},initialize:function(){},changeTab:function(a){var e=$(a.currentTarget);app.router.navigate(e.data("url"),{trigger:!0})}})}();