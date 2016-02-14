function PhonegapHandler(){
    this.app = undefined;


    // ========================================== VARIABLES =================================

    // ========================================== CONSTRUCTOR ===============================

    // ========================================== PRIVATE ===================================
    function _onDeviceReady() {
        console.log("ready, plateforme : "+window.device.platform);
        this.app = new App(this)

        window.addEventListener('load', this.app.initialisation(), false);
    }

    // ========================================== PRIVILEGED ================================
    // initialize : Lance l'application
    this.initialize = function() {
        var self = this;
        console.log("initialize");


        document.addEventListener('deviceready', function (event) {
            _onDeviceReady.call(self);
        }, false);
    };

    
    // _loadCards charge les cartes depuis l'appareil
    this.loadCards = function(listCards, cb){
        // var helper = new CardLoaderHelper(cb);

        for (i = 0; i < 16; i++) {
          var cardLoaded = new Card_Text(i, "Card number "+i, "Card number "+i);
          listCards.addCard(cardLoaded);
        }
        cb();
    }

    // loadSounds : Charge les sons depuis la mémoire de l appareil
    this.loadSounds = function(lib, cb) {
        var helper = new SoundHelper(lib, cb);
        helper.loadSoundsFromDevice();
    };
}
