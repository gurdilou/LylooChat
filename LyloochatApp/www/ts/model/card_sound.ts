import {Card}	from "./card";
import {Sound} from "./sound";

export class CardSound extends Card {
	// ========================================== VARIABLES =================================
	constructor(id: string, code: string, public sound: Sound) {
		super(id, code);
	}
	// ========================================== CONSTRUCTOR ===============================
	// ========================================== PRIVATE ===================================
	// ========================================== PRIVILEGED ================================

}
