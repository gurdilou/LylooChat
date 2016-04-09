function PhonegapHandler(){
  this.app = undefined;

  // ========================================== VARIABLES =================================

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================
  // _loadAllSounds : Charge les sons depuis la mémoire de l appareil
  function _loadAllSounds(lib, cb) {
    var sound_list = lib.all_sounds;

    var fakeSound1 = new Sound("Pudding1", "Puddi",  "/media/storage/music/puddi1.mp3", 186);
    sound_list.add(fakeSound1);
    var fakeSound2 = new Sound("lalala", "Puddi",  "/media/storage/music/puddi1.mp3", 90);
    sound_list.add(fakeSound2);
    var fakeSound3 = new Sound("les petits poissons", "Puddi",  "/media/storage/music/puddi1.mp3", 30);
    sound_list.add(fakeSound3);

    cb();
  };
  //_loadRecentSounds : Charge les derniers sons joués
  function _loadRecentSounds(lib, cb){
    var recentsPlayed = lib.recents_played;

    var fakeSound = new Sound("Pudding song", "Puddi",  "/media/storage/music/puddi.mp3", 186);
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
  this.initialize = function() {
    console.log("callback initialize");
    this.app = new App(this);

    window.addEventListener('load', this.app.initialisation(), false);
  };
  // _loadCards charge les cartes depuis l'appareil
  this.loadCards = function(listCards, cb){
    for (i = 0; i < 16; i++) {
      var cardLoaded = new Card_Text(i, "Card number "+i, "Card number "+i);
      listCards.addCard(cardLoaded);
    }
    cb();
  }

  //loadSounds : Initialise la bibliothèque de sons
  this.loadSounds = function(lib,cb) {
    var self = this;
    _loadAllSounds.call(self, lib, function(){
      _loadRecentSounds.call(self, lib, function(){
        lib.onSoundsLoaded();
        cb();
      });
    });
  }

  //createSoundHandler : Créer un media object pour manipuler un son
  this.createSoundHandler = function(sound, cb_onStop, cb_onCreated) {
    var fake = new FakeMediaHandler();
    cb_onCreated(fake);
  }
  // saveRecentsSound : Sauvegarde les sons récemment joués
  this.saveRecentsSound = function(soundList, cb) {
    // TODO
    cb();
  }


}
