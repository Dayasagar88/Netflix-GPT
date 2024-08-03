import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { LOADING_URL, POSTER_URL } from "../Utils/Constants";


const GptSearchSuggestion = () => {
  const movieSearchResults = useSelector(
    (store) => store.suggestMovie.movieData
  );

  const loading = useSelector((store) => store.suggestMovie.loading);

  // Create a ref to access the scrollable container
  

  return loading ? (
    <img className=" absolute top-[40%] rounded-lg w-32 sm:w-56" src={LOADING_URL} alt="loading" />
  ) : (
    <>
    
     <div className="slider bg-[#423f3fd2] gap-2 flex  absolute text-white top-[40%] rounded-lg max-w-[100vw] overflow-auto">
      {movieSearchResults?.map(
        (movie) =>
          movie && (
            <div className="text-center rounded-2xl ">
              { movie.poster_path &&
                <img
                  className="w-[14rem] rounded-[1.5rem] p-4 hover:scale-[1.05] transition-transform duration-300 cursor-pointer"
                  src={POSTER_URL + movie?.poster_path}
                  alt=""
                />
              }
             { movie.poster_path && <h1 className="text-[1rem] w-40 mb-2 mx-auto font-semibold">
                {movie?.title}
              </h1>}
            </div>
          )
      )}
    
    </div>
    <button>{">"}</button>
    </>
   
  );
};

export default GptSearchSuggestion;
