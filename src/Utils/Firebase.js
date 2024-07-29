// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBULUMXE06ODMz56U2V2COH1OcdrzY-lpo",
  authDomain: "netflixgpt-77ddb.firebaseapp.com",
  projectId: "netflixgpt-77ddb",
  storageBucket: "netflixgpt-77ddb.appspot.com",
  messagingSenderId: "620039193616",
  appId: "1:620039193616:web:e25cb979f8a4927c9df695",
  measurementId: "G-B5D427457T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
