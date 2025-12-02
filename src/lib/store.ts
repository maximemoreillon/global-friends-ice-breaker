import type { User } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";
import { writable } from "svelte/store";

// This is from auth
export const currentUser = writable<User | null>();

// This is from firestore
export const currentUserDoc = writable<DocumentData>();
export const players = writable<DocumentData[]>([]);
