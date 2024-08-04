import React, { useRef, useState } from "react";
import LoginHeader from "./LoginHeader";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import lang from "../Utils/LanguageConstants";
import {
  validateEmailOrPhone,
  validateName,
  validatePassword,
} from "../Utils/Validate";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../Utils/Firebase";
import { photoURL } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Utils/UserSlice";

const GetStarted = () => {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const [acountCreated, setAcountCreated] = useState(false);
  const langkey = useSelector((store) => store.config.language);
  const UserEmail = useSelector((store) => store?.user?.email);
  const navigate = useNavigate();
  const [passwordErr, setPasswordErr] = useState(true);
  const [nameErr, setNameErr] = useState(true);
  const [emailErr, setEmailErr] = useState(true);

  const handleSignUp = () => {
    const nameValue = nameRef.current.value;
    const passwordValue = passwordRef.current.value;
    const emailValue = emailRef?.current?.value;

    const validName = validateName(nameValue);
    const validPassword = validatePassword(passwordValue);
    const validEmail = validateEmailOrPhone(emailValue);

    if (nameValue === "" || !validName) {
      setNameErr(false);
    } else {
      setNameErr(true);
    }
    if (passwordValue === "" || !validPassword) {
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
    if(emailValue === "" || !validEmail){
      setEmailErr(false)
    }

    if (validName && validPassword && validEmail) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
      
          setAcountCreated(true);
          setTimeout(() => {
            setAcountCreated(false);
          }, 5000);

          updateProfile(user, {
            displayName: nameValue, photoURL: photoURL,  
          }).then(() => {
            console.log("update profile");
            const { uid, email, displayName, photoURL } = user;  
            dispatch(addUser({
              uid: uid,
              email: email,
              displayName: displayName,  
              photoURL: photoURL,
            }))
          }).catch((error) => {
            navigate("/error")
          })

             .then(() => { 
              navigate("/browse")
             }) 


            .then(() => {})
            .catch((error) => {
              Navigate("/error");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className=" z-10 flex justify-center">
      <LoginHeader />
      <div className=" absolute top-12 sm:top-14 border-t-[1px] border-[#07070769] w-[100vw]"></div>
      <div className="  w-[100vw] h-[100vh] flex">
        <div className="m-auto sm:w-[25rem] w-[20rem] space-y-4">
          <h1 className="sm:text-4xl text-2xl max-w-[100%] font-semibold ">
            <span>Welcome!</span>
            <br />
            Enter your name and create a password to get started.
          </h1>
          <p className="sm:text-xl text-sm">Create your account & you'll be watching in no time.</p>

          <form className=" flex flex-col sm:gap-5 gap-3">
            <input
            ref={emailRef}
            placeholder="Email address"
            defaultValue={UserEmail}
              className={`outline-none sm:py-3 py-2  px-2 border ${
                !emailErr ? "border-[2px]  border-red-500" : "border-[#000000a2]"
              }`}
              type="text"
            />
            <input
              ref={nameRef}
              className={`outline-none sm:py-3 py-2  px-2 border ${
                !nameErr ? "border-[2px]  border-red-500" : "border-[#000000a2]"
              }`}
              type="text"
              placeholder="Enter full name"
            />
            <input
              ref={passwordRef}
              className={`outline-none sm:py-3 py-2  px-2 border ${
                !passwordErr
                  ? "border-[2px]  border-red-500"
                  : "border-[#000000a2]"
              }`}
              type="password"
              placeholder="Create password"
            />
            <p className="sm:text-[.9rem] text-sm -mt-3"><i className=" mr-1 fa-solid fa-circle-info"></i>Your password must contain uppercase, lowercase & numbers.</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
              className="bg-red-600 text-xl font-semibold rounded-lg sm:py-3 py-2  text-white"
            >
              Sign Up
            </button>
          </form>
          <p
            className={` ${
              acountCreated ? "scale-100" : "scale-0"
            } text-white font-semibold sm:text-[1.1rem] transition-scale duration-200 bg-gray-500 text-center rounded-2xl p-1`}
          >
            <i className=" text-green-500 mr-2 fa-regular fa-circle-check"></i>
            {lang[langkey].accountCreated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
