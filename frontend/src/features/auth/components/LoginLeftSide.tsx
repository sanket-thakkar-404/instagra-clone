import React from 'react'

const LoginLeftSide = () => {
  return (
   
      <div className="w-4/6 hidden lg:flex flex-col justify-center items-center px-16 relative">
          
          {/* Instagram Logo */}
          <div className="absolute top-10 left-5 text-2xl font-bold">
            Instagram
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-semibold leading-tight text-center">
            See everyday moments from your <br />
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              close friends.
            </span>
          </h1>

          {/* Mock Cards */}
          <div className='h-[70%]'>
            <img src="https://static.cdninstagram.com/rsrc.php/v4/yD/r/nWfBjz-5_uf.png" alt="instagram side"  />
          </div>
        </div>
  )
}

export default LoginLeftSide
