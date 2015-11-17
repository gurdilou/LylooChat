function AppMenu(app) {
  // ========================================== VARIABLES =================================

  // ========================================== CONSTRUCTOR ===============================
  this.app = app;
  _fill();
  // ========================================== PRIVATE ===================================
  // fill : Remplit le menu
  function _fill() {
    //Création des menus
    var menuSource = document.getElementById("appmenu");
    var menuContext = {
      name: "Lyloochat",
      icon: "play",
      links: [{
        longCode: "Afficher un texte",
        code: "Texte",
        icon: "keyboard"
      }, {
        longCode: "Jouer un son",
        code: "Son",
        icon: "play"
      }, {
        longCode: "Dessiner quelquechose",
        code: "Dessin",
        icon: "pen"
      }, {
        longCode: "Changer les options",
        code: "Options",
        icon: "settings"
      }, ]
    };
    menuSource.innerHTML = Lyloochat.templates.widget_menus(menuContext);
  }
  // ========================================== PRIVILEGED ================================
}
