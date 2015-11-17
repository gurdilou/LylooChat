//Déclenche l'apparition d'une pop up lorsque on fait un appui long sur un des cartes de la grille
(function(window, $) {

  $(function() {
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
  });
})(window, jQuery);
