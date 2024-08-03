import React from "react";
import BgImage from "../Images/bg-image (2).jpg";
import GptSearchInput from "./GptSearchInput";
import GptSearchSuggestion from "./GptSearchSuggestion";

const GptSearch = ({ gptSearch }) => {
  return (
    <div className="relative flex justify-center ">
      <img className="h-[100vh] w-screen object-cover" src={BgImage} alt="img" />
      <div class="absolute inset-0 bg-gradient-to-b from-[#050505c5]"></div>
      <GptSearchInput/>
      <GptSearchSuggestion/>

    </div>
  );
};

export default GptSearch;
