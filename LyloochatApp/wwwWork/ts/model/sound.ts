import {SoundLibrary} from "./sound_library";


export class Sound {
	public library: SoundLibrary;
	// ========================================== VARIABLES =================================
	// ========================================== CONSTRUCTOR ===============================
	constructor(
		public name: string,
		public author: string,
		public filepath: string,
		public duration: number) {

	}

	// ========================================== PRIVATE ===================================
	private zeroPad(num, places) {
		let zero = places - num.toString().length + 1;
		return Array(+(zero > 0 && zero)).join("0") + num;
	}

	// ========================================== PRIVILEGED ================================
	// getDurationStr : retourne la durée du son formaté
	public getDurationStr() {
		let dateSeconds = new Date(this.duration * 1000);
		let nbMinutes = dateSeconds.getMinutes();
		nbMinutes = this.zeroPad.call(this, nbMinutes, 2);

		let nbSeconds = dateSeconds.getSeconds();
		nbSeconds = this.zeroPad.call(this, nbSeconds, 2);

		return nbMinutes + ":" + nbSeconds;
	}
}
