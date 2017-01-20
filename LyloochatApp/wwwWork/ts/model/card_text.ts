import {Card}	from "./card";

export class CardText extends Card {
	// ========================================== VARIABLES =================================
	constructor(id: string, code: string, private label: string) {
		super(id, code);
	}
	// ========================================== PRIVATE ===================================
	// ========================================== PRIVILEGED ================================
}
