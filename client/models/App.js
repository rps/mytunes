// App.js - Defines a backbone model class for the whole app.
var App = Backbone.Model.extend({

// library: Songs(song)
initialize: function(params){
    this.set('currentSong', new Song());
    this.set('songQueue', new SongQueue());

    params.library.on('play', function(song){
      if(this.get('songQueue') && this.get('songQueue').models.length > 0){
        this.set('currentSong', this.get('songQueue').models[0]);
      }
    }, this);

    params.library.on('enqueue', function(song){
      if ((this.get('songQueue').length === 0) && (!(this.get('currentSong').attributes['artist']))) {
        this.set('currentSong', song);
      } else {
        var cloneQueue = this.get('songQueue').clone();
        cloneQueue.add(song);
        this.set('songQueue',  cloneQueue);
      }
    }, this);

    // set this to trigger whenever current song changes
    params.library.on('dequeue', function(song){
      var cloneQueue = this.get('songQueue').clone();
      cloneQueue.remove(song);
      this.set('songQueue', cloneQueue);
    }, this);
  }
});
