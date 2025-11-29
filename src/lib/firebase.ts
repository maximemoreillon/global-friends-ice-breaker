import { initializeApp } from "firebase/app";
import { writable } from "svelte/store";
import { getAuth, type User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD__aqc8LZ1N5IgKFb-3mAHf2qmsWWGGLQ",
  authDomain: "global-friends-ice-breaker.firebaseapp.com",
  projectId: "global-friends-ice-breaker",
  storageBucket: "global-friends-ice-breaker.firebasestorage.app",
  messagingSenderId: "171279887110",
  appId: "1:171279887110:web:5a745977ab60f0496f4c87",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// export const currentUser = writable<User | null>()

// const auth = getAuth()

// auth.onAuthStateChanged((user) => {
//   currentUser.set(user)
// })
