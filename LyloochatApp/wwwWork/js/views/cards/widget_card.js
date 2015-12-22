//Classe mère des cartes widgets
//Classe virtuelle
function Widget_Card(card){
    // ========================================== VARIABLES =================================
    this.card = card;
    this.elem_card = undefined;
    this.fullscreen_card = undefined;
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================

    // Ajoute l'écouteur d'évenment sur la miniature
    function _addThumbnailEvents(){
        var self = this;

        var anchor = $(this.elem_card).find('.container');
        anchor.on('tap', function(){
            setTimeout(function() {
                self.onCardThumbnailClick();
            }, (300));
        });
    };

    // ========================================== ABSTRACT ===================================
    // Retourne le contenu texte de la miniature
    this.getCardThumbailContent = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
        return "";
    };
    //Lors d'un clic simple sur la carte
    this.onCardThumbnailClick = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
    }

    // ========================================== PRIVILEGED ================================
    // Rend la carte dans un élément HTML
    this.render = function(container){
        $(container).append( this.getCardThumbailContent.call(this) );

        var lastChild = container.lastElementChild;
        this.elem_card = lastChild;
        _addThumbnailEvents.call(this);

        return "";
    };
}
