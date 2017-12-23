export class CardTextDisplayer {
	public static displayText(text: string) {
		let body = $("body");
		let context = {
			label: text,
		};
		let fullscreen_elem = Lyloochat.templates.screen_display_card_text(context);
		body.append(fullscreen_elem);

		let card_expanded_elem = body.children().last();

		let box_text_elem = card_expanded_elem.find('.container');
		box_text_elem.boxfit({multiline: text.split(" ").length > 3});

		$(window).resize(function() {
			card_expanded_elem.attr('style', '');
			box_text_elem.attr('style', '');
			box_text_elem.boxfit({multiline: text.split(" ").length > 3});
		});

		let innerButton = card_expanded_elem.find('.card-fs-butt-ok');
		innerButton.on('click', function(e) {
			$(card_expanded_elem).remove();
		});
	}
}
