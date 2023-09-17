import React, { useContext, useReducer, useEffect, createContext } from 'react';
import reducer from './reducer';

const AppContext = createContext();
const initState = { isAuthenticated: false };

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
