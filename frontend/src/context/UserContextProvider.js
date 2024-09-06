// src/context/UserContextProvider.js
import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children, user, setUser }) => {
  console.log('UserProvider user:', user); // Debugging statement

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};