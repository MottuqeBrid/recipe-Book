// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM90C-1BojH3fiUkzn1b1i3MOSx3IU3Xk",
  authDomain: "recipe-book-27cb2.firebaseapp.com",
  projectId: "recipe-book-27cb2",
  storageBucket: "recipe-book-27cb2.firebasestorage.app",
  messagingSenderId: "434224059844",
  appId: "1:434224059844:web:32f38b3d6e7b6382564091",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
