//Une carte en plein écran avec du texte
function Screen_Card_Text(widget_card){
    // ========================================== VARIABLES =================================
    // ========================================== CONSTRUCTOR ===============================
    Screen_Card.apply(this, [widget_card]);


    // ========================================== PRIVATE ===================================
    // ========================================== OVERRIDE===================================
    //Lors d'un clic simple sur la carte
    this.display = function(){
        var body = $("body");

        var context = {
            label: widget_card.card.label,
        };
        var fullscreen_elem = Lyloochat.templates.screen_display_card_text(context);
        body.append(fullscreen_elem);

        var card_expanded_elem = body.children().last();

        var box_text_elem = card_expanded_elem.find('.container');
        box_text_elem.boxfit();

        $( window ).resize(function() {
            card_expanded_elem.attr('style', '');
            box_text_elem.attr('style', '');
            box_text_elem.boxfit();
        });

        var innerButton = card_expanded_elem.find('.card-fs-butt-ok');
        innerButton.on('click', function(e){
            $(card_expanded_elem).remove();
        });
    };
    // ========================================== PRIVILEGED ================================

}
