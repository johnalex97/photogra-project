import React, { createContext, useState, useEffect,useContext } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("username");
    setToken(storedToken);
    setUserName(storedUserName);
    setLoading(false); 
  }, []);

  const logOut = () => {
    setUserName(null);
    setToken("");
    localStorage.removeItem("site");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, userName, setUserName, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};