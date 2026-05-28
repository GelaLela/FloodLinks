import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLGKDDrAJjt38xiaN0Uux3U9eTu7oay7A",
  authDomain: "floodlink-8d3ee.firebaseapp.com",
  projectId: "floodlink-8d3ee",
  storageBucket: "floodlink-8d3ee.firebasestorage.app",
  messagingSenderId: "926473952906",
  appId: "1:926473952906:web:560ca2f0a0b69e9eba1773"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);