// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBL-BWQu0g71NuJsNfJaVQtWhoTJsmsFvI",
  authDomain: "skillrevital.firebaseapp.com",
  projectId: "skillrevital",
  storageBucket: "skillrevital.appspot.com",
  messagingSenderId: "489508136931",
  appId: "1:489508136931:web:28d7b1bbf0fd9db05e62d6",
  measurementId: "G-80X7DJM0Q8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
