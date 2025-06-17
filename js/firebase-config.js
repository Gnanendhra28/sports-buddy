// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
// PASTE YOUR COPIED FIREBASE CONFIGURATION OBJECT HERE
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH8rLrfMiJslWNXnV_ZZMyqPeBI-EVY_o",
  authDomain: "sports-buddy-2e1ea.firebaseapp.com",
  projectId: "sports-buddy-2e1ea",
  storageBucket: "sports-buddy-2e1ea.firebasestorage.app",
  messagingSenderId: "111295826051",
  appId: "1:111295826051:web:b43333afa2f6555b7833b6",
  measurementId: "G-KSJ0HY9HHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for use in other modules
export { auth, db };