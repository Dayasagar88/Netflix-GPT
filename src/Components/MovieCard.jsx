import React  from "react";
import { POSTER_URL } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { updateTrailer } from "../Utils/MoviesSlice";


const MovieCard = ({ movieData }) => {
  const dispatch = useDispatch()

  
// console.log(movieData)
  return (
    <div className=" relative space-y-3 sm:w-48 w-32 overflow-hidden text-white bg-gray-1000 rounded-md p-2 flex-none ">
      <img
      onClick={() => {
        dispatch(updateTrailer(movieData))
      }}
        className=" cursor-pointer rounded-md hover:scale-[1.05] transition-transform duration-300"
        src={POSTER_URL + movieData?.poster_path}
        alt="poster"
      />
      <p className="w-[100%] sm:text-[1rem] text-xs  font-bold">{movieData?.title}</p>
      {/* <p className="sm:text-[1rem] text-xs">{movieData?.release_date}</p> */}
      {/* <p className=" absolute bg-[#f0f0f08a] sm:text-[1rem] text-[.7rem] bottom-1 text-black inline font-semibold px-1 rounded-sm">IMDb : <span className="text-white bg-black p-1">{(movieData?.vote_average).toFixed(1)}</span></p> */}
    </div>
  );
};

export default MovieCard;
