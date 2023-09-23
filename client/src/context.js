import React, { useContext, useReducer, createContext } from 'react';
import reducer from './reducer';

const AppContext = createContext();
const initState = {
  isAuthenticated: false,
  errorMsg: { show: false, msg: '' },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const setError = (show = false, msg = '') => {
    console.log('test');
    dispatch({ type: 'SET_ERROR', payload: { show, msg } });
  };

  return (
    <AppContext.Provider value={{ ...state, setError }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
