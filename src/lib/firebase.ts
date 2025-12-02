import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD__aqc8LZ1N5IgKFb-3mAHf2qmsWWGGLQ",
  authDomain: "global-friends-ice-breaker.firebaseapp.com",
  projectId: "global-friends-ice-breaker",
  storageBucket: "global-friends-ice-breaker.firebasestorage.app",
  messagingSenderId: "171279887110",
  appId: "1:171279887110:web:5a745977ab60f0496f4c87",
};

export function init() {
  initializeApp(firebaseConfig);
}
