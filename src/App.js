import React, { useEffect } from 'react';
import HomePage from './pages/homePage/homePage';
import { Routes, Route } from 'react-router-dom';
// import '@coreui/coreui/dist/css/coreui.min.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  login,
  logout,
  setIsLoggedIn,
  setUserLogOutState,
} from './store/userSlice';
import { auth, onAuthStateChanged, signOutUser } from './firebase';

const App = () => {
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
        signOutUser();
        dispatch(setUserLogOutState());
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        {/* <Route path='dashboard' element={<Dashboard />} />
            <Routes path='customer' element={<Customer />} /> */}
      </Routes>
    </>
  );
};

export default App;
