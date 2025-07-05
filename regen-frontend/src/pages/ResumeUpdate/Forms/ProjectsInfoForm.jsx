import React from 'react';
import Input from '../../../components/inputs/Input';
import { LuPlus, LuTrash2, LuBrain } from 'react-icons/lu';

const ProjectsInfoForm = ({
  projectsData, 
  updateArrayItem,
  addArrayItem,
  removeArrayItem
}) => {
  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Projects</h2>

      {(projectsData || []).map((project, index) => (
        <div key={index} className="border p-4 rounded-md mb-4 shadow-sm relative">
          {projectsData.length > 1 && (
            <button
              type="button"
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              onClick={() => removeArrayItem(index)}
              title="Remove Project"
            >
              <LuTrash2 className="text-xl" />
            </button>
          )}

          <Input
              value={project.title}
              onChange={({ target }) => updateArrayItem('title', target.value, index)}
              label="Project Title"
              placeholder="My MERN Stack App"
              type="text"
            />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            
            <Input
              value={project.github}
              onChange={({ target }) => updateArrayItem('github', target.value, index)}
              label="GitHub Link"
              placeholder="https://github.com/..."
              type="text"
            />
            <Input
              value={project.liveDemo}
              onChange={({ target }) => updateArrayItem('liveDemo', target.value, index)}
              label="Live Demo Link"
              placeholder="https://yourapp.live"
              type="text"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold">Description</h3>
              <button
                type="button"
                className="flex items-center gap-1 bg-linear-to-r from-amber-400/85 to-amber-500 hover:bg-violet-700 text-white w-[140px] h-10 justify-center rounded-sm font-bold text-sm"
              >
                <LuBrain className="text-lg" />
                Generate
              </button>
            </div>
            <textarea
              className="w-full h-28 p-2 border border-gray-300 rounded-md resize-none"
              placeholder="What does your project do?"
              value={project.description || ''}
              rows={3}
              onChange={({ target }) =>
                updateArrayItem('description', target.value, index)
              }
            />
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            addArrayItem({
              title: '',
              description: '',
              github: '',
              liveDemo: '',
            })
          }
          className="flex items-center gap-2 text-white border-stone-700 border-1 border-b-3 border-r-2 bg-linear-to-r from-amber-400/85 to-amber-500 hover:bg-violet-700 px-4 py-2 rounded-md font-semibold"
        >
          <LuPlus className="text-lg" />
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsInfoForm;
