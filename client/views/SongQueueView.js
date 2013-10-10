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
    this.$el.children().detach();

    return this.$el.html('<th>Queue</th>').append(
      this.collection.map(function(song){
        return new SongQueueEntryView({model: song}).render();
      })
    );
  }

});
