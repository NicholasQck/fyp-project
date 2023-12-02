import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate, Link } from 'react-router-dom';

// import assets
import '../../assets/titles.css';

// import components
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';

// import utils
import { validateSession } from '../../utils/sessionValidation';
import { getUserData } from '../../utils/dataProvider';

const TitleDetails = () => {
  const location = useLocation();
  const sessionToken = validateSession();
  const user = getUserData(sessionToken);
  const { roleID } = user || {};
  const { title } = location.state || {};
  const { titleID, titleName, availability, supervisor, fieldArea, titleDesc } =
    title || {};

  return (
    <>
      {!sessionToken && <Modal />}
      {!location.state && <Navigate to="/titles" />}
      <Navbar />
      <main>
        <article className="title-detail-article">
          <h1>{titleName}</h1>
          <h3>{fieldArea}</h3>
          <p>{supervisor?.firstName + ' ' + supervisor?.lastName}</p>
          <br />
          <br />
          <h2>Project Description:</h2>
          <p>{titleDesc}</p>

          {roleID === 3 && (
            <div className="title-detail-btn-container">
              <a
                href="https://outlook.office.com/mail/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="learn-more-btn light-blue-btn">
                  Learn more
                </button>
              </a>
              {/* <Link to={'https://outlook.office.com/mail/'}>
              </Link> */}
              <Link
                to={`/saf/${titleID}`}
                state={{ title }}
                style={{
                  pointerEvents: availability ? '' : 'none',
                }}
              >
                <button
                  className="submit-saf-btn dark-blue-btn"
                  style={{ backgroundColor: availability ? '' : '#808080' }}
                >
                  Submit SAF
                </button>
              </Link>
            </div>
          )}
        </article>
      </main>
    </>
  );
};

export default TitleDetails;
