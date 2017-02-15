import {MenuSound} from "../menu_sound";
import {Sound} from "../../../model/sound";
import {MedialHandler} from "../../../model/mediaHandler";

//Un widget représentant un os
export class WidgetSound {
	public playing: boolean = false;

	private elem_sound: JQuery = null;
	private soundHandler: MedialHandler = null;

    // ========================================== VARIABLES =================================
	constructor(
		private appMenuSound: MenuSound,
		public sound: Sound,
		private isInRecentPlayed: boolean) {
	}

    // ========================================== CONSTRUCTOR ===============================
    //_onStop : lors de l'arrêt de la lecture
	private onStop() {
		this.playing = false;
		this.elem_sound.removeClass("selected");


		let icon = this.elem_sound.find(".sound-icon");
		icon.removeClass("icon-pause");
		icon.addClass("icon-play");
	}

	// ========================================== PRIVATE ===================================
	private getMediaHandler(cb: (mediaHandler: MedialHandler) => void) {
		let self = this;
		if (!this.soundHandler) {
			this.appMenuSound.appMenu.app.deviceHandler.createSoundHandler(
				this.sound,
				(media: MedialHandler) => {
					self.soundHandler = media;
					cb(self.soundHandler);
				});
		} else {
			cb(this.soundHandler);
		}
	}
	// ========================================== OVERRIDE===================================
	// ===========================²=============== PRIVILEGED ================================
	// ========================================== OVERRIDE ==================================
	// insert : S insère dans le conteneur
	public insert(elem_parent: JQuery) {
		let context = {
			name: this.sound.name,
			durationStr: this.sound.getDurationStr(),
			icon: 'play',
		};
		let widget_sound_str = Lyloochat.templates.widget_sound(context);

		//Ajout
		elem_parent.append(widget_sound_str);
		this.elem_sound = elem_parent.children().last();

		//events
		let self = this;
		this.elem_sound.on("tap", function(e) {
			if (self.playing) {
				self.stop();
			} else {
				self.appMenuSound.onPlay(self, self.isInRecentPlayed);
			}

		});
	};

	//play : joue un son et change l'affichage
	public play() {
		let self = this;

		this.playing = true;

		this.getMediaHandler(function(mediaHandler) {
			mediaHandler.play();
			self.elem_sound.addClass("selected");

			let icon = self.elem_sound.find(".sound-icon");
			icon.removeClass("icon-play");
			icon.addClass("icon-pause");
		});
	};
	//stop : quand on veut arrêter la lecture d'une musique
	public stop() {
		let self = this;
		this.getMediaHandler(function(mediaHandler) {
			mediaHandler.stop();
			mediaHandler.release();
			self.onStop();
		});
	};
}
