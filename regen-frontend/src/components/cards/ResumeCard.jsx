import React from 'react'

const ResumeCard = ({title,imgUrl,onSelect}) => {

  return (
      <div className='h-[300px]  flex flex-col gap-0 items-center justify-center border-emerald-100 hover:border-emerald-200  border-2 rounded-lg cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200' onClick={onSelect}> 
        <div className='h-[260px] w-full bg-gray-100'>
        {imgUrl?(<img src={imgUrl} alt="Thumbnail" className='w-full h-full object-fill'/>):(<div className="w-full h-full flex items-center justify-center text-sm text-gray-400">No Preview</div>)}
        </div>
        <div className='flex h-[40px] items-center px-2'>
        <h3 className='font-semibold text-sm text-stone-700 text-center truncate'>{title || "Untitled Resume"}</h3>
        </div>
      </div>
  )
}

export default ResumeCard
