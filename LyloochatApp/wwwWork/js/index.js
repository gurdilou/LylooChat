function PhonegapHandler(){
  this.app = undefined;
  // ========================================== VARIABLES =================================

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
  // initialize : Lance l'application
  this.initialize = function() {
    console.log("callback initialize");
    this.app = new App(this);

    window.addEventListener('load', this.app.initialisation(), false);
  };
  //loadCard : Charge une carte depuis la mémoire de l'appareil
  this.loadCard = function(index){
    var cardLoaded = new Card(index, "Card number "+index);
    return cardLoaded;
  };

}
