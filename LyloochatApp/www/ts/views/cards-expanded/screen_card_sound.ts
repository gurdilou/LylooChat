import {ScreenCard} from "./screen_card";
import {WidgetCardSound} from "../cards/widget_card_sound";
import {CardSound} from "../../model/card_sound";
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
		let cardSound = <CardSound>this.widget_card.card;
		ScreenCardSound.displaySound(cardSound.code, cardSound.filepath);
	}

	/**
	 * Display a text and play a sound on screen
	 * @param  {string} label     label displayed
	 * @param  {string} soundPath sound file path, display error if it does not exist.
	 */
	public static displaySound(label: string, soundPath: string) {
		let body = $("body");
		let context = {
			label: label,
		};
		let fullscreen_elem = Lyloochat.templates.screen_display_card_sound(context);
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
}
