import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TokenContext = React.createContext();
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userDetails, setUserDetails] = useState("");
  const navigate = useNavigate();

  const tokenLocalStorage = (serverToken, serverRole) => {
    localStorage.setItem("token", serverToken);
    localStorage.setItem("role", serverRole);
    setToken(serverToken);
    setRole(serverRole);
  };

  const SignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    setToken(null);
    navigate("/");
  };

  const fetchUserDetails = async (token) => {
    const response = await axios.get(
      "https://mern-carweb-server.onrender.com/user-details",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    setUserDetails(response.data);
  };

  useEffect(() => {
    fetchUserDetails(token);
  }, [token]);

  return (
    <TokenContext.Provider
      value={{ token, role, tokenLocalStorage, SignOut, userDetails }}
    >
      {children}
    </TokenContext.Provider>
  );
};
