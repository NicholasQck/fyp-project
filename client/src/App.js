import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context';

// import assets
import './assets/app.css';

// import pages
import Login from './pages/login/Login';
import Titles from './pages/main/Titles';
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
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
