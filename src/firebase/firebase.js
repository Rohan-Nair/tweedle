import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeoYqcccUo2WIXqKfjTtTDa4sxIoACbXk",
  authDomain: "tweedle-39236.firebaseapp.com",
  projectId: "tweedle-39236",
  storageBucket: "tweedle-39236.appspot.com",
  messagingSenderId: "694050562181",
  appId: "1:694050562181:web:bb842aa2ea5749025a89ec",
  measurementId: "G-V0BJR5TXQR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
