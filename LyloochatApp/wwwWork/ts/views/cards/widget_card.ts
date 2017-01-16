//Classe mère des cartes widgets
//Classe virtuelle
function Widget_Card(appGrid, card){
    // ========================================== VARIABLES =================================
    this.appGrid = appGrid;
    this.card = card;
    this.elem_card = undefined;
    this.fullscreen_card = undefined;
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================



    // ========================================== ABSTRACT ===================================
    // Retourne le contenu texte de la miniature
    this.getCardThumbailContent = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
        return "";
    };
    //Lors d'un clic simple sur la carte
    this.onCardThumbnailClick = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
    };

    // ========================================== PRIVILEGED ================================
    // Rend la carte dans un élément HTML
    this.render = function(container){
        $(container).append( this.getCardThumbailContent.call(this) );

        var lastChild = container.lastElementChild;
        this.elem_card = lastChild;

        return "";
    };
}
