import React from 'react';
import Style from './navbar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOutUser } from '../../firebase';

const Navbar = ({ handleAuthForm, isBackgroundColorOn }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user.displayName);
  const handleLogout = () => {
    signOutUser();
  };

  const handleStyleEffects = (event) => {
    const navLinkList = document.querySelectorAll(`.navbar_bt`);

    for (const link of navLinkList) {
      link.classList.remove('navbar_bt');
    }
    event.target.classList.add('navbar_bt');
  };
  return (
    <div
      className={`${isBackgroundColorOn ? Style.background : ''} ${
        Style.container
      }`}
    >
      {isLoggedIn ? (
        <div className={Style.disconnect_btn_container}>
          <button className={Style.btn} onClick={handleLogout}>
            התנתק
          </button>
          <div className={Style.welcome_container}>
            <div>{`ברוך הבא`}</div>
            <div>{user}</div>
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

      <div className={Style.links}>
        <NavLink to='/' onClick={handleStyleEffects}>
          {' '}
          דף הבית
        </NavLink>
        <NavLink to='/about-us' onClick={handleStyleEffects}>
          אודות
        </NavLink>
        <NavLink to='/articles' onClick={handleStyleEffects}>
          כתבות
        </NavLink>
        <NavLink to='/save-now' onClick={handleStyleEffects}>
          מכרז חסכון
        </NavLink>
        <NavLink to='/contact-us' onClick={handleStyleEffects}>
          צור קשר
        </NavLink>
      </div>

      <NavLink to='/'>
        <img
          src={require('../../assets/logo.webp')}
          alt='logo'
          className={Style.logo}
        />
      </NavLink>
    </div>
  );
};

export default Navbar;
