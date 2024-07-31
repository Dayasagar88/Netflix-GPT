import { useEffect } from 'react';
import { API_OPTION } from '../Utils/Constants';
import { useDispatch } from 'react-redux';
import {  addUpComingMovies } from '../Utils/MoviesSlice';

const useUpComingMovies = () => {
    const dispatch = useDispatch();

  //fetch data from TMDB API and push the data in store
  const upComingMovie = async () =>{
    try{
      const upComingMovieData = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTION);

    const response = await upComingMovieData.json();
    dispatch(addUpComingMovies(response.results))
    }catch(error){
      console.log("error")
    }
  }

  useEffect(() => {
    upComingMovie();
  }, [])
}

export default useUpComingMovies