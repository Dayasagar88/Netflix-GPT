import { useEffect } from 'react';
import { API_OPTION } from '../Utils/Constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../Utils/MoviesSlice';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

  //fetch data from TMDB API and push the data in store
  const nowPlayingMovies = async () =>{
    try{
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTION);

    const response = await data.json();
    dispatch(addNowPlayingMovies(response.results))
    }catch(error){
      console.log("error")
    }
  }

  useEffect(() => {
    nowPlayingMovies();
  }, [])
}

export default useNowPlayingMovies