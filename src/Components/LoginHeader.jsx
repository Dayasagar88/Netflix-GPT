import React from "react";
import NLogo from "../Images/Netflix_Logo_PMS.png";
import { Link } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="absolute flex items-center justify-between  mx-auto w-[60%] max-w-[70%]">
      <img className=" z-10 w-28 min-w-14  sm:w-40" src={NLogo} alt="Logo" />
      <Link to="/login" className="z-10"><button className="min-w-1 z-10 my-auto text-white bg-red-600 px-1 pb-1 sm:px-3  sm:pb-[5px] sm:pt-[3px]  rounded-[4px] sm:text-[1rem] text-[.8rem]  font-semibold hover:bg-red-700 transition-bg duration-100 flex items-center justify-center">
        Sign In
      </button></Link>
    </div>
  );
};

export default LoginHeader;
