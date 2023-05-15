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
import SignUp from './components/signup/SignUp';
import SignIn from './components/signin/SignIn';
import Style from '../src/pages/homePage/homePage.module.scss';
// import '@coreui/coreui/dist/css/coreui.min.css';
// import Test from '../src/pages/test';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
// import Draggable from 'react-draggable'; // The default

import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/userSlice';
import {
  auth,
  onAuthStateChanged,
  signOutUser,
  getUserDetailsfromFireBase,
} from './firebase';
import Navbar from '../src/components/navbar/Navbar';

const App = () => {
  const dispatch = useDispatch();

  const [isAdPopupOpen, setIsAdPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isSignedIn, setIsSignIn] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState('');

  const handleAuthForm = (e, isSignin, authType) => {
    e.preventDefault();
    setIsSignIn(isSignin);
    setOpenForm(!openForm);
  };
  const handleCloseForm = (e) => {
    setOpenForm(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setIsLoggedIn(true);
        getUserDetailsfromFireBase(userAuth.uid).then((res) => {
          dispatch(
            login({
              email: userAuth.email,
              uid: userAuth.uid,
              displayName:
                res?.displayName !== ''
                  ? res?.displayName
                  : userAuth.displayName,
              photoUrl: userAuth.photoURL,
              provider: res.provider ? res.provider : '',
              phone: res.phone,
            })
          );
        });
      } else {
        setIsLoggedIn(false);
        dispatch(logout());
        signOutUser();
      }
    });
  }, [dispatch]);

  const clickOnScreenCounterAndOpenPopUp = (e) => {
    const counter = window.localStorage.getItem('counter');

    if (!counter) {
      window.localStorage.setItem('counter', '1');
    } else {
      window.localStorage.setItem('counter', `${Number(counter) + 1}`);
    }

    if (Number(counter) >= 33) {
      setIsAdPopupOpen(true);
      window.localStorage.setItem('counter', '1');
    }
  };

  return (
    <div onClick={clickOnScreenCounterAndOpenPopUp}>
      <div>
        <Navbar handleAuthForm={handleAuthForm} isBackgroundColorOn={true} />
      </div>
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

      <Modal
        open={openForm}
        onClose={() => setOpenForm(false)}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
        onBackdropClick={() => setOpenForm(false)}
      >
        <Fade in={openForm}>
          <Box className={Style.signup_box}>
            {openForm && !isSignedIn && (
              <SignUp closeForm={handleCloseForm} setIsSignIn={setIsSignIn} />
            )}
            {openForm && isSignedIn && (
              <SignIn setIsSignIn={setIsSignIn} closeForm={handleCloseForm} />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default App;
