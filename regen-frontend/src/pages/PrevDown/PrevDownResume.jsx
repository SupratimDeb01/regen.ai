import React, { useRef, useEffect, useState } from "react";
import html2PDF from "jspdf-html2canvas-pro";
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
  <div className="relative w-fit mb-2">
    <span className="absolute bottom-0 left-0 w-full h-1.5" style={{ backgroundColor: color }} />
    <h2 className="relative text-xs font-semibold">{text}</h2>
  </div>
);

const ProgressBlocks = ({ level }) => {
  const blocks = Array(5).fill(0);
  return (
    <div className="flex gap-1 mt-1">
      {blocks.map((_, i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 rounded-sm"
          style={{
            backgroundColor:
              i < level
                ? i === 4
                  ? "#007B83"
                  : "#00A6B4"
                : "#E5E7EB"
          }}
        />
      ))}
    </div>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <span className="pt-0.5">{icon}</span>
    <span className="text-[11px] break-words">{text}</span>
  </div>
);

export default function PrevDownResume({ colorPalette }) {
  const resumeRef = useRef(null);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log("Loaded resume data from localStorage:", parsedData);
        setResumeData(parsedData);
      } catch (e) {
        console.error("Invalid resume data in localStorage:", e);
      }
    }
  }, []);

  const handleDownload = () => {
    const element = resumeRef.current;

    if (!element) {
      console.error("Resume element not found.");
      return;
    }

    console.log("Download button clicked");

    html2PDF(element, {
      jsPDF: {
        format: 'a4',
        orientation: 'portrait',
      },
      imageType: 'image/jpeg',
      output: 'resume.pdf',
    })
      .then(() => {
        console.log("PDF generated successfully");
      })
      .catch((err) => {
        console.error("PDF generation failed:", err);
      });
  };

  if (!resumeData) return <div className="text-center p-4 text-sm">Loading resume...</div>;

  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    skills = [],
    certifications = [],
    workExperience = [],
    interests = [],
    projects = [],
  } = resumeData;

  const {
    fullName,
    designation,
    profilePreviewUrl,
    summary,
  } = profileInfo;

  const {
    email,
    phone,
    location,
    linkedIn,
    github,
    website,
  } = contactInfo;

  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  return (
    <div
      className="flex justify-center items-start w-full h-full overflow-auto relative"
      style={{ backgroundColor: "#f9f9f9" }}
    >
      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="fixed top-4 right-4 bg-cyan-600 text-white px-4 py-2 rounded shadow-lg z-50 text-xs"
      >
        Download PDF
      </button>

      <div
        ref={resumeRef}
        style={{
          width: "595.28px",
          minHeight: "100%",
          background: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "row",
          fontFamily: "sans-serif",
          color: "black",
          fontSize: "11px"
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            backgroundColor: themeColors[0],
            padding: "1rem 1rem",
            width: "35%",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            color: "#000",
          }}
        >
          <div className="flex flex-col items-center">
            <div className="flex bg-white w-[100px] h-[100px] justify-center items-center rounded-full shadow-lg">
              <div
                style={{
                  backgroundColor: themeColors[1],
                  width: "85px",
                  height: "85px",
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
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <LuUser className="text-3xl" style={{ color: themeColors[4] }} />
                )}
              </div>
            </div>
            <h2 className="text-base font-medium mt-2 text-center break-words">{fullName}</h2>
            <p className="text-xs text-gray-700 text-center">{designation}</p>
          </div>

          <div className="text-xs space-y-1 break-words">
            {location && <InfoItem icon={<LuMapPinHouse />} text={location} />}
            {email && <InfoItem icon={<LuMail />} text={email} />}
            {phone && <InfoItem icon={<LuPhone />} text={phone} />}
            {linkedIn && <InfoItem icon={<RiLinkedinLine />} text={linkedIn} />}
            {github && <InfoItem icon={<LuGithub />} text={github} />}
            {website && <InfoItem icon={<LuRss />} text={website} />}
          </div>

          <div>
            <Title text="Education" color={themeColors[3]} />
            {education.length === 0 ? (
              <p>-</p>
            ) : (
              education.map((edu, idx) => (
                <div key={idx} className="text-xs mb-1">
                  <p className="font-semibold">{edu.degree}</p>
                  <p>{edu.institution}</p>
                  <p className="text-gray-500 text-[10px]">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))
            )}
          </div>

          <div>
            <Title text="Skills" color={themeColors[3]} />
            {skills.length === 0 ? (
              <p>-</p>
            ) : (
              skills.map((skill, idx) => (
                <div key={idx} className="text-xs mb-1 flex justify-between">
                  <p>{skill.name}</p>
                  <ProgressBlocks level={skill.progress} />
                </div>
              ))
            )}
          </div>

          <div>
            <Title text="Languages" color={themeColors[3]} />
            {languages.length === 0 ? (
              <p>-</p>
            ) : (
              languages.map((lang, idx) => (
                <div key={idx} className="text-xs mb-1 flex justify-between">
                  <p>{lang.name}</p>
                  <ProgressBlocks level={lang.progress} />
                </div>
              ))
            )}
          </div>

          {interests.length > 0 && (
            <div>
              <Title text="Interests" color={themeColors[3]} />
              <div className="flex flex-wrap gap-1">
                {interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-2 w-[65%] text-xs flex flex-col gap-1">
          <div>
            <Title text="Professional Summary" color={themeColors[3]} />
            <p className="text-xs mt-1 text-gray-700">{summary}</p>
          </div>

          {workExperience.length > 0 && (
            <div>
              <Title text="Work Experience" color={themeColors[3]} />
              {workExperience.map((exp, idx) => (
                <div key={idx} className="mb-1">
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

          {projects.length > 0 && (
            <div>
              <Title text="Projects" color={themeColors[3]} />
              {projects.map((project, idx) => (
                <div key={idx} className="mb-1">
                  <p className="font-semibold text-xs">{project.title}</p>
                  <p className="text-xs text-gray-700">{project.description}</p>
                  <div className="flex flex-wrap gap-4 mt-1 text-xs">
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

          {certifications.length > 0 && (
            <div>
              <Title text="Certifications" color={themeColors[3]} />
              <div className="grid grid-cols-2 gap-1">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="mb-1 text-xs">
                    <p className="font-semibold text-xs">{cert.title}</p>
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
}

