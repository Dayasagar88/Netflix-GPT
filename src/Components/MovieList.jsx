import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);

  return (
    <div>
      <h1 className="text-3xl text-white font-semibold ">{title}</h1>
      <div className=" relative  flex gap-2 mt-1  overflow-y-visible overflow-x-scroll">
        <i className=" cursor-pointer text-white z-10 left-2 text-5xl absolute fa-solid fa-circle-chevron-left -translate-y-1/2 top-1/2 "></i>
        {movies &&
          movies.map((movie) => <MovieCard key={movie.id} movieData={movie} />)}
        <i className=" cursor-pointer text-white right-2 text-5xl absolute fa-solid fa-circle-chevron-right -translate-y-1/2 top-1/2 "></i>
      </div>
    </div>
  );
};

export default MovieList;
