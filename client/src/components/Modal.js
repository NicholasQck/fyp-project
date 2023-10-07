import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Modal = () => {
  const { logout } = useGlobalContext();
  const modalRef = useRef();
  const navigate = useNavigate();

  const handleClick = () => {
    modalRef.current.close();
    logout();
    navigate('/');
  };

  useEffect(() => {
    modalRef.current.showModal();
  }, []);

  return (
    <dialog ref={modalRef} onCancel={handleClick} className="modal">
      <p>Session expired, please login again</p>
      <button onClick={handleClick}>OK</button>
    </dialog>
  );
};

export default Modal;
