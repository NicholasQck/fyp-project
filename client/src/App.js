import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context';

// import pages
import Login from './pages/login/Login';
import Titles from './pages/main/Titles';
import CreateUser from './pages/dashboard/CreateUser';
import Error from './pages/error/Error';

// import components
import Navbar from './components/Navbar';

const App = () => {
  const { isAuthenticated } = useGlobalContext();

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/titles" element={<Titles />} />
        <Route path="/create_user" element={<CreateUser />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
