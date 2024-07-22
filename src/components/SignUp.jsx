import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [items, setItems] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mern-carweb-server.onrender.com/signup",
        items,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <input
        type="text"
        name="name"
        placeholder="Enter full name"
        value={items.name}
        onChange={handleChange}
        className="focus:outline-none active:outline-none mb-5 w-full p-2 text-lg block bg-blue-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={items.email}
        onChange={handleChange}
        className="focus:outline-none active:outline-none mb-5 w-full p-2 text-lg block bg-blue-2 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={items.password}
        onChange={handleChange}
        className="focus:outline-none active:outline-none mb-5 w-full p-2 text-lg block bg-blue-2 rounded"
      />
      <button
        className="w-5/6 text-blue-1 px-3 hover:text-white hover:bg-blue-1 rounded text-xl mx-auto block p-2 font-semibold mb-4 border border-blue-1"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <p>
        Already have an account?
        <Link to="/login">
          <span className="hover:text-blue-400 text-xs font-semibold text-blue-1">
            {" "}
            Sign In here
          </span>
        </Link>
      </p>
    </>
  );
};
