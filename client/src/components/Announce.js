import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import assests
import '../assets/dashboard.css';

// import components
import Loading from './Loading';

const Announce = ({ token }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('functionTab', JSON.stringify({ tab: 5 }));
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/announcements', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnnouncements(res.data.announcements);
        setLoading(false);
        console.log(res.data.announcements);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchAnnouncements();
  }, [token]);

  return (
    <>
      {loading && <Loading />}
      <div className="dashboard-selection-container">
        <Link
          to={'/announcements/create_announcement'}
          state={{ createAnnouncement: true }}
          className="disable-default-link"
        >
          <article className="create-selection">
            <div>
              <h1 className="create-selection-text">Create an announcement</h1>
            </div>

            <div>
              <p className="plus-icon">+</p>
            </div>
          </article>
        </Link>

        {announcements.length > 0 &&
          announcements.map((announcement) => {
            const { announcementID, title, postedAt } = announcement;
            return (
              <Link
                to={`/announcements/modify/${announcementID}`}
                key={announcementID}
                state={{ announcement }}
                className="disable-default-link"
              >
                <article className="announcement-display-article">
                  <h2 className="announcement-display-title">{title}</h2>
                  <p className="announcement-display-date">
                    {postedAt.split('T')[0]}
                  </p>
                </article>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Announce;
