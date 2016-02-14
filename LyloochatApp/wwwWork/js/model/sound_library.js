function SoundLibrary(){
  // ========================================== VARIABLES =================================
  this.recents_played = new SoundList(this);
  this.all_sounds = new SoundList(this);
  this.ready = false;

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================

  // ========================================== PRIVILEGED ================================
  // searchSounds : Cherche une liste de sons commencant avec *prefix* et contenant *termSearched*
  this.searchSounds = function(prefix, termSearched) {
    //TODO
    return new SoundList(this);
  };
  //playSound : Démarre la lecture d'un son
  this.playSound = function(sound, cb_OnStop){
    this.ready = false;

  };
  // stopSound : Arrête la lecture d'un son
  this.stopSound = function(sound, cb_OnStop){
    //TODO
    cb_OnStop();
  };

  this.onSoundsLoaded = function(){
    this.ready = true;
  };
}
