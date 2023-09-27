import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../context';

// import assets
import '../../assets/login.css';
import logo from '../../assets/images/logo.png';

// import utils
import { loginFormValidation } from '../../utils/formValidation';

// import components
import ErrorMsg from '../../components/ErrorMsg';

const Login = () => {
  const { user, login, errorMsg, setError } = useGlobalContext();
  const [inputData, setInputData] = useState({
    username: '',
    pass: '',
  });
  const usernameRef = useRef();

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInput = loginFormValidation(inputData, setError);

    if (validInput) {
      try {
        const res = await axios.post('/api/auth/login', inputData);
        const { token } = res.data;
        login(token);
        setInputData({ username: '', pass: '' });
        console.log(res.data);
      } catch (error) {
        setError(true, error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  };

  // remove when done
  // useEffect(() => {
  //   console.log(inputData);
  // }, [inputData]);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <>
      {user && <Navigate to="/create_user" />}
      <div className="login-container">
        <div className="design-container">
          <img src={logo} alt="logo" />
          <p>Unleash your potential!</p>
        </div>
        <div className="form-container-login">
          <form className="login-form">
            <div className="form-control-login">
              <h1>Login</h1>
              <input
                type="text"
                id="userIDLogin"
                name="username"
                ref={usernameRef}
                placeholder="username"
                value={inputData.username}
                onChange={handleChange}
              />
              <input
                type="password"
                id="passwordLogin"
                name="pass"
                placeholder="password"
                value={inputData.pass}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn-submit-login"
                onClick={handleSubmit}
              >
                Login
              </button>
              {errorMsg.show && <ErrorMsg />}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
