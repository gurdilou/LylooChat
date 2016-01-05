function App(deviceHandler){
  // ========================================== VARIABLES =================================
  this.loaded = false;

  this.views = {};
  this.model = {};
  this.deviceHandler = deviceHandler;

  Handlebars.registerPartial('widget_badge_button', Lyloochat.templates.widget_badge_button);
  Handlebars.registerPartial('widget_text_button', Lyloochat.templates.widget_text_button);
  Handlebars.registerPartial('widget_floating_button', Lyloochat.templates.widget_floating_button);

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

    $.event.special.tap.emitTapOnTaphold = false;

    //Chargement du modèle
    _loadCards.call(this);

    //Création des vues
    this.views.menu = new AppMenu(this);
    this.views.grid = new AppGrid(this);
    this.loaded=true;

    window.onerror = function(msg, url, line, col, error) {
      console.error(msg);
      showErrorPanel(msg);
    };
  };

}
