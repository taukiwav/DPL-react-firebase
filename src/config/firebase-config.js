// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX59l28IWTHX0NEH58bUSPeMCdb5Q7PBg",
  authDomain: "thedpl-187ff.firebaseapp.com",
  projectId: "thedpl-187ff",
  storageBucket: "thedpl-187ff.appspot.com",
  messagingSenderId: "29187392493",
  appId: "1:29187392493:web:b9acc10c772084c8a21de4",
  measurementId: "G-WP1GHHE1X6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
// const analytics = getAnalytics(app);
