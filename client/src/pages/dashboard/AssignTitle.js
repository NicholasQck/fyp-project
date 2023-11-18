import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

// import assets
import '../../assets/assignTitle.css';

// import utils
import { validateSession } from '../../utils/sessionValidation';
import { safFormValidation } from '../../utils/formValidation';

// import components
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modal';
import AlertMsg from '../../components/AlertMsg';

// import data
import { courses } from '../../data/safData';

const AssignTitle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionToken = validateSession();
  const { student } = location.state || {};
  const { userID } = student || {};
  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState([]);
  const [formData, setFormData] = useState({
    studentID: userID,
    titleID: '',
    course: '',
    descBrief: 'Manually allocated by the coordinator',
    hrPerWeek: '1',
    priorSubmission: '1',
    remarks: '',
  });
  const [alertMsg, setAlertMsg] = useState({
    show: false,
    type: 'success',
    msg: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInput = safFormValidation(formData, setAlertMsg);
    if (validInput) {
      try {
        const res = await axios.post('/api/saf', formData, {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        setAlertMsg({ show: true, type: 'success', msg: res.data.msg });
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
        console.log(res);
      } catch (error) {
        const errMsg = error.response.data.msg;
        setAlertMsg({ show: true, type: 'fail', msg: errMsg });
        console.log(error);
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/titles/available', {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      setTitles(res.data.titles);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  }, [sessionToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {!sessionToken && <Modal />}
      {!location.state && <Navigate to="/titles" />}
      {loading && <Loading />}
      <Navbar />
      <main>
        <article className="assign-title-article">
          <form className="assign-title-form">
            <div className="form-control-assign">
              <h1>Assign a title to a student</h1>

              <label htmlFor="studentID">Student ID</label>
              <input
                type="text"
                id="studentID"
                name="studentID"
                value={formData.studentID}
                onChange={handleChange}
                disabled
              />

              <label htmlFor="titleID">Project Title</label>
              <select id="titleID" name="titleID" onChange={handleChange}>
                <option value={''}>&#40;Please select a title&#41;</option>
                {titles.map((title) => {
                  const { titleID, titleName } = title;
                  return (
                    <option key={titleID} value={titleID}>
                      {titleName}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="course">Course of Study</label>
              <select id="course" name="course" onChange={handleChange}>
                <option value={''}>&#40;Please select a course&#41;</option>
                {courses.map((courseName, index) => {
                  return (
                    <option key={index} value={courseName}>
                      {courseName}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="descBrief">
                Brief description about the project
              </label>
              <textarea
                name="descBrief"
                id="descBrief"
                cols="30"
                rows="5"
                value={formData.descBrief}
                disabled
              ></textarea>

              <label htmlFor="hrPerWeek">
                Hour&#40;s&#41; per week dedicated for the project
              </label>
              <select name="hrPerWeek" id="hrPerWeek" onChange={handleChange}>
                {Array.from({ length: 20 }).map((_, index) => {
                  return (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="priorSubmission">
                Submission of materials for feedback should be earlier than
                deadline by
              </label>
              <div className="flex-row-container">
                <select
                  name="priorSubmission"
                  id="priorSubmission"
                  onChange={handleChange}
                >
                  {Array.from({ length: 20 }).map((_, index) => {
                    return (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    );
                  })}
                </select>
                <p>day&#40;s&#41;</p>
              </div>

              <div className="btn-container">
                <button
                  type="submit"
                  className="saf-btn dark-blue-btn "
                  onClick={handleSubmit}
                >
                  Submit
                </button>

                <button
                  className="saf-btn light-blue-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>

              {alertMsg.show && (
                <AlertMsg
                  type={alertMsg.type}
                  msg={alertMsg.msg}
                  setAlertMsg={setAlertMsg}
                />
              )}
            </div>
          </form>
        </article>
      </main>
    </>
  );
};

export default AssignTitle;
