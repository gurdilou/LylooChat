//Un widget représentant un os
function Widget_Sound(appMenuSound, $parentCtn, sound, addToRecent){
    // ========================================== VARIABLES =================================
    this.$elem_parent = $parentCtn;
    this.$elem_sound = undefined;

    this.sound = sound;
    this.appMenuSound = appMenuSound;
    this.playing = false;
    this.addToRecent = addToRecent; // Si on doit l'ajouter aux sons récents

    


    // ========================================== CONSTRUCTOR ===============================   
    //_onStop : lors de l'arrêt de la lecture
    function _onStop(){
        this.playing = false;
        this.$elem_sound.removeClass("selected");


        var $icon = this.$elem_sound.find(".sound-icon");
        $icon.removeClass("icon-pause");
        $icon.addClass("icon-play");
    }

    // ========================================== PRIVATE =================================== 
    function _getMediaHandler(cb) {
        var self = this;
        if(this.soundHandler === undefined){
            this.appMenuSound.appMenu.app.deviceHandler.createSoundHandler(this.sound, function(){
                _onStop.call(self);
            },
            function(media){
                self.soundHandler = media;
                cb(self.soundHandler);
            });   
        }else{
            cb(this.soundHandler);
        }
    }
    // ========================================== OVERRIDE===================================
    // ========================================== PRIVILEGED ================================
    // ========================================== OVERRIDE ==================================
    // insert : S insère dans le conteneur
    this.insert = function() {
        var context = {
            name: this.sound.name,
            durationStr: this.sound.getDurationStr(),
        };
        var widget_sound_str = Lyloochat.templates.widget_sound(context);

        //Ajout
        this.$elem_parent.append(widget_sound_str);
        this.$elem_sound = this.$elem_parent.children().last();
        
        //events
        var self = this;
        this.$elem_sound.on("tap", function(e){
            if(self.playing){
                self.stop();
            }else{
                self.appMenuSound.onPlay(self, self.addToRecent);  
            }
            
        });
    };

    //play : joue un son et change l'affichage
    this.play = function(){
        var self = this;
        
        this.playing = true;

        _getMediaHandler.call(self, function(mediaHandler){
            mediaHandler.play();
            self.$elem_sound.addClass("selected");

            var $icon = self.$elem_sound.find(".sound-icon");
            $icon.removeClass("icon-play");
            $icon.addClass("icon-pause");
        });
    };
    //stop : quand on veut arrêter la lecture d'une musique
    this.stop = function(){
        var self = this;
        _getMediaHandler.call(self, function(mediaHandler){
            mediaHandler.stop();
            mediaHandler.release();
            _onStop.call(self);
        });
    };
}
