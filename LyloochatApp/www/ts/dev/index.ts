import {LyloochatApp} from "../app";
import {SoundLibrary} from "../model/sound_library";
import {Sound} from "../model/sound";
import {SoundList} from "../model/sound_list";
import {CardList} from "../model/listCards";
import {CardText} from "../model/card_text";
import {FakeMediaHandler} from "../dev/FakeMediaHandler";
import {MedialHandler} from "../model/mediaHandler";
import {AppHandler} from "../appHandler";


export class PhonegapHandler implements AppHandler {
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
			let cardLoaded = new CardText("" + i, "Card number " + i, "Card number " + i);
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


let phonegapHandler = new PhonegapHandler();
phonegapHandler.initialize();
