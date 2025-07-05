import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { MdOutlineAddBox } from "react-icons/md";
import ResumeCard from '../../components/cards/ResumeCard';
import Modals from '../../components/Modals';
import CreateResume from './CreateResume';
 
const Dashboard = () => {
  const [allResumes,setAllResumes]=useState([]);
  const [createModal,setCreateModal]=useState(false);
  const navigate=useNavigate();

  const fetchAllResume=async()=>{
    try{
      const response=await axiosInstance.get(API_PATHS.RESUME.GETALLRESUME); //here we are doing the api call
      setAllResumes(response.data); //here the response containing all resumes of a user is getting stored in {all resume}
    }catch(error){
      console.error("Error loading data",error);
    }
  };
  useEffect(() => {
  fetchAllResume();
},[]); 
  
  return <DashboardLayout>
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 mt-17 px-3 md:px-0 lg:px-2 xl:px-4'>
      <div className='h-[300px] flex flex-col gap-0 items-center justify-center border-emerald-100 hover:border-emerald-200  border-2 rounded-lg cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200' onClick={()=>setCreateModal(true)}> 
        <div className='bg-emerald-100 w-13 h-13 flex justify-center items-center rounded-xl'><MdOutlineAddBox className='w-8 h-8 text-emerald-950/60 '/></div>
      </div>


      {/* .map works like a loop where we pich elements 1 by 1 */}


      {allResumes.map((resume)=>(
        <ResumeCard
        key={resume?._id}
        title={resume?.title}
        imgUrl={resume?.thumbnailLink || null}
        onSelect={()=>navigate(`/resume/${resume?._id}`)}
        />
      ))}
    </div>
    <Modals
    isOpen={createModal}
    onClose={()=>setCreateModal(false)}
    hideHeader
    >
      <div><CreateResume/></div>
    </Modals>
    </DashboardLayout>;
}

export default Dashboard


{/*     
          With useEffect	                                     Without useEffect
API call runs once on component mount            	API call runs every render (maybe infinite)
Safe and predictable	                            Unsafe and may crash your app
React best practice	                              React will throw warnings or errors              */}