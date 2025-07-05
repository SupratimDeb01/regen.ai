import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/1.svg'
import landing_page from '../assets/landing_page_own_dp.svg'
import { MdKeyboardDoubleArrowRight } from "react-icons/md"; 
import { TbBrandYoutube } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import job from '../assets/chose_us_1.svg'
import ai from '../assets/chose_us_2.svg'
import speed from '../assets/chose_us_3.svg'
import SignInPage from './Auth/SignInPage';
import SignUpPage from './Auth/SignUpPage';
import Modals from '../components/Modals';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import UserSignOutCard from "../components/cards/UserSignOutCard"

const LandingPage = () => {
const {user}=useContext(UserContext);  
const navigate = useNavigate();
const [openAuthModal, setOpenAuthModal]= useState(false);
const [currentPage, setCurrentPage]= useState("sign-in");
const[isScrolled,setIsScrolled]=useState(false);

const handleCTA=()=>{
  if(!user){
    setOpenAuthModal(true);
  }
  else{
    navigate("/dashboard");
  }
};

  useEffect(()=>{
    const handleState=()=>{
      setIsScrolled(scrollY>0);
    }
    window.addEventListener('scroll',handleState);
    return () => window.removeEventListener("scroll", handleState);
  },[]);

  return (
    <>
  <div>
    <div className="w-full h-full"style={{
      backgroundImage: `
      radial-gradient(circle 400px at top, rgba(110, 198, 153, 0.4), transparent 90%),
      radial-gradient(circle 450px at center left, rgba(255, 218, 185, 0.4), transparent 90%),
      radial-gradient(circle 450px at bottom right, rgba(229, 152, 157, 0.4), transparent 90%)
      `
      }}>
     {/* Header */}
      <header className={`fixed top-0 z-50 font-bold flex justify-between items-center w-full h-18 sm:px-8 md:px-14 xl:px-24 px-10 py-0 ${isScrolled ? ' bg-white shadow-lg' : 'bg-transparent'}`}>
        <img src={logo} className="h-26 sm:h-24 md:h-28 lg:h-32 w-auto" />
        {user?<UserSignOutCard/>:<button className="flex justify-center items-center gap-2  xl:text-lg lg:text-md sm:text-sm text-base border-b-4 border-2 w-38 h-12 rounded-3xl bg-amber-300 hover:bg-amber-400 transition duration-600 transform hover:scale-105 cursor-pointer" 
        onClick={()=> setOpenAuthModal(true)}>SignIn <FaUser /></button>}
      </header>
       {/* Main content */}
      <div className="flex flex-col">
        <div className="flex flex-col-reverse lg:flex-row sm:px-24 px-10 py-20 gap-5 justify-between items-center relative">
           {/* Text Section */}
          <div className="flex flex-col gap-4 z-20 ">
          <h1 className="xl:text-6xl lg:text-5xl sm:text-4xl text-3xl font-extrabold leading-tight">Build Professional
          <span className="block text-transparent bg-clip-text bg-[radial-gradient(circle,_#7182ff_0%,_#2cff52_100%)] bg-[length:200%_200%] animate-text-shine">Resumes in Minutes</span> </h1>
          <h5 className="xl:text-2xl lg:text-xl sm:text-lg text-base">Craft professional, ATS-friendly resumes with powerful AI —<span className="block">personalized, polished, and built to impress recruiters.</span></h5>
            {/* Buttons */}
            <div className="flex flex-col justify-start gap-4 sm:flex-row sm:justify-normal">
            <button className=" text-xl font-bold flex justify-center gap-2 items-center border-2 w-48 h-15 rounded-full bg-rose-400  border-b-4 hover:bg-rose-500 transition duration-500  transform hover:scale-105 cursor-pointer" onClick={handleCTA}>Get Started<MdKeyboardDoubleArrowRight /></button>
          <button className="text-xl font-bold flex justify-center gap-2 items-center border-b-4 border-2 w-48 h-15 rounded-full  hover:bg-neutral-300 transition duration-500  transform hover:scale-105 cursor-pointer">Watch Video<TbBrandYoutube /></button>
            </div>
          </div>
          
          <div className="">
          <img src={landing_page} alt="sample-resume" className=" h-auto w-96" 
          style={{backgroundImage:`radial-gradient(circle 200px at center, rgba(229, 152, 157, 0.4), transparent 90%),`}}/>
          </div>
        </div>
      </div>
      </div>
     {/*first section ends*/}

     {/*second section starts*/}
     <section className="bg-purple-100 h-full" 
     style={{
      backgroundImage: `radial-gradient(circle at center top, rgba(255, 255, 255, 1), transparent 100%)`
  }}
     >
      <div className="flex flex-col sm:gap-25 gap-15 px-5 py-10 pb-20">
          <h1 className="flex flex-col justify-center items-center font-extrabold xl:text-5xl lg:text-4xl sm:text-3xl text-2xl leading-tight">Here Are 3 Reasons Why<span className="block text-transparent bg-clip-text bg-[radial-gradient(circle,_#d10000_0%,_#f95b00_100%)] bg-[length:200%_200%] animate-text-shine">You’ll Love Using Us.</span></h1>
        <div className="flex flex-col lg:flex-row gap-8 mx-5 lg:mx-20 justify-center items-center">
          <div className="mx-4">
            <img src={ai} alt="ai-powered" className="w-auto h-16"/>
            <h5 className="font-bold text-xl">AI-Powered Personalization</h5>
            <p>Our smart AI tailors each resume to your job role by optimizing keywords and showcasing your unique strengths — no guesswork needed.</p>
          </div>
          <div className="mx-4">
            <img src={speed} alt="speed-simplicity" className="w-auto h-16"/>
            <h5 className="font-bold text-xl">Built for Speed and Simplicity</h5>
            <p>Create a modern, professional resume in minutes with an intuitive interface and templates that remove all the formatting stress.</p>
          </div>
          <div className="mx-4">
            <img src={job} alt="hired" className="w-auto h-16"/>
            <h5 className="font-bold text-xl">Designed to Get You Hired</h5>
            <p>Every layout is crafted with recruiters and applicant tracking systems (ATS) in mind — increasing your chances of landing interviews faster.</p>
          </div>
        </div>
      </div>
     </section>
     <Modals 
     isOpen={openAuthModal}
     onClose={()=>{
      setOpenAuthModal(false);
      setCurrentPage("sign-in");
     }}
     hideHeader
     >
      <div>
        {/*The SignInPage receives setCurrentPage as a prop so that it can switch to "sign-up" on some user action.*/}
        {currentPage === "sign-in" && (<SignInPage setCurrentPage={setCurrentPage}/>)}
        {currentPage === "sign-up" && (<SignUpPage setCurrentPage={setCurrentPage}/>)}
      </div>
     </Modals>
    </div>
    </>
  )
}

export default LandingPage
