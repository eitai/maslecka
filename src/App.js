import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/homePage/homePage';
import Dashboard from './pages/dashboard/Dashboard';
import AboutUs from './pages/about-us/AboutUs';
import Articles from './pages/articles/Articles';
import ContactUs from './pages/contact-us/ContactUs';
import SaveNow from './pages/save-now/SaveNow';
import DemoPage from './pages/demo-page/DemoPage';
import RequireAuth from './components/requireAuth/RequireAuth';
import AdPopup from './components/adPopup/AdPopup';

// import '@coreui/coreui/dist/css/coreui.min.css';
// import Test from '../src/pages/test';

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/userSlice';
import { auth, onAuthStateChanged, signOutUser } from './firebase';

const App = () => {
  const dispatch = useDispatch();

  const [isAdPopupOpen, setIsAdPopupOpen] = useState(false);
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

  const clickOnScreenCounterAndOpenPopUp = (e) => {
    const counter = window.localStorage.getItem('counter');

    if (!counter) {
      window.localStorage.setItem('counter', '1');
    } else {
      window.localStorage.setItem('counter', `${Number(counter) + 1}`);
    }

    if (Number(counter) >= 33) {
      setIsAdPopupOpen(true);
      console.log(isAdPopupOpen);
      window.localStorage.setItem('counter', '1');
    }
  };

  return (
    <div onClick={clickOnScreenCounterAndOpenPopUp}>
      <Routes>
        <Route index element={<HomePage />} />
        {/* <Route path='test' element={<Test />} /> */}

        <Route
          path='dashboard'
          element={
            // <RequireAuth isLoggedIn={isLoggedIn}>
            <Dashboard />
            // </RequireAuth>
          }
        />
        <Route path='about-us' element={<AboutUs />} />
        <Route path='articles' element={<Articles />} />
        <Route path='contact-us' element={<ContactUs />} />
        <Route path='save-now' element={<SaveNow />} />
        <Route path='demo-page' element={<DemoPage />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
      {isAdPopupOpen && <AdPopup setIsAdPopupOpen={setIsAdPopupOpen} />}
    </div>
  );
};

export default App;
