// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoNOTlkmQT2n0XXZue_zF42toK-OpHUCY",
  authDomain: "my-finance-tracker-d0e7f.firebaseapp.com",
  projectId: "my-finance-tracker-d0e7f",
  storageBucket: "my-finance-tracker-d0e7f.appspot.com",
  messagingSenderId: "212669713728",
  appId: "1:212669713728:web:1ac3fcc4284c059dce3ea5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
