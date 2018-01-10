import {ScreenCard} from "./screen_card";
import {WidgetCardDrawing} from "../cards/widget_card_drawing";
import {Whiteboard} from "../widgets/whiteboard";

//Une carte en plein écran avec du texte
export class ScreenCardDrawing extends ScreenCard {
    // ========================================== VARIABLES =================================
    // ========================================== CONSTRUCTOR ===============================
    constructor(widget_card: WidgetCardDrawing) {
        super(widget_card);
    }

    // ========================================== PRIVATE ===================================

    // ========================================== OVERRIDE===================================
    // ========================================== PRIVILEGED ================================
    public display() {
        let body = $("body");
        let fullscreen_elem = Lyloochat.templates.screen_display_card_drawing();
        body.append(fullscreen_elem);

        let card_expanded_elem = body.children().last();

        let board = new Whiteboard("#fullscreen-drawing", false);
        board.show();

        let innerButton = card_expanded_elem.find('.card-fs-butt-ok');
        innerButton.on('click', function () {
            board.hide();
            $(card_expanded_elem).remove();
        });
    }
}
