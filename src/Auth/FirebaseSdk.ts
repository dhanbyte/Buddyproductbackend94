
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBpFKdmtttpPtOvcnENKv1oc1KKZVJQhg",
  authDomain: "bazaarbuddy-f8491.firebaseapp.com",
  projectId: "bazaarbuddy-f8491",
  storageBucket: "bazaarbuddy-f8491.firebasestorage.app",
  messagingSenderId: "205906687433",
  appId: "1:205906687433:web:7b7f77cd23c863ffd2a418",
  measurementId: "G-RT734G9ZWJ"
};

// ✅ Initialize Firebase FIRST
const app = initializeApp(firebaseConfig);

// ✅ Then initialize services using the app instance
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const firestore = getFirestore(app)