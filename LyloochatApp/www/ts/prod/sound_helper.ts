import {SoundLibrary} from "../model/sound_library";
import {Dialogs} from "../commons/common";
import {Sound} from "../model/sound";
import {SoundList} from "../model/sound_list";
import {RecentsSoundsIOHelper} from "./recents_sounds_io_helper";


export class SoundHelper {
    // ========================================== VARIABLES =================================
    private sound_list: SoundList = null;
    private nbExpected = 0;
    private nbReceived = 0;

    // ========================================== CONSTRUCTOR ===============================
    constructor(private lib: SoundLibrary, private callbackAfterLoad: () => void) {
        this.sound_list = lib.all_sounds;
    }

    // ========================================== PRIVATE ===================================
    //fail : gestion des erreurs fichiers IO
    private fail(error: any) {
        let msg = '';
        switch (error.code) {
            case FileError.NOT_FOUND_ERR:
                msg += 'NOT_FOUND_ERR : File or directory not found';
                break;
            case FileError.SECURITY_ERR:
                msg += 'SECURITY_ERR';
                break;
            case FileError.ABORT_ERR:
                msg += 'ABORT_ERR';
                break;
            case FileError.ENCODING_ERR:
                msg += 'ENCODING_ERR';
                break;
            case FileError.NO_MODIFICATION_ALLOWED_ERR:
                msg += 'NO_MODIFICATION_ALLOWED_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg += 'INVALID_STATE_ERR';
                break;
            case FileError.SYNTAX_ERR:
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
        }

        console.log("Error // " + msg);
        Dialogs.showErrorPanel(msg);
    };

    //_loadSoundFromDirectory : Charge un son depuis l appareil
    private loadSoundFromDirectory(dirLooked: string, entry: FileEntry, index: number, onAllSoundsLoaded: Function) {
        // Chargement du fichier
        let self = this;
        let jsmediatags = window.jsmediatags;

        entry.file(
            (file: File) => {
                try {
                    //Lecture de tous les tags
                    jsmediatags.read(file, {
                            onSuccess: function (tag) {
                                let title = tag.tags.title;
                                let author = tag.tags.author;
                                // Pour obtenir la durée du son, cf après
                                self.getSoundDuration(dirLooked + entry.fullPath, index, function (duration) {
                                    self.onSoundLoaded(true, dirLooked + entry.fullPath, author, title, duration, onAllSoundsLoaded);
                                });
                            },
                            onError: function (error) {
                                console.log("Info : No tags reader found for sound : " + (file ? file.name : "null") + ". Error : " + error);
                                self.onSoundLoaded(false, '', '', '', 0, onAllSoundsLoaded);
                            }
                        }
                    );
                } catch (err) {
                    Dialogs.showErrorPanel(err.message);
                    self.onSoundLoaded(false, '', '', '', 0, onAllSoundsLoaded);
                }
                ;
            }, self.fail
        );
    }

    // _onSoundLoaded : Lorsqu'un son a été chargé
    private onSoundLoaded(success: boolean, path: string, author: string, title: string,
                          duration: number, onAllSoundsLoaded: Function) {
        if (success) {
            let newSound = new Sound(title, author, path, duration);
            this.sound_list.add(newSound);
        }
        this.nbReceived++;

        if (this.nbReceived >= this.nbExpected) {
            console.log("all sounds loaded !");
            onAllSoundsLoaded();
        }
    }

    // _getSoundDuration : Retourne la durée du son
    private getSoundDuration(path: string, index: number, cb: (duration: number) => void) {
        let elemHTML = "<audio controls style='display:none' id='dummyPlayer" + index + "'>";
        elemHTML += "<source src='" + path + "' type='audio/mpeg'> </audio>";
        let dummy_player = $(elemHTML);
        $(document.body).append(dummy_player);
        let vid = <HTMLVideoElement>document.getElementById("dummyPlayer" + index);

        vid.addEventListener('loadedmetadata', function () {
            let duration = vid.duration;

            // console.log("dummy_player.duration : "+vid.duration);

            $("#dummyPlayer" + index).remove();

            cb(duration);
        }, false);
    }

    // _loadAllSoundsFromDevice : Charge la liste complète des sons
    private loadAllSoundsFromDevice(onAllSoundsLoaded: Function) {
        let devicePlatform = device.platform;
        let dirLooked = "";
        let dirMusicName = "";
        if (devicePlatform === "Android") {
            dirLooked = window.cordova.file.externalRootDirectory;
            dirMusicName = "Music";
        }
        //TODO autres plateformes

        let self = this;
        window.resolveLocalFileSystemURL(dirLooked, (dirEntry: DirectoryEntry) => {
            dirEntry.getDirectory(dirMusicName, {create: true, exclusive: false},
                (dirMusic: DirectoryEntry) => {
                    let directoryReader = dirMusic.createReader();
                    directoryReader.readEntries(
                        (entries: FileEntry[]) => {
                            self.nbExpected = entries.length;
                            for (let i = 0; i < entries.length; i++) {
                                (function (index) {
                                    let entry = entries[index];
                                    self.loadSoundFromDirectory(dirLooked, entry, i, onAllSoundsLoaded);
                                })(i);
                            }
                        }, self.fail);
                }, self.fail);
        }, self.fail);
    }

    //_loadRecentSounds : Charge les sons récents et appelle le cb onRecentSoundsLoaded
    private loadRecentSounds(onRecentSoundsLoaded: Function) {
        let helper = new RecentsSoundsIOHelper(this.lib.recents_played);
        helper.load(onRecentSoundsLoaded);
    }

    // ========================================== PRIVILEGED ================================
    // loadSoundsFromDevice : Charge la bibliothèque de sons depuis, et les sons récents depuis l'appareil
    public loadSoundsFromDevice() {
        let self = this;
        self.loadAllSoundsFromDevice(function () {
            self.loadRecentSounds(function () {
                self.lib.onSoundsLoaded();
                self.callbackAfterLoad();
            });
        });
    }
}
