import {LyloochatApp} from "../app";
import {MenuSound} from "./menus/menu_sound";
export class AppMenu {
	// ========================================== VARIABLES =================================

	private menu_text = null;
	private menu_sound = null;
	private menu_drawing = null;
	private menu_options = null;
	private selected_menu = null;
	private selected_menu_elem = null;
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
				}, {
					longCode: "Changer les options",
					code: "Options",
					icon: "settings"
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
		let app_menu_drawing = $("app-menu-type-pen");
		app_menu_drawing.on('tap', function(event) {
			self.createMenu_Drawing(app_menu_drawing);
		});
		let app_menu_options = $(".app-menu-type-settings");
		app_menu_options.on('tap', function(event) {
			self.createMenu_Options(app_menu_options);
		});
	}

	//_createMenu_Sound : Créer le menu pour jouer un son
	private createMenu_Sound(app_menu_sound) {
		if (this.menu_sound === undefined) {
			this.menu_sound = new MenuSound(this);
		}
		this.selectMenu(this.menu_sound, app_menu_sound);
	}
	//_createMenu_Text : Créer le menu pour afficher un texte
	private createMenu_Text(app_menu_text) {
		if (this.menu_text === undefined) {
			// this.menu_text = new AppMenu_Text(this);
			//TODO
		}
		this.selectMenu(this.menu_text, app_menu_text);
	}
	//_createMenu_Drawing : Créer le menu pour afficher un dessin
	private createMenu_Drawing(app_menu_drawing) {
		if (this.menu_drawing === undefined) {
			// this.menu_drawing = new AppMenu_Drawing(this);
			//TODO
		}
		this.selectMenu(this.menu_drawing, app_menu_drawing);
	}
	//_createMenu_Options : Créer le menu pour afficher les options
	private createMenu_Options(app_menu_options) {
		if (this.menu_options === undefined) {
			// this.menu_options = new AppMenu_Options(this);
			//TODO
		}
		this.selectMenu(this.menu_options, app_menu_options);
	}

	//_selectMenu : Affiche ou masque un menu
	private selectMenu(menu, app_menu_elem) {
		if (menu === this.selected_menu) {
			menu.hide();
			app_menu_elem.removeClass("selected");
			this.selected_menu = null;
			this.selected_menu_elem = null;
			this.freeGrid();
		} else {
			if (this.selected_menu) {
				this.selected_menu.hide();
				this.selected_menu_elem = null;
				this.selected_menu_elem.removeClass("selected");
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
