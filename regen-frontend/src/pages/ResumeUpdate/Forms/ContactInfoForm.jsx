import React from 'react'
import Input from '../../../components/inputs/Input'

const ContactInfoForm = ({contactData,updateSection}) => {
  return (
     <div className="max-w-xl mx-auto p-4 bg-white rounded-md">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Information</h2>
  <Input
      value={contactData?.email || ""}
      onChange={({ target }) => updateSection("email", target.value)}
      label="Email"
      placeholder="supratim.deb444@gmail.com"
      type="text"
    />


    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>

    <Input
      value={contactData?.phone || ""}
      onChange={({ target }) => updateSection("phone", target.value)}
      label="Phone Number"
      placeholder="+91 9674539112"
      type="text"
    />

    <Input
      value={contactData?.location || ""}
      onChange={({ target }) => updateSection("location", target.value)}
      label="Adress/Location"
      placeholder="RabindraPalli, Nimta"
      type="text"
    />

     <Input
      value={contactData?.linkedIn || ""}
      onChange={({ target }) => updateSection("linkedIn", target.value)}
      label="LinkedIn URL"
      placeholder="www.linkedin.com/in/supratim-deb-463900310"
      type="text"
    />

     <Input
      value={contactData?.github || ""}
      onChange={({ target }) => updateSection("github", target.value)}
      label="Github URL"
      placeholder="https://github.com/SupratimDeb01"
      type="text"
    />
</div>
    <Input
      value={contactData?.website || ""}
      onChange={({ target }) => updateSection("website", target.value)}
      label="Website URL"
      placeholder="supratimdeb.netlify.app"
      type="text"
    />
</div>
  )
}

export default ContactInfoForm
