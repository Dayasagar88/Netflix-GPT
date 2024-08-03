import React from 'react'

const VideoTitle = ({title, desc}) => {
  return (
    <div className='sm:space-y-5 space-y-2 sm:ml-10 ml-3 absolute sm:top-[50%] top-[45%] text-white'>
        <h1 className='sm:text-5xl text-xl font-bold'>{title}</h1>
        <p className=' slider sm:text-xl text-sm sm:w-1/2 w-5/6 h-20 overflow-y-auto font-semibold'>{desc}</p>
        <div className=' flex  space-x-2'>
            <button className='flex text-black text-lg items-center font-bold bg-white sm:px-5 px-3 rounded-md'><i className=" sm:text-[1.7rem] mr-2 fa-solid fa-play"></i>Play</button>
            <button className=' flex items-center sm:text-lg font-semibold bg-gray-600 px-1 sm:py-3 py-1 rounded-md text-white'><i className="sm:text-xl mr-2 fa-solid fa-circle-exclamation"></i>More info.</button>
        </div>
    </div>
  )
}

export default VideoTitle