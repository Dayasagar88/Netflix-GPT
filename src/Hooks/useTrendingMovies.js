import { useEffect } from 'react';
import { API_OPTION } from '../Utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTrendingMovies } from '../Utils/MoviesSlice';

const useTrendingMovies = () => {
    const dispatch = useDispatch();

    //Memoization
    const trendingMoviesInStore = useSelector(store => store.movies.trendingMovies)

  //fetch data from TMDB API and push the data in store
  const nowTrendingMovies = async () =>{
    try{
        const trendingMoviesData = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', API_OPTION)

    const response = await trendingMoviesData.json();
    dispatch(addTrendingMovies(response.results))
    }catch(error){
      console.log("error")
    }
  }

  useEffect(() => {
   !trendingMoviesInStore && nowTrendingMovies();
  }, [])
}

export default useTrendingMovies