import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://mern-carweb-server.onrender.com/reset-password/${id}/${token}`,
        { password }
      )
      .then((res) => {
        console.log("Response: ", res);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <input
        type="password"
        name="password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="focus:outline-none active:outline-none mb-5 w-full p-2 md:text-lg block bg-blue-2 rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-5/6 text-blue-1 px-3 hover:text-white hover:bg-blue-1 rounded md:text-xl mx-auto block p-2 font-semibold mb-4 border border-blue-1"
      >
        Update Password
      </button>
    </>
  );
};
