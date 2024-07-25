import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const [isSignInForm, setIsSignInForm] = useState(true)

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
  return (
    <div className="absolute bg-[#00000087] rounded-lg w-[23rem] px-14 pb-[110px] pt-[35px] min-w-[4rem] h-auto">
      <form className="flex flex-col gap-4">
        <h1 className="text-white text-[1.7rem] font-bold">{isSignInForm ? "Sign In" : 'Sign Up'}</h1>
        <input
          className=" text-white font-semibold py-4 border border-gray-500 px-2 bg-[#58627082] rounded-[3px] text-xs"
          type="text"
          placeholder="Email or mobile number"
        />
        {isSignInForm && <input
          className=" text-white font-semibold py-4 px-2 bg-[#58627082] rounded-[3px] border border-gray-500 text-xs"
          type="password"
          placeholder="Password"
        />}
        <button className="text-white text-sm font-semibold bg-[#e80716] py-[7px] rounded-[3px] transition-bg  duration-200 hover:bg-red-700">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm && <p className="text-gray-500 text-sm font-semibold mx-auto">OR</p>}
       {isSignInForm && <button className="text-white text-sm py-[7px] rounded-[3px] bg-[#6b5f5fac] font-semibold  transition-bg ease-in duration-200 hover:bg-[#6b5f5fd2]">
          Use a sign-in code
        </button>}
        {isSignInForm && <p className="text-white mx-auto cursor-pointer mt-[-10px] text-xs hover:underline">
          Forgot password?
        </p>}
       {isSignInForm && <div className="flex items-center space-x-1">
          <input
            name="input"
            type="checkbox"
            id="input"
            className=" cursor-pointer"
          />
          <label className="text-white text-xs" htmlFor="input">
            Remember me
          </label>
        </div>}
        <p className="text-gray-500 text-xs font-semibold">
          {isSignInForm ? "New to Netflix?" : "Already a user?"}
          <button  onClick={(event) => {
            event.preventDefault();
            toggleSignInForm();
          }} className="text-white ml-1 hover:underline">
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </button>
        </p>
        <p className="text-gray-400 text-[.7rem]">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
          <Link to="/learn_more" className="text-blue-700 ml-1 hover:underline">
            Learn more.
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
