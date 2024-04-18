// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1_rGkXeG3jzrhpodmNouEg-D0_lBoiJk",
    authDomain: "comida-tipica-87aaa.firebaseapp.com",
    projectId: "comida-tipica-87aaa",
    storageBucket: "comida-tipica-87aaa.appspot.com",
    messagingSenderId: "89573318530",
    appId: "1:89573318530:web:304771cd137c5f94c7399b"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);
export default auth;