"use strict";
const app_1 = require("./app");
const sound_1 = require("./model/sound");
const card_text_1 = require("./model/card_text");
const FakeMediaHandler_1 = require("./lib/FakeMediaHandler");
class PhonegapHandler {
    constructor() {
        this.app = undefined;
    }
    loadAllSounds(lib, cb) {
        let sound_list = lib.all_sounds;
        let fakeSound1 = new sound_1.Sound("Pudding1", "Puddi", "/media/storage/music/puddi1.mp3", 186);
        sound_list.add(fakeSound1);
        let fakeSound2 = new sound_1.Sound("lalala", "Puddi", "/media/storage/music/puddi1.mp3", 90);
        sound_list.add(fakeSound2);
        let fakeSound3 = new sound_1.Sound("les petits poissons", "Puddi", "/media/storage/music/puddi1.mp3", 30);
        sound_list.add(fakeSound3);
        cb();
    }
    loadRecentSounds(lib, cb) {
        let recentsPlayed = lib.recents_played;
        let fakeSound = new sound_1.Sound("Pudding song", "Puddi", "/media/storage/music/puddi.mp3", 186);
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
    initialize() {
        this.app = new app_1.LyloochatApp(this);
        window.addEventListener('load', this.app.initialisation(), false);
    }
    loadCards(listCards, cb) {
        for (let i = 0; i < 16; i++) {
            let cardLoaded = new card_text_1.Card_Text(i, "Card number " + i, "Card number " + i);
            listCards.addCard(cardLoaded);
        }
        cb();
    }
    loadSounds(lib, cb) {
        let self = this;
        this.loadAllSounds(lib, function () {
            self.loadRecentSounds(lib, function () {
                lib.onSoundsLoaded();
                cb();
            });
        });
    }
    createSoundHandler(sound, cb_onStop, cb_onCreated) {
        let fake = new FakeMediaHandler_1.FakeMediaHandler();
        cb_onCreated(fake);
    }
    saveRecentsSound(soundList, cb) {
        cb();
    }
}
exports.PhonegapHandler = PhonegapHandler;
//# sourceMappingURL=index.js.map