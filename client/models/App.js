// App.js - Defines a backbone model class for the whole app.
var App = Backbone.Model.extend({

// library: Songs(song)

initialize: function(params){
    this.set('currentSong', new Song());
    this.set('songQueue', new SongQueue());

    params.library.on('play', function(song){
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song){
      if ((this.get('songQueue').length === 0) && (!(this.get('currentSong').attributes['artist']))) {
        this.set('currentSong', song);
      } else {
        var x = this.get('songQueue').clone();
        x.add(song);
        this.set('songQueue',  x);
      }
    }, this);

    params.library.on('dequeue', function(song){
      // console.log('before', this.get('songQueue'));
      var x = this.get('songQueue').clone();
      x.remove(song);

      this.set('songQueue',  x);
      // console.log('after',this.get('songQueue'));
    }, this);
  }




});
