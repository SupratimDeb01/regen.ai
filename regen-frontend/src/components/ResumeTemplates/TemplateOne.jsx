import React, { useRef, useEffect, useState } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuRss,
  LuGithub,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8BD", "#4A5565"];

const Title = ({ text, color }) => (
  <div className="relative w-fit mb-2.5">
    <span
      className="absolute bottom-0 left-0 w-full h-2"
      style={{ backgroundColor: color }}
    />
    <h2 className="relative text-sm font-bold">{text}</h2>
  </div>
);

// New Block-Based Progress Component
const ProgressBlocks = ({ level }) => {
  const blocks = Array(5).fill(0);
  return (
    <div className="flex gap-1 mt-1">
      {blocks.map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-sm"
          style={{
            backgroundColor:
              i < level
                ? i === 4
                ? "#007B83"   // deep teal for top level
                : "#00A6B4"   // medium teal for intermediate
              : "#E5E7EB"   // gray
          }}
        />
      ))}
    </div>
  );
};


const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current) {
      const actualBaseWidth = resumeRef.current.offsetWidth || 800;
      setBaseWidth(actualBaseWidth);
      setScale(containerWidth / actualBaseWidth);
    }
  }, [containerWidth]);

  const {
    fullName,
    designation,
    profilePreviewUrl,
    summary,
  } = resumeData.profileInfo;

  const {
    email,
    phone,
    location,
    linkedIn,
    github,
    website,
  } = resumeData.contactInfo;

  const education = resumeData.education || [];
  const languages = resumeData.languages || [];
  const skills = resumeData.skills || [];
  const certifications = resumeData.certifications || [];
  const workExperience = resumeData.workExperience || [];
  const interests = resumeData.interests || [];
  const projects = resumeData.projects || [];

  return (
    <div
      className="flex justify-center items-start w-full h-full overflow-auto"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      <div
        ref={resumeRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${baseWidth}px`,
          minHeight: "100%",
          background: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "row",
          fontFamily: "sans-serif",
        }}
      >
        {/* Left Sidebar */}
        <div
          style={{
            backgroundColor: themeColors[0],
            padding: "2rem 1rem",
            width: "35%",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            color: "#000",
            overflowWrap: "break-word",
          }}
        >
          {/* Profile */}
          <div className="flex flex-col items-center">
            <div className="flex bg-white w-[120px] h-[120px] justify-center items-center rounded-full shadow-lg">

            <div
              style={{
                backgroundColor: themeColors[1],
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              >
              {profilePreviewUrl ? (
                <img
                src={profilePreviewUrl}
                alt="profile"
                className="w-full h-full object-cover"
                />
              ) : (
                <LuUser className="text-4xl" style={{ color: themeColors[4] }} />
              )}
            </div>
              </div>
            <h2 className="text-lg font-semibold mt-2 text-center break-words">
              {fullName}
            </h2>
            <p className="text-sm text-gray-700 text-center">{designation}</p>
          </div>

          {/* Contact Info */}
          <div className="text-sm space-y-2 break-words">
            {location && (
              <div className="flex items-center gap-2">
                <span className="pt-0.5">

                <LuMapPinHouse /> 
                </span>
                <span className="break-words w-[calc(100%-1.5rem)] text-[13px]">{location}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-2">
                  <span className="pt-0.5">
                  <LuMail />
                  </span>
             <span className="break-words w-[calc(100%-1.5rem)] text-[13px]">{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2">
                <span className="pt-0.5">

                <LuPhone /> 
                </span>
                <span className="break-words w-[calc(100%-1.5rem)] text-[13px]">{phone}</span>
              </div>
            )}
            {linkedIn && (
              <div className="flex items-center gap-2">
                <span className="pt-0.5">

                <RiLinkedinLine /> 
                </span>
                <span className="break-words w-[calc(100%-1.5rem)] text-[13px]">{linkedIn}</span>
              </div>
            )}
            {github && (
              <div className="flex items-center gap-2">
                <span className="pt-0.5">

                <LuGithub /> 
                </span>
                <span className="break-words w-[calc(100%-1.5rem)] text-[13px]">{github}</span>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-2">
                <span className="pt-0.5">

                <LuRss /> 
                </span>
                <span className="break-words w-[calc(100%-1.5rem)] text-[13px]">{website}</span>
              </div>
            )}
          </div>

          {/* Education */}
          <div>
            <Title text="Education" color={themeColors[3]} />
            {education.length === 0 ? (
              <p>-</p>
            ) : (
              education.map((edu, idx) => (
                <div key={idx} className="text-xs mb-2">
                  <p className="font-semibold">{edu.degree}</p>
                  <p>{edu.institution}</p>
                  <p className="text-gray-500 text-[11px]">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Skills with ProgressBlocks */}
          <div>
            <Title text="Skills" color={themeColors[3]} />
            {skills.length === 0 ? (
              <p>-</p>
            ) : (
              skills.map((skill, idx) => (
                <div key={idx} className="text-xs mb-2 flex justify-between">
                  <p>{skill.name}</p>
                  <ProgressBlocks level={skill.progress} />
                </div>
              ))
            )}
          </div>

          {/* Languages with ProgressBlocks */}
          <div>
            <Title text="Languages" color={themeColors[3]} />
            {languages.length === 0 ? (
              <p>-</p>
            ) : (
              languages.map((lang, idx) => (
                <div key={idx} className="text-xs mb-2 flex justify-between">
                  <p>{lang.name}</p>
                  <ProgressBlocks level={lang.progress} />
                </div>
              ))
            )}
          </div>
          <div>
            {/* Interests */}
            {interests.length > 0 && (
              <div>
                <Title text="Interests" color={themeColors[3]} />
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-700"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Main Content */}
        <div className="p-6 w-[65%] text-sm flex flex-col gap-5 ">
          {/* Summary */}
          <div>
            <Title text="Professional Summary" color={themeColors[3]} />
            <p>{summary}</p>
          </div>

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div>
              <Title text="Work Experience" color={themeColors[3]} />
              {workExperience.map((exp, idx) => (
                <div key={idx} className="mb-3">
                  <p className="font-bold">{exp.company}</p>
                  <p className="italic">{exp.role}</p>
                  <p className="text-xs text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  <p className="text-xs mt-1 text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <Title text="Projects" color={themeColors[3]} />
              {projects.map((project, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-semibold text-sm">{project.title}</p>
                  <p className="text-xs text-gray-700">{project.description}</p>
                  <div className="flex flex-wrap gap-8 mt-1 text-xs">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-800 font-bold underline"
                      >
                        Github
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-800 font-bold underline"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <Title text="Certifications" color={themeColors[3]} />
              <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, idx) => (
                <div key={idx} className="mb-2 text-xs">
                  <p className="font-semibold">{cert.title}</p>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-gray-500">{cert.year}</p>
                </div>
              ))}
              </div>
            </div>
          )}

         
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
