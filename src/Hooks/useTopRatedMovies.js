import { useEffect } from 'react';
import { API_OPTION } from '../Utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies } from '../Utils/MoviesSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    const topRatedMoviesInStore = useSelector(store => store.movies.topRatedMovies)

  //fetch data from TMDB API and push the data in store
  const topRatedMovies = async () =>{
    try{
        const topRatedMoviesData = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',API_OPTION )

    const response = await topRatedMoviesData.json();
    dispatch(addTopRatedMovies(response.results))
    }catch(error){
      console.log("error")
    }
  }

  useEffect(() => {
   !topRatedMoviesInStore  && topRatedMovies();
  }, [])
}

export default useTopRatedMovies