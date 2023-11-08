import React from 'react';

// import assets
import '../assets/announcement.css';

const Announcement = ({ announcement }) => {
  const { title, content, postedAt } = announcement;
  const dateTime = new Date(postedAt);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  const formattedDateTime = dateTime.toLocaleString('en-US', options);
  console.log(content);

  return (
    <>
      <article className="single-announcement-article">
        <h1 className="announcement-title">{title}</h1>
        <p className="announcement-posted-at">Posted on: {formattedDateTime}</p>
        <pre className="announcement-content">{content}</pre>
      </article>
    </>
  );
};

export default Announcement;
