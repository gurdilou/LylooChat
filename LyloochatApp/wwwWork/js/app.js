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
  // _loadOptions charge les options de l'appli
  function _loadOptions(){
    this.model.options = {};

    //TODO load options
    this.model.options.prefix = "";
  }

  // ========================================== PRIVILEGED ================================
  //initialisation : Charge l'application
  this.initialisation = function() {
    console.log("initialisation");

    $.event.special.tap.emitTapOnTaphold = false;

    //Chargement du modèle
    _loadCards.call(this);
    _loadOptions.call(this);

    //Création des vues
    this.views.menu = new AppMenu(this);
    this.views.grid = new AppGrid(this);
    this.loaded=true;

    window.onerror = function(msg, url, line, col, error) {
      console.error(msg);
      showErrorPanel(msg);
    };
  };

  //initSoundLibrary : Initialise la bibliothèque de musique
  this.initSoundLibrary = function() {
    return deviceHandler.initSoundLibrary();
  };
}
