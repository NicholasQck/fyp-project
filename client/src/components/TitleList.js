import React from 'react';
import { Link } from 'react-router-dom';

// import assets
import '../assets/titles.css';

// import components
import Title from './Title';

const TitleList = ({ titles }) => {
  return (
    <div className="titlelist">
      {titles.map((title) => {
        const { titleID } = title;
        return (
          <Link
            to={`/titles/${titleID}`}
            state={{ title }}
            key={titleID}
            className="disable-default-link"
          >
            <Title title={title} />
          </Link>
        );
      })}
    </div>
  );
};

export default TitleList;
