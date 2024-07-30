import React from 'react'

const VideoTitle = ({title, desc}) => {
  return (
    <div className='space-y-5 ml-10 absolute top-[50%] text-white'>
        <h1 className='text-5xl font-bold'>{title}</h1>
        <p className='text-xl w-1/2 font-semibold '>{desc}</p>
        <div className=' flex  space-x-2'>
            <button className='flex text-black text-lg items-center font-bold bg-white px-5 rounded-md'><i className=" text-[1.7rem] mr-2 fa-solid fa-play"></i>Play</button>
            <button className=' flex items-center text-lg font-semibold bg-gray-600 px-1 py-3 rounded-md text-white'><i className="text-xl mr-2 fa-solid fa-circle-exclamation"></i>More info.</button>
        </div>
    </div>
  )
}

export default VideoTitle