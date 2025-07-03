import React from 'react'

const Spinner = () => {
  return (
    <div className='flex flex-col items-center gap-2 w-full h-[90vh] justify-center'>
        <div className='spinner'></div>
        <div className='text-white'>Loading...</div>
    </div>
  )
}

export default Spinner