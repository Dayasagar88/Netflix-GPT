import React from 'react'
import { useSelector } from 'react-redux'
import { photoURL } from '../Utils/Constants'

const SignOutMenu = ({handleSignOut}) => {

    const userName = useSelector(store => store.user.displayName)
  return (
    <div className='absolute p-3 space-y-2 sm:space-y-3 sm:w-40 right-4 text-xs sm:text-sm font-semibold  top-10 rounded-sm sm:top-16 bg-[#363434ec] text-white z-10'>
        <li className=' cursor-pointer flex list-none'><img className=' mr-1 w-5 rounded-full'  src={photoURL} alt="" />{userName}</li>
        <li className=' cursor-pointer list-none'><i className= " mr-1 w-5 h-1 fa-solid fa-pencil"></i>Manage Profile</li>
        <li className=' cursor-pointer list-none'> <i className= " mr-1 w-5 h-1 fa-solid fa-user"></i>Account</li>
        <li className=' cursor-pointer list-none'><i className= " mr-1 w-5 h-1 fa-solid fa-question"></i>Help Center</li>
        <button  onClick={handleSignOut} className='border-t-[1px] pt-1 w-full hover:underline'>Sign Out</button>
    </div>
  )
}

export default SignOutMenu