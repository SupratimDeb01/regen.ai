import React from 'react';
import {Routes,Route}from "react-router-dom";
import {Toaster}from "react-hot-toast";
import EditResume from './pages/ResumeUpdate/EditResume';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/Auth/SignInPage';  
import PrevDownResume from './pages/PrevDown/PrevDownResume';
import SignUpPage from './pages/Auth/SignUpPage';
import Dashboard from './pages/Home/Dashboard';
import UserProvider from './context/userContext';


const App = () => { 
  return (
    <UserProvider>
    <div>
        <Routes>
          {/*<Route path="/sign-up" element={<SignUpPage/>}/>
          <Route path="/sign-in" element={<SignInPage/>}/>*/}
          
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/resume/preview" element={<PrevDownResume/>}/>
          <Route path="/resume/:resumeId" element={<EditResume/>}/>
        </Routes>
    </div>
    <Toaster
    toastOptions={{
      className:"",
      style:{
        fontSize:"13px",
      },
    }}
    />
    </UserProvider>
  )
}

export default App;
