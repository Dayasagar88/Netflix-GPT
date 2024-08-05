import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmailOrPhone, validatePassword } from "../Utils/Validate";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useSelector } from "react-redux";
import lang from "../Utils/LanguageConstants";

const LoginForm = () => {
  const langkey = useSelector((store) => store.config.language);
  const [emailErrMsg, setEmailErrMsg] = useState(null);
  const [passwordErrMsg, setPasswordErrMsg] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);

  const handleSignInSignUp = () => {
    setEmailErrMsg("");
    setPasswordErrMsg("");

    const emailValue = email.current ? email.current.value : "";
    const passwordValue = password.current ? password.current.value : "";

    const validPassword = validatePassword(passwordValue);
    const validEmail = validateEmailOrPhone(emailValue);

    if (!validEmail) {
      setEmailErrMsg(`${lang[langkey].enterValidEmailOrPhone}`);
    }
    if (!validPassword) {
      setPasswordErrMsg(`${lang[langkey].passwordRequirement}`);
    }

    if (!validEmail || !validPassword) return;

    //Proceed with sign-in
    setLoading(true)
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/browse");
      })
      .catch((error, userCredential) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setPasswordErrMsg(`${lang[langkey].invalidCredentials}`);
      })
      .finally(() => {
        setLoading(false)
      })
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  // const toggleSignInForm = () => {
  //   setIsSignInForm(!isSignInForm);
  //   if (emailErrMsg) setEmailErrMsg(null);
  //   if (passwordErrMsg) setPasswordErrMsg(null);
  //   if (nameErrMsg) setNameErrMsg(null);
  //   if (!hidePassword) setHidePassword(true);
  // };

  return (
    <div className="absolute  bg-[#00000087] rounded-lg sm:w-[28rem] sm:px-16 sm:pb-[170px] sm:pt-[40px] px-5 pb-[20px] pt-[20px]  h-auto  w-[20rem]">
      <form className=" relative flex  flex-col gap-5 ">
        <h1 className="text-white text-[1.2rem] sm:text-[1.7rem] font-bold sm:mb-4">
          {lang[langkey].signin}
        </h1>
        <input
          ref={email}
          className={`text-white sm:text-[1rem] text-[.9rem] font-semibold py-2 sm:py-4 px-2 bg-[#58627082] rounded-[3px] ${
            emailErrMsg ? "border border-red-500" : "border border-gray-500 "
          }`}
          type="email"
          placeholder={lang[langkey].email}
        />

        {emailErrMsg && (
          <p className="text-red-500 -mt-4 -mb-4 text-sm font-semibold">
            <i className="fa-solid fa-circle-exclamation mr-2"></i>
            {emailErrMsg}
          </p>
        )}

        <div className=" relative flex items-center">
          <input
            ref={password}
            className={`text-white w-full sm:text-[1rem]  text-[.9rem] font-semibold py-2 sm:py-4 px-2 bg-[#58627082] rounded-[3px] ${
              passwordErrMsg
                ? "border border-red-500"
                : "border border-gray-500 "
            }`}
            type={hidePassword ? "password" : "text"}
            placeholder={lang[langkey].password}
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
           {loading ? <p className="animate-spin rounded-full border-2 border-primary mx-auto border-t-transparent h-6 w-6" /> : `${lang[langkey].signin}`}
          
        </button>

        <p className="text-gray-500  font-semibold mx-auto">
          {lang[langkey].or}
        </p>

        <button
          onClick={(e) => e.preventDefault()}
          className="text-white p-[4px] sm:py-[8px] rounded-[3px] bg-[#6b5f5fac] font-semibold  transition-bg ease-in duration-200 hover:bg-[#6b5f5fd2]"
        >
          {lang[langkey].useSignInCode}
        </button>

        <p className="text-white mx-auto cursor-pointer mt-[-10px] text-sm hover:underline">
          {lang[langkey].forgotPassword}
        </p>

        <div className="flex items-center space-x-1">
          <input
            name="input"
            type="checkbox"
            id="input"
            className=" cursor-pointer"
          />
          <label className="text-white " htmlFor="input">
            {lang[langkey].rememberMe}
          </label>
        </div>

        <p className="text-gray-500 text-sm font-semibold">
          {lang[langkey].newToNetflix}

          <button
            onClick={(event) => {
              event.preventDefault();
              navigate("/getstarted");
            }}
            className="text-white ml-1 hover:underline"
          >
            {lang[langkey].signup}
          </button>
        </p>
        <p className="text-gray-400 text-[.9rem]">
          {lang[langkey].reCAPTCHAProtection}
          <Link to="/learn_more" className="text-blue-700 ml-1 hover:underline">
            {lang[langkey].learnMore}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
