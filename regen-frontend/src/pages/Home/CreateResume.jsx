import React from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateResume = () => {
  const [title, setTitle] = useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate();


  const handleCreateResume=async(e)=>{
    e.preventDefault();
    if(!title || title.trim().length === 0){
        setError("Please give your resume a title");
        return;
    }
    setError("");

      //will be calling login API here
      try{
        const response= await axiosInstance.post(API_PATHS.RESUME.CREATERESUME,{
            title,     
        })
        if(response.data?._id){
            navigate(`/resume/${response.data._id}`)
        }
      }catch(error){
        if(error.response && error.response.data.message){
          setError(error.response.data.message);
        }
        else{
          setError("Something went wrong");
        }
      };
      };
  return (
    <div className='flex flex-col py-2 gap-3'>
        <div>
        <h3 className="text-lg font-semibold">Create New Resume</h3>
        <h5 className='text-sm font-sans'>Give a title to your resume.</h5>
        </div>
        <form onSubmit={handleCreateResume}>
        <Input
        value={title}
        onChange={({target}) =>setTitle(target.value)}  
        label="Resume Title"
        placeholder="Full Stack / MERN Developer"
        type="text"/>
        <div className='flex flex-col  pt-3'>
            {error && <p className='text-rose-500 text-sm'>{error}</p>}
        <button className='border-2 border-b-6 border-r-3 rounded-lg bg-amber-300 w-full py-3 font-bold cursor-pointer'>SUBMIT</button>
        </div>
        </form>
    </div>
  )
}

export default CreateResume
