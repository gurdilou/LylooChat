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

            var card_widget = undefined;
            if(card instanceof  Card_Text){
                card_widget = new Widget_Card_Text(card);
            }
            else if(card instanceof  Card_Drawing){
                card_widget = new Widget_Card_Drawing(card);
            }
            else if (card instanceof Card_Sound) {
                card_widget = new Widget_Card_Sound(card);
            }

            if(typeof card_widget !== 'undefined'){
                card_widget.render(gridSource);
            }else{
                throw "Type de carte non supporté encore.";
            }

        }
    }
    // ========================================== PRIVILEGED ================================

}
