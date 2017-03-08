import {MedialHandler} from "../model/mediaHandler";

export class FakeMediaHandler implements MedialHandler {
	// ========================================== VARIABLES =================================
	private playing = false;
	private soundPosition = 0;
	// ========================================== CONSTRUCTOR ===============================

	// ========================================== PRIVATE ===================================
	// ========================================== PRIVILEGED ================================
	public play() {
		this.playing = true;
	}
	public pause() {
		this.playing = false;
	}
	public seekTo(timeMs: number) {
		this.soundPosition = timeMs;
	}
	public stop() {
		this.soundPosition = 0;
		this.playing = false;
	}
	public isPlaying(): boolean {
		return this.playing;
	}
	public getSoundPosition(): Promise<number> {
		let self = this;
		return new Promise((resolve, reject) => {
			self.soundPosition += 100;
			resolve(self.soundPosition);
		});
	}
}
