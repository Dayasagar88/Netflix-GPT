import useNowPlayingMovies from '../Hooks/useNowPlayingMovies'
import Header from './Header'
import MainContainer from './MainContainer'
import SecondaryCont from './SecondaryCont'



const Browse = () => {
  const nowPlayingMovies = useNowPlayingMovies()
  
  return (
    <div className='flex justify-evenly'>
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