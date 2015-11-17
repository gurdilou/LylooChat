function ListCards(){
  // ========================================== VARIABLES =================================
  this.cards = [];
  // ========================================== CONSTRUCTOR ===============================
  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
  // addCard : Ajoute une carte dans la grille
  this.addCard = function(newCard){
    this.cards.push(newCard);
  };
  // length : Retourne le nombre de cartes
  this.length = function(){
    return this.cards.length;
  };
  // getCard : Retourne la carte à l'index donné
  this.getCard = function(index){
    return this.cards[index];
  };

}
