import {AppMenu} from "../appMenu";
const delay_anim = 250;
/**
 * Classe de base d'un menu de l'application
 */
export abstract class MenuBase {

	// ========================================== VARIABLES =================================
	protected displayed = false;


	// ========================================== CONSTRUCTOR ===============================
	constructor(public appMenu: AppMenu) {

	}
	// ========================================== PRIVATE ===================================
	// Affiche le menu
	public show(): void {
		let content = $(".app-content").first();
		this.onShow(content);

		let menu = $(".app-menu-expanded");
		menu.attr("style", "height: " + document.body.offsetHeight + "px");
		window.setTimeout(() => {
			menu.attr("style", "height: 100%");
		}, delay_anim);
		this.displayed = true;
	}
	// Affiche le menu
	public hide(): void {
		let menu = $(".app-menu-expanded");
		menu.attr("style", "height:0px");
		this.onHide();
		this.appMenu.app.deviceHandler.refreshFullscreen();

		let self = this;
		window.setTimeout(() => {
			menu.remove();
			self.displayed = false;
		}, delay_anim);
	}
	// ========================================== ABSTRACT ===================================
	public abstract onShow(container: JQuery): void;
	public abstract onHide(): void;
	// ========================================== OVERRIDE===================================
	// ========================================== PRIVILEGED ================================
}
