import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const updateTrailer = useSelector(store => store.movies.newTrailer)
  
  // const {title: updatedtitle, overview: updatedOverview, id: updatedId} = updateTrailer;

  if (!movies) return;

  const mainMovie = updateTrailer ? updateTrailer : movies[4];

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
