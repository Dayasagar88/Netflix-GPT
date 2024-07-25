//React arrow funtion export component
import React from "react";
import NLogo from "../Images/Netflix_Logo_PMS.png";
import BgImage from "../Images/bg-image (2).jpg";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className=" flex justify-center items-center relative w-full max-w-full">
      <div className="top-0 absolute  mx-auto flex items-center justify-between w-[60%] max-w-[70%]">
        <img className=" z-10 min-w-14  max-w-36" src={NLogo} alt="Logo" />
      </div>
      <img className="h-[100vh] w-full" src={BgImage} alt="img" />
      <div class="absolute inset-0 bg-black bg-opacity-65"></div>
      <LoginForm />
    </div>
  );
};

export default Login;
