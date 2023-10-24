import React, { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import assets
import '../../assets/titles.css';

// import utils
import { validateSession } from '../../utils/sessionValidation';
import {
  genTitleFormValidation,
  titleFormValidation,
} from '../../utils/formValidation';

// import components
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modal';
import AlertMsg from '../../components/AlertMsg';

const CreateTitle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionToken = validateSession();
  const { userID, fName, lName, createTitle, title } = location.state || {};
  const [genKeyword, setGenKeyword] = useState('');
  const [genTitle, setGenTitle] = useState(
    'Press enter after providing a keyword'
  );
  const [titleDetails, setTitleDetails] = useState({
    proposedBy: title?.proposedBy || userID,
    titleName: title?.titleName || '',
    fieldArea: title?.fieldArea || '',
    titleDesc: title?.titleDesc || '',
  });
  const [alertMsg, setAlertMsg] = useState({
    show: false,
    type: 'success',
    msg: '',
    generative: false,
  });

  const handleInput = (e) => {
    setGenKeyword(e.target.value);
  };

  const handleChange = (e) => {
    setTitleDetails({ ...titleDetails, [e.target.name]: e.target.value });
  };

  const checkEdit = () => {
    if (
      title.titleName === titleDetails.titleName &&
      title.fieldArea === titleDetails.fieldArea &&
      title.titleDesc === titleDetails.titleDesc
    ) {
      return false;
    } else {
      return true;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(genTitle);
      setAlertMsg({
        show: true,
        type: 'success',
        msg: 'Copied to clipboard',
        generative: true,
      });
    } catch (error) {
      setAlertMsg({
        show: true,
        type: 'fail',
        msg: 'Failed to copy to clipboard',
        generative: true,
      });
      console.log(error);
    }
  };

  const handleRecSubmit = async (e) => {
    e.preventDefault();
    const validInput = genTitleFormValidation(genKeyword, setAlertMsg);

    if (validInput) {
      try {
        const res = await axios.post(
          '/api/titles/generative',
          { genKeyword },
          {
            headers: { Authorization: `Bearer ${sessionToken}` },
          }
        );
        setGenTitle(res.data.genTitle);
        console.log(res);
      } catch (error) {
        const errMsg = error.response.data.msg;
        setAlertMsg({
          show: true,
          type: 'fail',
          msg: errMsg,
          generative: true,
        });
        console.log(error);
      }
    }
  };

  const handleTitleSubmit = async (e) => {
    e.preventDefault();
    const validInput = titleFormValidation(titleDetails, setAlertMsg);

    if (validInput) {
      try {
        const res = await axios.post('/api/titles', titleDetails, {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        setAlertMsg({
          show: true,
          type: 'success',
          msg: res.data.msg,
          generative: false,
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
        console.log(res);
      } catch (error) {
        const errMsg = error.response.data.msg;
        setAlertMsg({
          show: true,
          type: 'fail',
          msg: errMsg,
          generative: false,
        });
        console.log(error);
      }
    }
  };

  const handleTitleEdit = async (e) => {
    e.preventDefault();
    const isEdited = checkEdit();
    if (!isEdited) {
      setAlertMsg({
        show: true,
        type: 'fail',
        msg: 'No changes made',
        generative: false,
      });
    } else {
      const validInput = titleFormValidation(titleDetails, setAlertMsg);
      if (validInput) {
        try {
          const res = await axios.put(
            `/api/titles/${title.titleID}`,
            titleDetails,
            { headers: { Authorization: `Bearer ${sessionToken}` } }
          );
          setAlertMsg({
            show: true,
            type: 'success',
            msg: res.data.msg,
            generative: false,
          });
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
          console.log(res);
        } catch (error) {
          const errMsg = error.response.data.msg;
          setAlertMsg({
            show: true,
            type: 'fail',
            msg: errMsg,
            generative: false,
          });
          console.log(error);
        }
      }
    }
  };

  const handleTitleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/titles/${title.titleID}`, {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      setAlertMsg({
        show: true,
        type: 'success',
        msg: res.data.msg,
        generative: false,
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      console.log(res);
    } catch (error) {
      const errMsg = error.response.data.msg;
      setAlertMsg({ show: true, type: 'fail', msg: errMsg, generative: false });
      console.log(error);
    }
  };

  return (
    <>
      {!sessionToken && <Modal />}
      {!location.state && <Navigate to="/titles" />}
      <Navbar />
      <main>
        <article className="create-title-article">
          <h1>Create a project title</h1>
          <p className="gen-title-msg">Need some inspiration?</p>

          <form className="title-gen-form" onSubmit={handleRecSubmit}>
            <div className="form-control-title">
              <label htmlFor="titleGen">
                Generate a project title suggestion by providing a keyword
              </label>
              <input
                type="text"
                id="titleGen"
                name="titleGen"
                value={genKeyword}
                onChange={handleInput}
                disabled={createTitle ? false : true}
              />
            </div>
          </form>

          <div className="gen-title-display">
            <p
              key={genTitle}
              className="typewriter"
              onAnimationEnd={(e) => {
                e.currentTarget.classList.add('animation-end');
              }}
            >
              {genTitle}
            </p>
            <button
              className="copy-btn"
              onClick={copyToClipboard}
              disabled={createTitle ? false : true}
            ></button>
          </div>

          {alertMsg.show && alertMsg.generative && (
            <AlertMsg
              type={alertMsg.type}
              msg={alertMsg.msg}
              setAlertMsg={setAlertMsg}
            />
          )}

          <form className="create-title-form">
            <div className="form-control-title">
              <label htmlFor="supervisorName">Supervisor Name</label>
              <input
                type="text"
                id="supervisorName"
                name="supervisorName"
                value={
                  (title?.supervisor.firstName || fName) +
                  ' ' +
                  (title?.supervisor.lastName || lName)
                }
                disabled
              />

              <label htmlFor="titleName">Project Title</label>
              <input
                type="text"
                id="titleName"
                name="titleName"
                value={titleDetails.titleName}
                onChange={handleChange}
              />

              <label htmlFor="fieldArea">Project Field</label>
              <input
                type="text"
                id="fieldArea"
                name="fieldArea"
                value={titleDetails.fieldArea}
                onChange={handleChange}
              />

              <label htmlFor="titleDesc">Description about the project</label>
              <textarea
                name="titleDesc"
                id="titleDesc"
                cols="30"
                rows="5"
                value={titleDetails.titleDesc}
                onChange={handleChange}
              ></textarea>

              {createTitle && (
                <button
                  type="submit"
                  className="title-btn dark-blue-btn"
                  onClick={handleTitleSubmit}
                >
                  Create
                </button>
              )}

              {!createTitle && (
                <div className="modify-btn-container">
                  <button
                    type="submit"
                    className=" dark-blue-btn"
                    onClick={handleTitleEdit}
                  >
                    Update
                  </button>

                  <button
                    type="submit"
                    className=" red-btn"
                    onClick={handleTitleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}

              {alertMsg.show && !alertMsg.generative && (
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

export default CreateTitle;
