import {ScreenCard} from "./screen_card";
import {WidgetCardText} from "../cards/widget_card_text";
import {CardText} from "../../model/card_text";
//Une carte en plein écran avec du texte
export class ScreenCardText extends ScreenCard {
	// ========================================== VARIABLES =================================
	// ========================================== CONSTRUCTOR ===============================
	constructor(widget_card: WidgetCardText) {
		super(widget_card);
	}

	// ========================================== PRIVATE ===================================
	// ========================================== OVERRIDE===================================
	//Lors d'un clic simple sur la carte
	public display() {
		let body = $("body");

		let cardText = <CardText>this.widget_card.card;
		let context = {
			label: cardText.label,
		};
		let fullscreen_elem = Lyloochat.templates.screen_display_card_text(context);
		body.append(fullscreen_elem);

		let card_expanded_elem = body.children().last();

		let box_text_elem = card_expanded_elem.find('.container');
		box_text_elem.boxfit();

		$(window).resize(function() {
			card_expanded_elem.attr('style', '');
			box_text_elem.attr('style', '');
			box_text_elem.boxfit();
		});

		let innerButton = card_expanded_elem.find('.card-fs-butt-ok');
		innerButton.on('click', function(e) {
			$(card_expanded_elem).remove();
		});
	}
	// ========================================== PRIVILEGED ================================

}
