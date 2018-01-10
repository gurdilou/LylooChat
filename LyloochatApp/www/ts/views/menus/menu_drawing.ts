import {MenuBase} from "./menu_base";
import {AppMenu} from "../appMenu";
import {Whiteboard} from "../widgets/whiteboard";

//Une carte avec du dessin
export class MenuDrawing extends MenuBase {
    private board : Whiteboard;

    constructor(appMenu: AppMenu) {
        super(appMenu);
    }

    public onShowStart(container: JQuery) {
        let value = {
            titleBrush: "Pinceau",
            titleColor: "Couleur",
            titleSize: "Taille du pinceau"
        };
        let appMenuHtml = Lyloochat.templates.menu_drawing(value);
        container.append(appMenuHtml);

    }

    public onShowEnd() {
        this.board = new Whiteboard(false, "#menu-draw-canvas");
        this.board.show();
    }

    public onHide() {
        this.board.hide();
    }
}
