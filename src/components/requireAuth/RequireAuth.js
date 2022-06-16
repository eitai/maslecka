import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // console.log(isLoggedIn, 'require');

  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }

  return;
};

export default RequireAuth;
