import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";

if (firebase.apps.length === 0) {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };

  firebase.initializeApp(firebaseConfig);
}

let auth = firebase.auth();
let rtdb = firebase.database();
const analytics = firebase.analytics();

if (process.env.NODE_ENV === "development") {
  auth.useEmulator("http://localhost:9099");
  rtdb.useEmulator("localhost", 9000);
}

export { rtdb, auth, analytics };
