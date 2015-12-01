function AppGrid(app) {
  // ========================================== VARIABLES =================================

  // ========================================== CONSTRUCTOR ===============================
  this.app = app;
  _fill();
  // ========================================== PRIVATE ===================================
  // fill : Remplit la grille
  function _fill() {
    //Création grille
    var gridSource = document.getElementById("grid-cards");
    for(i = 0; i < app.model.listCards.length(); i++){
      var card = app.model.listCards.getCard(i);

      var context = {
        cardNumber: card.id,
        title: card.code
      };
      gridSource.innerHTML += Lyloochat.templates.widget_card_text(context);
    }
  }
  // ========================================== PRIVILEGED ================================

}
