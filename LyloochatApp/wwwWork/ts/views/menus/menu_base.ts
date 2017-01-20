import {AppMenu} from "../appMenu";

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
	// ========================================== ABSTRACT ===================================
	// Affiche le menu
	public abstract show();
	// Affiche le menu
	public abstract hide();
	// ========================================== OVERRIDE===================================
	// ========================================== PRIVILEGED ================================
}
