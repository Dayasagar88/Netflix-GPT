import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerId = useSelector((store) => store.movies.trailer);
  useMovieTrailer(movieId);

  if (!trailerId) return;

  return (
    <div className="relative w-full h-[90vh]">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&loop=1&controls=0&playlist=${trailerId}&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&enablejsapi=1&mute=1`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 pointer-events-none"></div>
    </div>
  );
};

export default VideoBackground;