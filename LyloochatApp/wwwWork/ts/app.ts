import {AppOptions} from "./model/app_options";
import {PhonegapHandler} from "./index";
import {SoundLibrary} from "./model/sound_library";
import {CardList} from "./model/listCards";
import {AppGrid} from "./views/appGrid";
import {AppViews} from "./views/app_views";

export class LyloochatApp {
	// ========================================== VARIABLES =================================
	public listCards: CardList;
	public options = new AppOptions();
	public views = new AppViews();
	private loaded: boolean = false;
	private soundLibrary: SoundLibrary = null;


	constructor(private deviceHandler: PhonegapHandler) {
		Handlebars.registerPartial('widget_badge_button', Lyloochat.templates.widget_badge_button);
		Handlebars.registerPartial('widget_text_button', Lyloochat.templates.widget_text_button);
		Handlebars.registerPartial('widget_floating_button', Lyloochat.templates.widget_floating_button);
	}



	// ========================================== PRIVATE ===================================

	// ========================================== PRIVILEGED ================================
	//initialisation : Charge l'application
	public initialisation() {
		console.log("initialisation");

		$.event.special.tap.emitTapOnTaphold = false;

		//Chargement du modèle
		let self = this;
		showLoadingPanel("Chargement des cartes...");
		this.listCards = new CardList();
		this.deviceHandler.loadCards(this.listCards, function() {
			//Création des vues
			self.views.initMenu(this);
			self.views.initGrid(this);
			self.loaded = true;
			hideLoadingPanel();
		});

		window.onerror = function(msg, url, line, col, error) {
			console.error(msg);
			showErrorPanel(msg);
		};
	}

	// getSoundLibrary : Retourne ou charge la librairie de son
	public getSoundLibrary(cb) {
		if (this.soundLibrary !== undefined) {
			cb(this.soundLibrary);
		} else {
			let self = this;
			let soundLibrary = new SoundLibrary(this);
			showLoadingPanel("Chargement des sons...");
			this.deviceHandler.loadSounds(soundLibrary, function() {
				hideLoadingPanel();
				self.soundLibrary = soundLibrary;
				cb(self.soundLibrary);
			});
		}
	}
	// saveRecentsSound : Sauvegarde les sons récemment joués
	public saveRecentsSound(soundList, cb) {
		this.deviceHandler.saveRecentsSound(soundList, cb);
	}
}