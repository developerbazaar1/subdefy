import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCj7LdXxlc-FB1Ivatik6gSAb5S--A5Zs",
  authDomain: "subdefy-6f81a.firebaseapp.com",
  projectId: "subdefy-6f81a",
  storageBucket: "subdefy-6f81a.appspot.com",
  messagingSenderId: "824107801910",
  appId: "1:824107801910:web:0b3911eff7dd3d1e39a797",
  measurementId: "G-4QYVRBD7RM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, provider, signInWithPopup, facebookProvider };
