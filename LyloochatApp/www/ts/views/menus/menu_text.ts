import {MenuBase} from "./menu_base";
import {AppMenu} from "../appMenu";
import {CardTextDisplayer} from "../cards-expanded/card_text_displayer";

//Une carte avec du dessin
export class MenuText extends MenuBase {
	constructor(appMenu: AppMenu) {
		super(appMenu);
	}

	public onShow(container: JQuery) {
		let appMenuHtml = Lyloochat.templates.menu_text();
		container.append(appMenuHtml);
		let self = this;
		let textInput = container.find(".app-menu-expanded .text-input");
		textInput.on("keypress", function(e) {
			let code = (e.keyCode ? e.keyCode : e.which);
			if (code === 13) { //Enter keycode
				e.preventDefault();
				self.displayText(textInput.val());
				textInput.blur();
			}
		});
	}

	public displayText(text: string): void {
		CardTextDisplayer.displayText(text);
	}
	public onHide() {

	}
}
