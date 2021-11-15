import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
export const database = {
  folders: db.collection("folders"),
  files: db.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
const storage = app.storage();
const auth = app.auth();
export default app;
export { auth, storage };
