import {ScreenCard} from "./screen_card";
import {WidgetCardText} from "../cards/widget_card_text";
import {CardText} from "../../model/card_text";
import {CardTextDisplayer} from "./card_text_displayer";
//Une carte en plein écran avec du texte
export class ScreenCardText extends ScreenCard {
	// ========================================== VARIABLES =================================
	// ========================================== CONSTRUCTOR ===============================
	constructor(widget_card: WidgetCardText) {
		super(widget_card);
	}

	// ========================================== PRIVATE ===================================
	// ========================================== OVERRIDE===================================
	/**
	 * Lors d'un clic simple sur la carte
	 */
	public display() {
		let cardText = <CardText>this.widget_card.card;
		CardTextDisplayer.displayText(cardText.label);
	}
	// ========================================== PRIVILEGED ================================

}
