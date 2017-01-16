import {SoundLibrary} from "./sound_library";
import {Sound}  from "./sound";

export class SoundList {
	// ========================================== VARIABLES =================================
	private list: Sound[] = [];

	// ========================================== CONSTRUCTOR ===============================
	constructor(private library: SoundLibrary) {

	}
	// ========================================== PRIVATE ===================================

	// ========================================== PRIVILEGED ================================
	//size : retourne le nombres de sons contenus
	public size(): number {
		return this.list.length;
	};
	//get : retourne le son à l'index donné
	public get(index: number): Sound {
		return this.list[index];
	};
	//add : Ajoute un son à la liste
	public add(sound: Sound) {
		this.list.push(sound);
		sound.library = this.library;
	};
	// insertAtBegin : Insère un un son en position 0
	public insertAtBegin(sound: Sound) {
		this.list.unshift(sound);
		sound.library = this.library;
	};
	//deleteDuplicates :  Supprime les sons dupliqués
	public deleteDuplicates() {
		for (let i = this.list.length - 1; i >= 0; i--) {
			let sound = this.list[i];

			let index = this.indexOf(sound);
			if (index < i) {
				this.list.splice(i, 1);
			}
		}
	};
	// indexOf : Retourne la première occurence d'un son
	public indexOf(soundSearched: Sound) {
		let found = false;
		let result = -1;
		let i = 0;
		while ((i < this.list.length) && (!found)) {
			let sound = this.list[i];
			if ((sound.name === soundSearched.name) && (sound.duration === soundSearched.duration)) {
				found = true;
				result = i;
			}
			i++;
		}
		return result;
	};
	// keepFirst : Garde uniquement les ''cap'' premiers
	public keepFirst(cap: number) {
		if ((cap >= 1) && (this.list.length > cap)) {
			this.list = this.list.slice(0, cap);
		}
	};
}
