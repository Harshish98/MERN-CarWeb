import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://mern-carweb-server.onrender.com/forgot-password", {
        email,
      })
      .then((res) => {
        console.log("Response: ", res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="focus:outline-none active:outline-none mb-5 w-full p-2 text-lg block bg-blue-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-5/6 text-blue-1 px-3 hover:text-white hover:bg-blue-1 rounded text-xl mx-auto block p-2 font-semibold mb-4 border border-blue-1"
      >
        Send Reset Link
      </button>
    </>
  );
};
