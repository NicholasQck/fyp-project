import React from 'react';

// import assets
import '../assets/titles.css';

const Title = ({ title }) => {
  const { titleName, availability, supervisor } = title;
  return (
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
  );
};

export default Title;
