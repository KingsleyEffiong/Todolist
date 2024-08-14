// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAbOb_7eTPWfZcOrE--mJyx2nk--w46OSQ",
  authDomain: "todolist-775b1.firebaseapp.com",
  projectId: "todolist-775b1",
  storageBucket: "todolist-775b1.appspot.com",
  messagingSenderId: "447308330813",
  appId: "1:447308330813:web:724a8a97ca9db32281b754",
  measurementId: "G-RBN3QLKYJH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);