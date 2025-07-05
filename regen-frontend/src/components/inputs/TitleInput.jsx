import React, { useState } from 'react';
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";

const TitleInput = ({ title, setTitle, resumeId, onTitleUpdate }) => {
  const [showInput, setShowInput] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleConfirm = async () => {
    setTitle(tempTitle); // Update local state

    // Update in DB if resumeId exists
    if (resumeId && onTitleUpdate) {
      await onTitleUpdate(tempTitle);
    }

    setShowInput(false);
  };

  return (
    <div className='flex w-auto justify-center items-center gap-2'>
      {showInput ? (
        <>
          <input
            type="text"
            placeholder='Resume Title'
            className='border-2 px-2 py-1 rounded'
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
          />
          <button onClick={handleConfirm} className='text-green-600 text-xl'>
            <IoMdCheckboxOutline />
          </button>
        </>
      ) : (
        <>
          <h2 className='font-bold text-md'>{title || 'Untitled Resume'}</h2>
          <button
            className='text-violet-600 text-xl'
            onClick={() => {
              setTempTitle(title);
              setShowInput(true);
            }}
          >
            <MdOutlineEdit />
          </button>
        </>
      )}
    </div>
  );
};


export default TitleInput;
