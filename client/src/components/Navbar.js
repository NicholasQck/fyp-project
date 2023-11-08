import React from 'react';
import { Link } from 'react-router-dom';

// import assets
import '../assets/navbar.css';
import logo from '../assets/images/logo.png';
import announceLogo from '../assets/images/announceLogo.png';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <div className="main-logo">
          <Link to={'/titles'} className="disable-default-link">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <ul className="page-links">
          <Link
            to={'/announcements'}
            className="disable-default-link link-flex"
          >
            <li className="nav-list-item">
              <img src={announceLogo} alt="Announcement Logo" />
              <p>Announcements</p>
            </li>
          </Link>

          <Link to={'/dashboard'} className="disable-default-link link-flex">
            <li className="nav-list-item">
              <div className="round-profile">
                <p>S</p>
              </div>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
