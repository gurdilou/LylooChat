import {SoundLibrary} from "./model/sound_library";
import {Sound} from "./model/sound";
import {SoundList} from "./model/sound_list";
import {CardList} from "./model/listCards";
import {MedialHandler} from "./model/mediaHandler";

export interface AppHandler {
	initialize(): void;

	loadCards(listCards: CardList, cb: () => void): void;

	loadSounds(lib: SoundLibrary, cb: () => void): void;

	createSoundHandler(sound: Sound, cb_onCreated: (mediaHandler: MedialHandler) => void): void;

	saveRecentsSound(soundList: SoundList, cb: () => void): void;

	/**
	 * On phone, hide status bars
	 * @param  {AppHandler} app [description]
	 */
	refreshFullscreen(): void;
}
