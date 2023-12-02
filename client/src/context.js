import React, { useContext, useReducer, createContext } from 'react';
import jwt_decode from 'jwt-decode';
import reducer from './reducer';

const AppContext = createContext();
const initState = {
  user: null,
  errorMsg: { show: false, msg: '' },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const login = (token) => {
    const decodedUser = jwt_decode(token);
    dispatch({ type: 'SET_USER', payload: { decodedUser } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT_USER' });
  };

  return (
    <AppContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
