import {Whiteboard} from "./whiteboard";
import {Dialogs} from "../../commons/common";


export class WhiteboardToolbar {
    private toolbar: JQuery;

    constructor(private linkedWhiteboard: Whiteboard, container: JQuery) {
        this.toolbar = container.find(".whiteboard-toolbar").first();
    }

    public initialize() {
        this.toolbar.addClass("visible");

        this.toolbar.find(".menu-brush").on("click", e => this.displayBrushes());
        this.toolbar.find(".menu-color").on("click", e => this.displayPalette());
    }

    private displayBrushes() {
        Dialogs.showPopupPanel();
        let maskPanel = $(".popup");
        let menuContext = {
            loc: {
                title: 'Choix du pinceau',
                pencil: 'Crayon',
                chalk: 'Craie',
                paintbrush: 'Pinceau'
            },
            active: this.linkedWhiteboard.getBrush()
        };
        maskPanel.html(Lyloochat.templates.whiteboard_menu_brush(menuContext));
        $('.whiteboard-menu-brush .collection-item').on('click', e => {
            let pick = e.target.getAttribute('value');
            this.linkedWhiteboard.changeBrush(pick);
            Dialogs.hidePopupPanel();
        });
    }

    private displayPalette() {
        // Dialogs.showPopupPanel();
        // let maskPanel = $(".popup");
        // let menuContext = {
        //     loc: {
        //         title: 'Choix de la couleur'
        //     }
        // };
        // maskPanel.html(Lyloochat.templates.whiteboard_menu_brush(menuContext));
        // $('.whiteboard-menu-brush .pick-pencil').on('click', e => {
        //     this.linkedWhiteboard.changeBrush(Brush.Pencil);
        //     Dialogs.hidePopupPanel();
        // });
    }
}
