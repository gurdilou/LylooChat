import {Card} from "./card";

export class CardDrawing extends Card {
	// ========================================== VARIABLES =================================
	constructor(id: string, code: string, private svg: any) {
		super(id, code);
	}
	// ========================================== CONSTRUCTOR ===============================
  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
}
