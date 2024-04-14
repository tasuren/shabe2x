import { writable } from "svelte/store";
import { NativeSpeaker } from "./speaker";

export const text = writable("");
export const speaker = writable(new NativeSpeaker());
