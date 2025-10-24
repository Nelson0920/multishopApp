// Dependencies
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
// Api
import { loginRequest, verifyTokenRequest } from "../../api/auth";
// Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorsAuth, setErrorsAuth] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    const cookies = Cookies.get();

    if (!cookies.token) {
      setIsAuthenticated(false);
      setLoading(false);
      return setUser(null);
    }

    try {
      const res = await verifyTokenRequest(cookies.token);
      if (!res.data) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setUser(res.data);
      setLoading(false);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
    }
  };

  const signIn = async (user) => {
    try {
      await loginRequest(user);
      await checkLogin();
      setIsAuthenticated(true);
    } catch (error) {
      setErrorsAuth(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (errorsAuth.length > 0) {
      setTimeout(() => {
        setErrorsAuth([]);
      }, 5000);
      return () => clearTimeout();
    }
  }, [errorsAuth]);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        logout,
        loading,
        user,
        isAuthenticated,
        errorsAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};