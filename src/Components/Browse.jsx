import { useSelector } from "react-redux";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useTrendingMovies from "../Hooks/useTrendingMovies";
import useUpComingMovies from "../Hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryCont from "./SecondaryCont";
import GptSearch from "./GptSearch";

const Browse = () => {
  useNowPlayingMovies();
  useTrendingMovies();
  useUpComingMovies();
  useTopRatedMovies();
  const gptSearch = useSelector((store) => store.gptSearch.gptSearch);

  console.log(process.env.REACT_APP_GEN_AI_KEY )
  console.log(process.env.REACT_APP_TMDB_KEY)

  return (
    
    <div className="flex flex-col justify-center overflow-x-hidden bg-black">
      <Header gptSearch={gptSearch}/>

      {gptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryCont />
        </>
      )}
    </div>
  );
};

export default Browse;
