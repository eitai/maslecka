import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { UserMock } from './pages/dashboard/userMock';

import { doc, getDoc, setDoc, updateDoc } from 'firebase/compat/app';
import moment from 'moment';

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

export const db = firebase.firestore();

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

const saveNewTimeStamp = async (uid, timestamp, updatedTable) => {
  console.log('save ne timestamp run');
  const userDocRef = db
    .collection(`tables/${uid}/timestamp`)
    .doc(`${timestamp}`);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const mockdata = {};
    mockdata.timestamp = UserMock;
    try {
      await setDoc(userDocRef, mockdata);
    } catch (e) {}
  } else {
    const tableUpdatedData = {};
    tableUpdatedData.timestamp = updatedTable;
    try {
      await updateDoc(userDocRef, tableUpdatedData);
    } catch (e) {}
  }

  return userDocRef;
};

const getUserTableDataByTimestamp = async (uid, timestamp) => {
  console.log('get user data run firebase');
  const userDocRef = db
    .collection(`tables/${uid}/timestamp`)
    .doc(`${timestamp}`);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot.exists());
  if (!userSnapShot.exists()) {
    const currentDateMoment = moment().format('M:YYYY');
    const newDate = currentDateMoment.split(':').join('');
    let currentTimeStamp = timestamp ? timestamp : newDate;
    await saveNewTimeStamp(uid, currentTimeStamp);
    setTimeout(() => {
      getUserTableDataByTimestamp(uid, currentTimeStamp);
    }, 1000);
  } else {
    const userdata = await getDoc(userDocRef).then((timestampData) => {
      const data = timestampData.data();

      return data;
    });

    return userdata;
  }
};

export {
  getUserTableDataByTimestamp,
  saveNewTimeStamp,
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
