import {Card}	from "./card";

export class CardSound extends Card {
	// ========================================== VARIABLES =================================
	constructor(id: string, code: string, public filepath: string) {
		super(id, code);
	}
	// ========================================== CONSTRUCTOR ===============================
	// ========================================== PRIVATE ===================================
	// ========================================== PRIVILEGED ================================

}
