import React, { useEffect, useState } from 'react';

import HomePage from './pages/homePage/homePage';
import Dashboard from './pages/dashboard/Dashboard';
import RequireAuth from './components/requireAuth/RequireAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
// import '@coreui/coreui/dist/css/coreui.min.css';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/userSlice';

import { auth, onAuthStateChanged, signOutUser } from './firebase';

const App = () => {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setIsLoggedIn(true);
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
        setIsLoggedIn(false);
        dispatch(logout());
        signOutUser();
      }
    });
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />

        <Route
          path='dashboard'
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
