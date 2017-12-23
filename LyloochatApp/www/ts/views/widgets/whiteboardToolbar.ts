import {Brush, BrushSize, Whiteboard} from "./whiteboard";
import {Dialogs} from "../../commons/common";


export class WhiteboardToolbar {
    private toolbar: JQuery;
    private oldBrush: string;

    constructor(private linkedWhiteboard: Whiteboard, container: JQuery) {
        this.toolbar = container.find(".whiteboard-toolbar").first();
    }

    public show() {
        this.refreshBrushIcon();
        this.refreshColorIcon();
        this.refreshSizeLabel();

        this.toolbar.addClass("visible");

        this.toolbar.find(".menu-brush").on("click", () => this.displayBrushes());
        this.toolbar.find(".menu-color").on("click", () => this.displayPalette());
        this.toolbar.find(".menu-size").on("click", () => this.displaySizes());
    }

    public hide() {
        this.toolbar.removeClass("visible");
        this.toolbar.find(".menu-brush").off("click");
        this.toolbar.find(".menu-color").off("click");
        this.toolbar.find(".menu-size").off("click");
    }

    private displayBrushes() {
        Dialogs.showPopupPanel();
        let maskPanel = $(".popup");
        let menuContext = {
            loc: {
                title: 'Choix du pinceau',
            },
            brushes: [
                {name: "pencil", label: "Crayon", active: this.linkedWhiteboard.getBrushName() === "pencil"},
                {name: "chalk", label: "Craie", active: this.linkedWhiteboard.getBrushName() === "chalk"},
                {name: "paintbrush", label: "Pinceau", active: this.linkedWhiteboard.getBrushName() === "paintbrush"},
                {name: "eraser", label: "Gomme", active: this.linkedWhiteboard.getBrushName() === "eraser"}
            ]
        };
        maskPanel.html(Lyloochat.templates.whiteboard_menu_brush(menuContext));
        $('.whiteboard-menu-brush .collection-item').on('click', e => {
            let pick = e.target.getAttribute('value');
            this.linkedWhiteboard.changeBrush(pick);
            this.refreshBrushIcon();
        });
        maskPanel.on('click', () => {
            Dialogs.hidePopupPanel();
        });
    }

    private refreshBrushIcon() {
        let icon = this.toolbar.find(".menu-brush .icon");
        if (this.oldBrush) {
            icon.removeClass("icon-" + this.oldBrush)
        }
        let iconName;
        switch(this.linkedWhiteboard.getBrush()) {
            case Brush.Eraser: iconName = "eraser"; break;
            case Brush.Chalk: iconName = "edit"; break;
            case Brush.Paintbrush: iconName = "brush"; break;
            default: iconName = "pen";

        }
        icon.addClass("icon-" + iconName);
        this.oldBrush = iconName;
    }

    private displayPalette() {
        Dialogs.showPopupPanel();
        let maskPanel = $(".popup");
        let menuContext = {
            loc: {
                title: 'Choix de la couleur'
            },
            colors: [
                "#4E4E4E",
                "#4D8ABC",
                "#68C399",
                "#6CE23F",
                "#FFF85E",
                "#FFA673",
                "#FF92D9",
                "#BA68CB",
                "#F8F7FF",
            ]
        };
        maskPanel.html(Lyloochat.templates.whiteboard_menu_color(menuContext));
        $('.whiteboard-menu-color .color-pick-cell').on('click', e => {
            let pick = e.target.getAttribute('value');
            this.linkedWhiteboard.changeColor(pick);
            this.refreshColorIcon();
        });
        maskPanel.on('click', () => {
            Dialogs.hidePopupPanel();
        });
    }

    private refreshColorIcon() {
        let icon = this.toolbar.find(".menu-color .icon");
        icon.css('color', this.linkedWhiteboard.getColor());
    }

    private displaySizes() {
        Dialogs.showPopupPanel();
        let maskPanel = $(".popup");
        let menuContext = {
            loc: {
                title: 'Choix de la taille du pinceau'
            },
            sizes:[] as any[]
        };
        let sizes = [BrushSize.Small, BrushSize.Medium, BrushSize.Large, BrushSize.XLarge];
        for(let i = 0; i < sizes.length; i++) {
            menuContext.sizes.push({
                label: sizes[i].label,
                size: sizes[i].size,
                index: i,
                active: (this.linkedWhiteboard.getBrushSize() === sizes[i])
            });
        }

        maskPanel.html(Lyloochat.templates.whiteboard_menu_size(menuContext));
        $('.whiteboard-menu-size .collection-item').on('click', e => {
            let index = e.target.getAttribute('index');
            this.linkedWhiteboard.setBrushSize(sizes[index]);
            this.refreshSizeLabel();
        });
        maskPanel.on('click', () => {
            Dialogs.hidePopupPanel();
        });
    }

    private refreshSizeLabel() {
        let label = this.toolbar.find(".menu-size .size-label");
        label.text(this.linkedWhiteboard.getBrushSize().label);
    }
}
