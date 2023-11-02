import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import assets
import '../assets/dashboard.css';

// import components
import Loading from './Loading';

const AllSaf = ({ userID, token }) => {
  const [saf, setSaf] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('functionTab', JSON.stringify({ tab: 3 }));
  }, []);

  useEffect(() => {
    const fetchSaf = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/saf/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.saf.length > 0) {
          setSaf(res.data.saf);
        }
        setLoading(false);
        // console.log(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchSaf();
  }, [token]);

  return (
    <>
      {loading && <Loading />}
      <div className="saf-submitted-container">
        {saf.length === 0 ? (
          <div className="empty-display-msg">
            No submissions at the moment...
          </div>
        ) : (
          saf.map((saf) => {
            const { safID, approvalStatus, fypTitle, submittedAt } = saf;
            // console.log(saf);
            return (
              <Link
                to={`/saf/modify/${safID}`}
                state={{
                  saf,
                  isAdmin: true,
                }}
                key={safID}
                className="disable-default-link"
              >
                <article key={safID} className="saf-item">
                  <div className="saf-info-brief">
                    <p className="saf-item-title">{fypTitle.titleName}</p>
                    <p className="saf-item-date">{submittedAt.split('T')[0]}</p>
                  </div>
                  {approvalStatus === 1 && <p className="pending">Pending</p>}
                  {approvalStatus === 2 && <p className="approved">Approved</p>}
                  {approvalStatus === 3 && <p className="rejected">Rejected</p>}
                  {approvalStatus === 4 && (
                    <p className="withdrawn">Withdrawn</p>
                  )}
                </article>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default AllSaf;
