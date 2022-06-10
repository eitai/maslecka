import React from 'react';
import Style from './navbar.module.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={Style.container}>
      <img
        src={require('../../assets/logo.png')}
        alt='logo'
        className={Style.logo}
      />

      <div className={Style.links}>
        <Link to='/'> דף הבית</Link>
        <Link to='/about-us'>אודות</Link>
        <Link to='/articles'>כתבות</Link>
        <Link to='save-now'>חסכו עכשיו</Link>
        <Link to='contact'>צור קשר</Link>
      </div>
      <button className={Style.btn}>התחבר</button>
    </div>
  );
};

export default Navbar;
