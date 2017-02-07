export class HandlebarHelpers {
	public static initHelpers(caller : any) {
		Handlebars.registerHelper('if_eq', function(a: any, b: any, opts: any) {
			if (a === b) {
				return opts.fn(caller);
			} else {
				return opts.inverse(caller);
			}
		});
	}

	public static initPartials() {
		Handlebars.registerPartial('widget_badge_button', Lyloochat.templates.widget_badge_button);
		Handlebars.registerPartial('widget_text_button', Lyloochat.templates.widget_text_button);
		Handlebars.registerPartial('widget_floating_button', Lyloochat.templates.widget_floating_button);
	}
}
