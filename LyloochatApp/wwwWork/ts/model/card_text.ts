import {Card}	from "./card";

export class Card_Text extends Card {
	// ========================================== VARIABLES =================================
	constructor(id: string, code: string, private label: string) {
		super(id, code);
	}
	// ========================================== PRIVATE ===================================
	// ========================================== PRIVILEGED ================================
}
