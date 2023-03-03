import { writable, type Writable } from "svelte/store";
import { browser } from '$app/environment';

const stored: string[] = browser ? JSON.parse(localStorage.getItem('choices')!): null;
export const content: Writable<string[]> = writable(stored && stored.length ? stored : ['', '']);
content.subscribe((value) => browser ? localStorage.setItem('choices', JSON.stringify(value)): null);