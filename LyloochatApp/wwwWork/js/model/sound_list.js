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
}
