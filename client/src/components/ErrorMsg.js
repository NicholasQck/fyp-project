import React, { useEffect } from 'react';

// import assets
import '../assets/errorMsg.css';

const ErrorMsg = ({ msg, setErrorMsg }) => {
  useEffect(() => {
    const errMsgTimer = setTimeout(() => {
      setErrorMsg({ show: false, msg: '' });
    }, 2000);
    return () => clearTimeout(errMsgTimer);
  }, [setErrorMsg]);

  return <p className="err-msg">{msg}</p>;
};

export default ErrorMsg;
