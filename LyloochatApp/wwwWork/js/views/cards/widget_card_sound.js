//Une carte avec du son
function Widget_Card_Sound(appGrid, card){
    // ========================================== VARIABLES =================================
    Widget_Card.apply(this, [appGrid, card]);
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== OVERRIDE===================================
    // Retourne le contenu texte de la miniature
    this.getCardThumbailContent = function(){

        var context = {
            cardNumber: card.id,
            title: card.code
        };
        return Lyloochat.templates.widget_card_text(context);
    };
    //Lors d'un clic simple sur la carte
    this.onCardThumbnailClick = function(){
        showErrorPanel("Click Widget_Card_Sound");
    };
    // ========================================== PRIVILEGED ================================
}
