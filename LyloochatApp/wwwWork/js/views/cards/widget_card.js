//Classe mère des cartes widgets
//Classe virtuelle
function Widget_Card(card){
  // ========================================== VARIABLES =================================
  this.card = card;
  // ========================================== CONSTRUCTOR ===============================
  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
  // Rend la carte dans un élément HTML
  this.render = function(container){
    showErrorPanel("Shouldn't be there you naughty boy !");
  };
}
