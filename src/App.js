import React, { useEffect, useState } from 'react';

import HomePage from './pages/homePage/homePage';
import Dashboard from './pages/dashboard/Dashboard';
// import RequireAuth from './components/requireAuth/RequireAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
// import '@coreui/coreui/dist/css/coreui.min.css';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/userSlice';

import { auth, onAuthStateChanged, signOutUser } from './firebase';

const RequireAuth = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // console.log(isLoggedIn, 'require');

  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = auth.currentUser;

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
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;
