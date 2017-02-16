import {MenuBase} from "./menu_base";
import {AppMenu} from "../appMenu";
import {SoundLibrary} from "../../model/sound_library";
import {WidgetSound} from "./menu_sound/widget_sound";
import {Sound} from "../../model/sound";


//Une carte avec du dessin
export class MenuSound extends MenuBase {
	private soundLibrary: SoundLibrary = null;
	private playingWidgetSound: WidgetSound = null;

	constructor(appMenu: AppMenu) {
		super(appMenu);

		let self = this;
		this.appMenu.app.getSoundLibrary(function(soundLibrary) {
			self.soundLibrary = soundLibrary;
			if (self.displayed) {
				self.displaySounds();
			}
		});
	}

	// ========================================== CONSTRUCTOR ===============================

	// ========================================== PRIVATE ===================================
	//_addSound : Ajoute un son dans le menu
	private addSound(ctn: JQuery, sound: Sound, addToRecent: boolean) {
		let widget_sound = new WidgetSound(this, sound, addToRecent);
		widget_sound.insert(ctn);
	}

	//_search_sounds : Recherche des sons contenant le terme donné
	private search_sounds(searchWord: string) {
		this.stopPlayingSound();

		let content = $(".app-content");
		if (searchWord !== "") {
			let results = this.soundLibrary.searchSounds(this.appMenu.app.options.prefix, searchWord);


			let elem_results = content.find(".results-list");
			elem_results.empty();
			for (let i = 0; i < results.size(); i++) {
				let resultSound = results.get(i);
				this.addSound(elem_results, resultSound, true);
			}

			//on switch l'affichage
			//Affichage des résultats
			elem_results.removeClass("hidden");
			let $elem_rule = content.find(".results-rule");
			$elem_rule.removeClass("hidden");
			let $elem_title = content.find(".results-title");
			$elem_title.removeClass("hidden");

			//masquage des récents
			let $elem_list = content.find(".recents-list");
			$elem_list.addClass("hidden");
			$elem_rule = content.find(".recents-rule");
			$elem_rule.addClass("hidden");
			$elem_title = content.find(".recents-title");
			$elem_title.addClass("hidden");
		} else {
			//on switch l'affichage
			//Affichage des récents
			let $elem_list_off = content.find(".recents-list");
			$elem_list_off.removeClass("hidden");
			let $elem_rule_off = content.find(".recents-rule");
			$elem_rule_off.removeClass("hidden");
			let $elem_title_off = content.find(".recents-title");
			$elem_title_off.removeClass("hidden");

			//masquage des résultats
			$elem_list_off = content.find(".results-list");
			$elem_list_off.addClass("hidden");
			$elem_rule_off = content.find(".results-rule");
			$elem_rule_off.addClass("hidden");
			$elem_title_off = content.find(".results-title");
			$elem_title_off.addClass("hidden");
		}
	}

	// _refreshRecents : Ajoute les sons récemment joués dans le menu
	private refreshRecents() {
		let content = $(".app-content");
		let recents = content.find(".recents-list");
		recents.empty();

		for (let i = 0; i < this.soundLibrary.recents_played.size(); i++) {
			let recentSound = this.soundLibrary.recents_played.get(i);
			this.addSound(recents, recentSound, false);
		}
	}

	// _displaySounds : Ajoute les sons dans le widget
	private displaySounds() {
		let content = $(".app-content");

		//Ajout des lectures récentes
		this.refreshRecents();

		//Ajout de l'écoute de la recherche
		let self = this;
		let searchInput = content.find(".app-menu-expanded .search-input");
		searchInput.on("keypress", function(e) {
			let code = (e.keyCode ? e.keyCode : e.which);
			if (code === 13) { //Enter keycode
				e.preventDefault();
				console.log("Son cherché : " + searchInput.val());
				self.search_sounds(searchInput.val());
				searchInput.blur();
			}
		});
	}
	// _stopPlayingSound : Arrête la lecture d'un son
	private stopPlayingSound() {
		if ((this.playingWidgetSound) && (this.playingWidgetSound.playing)) {
			this.playingWidgetSound.stop();
		}
	}
	// ========================================== OVERRIDE===================================
	// ========================================== PRIVILEGED ================================
	// ========================================== OVERRIDE ==================================
	// Affiche le menu
	public show() {
		let context = {
		};
		let appMenuHtml = Lyloochat.templates.menu_sound(context);
		let content = $(".app-content");
		content.append(appMenuHtml);

		this.displayed = true;

		if (this.soundLibrary) {
			this.displaySounds();
		}
	};

	// Cahche le menu
	public hide() {
		this.stopPlayingSound();

		let menu = $(".app-content .app-menu-expanded");
		menu.remove();
		this.displayed = false;
	};

	//Lorsqu'on joue une musique
	public onPlay(widget_sound: WidgetSound, isInRecentPlayed: boolean) {
		let self = this;

		this.stopPlayingSound();

		this.playingWidgetSound = widget_sound;
		this.playingWidgetSound.play();

		if (isInRecentPlayed) {
			this.soundLibrary.addRecent(widget_sound.sound, function() {
				self.refreshRecents();
			});
		}
	};
}
