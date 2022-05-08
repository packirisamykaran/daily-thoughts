// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABuPkacaBHA644Fol5K5WAVmXmRvF1_KU",
  authDomain: "deep-thoughts-971ff.firebaseapp.com",
  projectId: "deep-thoughts-971ff",
  storageBucket: "deep-thoughts-971ff.appspot.com",
  messagingSenderId: "908199190651",
  appId: "1:908199190651:web:96843961ee4e1368d042de",
  measurementId: "G-8QJTFKL98D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);