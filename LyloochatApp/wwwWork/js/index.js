function PhonegapHandler(){
  this.app = undefined;

  // ========================================== VARIABLES =================================

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================
  // ========================================== PRIVILEGED ================================
  // initialize : Lance l'application
  this.initialize = function() {
    console.log("callback initialize");
    this.app = new App(this);

    window.addEventListener('load', this.app.initialisation(), false);
  };
  //loadCard : Charge une carte depuis la mémoire de l'appareil
  this.loadCard = function(index){
    var cardLoaded = new Card_Text(index, "Card number "+index, "Card number "+index);
    return cardLoaded;
  };
  //initSoundLibrary : Initialise le plugin pour lire les sons
  this.initSoundLibrary = function() {
    var lib =  new SoundLibrary(this);

    var fakeSound = new Sound("Pudding song", "Puddi",  "/media/storage/music/puddi.mp3", 186);
    var listRecents = lib.recentsPlayed.add(fakeSound);
    var listRecents = lib.recentsPlayed.add(fakeSound);
    var listRecents = lib.recentsPlayed.add(fakeSound);
    var listRecents = lib.recentsPlayed.add(fakeSound);
    var listRecents = lib.recentsPlayed.add(fakeSound);
    var listRecents = lib.recentsPlayed.add(fakeSound);
    var listRecents = lib.recentsPlayed.add(fakeSound);
    var listRecents = lib.recentsPlayed.add(fakeSound);
    var listRecents = lib.recentsPlayed.add(fakeSound);
    var listRecents = lib.recentsPlayed.add(fakeSound);

    //TODO 
    return lib;
  }

}
