


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGINGG_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
//   measurementId: process.env.FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyC5bp66GHfwQMtzWEUuwXUI2N7uO5Xm6XQ",
  authDomain: "shre-and-ride-19c08.firebaseapp.com",
  projectId: "shre-and-ride-19c08",
  storageBucket: "shre-and-ride-19c08.appspot.com",
  messagingSenderId: "533796851676",
  appId: "1:533796851676:web:cd88e8eeb440219fe20919",
  measurementId: "G-B874FXMR03"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export default app;
// export default storage;
