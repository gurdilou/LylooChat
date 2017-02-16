declare interface Window {
	jsmediatags: JsMediaTags;
}

declare class JsMediaTags {
	read(file0: File, callback: { onSuccess: (tag: any) => void; onError: (error: any) => void; }): void;
}
