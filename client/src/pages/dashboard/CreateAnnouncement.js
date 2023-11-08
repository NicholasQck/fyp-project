import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

// import assets
import '../../assets/announcement.css';

// import utils
import { validateSession } from '../../utils/sessionValidation';
import { announcementFormValidation } from '../../utils/formValidation';

// import components
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modal';
import AlertMsg from '../../components/AlertMsg';

const CreateAnnouncement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionToken = validateSession();
  const { createAnnouncement, announcement } = location.state || {};
  const { announcementID, title, content } = announcement || {};
  const [formData, setFormData] = useState({
    title: title || '',
    content: content || '',
  });
  const [alertMsg, setAlertMsg] = useState({
    show: false,
    type: 'success',
    msg: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkEdit = () => {
    if (title === formData.title && content === formData.content) {
      return false;
    } else {
      return true;
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInput = announcementFormValidation(formData, setAlertMsg);

    if (validInput) {
      try {
        const res = await axios.post('/api/announcements', formData, {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        setAlertMsg({ show: true, type: 'success', msg: res.data.msg });
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

  const handleEdit = async (e) => {
    e.preventDefault();
    const isEdited = checkEdit();
    if (!isEdited) {
      setAlertMsg({
        show: true,
        type: 'fail',
        msg: 'No changes made',
      });
    } else {
      const validInput = announcementFormValidation(formData, setAlertMsg);
      if (validInput) {
        try {
          const res = await axios.patch(
            `/api/announcements/${announcementID}`,
            formData,
            {
              headers: { Authorization: `Bearer ${sessionToken}` },
            }
          );
          setAlertMsg({
            show: true,
            type: 'success',
            msg: res.data.msg,
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
          });
          console.log(error);
        }
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/announcements/${announcementID}`, {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      setAlertMsg({
        show: true,
        type: 'success',
        msg: res.data.msg,
      });
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

  return (
    <>
      {!sessionToken && <Modal />}
      {!location.state && <Navigate to="/titles" />}
      <Navbar />
      <main>
        <article className="create-announcement-article">
          <form className="create-announcement-form">
            <div className="form-control-announcement">
              <h1>Make an announcement</h1>

              <label htmlFor="title">Announcement Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

              <label htmlFor="content">Announcement Content</label>
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="28"
                value={formData.content}
                onChange={handleChange}
              ></textarea>

              {createAnnouncement && (
                <div className="btn-container">
                  <button
                    type="submit"
                    className="dark-blue-btn"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>

                  <button className="light-blue-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              )}

              {!createAnnouncement && (
                <div className="btn-container">
                  <button className="dark-blue-btn" onClick={handleEdit}>
                    Edit
                  </button>

                  <button className="red-btn" onClick={handleDelete}>
                    Delete
                  </button>

                  <button className="light-blue-btn" onClick={handleCancel}>
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

export default CreateAnnouncement;
