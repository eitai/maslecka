import React, { useState, useRef, useEffect } from 'react';
import Style from './navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MobileSideBar from './mobileSideBar/MobileSideBar';
import { signOutUser } from '../../firebase';
import { FiChevronDown } from 'react-icons/fi';
import UserPrivateZone from '../user-privat-zone/UserPrivateZone';
import ContactUsNow from '../contract-us-now/ContactUsNow';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddPhoneModal from '../addPhoneModal/AddPhoneModal';

const Navbar = ({ handleAuthForm, isBackgroundColorOn }) => {
  const [isPrivateZoneOpen, setIsPrivateZoneOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [showAddPhoneModal, setShowAddPhoneModal] = useState(false);
  const user = useSelector((state) => state.user.user.displayName);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/', { replace: true });
    signOutUser();
  };
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);

  const PZref = useRef();
  const welcomeUser = useRef();

  useEffect(() => {
    if (isPrivateZoneOpen) {
      const listner = document.addEventListener('mousedown', (event) => {
        if (!PZref.current.contains(event.target)) {
          setIsPrivateZoneOpen(false);
        }
      });

      document.removeEventListener('mousedown', listner);
    }
  }, [isPrivateZoneOpen]);
  const contactus = useRef();

  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event) {
      if (contactus.current && !contactus.current.contains(event.target)) {
        setIsContactUsOpen(false);
      }
    }
    // Bind
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contactus, isContactUsOpen]);

  const userPhoneExist = useSelector((state) => state.user.user.phone);

  const handleMoveToDashboard = () => {
    if (!userPhoneExist) {
      setShowAddPhoneModal(true);
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <>
      {isContactUsOpen && (
        <div ref={contactus}>
          <ContactUsNow
            isContactUsOpen={isContactUsOpen}
            setIsContactUsOpen={setIsContactUsOpen}
          />
        </div>
      )}
      <div
        className={`${isBackgroundColorOn ? Style.background : ''} ${
          Style.container
        }`}
        // onClick={handleClosePopUpOnOutSideClick}
      >
        {isLoggedIn ? (
          <div className={Style.disconnect_btn_container}>
            <button className={Style.btn} onClick={handleLogout}>
              התנתק
            </button>
            <button
              className={Style.user_btn}
              onClick={() => setIsPrivateZoneOpen(true)}
              ref={welcomeUser}
            >
              <div className={Style.welcome_container}>
                <div>{`ברוך הבא`}</div>
                <div>{user}</div>
              </div>
              <FiChevronDown className={Style.icon} />
            </button>
            <button
              className={Style.btn_tomaslecka}
              onClick={handleMoveToDashboard}
            >
              כניסה למערכת{' '}
            </button>
            <div
              ref={PZref}
              id='privateZoneContainer'
              className={`${isPrivateZoneOpen && Style.show_privatezone} ${
                Style.hide_privatezone
              }`}
            >
              <UserPrivateZone
                setIsPrivateZoneOpen={setIsPrivateZoneOpen}
                isPrivateZoneOpen={isPrivateZoneOpen}
              />
            </div>
          </div>
        ) : (
          <button
            className={Style.btn}
            onClick={(e) => handleAuthForm(e, true, 'sign-in')}
          >
            התחבר
          </button>
        )}
        {showAddPhoneModal && (
          <AddPhoneModal setShowAddPhoneModal={setShowAddPhoneModal} />
        )}
        <div className={Style.links}>
          <NavLink to='/'> דף הבית</NavLink>
          <NavLink to='/about-us'>אודות</NavLink>
          <NavLink to='/articles'>כתבות</NavLink>
          <NavLink to='/save-now'>מכרז חסכון</NavLink>
          <button onClick={() => setIsContactUsOpen(true)}>צור קשר</button>
          <NavLink to='/contact-us'>
            <span className={Style.bonus}>הקצב הדיגיטלי</span>
          </NavLink>
        </div>
        <div className={Style.drawer}>
          <MobileSideBar setIsContactUsOpen={setIsContactUsOpen} />
        </div>
        <NavLink to='/'>
          <img
            src={require('../../assets/logo.webp')}
            alt='logo'
            className={Style.logo}
          />
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
