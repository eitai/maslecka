import React from 'react';
import Style from './navbar.module.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOutUser } from '../../firebase';

const Navbar = ({ handleSignup }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogout = () => {
    signOutUser();
  };

  return (
    <div className={Style.container}>
      {isLoggedIn ? (
        <button className={Style.btn} onClick={handleLogout}>
          התנתק
        </button>
      ) : (
        <button className={Style.btn} onClick={() => handleSignup('sign-in')}>
          התחבר
        </button>
      )}

      <div className={Style.links}>
        <Link to='/'> דף הבית</Link>
        <Link to='/about-us'>אודות</Link>
        <Link to='/articles'>כתבות</Link>
        <Link to='save-now'>חסכו עכשיו</Link>
        <Link to='contact'>צור קשר</Link>
      </div>

      <Link to='/'>
        <img
          src={require('../../assets/logo.png')}
          alt='logo'
          className={Style.logo}
        />
      </Link>
    </div>
  );
};

export default Navbar;
