//Un widget représentant un os
function Widget_Sound(appMenuSound, $parentCtn, sound){
    // ========================================== VARIABLES =================================
    this.$elem_parent = $parentCtn;
    this.$elem_sound = undefined;

    this.sound = sound;
    this.appMenuSound = appMenuSound;
    this.playing = false;

    


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
                self.play();   
            }
            
        });
    };

    //play : joue un son et change l'affichage
    this.play = function(){
        this.playing = true;

        this.appMenuSound.onPlay(this);

        var self = this;
        this.sound.play(function(){
            _onStop.call(self);
        });

        this.$elem_sound.addClass("selected");

        var $icon = this.$elem_sound.find(".sound-icon");
        $icon.removeClass("icon-play");
        $icon.addClass("icon-pause");
    };
    //stop : quand on veut arrêter la lecture d'une musique
    this.stop = function(){
        var self = this;
        this.sound.stop(function(){
            _onStop.call(self);
        });
    };
}
