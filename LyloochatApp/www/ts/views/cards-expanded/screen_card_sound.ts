import {ScreenCard} from "./screen_card";
import {WidgetCardSound} from "../cards/widget_card_sound";
import {Dialogs} from "../../commons/common";
//Une carte en plein écran avec du texte
export class ScreenCardSound extends ScreenCard {
    // ========================================== VARIABLES =================================
    // ========================================== CONSTRUCTOR ===============================
	constructor(widget_card: WidgetCardSound) {
		super(widget_card);
	}

    // ========================================== PRIVATE ===================================

    // ========================================== OVERRIDE===================================
    // ========================================== PRIVILEGED ================================
	public display() {
		Dialogs.showErrorPanel("display card sound");
	}
}
