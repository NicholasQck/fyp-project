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
  // pass isAdmin through Link state for coordinator
  const { saf, isStudent, isSupervisor, isAdmin } = location.state || {};
  const {
    safID,
    studentID,
    titleID,
    course,
    descBrief,
    hrPerWeek,
    priorSubmission,
    remarks,
    approvalStatus,
    student,
    fypTitle,
  } = saf || {};
  const { title } = location.state || {};
  const { titleName, supervisor } = title || {};
  const [safDetails, setSafDetails] = useState({
    studentID: studentID || userID || '',
    titleID: titleID || title_id,
    course: course || '',
    descBrief: descBrief || '',
    hrPerWeek: hrPerWeek ? `${hrPerWeek}` : '1',
    priorSubmission: priorSubmission ? `${priorSubmission}` : '1',
    remarks: remarks || '',
  });
  const [alertMsg, setAlertMsg] = useState({
    show: false,
    type: 'success',
    msg: '',
  });

  // console.log(safDetails);
  const handleChange = (e) => {
    setSafDetails({ ...safDetails, [e.target.name]: e.target.value });
  };

  const checkEdit = () => {
    if (
      course === safDetails.course &&
      descBrief === safDetails.descBrief &&
      hrPerWeek.toString() === safDetails.hrPerWeek &&
      priorSubmission.toString() === safDetails.priorSubmission &&
      remarks === safDetails.remarks
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInput = safFormValidation(safDetails, setAlertMsg);
    if (validInput) {
      try {
        const res = await axios.post('/api/saf', safDetails, {
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

  const handleEdit = async (e) => {
    e.preventDefault();
    const isEdited = checkEdit();
    if (!isEdited) {
      setAlertMsg({ show: true, type: 'fail', msg: 'No changes made' });
    } else {
      const validInput = safFormValidation(safDetails, setAlertMsg);
      if (validInput) {
        try {
          const res = await axios.put(`/api/saf/${safID}`, safDetails, {
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
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `/api/saf/${safID}`,
        { titleID, approvalStatus: 4 },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
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
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `/api/saf/${safID}`,
        { approvalStatus: 2 },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
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
  };

  const handleReject = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `/api/saf/${safID}`,
        { titleID, approvalStatus: 3 },
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      );
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
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/saf/${safID}`, {
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
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  // console.log(safDetails);

  return (
    <>
      {!sessionToken && <Modal />}
      {!location.state && <Navigate to="/titles" />}
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
                value={
                  (student?.firstName || fName || '') +
                  ' ' +
                  (student?.lastName || lName || '')
                }
                disabled
              />

              <label htmlFor="studentID">Student ID</label>
              <input
                type="text"
                id="studentID"
                name="studentID"
                value={studentID || userID}
                disabled
              />

              <label htmlFor="supervisorName">Supervisor Name</label>
              <input
                type="text"
                id="supervisorName"
                name="supervisorName"
                value={
                  (fypTitle?.supervisor.firstName ||
                    supervisor?.firstName ||
                    '') +
                  ' ' +
                  (fypTitle?.supervisor.lastName || supervisor?.lastName || '')
                }
                disabled
              />

              <label htmlFor="course">Course of Study</label>
              <select
                id="course"
                name="course"
                onChange={handleChange}
                defaultValue={course && `${course}`}
                disabled={
                  isAdmin ||
                  isSupervisor ||
                  approvalStatus === 2 ||
                  approvalStatus === 3 ||
                  approvalStatus === 4
                    ? true
                    : false
                }
              >
                <option value={''}>&#40;Please select a course&#41;</option>
                {courses.map((courseName, index) => {
                  if (courseName === course) {
                    return (
                      <option key={index} value={courseName}>
                        {courseName}
                      </option>
                    );
                  }
                  return (
                    <option key={index} value={courseName}>
                      {courseName}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="titleName">Project Title</label>
              <input
                type="text"
                id="titleName"
                name="titleName"
                value={fypTitle?.titleName || titleName}
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
                value={safDetails.descBrief}
                onChange={handleChange}
                disabled={
                  isAdmin ||
                  isSupervisor ||
                  approvalStatus === 2 ||
                  approvalStatus === 3 ||
                  approvalStatus === 4
                    ? true
                    : false
                }
              ></textarea>

              <label htmlFor="hrPerWeek">
                Hour&#40;s&#41; per week dedicated for the project
              </label>
              <select
                name="hrPerWeek"
                id="hrPerWeek"
                onChange={handleChange}
                defaultValue={hrPerWeek && hrPerWeek}
                disabled={
                  isAdmin ||
                  isSupervisor ||
                  approvalStatus === 2 ||
                  approvalStatus === 3 ||
                  approvalStatus === 4
                    ? true
                    : false
                }
              >
                {Array.from({ length: 20 }).map((_, index) => {
                  if (index + 1 === hrPerWeek) {
                    return (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    );
                  }
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
                  defaultValue={priorSubmission && priorSubmission}
                  disabled={
                    isAdmin ||
                    isSupervisor ||
                    approvalStatus === 2 ||
                    approvalStatus === 3 ||
                    approvalStatus === 4
                      ? true
                      : false
                  }
                >
                  {Array.from({ length: 20 }).map((_, index) => {
                    if (index + 1 === priorSubmission) {
                      return (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      );
                    }
                    return (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    );
                  })}
                </select>
                <p>day&#40;s&#41;</p>
              </div>

              <label htmlFor="remarks">Remarks &#40;Optional&#41;</label>
              <textarea
                name="remarks"
                id="remarks"
                cols="30"
                rows="10"
                value={safDetails.remarks}
                onChange={handleChange}
                disabled={
                  isAdmin ||
                  approvalStatus === 2 ||
                  approvalStatus === 3 ||
                  approvalStatus === 4
                    ? true
                    : false
                }
              ></textarea>
              {title && (
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
              )}

              {isSupervisor && (
                <div className="btn-container">
                  <button
                    type="submit"
                    className="saf-btn green-btn "
                    style={{
                      pointerEvents: approvalStatus !== 1 ? 'none' : '',
                      backgroundColor: approvalStatus !== 1 ? '#808080' : '',
                    }}
                    onClick={handleApprove}
                  >
                    {approvalStatus === 2 ? 'Approved' : 'Approve'}
                  </button>

                  <button
                    type="submit"
                    className="saf-btn red-btn "
                    style={{
                      pointerEvents: approvalStatus !== 1 ? 'none' : '',
                      backgroundColor: approvalStatus !== 1 ? '#808080' : '',
                    }}
                    onClick={handleReject}
                  >
                    {approvalStatus === 3 ? 'Rejected' : 'Reject'}
                  </button>

                  <button
                    type="submit"
                    className="saf-btn dark-blue-btn "
                    style={{
                      pointerEvents: approvalStatus !== 1 ? 'none' : '',
                      backgroundColor: approvalStatus !== 1 ? '#808080' : '',
                    }}
                    onClick={handleEdit}
                  >
                    Save
                  </button>

                  <button
                    className="saf-btn light-blue-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {isAdmin && (
                <div className="btn-container">
                  <button
                    type="submit"
                    className="saf-btn red-btn "
                    onClick={handleDelete}
                  >
                    Delete
                  </button>

                  <button
                    className="saf-btn light-blue-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}

              {isStudent && (
                <div className="btn-container">
                  <button
                    type="submit"
                    className="saf-btn dark-blue-btn "
                    style={{
                      pointerEvents: approvalStatus !== 1 ? 'none' : '',
                      backgroundColor: approvalStatus !== 1 ? '#808080' : '',
                    }}
                    onClick={handleEdit}
                  >
                    {(approvalStatus === 1 || approvalStatus === 4) && 'Edit'}
                    {approvalStatus === 2 && 'Approved'}
                    {approvalStatus === 3 && 'Rejected'}
                  </button>

                  <button
                    type="submit"
                    className="saf-btn red-btn "
                    style={{
                      pointerEvents: approvalStatus !== 1 ? 'none' : '',
                      backgroundColor: approvalStatus !== 1 ? '#808080' : '',
                    }}
                    onClick={handleWithdraw}
                  >
                    {approvalStatus === 4 ? 'Withdrawn' : 'Withdraw'}
                  </button>

                  <button
                    className="saf-btn light-blue-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              )}

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
