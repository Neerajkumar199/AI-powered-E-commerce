import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-6e38f.firebaseapp.com",
  projectId: "loginonecart-6e38f",
  storageBucket: "loginonecart-6e38f.firebasestorage.app",
  messagingSenderId: "374240364530",
  appId: "1:374240364530:web:473180271d58a53c914d6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const provider = new GoogleAuthProvider();

export {auth , provider}