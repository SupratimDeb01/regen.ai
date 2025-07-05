import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import toast from "react-hot-toast";
import TitleInput from '../../components/inputs/TitleInput';
import html2PDF from "jspdf-html2canvas-pro";
import {useReactToPrint} from "react-to-print";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useEffect } from 'react';
import { BsDownload, BsPalette2 } from "react-icons/bs";
import { CgTemplate } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { LuCircleAlert } from "react-icons/lu";
import ProfileInfoForm from './Forms/ProfileInfoForm';
import ContactInfoForm from './Forms/ContactInfoForm';
import EducationInfoForm from './Forms/EducationInfoForm';
import SkillsInfoForm from './Forms/SkillsInfoForm';
import CertificationsInfoForm from './Forms/CertificationsInfoForm';
import ProjectsInfoForm from './Forms/ProjectsInfoForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';
import AdditionalInfoForm from './Forms/AdditionalInfoForm';
import RenderResume from '../../components/ResumeTemplates/RenderResume';
import ModalA from '../../components/ModalA';
import PrevDownResume from '../PrevDown/PrevDownResume';
import StepProgress from '../../components/StepProgress';

//any change here affecting the page is because in the app.jsx i have set the route  to <Route path="/resume/:resumeId" element={<EditResume/>
const EditResume = () => {
  const{resumeId}=useParams(); //using params to get the unique resume id from the link
  const navigate=useNavigate();

  const resumeRef=useRef(null);
  const resumeDownloadRef=useRef(null);

  const [baseWidth,setBaseWidth]=useState(800);
  const [showPreviewModal, setShowPreviewModal] = useState(true);
const colorPalette = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8BD", "#4A5565"];
  const [openThemeSelector,setOpenThemeSelector]=useState(false);
  const [openTemplateSelector,setOpenTemplateSelector]=useState(false);
  const [openPreviewModal,setOpenPreviewModal]=useState(false);
  const [currentPage,setCurrentPage]=useState("profile-info");
  const [progress,setProgress]=useState(0);
  const [resumeData,setResumeData]=useState({
    title:"",
    thumbnailLink:"",
    profileInfo:{
      profileImg: null,
      profilePreviewUrl:"",
      fullName:"",
      designation:"",
      summary:"",
    },
    template:{
      theme:"",
      colorPalette:"",
    },
     contactInfo:{
            email:"",
            phone:"",
            location:"",
            linkedIn:"",
            github:"",
            website:"",
        },
    
        workExperience:[{
                company: "",
                role:"",
                startDate:"",
                endDate:"",
                description:"",
        },
    ],
        education:[{
            degree:"",
            institution:"",
            startDate:"",
            endDate:"",
        },
    ],
        skills:[{
            name:"",
            progress:"",
        },
    ],
        projects:[{
            title:"",
            description:"",
            github:"",
            liveDemo:"",
        },
    ],
        certifications:[{
            title: "",
            issuer: "",
            year: "",
        },
    ],
        languages:[{
            name:"",
            progress:"",
        },
    ],
        interests:[""],
  });

  const [errorMessage,setErrorMessage]=useState(null);
  const [isLoading,setLoading]=useState(false);

const handleDownload = () => {
  const element = resumeRef.current;

  if (!element) {
    console.error("Resume element not found.");
    return;
  }

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

  const validateAndNext=()=>{
    const errors = [];
    switch(currentPage){
      case "profile-info":{
    const {fullName, designation, summary}=resumeData.profileInfo;
    if(!fullName.trim()){
          errors.push("Please enter your full name");
    }
    if(!designation.trim()){
      errors.push("Please enter your designation");
    }
    if(!summary.trim()){
      errors.push("Please enter a short summary");
    }
    break;
  }

    case "contact-info": { 
    const {email, phone}=resumeData.contactInfo;
    if(!email.trim() || !/^\S+@\S+\.\S+$/.test(email)){
          errors.push("Please enter valid email");
    }
    if(!phone.trim() || !/^\d{10}$/.test(phone.trim())){
      errors.push("Please enter valid phone number");
    }
    break;
  }

    case "work-experience":{
      resumeData.workExperience.forEach(
      ({company, role, startDate, endDate})=>{
       if(!company.trim()){
        errors.push(`Organization name can't be blank`);
       };
       if(!role.trim()){
        errors.push(`Role can't be blank`);
       }
       if(!startDate.trim() || !endDate.trim()){
        errors.push(`Start and end dates can't be blank`);
       };
      })
      break;
    } 

    case "education":{
      resumeData.education.forEach(
        ({ degree, institution, startDate, endDate})=>{
          if(!degree.trim()){
            errors.push(`Degree can't be blank`);
          }
          if(!institution.trim()){
            errors.push(`Institute can't be blank`);
          }
          if(!startDate.trim() ||!endDate.trim() ){
            errors.push(`Start date and End date can't be blank`);
          }
        }
      )
      break;
    }

    case "skills":{
      resumeData.skills.forEach(({name,progress})=>{
        if(!name.trim()){
        errors.push('Skills name is required');
        }
        if(progress<1 || progress>100){
          errors.push('Progress should be between 1 and 100');
        }
      })
      break;
    }

   case "certifications-info":{
  resumeData.certifications.forEach(({ title, issuer }) => {
    if (!title.trim()) {
      errors.push(`Certification title is required in certification `);
    }
    if (!issuer.trim()) {
      errors.push(`Issuer is required in certification `);
    }
  });
  break;
}

  case "projects-info":{
  resumeData.projects.forEach(({ title, description, github, liveDemo }) => {
    if (!title.trim()) {
      errors.push(`Project title is required`);
    }
    if (!description.trim()) {
      errors.push(`Project description is required`);
    }
    if (!github.trim()) {
      errors.push(`GitHub link is required`);
    }
    
  });
  break;
}

case "additionalInfo":{

  if (
    resumeData.languages.length === 0 ||
    !resumeData.languages.some(lang => lang.name?.trim())
  ) {
    errors.push("At least one language is required");
  }

  resumeData.languages.forEach(({ progress }) => {
    if (progress < 1 || progress > 100) {
      errors.push(`Progress for languages must be between 1 and 100`);
    }
  });


  if (
    resumeData.interests.length === 0 ||
    !resumeData.interests.some(interest => interest?.trim())
  ) {
    errors.push("At least one interest is required");
  }
  break;
}
}
       if(errors.length>0){
      setErrorMessage(errors.join(", "))
      return;
    }
    setErrorMessage("");
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
    goToNextStep();
  };

  const goToNextStep=()=>{
    const pages=[
     "profile-info",
      "contact-info",
      "education",
      "skills",
      "certifications-info",
      "projects-info",
      "work-experience",
      "additional-info",
    ]
    if(currentPage == "additional-info") setOpenPreviewModal(true);
    const currentIndex =pages.indexOf(currentPage);
    if(currentIndex!=-1 && currentIndex<pages.length-1){
      const nextIndex=currentIndex+1;
      setCurrentPage(pages[nextIndex])

      const percentage=Math.round((nextIndex/(pages.length - 1))*100);
      setProgress(percentage);
    }
  };

  const goBack=()=>{
    const pages=[
      "profile-info",
      "contact-info",
      "education",
      "skills",
      "certifications-info",
      "projects-info",
      "work-experience",
      "additional-info",
      
    ]
    if(currentPage == "profile-info") navigate("/dashboard");
    const currentIndex =pages.indexOf(currentPage);
    if(currentIndex>0){
      const prevIndex=currentIndex-1;
      setCurrentPage(pages[prevIndex])

      const percentage=Math.round((prevIndex/(pages.length - 1))*100);
      setProgress(percentage);
    }
  };

  const renderForm=()=>{
    switch(currentPage){
      case "profile-info":
        return (<ProfileInfoForm
        profileData={resumeData?.profileInfo}
        updateSection={(key,value)=>{
          updateSection("profileInfo",key,value); // If key = "fullName" and value = "Supratim", it updates only:
        }}
        onNext={validateAndNext} />
    );
    case "contact-info":
      return (<ContactInfoForm
      contactData={resumeData?.contactInfo}
        updateSection={(key,value)=>{
          updateSection("contactInfo",key,value);
        }}
      />);
       case "work-experience":
      return (<WorkExperienceForm
      workExperienceData={resumeData?.workExperience}
        updateArrayItem={(key,value,index)=>{
          updateArrayItem("workExperience",key,value,index);
        }}
        addArrayItem={(newItem)=>addArrayItem("workExperience",newItem)}
        removeArrayItem={(index)=>removeArrayItem("workExperience",index)}
      />);
       case "education":
      return (<EducationInfoForm
      educationData={resumeData?.education}
        updateArrayItem={(key,value,index)=>{
          updateArrayItem("education",key,value,index);
        }}
         addArrayItem={(newItem)=>addArrayItem("education",newItem)}
        removeArrayItem={(index)=>removeArrayItem("education",index)}
      />);
      case "skills":
  return (
    <SkillsInfoForm
      skillsData={resumeData?.skills}
      updateArrayItem={(key, value, index) =>
        updateArrayItem("skills", key, value, index)
      }
      addArrayItem={(newItem) => addArrayItem("skills", newItem)}
      removeArrayItem={(index) => removeArrayItem("skills", index)}
    />
  );

       case "projects-info":
      return (<ProjectsInfoForm
      projectsData={resumeData?.projects}
        updateArrayItem={(key,value,index)=>{
           updateArrayItem("projects", key, value, index)
        }}
        addArrayItem={(newItem) => addArrayItem("projects", newItem)}
      removeArrayItem={(index) => removeArrayItem("projects", index)}
      />);
       case "certifications-info":
      return (<CertificationsInfoForm
      certificationsData={resumeData?.certifications}
        updateArrayItem={(key,value,index)=>{
           updateArrayItem("certifications", key, value, index);
        }}
        addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
      removeArrayItem={(index) => removeArrayItem("certifications", index)}
      />);
     
      case "additional-info":
  return (
    <>

<ModalA
  isOpen={showPreviewModal}
  onClose={() => setShowPreviewModal(false)}
  title="Resume Preview"
>
  <PrevDownResume colorPalette={colorPalette} />
</ModalA>
    <AdditionalInfoForm
      languagesData={resumeData?.languages}
      interestsData={resumeData?.interests}
      updateArrayItem={(section, key, value, index) => updateArrayItem(section, key, value, index)}
      addArrayItem={(section,newItem) =>addArrayItem(section, newItem)}
      removeArrayItem={(section,index) => removeArrayItem(section, index)}
    />
        
    </>
  );


    default:
      return null;
  }
  };

  const updateSection=(section,key, value)=>{
    setResumeData((prev)=>({
      ...prev,
      [section]:{
        ...prev[section],
        [key]:value,
      }
    }))

  };

  
  const updateArrayItem = (section, key, value, index) => {
  setResumeData(prev => {
    const updated = [...prev[section]];

    /* ── interests are plain strings ──────────────── */
    if (key === null) {
      updated[index] = value;           // just overwrite the string
    } else {
      /* ── every other section uses objects ───────── */
      if (!updated[index]) updated[index] = {};
      updated[index] = { ...updated[index], [key]: value };
    }

    return { ...prev, [section]: updated };
  });
};

  const addArrayItem=(section,newItem)=>{
    setResumeData((prev) => ({
    ...prev,
    [section]: [...prev[section], newItem],
  }));
  };

  const removeArrayItem=(section,index)=>{
    setResumeData((prev) => {
    const updatedArray = [...prev[section]];
    updatedArray.splice(index, 1);
    return {
      ...prev,
      [section]: updatedArray,
    };
  });
  };

  const fetchResumeDetailsByID=async()=>{
    try{
      const response=await axiosInstance.get(API_PATHS.RESUME.GETRESUMEBYID(resumeId));
      const resumeInfo=response.data;
      setResumeData((prevState)=>({
        ...prevState,
        title: resumeInfo?.title || "undefined",
        template: resumeInfo?.template || prevState?.template,
        profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
        contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
        workExperience: resumeInfo?.workExperience || prevState?.workExperience,
        education: resumeInfo?.education || prevState?.education,
        skills: resumeInfo?.skills || prevState?.skills,
        projects:resumeInfo?.projects || prevState?.projects,
        certifications:resumeInfo?.certifications || prevState?.certifications,
        languages:resumeInfo?.languages || prevState?.languages,
        interests:resumeInfo?.interests || prevState?.interests,

      }))
  }catch(error){
    console.error("Error Fetching Resume",error);
  }
}

//recently pdated for save and exit button experimental
  const uploadResumeImage = async () => {
  try {
    setLoading(true);
    const payload = { ...resumeData };

    if (resumeId) {
      // Update existing resume
      await axiosInstance.put(API_PATHS.RESUME.UPDATERESUME(resumeId), payload);
      toast.success("Resume updated successfully!");
    } else {
      // Create new resume
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATERESUME, payload);
      const newId = response?.data?._id;

      toast.success("Resume saved successfully!");
      if (newId) {
        navigate(`/resume/${newId}`);
      }
    }

    // Exit to dashboard or any other location
    navigate("/dashboard");
  } catch (err) {
    toast.error("Failed to save resume.");
    console.error("Error saving resume:", err);
  } finally {
    setLoading(false);
  }
};

  const updateResumeDetails=async (thumbnailLink,profilePreview)=>{};

// Delete Resume
const handleDeleteResume = async () => {
  try {
    setLoading(true);
    const response = await axiosInstance.delete(API_PATHS.RESUME.DELETERESUME(resumeId));
    toast.success('Resume Deleted Successfully');
    navigate('/dashboard');
  } catch (err) {
    console.error("Error capturing image:", err);
  } finally {
    setLoading(false);
  }
};


const reactToPrintFn=async ({useReactToPrintFn})=>{contentRef:resumeDownloadRef};

const updateBaseWidth=()=>{
  if(resumeRef.current){
    setBaseWidth(resumeRef.current.offsetWidth)
  }
};
  
useEffect(()=>{
  updateBaseWidth();
  window.addEventListener("resize",updateBaseWidth);

  if(resumeId){
    fetchResumeDetailsByID();
  }

  return ()=>{
    window.removeEventListener("resize",updateBaseWidth);
  }
},[]);

  return <DashboardLayout> 
    <div className='flex flex-col w-full px-4 gap-2'>
      {/*Toolbar section*/}
      <div className='flex bg-transparent border-1 border-violet-200 rounded-md mt-16 h-14 w-full shadow-sm justify-between items-center px-4'>
        {/*Title Section*/}
        <div>
       <TitleInput
  title={resumeData.title}
  setTitle={(value) =>
    setResumeData((prevState) => ({
      ...prevState,
      title: value,
    }))
  }
  resumeId={resumeId}
  onTitleUpdate={async (newTitle) => {
    try {
      await axiosInstance.put(API_PATHS.RESUME.UPDATERESUME(resumeId), {
        ...resumeData,
        title: newTitle,
      });
      toast.success("Title updated successfully!");
    } catch (err) {
      toast.error("Failed to update title.");
      console.error("Error updating title:", err);
    }
  }}
/>
        </div>
        {/*Tools section*/}
        <div className='flex md:gap-1 gap-3'>
        {/* <div className='md:border-1 md:border-b-2 md:border-r-2 border-violet-950/50 md:w-32 justify-center flex md:rounded-sm  md:bg-violet-100 hover:bg-violet-900/20 h-10'>
          <button className='flex justify-center items-center gap-[2px]' onClick={()=>setOpenThemeSelector(true)}>
            <h3 className='font-bold text-sm hidden md:block'>Theme </h3><span><BsPalette2 className='text-[18px]  md:text-black text-violet-600'/></span>
          </button>
        </div>
        <div  className='md:border-1 border-violet-950/50 md:w-32 justify-center flex md:rounded-sm md:border-b-2 md:border-r-2 md:bg-violet-100 hover:bg-violet-900/20 h-10'>
          <button className='flex justify-center items-center' onClick={()=>setOpenTemplateSelector(true)}>
            <h3 className='font-bold text-sm hidden md:block'>Template</h3><span><CgTemplate className='text-[23px] md:text-black text-violet-600' /></span>
          </button>
        </div> */}
        <div className='md:border-1 md:w-32 border-violet-950/50 justify-center flex md:rounded-sm md:border-b-2 md:border-r-2 md:bg-violet-100 hover:bg-violet-900/20 h-10'>
          <button className='flex justify-center items-center' onClick={handleDeleteResume}>
            <h3 className='font-bold text-sm hidden md:block'>Delete</h3><span><MdDeleteOutline className='text-[23px]  md:text-black text-violet-600' /></span>
          </button>
        </div>
        <div className='md:border-1 md:w-32 border-violet-950/50 justify-center flex md:rounded-sm md:border-b-2 md:border-r-2 md:bg-violet-100 hover:bg-violet-900/20 h-10'>
          <button className='flex justify-center items-center' onClick={()=>setShowPreviewModal(true)}>
            <h3 className='font-bold text-sm hidden md:block'>Download</h3><span><MdOutlineFileDownload className='text-[23px]  md:text-black text-violet-600' /></span>
          </button>
        </div>
        </div>
        </div>
        {/*Toolbar section Ends*/}

        {/*Main section*/}
        <div className='flex gap-2 flex-col md:flex-row w-full'>
           {/*Form section*/}
      <div className='w-full md:w-[50%] bg-transparent border-1 border-violet-200 rounded-md h-[calc(100vh-6rem)] shadow-sm flex flex-col'>
  {/* Scrollable content */}
  <div className="overflow-y-auto px-2 py-2 flex-1">
    <StepProgress progress={progress} />
    {renderForm()}
    {errorMessage && (
      <div className='bg-orange-200 py-2 text-red-600 flex px-2 gap-2 text-xs items-center'>
        <LuCircleAlert />{errorMessage}
      </div>
    )}
  </div>

  {/* Fixed buttons at bottom */}
  <div className='flex md:gap-1 gap-2 justify-end p-4 border-t border-gray-200 bg-white'>
    <div className='md:border-1 px-6 md:max-w-56 border-violet-950/50 justify-center flex md:rounded-sm md:border-b-2 md:border-r-2 md:bg-violet-100 hover:bg-violet-900/20 h-10'>
      <button className='flex justify-center items-center gap-2' onClick={goBack} disabled={isLoading}>
        <FaArrowLeft className='text-[20px] md:text-black text-violet-600' /><h3 className='font-bold text-sm hidden md:block'>Back</h3>
      </button>
    </div>

    <div className='md:border-1 md:w-40 border-violet-950/50 justify-center flex md:rounded-sm md:border-b-2 md:border-r-2 md:bg-violet-100 hover:bg-violet-900/20 h-10'>
      <button className='flex justify-center items-center gap-2' onClick={uploadResumeImage} disabled={isLoading}>
        <h3 className='font-bold text-sm hidden md:block'>{isLoading ? "Saving..." : "Save & Exit"}</h3>
        <FiSave className='text-[17px] md:text-black text-violet-600' />
      </button>
    </div>

    <div className='md:border-1 px-6 md:max-w-56 justify-center border-violet-950/50 flex md:rounded-sm md:border-b-2 md:border-r-2 md:bg-gradient-to-r from-amber-400/85 to-amber-500 hover:bg-violet-700 h-10'>
      <button className='flex justify-center items-center gap-2'   onClick={
    currentPage === "additional-info"
      ? () => setShowPreviewModal(true)
      : validateAndNext
  } disabled={isLoading}>
        <h3 className='font-bold text-white text-sm hidden md:block'>
          {currentPage === "additional-info" ? "Preview & Download" : "Next"}
        </h3>
        {currentPage === "additional-info" ? (
          <MdOutlineFileDownload className='text-[20px] md:text-white text-violet-600' />
        ) : (
          <FaArrowRight className='text-[20px] md:text-white text-violet-600' />
        )}
      </button>
    </div>
  </div>
</div>

        {/*left section ends*/}

         {/* right section starts*/}
          <div ref={resumeRef} className='w-full md:w-[800px] bg-transparent border-1 border-violet-200 rounded-md shadow-sm py-2 px-2 flex justify-center h-full overflow-auto'>
            <div className="w-full max-w-[800px]">
              <RenderResume 
                templateId={resumeData?.template?.theme || ""}
                resumeData={resumeData}
                colorPalette={resumeData?.template?.theme || []}
              />
            </div>
            </div>        
            {/*right section ends */}



        </div> {/*main section ends*/}
          
               
         
      </div> {/*container section ends*/}
  
    </DashboardLayout>
  
};
export default EditResume
