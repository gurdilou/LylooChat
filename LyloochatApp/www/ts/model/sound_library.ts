import {SoundList} from "./sound_list";
import {Sound} from "./sound";
import {LyloochatApp} from "../app";

export class SoundLibrary {
	// ========================================== VARIABLES =================================
	public recents_played: SoundList = null;
	public all_sounds: SoundList = null;

	// ========================================== CONSTRUCTOR ===============================
	constructor(private app: LyloochatApp) {
		this.recents_played = new SoundList();
		this.all_sounds = new SoundList();
	}
	// ========================================== PRIVATE ===================================

	// ========================================== PRIVILEGED ================================
	// searchSounds : Cherche une liste de sons commencant avec *prefix* et contenant *termSearched*
	public searchSounds(prefix: string, termSearched: string) {
		termSearched = termSearched.toLowerCase();
		prefix = prefix.toLowerCase();

		let results = new SoundList();
		for (let i = 0; i < this.all_sounds.size(); i++) {
			let sound = this.all_sounds.get(i);

			if (prefix !== '') {
				//TODO dev prefix
				if (sound.name.indexOf(prefix) === 0) {
					if (sound.name.toLowerCase().indexOf(termSearched) >= 0) {
						results.add(sound);
					}
				}
			} else {
				// console.log("termSearched : "+termSearched);
				// console.log("sound.name : "+sound.name);
				if (sound.name.toLowerCase().indexOf(termSearched) >= 0) {
					// console.log("ajouté !"+sound.name.toLowerCase().indexOf(termSearched));
					results.add(sound);
				}
			}
		}

		return results;
	};

	// Callback chargement des sons
	public onSoundsLoaded() {
		// todo : Notifuy user
	};

	// addRecent : Ajoute un son aux récents
	public addRecent(soundPlayed: Sound, cb: () => void) {
		this.recents_played.insertAtBegin(soundPlayed);
		this.recents_played.deleteDuplicates();
		this.recents_played.keepFirst(10);
		this.app.saveRecentsSound(this.recents_played, cb);
	}
}
