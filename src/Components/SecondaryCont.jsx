import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryCont = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies.nowPlayingMovies);

  return (
    <div className="-mt-28 z-30">
      {/* 
        - Multiple movie list 
          - Popular
          - Now playing
          - Tranding
          - Horror
      */}

      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Trending"} movies={movies.trendingMovies} />
      <MovieList title={"Upcoming"} movies={movies.upComingMovies} />
      <MovieList title={"Free To Watch"} movies={movies.nowPlayingMovies} />
      <MovieList title={"In Theatres"} movies={movies.nowPlayingMovies} />
    </div>
  );
};

export default SecondaryCont;
