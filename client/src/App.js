import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import pages
import Login from './pages/login/Login';
import Titles from './pages/main/Titles';
import TitleDetails from './pages/main/TitleDetails';
import SAF from './pages/main/SAF';
import Dashboard from './pages/dashboard/Dashboard';
import CreateUser from './pages/dashboard/CreateUser';
import CreateTitle from './pages/dashboard/CreateTitle';
import Error from './pages/error/Error';

// import components
import PrivateRoutes from './components/PrivateRoutes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/titles" element={<Titles />} />
          <Route path="/titles/create_title" element={<CreateTitle />} />
          <Route path="/titles/modify/:title_id" element={<CreateTitle />} />
          <Route path="/titles/:id" element={<TitleDetails />} />
          <Route path="/saf/modify/:saf_id" element={<SAF />} />
          <Route path="/saf/:title_id" element={<SAF />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/create_user" element={<CreateUser />} />
          <Route path="/users/modify/:user_id" element={<CreateUser />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
