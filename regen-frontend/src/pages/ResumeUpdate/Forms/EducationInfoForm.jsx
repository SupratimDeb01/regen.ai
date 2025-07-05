import React from 'react';
import Input from '../../../components/inputs/Input';
import { LuTrash2, LuPlus } from 'react-icons/lu';

const EducationInfoForm = ({
  educationData,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Education</h2>

      {educationData.map((education, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 shadow-sm relative">
          {/* Conditional Remove Button */}
          {educationData.length > 1 && (
            <button
              type="button"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => removeArrayItem(index)}
              title="Remove Education"
            >
              <LuTrash2 className="text-xl" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <Input
              value={education.degree}
              onChange={({ target }) =>
                updateArrayItem('degree', target.value, index)
              }
              label="Degree"
              placeholder="B.Tech in Computer Science"
              type="text"
            />

            <Input
              value={education.institution}
              onChange={({ target }) =>
                updateArrayItem('institution', target.value, index)
              }
              label="Institution"
              placeholder="ABC Institute of Technology"
              type="text"
            />

            <Input
              value={education.startDate}
              onChange={({ target }) =>
                updateArrayItem('startDate', target.value, index)
              }
              label="Start Date"
              placeholder="08/2021"
              type="text"
            />

            <Input
              value={education.endDate}
              onChange={({ target }) =>
                updateArrayItem('endDate', target.value, index)
              }
              label="End Date"
              placeholder="07/2025"
              type="text"
            />
          </div>
        </div>
      ))}

      {/* Add Education Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            addArrayItem({
              degree: '',
              institution: '',
              startDate: '',
              endDate: '',
            })
          }
          className="flex items-center gap-2 text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-md font-semibold"
        >
          <LuPlus className="text-lg" />
          Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationInfoForm;
