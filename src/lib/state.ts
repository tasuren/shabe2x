import { get, writable, type Writable } from "svelte/store";
import { NativeSpeaker } from "./components/app/speaker";

export interface State {
	volume: number;
	voiceName: string;
}

const rawData = localStorage.getItem("state");
let data: State;
if (rawData) data = JSON.parse(rawData);
else data = { volume: 100, voiceName: "" };

export function saveState() {
	try {
		data.volume = get(volume);
		data.voiceName = get(voiceName);
	} catch (e) {
		if (!(e instanceof ReferenceError)) throw e;
	}
	localStorage.setItem("state", JSON.stringify(data));
}

function writableState<T>(defaultValue: T): Writable<T> {
	const w = writable(defaultValue);
	w.subscribe(saveState);
	return w;
}

export const volume = writableState(data.volume);
export const voiceName = writableState(data.voiceName);

export const text = writable("");
export const speaker = writable(new NativeSpeaker());
