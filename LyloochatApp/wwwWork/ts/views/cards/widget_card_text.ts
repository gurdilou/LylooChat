import {WidgetCard} from "./widget_card";
import {AppGrid} from "../appGrid";
import {CardText} from "../../model/card_text";
import {ScreenCardText} from "../cards-expanded/screen_card_text";
//Une carte avec du texte
export class WidgetCardText extends WidgetCard {
    // ========================================== VARIABLES =================================
	private displayed_screen_card: ScreenCardText = null;
    // ========================================== CONSTRUCTOR ===============================
	constructor(appGrid: AppGrid, card: CardText) {
		super(appGrid, card);
	}

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
		this.displayed_screen_card = new ScreenCardText(this);
		this.displayed_screen_card.display();
	}

    // ========================================== PRIVILEGED ================================

}
