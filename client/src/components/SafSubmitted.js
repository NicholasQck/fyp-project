import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//  import assets
import '../assets/dashboard.css';

// import utils

// import components
import Loading from './Loading';

const SafSubmitted = ({ userID, roleID, token }) => {
  const [saf, setSaf] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSaf = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/saf?user_id=${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data === null) {
          setSaf([]);
        } else if (Array.isArray(res.data) && res.data.length > 0) {
          setSaf(res.data);
        } else if (typeof res.data === 'object') {
          setSaf([res.data]);
        }
        setLoading(false);
        // console.log(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchSaf();
  }, [userID, token]);
  // console.log(saf);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="saf-submitted-container">
      {saf.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            fontSize: '1.3rem',
          }}
        >
          No submissions at the moment...
        </div>
      ) : (
        saf.map((saf) => {
          const { safID, approved, fypTitle } = saf;
          // console.log(saf);
          return (
            <Link
              to={`/saf/modify/${safID}`}
              state={{
                saf,
                isSupervisor: roleID === 2 || roleID === 1 ? true : false,
                isStudent: roleID === 3 ? true : false,
              }}
              key={safID}
              className="disable-default-link"
            >
              <article key={safID} className="saf-item">
                <p className="saf-item-title">{fypTitle.titleName}</p>
                {approved ? (
                  <p className="approved">Approved</p>
                ) : (
                  <p className="pending">Pending</p>
                )}
              </article>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default SafSubmitted;
