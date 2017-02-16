import {Card} from "./card";

export class CardList {
	// ========================================== VARIABLES =================================
	private cards: Card[] = [];
	// ========================================== CONSTRUCTOR ===============================
	// ========================================== PRIVATE ===================================
	// ========================================== PRIVILEGED ================================
	// addCard : Ajoute une carte dans la grille
	public addCard(newCard: Card) {
		this.cards.push(newCard);
	}
	// length : Retourne le nombre de cartes
	public length(): number {
		return this.cards.length;
	}
	// getCard : Retourne la carte à l'index donné
	public getCard(index: number): Card {
		return this.cards[index];
	}
	// replaceCard : Remplace la carte à l'index donné
	public replaceCard(index: number, card: Card) {
		this.cards[index] = card;
	}

}
