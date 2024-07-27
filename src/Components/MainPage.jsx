import React from 'react'
import LoginHeader from './LoginHeader'
import BgImage from "../Images/bg-image (2).jpg"


const MainPage = () => {
  return (
    <div className=" flex justify-center relative w-full max-w-full">
        <LoginHeader />
        <img className='h-[100vh] w-full' src={BgImage} alt="img" />
        <div class="absolute inset-0 bg-gradient-to-b from-[#050505c5]"></div>
    </div>
  )
}

export default MainPage