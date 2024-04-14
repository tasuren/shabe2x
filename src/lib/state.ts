import { get, writable, type Writable } from "svelte/store";

export interface State {
	volume: number;
	voiceName: string;
}

const rawData = localStorage.getItem("state");
let data: State;
if (rawData) data = JSON.parse(rawData);
else data = { volume: 100, voiceName: "" };

function writableState<T>(defaultValue: T): Writable<T> {
	const w = writable(defaultValue);
	w.subscribe(saveState);
	return w;
}

export const volume = writableState(data.volume);
export const voiceName = writableState(data.voiceName);

export function saveState() {
	try {
		data.volume = get(volume);
		data.voiceName = get(voiceName);
	} catch (e) {
		if (!(e instanceof ReferenceError)) throw e;
	}
	localStorage.setItem("state", JSON.stringify(data));
}
