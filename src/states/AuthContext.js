// AuthContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const pData = localStorage.getItem("profileData") ? JSON.parse(localStorage.getItem("profileData")) : {}

  const [profileData, setProfileData] = useState(pData);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, profileData, setProfileData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
