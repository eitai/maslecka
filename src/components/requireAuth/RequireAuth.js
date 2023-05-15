import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, onAuthStateChanged } from '../../firebase';

const RequireAuth = ({ children, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(true);

  async function verify() {
    await onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setIsLoading(false);
      } else {
        return;
      }
    });
  }
  useEffect(() => {
    verify();
  });
  if (!isLoggedIn) {
    return <Navigate to='/' />;
  }

  return children;
};

export default RequireAuth;
