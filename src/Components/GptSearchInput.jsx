import React, { useRef } from "react";
import language from "../Utils/LanguageConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovies,
  addMoviesData,
  emptyMovieData,
  updateLoading,
} from "../Utils/suggestMoviesSlice";
import { run } from "../Utils/GenAi";
import { API_OPTION } from "../Utils/Constants";

const GptSearchInput = () => {
  const langKey = useSelector((store) => store.config.language);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //Search movie in tmdb
  const searchInTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTION
    );
    const response = await data.json();
    return response.results;
  };

  async function handleSearch(query) {
    dispatch(emptyMovieData());
    dispatch(updateLoading());

    try {
      // Await the run function to get the response
      const response = await run(query);
      const movies = response.split(",");
      dispatch(addMovies(movies));
      dispatch(updateLoading());

      // Map each movie to a promise returned by searchInTmdb
      const movieResults = movies.map((movie) => searchInTmdb(movie));

      // Await the resolution of all promises in the movieResults array
      const tmdbResults = await Promise.all(movieResults);
      const filteredResult = tmdbResults.map((result) => result[0])
      dispatch(addMoviesData(filteredResult));
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }

  return (
    <div className=" absolute text-white top-[30%] sm:top-[20%] w-full">
      <form className="bg-black sm:p-5 p-3 w-[90%] sm:w-[50%] grid grid-cols-12 mx-auto rounded-lg">
        <input
          ref={searchText}
          className="px-2 sm:text-[1rem] text-xs outline-none font-semibold text-black sm:py-3 py-2 rounded-l-md col-span-9"
          type="text"
          placeholder={language[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if(searchText.current.value){
            handleSearch(searchText.current.value);
            }
          }}
          className="bg-red-600 sm:text-xl rounded-r-md font-semibold col-span-3 hover:bg-red-700 transition-bg duration-200"
        >
          {language[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchInput;
