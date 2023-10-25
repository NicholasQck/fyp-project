import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

// import assests
import '../../assets/createUser.css';

// import utils
import {
  userFormValidation,
  userEditFormValidation,
} from '../../utils/formValidation';
import { validateSession } from '../../utils/sessionValidation';

//import components
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import AlertMsg from '../../components/AlertMsg';
import Modal from '../../components/Modal';

const CreateUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionToken = validateSession();
  const { createUser, user } = location.state || {};
  const { userID, roleID, firstName, lastName } = user || {};
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({
    show: false,
    type: 'success',
    msg: '',
  });
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    userID: userID || '',
    roleID: (roleID && `${roleID}`) || '3',
    fName: firstName || '',
    lName: lastName || '',
    password: '',
    passwordConfirm: '',
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users/roles', {
        headers: { Authorization: `Bearer ${sessionToken}` },
      });
      const { roles } = res.data;
      setRoles(roles);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  }, [sessionToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkEdit = () => {
    if (
      userID === formData.userID &&
      roleID === parseInt(formData.roleID) &&
      firstName === formData.fName &&
      lastName === formData.lName
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInput = userFormValidation(formData, setAlertMsg);

    if (validInput) {
      try {
        const res = await axios.post('/api/users', formData, {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        setAlertMsg({ show: true, type: 'success', msg: res.data.msg });
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
        console.log(res);
      } catch (error) {
        if (error.response.data.errors) {
          // handle server validation middleware errors
          setAlertMsg({
            show: true,
            type: 'fail',
            msg: error.response.data.errors[0].msg,
          });
        } else {
          // handle server custom errors
          setAlertMsg({
            show: true,
            type: 'fail',
            msg: error.response.data.msg,
          });
        }
        console.log(error.response);
        console.log(error.response.data.errors);
      }
    }
  };

  const handleUserEdit = async (e) => {
    e.preventDefault();
    const isEdited = checkEdit();
    if (!isEdited) {
      setAlertMsg({
        show: true,
        type: 'fail',
        msg: 'No changes made',
      });
    } else {
      const validInput = userEditFormValidation(formData, setAlertMsg);
      if (validInput) {
        try {
          const res = await axios.patch(`/api/users/${userID}`, formData, {
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

  const handleUserDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/users/${userID}`, {
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // un-comment to check form inputs
  // useEffect(() => {
  //   console.log(user);
  // }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {!sessionToken && <Modal />}
      {!location.state && <Navigate to="/titles" />}
      <Navbar />
      <main>
        <article className="create-user-article">
          <form className="create-user-form">
            <div className="form-control-crud">
              <h1>Create a user account</h1>

              <label htmlFor="userID">User ID</label>
              <input
                type="text"
                id="userID"
                name="userID"
                value={formData.userID}
                onChange={handleChange}
              />

              <label htmlFor="roleID">Role</label>
              <select
                id="roleID"
                name="roleID"
                onChange={handleChange}
                defaultValue={roleID && formData.roleID}
              >
                {roles.map((role) => {
                  return (
                    <option key={role.roleID} value={role.roleID}>
                      {role.roleName}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="fName">First Name</label>
              <input
                type="text"
                id="fName"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
              />

              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                id="lName"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
              />

              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={createUser ? false : true}
              />

              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="text"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                disabled={createUser ? false : true}
              />

              {createUser && (
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

              {!createUser && (
                <div className="btn-container">
                  <button className=" dark-blue-btn" onClick={handleUserEdit}>
                    Update
                  </button>

                  <button className=" red-btn" onClick={handleUserDelete}>
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

export default CreateUser;
