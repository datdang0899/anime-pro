import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByqLd6ri0H4_GF9jQDrpV-TwRGDpdCO_Q",
  authDomain: "anime-hay-8c35a.firebaseapp.com",
  databaseURL: "https://anime-hay-8c35a-default-rtdb.firebaseio.com",
  projectId: "anime-hay-8c35a",
  storageBucket: "anime-hay-8c35a.appspot.com",
  messagingSenderId: "603719044498",
  appId: "1:603719044498:web:84444a006ef738a2db854b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
