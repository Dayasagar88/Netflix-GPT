import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie = movies[2];
  console.log(mainMovie);

  const { title, overview, id } = mainMovie;

  return (
    movies && (
      <div className="w-full relative">
        <VideoBackground movieId={id} />
        <VideoTitle title={title} desc={overview} />
      </div>
    )
  );
};

export default MainContainer;
