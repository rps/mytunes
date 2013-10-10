// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // model: song

  el: '<audio controls autoplay="autoplay" id="player" />',

  initialize: function() {
    var that = this;
    this.$el.bind("ended", function(){
      that.model.play();
    });
  },

  setSong: function(song){
    this.model = song;
    this.render();
  },

  render: function(){
    return this.$el.attr('src', this.model.get('url'));
  }
});
