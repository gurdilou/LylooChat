//Une carte avec du dessin
function AppMenu_Sound(appMenu){
  // ========================================== VARIABLES =================================
  AppMenu_Impl.apply(this, [appMenu]);
  this.soundLibrary = undefined;


  var self = this;
  this.termSearched = "";
  appMenu.app.getSoundLibrary(function(soundLibrary){
    self.soundLibrary = soundLibrary;
    if(self.displayed){
      _displaySounds.call(self);
    }
  });
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
    var $content = $(".app-content");
    if(searchWord !== ""){
      var results = this.soundLibrary.searchSounds(this.appMenu.app.model.options.prefix, searchWord);
      

      var $elem_results = $content.find(".results-list");
      $elem_results.empty();
      for(i = 0; i < results.size(); i++){
        var resultSound = results.get(i);
        _addSound.call(this, $elem_results, resultSound);
      }

      //on switch l'affichage
      //Affichage des résultats
      $elem_results.removeClass("hidden");
      var $elem_rule = $content.find(".results-rule");
      $elem_rule.removeClass("hidden");
      var $elem_title = $content.find(".results-title");
      $elem_title.removeClass("hidden");

      //masquage des récents
      var $elem_list= $content.find(".recents-list");
      $elem_list.addClass("hidden");
      $elem_rule = $content.find(".recents-rule");
      $elem_rule.addClass("hidden");
      $elem_title = $content.find(".recents-title");
      $elem_title.addClass("hidden");
    }else{
      //on switch l'affichage
      //Affichage des récents
      var $elem_list_off = $content.find(".recents-list");
      $elem_list_off.removeClass("hidden");
      var $elem_rule_off = $content.find(".recents-rule");
      $elem_rule_off.removeClass("hidden");
      var $elem_title_off = $content.find(".recents-title");
      $elem_title_off.removeClass("hidden");

      //masquage des résultats
      $elem_list_off= $content.find(".results-list");
      $elem_list_off.addClass("hidden");
      $elem_rule_off = $content.find(".results-rule");
      $elem_rule_off.addClass("hidden");
      $elem_title_off = $content.find(".results-title");
      $elem_title_off.addClass("hidden");
    }
  }

  // _displaySounds : Ajoute les sons dans le widget
  function _displaySounds(){
    var $content = $(".app-content");

    //Ajout des lectures récentes
    var $recents = $content.find(".recents-list");
    for(i = 0; i < this.soundLibrary.recents_played.size(); i++){
      var recentSound = this.soundLibrary.recents_played.get(i);
      _addSound.call(this, $recents, recentSound);
    }

    //Ajout de l'écoute de la recherche
    var self = this;
    var $searchInput = $content.find(".app-menu-expanded .search-input");
    $searchInput.on("keypress", function(e){
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 13) { //Enter keycode                        
          e.preventDefault();
          console.log("Son cherché : "+$searchInput.val());
          _search_sounds.call(self, $searchInput.val());
          $searchInput.blur();
      }
    });
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

    this.displayed = true;

    if(this.soundLibrary !== undefined){
      _displaySounds.call(this);
    }
  };

  // Affiche le menu
  this.hide = function(){
    var $menu = $(".app-content .app-menu-expanded");
    $menu.remove();
    this.displayed = false;
  };

  //Lorsqu'on joue une musique
  this.onPlay = function(widget_sound){
    if((this.playingWidgetSound !== undefined) && (this.playingWidgetSound.playing) ){
      this.playingWidgetSound.stop();
    }
    this.playingWidgetSound = widget_sound;
  };


}
