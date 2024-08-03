import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Create a ref to access the scrollable container
  const scrollContainerRef = useRef(null);

  // Scroll amount in pixels for each click
  const scrollAmount = 300;

  // Handle left scroll
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  // Handle right scroll
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth", // Enable smooth scrolling
      });
    }
  };

  return (
    <div className="relative mb-3">
      <h1 className="sm:text-3xl text-xl text-white font-semibold">{title}</h1>
      <div
        ref={scrollContainerRef}
        className="slider flex gap-2 mt-1 overflow-y-visible overflow-x-scroll"
      >
        {movies &&
          movies.map((movie) => (
            <MovieCard key={movie.id} movieData={movie} />
          ))}
      </div>
      {/* Fixed position buttons */}
      <i
        onClick={scrollLeft}
        className="cursor-pointer text-white z-10 sm:text-5xl text-2xl absolute fa-solid fa-circle-chevron-left top-1/2 left-2 -translate-y-1/2"
      ></i>
      <i
        onClick={scrollRight}
        className="cursor-pointer text-white z-10 sm:text-5xl text-2xl absolute fa-solid fa-circle-chevron-right top-1/2 right-2 -translate-y-1/2"
      ></i>
    </div>
  );
};

export default MovieList;
