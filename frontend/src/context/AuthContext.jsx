import React, { createContext } from 'react';

// Create Context
export const authDataContext = createContext();

// AuthContext Provider Component
function AuthContext({ children }) {

  let serverUrl = "http://localhost:8000"; // ✅ corrected port if needed

  let value = {
    serverUrl
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;

