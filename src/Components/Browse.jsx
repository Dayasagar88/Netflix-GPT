import { useSelector } from "react-redux";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useTrendingMovies from "../Hooks/useTrendingMovies";
import useUpComingMovies from "../Hooks/useUpcomingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryCont from "./SecondaryCont";
import GptSearch from "./GptSearch";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  useNowPlayingMovies();
  useTrendingMovies();
  useUpComingMovies();
  useTopRatedMovies();
  const navigate = useNavigate();
  const userObj = useSelector((store) => store.user);

  // useEffect(() => {
  //   if (!userObj?.uid) {
  //     navigate("/mainpage");
  //   } else {
  //     navigate("/browse");
  //   }
  // }, []);

  const gptSearch = useSelector((store) => store.gptSearch.gptSearch);

  return (
    <div className="flex flex-col justify-center overflow-x-hidden bg-black">
      <Header gptSearch={gptSearch} />

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
