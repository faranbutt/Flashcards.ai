// Import the functions you need from the SDKs you need
import {getFirestore} from 'firebase/firestore'
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUXZgOt0gAq1IF2nwvxu7sYlaWr-HSxpA",
  authDomain: "cardsai-f722c.firebaseapp.com",
  projectId: "cardsai-f722c",
  storageBucket: "cardsai-f722c.appspot.com",
  messagingSenderId: "557244068986",
  appId: "1:557244068986:web:e2207f3703cf1f4240f7c3",
  measurementId: "G-XSEJS4MBG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};

