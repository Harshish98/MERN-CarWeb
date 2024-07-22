import React from "react";
import { LocationIcon } from "../icons/navbar-icons/LocationIcon";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "./Breadcrumb";

export const HeaderStripe = () => {
  const location = useLocation();
  const homePageShown = location.pathname === "/";

  return (
    <>
      <div
        className={`bg-blue-2 flex justify-between text-white py-4 px-28 absolute -bottom-15 w-full z-10 ${
          homePageShown ? "opacity-85" : "opacity-100"
        }`}
      >
        {homePageShown ? (
          <select className="bg-transparent">
            <option>buy & sell used cars</option>
          </select>
        ) : (
          <Breadcrumb/>
        )}

        <p className="flex gap-1 items-center">
          <LocationIcon />
          San Francisco, USA
        </p>
      </div>
    </>
  );
};
