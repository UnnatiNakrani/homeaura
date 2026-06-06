import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc1eoy9iQgigFSWzbsLQyUJCIMwp6Y-ww",
  authDomain: "homeaura---react.firebaseapp.com",
  projectId: "homeaura---react",
  storageBucket: "homeaura---react.firebasestorage.app",
  messagingSenderId: "828871972650",
  appId: "1:828871972650:web:6d495c5c846afb7b91b053"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();