function App(deviceHandler){
  // ========================================== VARIABLES =================================
  this.loaded = false;

  this.views = {};
  this.model = {};
  this.deviceHandler = deviceHandler;
  this.soundLibrary = undefined;

  Handlebars.registerPartial('widget_badge_button', Lyloochat.templates.widget_badge_button);
  Handlebars.registerPartial('widget_text_button', Lyloochat.templates.widget_text_button);
  Handlebars.registerPartial('widget_floating_button', Lyloochat.templates.widget_floating_button);

  // ========================================== PRIVATE ===================================

  // _loadOptions charge les options de l'appli
  function _loadOptions(){
    this.model.options = {};

    //TODO load options
    this.model.options.prefix = "";
  }

  // ========================================== PRIVILEGED ================================
  //initialisation : Charge l'application
  this.initialisation = function() {
    console.log("initialisation");

    $.event.special.tap.emitTapOnTaphold = false;

    //Chargement du modèle
    var self = this;
    showLoadingPanel("Chargement des cartes...");
    this.model.listCards = new ListCards();
    deviceHandler.loadCards(this.model.listCards, function(){
      _loadOptions.call(self);

      //Création des vues
      self.views.menu = new AppMenu(self);
      self.views.grid = new AppGrid(self);
      self.loaded=true;
      hideLoadingPanel();
    });


    window.onerror = function(msg, url, line, col, error) {
      console.error(msg);
      showErrorPanel(msg);
    };
  };

  // getSoundLibrary : Retourne ou charge la librairie de son
  this.getSoundLibrary = function(cb){
    if(soundLibrary !== undefined){
      cb(soundLibrary);
    }else{
      var self = this;
      var soundLibrary = new SoundLibrary(this); 
      showLoadingPanel("Chargement des sons...");
      deviceHandler.loadSounds(soundLibrary, function() {
        hideLoadingPanel();
        self.soundLibrary = soundLibrary;
        cb(self.soundLibrary);
      });
    }
  };  
  // saveRecentsSound : Sauvegarde les sons récemment joués
  this.saveRecentsSound = function(soundList, cb) {
    deviceHandler.saveRecentsSound(soundList, cb);
  };

}

function showMaskPanel(onExit) {
  $.inner_showMaskPanel(this, true, onExit);
}
function hideMaskPanel() {
  $.inner_hideMaskPanel(this);
}
function showErrorPanel(msg) {
  $.inner_showErrorPanel(this, msg, hideErrorPanel);
}
function hideErrorPanel() {
  $.inner_hideErrorPanel(this);
}
function showLoadingPanel(msg) {
  $.inner_showLoadingPanel(this, msg, hideLoadingPanel);
}
function hideLoadingPanel() {
  $.inner_hideLoadingPanel(this);
}


(function(window, $) {

  // showMaskPanel : Affiche un masque sur l'application
  $.inner_showMaskPanel = function(caller, exitable, onExit) {
    var maskPanel = $(".mask");
    maskPanel.html("");
    maskPanel.addClass("visible");


    if(exitable){
      maskPanel.on("click", function(e) {
        onExit.call(caller);
      });
    }
  };
  $.inner_hideMaskPanel = function(caller) {
    var maskPanel = $(".mask");
    maskPanel.html("");
    maskPanel.removeClass("visible");
    maskPanel.off("click");
  };
  
  $.inner_showErrorPanel = function(caller, msg) {
    $.inner_showMaskPanel(this, true, hideErrorPanel);

    var maskPanel = $(".mask");
    var context = {
      type: "error",
      header:{
        icon: "sad",
        message: "Onoz !"
      },
      messages:[msg],
      footer:{
        buttons: [ "ok"]
      }
    };
    maskPanel.html(Lyloochat.templates.widget_dialog(context));
  };


  $.inner_hideErrorPanel = function(caller) {
    $.inner_hideMaskPanel(caller);
  };

  // 
  $.inner_showLoadingPanel = function(caller, msg) {
    $.inner_showMaskPanel(this, false, hideLoadingPanel);

    var maskPanel = $(".mask");
    var context = {
      type: "loading",
      messages:[msg]
    };
    maskPanel.html(Lyloochat.templates.widget_dialog(context));
  };


  $.inner_hideLoadingPanel = function(caller) {
    $.inner_hideMaskPanel(caller);
  };


})(window, jQuery);

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a === b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

function Card(id, code){
  // ========================================== VARIABLES =================================
  this.id = id;
  this.code = code;
  // ========================================== CONSTRUCTOR ===============================
  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
}

function Card_Drawing(id, code, svg){
  // ========================================== VARIABLES =================================
  this.svg = svg;
  // ========================================== CONSTRUCTOR ===============================
  Card.apply(this, [id, code]);
  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
}

function Card_Sound(id, code, filepath){
  // ========================================== VARIABLES =================================
  this.filepath = filepath;
  // ========================================== CONSTRUCTOR ===============================
  Card.apply(this, [id, code]);
  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================

}

function Card_Text(id, code, label){
  // ========================================== VARIABLES =================================
  this.label = label;
  // ========================================== CONSTRUCTOR ===============================
  Card.apply(this, [id, code]);
  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
}

function ListCards(){
  // ========================================== VARIABLES =================================
  this.cards = [];
  // ========================================== CONSTRUCTOR ===============================
  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
  // addCard : Ajoute une carte dans la grille
  this.addCard = function(newCard){
    this.cards.push(newCard);
  };
  // length : Retourne le nombre de cartes
  this.length = function(){
    return this.cards.length;
  };
  // getCard : Retourne la carte à l'index donné
  this.getCard = function(index){
    return this.cards[index];
  };
  // replaceCard : Remplace la carte à l'index donné
  this.replaceCard = function(index, card) {
    this.cards[index] = card;
  };

}

function Sound(name, author,  filepath, duration){
  // ========================================== VARIABLES =================================
  this.library = undefined;
  this.name = name;
  this.author = author;
  this.filepath = filepath;
  this.duration = duration;
  

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================
  function _zeroPad(num, places) {
  	var zero = places - num.toString().length + 1;
  	return Array(+(zero > 0 && zero)).join("0") + num;
  }

  // ========================================== PRIVILEGED ================================
  // getDurationStr : retourne la durée du son formaté
  this.getDurationStr = function(){
    var dateSeconds = new Date(duration*1000);
    var nbMinutes = dateSeconds.getMinutes();
    nbMinutes = _zeroPad.call(this, nbMinutes, 2);

    var nbSeconds = dateSeconds.getSeconds();
    nbSeconds = _zeroPad.call(this, nbSeconds, 2);

    return nbMinutes+":"+nbSeconds;
  };


}

function SoundLibrary(app){
  // ========================================== VARIABLES =================================
  this.recents_played = new SoundList(this);
  this.all_sounds = new SoundList(this);
  this.ready = false;
  this.app = app;

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================

  // ========================================== PRIVILEGED ================================
  // searchSounds : Cherche une liste de sons commencant avec *prefix* et contenant *termSearched*
  this.searchSounds = function(prefix, termSearched) {
    termSearched = termSearched.toLowerCase();
    prefix = prefix.toLowerCase();

    var results = new SoundList(this);
    for (var i = 0; i < this.all_sounds.size(); i++) {
      var sound = this.all_sounds.get(i);

      var valid = true;
      if( prefix !== '' ){
        //TODO dev prefix
        if( sound.name.indexOf(prefix) === 0){
          if( sound.name.toLowerCase().indexOf(termSearched) >= 0 ){
            results.add(sound);
          }
        }
      }else{
        // console.log("termSearched : "+termSearched);
        // console.log("sound.name : "+sound.name);
        if( sound.name.toLowerCase().indexOf(termSearched) >= 0 ){
          // console.log("ajouté !"+sound.name.toLowerCase().indexOf(termSearched));
          results.add(sound);
        }
      }     
    }

    return results;
  };

  // Callback chargement des sons
  this.onSoundsLoaded = function(){
    this.ready = true;
  };

  // addRecent : Ajoute un son aux récents
  this.addRecent = function(soundPlayed, cb) {
    this.recents_played.insertAtBegin(soundPlayed);
    this.recents_played.deleteDuplicates();
    this.recents_played.keepFirst(10);
    app.saveRecentsSound(this.recents_played, cb);
  };
}

function SoundList(library){
  // ========================================== VARIABLES =================================
  this.library = library;
  this.list = [];
  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================

  // ========================================== PRIVILEGED ================================
  //size : retourne le nombres de sons contenus
  this.size = function() {
    return this.list.length;
  };
  //get : retourne le son à l'index donné
  this.get = function(index) {
    return this.list[index];
  };
  //add : Ajoute un son à la liste
  this.add = function(sound) {
    this.list.push(sound);
    sound.library = this.library;
  };
  // insertAtBegin : Insère un un son en position 0
  this.insertAtBegin = function(sound) {
    this.list.unshift(sound);
    sound.library = this.library;
  };
  //deleteDuplicates :  Supprime les sons dupliqués
  this.deleteDuplicates = function() {
    for(var i = this.list.length - 1; i >= 0; i--) {
      var sound = this.list[i];

      var index = this.indexOf(sound);
      if(index < i){
        this.list.splice(i, 1); 
      }
    }
  };
  // indexOf : Retourne la première occurence d'un son
  this.indexOf = function(soundSearched) {
    var found = false;
    var result = -1;
    var i = 0;
    while( (i < this.list.length) && (!found) ){
      var sound = this.list[i];
      if( (sound.name === soundSearched.name) && (sound.duration === soundSearched.duration) ){
        found = true;
        result = i;
      } 
      i++;
    }
    return result;
  };
  // keepFirst : Garde uniquement les ''cap'' premiers
  this.keepFirst = function(cap) {
    if ( (cap >= 1) && (this.list.length > cap) ) {
      this.list = this.list.slice(0, cap);
    }
  };
}

function AppGrid(app) {
    // ========================================== VARIABLES =================================

    // ========================================== CONSTRUCTOR ===============================
    this.app = app;
    this.busy = false;
    this.isTapHolding = false;
    this.card_widgets = [];

    const TAP_HOLD_DURATION = 75;
    const CONFIG_HOLD_DURATION = 750;

    
    _fill.call(this);
    // ========================================== PRIVATE ===================================
    // fill : Remplit la grille
    function _fill() {
        //Création grille
        var gridSource = document.getElementById("grid-cards");
        for(i = 0; i < app.model.listCards.length(); i++){
            var card = app.model.listCards.getCard(i);

            var card_widget;
            if(card instanceof  Card_Text){
                card_widget = new Widget_Card_Text(this, card);
            }
            else if(card instanceof  Card_Drawing){
                card_widget = new Widget_Card_Drawing(this, card);
            }
            else if (card instanceof Card_Sound) {
                card_widget = new Widget_Card_Sound(this, card);
            }

            if(typeof card_widget !== 'undefined'){
              this.card_widgets.push(card_widget);
              card_widget.render(gridSource);
            }else{
                throw "Type de carte non supporté encore.";
            }

        }

        _addEvents_RippleEffects.call(this);
        _addEvents_CardConfigurations.call(this);
    }
    //_addEvents_RippleEffects : Colle un écouteur pour faire un petit effet su chaque carte
    function _addEvents_RippleEffects(){
      var self = this;
      
      //gestion du tap
      $(".ripple").on('click', function(e) {
        console.log("click");
        if(!self.isTapHolding){ //si on n'est pas pendant un appui long
          //On récupère la div de la carte cliqué
          var target = $( e.target );
          while( !target.attr("cardNumber")  && target.parent()){
            target = target.parent();
          }
          var index = target.attr("cardNumber");
          
          if(index) {
            var widget = self.card_widgets[index];
            if(!self.busy) {
              self.busy = true;

              _addAnimation.call(self, e, "ink"); 
              setTimeout(function() {
                  widget.onCardThumbnailClick();
                  self.busy = false;
              }, (TAP_HOLD_DURATION));
            }
          } 
        }else{
          console.log("tap canceled");
        }
      });
    }

    // _addAnimation : Ajoute un effet localisé à une tuile
    function _addAnimation(e, code){
      var self, ink, d, x, y;

        var app = phonegapHandler.app;
        if (app.loaded) {
          self = $(e.target);
          while( !self.attr("cardNumber")  && self.parent()){
            self = self.parent();
          }

          //create .ink element if it doesn't exist
          if (self.find("."+code).length === 0)
            self.prepend("<span class='"+code+"'></span>");

          ink = self.find("."+code+"");
          //incase of quick double clicks stop the previous animation
          ink.removeClass("animate");

          //set size of .ink
          if (!ink.height() && !ink.width()) {
            //use self's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(self.outerWidth(), self.outerHeight());
            ink.css({
              height: d,
              width: d
            });
          }

          //get click coordinates
          //logic = click coordinates relative to page - self's position relative to page - half of self height/width to make it controllable from the center;
          x = e.pageX - self.offset().left - ink.width() / 2;
          y = e.pageY - self.offset().top - ink.height() / 2;

          //set the position and add class .animate
          ink.css({
            top: y + 'px',
            left: x + 'px'
          }).addClass("animate");
        }
    }

    //_addEvents_CardConfigurations : Ajoute un écouteur pour éditer les cartes
    function _addEvents_CardConfigurations(){
      var self = this;
      var timerConfigRipple;
      var timerFireConfig;
      var event_start;

      //gestion du touch hold
      //Lors du début d'un appui long, on ajoute une onde
      var _onStartTapHolding = function() {
        console.log("_onStartTapHolding");
        self.isTapHolding = true;
        _addAnimation.call(this, event_start, "ink-slow");
      };
      //Lors d'un appui long on affiche la configuration d'une carte
      var _onlongtouch = function() {
        _clearTouchHoldRipple.call(this, timerConfigRipple, timerFireConfig);
        var app = phonegapHandler.app;
        if(app.loaded){
          if(app.views.cardConfigurator === undefined){
            app.views.cardConfigurator = new CardConfigurator();
          }

          var $self = $(self);
          app.views.cardConfigurator.onClick($self, event_start);
        }
        self.isTapHolding = false;
      };


      $(".ripple").on('mousedown', function(e) {
        event_start = e;
        timerConfigRipple = setTimeout(_onStartTapHolding, TAP_HOLD_DURATION); 
        timerFireConfig = setTimeout(_onlongtouch, CONFIG_HOLD_DURATION); 
      });

      $(".ripple").on('mouseup', function(e) {
        _clearTouchHoldRipple.call(self, timerConfigRipple, timerFireConfig);
      });
    }
    // _clearTouchHoldRipple : Supprime les effets de ripples longs
    function _clearTouchHoldRipple(timerConfigRipple, timerFireConfig){
        if (timerConfigRipple) {
          clearTimeout(timerConfigRipple);
        }        
        if (timerFireConfig) {
          clearTimeout(timerFireConfig);
        }
        $(".ink-slow").remove();
        this.isTapHolding = false; 
    }
    // ========================================== PRIVILEGED ================================

}

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

function CardConfigurator(){
  // ========================================== VARIABLES =================================
  var busy = false;
  var elementSelect;

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================


  // _exitConfig : Quitte l'écran
  function _exitConfig() {
    this.busy = false;
    this.elementSelect = undefined;
    hideMaskPanel();
  }

  // _displayMenusVertical : Affiche le menu vertical
  function _displayMenusVertical() {
    var maskPanel = $(".mask");
    maskPanel.html("<div class='cardConfigurator-button-ctn'></div>");
    var buttonsPanel = maskPanel.find(".cardConfigurator-button-ctn");

    var buttContext = {
      class: "butt-edit",
      title: "Editer l'item",
      icon: "edit",
      code: "Editer"
    };
    buttonsPanel.html(Lyloochat.templates.widget_badge_button(buttContext));
    var buttEdit = $(".badge-button.butt-edit");
    buttEdit.on("click", _on_editItem);

    buttContext = {
      class: "butt-delete",
      title: "Supprimer l'item",
      icon: "delete",
      code: "Supprimer"
    };
    buttonsPanel.append(Lyloochat.templates.widget_badge_button(buttContext));
    var buttDelete = $(".badge-button.butt-delete");
    buttDelete.on("click", _on_deleteItem);
  }

  // _on_deleteItem : Lorsqu'on supprime un item
  function _on_deleteItem(event){
    // TODO : dev _on_deleteItem
    console.log("_on_deleteItem");
    event.stopPropagation();
  }

  // _on_editItem : Lorsqu'on édite un item
  function _on_editItem(event){
    // TODO : dev _on_editItem
    console.log("_on_editItem");
    event.stopPropagation();
  }
  // ========================================== PRIVILEGED ================================
  this.onClick = function(element, event) {
    if(!this.busy){
      this.busy = true;
      this.elementSelect = element;

      showMaskPanel.call(this, _exitConfig);
      _displayMenusVertical.call(this);
    }
  };
}

//Classe mère des cartes widgets
//Classe virtuelle
function Widget_Card(appGrid, card){
    // ========================================== VARIABLES =================================
    this.appGrid = appGrid;
    this.card = card;
    this.elem_card = undefined;
    this.fullscreen_card = undefined;
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================



    // ========================================== ABSTRACT ===================================
    // Retourne le contenu texte de la miniature
    this.getCardThumbailContent = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
        return "";
    };
    //Lors d'un clic simple sur la carte
    this.onCardThumbnailClick = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
    };

    // ========================================== PRIVILEGED ================================
    // Rend la carte dans un élément HTML
    this.render = function(container){
        $(container).append( this.getCardThumbailContent.call(this) );

        var lastChild = container.lastElementChild;
        this.elem_card = lastChild;

        return "";
    };
}

//Une carte avec du dessin
function Widget_Card_Drawing(appGrid, card){
    // ========================================== VARIABLES =================================
    Widget_Card.apply(this, [appGrid, card]);
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== OVERRIDE===================================
    // Retourne le contenu texte de la miniature
    this.getCardThumbailContent = function(){

        var context = {
            cardNumber: card.id,
            title: card.code
        };
        return Lyloochat.templates.widget_card_text(context);
    };
    //Lors d'un clic simple sur la carte
    this.onCardThumbnailClick = function(){
        showErrorPanel("Click Widget_Card_Drawing");
    };
    // ========================================== PRIVILEGED ================================
}

//Une carte avec du son
function Widget_Card_Sound(appGrid, card){
    // ========================================== VARIABLES =================================
    Widget_Card.apply(this, [appGrid, card]);
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== OVERRIDE===================================
    // Retourne le contenu texte de la miniature
    this.getCardThumbailContent = function(){

        var context = {
            cardNumber: card.id,
            title: card.code
        };
        return Lyloochat.templates.widget_card_text(context);
    };
    //Lors d'un clic simple sur la carte
    this.onCardThumbnailClick = function(){
        showErrorPanel("Click Widget_Card_Sound");
    };
    // ========================================== PRIVILEGED ================================
}

//Une carte avec du texte
function Widget_Card_Text(appGrid, card){
    // ========================================== VARIABLES =================================

    // ========================================== CONSTRUCTOR ===============================
    Widget_Card.apply(this, [appGrid, card]);


    // ========================================== PRIVATE ===================================

    // ========================================== OVERRIDE===================================
    // Retourne le contenu texte de la miniature
    this.getCardThumbailContent = function(){

        var context = {
            cardNumber: card.id,
            title: card.code
        };
        return Lyloochat.templates.widget_card_text(context);
    };
    //Lors d'un clic simple sur la carte
    this.onCardThumbnailClick = function(){
        this.displayed_screen_card = new Screen_Card_Text(this);
        this.displayed_screen_card.display();
    };

    // ========================================== PRIVILEGED ================================

}

//Classe mère des cartes widgets
//Classe virtuelle
function Screen_Card(widget_card){
    // ========================================== VARIABLES =================================
    this.widget_card = widget_card;
    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== ABSTRACT ==================================
    //Lors d'un clic simple sur la carte
    this.display = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
    };
    // ========================================== PRIVILEGED ================================

}

//Une carte en plein écran avec du texte
function Screen_Card_Drawing(widget_card){
    // ========================================== VARIABLES =================================
    // ========================================== CONSTRUCTOR ===============================
    Screen_Card.apply(this, [widget_card]);


    // ========================================== PRIVATE ===================================

    // ========================================== OVERRIDE===================================
    // ========================================== PRIVILEGED ================================

}

//Une carte en plein écran avec du bruit
function Screen_Card_Sound(widget_card){
    // ========================================== VARIABLES =================================
    // ========================================== CONSTRUCTOR ===============================
    Screen_Card.apply(this, [widget_card]);


    // ========================================== PRIVATE ===================================

    // ========================================== OVERRIDE===================================
    // ========================================== PRIVILEGED ================================

}

//Une carte en plein écran avec du texte
function Screen_Card_Text(widget_card){
    // ========================================== VARIABLES =================================
    // ========================================== CONSTRUCTOR ===============================
    Screen_Card.apply(this, [widget_card]);


    // ========================================== PRIVATE ===================================
    // ========================================== OVERRIDE===================================
    //Lors d'un clic simple sur la carte
    this.display = function(){
        var body = $("body");

        var context = {
            label: widget_card.card.label,
        };
        var fullscreen_elem = Lyloochat.templates.screen_display_card_text(context);
        body.append(fullscreen_elem);

        var card_expanded_elem = body.children().last();

        var box_text_elem = card_expanded_elem.find('.container');
        box_text_elem.boxfit();

        $( window ).resize(function() {
            card_expanded_elem.attr('style', '');
            box_text_elem.attr('style', '');
            box_text_elem.boxfit();
        });

        var innerButton = card_expanded_elem.find('.card-fs-butt-ok');
        innerButton.on('click', function(e){
            $(card_expanded_elem).remove();
        });
    };
    // ========================================== PRIVILEGED ================================

}

//Une carte avec du dessin
function AppMenu_Impl(appMenu){
    // ========================================== VARIABLES =================================
    this.appMenu = appMenu;
    this.displayed = false;


    // ========================================== CONSTRUCTOR ===============================
    // ========================================== PRIVATE ===================================
    // ========================================== ABSTRACT ===================================
    // Affiche le menu
    this.show = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
    };
    // Affiche le menu
    this.hide = function(){
        showErrorPanel("Shouldn't be there you naughty boy !");
    };
    // ========================================== OVERRIDE===================================
    // ========================================== PRIVILEGED ================================
}

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
  function _addSound($ctn, sound, addToRecent){
    var widget_sound = new Widget_Sound(this, $ctn, sound, addToRecent);
    widget_sound.insert();
  }

  //_search_sounds : Recherche des sons contenant le terme donné
  function _search_sounds(searchWord) {
    _stopPlayingSound.call(this);

    var $content = $(".app-content");
    if(searchWord !== ""){
      var results = this.soundLibrary.searchSounds(this.appMenu.app.model.options.prefix, searchWord);
      

      var $elem_results = $content.find(".results-list");
      $elem_results.empty();
      for(i = 0; i < results.size(); i++){
        var resultSound = results.get(i);
        _addSound.call(this, $elem_results, resultSound, true);
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

  // _refreshRecents : Ajoute les sons récemment joués dans le menu
  function _refreshRecents() {
    var $content = $(".app-content");
    var $recents = $content.find(".recents-list");
    $recents.empty();

    for(i = 0; i < this.soundLibrary.recents_played.size(); i++){
      var recentSound = this.soundLibrary.recents_played.get(i);
      _addSound.call(this, $recents, recentSound, false);
    } 
  }

  // _displaySounds : Ajoute les sons dans le widget
  function _displaySounds(){
    var $content = $(".app-content");

    //Ajout des lectures récentes
    _refreshRecents.call(this);

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
  // _stopPlayingSound : Arrête la lecture d'un son
  function _stopPlayingSound() {
    if((this.playingWidgetSound !== undefined) && (this.playingWidgetSound.playing) ){
      this.playingWidgetSound.stop();
    }
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

  // Cahche le menu
  this.hide = function(){
    _stopPlayingSound.call(this);

    var $menu = $(".app-content .app-menu-expanded");
    $menu.remove();
    this.displayed = false;
  };

  //Lorsqu'on joue une musique
  this.onPlay = function(widget_sound, addToRecent){
    var self = this;
    
    _stopPlayingSound.call(self);

    this.playingWidgetSound = widget_sound;
    this.playingWidgetSound.play();

    if(addToRecent){
      this.soundLibrary.addRecent(widget_sound.sound, function(){
        _refreshRecents.call(self);      
      });
    }
  };


}

//Un widget représentant un os
function Widget_Sound(appMenuSound, $parentCtn, sound, addToRecent){
    // ========================================== VARIABLES =================================
    this.$elem_parent = $parentCtn;
    this.$elem_sound = undefined;

    this.sound = sound;
    this.appMenuSound = appMenuSound;
    this.playing = false;
    this.addToRecent = addToRecent; // Si on doit l'ajouter aux sons récents

    


    // ========================================== CONSTRUCTOR ===============================   
    //_onStop : lors de l'arrêt de la lecture
    function _onStop(){
        this.playing = false;
        this.$elem_sound.removeClass("selected");


        var $icon = this.$elem_sound.find(".sound-icon");
        $icon.removeClass("icon-pause");
        $icon.addClass("icon-play");
    }

    // ========================================== PRIVATE =================================== 
    function _getMediaHandler(cb) {
        var self = this;
        if(this.soundHandler === undefined){
            this.appMenuSound.appMenu.app.deviceHandler.createSoundHandler(this.sound, function(){
                _onStop.call(self);
            },
            function(media){
                self.soundHandler = media;
                cb(self.soundHandler);
            });   
        }else{
            cb(this.soundHandler);
        }
    }
    // ========================================== OVERRIDE===================================
    // ========================================== PRIVILEGED ================================
    // ========================================== OVERRIDE ==================================
    // insert : S insère dans le conteneur
    this.insert = function() {
        var context = {
            name: this.sound.name,
            durationStr: this.sound.getDurationStr(),
        };
        var widget_sound_str = Lyloochat.templates.widget_sound(context);

        //Ajout
        this.$elem_parent.append(widget_sound_str);
        this.$elem_sound = this.$elem_parent.children().last();
        
        //events
        var self = this;
        this.$elem_sound.on("tap", function(e){
            if(self.playing){
                self.stop();
            }else{
                self.appMenuSound.onPlay(self, self.addToRecent);  
            }
            
        });
    };

    //play : joue un son et change l'affichage
    this.play = function(){
        var self = this;
        
        this.playing = true;

        _getMediaHandler.call(self, function(mediaHandler){
            mediaHandler.play();
            self.$elem_sound.addClass("selected");

            var $icon = self.$elem_sound.find(".sound-icon");
            $icon.removeClass("icon-play");
            $icon.addClass("icon-pause");
        });
    };
    //stop : quand on veut arrêter la lecture d'une musique
    this.stop = function(){
        var self = this;
        _getMediaHandler.call(self, function(mediaHandler){
            mediaHandler.stop();
            mediaHandler.release();
            _onStop.call(self);
        });
    };
}
