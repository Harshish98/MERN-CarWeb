import React from "react";
import { SignInIcon } from "../icons/navbar-icons/SignInIcon";

export const UserCard = ({ user, index }) => {
  return (
    <>
      <div
        key={index}
        className="w-64 border border-[#12232E] p-4 text-white mb-5 rounded"
      >
        <div>
          <SignInIcon/>
          <div className="flex justify-between items-center capitalize">
            <p className="text-xl font-semibold">{user.name}</p>
            <p>Role: {user.role}</p>
          </div>
            <p className="text-2xl text-blue-1 font-bold">{user.email}</p>
        </div>
      </div>
    </>
  );
};
