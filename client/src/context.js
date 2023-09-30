import React, { useEffect, useContext, useReducer, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import reducer from './reducer';

const AppContext = createContext();
const initState = {
  user: null,
  errorMsg: { show: false, msg: '' },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const setError = (show = false, msg = '') => {
    console.log('test');
    dispatch({ type: 'SET_ERROR', payload: { show, msg } });
  };

  const login = (token) => {
    const decodedUser = jwt_decode(token);
    dispatch({ type: 'SET_USER', payload: { decodedUser, token } });
    localStorage.setItem('user', JSON.stringify({ token }));
  };

  const checkSession = () => {
    const user = localStorage.getItem('user');

    if (!user) {
      logout();
    }

    if (state.user) {
      const { exp } = state.user;
      // convert exp to milliseconds
      const expDateTime = new Date(exp * 1000);
      const currentDateTime = new Date();
      if (currentDateTime > expDateTime) {
        logout();
      }
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT_USER' });
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const newUser = JSON.parse(user);
      const { token } = newUser;
      const decodedToken = jwt_decode(token);
      const expDateTime = new Date(decodedToken.exp * 1000);
      const currentDateTime = new Date();
      if (currentDateTime > expDateTime) {
        logout();
      } else {
        login(token);
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{ ...state, setError, login, checkSession, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
