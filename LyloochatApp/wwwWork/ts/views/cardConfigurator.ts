import {AppGrid} from "./appGrid";
import {WidgetCard} from "./cards/widget_card";
import {WidgetCardText} from "./cards/widget_card_text";
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
			this.fillMenuSound();
		} else if (this.widget.card instanceof CardDrawing) {
			this.fillMenuDrawing();
		}
		Materialize.updateTextFields();
		$('ul.tabs').tabs();


		//event listeners
		let self = this;
		$('.menu-card-config .btn-sound-search').on('click', function(e) {
			let wordSearched = $('#card-soundpath').val();

			self.appGrid.app.getSoundLibrary(function(soundLibrary) {
				self.sounds = soundLibrary.searchSounds('', wordSearched);

				let ctn = $('.sound-list');
				ctn.removeClass('hidden');
				ctn.empty();

				for (let i = 0; i < self.sounds.size(); i++) {
					let candidate = self.sounds.get(i);

					self.addSoundCandidate(ctn, candidate);
				}
			});
		});
		$('.menu-card-config .btn-validate').on('click', function(e) {
			let activeTab = $('.tabs .active');
			let newWidget = null;
			if (activeTab.hasClass('menu-text')) {
				let label = $('#card_text_content').val();
				let card = new CardText(self.widget.card.id, label, label);
				newWidget = new WidgetCardText(self.appGrid, card);
			}
			if (activeTab.hasClass('menu-sound')) {
				//TODO generate widget sound
			}
			if (activeTab.hasClass('menu-drawing')) {
				//TODO generate widget drawing
			}

			if (newWidget) {
				self.appGrid.onCardEdit(self.index, newWidget);
			}
			self.exitConfig();
		});
		$('.menu-card-config .btn-cancel').on('click', function(e) {
			self.exitConfig();
		});
	}

	// _addSoundCandidate : Ajoute un son validant le motif de recherche
	private addSoundCandidate(ctn: JQuery, candidate: Sound) {
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
		let cardText = <CardText>this.widget.card;
		input.val(cardText.label);
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
	public onClick(index: number) {
		if (!this.busy) {
			this.busy = true;
			this.index = index;
			this.widget = this.appGrid.card_widgets[index];

			Dialogs.showPopupPanel();
			this.displayMenusVertical();
		}
	}
}
