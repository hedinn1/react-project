// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbsV1iINs0AKjUIv7l-U99f1WQjKLe_Bk",
  authDomain: "hvarertonlist.firebaseapp.com",
  projectId: "hvarertonlist",
  storageBucket: "hvarertonlist.appspot.com",
  messagingSenderId: "251972251534",
  appId: "1:251972251534:web:a6ed6eb0d7434ea449bedf",
  measurementId: "G-RBFF9FDT5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app); 