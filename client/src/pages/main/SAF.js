import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const SAF = () => {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/titles" />;
  }
  const { titleID } = location.state;

  return (
    <div>
      <h1>SAF</h1>
      <p>{titleID}</p>
    </div>
  );
};

export default SAF;
