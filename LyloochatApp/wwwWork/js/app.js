function App(deviceHandler){
  // ========================================== VARIABLES =================================
  this.loaded = false;
  this.views = {};
  this.model = {};
  this.deviceHandler = deviceHandler;


  // ========================================== PRIVATE ===================================
  // _loadCards charge les cartes depuis l'appareil
  function _loadCards(){
    this.model.listCards = new ListCards();
    for (i = 0; i < 16; i++) {
      var card = deviceHandler.loadCard(i);
      this.model.listCards.addCard(card);
    }
  }

  // ========================================== PRIVILEGED ================================
  //initialisation : Charge l'application
  this.initialisation = function() {
    console.log("initialisation");
    //Chargement du modèle
    _loadCards.call(this);

    //Création des vues
    this.views.menu = new AppMenu(this);
    this.views.grid = new AppGrid(this);
    this.loaded=true;
  };

}
