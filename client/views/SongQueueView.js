// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

    // collection: Songs(song)

  tagName: "table",

  updateQueue: function(queue){
    console.log('sqv update',queue);
    this.collection = queue;
    this.render();
  },

  render: function(){
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    this.$el.children().detach();
    console.log('queueCollection',this.collection);

    return this.$el.html('<th>Queue</th>').append(
      this.collection.map(function(song){
        console.log('song1',song);
        return new SongQueueEntryView({model: song}).render();
      })
    );
  }

});
