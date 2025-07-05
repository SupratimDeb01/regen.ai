import React, { useRef, useState } from 'react'
import { FaUserTie,FaTrashCan } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
const ProfilePhotoSelector = ({image,setImage,preview,setPreview}) => {
    const inputRef= useRef(null);
    const [previewUrl,setPreviewUrl]=useState(null);

    const handleImageChange=(e)=>{
        const selectedImage=e.target.files[0];
        if(selectedImage){
            //setting the dp
            setImage(selectedImage);
            //preview the image
            const preview=URL.createObjectURL(selectedImage);
            if(setPreview){
                setPreview(preview);
            }
            setPreviewUrl(preview);
        }
    };

    const handleImageDelete=()=>{
        setImage(null);
        setPreviewUrl(null);
        if(setPreview){
            setPreview(null);
        };
    };

    const handleChoosenImage=()=>{
        inputRef.current.click();
    };
  return (
    <div className="flex justify-center items-center ">
    <div className='flex flex-col justify-center bg-amber-100 shadow-lg rounded-full w-25 h-25 items-center'>
      <input
      type="file"
      accept="image/*"
      ref={inputRef}
      onChange={handleImageChange}
      className="hidden"
      />
    
    {!image ? (
     <div className="relative flex justify-center items-center w-25 h-25 shadow-lg rounded-full">
  {/* Avatar icon */}
  <FiUser className="w-15 h-15 text-amber-500" />

  {/* Upload button */}
  <button
    type="button"
    className="absolute top-17 left-17 w-9 h-9 rounded-full bg-linear-to-r from-amber-400/85 to-amber-500 flex justify-center shadow-lg items-center"
    onClick={handleChoosenImage}
  >
    <MdOutlineDriveFolderUpload className="text-white text-xl " />
  </button>
</div>
    ) : (
  <div className="relative flex justify-center items-center w-25 h-25">
    {/* Image in clipped container */}
    <div className="w-25 h-25 rounded-full overflow-hidden  shadow-lg">
      <img
        src={preview || previewUrl}
        alt="dp"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Trash icon outside the image container */}
    <button
      type="button"
      className="absolute top-17 left-17 w-9 h-9 rounded-full bg-linear-to-r from-red-400/85 to-red-500  flex justify-center items-center"
      onClick={handleImageDelete}
    >
      <FaTrashCan className="text-white text-md" />
    </button>
  </div>
)}
  </div>
  </div>
)};

export default ProfilePhotoSelector
