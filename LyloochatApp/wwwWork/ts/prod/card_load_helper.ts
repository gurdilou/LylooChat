import {CardList} from "../model/listCards";
import {Dialogs} from "../commons/common";
import {Card} from "../model/card";
import {CardText} from "../model/card_text";

export class CardLoaderHelper {
	// ========================================== VARIABLES =================================
	private nbLoaded: number = 0;
	// ========================================== CONSTRUCTOR ===============================
	constructor(private listCards: CardList, private callbackAfterLoad: Function) {
	}
	// ========================================== PRIVATE ===================================
	private fail(error: FileError) {
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
			case FileError.NOT_READABLE_ERR:
				msg += 'NOT_READABLE_ERR';
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
			case FileError.INVALID_MODIFICATION_ERR:
				msg += 'INVALID_MODIFICATION_ERR';
				break;
			case FileError.QUOTA_EXCEEDED_ERR:
				msg += 'QUOTA_EXCEEDED_ERR';
				break;
			case FileError.PATH_EXISTS_ERR:
				msg += 'PATH_EXISTS_ERR : File or directory already exists';
				break;
			case FileError.TYPE_MISMATCH_ERR:
				msg += 'TYPE_MISMATCH_ERR : Invalid filetype';
				break;

			default:
				msg += 'Unknown Error : ' + error.code;
				break;
		};


		console.log("Error // " + msg);
		Dialogs.showErrorPanel(msg);
	}
	// _loadOrCreateCard : Charge ou créé une carte de l'appli
	private loadOrCreateCard(dirApp: DirectoryEntry, i: number) {
		let self = this;

		dirApp.getFile("Card" + i + ".json", { create: true }, function(entry: FileEntry) {
			entry.file(function(file: File) {

				let reader = new FileReader();
				reader.onloadend = function(evt: ProgressEvent) {
					if ((reader.result !== undefined) && (reader.result !== "")) {
						let cardJSON = JSON.parse(reader.result);
						self.loadCardFromData(cardJSON, i);
					} else {
						self.initializeCard(i);
					}
				};
				reader.readAsText(file);

			}, self.fail);
		}, self.fail);
	}
	// _loadCardFromData : Charge une carte en fonction du json
	private loadCardFromData(data: any, index: number) {
		console.log("_loadCardFromData ... : " + JSON.stringify(data));
		// TODO
	}

	// _initializeCard : Initialise une carte suivant son index
	private initializeCard(index: number) {
		let text = "";
		switch (index) {
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



		let newCard = new CardText("" + index, text, text);
		this.listCards.replaceCard(index, newCard);
		this.notifyCardLoaded();
	}

	//_notifyCardLoaded : Notifie qu'une carte en plus a été chargé
	private notifyCardLoaded() {
		console.log("_notifyCardLoaded ++");

		this.nbLoaded = this.nbLoaded + 1;
		if (this.nbLoaded === 16) {
			this.callbackAfterLoad();
		}
	}


	// ========================================== PRIVILEGED ================================
	public loadCardsFromDevice() {
		/*	let devicePlatform = device.platform;
			let dirLooked = "";
			if(devicePlatform === "Android") {
			  dirLooked = cordova.file.externalApplicationStorageDirectory;
			}*/
		//TODO autres plateformes

		let self = this;
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
			// console.log('cwd : '+dirEntry.fullPath);

			fileSystem.root.getDirectory("Lyloochat", { create: true }, function(dirApp) {
				for (let i = 0; i < 16; i++) {
					(function(index) {
						let cardTmp = new Card("", "");
						self.listCards.addCard(cardTmp);
						self.loadOrCreateCard(dirApp, index);
					})(i);
				}
			}, self.fail);
		}, self.fail);
	};
}
