// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { browserLocalPersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjpIvOikRmJHjLidG9E9946zYBCDvdii0",
  authDomain: "swamped-firebase.firebaseapp.com",
  projectId: "swamped-firebase",
  storageBucket: "swamped-firebase.firebasestorage.app",
  messagingSenderId: "1003086037372",
  appId: "1:1003086037372:web:c39614869cc032154424f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: browserLocalPersistence,
});

export const firestore = getFirestore(app);