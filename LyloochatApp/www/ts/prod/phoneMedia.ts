import {MedialHandler} from "../model/mediaHandler";
export class PhoneMediaHandler implements MedialHandler {
	private playing = false;
    private sound: Media = null;

	constructor(filepath: string) {
		this.sound = new Media(filepath,
			function() {
				console.log("media success");
			},
			function(mediaError: MediaError) {
				console.log("media err " + mediaError);
			}
		);
	}

	play(): void {
		this.playing = true;
		this.sound.play();
	}
	pause(): void {
		this.playing = false;
		this.sound.pause();
	}
	public seekTo(timeMs: number) {
		this.sound.seekTo(timeMs);
		this.playing = true;
		this.sound.play();
	}
	stop(): void {
		this.playing = false;
		this.sound.stop();
		this.sound.release();
	}
	isPlaying(): boolean {
		return this.playing;
	}

	getSoundPosition(): Promise<number> {
		let self = this;
		return new Promise<number>((resolve, reject) => {
			self.sound.getCurrentPosition(() => {
				resolve(self.sound.position);
			});
		});
	}
}
