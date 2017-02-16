import {WidgetCard} from "./widget_card";
import {AppGrid} from "../appGrid";
import {CardDrawing} from "../../model/card_drawing";
import {Dialogs} from "../../commons/common";
//Une carte avec du dessin
export class WidgetCardDrawing extends WidgetCard {
    // ========================================== let IABLES =================================
	constructor(appGrid: AppGrid, card: CardDrawing) {
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
		Dialogs.showErrorPanel("Click Widget_Card_Drawing");
	}
    // ========================================== PRIVILEGED ================================
}
