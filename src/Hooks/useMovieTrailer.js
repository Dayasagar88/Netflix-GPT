import { useEffect } from "react";
import { API_OPTION } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { addTrailer } from "../Utils/MoviesSlice";


const useMovieVideos = (movieId) => {

    const dispatch = useDispatch()

    const getMovieVideos = async () => {
        try{
            const data = await fetch ('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', API_OPTION)
            const response = await data.json();
            console.log(response.results);

            const filterTrailers = response.results.filter((video) => video?.type === "Trailer");
            const trailer = filterTrailers.length ? filterTrailers[0] : response.results[0];
            console.log(trailer)
            dispatch(addTrailer(trailer.key))
        }catch(e){
            console.log("error", e)
        }
    }

    useEffect(() => {
        getMovieVideos()
    }, [])

}

export default useMovieVideos