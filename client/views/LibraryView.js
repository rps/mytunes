// LibraryView.js - Defines a backbone view class for the music library.
var LibraryView = Backbone.View.extend({

  // collection: Songs(song)

  tagName: "table",

  render: function(){
    this.$el.children().detach();

    return this.$el.html('<th>Library</th>').append(
      this.collection.map(function(song){
        return new LibraryEntryView({model: song}).render();
      })
    );
  }
});
