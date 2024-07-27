// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgdc4xqVtDxgLv3HN8Vr3hDij1Mw5nOcQ",
  authDomain: "netflix-gtp-b908f.firebaseapp.com",
  projectId: "netflix-gtp-b908f",
  storageBucket: "netflix-gtp-b908f.appspot.com",
  messagingSenderId: "512950558237",
  appId: "1:512950558237:web:709e8e446dfc36b6d230f4",
  measurementId: "G-4V9SGZ83DS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);