import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context';

// import assests
import '../../assets/createUser.css';

// import utils
import { userFormValidation } from '../../utils/formValidation';

//import components
import Navbar from '../../components/Navbar';
import ErrorMsg from '../../components/ErrorMsg';

const CreateUser = () => {
  const { user, errorMsg, setError, checkSession } = useGlobalContext();
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

  const fetchData = useCallback(async () => {
    console.log('test');
    try {
      const res = await axios.get('/api/users/roles', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const { roles } = res.data;
      setRoles(roles);
    } catch (error) {
      console.log(error.response);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInput = userFormValidation(formData, setError);

    if (validInput) {
      try {
        const res = await axios.post('/api/users', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
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
          setError(true, error.response.data.errors[0].msg);
        } else {
          // handle server custom errors
          setError(true, error.response.data.msg);
        }
        console.log(error.response);
        console.log(error.response.data.errors);
      }
    }
  };

  // un-comment to check form inputs
  useEffect(() => {
    checkSession();
  });

  useEffect(() => {
    fetchData();
    userIDRef.current.focus();
  }, [fetchData]);

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <article>
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
                {roles.toReversed().map((role) => {
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
              {errorMsg.show && <ErrorMsg />}
            </div>
          </form>
        </article>
      </main>
    </>
  );
};

export default CreateUser;
