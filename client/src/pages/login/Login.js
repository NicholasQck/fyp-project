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
import AlertMsg from '../../components/AlertMsg';
import { validateSession } from '../../utils/sessionValidation';

const Login = () => {
  const { login } = useGlobalContext();
  const [inputData, setInputData] = useState({
    username: '',
    pass: '',
  });
  const [alertMsg, setAlertMsg] = useState({
    show: false,
    type: 'success',
    msg: '',
  });
  const sessionToken = validateSession();
  const usernameRef = useRef();

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validInput = loginFormValidation(inputData, setAlertMsg);

    if (validInput) {
      try {
        const res = await axios.post('/api/auth/login', inputData);
        const { token } = res.data;
        login(token);
        sessionStorage.setItem('user', JSON.stringify({ token }));
        setInputData({ username: '', pass: '' });
      } catch (error) {
        setAlertMsg({ show: true, type: 'fail', msg: error.response.data.msg });
        console.log(error.response.data.msg);
      }
    }
  };

  // remove when done
  // useEffect(() => {
  //   console.log(inputData);
  // }, [inputData]);

  useEffect(() => {
    usernameRef?.current?.focus();
  }, []);

  return (
    <>
      {sessionToken && <Navigate to="/titles" />}
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
              {alertMsg.show && (
                <AlertMsg
                  type={alertMsg.type}
                  msg={alertMsg.msg}
                  setAlertMsg={setAlertMsg}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
