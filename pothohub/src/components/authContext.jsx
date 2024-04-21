import React, { createContext, useState, useEffect, useContext } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userid");
    setToken(storedToken);
    setUserName(storedUserName);
    setUserId(storedUserId);
    setLoading(false); 
  }, []);

  const logOut = () => {
    setUserName(null);
    setUserId(null);
    setToken("");
    localStorage.removeItem("userid");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = '/'
  };

  return (
    <AuthContext.Provider value={{ token, setToken, userName, setUserName, userId, setUserId, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};