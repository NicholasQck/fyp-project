import React from 'react';

// import assets
import '../../assets/login.css';
import logo from '../../assets/images/logo.png';

const Login = () => {
  return (
    <div className="login-container">
      <div className="design-container">
        <img src={logo} alt="logo" />
        <p>Unleash your potential!</p>
      </div>
      <div className="form-container">
        <form className="login-form">
          <div className="form-control">
            <h1>Login</h1>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button type="submit" className="btn-submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
