function SoundList(library){
  // ========================================== VARIABLES =================================
  this.library = library;
  this.list = [];
  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================

  // ========================================== PRIVILEGED ================================
  //size : retourne le nombres de sons contenus
  this.size = function() {
    return this.list.length;
  };
  //get : retourne le son à l'index donné
  this.get = function(index) {
    return this.list[index];
  };
  //add : Ajoute un son à la liste
  this.add = function(sound) {
    this.list.push(sound);
    sound.library = this.library;
  };
  // insertAtBegin : Insère un un son en position 0
  this.insertAtBegin = function(sound) {
    this.list.unshift(sound);
    sound.library = this.library;
  };
  //deleteDuplicates :  Supprime les sons dupliqués
  this.deleteDuplicates = function() {
    for(var i = this.list.length - 1; i >= 0; i--) {
      var sound = this.list[i];

      var index = this.indexOf(sound);
      if(index < i){
        this.list.splice(i, 1); 
      }
    }
  };
  // indexOf : Retourne la première occurence d'un son
  this.indexOf = function(soundSearched) {
    var found = false;
    var result = -1;
    var i = 0;
    while( (i < this.list.length) && (!found) ){
      var sound = this.list[i];
      if( (sound.name === soundSearched.name) && (sound.duration === soundSearched.duration) ){
        found = true;
        result = i;
      } 
      i++;
    }
    return result;
  };
  // keepFirst : Garde uniquement les ''cap'' premiers
  this.keepFirst = function(cap) {
    if ( (cap >= 1) && (this.list.length > cap) ) {
      this.list = this.list.slice(0, cap);
    }
  };
}
