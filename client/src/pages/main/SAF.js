import React, { useState } from 'react';
import {
  Navigate,
  useLocation,
  useParams,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';

// import assets
import '../../assets/saf.css';

// import components
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import AlertMsg from '../../components/AlertMsg';

// import utils
import { validateSession } from '../../utils/sessionValidation';
import { getUserData } from '../../utils/dataProvider';
import { safFormValidation } from '../../utils/formValidation';

// import data
import { courses } from '../../data/safData';

const SAF = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title_id } = useParams();
  const sessionToken = validateSession();
  const user = getUserData(sessionToken);
  const { userID, fName, lName } = user || {};
  const [safDetails, setSafDetails] = useState({
    studentID: userID || '',
    titleID: title_id,
    course: '',
    descBrief: '',
    hrPerWeek: '1',
    priorSubmission: '1',
  });
  const [alertMsg, setAlertMsg] = useState({
    show: false,
    type: 'success',
    msg: '',
  });

  if (!location.state) {
    return <Navigate to="/titles" />;
  }

  const { title } = location.state;
  const { titleName, supervisor } = title;

  const handleChange = (e) => {
    setSafDetails({ ...safDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInput = safFormValidation(safDetails, setAlertMsg);
    if (validInput) {
      try {
        const res = await axios.post('/api/saf', safDetails, {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        console.log(res);
        setAlertMsg({ show: true, type: 'success', msg: res.data.msg });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        const errMsg = error.response.data.msg;
        console.log(error);
        setAlertMsg({ show: true, type: 'fail', msg: errMsg });
      }
    }
  };

  return (
    <>
      {!sessionToken && <Modal />}
      <Navbar />
      <main>
        <article className="saf-article">
          <form className="saf-form">
            <div className="form-control-saf">
              <h1>Supervision Agreement Form</h1>
              <p className="saf-instructions">
                The purpose of this agreement is to ensure that both the
                supervisor and student understand their roles and
                responsibilities to be upheld by either party during the
                supervision relationship throughout the duration of the Capstone
                Project 1 &#40;PRJ 3213&#41; module. Both the primary supervisor
                and supervisee &#40;student&#41; shall complete, review and sign
                this agreement prior to the commencement of the project.
              </p>

              <label htmlFor="studentName">Student Name</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={(fName || '') + ' ' + (lName || '')}
                disabled
              />

              <label htmlFor="studentID">Student ID</label>
              <input
                type="text"
                id="studentID"
                name="studentID"
                value={userID}
                disabled
              />

              <label htmlFor="supervisorName">Supervisor Name</label>
              <input
                type="text"
                id="supervisorName"
                name="supervisorName"
                value={supervisor.firstName + ' ' + supervisor.lastName}
                disabled
              />

              <label htmlFor="course">Course of Study</label>
              <select id="course" name="course" onChange={handleChange}>
                <option>(Please select a course)</option>
                {courses.map((course, index) => {
                  return (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="titleName">Project Title</label>
              <input
                type="text"
                id="titleName"
                name="titleName"
                value={titleName}
                disabled
              />

              <label htmlFor="descBrief">
                Brief description about the project
              </label>
              <textarea
                name="descBrief"
                id="descBrief"
                cols="30"
                rows="5"
                onChange={handleChange}
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
              <button
                type="submit"
                className="saf-submit-btn dark-blue-btn "
                onClick={handleSubmit}
              >
                Submit
              </button>
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

export default SAF;
