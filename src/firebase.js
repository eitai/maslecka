import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { UserMock } from './pages/dashboard/userMock';
import { incomeMock } from './components/incomeCharts/incomeMock';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';

import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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

const createUserDocumentFromAuth = async (userAuth, provider) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        provider: provider,
        phone: null,
      });
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
  const userDocRef = db
    .collection(`tables/${uid}/timestamp`)
    .doc(`${timestamp}`);

  const userSnapShot = await getDoc(userDocRef);
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

const getUserIncomeTableDataByTimestamp = async (uid, timestamp) => {
  const userDocRef = db
    .collection(`incomeTables/${uid}/timestamp`)
    .doc(`${timestamp}`);

  const userSnapShot = await getDoc(userDocRef);
  if (!userSnapShot.exists()) {
    const currentDateMoment = moment().format('M:YYYY');
    const newDate = currentDateMoment.split(':').join('');
    let currentTimeStamp = timestamp ? timestamp : newDate;
    await saveIncomeTablesNewTimeStamp(uid, currentTimeStamp);
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

const saveIncomeTablesNewTimeStamp = async (uid, timestamp, updatedTable) => {
  const userDocRef = db
    .collection(`incomeTables/${uid}/timestamp`)
    .doc(`${timestamp}`);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const mockdata = {};
    mockdata.timestamp = incomeMock;
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

const changeFullNameOfUser = async (uid, fullName) => {
  const userDocRef = doc(db, 'users', uid);
  const userSnapShot = await getDoc(userDocRef);

  if (userSnapShot.exists()) {
    updateDoc(userDocRef, { displayName: fullName });
  }
};
const addPhonOfUser = async (uid, phone) => {
  const userDocRef = doc(db, 'users', uid);
  const userSnapShot = await getDoc(userDocRef);

  if (userSnapShot.exists()) {
    updateDoc(userDocRef, { phone: phone });
  }
};

const getUserDetailsfromFireBase = async (uid) => {
  const userDocRef = doc(db, 'users', uid);
  const userSnapShot = await getDoc(userDocRef);

  if (userSnapShot.exists()) {
    const userdata = await getDoc(userDocRef).then((userDetails) => {
      const data = userDetails.data();
      return data;
    });
    return userdata;
  }
};

const deleteUserById = async (uid) => {
  await db.collection('users').doc(uid).delete();
  const user = firebase.auth().currentUser;
  user
    .delete()
    .then(() => {
      // User deleted.
    })
    .catch((error) => {
      // An error ocurred
      // ...
    });
};

export {
  deleteUserById,
  getUserDetailsfromFireBase,
  addPhonOfUser,
  changeFullNameOfUser,
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
  getUserIncomeTableDataByTimestamp,
  saveIncomeTablesNewTimeStamp,
  sendPasswordResetEmail,
};
