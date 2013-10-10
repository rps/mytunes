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

    var that = this;

    window.onbeforeunload = function(e) {
      if (typeof(Storage)!== 'undefined'){
        var queue = that.model.get('songQueue').models;
        var storeArray = [];
        for (var i = 0; i< queue.length; i++){
          storeArray.push(parseInt(queue[i].cid.slice(1),10)-1);
        }
        localStorage.queueArray = JSON.stringify(storeArray);
        // return "Are you sure you want to close the window?"; 
      }
    };
    if(typeof(Storage) !== 'undefined' && localStorage.queueArray){
      storage = JSON.parse(localStorage.queueArray);
      for (var j = 0; j<storage.length; j++){
        this.model.get('library').models[storage[j]].enqueue();
      }
    }
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      new LibraryView({collection: this.model.get('library')}).render(),
      this.songQueueView.render(this.model.get('songQueue'))
    ]);
  }

});
