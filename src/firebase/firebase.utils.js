import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyBHlkk7DL-BW9jR-f1tEqsyMnuodj0vEfE",
  authDomain: "crwn-db-29b9b.firebaseapp.com",
  projectId: "crwn-db-29b9b",
  storageBucket: "crwn-db-29b9b.appspot.com",
  messagingSenderId: "363025193484",
  appId: "1:363025193484:web:19c05b888fb2e1af5c2c29",
  measurementId: "G-P2BVYSX62W",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
