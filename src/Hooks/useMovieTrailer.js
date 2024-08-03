import { useEffect } from "react";
import { API_OPTION } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailer } from "../Utils/MoviesSlice";


const useMovieVideos = (movieId) => {

    const dispatch = useDispatch();

    const getMovieVideos = async () => {
        try{
            const data = await fetch ('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', API_OPTION)
            const response = await data.json();

            const filterTrailers = response.results.filter((video) => video?.type === "Trailer");
            const trailer = filterTrailers.length ? filterTrailers[0] : response.results[0];
            dispatch(addTrailer(trailer.key))
        }catch(e){
            console.log("error", e)
        }
    }

    useEffect(() => {
         getMovieVideos()
    }, [movieId])

}

export default useMovieVideos