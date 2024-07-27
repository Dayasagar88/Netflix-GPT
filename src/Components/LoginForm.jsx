import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { validateEmailOrPhone, validatePassword, validateName } from "../Utils/Validate";

const LoginForm = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [emailErrMsg, setEmailErrMsg] = useState(null);
  const [passwordErrMsg, setPasswordErrMsg] = useState(null);
  const [nameErrMsg, setNameErrMsg] = useState(null)

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSignInSignUp = () => {
    setEmailErrMsg("");
    isSignInForm && setPasswordErrMsg("");
    !isSignInForm && setNameErrMsg("")

    const emailValue = email.current ? email.current.value : "";
    const passwordValue = password.current ? password.current.value : "";
    const nameValue = name.current ? name.current.value : "";

    let validPassword = true;

    if(isSignInForm) {
      validPassword = validatePassword(passwordValue)
    }

    let validName = true;
    if(!isSignInForm){
      validName = validateName(nameValue)
    }

    const validEmail = validateEmailOrPhone(emailValue);
  
    if (!validEmail) {
      setEmailErrMsg("Please enter a valid email address or phone number.");
    }

    if (!validPassword) {
      setPasswordErrMsg(
        "Your password must contain between 4 and 60 characters."
      ); 
    }

    if(!validName){
      setNameErrMsg("Enter your full name")
    } 

    //Proceed with sign-in & sign-up
    

  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    if (emailErrMsg) setEmailErrMsg(null);
    if (passwordErrMsg) setPasswordErrMsg(null);
    if (nameErrMsg) setNameErrMsg(null);
  };

  return (
    <div className="absolute bg-[#00000087] rounded-lg w-[28rem] px-16 pb-[170px] pt-[40px] min-w-[4rem] h-auto">
      <form className="flex flex-col gap-5">
        <h1 className="text-white text-[1.7rem] font-bold mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {isSignInForm ? (
          <input
            ref={email}
            className={`text-white font-semibold py-4 px-2 bg-[#58627082] rounded-[3px] ${
              emailErrMsg ? "border border-red-500" : "border border-gray-500 "
            }`}
            type="email"
            placeholder="Email or mobile number"
          />
        ) : (
          <input
          ref={name}
            className={`text-white font-semibold py-4 px-2 bg-[#58627082] rounded-[3px] ${
              nameErrMsg ? "border border-red-500" : "border border-gray-500 "
            }`}
            type="text"
            placeholder="Full Name"
          />
        )}

        {(emailErrMsg && isSignInForm) && (
          <p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {emailErrMsg}
          </p>
        )}

        {
          (nameErrMsg  && !isSignInForm) && (<p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {nameErrMsg}
          </p>)
        }

        {isSignInForm ? (
          <input
            ref={password}
            className={`text-white font-semibold py-4 px-2 bg-[#58627082] rounded-[3px] ${
              passwordErrMsg ? "border border-red-500" : "border border-gray-500 "
            }`}
            type="password"
            placeholder="Password"
          />
        ) : (
          <input
            ref={email}
            className={`text-white font-semibold py-4 px-2 bg-[#58627082] rounded-[3px] ${
              emailErrMsg ? "border border-red-500" : "border border-gray-500 "
            }`}
            type="email"
            placeholder="Email or mobile number"
          />
        )}

        {(passwordErrMsg && isSignInForm) && (
          <p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {passwordErrMsg}
          </p>
        )}

        {
          (!isSignInForm && emailErrMsg) && (
            <p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>
              {emailErrMsg}
            </p>
          )
        }

        <button
          onClick={(e) => {
            e.preventDefault();
            handleSignInSignUp();
          }}
          className="text-white  font-semibold bg-[#e80716] py-[8px] rounded-[3px] transition-bg  duration-200 hover:bg-red-700"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm && (
          <p className="text-gray-500  font-semibold mx-auto">OR</p>
        )}
        {isSignInForm && (
          <button className="text-white py-[8px] rounded-[3px] bg-[#6b5f5fac] font-semibold  transition-bg ease-in duration-200 hover:bg-[#6b5f5fd2]">
            Use a sign-in code
          </button>
        )}
        {isSignInForm && (
          <p className="text-white mx-auto cursor-pointer mt-[-10px] text-sm hover:underline">
            Forgot password?
          </p>
        )}
        {isSignInForm && (
          <div className="flex items-center space-x-1">
            <input
              name="input"
              type="checkbox"
              id="input"
              className=" cursor-pointer"
            />
            <label className="text-white " htmlFor="input">
              Remember me
            </label>
          </div>
        )}
        <p className="text-gray-500 text-sm font-semibold">
          {isSignInForm ? "New to Netflix?" : "Already a user?"}
          <button
            onClick={(event) => {
              event.preventDefault();
              toggleSignInForm();
            }}
            className="text-white ml-1 hover:underline"
          >
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </button>
        </p>
        <p className="text-gray-400 text-[.9rem]">
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
