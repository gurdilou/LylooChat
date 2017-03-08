export interface MedialHandler {
	play(): void;
	pause(): void;
	seekTo(timeMs: number): void;
	stop(): void;
	isPlaying(): boolean;
	getSoundPosition(): Promise<number>;
}
