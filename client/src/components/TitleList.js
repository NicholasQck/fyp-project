import React from 'react';

// import assets
import '../assets/titles.css';

// import components
import Title from './Title';

const TitleList = ({ titles }) => {
  return (
    <div className="titlelist">
      {titles.map((title) => {
        return <Title key={title.titleID} title={title} />;
      })}
    </div>
  );
};

export default TitleList;
