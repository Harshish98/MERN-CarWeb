import axios from "axios";
import React, { useContext, useState } from "react";
import { TokenContext } from "../context/TokenProvider";

export const ContactForm = () => {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: null,
    subject: "",
    message: "",
  });
  const [userData, setUserData] = useState(true);
  const { userDetails } = useContext(TokenContext);

  const handleOnChange = (e) => {
    e.preventDefault();
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://mern-carweb-server.onrender.com/send-message",
        contactDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      alert("message send successfully");
    } catch (error) {
      console.log("Error in sending the message: ", error);
    }
  };

  if (userData && userDetails) {
    setContactDetails({
      name: userDetails.name,
      email: userDetails.email,
      phone: null,
      subject: "",
      message: "",
    });
    setUserData(false);
  }
  return (
    <>
      <div className="md:flex text-sm md:text-base justify-between mb-5">
        <div>
          <label>Name</label>
          <input
            name="name"
            value={contactDetails.name}
            type="text"
            placeholder="Full Name"
            className="block w-full md:w-[360px] lg:w-[270px] xl:w-80 py-3 px-4 md:text-lg bg-blue-2 rounded capitalize"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={contactDetails.email}
            type="email"
            placeholder="email@mail.com"
            className="block w-full md:w-[360px] lg:w-[270px] xl:w-80 py-3 px-4 md:text-lg bg-blue-2 rounded"
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="md:flex justify-between mb-5">
        <div>
          <label>Phone</label>
          <input
            name="phone"
            value={contactDetails.phone}
            type="tel"
            placeholder="(000) 000-0000"
            className="block w-full md:w-[360px] lg:w-[270px] xl:w-80 py-3 px-4 md:text-lg bg-blue-2 rounded"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Subject</label>
          <select
            name="subject"
            value={contactDetails.subject}
            className="block w-full md:w-[360px] lg:w-[270px] xl:w-80 py-3 px-4 md:text-lg bg-blue-2 rounded"
            onChange={handleOnChange}
          >
            <option>Subject</option>
            <option>Test Drive</option>
            <option>More Info</option>
          </select>
        </div>
      </div>
      <label>Comment</label>
      <textarea
        name="message"
        value={contactDetails.message}
        className="block w-full py-3 px-4 md:text-lg bg-blue-2 rounded mb-12"
        placeholder="Leave a message here"
        onChange={handleOnChange}
        rows={5}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-1 w-full md:text-lg py-3 rounded"
      >
        Contact Dealer
      </button>
    </>
  );
};
