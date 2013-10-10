// PlayerView.js - Defines a backbone view class for the music player.
var PlayerView = Backbone.View.extend({

  // model: song

  // HTML5 (native) audio tag is being used
  // see: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video
  el: '<audio controls autoplay="autoplay" id="player" />',

  initialize: function() {
    var that = this;
    this.$el.bind("ended", function(){
      that.model.play();
    });
  },

  // alertSong: function(){
  //   var that = this;
  //   console.log(that);
  //   that.dequeue();
  // }

  setSong: function(song){
    this.model = song;
    this.render();
    // this.model.dequeue();
  },

  render: function(){
    return this.$el.attr('src', this.model.get('url'));
  }
});
