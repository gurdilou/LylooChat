import {Card} from "./card";

export class CardDrawing extends Card {
    // ========================================== VARIABLES =================================

    constructor(id: string, code: string, public drawing: Blob) {
        super(id, code);
    }

    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== PRIVILEGED ================================
}
