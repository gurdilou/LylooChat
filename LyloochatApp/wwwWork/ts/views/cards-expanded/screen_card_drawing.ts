import {ScreenCard} from "./screen_card";
import {WidgetCardDrawing} from "../cards/widget_card_drawing";
import {Dialogs} from "../../commons/common";
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
		Dialogs.showErrorPanel("display card sound");
	}
}
