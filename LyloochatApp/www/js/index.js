function PhonegapHandler(){
    this.app = undefined;


    // ========================================== VARIABLES =================================

    // ========================================== CONSTRUCTOR ===============================

    // ========================================== PRIVATE ===================================
    function _onDeviceReady() {
        console.log("ready");
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
    //loadCard : Charge une carte depuis la mémoire de l'appareil
    this.loadCard = function(index){
        var cardLoaded = new Card_Text(index, "Card number "+index, "Card number "+index);
        return cardLoaded;
    };

}
