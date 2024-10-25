import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCWsQvQTIlHD00VEy4qXgPXP2tt2Itg87k",
  authDomain: "regform-7ad8f.firebaseapp.com",
  projectId: "regform-7ad8f",
  storageBucket: "regform-7ad8f.appspot.com",
  messagingSenderId: "957573391933",
  appId: "1:957573391933:web:02155d1f79e0d79ef1ec54"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
