import useNowPlayingMovies from '../Hooks/useNowPlayingMovies'
import useTrendingMovies from '../Hooks/useTrendingMovies'
import useUpComingMovies from '../Hooks/useUpcomingMovies'
import Header from './Header'
import MainContainer from './MainContainer'
import SecondaryCont from './SecondaryCont'



const Browse = () => {
  const nowPlayingMovies = useNowPlayingMovies()
  const trendingMovies = useTrendingMovies();
  const upComingMovies = useUpComingMovies()
  
  return  (
  <div className='flex flex-col justify-center overflow-x-hidden bg-black'>
      <Header/>

      {/* 
        Main container
         - VideoBackground
         - video title
        Secondary container
         - Movies List * n
           - cards * n
      */}

      <MainContainer/>
      <SecondaryCont/>

      
    </div>
  )
}

export default Browse