import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../context/TokenProvider";

export const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { tokenLocalStorage } = useContext(TokenContext);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mern-carweb-server.onrender.com/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      tokenLocalStorage(response.data.token, response.data.role);
      console.log(response);
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={data.email}
        onChange={handleChange}
        className="focus:outline-none active:outline-none mb-5 w-full p-2 text-lg block bg-blue-2 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={data.password}
        onChange={handleChange}
        className="focus:outline-none active:outline-none mb-5 w-full p-2 text-lg block bg-blue-2 rounded"
      />
      <Link to="/forgot-password">
        <p className="mb-5 text-blue-1 font-semibold hover:text-blue-400">
          Forgot Password ?
        </p>
      </Link>
      <button
        className="w-5/6 text-blue-1 px-3 hover:text-white hover:bg-blue-1 rounded text-xl mx-auto block p-2 font-semibold mb-4 border border-blue-1"
        onClick={handleLogin}
      >
        Login
      </button>
      <p>
        Don't have an account?
        <Link to="/signup">
          <span className="text-xs font-semibold text-blue-1 hover:text-blue-400">
            {" "}
            Register here
          </span>
        </Link>
      </p>
    </>
  );
};
