import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Modal = ({ msg }) => {
  const { logout } = useGlobalContext();
  const modalRef = useRef();
  const navigate = useNavigate();

  const handleClick = () => {
    modalRef.current.close();
    logout();
    sessionStorage.removeItem('functionTab');
    sessionStorage.removeItem('search');
    navigate('/');
  };

  useEffect(() => {
    modalRef.current.showModal();
  }, []);

  return (
    <dialog ref={modalRef} onCancel={handleClick} className="modal">
      <p>{msg || 'Session expired, please login again'}</p>
      <button onClick={handleClick}>OK</button>
    </dialog>
  );
};

export default Modal;
