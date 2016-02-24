function CardLoaderHelper(listCards, cb){
  // ========================================== VARIABLES =================================
  this.listCards = listCards;
  this.cb = cb;

  this.nbLoaded = 0;
  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================
  function fail(error) {
      var msg = '';
      switch (error.code) { 
          case FileError.NOT_FOUND_ERR: 
            msg += 'NOT_FOUND_ERR : File or directory not found'; 
            break;
          case FileError.SECURITY_ERR :
            msg += 'SECURITY_ERR'; 
            break;
          case FileError.ABORT_ERR :
            msg += 'ABORT_ERR'; 
            break;
          case FileError.NOT_READABLE_ERR :
            msg += 'NOT_READABLE_ERR'; 
            break;   
          case FileError.ENCODING_ERR :
            msg += 'ENCODING_ERR'; 
            break;            
          case FileError.NO_MODIFICATION_ALLOWED_ERR :
            msg += 'NO_MODIFICATION_ALLOWED_ERR'; 
            break;
          case FileError.INVALID_STATE_ERR :
            msg += 'INVALID_STATE_ERR'; 
            break;
          case FileError.SYNTAX_ERR :
            msg += 'SYNTAX_ERR'; 
            break;
          case FileError.NOT_READABLE_ERR: 
            msg += 'NOT_READABLE_ERR : File or directory not readable'; 
            break;
          case FileError.INVALID_MODIFICATION_ERR :
            msg += 'INVALID_MODIFICATION_ERR';  
            break;        
          case FileError.QUOTA_EXCEEDED_ERR :
            msg += 'QUOTA_EXCEEDED_ERR';
            break;
          case FileError.PATH_EXISTS_ERR: 
            msg += 'PATH_EXISTS_ERR : File or directory already exists'; 
            break;
          case FileError.TYPE_MISMATCH_ERR: 
            msg += 'TYPE_MISMATCH_ERR : Invalid filetype'; 
            break;

          default:
            msg += 'Unknown Error : '+error.code; 
            break;
        };


      console.log("Error // "+msg);
      showErrorPanel(msg);
  }
  // _loadOrCreateCard : Charge ou créé une carte de l'appli
  function _loadOrCreateCard(dirApp, i){
    var self = this;

    dirApp.getFile("Card"+i+".json", {create: true}, function(entry){
      entry.file(function(file){

        var reader = new FileReader();
        reader.onloadend = function(evt) {
          if(evt.target.result.data !== undefined){
            _loadCardFromData.call(self, evt.target.result.data, i);
          }else{
            _initializeCard.call(self, i);
          }
        };
        reader.readAsDataURL(file);

      }, fail);
    }, fail);
  }
  // _loadCardFromData : Charge une carte en fonction du json 
  function _loadCardFromData(data, index) {
    console.log("_loadCardFromData ...");
    // TODO
  }

  // _initializeCard : Initialise une carte suivant son index
  function _initializeCard(index) {
    var text ="";
    switch(index) {
      case 0: text = "Oui"; break;
      case 1: text = "Non"; break;
      case 2: text = "S'il te plaît"; break;
      case 3: text = "Merci"; break;
      case 4: text = "Ca va"; break;
      case 5: text = "Content !"; break;
      case 6: text = "Triste"; break;
      case 7: text = "J'ai mal"; break;
      case 8: text = "Pas toute suite"; break;
      case 9: text = "Je vais dormir"; break;
      case 10: text = "Eau stp"; break;
      case 11: text = "Manger stp"; break;
      case 12: text = "Encore"; break;
      case 13: text = "J'ai chaud"; break;
      case 14: text = "J'ai froid"; break;
      case 15: text = "Ok"; break;
    }



    var newCard = new Card_Text(index, text, text);
    this.listCards.replaceCard(index, newCard);
    _notifyCardLoaded.call(this);
  }

  //_notifyCardLoaded : Notifie qu'une carte en plus a été chargé
  function _notifyCardLoaded() {
    console.log("_notifyCardLoaded ++");

    this.nbLoaded = this.nbLoaded + 1;

    if(this.nbLoaded === 16) {
      cb();
    } 
  } 


  // ========================================== PRIVILEGED ================================
  this.loadCardsFromDevice = function() {
/*    var devicePlatform = device.platform;
    var dirLooked = "";
    if(devicePlatform === "Android") {
      dirLooked = cordova.file.externalApplicationStorageDirectory;
    }*/
    //TODO autres plateformes

    var self = this;
    requestFileSystem( LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
      // console.log('cwd : '+dirEntry.fullPath);

      fileSystem.root.getDirectory("Lyloochat", {create: true}, function(dirApp){
        for (i=0; i< 16; i++) {
          (function(i) {
            var cardTmp = new Card("", "");
            self.listCards.addCard(cardTmp);
            _loadOrCreateCard.call(self, dirApp, i);
          })(i);
        }
      }, self.fail);
    }, self.fail);
  };
}
