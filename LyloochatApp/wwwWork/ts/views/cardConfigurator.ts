function CardConfigurator(appGrid){
  // ========================================== VARIABLES =================================
  this.appGrid = appGrid;
  var busy = false;
  var widget;
  var index;
  var sounds;
  var selectedSound;

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================


  // _exitConfig : Quitte l'écran
  function _exitConfig() {
    this.busy = false;
    this.widget = undefined;
    hidePopupPanel();
  }

  // _displayMenusVertical : Affiche le menu vertical
  function _displayMenusVertical() {
    var self = this;
    var maskPanel = $(".popup");
    var menuContext = {
      loc :  {
        title: 'Configuration',
        ok: 'OK',
        cancel: 'Annuler',
        card_text: 'Texte',
        card_sound: 'Son',
        card_drawing: 'Dessin',
        displayed_text: 'Texte affiché',
        played_sound: 'Son joué',
        displayed_draw: 'Dessin',
      }
    };
    maskPanel.html(Lyloochat.templates.menu_card_config(menuContext));

    if(this.widget.card instanceof Card_Text){
      _fillMenuText.call(self);
    }else if (this.widget.card instanceof Card_Sound){
      _fillMenuSound.call(self);
    }else if (this.widget.card instanceof Card_Drawing){
      _fillMenuDrawing.call(self);
    }
    Materialize.updateTextFields();
    $('ul.tabs').tabs();


    //event listeners
    $('.menu-card-config .btn-sound-search').on('click', function(e){
      var wordSearched = $('#card-soundpath').val();

      self.appGrid.app.getSoundLibrary(function(soundLibrary){
        self.sounds = soundLibrary.searchSounds('', wordSearched);

        var ctn = $('.sound-list');
        ctn.removeClass('hidden');
        ctn.empty();

        for(i = 0; i < self.sounds.size(); i++){
          var candidate = self.sounds.get(i);

          _addSoundCandidate.call(self, ctn, candidate, i);
        }
      });
    });
    $('.menu-card-config .btn-validate').on('click', function(e){
		var activeTab = $('.tabs .active');
		var newWidget = null;
		if(activeTab.hasClass('menu-text')) {
		    var label = $('#card_text_content').val();
			let card = new Card_Text(self.widget.card.id, label, label);
			newWidget = new Widget_Card_Text(appGrid, card);
		}
		if(activeTab.hasClass('menu-sound')) {
			//TODO generate widget sound
		}
		if(activeTab.hasClass('menu-drawing')) {
			//TODO generate widget drawing
		}

		if(newWidget) {
			appGrid.onCardEdit(self.index, newWidget);
		}
		hidePopupPanel();
    });
	$('.menu-card-config .btn-cancel').on('click', function(e){
		hidePopupPanel();
	});
  }

  // _addSoundCandidate : Ajoute un son validant le motif de recherche
  function _addSoundCandidate(ctn, candidate) {
    var context = {
            name: candidate.name,
            durationStr: candidate.getDurationStr(),
            icon: 'play',
        };
    var widget_sound_str = Lyloochat.templates.widget_sound(context);
    ctn.append(widget_sound_str);
    var elem_sound = ctn.children().last();

    //events
    var self = this;
    elem_sound.on("tap", function(e){
      $('#card-soundpath').val(candidate.name);
      self.selectedSound = candidate;
    });
  }

  // _fillMenuText : Sélection du menu  pour une carte de texte
  function _fillMenuText() {
    $('.menu-card-config ul.tabs').tabs('select_tab', 'card_text');
    var input = $('#card_text_content');
    input.val(this.widget.card.label);
  }
  // _fillMenuSound : Sélection du menu  pour une carte de son
  function _fillMenuSound() {
    //  TODO
    $('.menu-card-config ul.tabs').tabs('select_tab', 'card_sound');
  }
  // _fillMenuDrawing : Sélection du menu  pour une carte de dessin
  function _fillMenuDrawing() {
    //  TODO
    $('.menu-card-config ul.tabs').tabs('select_tab', 'card_drawing');
  }

  // ========================================== PRIVILEGED ================================
  this.onClick = function(index) {
    if(!this.busy){
      this.busy = true;
	  this.index = index;
      this.widget = appGrid.card_widgets[index];

      showPopupPanel.call(this);


      _displayMenusVertical.call(this);
    }
  };
}
