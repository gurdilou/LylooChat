function AppGrid(app) {
    // ========================================== VARIABLES =================================

    // ========================================== CONSTRUCTOR ===============================
    this.app = app;
    this.busy = false;

    
    _fill();
    // ========================================== PRIVATE ===================================
    // fill : Remplit la grille
    function _fill() {
        //Création grille
        var gridSource = document.getElementById("grid-cards");
        for(i = 0; i < app.model.listCards.length(); i++){
            var card = app.model.listCards.getCard(i);

            var card_widget;
            if(card instanceof  Card_Text){
                card_widget = new Widget_Card_Text(this, card);
            }
            else if(card instanceof  Card_Drawing){
                card_widget = new Widget_Card_Drawing(this, card);
            }
            else if (card instanceof Card_Sound) {
                card_widget = new Widget_Card_Sound(this, card);
            }

            if(typeof card_widget !== 'undefined'){
                card_widget.render(gridSource);
            }else{
                throw "Type de carte non supporté encore.";
            }

        }

        _addEvents_RippleEffects();
        _addEvents_CardConfigurations();
    }
    //_addEvents_RippleEffects : Colle un écouteur pour faire un petit effet su chaque carte
    function _addEvents_RippleEffects(){
      var self, ink, d, x, y;
      $(".ripple").on('tap', function(e) {
        var app = phonegapHandler.app;
        if (app.loaded) {
          self = $(this);
          //create .ink element if it doesn't exist
          if (self.find(".ink").length === 0)
            self.prepend("<span class='ink'></span>");

          ink = self.find(".ink");
          //incase of quick double clicks stop the previous animation
          ink.removeClass("animate");

          //set size of .ink
          if (!ink.height() && !ink.width()) {
            //use self's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(self.outerWidth(), self.outerHeight());
            ink.css({
              height: d,
              width: d
            });
          }

          //get click coordinates
          //logic = click coordinates relative to page - self's position relative to page - half of self height/width to make it controllable from the center;
          x = e.pageX - self.offset().left - ink.width() / 2;
          y = e.pageY - self.offset().top - ink.height() / 2;

          //set the position and add class .animate
          ink.css({
            top: y + 'px',
            left: x + 'px'
          }).addClass("animate");
        }
      });
    }

    //_addEvents_CardConfigurations : Ajoute un écouteur pour éditer les cartes
    function _addEvents_CardConfigurations(){
      $(".card-text").on("taphold", function(event) {
        var app = phonegapHandler.app;
        if(app.loaded){
          if(app.views.cardConfigurator === undefined){
            app.views.cardConfigurator = new CardConfigurator();
          }

          var self = $(this);
          app.views.cardConfigurator.onClick(self, event);
        }
      });
    }
    // ========================================== PRIVILEGED ================================

}
