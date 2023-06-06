import React from "react";
import { createContext, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

type AuthContextType = {
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();

  const authToken = window.localStorage.getItem("auth_token");

  const isAuthenticated =
    authToken !== null && authToken !== "null" && authToken !== ""
      ? true
      : false;

  return (
    <>
      {<Navigate to={isAuthenticated ? location.pathname : "/login"} />}
      {children}
    </>
  );
};
