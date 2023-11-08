import React, { useState } from 'react';

// import assets
import '../../assets/dashboard.css';

// import data
import { functionBarData } from '../../data/selectionData';

// import utils
import { getUserData } from '../../utils/dataProvider';

// import components
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import SafSubmitted from '../../components/SafSubmitted';
import ProjectTitles from '../../components/ProjectTitles';
import AllSaf from '../../components/AllSaf';
import Manage from '../../components/Manage';
import Announce from '../../components/Announce';
import Users from '../../components/Users';

// import utils
import { validateSession } from '../../utils/sessionValidation';

const Dashboard = () => {
  const sessionToken = validateSession();
  const user = getUserData(sessionToken);
  const { roleID, userID, fName, lName } = user || {};
  const previous = JSON.parse(sessionStorage.getItem('functionTab'));
  const [tab, setTab] = useState(previous?.tab || 1);
  const [logout, setLogout] = useState(false);

  const handleClick = (e) => {
    setTab(parseInt(e.target.getAttribute('data-tag')));
  };

  const userLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('functionTab');
    sessionStorage.removeItem('search');
    // sessionStorage.clear();
    setLogout(true);
  };

  return (
    <>
      {!sessionToken && (
        <Modal msg={logout && 'You have logged out from your account'} />
      )}
      <Navbar />
      <main>
        <article className="dashboard-info-article">
          <div className="dashboard-logo-item">
            <div className="round-profile">
              <h1>S</h1>
            </div>
          </div>

          <div className="dashboard-info-item">
            <h1>
              {(fName?.toUpperCase() || 'USER') +
                ' ' +
                (lName?.toUpperCase() || 'NAME')}
            </h1>
            <p>{userID || 'USER ID'}</p>
          </div>

          <div className="dashboard-logout-item">
            <button onClick={userLogout}>Logout</button>
          </div>
        </article>

        <ul className="function-bar">
          {functionBarData
            .filter((item) => item.role.includes(roleID))
            .map((item) => {
              const isActive = item.id === tab;
              return (
                <li
                  key={item.id}
                  onClick={handleClick}
                  data-tag={item.id}
                  style={{ color: isActive ? '#1463f3' : 'white' }}
                  className="function-bar-item"
                >
                  {item.title}
                </li>
              );
            })}
        </ul>

        <div className="function-zone">
          {tab === 1 && (
            <SafSubmitted
              userID={userID}
              roleID={roleID}
              token={sessionToken}
            />
          )}
          {tab === 2 && (
            <ProjectTitles
              userID={userID}
              fName={fName}
              lName={lName}
              token={sessionToken}
            />
          )}
          {tab === 3 && <AllSaf userID={userID} token={sessionToken} />}
          {tab === 4 && <Manage />}
          {tab === 5 && <Announce token={sessionToken} />}
          {tab === 6 && <Users token={sessionToken} />}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
