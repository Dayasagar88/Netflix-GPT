import { API_OPTION } from "../Utils/Constants";

//Search movie in tmdb
const useSearchInTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTION
    );
    const response = await data.json();
    return response.results;
  };
  export default useSearchInTmdb;