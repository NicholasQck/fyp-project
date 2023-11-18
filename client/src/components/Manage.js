import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import assets
import '../assets/dashboard.css';

// import components
import Loading from './Loading';

const Manage = ({ token }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('functionTab', JSON.stringify({ tab: 4 }));
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/manage`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data.users);
        setLoading(false);
        // console.log(res);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchStudents();
  }, [token]);

  return (
    <>
      <div className="dashboard-selection-container">
        {loading ? (
          <Loading />
        ) : students.length === 0 ? (
          <p className="empty-display-msg">
            All students have been assigned to a FYP title
          </p>
        ) : (
          students.map((student) => {
            const { userID, firstName, lastName, saf } = student;
            const latestSubmission = saf[0];
            return (
              <Link
                to={`/users/assign/${userID}`}
                key={userID}
                state={{ student }}
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
                          (latestSubmission?.approvalStatus === 1 &&
                            'pending') ||
                          'critical-msg'
                        }
                      >
                        {(latestSubmission?.approvalStatus === 1 &&
                          'Pending') ||
                          (latestSubmission?.approvalStatus === 3 &&
                            'Rejected') ||
                          (latestSubmission?.approvalStatus === 4 &&
                            'Withdrawn') ||
                          'No Submissions'}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Manage;
