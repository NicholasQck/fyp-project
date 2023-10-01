import React, { useEffect } from 'react';
import { useGlobalContext } from '../context';

// import assets
import '../assets/errorMsg.css';

const ErrorMsg = () => {
  const { errorMsg, setError } = useGlobalContext();

  useEffect(() => {
    console.log(errorMsg);
    const errMsgTimer = setTimeout(() => {
      setError();
    }, 2000);
    return () => clearTimeout(errMsgTimer);
  }, [errorMsg, setError]);

  return <p className="err-msg">{errorMsg.msg}</p>;
};

export default ErrorMsg;
