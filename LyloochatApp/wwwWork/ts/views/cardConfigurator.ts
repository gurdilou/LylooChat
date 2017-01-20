import {AppGrid} from "./appGrid";
import {WidgetCard} from "./cards/widget_card";
import {SoundList} from "../model/sound_list";
import {Sound} from "../model/sound";
import {Dialogs} from "../commons/common";
import {CardText} from "../model/card_text";
import {CardDrawing} from "../model/card_drawing";
import {CardSound} from "../model/card_sound";

export class CardConfigurator {
	// ========================================== VARIABLES =================================
	private busy: boolean = false;
	private widget: WidgetCard;
	private index: number;
	private sounds: SoundList;
	private selectedSound: Sound;

	// ========================================== CONSTRUCTOR ===============================
	constructor(private appGrid: AppGrid) {

	}
	// ========================================== PRIVATE ===================================


	// _exitConfig : Quitte l'écran
	private exitConfig() {
		this.busy = false;
		this.widget = undefined;
		Dialogs.hidePopupPanel();
	}

	// _displayMenusVertical : Affiche le menu vertical
	private displayMenusVertical() {
		let self = this;
		let maskPanel = $(".popup");
		let menuContext = {
			loc: {
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

		if (this.widget.card instanceof CardText) {
			this.fillMenuText();
		} else if (this.widget.card instanceof CardSound) {
			_fillMenuSound.call(self);
		} else if (this.widget.card instanceof CardDrawing) {
			_fillMenuDrawing.call(self);
		}
		Materialize.updateTextFields();
		$('ul.tabs').tabs();


		//event listeners
		$('.menu-card-config .btn-sound-search').on('click', function(e) {
			let wordSearched = $('#card-soundpath').val();

			self.appGrid.app.getSoundLibrary(function(soundLibrary) {
				self.sounds = soundLibrary.searchSounds('', wordSearched);

				let ctn = $('.sound-list');
				ctn.removeClass('hidden');
				ctn.empty();

				for (i = 0; i < self.sounds.size(); i++) {
					let candidate = self.sounds.get(i);

					_addSoundCandidate.call(self, ctn, candidate, i);
				}
			});
		});
		$('.menu-card-config .btn-validate').on('click', function(e) {
			let activeTab = $('.tabs .active');
			let newWidget = null;
			if (activeTab.hasClass('menu-text')) {
				let label = $('#card_text_content').val();
				let card = new Card_Text(self.widget.card.id, label, label);
				newWidget = new Widget_Card_Text(appGrid, card);
			}
			if (activeTab.hasClass('menu-sound')) {
				//TODO generate widget sound
			}
			if (activeTab.hasClass('menu-drawing')) {
				//TODO generate widget drawing
			}

			if (newWidget) {
				appGrid.onCardEdit(self.index, newWidget);
			}
			hidePopupPanel();
		});
		$('.menu-card-config .btn-cancel').on('click', function(e) {
			hidePopupPanel();
		});
	}

	// _addSoundCandidate : Ajoute un son validant le motif de recherche
	private addSoundCandidate(ctn, candidate) {
		let context = {
            name: candidate.name,
            durationStr: candidate.getDurationStr(),
            icon: 'play',
        };
		let widget_sound_str = Lyloochat.templates.widget_sound(context);
		ctn.append(widget_sound_str);
		let elem_sound = ctn.children().last();

		//events
		let self = this;
		elem_sound.on("tap", function(e) {
			$('#card-soundpath').val(candidate.name);
			self.selectedSound = candidate;
		});
	}

	// _fillMenuText : Sélection du menu  pour une carte de texte
	private fillMenuText() {
		$('.menu-card-config ul.tabs').tabs('select_tab', 'card_text');
		let input = $('#card_text_content');
		input.val(this.widget.card.label);
	}
	// _fillMenuSound : Sélection du menu  pour une carte de son
	private fillMenuSound() {
		//  TODO
		$('.menu-card-config ul.tabs').tabs('select_tab', 'card_sound');
	}
	// _fillMenuDrawing : Sélection du menu  pour une carte de dessin
	private fillMenuDrawing() {
		//  TODO
		$('.menu-card-config ul.tabs').tabs('select_tab', 'card_drawing');
	}

	// ========================================== PRIVILEGED ================================
	public onClick(index) {
		if (!this.busy) {
			this.busy = true;
			this.index = index;
			this.widget = appGrid.card_widgets[index];

			showPopupPanel.call(this);


			_displayMenusVertical.call(this);
		}
	}
}
