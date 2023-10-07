import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// import components
import Modal from './Modal';

const PrivateRoutes = () => {
  let user = JSON.parse(sessionStorage.getItem('user'));

  if (user) {
    const decodedUser = jwt_decode(user.token);
    const { exp } = decodedUser;
    // convert exp to milliseconds
    const expDateTime = new Date(exp * 1000);
    const currentDateTime = new Date();
    if (currentDateTime > expDateTime) {
      sessionStorage.removeItem('user');
      user = null;
    }
  }
  console.log('location');
  useLocation();

  return user ? <Outlet /> : <Modal />;
};

export default PrivateRoutes;
