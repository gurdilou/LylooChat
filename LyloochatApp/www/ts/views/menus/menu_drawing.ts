import {MenuBase} from "./menu_base";
import {AppMenu} from "../appMenu";
import {Whiteboard} from "../widgets/whiteboard";

//Une carte avec du dessin
export class MenuDrawing extends MenuBase {

	constructor(appMenu: AppMenu) {
		super(appMenu);
	}

	public onShow(container: JQuery) {
		let appMenuHtml = Lyloochat.templates.menu_drawing();
		container.append(appMenuHtml);
		let board = new Whiteboard("menu-draw-canvas");
		window.setTimeout(() => {
			board.initialize();
		}, 250);
	}

	public onHide() {

	}
}
