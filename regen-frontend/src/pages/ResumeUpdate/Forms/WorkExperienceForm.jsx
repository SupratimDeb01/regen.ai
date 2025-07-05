import React from 'react';
import Input from '../../../components/inputs/Input';
import { LuBrain, LuPlus, LuTrash2 } from 'react-icons/lu';

const WorkExperienceForm = ({
  workExperienceData,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Work Experience</h2>

      {workExperienceData.map((experience, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 shadow-sm relative">
          {/* Remove Button (conditional) */}
          {workExperienceData.length > 1 && (
            <button
              type="button"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => removeArrayItem(index)}
              title="Remove Experience"
            >
              <LuTrash2 className="text-xl" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            <Input
              value={experience.company}
              onChange={({ target }) =>
                updateArrayItem('company', target.value, index)
              }
              label="Organization Name"
              placeholder="Cognizant"
              type="text"
            />

            <Input
              value={experience.role}
              onChange={({ target }) =>
                updateArrayItem('role', target.value, index)
              }
              label="Role"
              placeholder="Associate Software Engineer"
              type="text"
            />

            <Input
              value={experience.startDate}
              onChange={({ target }) =>
                updateArrayItem('startDate', target.value, index)
              }
              label="Start Date"
              placeholder="06/06/2024"
              type="text"
            />

            <Input
              value={experience.endDate}
              onChange={({ target }) =>
                updateArrayItem('endDate', target.value, index)
              }
              label="End Date"
              placeholder="19/06/2025"
              type="text"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold">Description</h3>
              <button
                type="button"
                className="flex items-center gap-1 border-stone-700 border-1 border-b-2 border-r-2 bg-linear-to-r from-amber-400/85 to-amber-500 hover:bg-violet-700 text-white  w-[140px] h-10 justify-center rounded-sm font-bold text-sm"
              >
                <LuBrain className="text-lg" />
                Generate
              </button>
            </div>
            <textarea
              className="w-full h-28 p-2 border border-gray-300 rounded-md resize-none"
              placeholder="What did you do at this organization?"
              value={experience.description || ''}
              rows={3}
              onChange={({ target }) =>
                updateArrayItem('description', target.value, index)
              }
            />
          </div>
        </div>
      ))}

      {/* Add Work Experience Button (bottom right) */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={() =>
            addArrayItem({
              company: '',
              role: '',
              startDate: '',
              endDate: '',
              description: '',
            })
          }
          className="flex items-center  gap-2 text-white border-stone-700 border-1 border-b-3 border-r-2 bg-linear-to-r from-amber-400/85 to-amber-500 hover:bg-violet-700 px-4 py-2 rounded-md font-semibold"
        >
          <LuPlus className="text-lg" />
          Add Work Experience
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
