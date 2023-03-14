// Import the functions you need from the SDKs you need
import {firebase} from "./firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDlfrEpgFMXCSRzptMFlTdmS4uOa63oWfE",
    authDomain: "flipgame-d926f.firebaseapp.com",
    projectId: "flipgame-d926f",
    storageBucket: "flipgame-d926f.appspot.com",
    messagingSenderId: "853468877222",
    appId: "1:853468877222:web:d54a491599f7bd58f4ff67",
    measurementId: "G-6TCLE0EB0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app)
