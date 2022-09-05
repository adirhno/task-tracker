/** @format */

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const { REACT_APP_API_KEY } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: "practice-9dc90.firebaseapp.com",
  projectId: "practice-9dc90",
  storageBucket: "practice-9dc90.appspot.com",
  messagingSenderId: "1091087841718",
  appId: "1:1091087841718:web:a1f4ea5be1eeac73942917",
  measurementId: "G-QGNW3QJWNR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const userAuth = getAuth();

 const promise1 = async () => {
  await signInWithPopup(auth, provider);
};

 const getUser = () => {
  const us = userAuth.currentUser;
  return us;
};

 const db = getFirestore(app);

export { db, getUser, promise1 };
