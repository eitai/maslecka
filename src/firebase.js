import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBoM-OM6Xuj-eXNgidZijfgRX_y5UyPCUE',
  authDomain: 'financial-advisor-b765f.firebaseapp.com',
  projectId: 'financial-advisor-b765f',
  storageBucket: 'financial-advisor-b765f.appspot.com',
  messagingSenderId: '474418338349',
  appId: '1:474418338349:web:dc7f7e232e6a3fe59f36a4',
  measurementId: 'G-VWDNM3Q35G',
};

initializeApp(firebaseConfig);
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = getFirestore();

const auth = firebase.auth();

const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createAt });
    } catch (e) {}
  }
  return userDocRef;
};

const googleProvider = new firebase.auth.GoogleAuthProvider();

const setLastLogin = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const lastLoginDate = new Date();
  await updateDoc(userDocRef, { lastLoginDate: lastLoginDate });
};

const signOutUser = async (userAuth) => signOut(auth);

const signInUserWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOutUser,
  googleProvider,
  createUserDocumentFromAuth,
  setLastLogin,
  signInUserWithEmailAndPassword,
};
