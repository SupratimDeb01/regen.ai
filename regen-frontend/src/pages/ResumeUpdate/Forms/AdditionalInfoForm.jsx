import React from 'react';
import { LuTrash2, LuPlus } from 'react-icons/lu';
import Input from '../../../components/inputs/Input';

const AdditionalInfoForm = ({
  interestsData,
  languagesData,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Additional Information</h2>

         {/* Languages Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Languages</h3>
        {languagesData.map((language, index) => (
          <div key={index} className="mb-4 relative grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 border p-3 rounded-md">
            <Input
              value={language.name||""}
              onChange={({target}) => updateArrayItem('languages','name', target.value, index)}
              label="Language"
              type="text"
              placeholder="e.g. English"
            />

            <div className="mt-0 flex flex-col gap-2">
              <label className="block font-bold text-md  mb-1">Proficiency</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    onClick={() => updateArrayItem('languages','progress', level, index)}
                    className={`w-5 h-5 rounded cursor-pointer ${
                      level <= language.progress
                        ? 'bg-amber-600'
                        : 'bg-amber-300'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {languagesData.length > 1 && (
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => removeArrayItem("languages",index)}
              >
                <LuTrash2 className="text-xl" />
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-start">
          <button
            type="button"
            className="flex items-center gap-2 text-white border-stone-700 border-1 border-b-3 border-r-2 bg-linear-to-r from-amber-400/85 to-amber-500 hover:bg-violet-700 px-4 py-2 rounded-md font-semibold"
            onClick={() => addArrayItem("languages",{ name: '', progress: 0 })}
          >
            <LuPlus className="text-lg" />
            Add Language
          </button>
        </div>
      </div>

      {/* Interests Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Interests</h3>
        {interestsData.map((interest, index) => (
          <div key={index} className="mb-4 relative">
            <Input
              value={interest||""}
              onChange={({target}) => updateArrayItem('interests',null, target.value, index)}
              placeholder="e.g. Reading, Gaming, Traveling"
              type="text"
            />
            {interestsData.length > 1 && (
              <button
                type="button"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => removeArrayItem('interests',index)}
              >
                <LuTrash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-start">
          <button
            type="button"
            className="flex text-white items-center gap-1 font-bold border-stone-700 border-1 border-b-3 border-r-2 bg-linear-to-r from-amber-400/85 to-amber-500 px-4 py-2 rounded-md hover:bg-violet-700"
            onClick={() => addArrayItem('interests','')}
          >
            <LuPlus className="text-lg text-white" />
            Add Interest
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default AdditionalInfoForm;
