import React from "react";
import { POSTER_URL } from "../Utils/Constants";

const MovieCard = ({ movieData }) => {
  // console.log(movieData[0].poster_path)

  return (
    <div className=" relative space-y-1 sm:w-48 overflow-hidden text-white bg-gray-1000 rounded-md p-2 flex-none ">
      <img
        className=" cursor-pointer rounded-md hover:scale-[1.05] transition-transform duration-300"
        src={POSTER_URL + movieData?.poster_path}
        alt="poster"
      />
      <p className="w-[100%] font-bold">{movieData?.title}</p>
      <p>{movieData?.release_date}</p>
      <p className=" absolute bg-yellow-200 bottom-1 text-black inline font-semibold px-1 rounded-sm">IMDb : <span className="text-white bg-black p-1">{movieData?.vote_average}</span></p>
    </div>
  );
};

export default MovieCard;
