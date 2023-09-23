import React, { useEffect, useState } from 'react';
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
  const { errorMsg, setError } = useGlobalContext();
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    userID: '',
    roleID: '3',
    fName: '',
    lName: '',
    password: '',
    passwordConfirm: '',
  });

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/users/roles');
      const { roles } = res.data;
      setRoles(roles);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validInput = userFormValidation(formData, setError);
    if (validInput) {
      try {
        const res = await axios.post('/api/users', formData);
        console.log(res);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.errors);
      }
    }
  };

  // un-comment to check form inputs
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    fetchData();
  }, []);

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
                value={formData.userID}
                onChange={(e) => {
                  setFormData({ ...formData, userID: e.target.value });
                }}
              />

              <label htmlFor="roleID">Role</label>
              <select
                onChange={(e) => {
                  setFormData({ ...formData, roleID: e.target.value });
                }}
              >
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
                value={formData.fName}
                onChange={(e) => {
                  setFormData({ ...formData, fName: e.target.value });
                }}
              />

              <label htmlFor="lName">Last Name</label>
              <input
                type="text"
                id="lName"
                value={formData.lName}
                onChange={(e) => {
                  setFormData({ ...formData, lName: e.target.value });
                }}
              />

              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />

              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="text"
                id="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={(e) => {
                  setFormData({ ...formData, passwordConfirm: e.target.value });
                }}
              />

              <button type="submit" className="btn-primary">
                Create
              </button>
              {errorMsg.show && <ErrorMsg msg={errorMsg.msg} />}
            </div>
          </form>
        </article>
      </main>
    </>
  );
};

export default CreateUser;
