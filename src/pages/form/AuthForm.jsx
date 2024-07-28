import React from "react";
import { SignUp } from "../../components/SignUp";
import { Login } from "../../components/Login";
import { ForgotPassword } from "../../components/ForgotPassword";
import { ResetPassword } from "../../components/ResetPassword";

export const AuthForm = ({ page }) => {
  const renderForm = () => {
    switch (page) {
      case "login":
        return <Login />;
      case "signup":
        return <SignUp />;
      case "forgot-password":
        return <ForgotPassword />;
      case "reset-password":
        return <ResetPassword />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="md:flex justify-between items-center">
        <div className="h-96 md:h-[550px] lg:h-[800px] basis-3/5">
          <img className="h-full w-full" src="https://res.cloudinary.com/disvtxs51/image/upload/v1718602050/samples/ecommerce/car-interior-design.jpg" />
        </div>
        <div className="basis-2/5 p-4 lg:p-10">
          <p className="text-2xl text-center md:text-3xl font-semibold text-white mb-6 lg:mb-10">
            {page === "login"
              ? "Log In to CarDrive"
              : page === "signup"
              ? "Create an Account"
              : page === "forgot-password"
              ? "Enter Your Registered Email"
              : "Enter New Password"}
          </p>
          {renderForm()}
        </div>
      </div>
    </>
  );
};
