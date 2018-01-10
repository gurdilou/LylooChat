import {ScreenCard} from "./screen_card";
import {WidgetCardSound} from "../cards/widget_card_sound";
import {CardSound} from "../../model/card_sound";
import {LyloochatApp} from "../../app";
import {MedialHandler} from "../../model/mediaHandler";

//Une carte en plein écran avec du texte
export class ScreenCardSound extends ScreenCard {
    // ========================================== VARIABLES =================================
    private soundHandler: MedialHandler = null;
    private progressTimer: number = null;
    private progressBar: JQuery = null;
    private progress: JQuery = null;
    private icon: JQuery = null;

    // ========================================== CONSTRUCTOR ===============================
    constructor(widget_card: WidgetCardSound, private app: LyloochatApp) {
        super(widget_card);
    }

    // ========================================== PRIVATE ===================================
    private isPlayingSound(): boolean {
        return (this.soundHandler !== null) && this.soundHandler.isPlaying();
    }

    private pauseSound() {
        if (this.soundHandler) {
            this.soundHandler.pause();
            window.clearInterval(this.progressTimer);
        }
    }

    private getSoundPosition(): Promise<number> {
        if (this.soundHandler) {
            return this.soundHandler.getSoundPosition();
        }
        return new Promise((resolve, reject) => {
            resolve(0);
        });
    }

    // FIXME TODO tlu : problem when clicking on progress bar
    private playSound() {
        if (this.soundHandler) {
            this.soundHandler.play();
            this.progressTimer = window.setInterval(() => {
                if (this.isPlayingSound()) {
                    let self = this;
                    let cardSound = <CardSound>this.widget_card.card;
                    this.getSoundPosition().then((position) => {
                        let ctnWidth = self.progressBar.width();
                        let width = ((position / (cardSound.sound.duration * 1000)) * ctnWidth);
                        self.progress.attr("style", "width: " + width + "px");
                        if (width > ctnWidth) {
                            self.stopSound();
                            self.icon.removeClass("icon-pause");
                            self.icon.addClass("icon-play");
                        }
                    });
                }
            }, 100);
        }
    }

    private stopSound() {
        if (this.soundHandler) {
            this.soundHandler.stop();
            if (this.progressTimer) {
                window.clearInterval(this.progressTimer);
            }
        }
    }

    private seekSoundPercent(pct: number) {
        if (this.soundHandler) {
            let cardSound = <CardSound>this.widget_card.card;
            let seek = pct * cardSound.sound.duration;
            this.soundHandler.seekTo(seek);
            this.playSound();
        }
    }

    // ========================================== OVERRIDE===================================
    // ========================================== PRIVILEGED ================================
    public display() {
        let cardSound = <CardSound>this.widget_card.card;

        let body = $("body");
        let context = {
            label: cardSound.code,
            sound: cardSound.sound
        };
        let fullscreen_elem = Lyloochat.templates.screen_display_card_sound(context);
        body.append(fullscreen_elem);

        //Make text fill space
        let container = body.children().last();
        let box_text_elem = container.find('.sound-text');
        box_text_elem.boxfit();
        $(window).resize(function () {
            container.attr('style', '');
            box_text_elem.attr('style', '');
            box_text_elem.boxfit();
        });

        //Start sound play
        let self = this;
        this.app.deviceHandler.createSoundHandler(cardSound.sound, handler => {
            self.soundHandler = handler;
            self.playSound();
        });

        //Events
        this.icon = container.find('.player-status');
        this.progressBar = container.find('.progress');
        this.progress = this.progressBar.find('.determinate');
        this.progressBar.on('click', e => {
            self.icon.addClass("icon-pause");
            self.icon.removeClass("icon-play");
            self.seekSoundPercent((e.offsetX / self.progressBar.width()));
            self.progress.attr("style", "width:" + e.offsetX + "px");
        });

        this.icon.on("click", (e) => {
            if (self.isPlayingSound()) {
                self.pauseSound();
                self.icon.removeClass("icon-pause");
                self.icon.addClass("icon-play");
            } else {
                self.playSound();
                self.icon.addClass("icon-pause");
                self.icon.removeClass("icon-play");
            }
        });

        let innerButton = container.find('.card-fs-butt-ok');
        innerButton.on('click', function (e) {
            $(container).remove();
            self.stopSound();
        });

    }
}
