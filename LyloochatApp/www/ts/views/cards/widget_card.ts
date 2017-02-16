import {AppGrid} from "../appGrid";
import {Card} from "../../model/card";


//Classe mère des cartes widgets
//Classe virtuelle
export abstract class WidgetCard {
    // ========================================== VARIABLES =================================
	protected fullscreen_card: HTMLElement = null;
	private elem_card: HTMLElement = null;
    // ========================================== CONSTRUCTOR ===============================
	constructor(
		protected appGrid: AppGrid,
		public card: Card) {
	}
	// ========================================== PRIVATE ===================================



    // ========================================== ABSTRACT ===================================
    // Retourne le contenu texte de la miniature
	public abstract getCardThumbailContent(): string;
	//Lors d'un clic simple sur la carte
	public abstract onCardThumbnailClick(): void;

	// ========================================== PRIVILEGED ================================
	// Rend la carte dans un élément HTML
	public render(container: HTMLElement) {
		$(container).append(this.getCardThumbailContent());

		let lastChild = <HTMLElement>container.lastElementChild;
		this.elem_card = lastChild;

		return "";
	}
}
