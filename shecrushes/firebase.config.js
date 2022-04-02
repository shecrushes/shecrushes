// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCgQBH1-xEriUYT611DrUYNtB7dKB3J6ZE',
  authDomain: 'shecrushes-736ec.firebaseapp.com',
  projectId: 'shecrushes-736ec',
  storageBucket: 'shecrushes-736ec.appspot.com',
  messagingSenderId: '291297295344',
  appId: '1:291297295344:web:e4484632bfc2887ee07b35',
  measurementId: 'G-QJH90EKXX0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics =
  isSupported() && typeof window !== 'undefined' && getAnalytics(app);
export const db = getFirestore();
