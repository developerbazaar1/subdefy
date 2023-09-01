import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSw6EXhw-5lqzkKkGwkSr7B1p8H8rKDvo",
  authDomain: "subdefy-c29ee.firebaseapp.com",
  projectId: "subdefy-c29ee",
  storageBucket: "subdefy-c29ee.appspot.com",
  messagingSenderId: "169948186724",
  appId: "1:169948186724:web:79a419451214176bfbf771",
  measurementId: "G-40J5JJFHM0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
