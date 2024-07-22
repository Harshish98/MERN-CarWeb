import React, { useContext } from "react";
import { TokenContext } from "../context/TokenProvider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, roleRequired }) => {
  const { token, role } = useContext(TokenContext);

  if (!token) {
    return <Navigate to="/login" />;
  }
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }
  return children;
};
