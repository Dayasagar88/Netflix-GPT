import { useEffect } from 'react';
import { API_OPTION } from '../Utils/Constants';
import { useDispatch } from 'react-redux';
import { addTrendingMovies } from '../Utils/MoviesSlice';

const useTrendingMovies = () => {
    const dispatch = useDispatch();

  //fetch data from TMDB API and push the data in store
  const nowPlayingMovies = async () =>{
    try{
        const trendingMoviesData = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', API_OPTION)

    const response = await trendingMoviesData.json();
    dispatch(addTrendingMovies(response.results))
    }catch(error){
      console.log("error")
    }
  }

  useEffect(() => {
    nowPlayingMovies();
  }, [])
}

export default useTrendingMovies