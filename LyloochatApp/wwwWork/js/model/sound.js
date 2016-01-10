function Sound(name, author,  filepath, duration){
  // ========================================== VARIABLES =================================
  this.library = undefined;
  this.name = name;
  this.author = author;
  this.filepath = filepath;
  this.duration = duration;
  

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================
  function _zeroPad(num, places) {
  	var zero = places - num.toString().length + 1;
  	return Array(+(zero > 0 && zero)).join("0") + num;
  }

  // ========================================== PRIVILEGED ================================
  // getDurationStr : retourne la durée du son formaté
  this.getDurationStr = function(){
    var dateSeconds = new Date(duration*1000);
    var nbMinutes = dateSeconds.getMinutes();
    nbMinutes = _zeroPad.call(this, nbMinutes, 2);

    var nbSeconds = dateSeconds.getSeconds();
    nbSeconds = _zeroPad.call(this, nbSeconds, 2);

    return nbMinutes+":"+nbSeconds;
  };
  //play : joue un son
  this.play = function(cb_OnStop) {
    this.library.playSound(this, cb_OnStop);
  }
  //stop : arrête la lecture d'un son
  this.stop = function(cb_OnStop) {
    this.library.stopSound(this, cb_OnStop);
  }


}
