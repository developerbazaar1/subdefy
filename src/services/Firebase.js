import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FireBase_apiKey}`,
  authDomain: "subdefy-6f81a.firebaseapp.com",
  projectId: "subdefy-6f81a",
  storageBucket: "subdefy-6f81a.appspot.com",
  messagingSenderId: "824107801910",
  appId: `${process.env.REACT_APP_FireBase_appId}`,
  measurementId: "G-4QYVRBD7RM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, provider, signInWithPopup, facebookProvider };
