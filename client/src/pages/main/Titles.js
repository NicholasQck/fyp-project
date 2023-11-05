import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(
    sessionStorage.getItem('search') || ''
  );
  const [titles, setTitles] = useState([]);
  const sessionToken = validateSession();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    let delaySearch;
    const fetchTitles = async () => {
      setLoading(true);
      try {
        if (!searchQuery) {
          const res = await axios.get('/api/titles', {
            headers: { Authorization: `Bearer ${sessionToken}` },
          });
          setTitles(res.data.titles);
          // console.log(res.data.titles);
        } else {
          const res = await axios.get(`/api/titles?search=${searchQuery}`, {
            headers: { Authorization: `Bearer ${sessionToken}` },
          });
          setTitles(res.data.titles);
          // console.log(res.data.titles);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (searchQuery) {
      delaySearch = setTimeout(() => {
        sessionStorage.setItem('search', searchQuery);
        fetchTitles();
      }, 1000);
    } else {
      fetchTitles();
    }
    return () => {
      clearTimeout(delaySearch);
    };
  }, [sessionToken, searchQuery]);

  return (
    <>
      {!sessionToken && <Modal />}
      <Navbar />
      <main>
        <div className="search-bar">
          <form className="search-title-form" onSubmit={handleSubmit}>
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

        {loading ? (
          <Loading />
        ) : (
          <div className="titlelist-container">
            {titles.length === 0 ? (
              <p className="no-title-msg">No titles</p>
            ) : (
              <TitleList titles={titles} />
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Titles;
