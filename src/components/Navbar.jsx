import React, { useContext, useEffect, useState } from "react";
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
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const homePage = location.pathname === "/";
  const carsPage = location.pathname === "/cars";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  7;

  return (
    <>
      <div className="relative">
        <div className="bg-secondary text-white md:flex justify-between  items-center xl:text-lg px-5 lg:px-7">
          <div className="flex justify-between md:block">
            <Link to="/">
              <div>
                <img
                  src="https://res.cloudinary.com/disvtxs51/image/upload/v1720090904/caricon_bnyaio.png"
                  alt="Car Icon"
                />
              </div>
            </Link>
            <button
              className="md:hidden"
              onClick={() => setShowMenu(!showMenu)}
            >
              &#9776;
            </button>
          </div>
          <div
            className={`${
              showMenu ? "visible" : "hidden"
            } flex justify-between basis-3/4 lg:basis-4/5`}
          >
            <div className="md:flex items-center md:space-x-7 lg:space-x-20 xl:space-x-36">
              <div className="mb-2 md:mb-0">About Us</div>
              <Link to="/cars">
                <div
                  className={`${carsPage ? "underline" : null} mb-2 md:mb-0`}
                >
                  Listings
                </div>
              </Link>
              <Link to="/">
                <div
                  className={`flex items-center ${
                    homePage ? "underline" : null
                  } mb-2 md:mb-0`}
                >
                  Home <HomeIcon />
                </div>
              </Link>
              <div className="flex items-center gap-1 mb-2 md:mb-0">
                <AIIcon /> AI Assistant
              </div>
            </div>
            <div className="text-sm md:flex md:items-center md:space-x-4 lg:space-x-8">
              {token ? (
                <CustomTooltip
                  title={
                    <p className="capitalize font-semibold">
                      {userDetails.name}
                    </p>
                  }
                >
                  <button
                    onClick={SignOut}
                    className="flex items-center mb-2 md:mb-0"
                  >
                    <SignInIcon width={25} height={25} /> Sign Out
                  </button>
                </CustomTooltip>
              ) : (
                <Link to="/login">
                  <button className="flex items-center mb-2 md:mb-0">
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
        </div>
        <HeaderStripe />
      </div>
    </>
  );
};
