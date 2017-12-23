import {MenuBase} from "./menu_base";
import {AppMenu} from "../appMenu";
import {CardTextDisplayer} from "../cards-expanded/card_text_displayer";

//Une carte avec du dessin
export class MenuText extends MenuBase {
	private textInput : JQuery;

	constructor(appMenu: AppMenu) {
		super(appMenu);
	}

	public onShowStart(container: JQuery) {
		let appMenuHtml = Lyloochat.templates.menu_text();
		container.append(appMenuHtml);
		this.textInput = container.find(".app-menu-expanded .text-input");
        this.textInput.on("keypress", (e) => {
			let code = (e.keyCode ? e.keyCode : e.which);
			if (code === 13) { //Enter keycode
				e.preventDefault();
				MenuText.displayText(this.textInput.val());
                this.textInput.blur();
			}
		});
	}


    public onShowEnd(): void {
        this.textInput.focus();
	}

    public static displayText(text: string): void {
		CardTextDisplayer.displayText(text);
	}
	public onHide() {

	}
}
