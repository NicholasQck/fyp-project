import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import assests
import '../assets/dashboard.css';

// import components
import Loading from './Loading';

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('functionTab', JSON.stringify({ tab: 6 }));
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
        setLoading(false);
        console.log(res);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <>
      {loading && <Loading />}
      <div className="dashboard-selection-container">
        <Link
          to={'/users/create_user'}
          state={{ createUser: true }}
          className="disable-default-link"
        >
          <article className="create-selection">
            <div>
              <h1 className="create-selection-text">Create a user account</h1>
            </div>

            <div>
              <p className="plus-icon">+</p>
            </div>
          </article>
        </Link>

        {users.length > 0 &&
          users.map((user) => {
            const { userID, firstName, lastName } = user;
            return (
              <Link
                to={`/users/modify/${userID}`}
                key={userID}
                state={{ user }}
                className="disable-default-link"
              >
                <article className="single-user-article">
                  <div className="single-user-wrapper">
                    <div className="user-info-container">
                      <h2>{firstName + ' ' + lastName}</h2>
                      <p>{userID}</p>
                    </div>

                    <div className="user-role-container">
                      <p
                        className={
                          (user.roleID === 1 && 'coordinator') ||
                          (user.roleID === 2 && 'supervisor') ||
                          (user.roleID === 3 && 'student')
                        }
                      >
                        {user.role.roleName}
                      </p>
                    </div>
                  </div>
                </article>
                {/* put the styles for a user selection here */}
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Users;
