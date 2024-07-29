import { useNavigate } from "react-router-dom";
import NLogo from "../Images/Netflix_Logo_PMS.png";
import { useSelector } from "react-redux";
import {  signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login")
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error")            
      });
  };

  return (
    <div className="absolute flex items-center justify-between  mx-auto w-[60%] max-w-[70%]">
      <img className=" z-10 w-28 min-w-14  sm:w-40" src={NLogo} alt="Logo" />
      {user && <div className="flex gap-3">
        <img className="sm:w-10 w-4 rounded-full" src={user.photoURL} alt="img" />
      <button
        onClick={handleSignOut}
        className="min-w-1 z-10 my-auto text-white bg-red-600 px-1 pb-1 sm:px-3  sm:pb-[5px] sm:pt-[3px]  rounded-[4px] sm:text-[1rem] text-[.8rem]  font-semibold hover:bg-red-700 transition-bg duration-100 flex items-center justify-center"
      >
        Sign out
      </button>
      </div>}
      
    </div>
  );
};
export default Header;
