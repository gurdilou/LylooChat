import {WidgetCard} from "../cards/widget_card";
//Classe mère des cartes widgets
//Classe virtuelle
export abstract class ScreenCard {
    // ========================================== VARIABLES =================================
	constructor(protected widget_card: WidgetCard) {
	}
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== ABSTRACT ==================================
    //Lors d'un clic simple sur la carte
	public abstract display();
    // ========================================== PRIVILEGED ================================

}
