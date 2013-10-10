// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  // model: app --> App(Songs(song))
  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});

    this.model.on('change:currentSong', function(model){
      var newSong = model.get('currentSong');
      this.playerView.setSong(newSong);
      newSong.dequeue();
    }, this);

    this.model.on('change:songQueue', function(model){
      this.songQueueView.updateQueue(model.get('songQueue'));
    }, this);
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      new LibraryView({collection: this.model.get('library')}).render(),
      this.songQueueView.render(this.model.get('songQueue'))
    ]);
  }

});
