import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import assets
import '../../assets/announcement.css';
// import utils
import { validateSession } from '../../utils/sessionValidation';

// import components
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import Announcement from '../../components/Announcement';

const Announcements = () => {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const sessionToken = validateSession();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/announcements', {
          headers: { Authorization: `Bearer ${sessionToken}` },
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
  }, [sessionToken]);

  return (
    <>
      {!sessionToken && <Modal />}
      <Navbar />
      <main>
        {loading ? (
          <Loading />
        ) : (
          <div className="announcements-container">
            {announcements.length === 0 ? (
              <p className="no-announcement-msg">No Announcements</p>
            ) : (
              announcements.map((announcement) => {
                const { announcementID } = announcement;
                return (
                  <Announcement
                    key={announcementID}
                    announcement={announcement}
                  />
                );
              })
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Announcements;
