import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../context';

// import assets
import '../../assets/titles.css';

// import utils
import { validateSession } from '../../utils/sessionValidation';
// import pages

// import components
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import TitleList from '../../components/TitleList';

const Titles = () => {
  const { checkSession } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [titles, setTitles] = useState([]);
  const sessionToken = validateSession();

  const fetchTitles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/titles', {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      setTitles(res.data.titles);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [sessionToken, setTitles, setLoading]);

  useEffect(() => {
    fetchTitles();
  }, [fetchTitles]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!sessionToken && <Modal />}
      <Navbar />
      <main>
        <div className="search-bar">
          <form className="search-title-form">
            <div className="form-control-search">
              <input
                type="text"
                id="searchTitle"
                name="searchTitle"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
            </div>
          </form>
        </div>

        <div className="titlelist-container">
          <TitleList titles={titles} />
        </div>
        <button onClick={checkSession}>check</button>
        <Link to="/titles/details">title detail</Link>
        <Link to="/users/create_user">create user</Link>
      </main>
    </>
  );
};

export default Titles;
