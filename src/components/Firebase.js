// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwbtfdXPWJrY9AeEucregEg8GJuCGEmrk",
  authDomain: "fahad-ebe6c.firebaseapp.com",
  projectId: "fahad-ebe6c",
  storageBucket: "fahad-ebe6c.firebasestorage.app",
  messagingSenderId: "686986507245",
  appId: "1:686986507245:web:cdc2309eb86cea59066de4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
export default app;