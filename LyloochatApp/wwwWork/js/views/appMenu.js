function AppMenu(app) {
  // ========================================== VARIABLES =================================

  // ========================================== CONSTRUCTOR ===============================
  this.app = app;

  this.menu_text = undefined;
  this.menu_sound = undefined;
  this.menu_drawing = undefined;
  this.menu_options = undefined;

  _fill();
  _addEvents();
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

  //_addEvents : Ajoute l'écouteur pour faire popper les différents menus
  function _addEvents() {
    $(".app-menu-type-keyboard").on('tap', function(event){

    });
  }

  // ========================================== PRIVILEGED ================================
}
