export class HandlebarHelpers {
	public static initHelpers() {
		Handlebars.registerHelper('if_eq', function(a, b, opts) {
			if (a === b) {
				return opts.fn(this);
			} else {
				return opts.inverse(this);
			}
		});
	}

	public static initPartials() {
		Handlebars.registerPartial('widget_badge_button', Lyloochat.templates.widget_badge_button);
		Handlebars.registerPartial('widget_text_button', Lyloochat.templates.widget_text_button);
		Handlebars.registerPartial('widget_floating_button', Lyloochat.templates.widget_floating_button);
	}
}
