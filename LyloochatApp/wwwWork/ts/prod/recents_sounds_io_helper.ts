import {SoundList} from "../model/sound_list";
import {Dialogs} from "../commons/common";
import {Sound} from "../model/sound";

//Une carte avec du dessin
export class RecentsSoundsIOHelper {
	private static SAVED_FILENAME: string = "recents.json";

	// ========================================== CONSTRUCTOR ===============================
	constructor(private listSounds: SoundList) {

	}
	// ========================================== PRIVATE ===================================
	//fail : gestion des erreurs fichiers IO
	private fail(error: any) {
		let msg = '';
		switch (error.code) {
			case FileError.NOT_FOUND_ERR:
				msg += 'NOT_FOUND_ERR : File or directory not found';
				break;
			case FileError.SECURITY_ERR:
				msg += 'SECURITY_ERR';
				break;
			case FileError.ABORT_ERR:
				msg += 'ABORT_ERR';
				break;
			case FileError.ENCODING_ERR:
				msg += 'ENCODING_ERR';
				break;
			case FileError.NO_MODIFICATION_ALLOWED_ERR:
				msg += 'NO_MODIFICATION_ALLOWED_ERR';
				break;
			case FileError.INVALID_STATE_ERR:
				msg += 'INVALID_STATE_ERR';
				break;
			case FileError.SYNTAX_ERR:
				msg += 'SYNTAX_ERR';
				break;
			case FileError.NOT_READABLE_ERR:
				msg += 'NOT_READABLE_ERR : File or directory not readable';
				break;

			case FileError.PATH_EXISTS_ERR:
				msg += 'PATH_EXISTS_ERR : File or directory already exists';
				break;

			case FileError.TYPE_MISMATCH_ERR:
				msg += 'TYPE_MISMATCH_ERR : Invalid filetype';
				break;

			default:
				msg += 'Unknown Error';
				break;
		};

		console.log("Error // " + msg);
		Dialogs.showErrorPanel(msg);
	};

	// _addSoundJSON : Transforme un son en json pour être sauvegardé
	private addSoundJSON(list: any[], sound: Sound) {
		let soundJSON: any = {};
		soundJSON.name = sound.name;
		soundJSON.author = sound.author;
		soundJSON.filepath = sound.filepath;
		soundJSON.duration = sound.duration;

		list.push(soundJSON);
	}
	// _saveListToFile : Sauvegarde une liste dans un fichier
	private saveListToFile(list: any[], cb: Function) {
		let self = this;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
			//Success
			(fileSystem: FileSystem) => {
				fileSystem.root.getDirectory("Lyloochat", { create: true },
					(dirEntry: DirectoryEntry) => {
						dirEntry.getFile(RecentsSoundsIOHelper.SAVED_FILENAME, { create: true },
							(fileHandler: FileEntry) => {
								fileHandler.createWriter(
									(fileWriter: FileWriter) => {
										//Ecriture du fichier
										fileWriter.onwriteend = function(e: any) {
											cb();
										};

										fileWriter.onerror = function(e: any) {
											Dialogs.showErrorPanel(e.toString());
											cb();
										};

										let blob = new Blob([JSON.stringify(list)], { type: 'application/json' });
										fileWriter.write(blob);
									}, self.fail);
							}, self.fail);
					}, self.fail);
			}, self.fail
		);
	}

	// _loadSoundsFromFile : Charge le fichier JSON contenant les sons récemment joués
	private loadSoundsFromFile(cb: (soundJSON: any[]) => void) {
		let self = this;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
			(fileSystem: FileSystem) => {
				fileSystem.root.getDirectory("Lyloochat", { create: true },
					(dirEntry: DirectoryEntry) => {
						dirEntry.getFile(RecentsSoundsIOHelper.SAVED_FILENAME, { create: true },
							(fileHandler: FileEntry) => {
								fileHandler.file(function(file) {

									let reader = new FileReader();
									reader.onloadend = function(evt) {
										if ((evt.target.result !== undefined) && (evt.target.result !== "")) {
											let soundsJSON = JSON.parse(evt.target.result);
											cb(soundsJSON);
										} else {
											cb(undefined);
										}
									};
									reader.readAsText(file);
								}, fail);
							}, fail);
					}, fail);
			}, fail);
	}
	// ========================================== OVERRIDE===================================
	// ========================================== PRIVILEGED ================================
	// ========================================== OVERRIDE ==================================
	// save : Sauvegarde les sons récemment joués
	public save(cb: Function) {
		let listSoundsJSON = [];
		for (let i = 0; i < this.listSounds.size(); i++) {
			let sound = this.listSounds.get(i);

			this.addSoundJSON(listSoundsJSON, sound);
		}

		this.saveListToFile(listSoundsJSON, cb);
	}
	// load : Charge les sons récemment joués
	public load(cb: Function) {
		let self = this;
		this.loadSoundsFromFile(function(listSoundsJSON) {
			if (listSoundsJSON !== undefined) {
				for (let i = 0; i < listSoundsJSON.length; i++) {
					let soundJSON = listSoundsJSON[i];

					let name = soundJSON.name;
					let author = soundJSON.author;
					let filepath = soundJSON.filepath;
					let duration = soundJSON.duration;
					let newSound = new Sound(name, author, filepath, duration);
					self.listSounds.add(newSound);
				}
			}
			cb();
		});
	}
}
