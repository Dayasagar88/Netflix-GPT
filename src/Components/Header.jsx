import { Link, useNavigate } from "react-router-dom";
import NLogo from "../Images/Netflix_Logo_PMS.png";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase.js";
import { toggleGptSearch } from "../Utils/GptSearchSlice.js";
import { profileLogoURL, SUPPORTED_LANGUAGE } from "../Utils/Constants.js";
import { changeLanguage } from "../Utils/ConfigSlice.js";
import SignOutMenu from "./SignOutMenu.jsx";
import { useState } from "react";
import { emptyMovieData } from "../Utils/suggestMoviesSlice.js";

const Header = ({ gptSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [signOutMenu, setSignOutMenu] = useState(false)
  
  const handleSignOut = () => {
    
    signOut(auth)
      .then(() => {
        navigate("/login");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  // const changeLanguage = (e) => {
  //     dispatch(changeLanguage())
  // }

  return (
    <div className="absolute  top-0 flex items-center justify-between pr-4 w-full">
      <Link className="z-10" to={"/browse"}><img  className=" z-10 w-24 min-w-14  sm:w-40" src={NLogo} alt="Logo" /></Link>
      {user && (
        <div className="flex gap-3">
          {gptSearch && <div className="z-10 flex items-center border-[1px] sm:text-[1rem] text-xs">
            <i className=" text-white ml-1 fa-solid fa-language"></i>
            <select onChange={(e) => {dispatch(changeLanguage(e.target.value))}} className="z-10 bg-[#0405048e] text-white cursor-pointer outline-none ">
          
            {SUPPORTED_LANGUAGE.map((lang) => (
              <option  key={lang.identifier} value={lang.identifier}>
                <i className="fa-solid fa-language"></i>
                {lang.name}
              </option>
            ))}
          </select>
          </div> }
          <button
            onClick={() => {
              dispatch(toggleGptSearch());
              dispatch(emptyMovieData())
            }}
            className="z-10 sm:text-[1rem] text-sm rounded-md sm:w-28 bg-[#f0f0f0] font-semibold px-2 hover:bg-[#f0f0f0c5] transition-bg duration-200"
          >
            {gptSearch ? "Home" : "GPT Search"}
          </button>
          <img
            onClick={() => setSignOutMenu(!signOutMenu)} 
            className="sm:w-10 z-10 w-6 rounded-sm cursor-pointer"
            src={profileLogoURL}
            alt="img"
          />
          <i className={`${signOutMenu && "rotate-180"} z-10 my-auto -ml-2 text-white fa-solid fa-caret-down transition-transform duration-300 sm:text-[1rem] text-xs`}></i>
          {signOutMenu && <SignOutMenu handleSignOut={handleSignOut}/>}
        </div>
      )}
    </div>
  );
};
export default Header;
