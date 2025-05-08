// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBkP8Eoc09GkPUeGW7OGbDNFGr-gMKg_p8",
  authDomain: "portfolio-760f5.firebaseapp.com",
  projectId: "portfolio-760f5",
  storageBucket: "portfolio-760f5.firebasestorage.app",
  messagingSenderId: "981617799716",
  appId: "1:981617799716:web:9904b130824bd172805eb1",
  measurementId: "G-ZR0DR90G5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
