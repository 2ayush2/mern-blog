import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userInfo, setUser] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
