import {AppMenu} from "../appMenu";
import {Dialogs} from "../../commons/common";

/**
 * Classe de base d'un menu de l'application
 */
export class MenuBase {
	// ========================================== VARIABLES =================================
	protected displayed = false;


	// ========================================== CONSTRUCTOR ===============================
	constructor(public appMenu: AppMenu) {

	}
	// ========================================== PRIVATE ===================================
	// ========================================== ABSTRACT ===================================
	// Affiche le menu
	public show() {
		Dialogs.showErrorPanel("Shouldn't be there you naughty boy !");
	}
	// Affiche le menu
	public hide() {
		Dialogs.showErrorPanel("Shouldn't be there you naughty boy !");
	}
	// ========================================== OVERRIDE===================================
	// ========================================== PRIVILEGED ================================
}
