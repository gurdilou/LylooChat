import {WidgetCard} from "./widget_card";
import {AppGrid} from "../appGrid";
import {CardSound} from "../../model/card_sound";
import {ScreenCardSound} from "../cards-expanded/screen_card_sound";
//Une carte avec du son
export class WidgetCardSound extends WidgetCard {

	// ========================================== let IABLES =================================
	constructor(appGrid: AppGrid, card: CardSound) {
		super(appGrid, card);
	}
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== OVERRIDE===================================
    // Retourne le contenu texte de la miniature
	public getCardThumbailContent() {
		let context = {
			cardNumber: this.card.id,
			title: this.card.code
		};
		return Lyloochat.templates.widget_card_text(context);
	}
	//Lors d'un clic simple sur la carte
	public onCardThumbnailClick() {
		let displayed_screen_card = new ScreenCardSound(this, this.appGrid.app);
		displayed_screen_card.display();
	}
    // ========================================== PRIVILEGED ================================
}
