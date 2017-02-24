import {LyloochatApp} from "../app";
import {SoundLibrary} from "../model/sound_library";
import {Sound} from "../model/sound";
import {SoundList} from "../model/sound_list";
import {CardList} from "../model/listCards";
import {AppHandler} from "../appHandler";
import {MedialHandler} from "../model/mediaHandler";
import {CardLoaderHelper} from "./card_load_helper";
import {SoundHelper} from "./sound_helper";
import {RecentsSoundsIOHelper} from "./recents_sounds_io_helper";


export class PhonegapHandler implements AppHandler {
	private app: LyloochatApp = null;


    // ========================================== VARIABLES =================================

    // ========================================== CONSTRUCTOR ===============================

    // ========================================== PRIVATE ===================================
	private onDeviceReady() {
		console.log("ready, plateforme : " + device.platform);
		this.app = new LyloochatApp(this);

		if (device.platform === "Android") {
			AndroidFullScreen.immersiveMode(function() {
				// console.log("It worked!");
			},
				function(error) {
					console.error(error);
				});
		}
		let self = this;
		$(function(){
			self.app.initialisation();
		});
	}

    // ========================================== PRIVILEGED ================================
    // initialize : Lance l'application
	public initialize() {
		let self = this;
		console.log("initialize");


		document.addEventListener('deviceready', function(event) {
			self.onDeviceReady();
		}, false);
	}


    // _loadCards charge les cartes depuis l'appareil
	public loadCards(listCards: CardList, cb: () => void) {
		let helper = new CardLoaderHelper(listCards, cb);
		helper.loadCardsFromDevice();
	}

	// loadSounds : Charge les sons depuis la mémoire de l appareil
	public loadSounds(lib: SoundLibrary, cb: () => void) {
		let helper = new SoundHelper(lib, cb);
		helper.loadSoundsFromDevice();
	}

	//createSoundHandler : Créer un media object pour manipuler un son
	public createSoundHandler(sound: Sound, cb_onCreated: (mediaHandler: MedialHandler) => void) {
		let media = new Media(sound.filepath,
			function() {
				console.log("media success");
			},
			function(mediaError: MediaError) {
				console.log("media err " + mediaError);
			}
		);

		cb_onCreated(media);
	}

	// saveRecentsSound : Sauvegarde les sons récemment joués
	public saveRecentsSound(soundList: SoundList, cb: () => void) {
		let helper = new RecentsSoundsIOHelper(soundList);
		helper.save(cb);
	}
}

console.log("Phone version");
let phoneHandler = new PhonegapHandler();
phoneHandler.initialize();
