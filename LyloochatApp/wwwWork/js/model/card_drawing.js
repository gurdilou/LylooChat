function Card_Song(id, code, svg){
  // ========================================== VARIABLES =================================
  this.svg = svg;
  // ========================================== CONSTRUCTOR ===============================
  Card.apply(this, [id, code]);
  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
}