function SoundLibrary(app){
  // ========================================== VARIABLES =================================
  this.recents_played = new SoundList(this);
  this.all_sounds = new SoundList(this);
  this.ready = false;
  this.app = app;

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================

  // ========================================== PRIVILEGED ================================
  // searchSounds : Cherche une liste de sons commencant avec *prefix* et contenant *termSearched*
  this.searchSounds = function(prefix, termSearched) {
    termSearched = termSearched.toLowerCase();
    prefix = prefix.toLowerCase();

    var results = new SoundList(this);
    for (var i = 0; i < this.all_sounds.size(); i++) {
      var sound = this.all_sounds.get(i);

      var valid = true;
      if( prefix !== '' ){
        //TODO dev prefix
        if( sound.name.indexOf(prefix) === 0){
          if( sound.name.toLowerCase().indexOf(termSearched) >= 0 ){
            results.add(sound);
          }
        }
      }else{
        // console.log("termSearched : "+termSearched);
        // console.log("sound.name : "+sound.name);
        if( sound.name.toLowerCase().indexOf(termSearched) >= 0 ){
          // console.log("ajouté !"+sound.name.toLowerCase().indexOf(termSearched));
          results.add(sound);
        }
      }     
    }

    return results;
  };

  // Callback chargement des sons
  this.onSoundsLoaded = function(){
    this.ready = true;
  };

  // addRecent : Ajoute un son aux récents
  this.addRecent = function(soundPlayed, cb) {
    this.recents_played.insertAtBegin(soundPlayed);
    this.recents_played.deleteDuplicates();
    this.recents_played.keepFirst(10);
    app.saveRecentsSound(this.recents_played, cb);
  };
}
