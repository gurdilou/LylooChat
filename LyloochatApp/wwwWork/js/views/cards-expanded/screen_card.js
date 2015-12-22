//Classe mère des cartes widgets
//Classe virtuelle
function Screen_Card(widget_card){
    // ========================================== VARIABLES =================================
    this.widget_card = widget_card;
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== ABSTRACT ==================================
    //Lors d'un clic simple sur la carte
    this.display = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
    }
    // ========================================== PRIVILEGED ================================

}
