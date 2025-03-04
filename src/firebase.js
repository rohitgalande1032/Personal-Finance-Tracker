// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWIB2chKRTOfzKpLBilU4-enENTs-I0G0",
  authDomain: "finanncely.firebaseapp.com",
  projectId: "finanncely",
  storageBucket: "finanncely.firebasestorage.app",
  messagingSenderId: "1062012488719",
  appId: "1:1062012488719:web:3a1b0579ed7751ca93e77a",
  measurementId: "G-9R90YJK3V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {db, auth, provider, doc, setDoc}
