//Une carte avec du texte
function Widget_Card_Text(card){
    // ========================================== VARIABLES =================================

    // ========================================== CONSTRUCTOR ===============================
    Widget_Card.apply(this, [card]);


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
        this.displayed_screen_card = new Screen_Card_Text(this);
        this.displayed_screen_card.display();
    };

    // ========================================== PRIVILEGED ================================

}
