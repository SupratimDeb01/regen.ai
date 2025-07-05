import React from 'react';
import { LuTrash2, LuPlus } from 'react-icons/lu';
import Input from '../../../components/inputs/Input';

const SkillsInfoForm = ({ skillsData, updateArrayItem, addArrayItem, removeArrayItem }) => {
  const handleRatingClick = (index, rating) => {
    updateArrayItem('progress', rating, index); // progress will be a number from 1 to 5
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Skills</h2>

      {(skillsData || []).map((skill, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 shadow-sm relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <Input
              value={skill.name}
              onChange={({target}) => updateArrayItem('name', target.value, index)}
              label="Skill Name"
              placeholder="e.g. Figma"
              type="text"
            />

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Proficiency ({skill.progress || 0}/5)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    onClick={() => handleRatingClick(index, level)}
                    className={`w-5 h-5 rounded cursor-pointer transition-colors duration-200 ${
                      level <= (skill.progress || 0)
                        ? 'bg-amber-600'
                        : 'bg-amber-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Remove Button */}
          {skillsData.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem(index)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <LuTrash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      ))}

      {/* Add Skill Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => addArrayItem({ name: '', progress: 0 })}
          className="flex items-center gap-1 text-white border-stone-700 border-1 border-b-3 border-r-2 bg-linear-to-r from-amber-400/85 to-amber-500 px-4 py-2 rounded-md hover:bg-violet-700"
        >
          <LuPlus className="text-lg" />
          Add Skill
        </button>
      </div>
    </div>
  );
};

export default SkillsInfoForm;
