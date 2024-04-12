import React, { createContext, useState } from "react";

// Create the user context
export const UserContext = createContext({
  user: {
    role: "",
    name: "",
  },
  setRole: () => {},
  setName: () => {},
});

// Create the user context provider component
export const UserProvider = ({ children }) => {
  // Define the initial state of the user
  const [user, setUser] = useState({
    role: "",
    name: "",
  });

  // Create setters for role and name
  const setRole = (role) => {
    setUser((prevUser) => ({ ...prevUser, role }));
  };

  const setName = (name) => {
    setUser((prevUser) => ({ ...prevUser, name }));
  };

  // Provide the user context value to the children components
  return (
    <UserContext.Provider value={{ user, setRole, setName }}>
      {children}
    </UserContext.Provider>
  );
};
