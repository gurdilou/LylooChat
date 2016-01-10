function SoundLibrary(deviceHandler){
  // ========================================== VARIABLES =================================
  this.deviceHandler = deviceHandler;
  this.recentsPlayed = new SoundList(this);

  _loadRecents();
  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================
  function _loadRecents(){
    //TODO
  }
  // ========================================== PRIVILEGED ================================
  // searchSounds : Cherche une liste de sons commencant avec *prefix* et contenant *termSearched*
  this.searchSounds = function(prefix, termSearched) {
    //TODO
    return new SoundList(this);
  };
  //playSound : Démarre la lecture d'un son
  this.playSound = function(sound, cb_OnStop){
    //TODO
  }
  // stopSound : Arrête la lecture d'un son
  this.stopSound = function(sound, cb_OnStop){
    //TODO
    cb_OnStop();
  }
}
