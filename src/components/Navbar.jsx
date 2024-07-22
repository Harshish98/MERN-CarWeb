import React, { useContext } from "react";
import { HomeIcon } from "../icons/navbar-icons/HomeIcon";
import { AIIcon } from "../icons/navbar-icons/AIIcon";
import { SignInIcon } from "../icons/navbar-icons/SignInIcon";
import { GlobeIcon } from "../icons/navbar-icons/GlobeIcon";
import { HeaderStripe } from "./HeaderStripe";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { TokenContext } from "../context/TokenProvider";
import { styled } from "@mui/material";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    padding: "10px",
    borderRadius: "4px",
  },
}));

export const Navbar = () => {
  const { SignOut, token, userDetails } = useContext(TokenContext);
  const location = useLocation()
  const homePage = location.pathname === "/";
  const carsPage = location.pathname === "/cars"

  return (
    <>
      <div className="relative">
        <div className="bg-secondary text-white flex justify-between items-center text-lg px-7">
          <Link to="/">
            <div>
              <img
                src="https://res.cloudinary.com/disvtxs51/image/upload/v1720090904/caricon_bnyaio.png"
                alt="Car Icon"
              />
            </div>
          </Link>
          <div className="flex space-x-36">
            <span>About Us</span>
            <Link to="/cars">
              <span className={`${carsPage ? "underline" : null}`}>
                Listings
              </span>
            </Link>
            <Link to="/">
              <span
                className={`flex items-center ${homePage ? "underline" : null}`}
              >
                Home <HomeIcon />
              </span>
            </Link>
            <span className="flex items-center gap-1">
              <AIIcon /> AI Assistant
            </span>
          </div>
          <div className="text-sm flex space-x-8">
            {token ? (
              <CustomTooltip
                title={
                  <p className="capitalize font-semibold">{userDetails.name}</p>
                }
              >
                <button onClick={SignOut} className="flex items-center">
                  <SignInIcon width={25} height={25} /> Sign Out
                </button>
              </CustomTooltip>
            ) : (
              <Link to="/login">
                <button className="flex items-center">
                  <SignInIcon width={25} height={25} /> Sign In
                </button>
              </Link>
            )}
            <div className="flex items-center">
              <GlobeIcon />
              <select className="bg-secondary">
                <option>EN</option>
              </select>
            </div>
          </div>
        </div>
        <HeaderStripe />
      </div>
    </>
  );
};
