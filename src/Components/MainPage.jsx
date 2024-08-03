import React from 'react'
import LoginHeader from './LoginHeader'
import BgImage from "../Images/bg-image (2).jpg"
import { useSelector } from 'react-redux'
import lang from '../Utils/LanguageConstants'


const MainPage = () => {
  const langKey = useSelector(store => store.config.language)
  return (
    <div className=" flex justify-center relative w-full items-center max-w-full">
        <LoginHeader />
        <img className='h-[100vh] w-full object-cover' src={BgImage} alt="img" />
        <div className=' text-white sm:space-y-5 space-y-3  text-center absolute w-full  z-10'>
          <h1 className='sm:text-5xl text-2xl font-bold'>{lang[langKey].mainPageHeading}</h1>
          <p className='sm:text-xl text-[1rem] font-semibold'>{lang[langKey].text_1}</p>
          <p className='sm:text-lg text-sm font-semibold'>{lang[langKey].text_2}</p>
          <form className='sm:w-[35%] w-[90%] gap-2 grid grid-cols-12 mx-auto'>
            <input className='sm:py-[.9rem] py-2 px-2 col-span-8 bg-[#131212b9] border-[1px] font-semibold border-gray-500 rounded-sm' type="text" placeholder={lang[langKey].email} />
            <button className=' col-span-4 font-semibold text-sm lg:text-lg  bg-red-600 rounded-sm'>{lang[langKey].getstarted}<i className=" ml-2 fa-solid fa-angle-right"></i></button>
          </form>
        </div>
        <div class="absolute inset-0 bg-gradient-to-b from-[#050505c5]"></div>
    </div>
  )
}

export default MainPage