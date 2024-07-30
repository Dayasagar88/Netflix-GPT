import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmailOrPhone,
  validatePassword,
  validateName,
} from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { PhoneAuthCredential } from "firebase/auth/web-extension";
import { photoURL } from "../Utils/Constants";

const LoginForm = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [emailErrMsg, setEmailErrMsg] = useState(null);
  const [passwordErrMsg, setPasswordErrMsg] = useState(null);
  const [nameErrMsg, setNameErrMsg] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [acountCreated, setAcountCreated] = useState(false);
  const navigate = useNavigate();


  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleSignInSignUp = () => {
    setEmailErrMsg("");
    setPasswordErrMsg("");
    setNameErrMsg("");

    const emailValue = email.current ? email.current.value : "";
    const passwordValue = password.current ? password.current.value : "";
    const nameValue = name.current ? name.current.value : "";

    const validPassword = validatePassword(passwordValue);
    const validEmail = validateEmailOrPhone(emailValue);

    let validName = true;
    if (!isSignInForm) {
      validName = validateName(nameValue);
    }
    if (!validEmail) {
      setEmailErrMsg("Please enter a valid email address or phone number.");
    }
    if (!validPassword) {
      setPasswordErrMsg(
        "Your password must contain uppercase , lowercase letters & numbers."
      );
    }
    if (!validName) {
      setNameErrMsg("Enter your full name");
    }

    console.log(validName);
    console.log(validEmail);
    console.log(validPassword);

    if ((isSignInForm || !isSignInForm) && (!validEmail || !validPassword))
      return;

    //Proceed with sign-up
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          setAcountCreated(true);
          setTimeout(() => {
            setAcountCreated(false);
          }, 5000);

          updateProfile(user, {
            displayName: nameValue, photoURL: {photoURL}
          }).then(() => {
          }).catch((error) => {
            navigate("/error")
          });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setEmailErrMsg("Email already in use");
        });
    } else {
      //Proceed with sign-in
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse")
        })
        .catch((error, userCredential) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setPasswordErrMsg("Invalid credentials");
        });
    }
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    if (emailErrMsg) setEmailErrMsg(null);
    if (passwordErrMsg) setPasswordErrMsg(null);
    if (nameErrMsg) setNameErrMsg(null);
    if (!hidePassword) setHidePassword(true);
  };

  return (
    <div className="absolute  bg-[#00000087] rounded-lg sm:w-[28rem] sm:px-16 sm:pb-[170px] sm:pt-[40px] px-5 pb-[20px] pt-[20px]  h-auto  w-[20rem]">
      <form className=" relative flex  flex-col gap-5">
        {!isSignInForm && (
          <p
            className={` ${
              acountCreated ? "scale-100" : "scale-0"
            } -top-5 sm:-top-7 text-white font-semibold sm:text-[1.1rem] transition-scale duration-200 absolute left-0 right-0 mx-auto w-fit`}
          >
            <i className=" text-green-500 mr-2 fa-regular fa-circle-check"></i>
            Account created successfully
          </p>
        )}
        <h1 className="text-white text-[1.2rem] sm:text-[1.7rem] font-bold sm:mb-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {isSignInForm ? (
          <input
            ref={email}
            className={`text-white font-semibold py-1 sm:py-4 px-2 bg-[#58627082] rounded-[3px] ${
              emailErrMsg ? "border border-red-500" : "border border-gray-500 "
            }`}
            type="email"
            placeholder="Email or mobile number"
          />
        ) : (
          <input
            ref={name}
            className={`text-white font-semibold py-1 sm:py-4 px-2 bg-[#58627082] rounded-[3px] ${
              nameErrMsg ? "border border-red-500" : "border border-gray-500 "
            }`}
            type="text"
            placeholder="Full Name"
          />
        )}

        {emailErrMsg && isSignInForm && (
          <p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {emailErrMsg}
          </p>
        )}

        {nameErrMsg && !isSignInForm && (
          <p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {nameErrMsg}
          </p>
        )}

        {isSignInForm ? (
          <div className=" relative flex items-center">
            <input
              ref={password}
              className={`text-white w-full font-semibold py-1 sm:py-4 px-2 bg-[#58627082] rounded-[3px] ${
                passwordErrMsg
                  ? "border border-red-500"
                  : "border border-gray-500 "
              }`}
              type={hidePassword ? "password" : "text"}
              placeholder="Password"
            />
            {hidePassword ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleHidePassword();
                }}
                className=" right-3 text-white absolute"
              >
                <i className=" fa-solid fa-eye"></i>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleHidePassword();
                }}
                className=" right-3 text-white absolute"
              >
                <i class="fa-regular fa-eye"></i>
              </button>
            )}
          </div>
        ) : (
          <>
            <input
              ref={email}
              className={`text-white font-semibold py-1 sm:py-4 px-2 bg-[#58627082] rounded-[3px] ${
                emailErrMsg
                  ? "border border-red-500"
                  : "border border-gray-500 "
              }`}
              type="email"
              placeholder="Email or mobile number"
            />
            {emailErrMsg && !isSignInForm && (
              <p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {emailErrMsg}
              </p>
            )}
            <div className=" relative flex items-center">
              <input
                ref={password}
                className={`text-white w-full font-semibold py-1 sm:py-4 px-2 bg-[#58627082] rounded-[3px] ${
                  passwordErrMsg
                    ? "border border-red-500"
                    : "border border-gray-500 "
                }`}
                type={hidePassword ? "password" : "text"}
                placeholder="Password"
              />
              {hidePassword ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleHidePassword();
                  }}
                  className=" right-3 text-white absolute"
                >
                  <i className=" fa-solid fa-eye"></i>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleHidePassword();
                  }}
                  className=" right-3 text-white absolute"
                >
                  <i class="fa-regular fa-eye"></i>
                </button>
              )}
            </div>
          </>
        )}

        {passwordErrMsg && (
          <p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {passwordErrMsg}
          </p>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            handleSignInSignUp();
          }}
          className="text-white  font-semibold bg-[#e80716] sm:py-[8px] p-[4px] rounded-[3px] transition-bg  duration-200 hover:bg-red-700"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm && (
          <p className="text-gray-500  font-semibold mx-auto">OR</p>
        )}
        {isSignInForm && (
          <button className="text-white p-[4px] sm:py-[8px] rounded-[3px] bg-[#6b5f5fac] font-semibold  transition-bg ease-in duration-200 hover:bg-[#6b5f5fd2]">
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
