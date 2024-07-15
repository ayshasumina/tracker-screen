import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDRlao4xFwCymTI33vtAkYKdsuTflQJ9lQ",
  authDomain: "trackingscreen.firebaseapp.com",
  projectId: "trackingscreen",
  storageBucket: "trackingscreen.appspot.com",
  messagingSenderId: "795098672865",
  appId: "1:795098672865:web:da1044dad85866a15351a0",
  measurementId: "G-Z0CX216BXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
