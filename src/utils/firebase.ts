// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVGlb3Za8fU1w2y1WFP-0_FJX7qqNfk6U",
  authDomain: "customer-support-39d0b.firebaseapp.com",
  projectId: "customer-support-39d0b",
  storageBucket: "customer-support-39d0b.appspot.com",
  messagingSenderId: "483653187175",
  appId: "1:483653187175:web:ab3cc6f4967ddee54186c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};