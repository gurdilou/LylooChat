function SoundHelper(lib, cb){
  // ========================================== VARIABLES =================================
  this.lib = lib;
  this.sound_list = lib.all_sounds;
  this.recent_list = lib.recents_played;
  this.cb = cb;


  this.nbExpected = 0;
  this.nbReceived = 0;

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

       console.log(msg);

      console.log("Error // "+msg);
      showErrorPanel(msg);
  };
  //_loadSoundFromDirectory : Charge un son depuis l appareil
  function _loadSoundFromDirectory(dirLooked, entry, index, onAllSoundsLoaded){
    //Lecture des tags
    var self = this;
    entry.file(function(file){         
      // From local file
      var name = entry.name;
      try{
        jsmediatags.read(file, {
            onSuccess: function(tag) {
              var title = tag.tags.title;
              var author = tag.tags.author;
              var duration = _getSoundDuration.call(self, dirLooked+entry.fullPath, index, function(duration){
                _onSoundLoaded.call(self, true, dirLooked+entry.fullPath, author, title, duration, onAllSoundsLoaded);
              });            
            },
            onError: function(error) {
              showErrorPanel(error.info);
              _onSoundLoaded.call(self, false, '', '', '', 0, onAllSoundsLoaded);
            }
          }
        );   
      }catch(err){
        showErrorPanel(err.message);
        _onSoundLoaded.call(self, false, '', '', '', 0, onAllSoundsLoaded);
      };
    }, self.fail);
  }

  // _onSoundLoaded : Lorsqu'un son a été chargé
  function _onSoundLoaded(success, path, author, title, duration, onAllSoundsLoaded){
    if(success){
      var newSound = new Sound(title, author, path, duration);
      this.sound_list.add(newSound);
    }
    this.nbReceived++;

    if(this.nbReceived >= this.nbExpected) {
      console.log("all sounds loaded !");
      onAllSoundsLoaded();
    }
  }

  // _getSoundDuration : Retourne la durée du son
  function _getSoundDuration(path, index, cb){
    var dummy_player = $("<audio controls style='display:none' id='dummyPlayer"+index+"'> <source src='"+path+"' type='audio/mpeg'> </audio>");
    $(document.body).append(dummy_player);
    var vid = document.getElementById("dummyPlayer"+index);

    vid.addEventListener('loadedmetadata', function(){
      var duration = dummy_player.duration;
       
      console.log("dummyPlayer"+index+" : "+vid.duration);
      $("#dummyPlayer"+index).remove();

      cb(duration);  
    }, false);
  }
  // _loadAllSoundsFromDevice : Charge la liste complète des sons
  function _loadAllSoundsFromDevice(onAllSoundsLoaded) {                       
    var devicePlatform = device.platform;
    var dirLooked = "";
    var dirMusicName = "";
    if(devicePlatform === "Android") {
      dirLooked = cordova.file.externalRootDirectory;
      dirMusicName = "Music";
    }
    //TODO autres plateformes

    var self = this;
    var jsmediatags = window.jsmediatags;
    window.resolveLocalFileSystemURL (dirLooked, function(dirEntry) {
      console.log('cwd : '+dirEntry.fullPath);

      dirEntry.getDirectory(dirMusicName, {create: true, exclusive: false}, function(dirMusic){
        var directoryReader = dirMusic.createReader();
        directoryReader.readEntries(function(entries){
            var i;  
            self.nbExpected = entries.length;
            for (i=0; i< entries.length; i++) {
              (function(i) {
                var entry = entries[i];
                _loadSoundFromDirectory.call(self, dirLooked, entry, i, onAllSoundsLoaded);
              })(i);
            }
        }, self.fail);
      }, self.fail);
    }, self.fail);
  }

  //_loadRecentSounds : Charge les sons récents et appelle le cb onRecentSoundsLoaded
  function _loadRecentSounds(onRecentSoundsLoaded){
    // TODO 
    
    onRecentSoundsLoaded();
  }

  // ========================================== PRIVILEGED ================================
  // loadSoundsFromDevice : Charge la bibliothèque de sons depuis, et les sons récents depuis l'appareil
  this.loadSoundsFromDevice = function(){
    var self = this;
    _loadAllSoundsFromDevice.call(self, function(){
      _loadRecentSounds.call(self, function(){
        self.lib.onSoundsLoaded();
        self.cb();
      });
    });
  }
}
