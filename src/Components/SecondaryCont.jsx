import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryCont = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="-mt-28 z-30">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
      <MovieList title={"Trending"} movies={movies.trendingMovies} />
      <MovieList title={"Upcoming"} movies={movies.upComingMovies} />
      <MovieList title={"In Theatres"} movies={movies.nowPlayingMovies} />
    </div>
  );
};

export default SecondaryCont;
