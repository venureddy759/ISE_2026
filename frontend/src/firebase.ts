import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpqtOPB3WcC_zERV4G4iaE0XfuINGRWAo",
  authDomain: "policylens-9a800.firebaseapp.com",
  projectId: "policylens-9a800",
  storageBucket: "policylens-9a800.firebasestorage.app",
  messagingSenderId: "407701761523",
  appId: "1:407701761523:web:070d2af2020b4acf3eb686",
  measurementId: "G-3GMC4K0050"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);