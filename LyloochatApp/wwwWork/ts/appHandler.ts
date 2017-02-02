import {SoundLibrary} from "./model/sound_library";
import {Sound} from "./model/sound";
import {SoundList} from "./model/sound_list";
import {CardList} from "./model/listCards";
import {MedialHandler} from "./model/mediaHandler";

export interface AppHandler {
	initialize();

	loadCards(listCards: CardList, cb: () => void);

	loadSounds(lib: SoundLibrary, cb: () => void);

	createSoundHandler(sound: Sound, cb_onCreated: (mediaHandler: MedialHandler) => void);

	saveRecentsSound(soundList: SoundList, cb: () => void);
}
