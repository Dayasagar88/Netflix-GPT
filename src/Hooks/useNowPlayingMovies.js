import { useEffect } from 'react';
import { API_OPTION } from '../Utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../Utils/MoviesSlice';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const nowPlayingMoviesInStore = useSelector(store => store.movies.nowPlayingMovies)

  //fetch data from TMDB API and push the data in store
  const nowPlayingMovies = async () =>{
    try{
      const nowPlayingMoviesData = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTION);

    const response = await nowPlayingMoviesData.json();
    dispatch(addNowPlayingMovies(response.results))
    }catch(error){
      console.log("error")
    }
  }

  useEffect(() => {
    !nowPlayingMoviesInStore && nowPlayingMovies();
  }, [])
}

export default useNowPlayingMovies