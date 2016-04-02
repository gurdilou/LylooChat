function AppMenu(app) {
  // ========================================== VARIABLES =================================

  // ========================================== CONSTRUCTOR ===============================
  this.app = app;

  this.menu_text = undefined;
  this.menu_sound = undefined;
  this.menu_drawing = undefined;
  this.menu_options = undefined;

  this.selected_menu = undefined;
  this.$selected_menu_elem = undefined;

  this.old_scroll_position = 0;

  _fill.call(this);
  _addEvents.call(this);
  // ========================================== PRIVATE ===================================
  // fill : Remplit le menu
  function _fill() {
    //Création des menus
    var menuSource = document.getElementById("appmenu");
    var menuContext = {
      name: "Lyloochat",
      icon: "check",
      links: [{
        longCode: "Afficher un texte",
        code: "Texte",
        icon: "keyboard"
      }, {
        longCode: "Jouer un son",
        code: "Son",
        icon: "sound"
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
    var self = this;
    var $app_menu_text = $(".app-menu-type-keyboard");
    $app_menu_text.on('tap', function(event){
      _createMenu_Text.call(self, $app_menu_text);
    });
    var $app_menu_sound = $(".app-menu-type-sound");
    $app_menu_sound.on('tap', function(event){
      _createMenu_Sound.call(self, $app_menu_sound);
    });
    var $app_menu_drawing = $("app-menu-type-pen");
    $app_menu_drawing.on('tap', function(event){
      _createMenu_Drawing.call(self, $app_menu_drawing);
    });
    var $app_menu_options = $(".app-menu-type-settings");
    $app_menu_options.on('tap', function(event){
      _createMenu_Options.call(self, $app_menu_options);
    });
  }

  //_createMenu_Sound : Créer le menu pour jouer un son
  function _createMenu_Sound($app_menu_sound) {
    if(this.menu_sound === undefined){
      this.menu_sound = new AppMenu_Sound(this);
    }
    _selectMenu.call(this, this.menu_sound, $app_menu_sound);
  }
  //_createMenu_Text : Créer le menu pour afficher un texte
  function _createMenu_Text($app_menu_text) {
    if(this.menu_text === undefined){
      // this.menu_text = new AppMenu_Text(this);
      //TODO
    }
    _selectMenu.call(this, this.menu_text, $app_menu_text);
  }
  //_createMenu_Drawing : Créer le menu pour afficher un dessin
  function _createMenu_Drawing($app_menu_drawing) {
    if(this.menu_drawing === undefined){
      // this.menu_drawing = new AppMenu_Drawing(this);
      //TODO
    }
    _selectMenu.call(this, this.menu_drawing, $app_menu_drawing);
  }
  //_createMenu_Options : Créer le menu pour afficher les options
  function _createMenu_Options($app_menu_options) {
    if(this.menu_options === undefined){
      // this.menu_options = new AppMenu_Options(this);
      //TODO
    }
    _selectMenu.call(this, this.menu_options, $app_menu_options);
  }

  //_selectMenu : Affiche ou masque un menu
  function _selectMenu(menu, $app_menu_elem) {
    if(menu === this.selected_menu) {
      menu.hide();
      $app_menu_elem.removeClass("selected");
      this.selected_menu = undefined;
      this.$selected_menu_elem = undefined;
      _freeGrid.call(this);
    }else{
      if(this.selected_menu !== undefined) {
        this.selected_menu.hide();
        this.$selected_menu_elem.removeClass("selected");
        this.$selected_menu_elem = undefined;
        _freeGrid.call(this);
      }

      this.selected_menu = menu;
      menu.show();
      this.$selected_menu_elem = $app_menu_elem;
      $app_menu_elem.addClass("selected");
      _freezeGrid.call(this);
    }
  }

  //_freeGrid : Re libère la grille
  function _freeGrid() {
    var $grid = $(".app-content");
    $grid.removeClass("freeze-scroll");
    $grid.scrollTop(this.old_scroll_position);
  }

  //_freezeGrid : Bloque le scroll de la grille
  function _freezeGrid() {
    var $grid = $(".app-content");

    this.old_scroll_position = $grid.scrollTop();
    $grid.addClass("freeze-scroll");
    $grid.scrollTop(0);
  }

  // ========================================== PRIVILEGED ================================
}
