import React from 'react';
import Input from '../../../components/inputs/Input';
import { LuPlus, LuTrash2 } from 'react-icons/lu';

const CertificationsInfoForm = ({
  certificationsData,
  updateArrayItem,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Certifications</h2>

      {certificationsData.map((cert, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 shadow-sm relative">
          {/* Remove Button */}
          {certificationsData.length > 1 && (
            <button
              type="button"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => removeArrayItem(index)}
              title="Remove Certification"
            >
              <LuTrash2 className="text-xl" />
            </button>
          )}

          <Input
            value={cert.title}
            onChange={({ target }) => updateArrayItem('title', target.value, index)}
            label="Certification Title"
            placeholder="AWS Certified Cloud Practitioner"
            type="text"
          />

          <Input
            value={cert.issuer}
            onChange={({ target }) => updateArrayItem('issuer', target.value, index)}
            label="Issuer"
            placeholder="Amazon Web Services"
            type="text"
          />

          <Input
            value={cert.year}
            onChange={({ target }) => updateArrayItem('year', target.value, index)}
            label="Year"
            placeholder="2025"
            type="text"
          />
        </div>
      ))}

      {/* Add Certification Button */}
      <div className="flex justify-end">
        <button
          type="button"
          className="flex items-center gap-2 text-white border-stone-700 border-1 border-b-3 border-r-2 bg-linear-to-r from-amber-400/85 to-amber-500 hover:bg-violet-700 px-4 py-2 rounded-md font-semibold"
          onClick={() =>
            addArrayItem({
              title: '',
              issuer: '',
              year: ''
            })
          }
        >
          <LuPlus className="text-lg" />
          Add Certification
        </button>
      </div>
    </div>
  );
};

export default CertificationsInfoForm;
