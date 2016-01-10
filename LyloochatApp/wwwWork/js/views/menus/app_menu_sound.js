//Une carte avec du dessin
function AppMenu_Sound(appMenu){
  // ========================================== VARIABLES =================================
  AppMenu_Impl.apply(this, [appMenu]);
  this.termSearched = "";
  this.soundLibrary = appMenu.app.initSoundLibrary();
  this.playingWidgetSound = undefined; //le widget en cours de lecture

  


  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================
  //_addSound : Ajoute un son dans le menu
  function _addSound($ctn, sound){
    var widget_sound = new Widget_Sound(this, $ctn, sound);
    widget_sound.insert();
  }

  //_search_sounds : Recherche des sons contenant le terme donné
  function _search_sounds(searchWord) {
    this.soundLibrary.searchSounds(this.appMenu.app.options.prefix, searchWord);
    //TODO 
  }
  // ========================================== OVERRIDE===================================
  // ========================================== PRIVILEGED ================================
  // ========================================== OVERRIDE ==================================
  // Affiche le menu
  this.show = function(){
    var context = {
    };
    var appMenuHtml = Lyloochat.templates.menu_sound(context);
    var $content = $(".app-content");
    $content.append(appMenuHtml);

    //Ajout des lectures récentes
    var $recents = $content.find(".recents-list");
    for(i = 0; i < this.soundLibrary.recentsPlayed.size(); i++){
      var recentSound = this.soundLibrary.recentsPlayed.get(i);
      _addSound.call(this, $recents, recentSound);
    }

    //Ajout de l'écoute de la recherche
    var self = this;
    var $searchInput = $content.find(".app-menu-expanded .search-input").on("search", function(e){
      _search_sounds.call(self, $searchInput.text());
    });
  };

  // Affiche le menu
  this.hide = function(){
    var $menu = $(".app-content .app-menu-expanded");
    $menu.remove();
  };

  this.onPlay = function(widget_sound){
    if((this.playingWidgetSound !== undefined) && (this.playingWidgetSound.playing) ){
      this.playingWidgetSound.stop();
    }
    this.playingWidgetSound = widget_sound;
  }


}
