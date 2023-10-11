import React from 'react';
import { Link } from 'react-router-dom';

// import assets
import '../assets/titles.css';

const Title = ({ title }) => {
  const { titleID, titleName, availability, supervisor } = title;
  return (
    <Link
      to={`/titles/${titleID}`}
      state={{ title }}
      className="disable-default-link"
    >
      <article className="single-title-article">
        <div className="single-title-wrapper">
          <div className="title-detail-brief">
            <h2>{titleName}</h2>
            <p>{supervisor.firstName + ' ' + supervisor.lastName}</p>
          </div>

          <div className="availability-container">
            <p className={availability ? 'available' : 'taken'}>
              {availability ? 'Available' : 'Taken'}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Title;
