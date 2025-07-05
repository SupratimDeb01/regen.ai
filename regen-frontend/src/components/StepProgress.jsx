import React from 'react'

const StepProgress = ({progress}) => {
  return (
    <div className='w-full bg-violet-100 h-1 overflow-hidden rounded-md'>
        <div className="h-1 bg-linear-to-r from-violet-600/45 to-violet-900 transition-all rounded-md" style={{width:`${progress}%`}}></div>
    </div>
  )
}

export default StepProgress
