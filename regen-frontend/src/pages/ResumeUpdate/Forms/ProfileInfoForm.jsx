import React from 'react'
import ProfilePhotoSelector from '../../../components/inputs/ProfilePhotoSelector';
import Input from '../../../components/inputs/Input';
import { LuBrain } from "react-icons/lu";

const ProfileInfoForm = ({profileData,updateSection}) => {
    

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Personal Information</h2>

  <div className="flex flex-col gap-4 border p-4 rounded-md mb-4 shadow-sm relative">
    <ProfilePhotoSelector
      image={profileData?.profileImg || profileData?.profilePreviewUrl}
      setImage={(value) => updateSection("profileImg", value)}
      preview={profileData?.profilePreviewUrl}
      setPreview={(value) => updateSection("profilePreviewUrl", value)}
    />
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
    <Input
      value={profileData?.fullName || ""}
      onChange={({ target }) => updateSection("fullName", target.value)}
      label="Full Name"
      placeholder="Supratim Deb"
      type="text"
    />

    <Input
      value={profileData?.designation || ""}
      onChange={({ target }) => updateSection("designation", target.value)}
      label="Designation"
      placeholder="Front-End Developer"
      type="text"
    />
</div>
    <div>
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold">Summary</h3>
        <button
          type="button"
          className="flex items-center gap-1  border-black text-white border-1 border-r-2 bg-linear-to-r from-amber-400/85 to-amber-500 hover:bg-violet-700 w-[140px] h-12 justify-center rounded-sm border-b-3 font-bold text-md"
        >
          <LuBrain className="text-lg" />
          Generate
        </button>
      </div>
      <textarea
        className="w-full h-28 p-2 border border-gray-300 rounded-md resize-none"
        placeholder="Short Introduction..."
        value={profileData?.summary || ""}
        onChange={({ target }) => updateSection("summary", target.value)}
      />
    </div>
  </div>
</div>
  )
}

export default ProfileInfoForm