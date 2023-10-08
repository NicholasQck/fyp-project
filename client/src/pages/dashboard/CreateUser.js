import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
// import { useGlobalContext } from '../../context';

// import assests
import '../../assets/createUser.css';

// import utils
import { userFormValidation } from '../../utils/formValidation';
import { validateSession } from '../../utils/sessionValidation';

//import components
import Loading from '../../components/Loading';
import Navbar from '../../components/Navbar';
import ErrorMsg from '../../components/ErrorMsg';
import Modal from '../../components/Modal';

const CreateUser = () => {
  // const { checkSession } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ show: false, msg: '' });
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    userID: '',
    roleID: '3',
    fName: '',
    lName: '',
    password: '',
    passwordConfirm: '',
  });
  const userIDRef = useRef();
  const sessionToken = validateSession();

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
  }, [sessionToken, setRoles, setLoading]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInput = userFormValidation(formData, setErrorMsg);

    if (validInput) {
      try {
        const res = await axios.post('/api/users', formData, {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        // set success modal (TODO)
        setFormData({
          userID: '',
          roleID: '3',
          fName: '',
          lName: '',
          password: '',
          passwordConfirm: '',
        });
        // remove when done
        console.log(res);
      } catch (error) {
        if (error.response.data.errors) {
          // handle server validation middleware errors
          setErrorMsg({ show: true, msg: error.response.data.errors[0].msg });
        } else {
          // handle server custom errors
          setErrorMsg({ show: true, msg: error.response.data.msg });
        }
        console.log(error.response);
        console.log(error.response.data.errors);
      }
    }
  };

  // un-comment to check form inputs
  // useEffect(() => {
  //   console.log(user);
  // }, []);

  useEffect(() => {
    fetchData();
    userIDRef?.current?.focus();
  }, [fetchData, userIDRef]);

  if (loading) {
    return <Loading />;
  }

  console.log(roles);

  return (
    <>
      {!sessionToken && <Modal />}
      <Navbar />
      <main>
        <article className="create-user-article">
          <form className="create-user-form" onSubmit={handleSubmit}>
            <div className="form-control-crud">
              <h1>Create a user account</h1>

              <label htmlFor="userID">User ID</label>
              <input
                type="text"
                id="userID"
                name="userID"
                ref={userIDRef}
                value={formData.userID}
                onChange={handleChange}
              />

              <label htmlFor="roleID">Role</label>
              <select id="roleID" name="roleID" onChange={handleChange}>
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
              />

              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="text"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />

              <button type="submit" className="btn-primary">
                Create
              </button>
              {errorMsg.show && (
                <ErrorMsg msg={errorMsg.msg} setErrorMsg={setErrorMsg} />
              )}
            </div>
          </form>
        </article>
      </main>
    </>
  );
};

export default CreateUser;
