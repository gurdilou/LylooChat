function PhonegapHandler(){
    this.app = undefined;


    // ========================================== VARIABLES =================================

    // ========================================== CONSTRUCTOR ===============================

    // ========================================== PRIVATE ===================================
    function _onDeviceReady() {
        console.log("ready, plateforme : "+window.device.platform);
        this.app = new App(this);

        if(window.device.platform === "Android"){
            AndroidFullScreen.immersiveMode(function()
                {
                    console.info("It worked!");
                },
                function(error)
                {
                    console.error(error);
                }); 
        }

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
        var helper = new CardLoaderHelper(listCards, cb);
        helper.loadCardsFromDevice();
    }

    // loadSounds : Charge les sons depuis la mémoire de l appareil
    this.loadSounds = function(lib, cb) {
        var helper = new SoundHelper(lib, cb);
        helper.loadSoundsFromDevice();
    };

  //createSoundHandler : Créer un media object pour manipuler un son
  this.createSoundHandler = function(sound, cb_onStop, cb_onCreated) {
    var media = new Media(sound.filepath, function(){
        console.log("media success");
    }, 
    function(err){
        console.log("media err "+err);
    },
    function(status){
        if( (status === Media.MEDIA_PAUSED) || (status === Media.MEDIA_STOPPED) ){
            cb_onStop();
        }
    });
    cb_onCreated(media);
  }
}
