import React, { useEffect, useRef, useState } from "react";
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
import { addUser} from "../Utils/UserSlice";





const GetStarted = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const nameRef = useRef(null);
  const passwordRef = useRef(null);
  const langkey = useSelector((store) => store.config.language);
  const UserEmail = useSelector((store) => store?.user?.email);
  const navigate = useNavigate();
  const [passwordErr, setPasswordErr] = useState(null);
  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const user = useSelector(store => store.user)

  // useEffect(() => {
  //   if(!user?.uid){
  //     navigate("/getstarted")
  //   }
  // }, [])

  const handleSignUp = () => {
    const nameValue = nameRef.current.value;
    const passwordValue = passwordRef.current.value;
    const emailValue = emailRef?.current?.value;

    const validName = validateName(nameValue);
    const validPassword = validatePassword(passwordValue);
    const validEmail = validateEmailOrPhone(emailValue);

    if (nameValue === "" || !validName) {
      setNameErr(`${lang[langkey].enterName}`);
    } else {
      setNameErr(null);
    }
    if (passwordValue === "" || !validPassword) {
      setPasswordErr(true);
    } else {
      setPasswordErr(null);
    }
    if (emailValue === "" || !validEmail) {
      setEmailErr(`${lang[langkey].enterValidEmailOrPhone}`);
    } else {
      setEmailErr(null);
    }

    if (validName && validPassword && validEmail) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          setLoading(false);
          setEmailErr(null);
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: nameValue,
            photoURL: photoURL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = user;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              navigate("/error");
            })

            .then(() => {
              navigate("/browse");
            })

            .then(() => {})
            .catch((error) => {
              Navigate("/error");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setEmailErr(`${lang[langkey].emailInUse}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <div className=" z-10 flex justify-center">
      <LoginHeader />
      <div className=" absolute top-12 sm:top-14 border-t-[1px] border-[#07070769] w-[100vw]"></div>
      <div className="  w-[100vw] h-[100vh] flex">
        <div className="m-auto sm:w-[25rem] w-[20rem] space-y-4">
          <h1 className="sm:text-4xl text-2xl max-w-[100%] font-semibold ">
            <span>{lang[langkey].welcome}</span>
            <br />
            {lang[langkey].completeProfile}
          </h1>
          <p className="sm:text-xl text-sm">
            {lang[langkey].createAccountPrompt}
          </p>

          <form className=" flex flex-col sm:gap-5 gap-3">
            <input
              ref={emailRef}
              placeholder="Email address"
              defaultValue={UserEmail}
              className={`outline-none sm:py-3 py-2  px-2 border ${
                emailErr ? "border-[2px]  border-red-500" : "border-[#000000a2]"
              }`}
              type="text"
            />
            <p
              className={`text-sm sm:-my-5 -my-3  ${
                emailErr ? "block" : "hidden"
              } text-red-600`}
            >
              <i className=" mr-1 fa-solid fa-circle-info"></i>
              {emailErr}
            </p>
            <input
              ref={nameRef}
              className={`outline-none sm:py-3 py-2  px-2 border ${
                nameErr ? "border-[2px]  border-red-500" : "border-[#000000a2]"
              }`}
              type="text"
              placeholder="Enter full name"
            />
            <p
              className={`text-sm sm:-my-5 -my-3  ${
                nameErr ? "block" : "hidden"
              } text-red-600`}
            >
              <i className=" mr-1 fa-solid fa-circle-info"></i>
              {nameErr}
            </p>
            <div className=" relative flex items-center">
            <input
              ref={passwordRef}
              className={`outline-none sm:py-3 py-2  px-2 border w-full ${
                passwordErr
                  ? "border-[2px]  border-red-500"
                  : "border-[#000000a2]"
              }`}
              type={hidePassword ? "password" : "text"}
              placeholder="Create password"
            />

            {hidePassword ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleHidePassword();
                }}
                className=" right-3 text-black absolute"
              >
                <i className=" fa-solid fa-eye"></i>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleHidePassword();
                }}
                className=" right-3 text-black absolute"
              >
                <i class="fa-regular fa-eye"></i>
              </button>
            )}
            </div>
           

            <p
              className={`sm:text-[.9rem] ${
                passwordErr ? "text-red-600" : "text-black"
              } text-sm sm:pb-2 pb-1 sm:-my-5 -my-3`}
            >
              <i className=" mr-1 fa-solid fa-circle-info"></i>
              {lang[langkey].passwordRequirement}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
              className="bg-red-600 text-xl h-11 sm:h-13 font-semibold rounded-lg  text-white"
            >
              {loading ? (
                <p className="animate-spin rounded-full border-2 border-primary mx-auto border-t-transparent h-6 w-6  sm:h-7 sm:w-7" />
              ) : (
                `${lang[langkey].signup}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
