import React, { useState } from 'react';

// import assets
import '../../assets/login.css';
import logo from '../../assets/images/logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername('');
    setPassword('');
    console.log({ username, password });
  };

  return (
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
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="btn-submit-login"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
