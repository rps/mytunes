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
      console.log('before', this.get('songQueue'));
      var x = this.get('songQueue').clone();
      x.add(song);

      this.set('songQueue',  x);
      console.log('after',this.get('songQueue'));
      // this.trigger('change:songQueue');
    }, this);
  }




});
