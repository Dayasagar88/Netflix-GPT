import React, { useEffect, useRef, useState } from "react";
import LoginHeader from "./LoginHeader";
import BgImage from "../Images/bg-image (2).jpg";
import { useDispatch, useSelector } from "react-redux";
import lang from "../Utils/LanguageConstants";
import { useNavigate } from "react-router-dom";
import { addUser,  removeUser } from "../Utils/UserSlice";
import { validateEmailOrPhone } from "../Utils/Validate";

const MainPage = () => {
  const langKey = useSelector((store) => store.config.language);
  const [isMainPage, setMainPage] = useState(true);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const emailRef = useRef();
  const [emailError , setEmailError] = useState(null)
  const userObj = useSelector(store => store.user)


  useEffect(() => {
    dispatch(removeUser())
    // console.log(userObj)
    // if(userObj === null){
    //   naviagte("/")
    // }
  }, [])

  const handleSignUp = () => {
    const validEmail = validateEmailOrPhone(emailRef.current.value);
    if(validEmail){
    setMainPage(false);
    naviagte("/getstarted");
    dispatch(addUser({email: emailRef.current.value}));
    setEmailError(null)
    }else{
      setEmailError("Enter a valid email adrress")
    }
  };

  return (
    <div className=" flex justify-center relative w-full items-center max-w-full">
      <LoginHeader isMainPage={isMainPage} />
      <img className="h-[100vh] w-full object-cover" src={BgImage} alt="img" />
      <div className=" text-white sm:space-y-5 space-y-3  text-center absolute w-full  z-10">
        <h1 className="sm:text-5xl text-2xl font-bold">
          {lang[langKey].mainPageHeading}
        </h1>
        <p className="sm:text-xl text-[1rem] font">{lang[langKey].text_1}</p>
        <p className="sm:text-lg text-sm ">{lang[langKey].text_2}</p>
        <form className="sm:w-[35%] w-[90%] gap-2 grid grid-cols-12 mx-auto">
          <input
            ref={emailRef}
            className={`${emailError ? 'border-red-500 border-[2px]' : 'border-gray-500'} sm:py-[.9rem] py-2 px-2 col-span-8 bg-[#131212b9] border-[1px] font-semibold rounded-sm`}
            type="text"
            placeholder={emailError ? emailError : `${lang[langKey].email}`}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
            className=" col-span-4 font-semibold lg:text-lg  bg-red-600 rounded-sm hover:bg-red-500"
          >
            {lang[langKey].getstarted}
            <i className=" ml-2 fa-solid fa-angle-right"></i>
          </button>
        </form>
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-[#050505]"></div>
    </div>
  );
};

export default MainPage;
