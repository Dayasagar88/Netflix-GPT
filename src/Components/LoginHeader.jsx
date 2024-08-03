import React from "react";
import NLogo from "../Images/Netflix_Logo_PMS.png";
import { Link } from "react-router-dom";
import { SUPPORTED_LANGUAGE } from "../Utils/Constants";
import { changeLanguage } from "../Utils/ConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import lang from "../Utils/LanguageConstants";

const LoginHeader = () => {
  const dispatch = useDispatch();
  const langKey = useSelector(store => store.config.language)

  return (
    <div className="absolute top-0 flex items-center justify-between sm:pr-0 pr-3  mx-auto w-[100%] sm:max-w-[70%]">
      <img className=" z-10 w-28 min-w-14  sm:w-40" src={NLogo} alt="Logo" />
      <div className="flex gap-2">
      <div className="z-10 flex items-center border-[1px] sm:text-[1rem] text-xs">
            <i className=" text-white ml-1 fa-solid fa-language"></i>
            <select onChange={(e) => {dispatch(changeLanguage(e.target.value))}} className="z-10 bg-[#0405048e] text-white cursor-pointer outline-none ">
          
            {SUPPORTED_LANGUAGE.map((lang) => (
              <option  key={lang.identifier} value={lang.identifier}>
                <i className="fa-solid fa-language"></i>
                {lang.name}
              </option>
            ))}
          </select>
          </div>
      <Link to="/login" className="z-10">
        <button className="min-w-1 z-10 my-auto text-white bg-red-600 px-2 py-2 sm:px-3   sm:pb-[5px] sm:pt-[3px]  rounded-[4px] sm:text-[1rem] pt-1 text-[.8rem]  font-semibold hover:bg-red-700 transition-bg duration-100 flex items-center justify-center">
          {lang[langKey].signin}
        </button>
      </Link>
      </div>
      
    </div>
  );
};

export default LoginHeader;
