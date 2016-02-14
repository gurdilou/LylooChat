function App(deviceHandler){
  // ========================================== VARIABLES =================================
  this.loaded = false;

  this.views = {};
  this.model = {};
  this.deviceHandler = deviceHandler;
  this.soundLibrary = undefined;

  Handlebars.registerPartial('widget_badge_button', Lyloochat.templates.widget_badge_button);
  Handlebars.registerPartial('widget_text_button', Lyloochat.templates.widget_text_button);
  Handlebars.registerPartial('widget_floating_button', Lyloochat.templates.widget_floating_button);

  // ========================================== PRIVATE ===================================

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
    var self = this;
    showLoadingPanel("Chargement des cartes...");
    this.model.listCards = new ListCards();
    deviceHandler.loadCards(this.model.listCards, function(){
      _loadOptions.call(self);

      //Création des vues
      self.views.menu = new AppMenu(self);
      self.views.grid = new AppGrid(self);
      self.loaded=true;
      hideLoadingPanel();
    });


    window.onerror = function(msg, url, line, col, error) {
      console.error(msg);
      showErrorPanel(msg);
    };
  };

  // getSoundLibrary : Retourne ou charge la librairie de son
  this.getSoundLibrary = function(cb){
    if(soundLibrary !== undefined){
      cb(soundLibrary);
    }else{
      var self = this;
      var soundLibrary = new SoundLibrary(); 
      showLoadingPanel("Chargement des sons...");
      deviceHandler.loadSounds(soundLibrary, function() {
        hideLoadingPanel();
        self.soundLibrary = soundLibrary;
        cb(self.soundLibrary);
      });
    }
  };
}
