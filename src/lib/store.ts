import type { User } from "firebase/auth";
import type { DocumentData } from "firebase/firestore";
import { writable } from "svelte/store";

// This is from auth
export const currentUser = writable<User | null>();

// Those are from firestore
export const players = writable<DocumentData[]>([]);

// Used in registerForm
export const currentUserDoc = writable<DocumentData>();
