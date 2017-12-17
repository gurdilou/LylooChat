import {LyloochatApp} from "../app";
import {MenuSound} from "./menus/menu_sound";
import {MenuText} from "./menus/menu_text";
import {MenuDrawing} from "./menus/menu_drawing";
import {MenuOptions} from "./menus/menu_options";
import {MenuBase} from "./menus/menu_base";


export class AppMenu {
	// ========================================== VARIABLES =================================

	private menu_text: MenuText = null;
	private menu_sound: MenuSound = null;
	private menu_drawing: MenuDrawing = null;
	private menu_options: MenuOptions = null;
	private selected_menu: MenuBase = null;
	private selected_menu_elem: JQuery = null;
	private old_scroll_position = 0;

	constructor(public app: LyloochatApp) {
		this.fill();
		this.addEvents();
	}

	// ========================================== PRIVATE ===================================
	// fill : Remplit le menu
	private fill() {
		//Création des menus
		let menuSource = document.getElementById("appmenu");
		let menuContext = {
			name: "Lyloochat",
			icon: "check",
			links: [{
				longCode: "Afficher un texte",
				code: "Texte",
				icon: "keyboard"
			}, {
					longCode: "Jouer un son",
					code: "Son",
					icon: "sound"
				}, {
					longCode: "Dessiner quelquechose",
					code: "Dessin",
					icon: "pen"
				}]
		};
		menuSource.innerHTML = Lyloochat.templates.widget_menus(menuContext);
	}

	//_addEvents : Ajoute l'écouteur pour faire popper les différents menus
	private addEvents() {
		let self = this;
		let app_menu_text = $(".app-menu-type-keyboard");
		app_menu_text.on('tap', function(event) {
			self.createMenu_Text(app_menu_text);
		});
		let app_menu_sound = $(".app-menu-type-sound");
		app_menu_sound.on('tap', function(event) {
			self.createMenu_Sound(app_menu_sound);
		});
		let app_menu_drawing = $(".app-menu-type-pen");
		app_menu_drawing.on('tap', function(event) {
			self.createMenu_Drawing(app_menu_drawing);
		});
		let app_menu_options = $(".app-menu-type-settings");
		app_menu_options.on('tap', function(event) {
			self.createMenu_Options(app_menu_options);
		});
	}

	//_createMenu_Sound : Créer le menu pour jouer un son
	private createMenu_Sound(app_menu_sound: JQuery) {
		if (!this.menu_sound) {
			this.menu_sound = new MenuSound(this);
		}
		this.selectMenu(this.menu_sound, app_menu_sound);
	}
	//_createMenu_Text : Créer le menu pour afficher un texte
	private createMenu_Text(app_menu_text: JQuery) {
		if (!this.menu_text) {
			this.menu_text = new MenuText(this);
		}
		this.selectMenu(this.menu_text, app_menu_text);
	}
	//_createMenu_Drawing : Créer le menu pour afficher un dessin
	private createMenu_Drawing(app_menu_drawing: JQuery) {
		if (!this.menu_drawing) {
			this.menu_drawing = new MenuDrawing(this);
		}
		this.selectMenu(this.menu_drawing, app_menu_drawing);
	}
	//_createMenu_Options : Créer le menu pour afficher les options
	private createMenu_Options(app_menu_options: JQuery) {
		if (!this.menu_options) {
			this.menu_options = new MenuOptions(this);
		}
		this.selectMenu(this.menu_options, app_menu_options);
	}

	//_selectMenu : Affiche ou masque un menu
	private selectMenu(menu: MenuBase, app_menu_elem: JQuery) {
		if (menu === this.selected_menu) {
			menu.hide();
			app_menu_elem.removeClass("selected");
			this.selected_menu = null;
			this.selected_menu_elem = null;
			this.freeGrid();
		} else {
			if (this.selected_menu) {
				this.selected_menu.hide();
				this.selected_menu_elem.removeClass("selected");
				this.selected_menu_elem = null;
				this.freeGrid();
			}

			this.selected_menu = menu;
			menu.show();
			this.selected_menu_elem = app_menu_elem;
			app_menu_elem.addClass("selected");
			this.freezeGrid();
		}
	}

	//_freeGrid : Re libère la grille
	private freeGrid() {
		let grid = $(".app-content");
		grid.removeClass("freeze-scroll");
		grid.scrollTop(this.old_scroll_position);
	}

	//_freezeGrid : Bloque le scroll de la grille
	private freezeGrid() {
		let grid = $(".app-content");

		this.old_scroll_position = grid.scrollTop();
		grid.addClass("freeze-scroll");
		grid.scrollTop(0);
	}
}
