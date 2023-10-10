import React, { useEffect } from 'react';

// import assets
import '../assets/alertMsg.css';

const AlertMsg = ({ type, msg, setAlertMsg }) => {
  useEffect(() => {
    const alertMsgTimer = setTimeout(() => {
      setAlertMsg({ show: false, type: '', msg: '' });
    }, 2000);
    return () => clearTimeout(alertMsgTimer);
  }, [setAlertMsg]);

  return <p className={type === 'fail' ? 'err-msg' : 'success-msg'}>{msg}</p>;
};

export default AlertMsg;
