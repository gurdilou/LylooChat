import {LyloochatApp} from "../app";
import {SoundLibrary} from "../model/sound_library";
import {Sound} from "../model/sound";
import {SoundList} from "../model/sound_list";
import {CardList} from "../model/listCards";
import {Card} from "../model/card";
import {CardText} from "../model/card_text";
import {CardSound} from "../model/card_sound";
import {CardDrawing} from "../model/card_drawing";
import {FakeMediaHandler} from "../dev/FakeMediaHandler";
import {MedialHandler} from "../model/mediaHandler";
import {AppHandler} from "../appHandler";


export class WebHandler implements AppHandler {
	private app: LyloochatApp = null;

	// ========================================== VARIABLES =================================

	// ========================================== CONSTRUCTOR ===============================

	// ========================================== PRIVATE ===================================
	// Charge les sons depuis la mémoire de l appareil
	private loadAllSounds(lib: SoundLibrary, cb: () => void) {
		let sound_list = lib.all_sounds;

		let fakeSound1 = new Sound("Pudding1", "Puddi", "/media/storage/music/puddi1.mp3", 186);
		sound_list.add(fakeSound1);
		let fakeSound2 = new Sound("lalala", "Puddi", "/media/storage/music/puddi1.mp3", 90);
		sound_list.add(fakeSound2);
		let fakeSound3 = new Sound("les petits poissons", "Puddi", "/media/storage/music/puddi1.mp3", 30);
		sound_list.add(fakeSound3);

		cb();
	}
	//loadRecentSounds : Charge les derniers sons joués
	private loadRecentSounds(lib: SoundLibrary, cb: () => void) {
		let recentsPlayed = lib.recents_played;

		let fakeSound = new Sound("Pudding song", "Puddi", "/media/storage/music/puddi.mp3", 186);
		recentsPlayed.add(fakeSound);
		recentsPlayed.add(fakeSound);
		recentsPlayed.add(fakeSound);
		recentsPlayed.add(fakeSound);
		recentsPlayed.add(fakeSound);
		recentsPlayed.add(fakeSound);
		recentsPlayed.add(fakeSound);
		recentsPlayed.add(fakeSound);
		recentsPlayed.add(fakeSound);
		recentsPlayed.add(fakeSound);

		cb();
	}


	// ========================================== PRIVILEGED ================================
	// initialize : Lance l'application
	public initialize() {
		this.app = new LyloochatApp(this);
		let self = this;
		window.addEventListener('load', function(e) {
			self.app.initialisation();
		}, false);
	}
	// loadCards charge les cartes depuis l'appareil
	public loadCards(listCards: CardList, cb: () => void) {
		for (let i = 0; i < 16; i++) {
			let cardLoaded: Card = null;
			if (i % 2 === 0) {
				cardLoaded = new CardSound("" + i, "Card sound " + i, "lalala.mp3");
			} else if (i % 3 === 0) {
				cardLoaded = new CardDrawing("" + i, "Card drawing " + i, null);
			} else {
				cardLoaded = new CardText("" + i, "Card text " + i, "Card text " + i);
			}
			listCards.addCard(cardLoaded);
		}
		cb();
	}

	//loadSounds : Initialise la bibliothèque de sons
	public loadSounds(lib: SoundLibrary, cb: () => void) {
		let self = this;
		this.loadAllSounds(lib, function() {
			self.loadRecentSounds(lib, function() {
				lib.onSoundsLoaded();
				cb();
			});
		});
	}

	//createSoundHandler : Créer un media object pour manipuler un son
	public createSoundHandler(sound: Sound, cb_onCreated: (mediaHandler: MedialHandler) => void) {
		let fake = new FakeMediaHandler();
		cb_onCreated(fake);
	}
	// saveRecentsSound : Sauvegarde les sons récemment joués
	public saveRecentsSound(soundList: SoundList, cb: () => void) {
		// TODO
		cb();
	}
}

console.log("Web version");
let webHandler = new WebHandler();
webHandler.initialize();
