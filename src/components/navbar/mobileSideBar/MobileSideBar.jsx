import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import { FaBars } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Style from './mobileSideBar.module.scss';
const MobileSideBar = ({ setIsContactUsOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div>
        <button onClick={toggleDrawer(true)} className={Style.burger}>
          <FaBars />
        </button>
        <Drawer anchor={'top'} open={isOpen} onClose={toggleDrawer(false)}>
          <List onClick={() => setIsOpen(!isOpen)}>
            <ListItem>
              {' '}
              <NavLink to='/'> דף הבית</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to='/about-us'> אודות</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to='/articles'>כתבות</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to='/save-now'> מכרז חסכון</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to='/contact-us'>הקצב הדיגיטלי</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to='/save-now'>מכרז חסכון</NavLink>
            </ListItem>
            <ListItem>
              <button onClick={() => setIsContactUsOpen(true)}>צור קשר</button>
            </ListItem>
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default MobileSideBar;
