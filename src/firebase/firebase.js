import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// old db -> tweedle
// const firebaseConfig = {
//   apiKey: "AIzaSyBeoYqcccUo2WIXqKfjTtTDa4sxIoACbXk",
//   authDomain: "tweedle-39236.firebaseapp.com",
//   projectId: "tweedle-39236",
//   storageBucket: "tweedle-39236.appspot.com",
//   messagingSenderId: "694050562181",
//   appId: "1:694050562181:web:bb842aa2ea5749025a89ec",
//   measurementId: "G-V0BJR5TXQR",
// };

// new db tweedles
const firebaseConfig = {
  apiKey: "AIzaSyAPmZXsVXzrX6z-0GZ8dn4xIOLBScduICc",
  authDomain: "tweedles-1aab7.firebaseapp.com",
  projectId: "tweedles-1aab7",
  storageBucket: "tweedles-1aab7.appspot.com",
  messagingSenderId: "860048293546",
  appId: "1:860048293546:web:c059e7ffe8be4d926e9ad3",
  measurementId: "G-TM49G94GSG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
