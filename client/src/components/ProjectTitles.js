import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import assets
import '../assets/dashboard.css';

// import components
import Title from './Title';
import Loading from './Loading';

const ProjectTitles = ({ userID, fName, lName, token }) => {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('functionTab', JSON.stringify({ tab: 2 }));
  }, []);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/titles/user?user_id=${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitles(res.data.titles);
        setLoading(false);
        // console.log(res);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchTitles();
  }, [userID, token]);

  return (
    <>
      {loading && <Loading />}
      <div className="project-titles-container">
        <Link
          to={'/titles/create_title'}
          state={{ userID, fName, lName, createTitle: true }}
          className="disable-default-link"
        >
          <article className="create-title-selection">
            <div>
              <h1 className="create-title-text">Create a project title</h1>
            </div>

            <div>
              <p className="plus-icon">+</p>
            </div>
          </article>
        </Link>

        {titles.length > 0 &&
          titles.map((title) => {
            const { titleID } = title;
            return (
              <Link
                to={`/titles/modify/${titleID}`}
                key={titleID}
                state={{ title }}
                className="disable-default-link"
              >
                <Title title={title} />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default ProjectTitles;
