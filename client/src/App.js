import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import pages
import Login from './pages/login/Login';
import Titles from './pages/main/Titles';
import TitleDetails from './pages/main/TitleDetails';
import SAF from './pages/main/SAF';
import CreateUser from './pages/dashboard/CreateUser';
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
          <Route path="/titles/:id" element={<TitleDetails />} />
          <Route path="/saf/:titleID" element={<SAF />} />
          <Route path="/users/create_user" element={<CreateUser />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
