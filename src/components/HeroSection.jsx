import React from "react";
import avatar from "../assets/avatar.png";
import { HeroFilterSection } from "./HeroFilterSection";

export const HeroSection = () => {
  return (
    <>
      <div className="relative">
        <img className="w-full" src={avatar} />
        <HeroFilterSection />
      </div>
    </>
  );
};
