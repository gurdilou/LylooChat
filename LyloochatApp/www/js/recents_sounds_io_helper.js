//Une carte avec du dessin
function RecentsSounds_IOHelper(listSounds){
  // ========================================== VARIABLES =================================
  this.listSounds = listSounds;


  const SAVED_FILENAME = "recents.json";
  // const RECENTS_DIRECTORY = cordova.file.dataDirectory;
  const RECENTS_DIRECTORY = cordova.file.externalRootDirectory;

  // ========================================== CONSTRUCTOR ===============================

  // ========================================== PRIVATE ===================================
  //fail : gestion des erreurs fichiers IO
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

      console.log("Error // "+msg);
      showErrorPanel(msg);
  };

  // _addSoundJSON : Transforme un son en json pour être sauvegardé
  function _addSoundJSON(list, sound) {
    var soundJSON = {};
    soundJSON.name = sound.name;
    soundJSON.author = sound.author;
    soundJSON.filepath = sound.filepath;
    soundJSON.duration = sound.duration;

    list.push(soundJSON);
  }
  // _saveListToFile : Sauvegarde une liste dans un fichier 
  function _saveListToFile(list, cb) {
    var self = this;
    var dirLooked = RECENTS_DIRECTORY;

    requestFileSystem( LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
      fileSystem.root.getDirectory("Lyloochat", {create: true}, function(dirEntry){
        dirEntry.getFile(SAVED_FILENAME,  {create: true}, function(fileHandler) {
          fileHandler.createWriter(function(fileWriter){
            //Ecriture du fichier
            fileWriter.onwriteend = function(e) {
              cb();
            };

            fileWriter.onerror = function(e) {
              showErrorPanel(e.toString());
              cb();
            };

            var blob = new Blob([JSON.stringify(list)], {type: 'application/json'});
            fileWriter.write(blob);
          }, self.fail);
        }, self.fail);
      }, self.fail);
    }, self.fail);
  }

  // _loadSoundsFromFile : Charge le fichier JSON contenant les sons récemment joués
  function _loadSoundsFromFile(cb) {
    var self = this;
    var dirLooked = RECENTS_DIRECTORY;

    requestFileSystem( LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
      fileSystem.root.getDirectory("Lyloochat", {create: true}, function(dirEntry){
        dirEntry.getFile(SAVED_FILENAME,  {create: true}, function(fileHandler) {
          fileHandler.file(function(file){

            var reader = new FileReader();
            reader.onloadend = function(evt) {
              if( (evt.target.result !== undefined) && (evt.target.result !== "") ){
                var soundsJSON = JSON.parse(evt.target.result);
                cb(soundsJSON);
              }else{
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
  this.save = function(cb) {
    var listSoundsJSON = [];
    var self = this;
    for(var i=0; i < this.listSounds.size(); i++) {
      var sound = this.listSounds.get(i);

      _addSoundJSON.call(this, listSoundsJSON, sound);
    }

    _saveListToFile(listSoundsJSON, cb);
  };
  // load : Charge les sons récemment joués
  this.load = function(cb) {
    _loadSoundsFromFile.call(this, function(listSoundsJSON){
      if(listSoundsJSON !== undefined){
        for(var i=0; i < listSoundsJSON.length; i++) {
          var soundJSON = listSoundsJSON[i];

          var name = soundJSON.name;
          var author = soundJSON.author;
          var filepath = soundJSON.filepath;
          var duration = soundJSON.duration;
          var newSound = new Sound(name, author, filepath, duration);
          listSounds.add(newSound);
        }
      }
      cb();


    });
  };

}
