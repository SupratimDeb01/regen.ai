import React, { useState }from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const SignInPage = ({setCurrentPage}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const {updateUser}=useContext(UserContext);

  const handleLogin=async(e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid Email Id");
      return
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
    setError("");

      //will be calling login API here
      try{
        const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password});
        const {token}=response.data;
        if(token){
          localStorage.setItem("token",token);
          updateUser(response.data);
          navigate("/dashboard");
        }
      }
        catch(error){
        if(error.response && error.response.data.message){
          setError(error.response.data.message);
        }
        else{
          setError("Something went wrong");
        }
      };
      };
      
  return (
    <>
      <div className='flex flex-col gap-4 px-2'>
      <div className='flex flex-col justify-center items-center'>
      <h3 className=" font-extrabold text-2xl">Welcome Back</h3>
      <p className=' font-mono'>Please enter your details to Login</p>
      </div> 

      <form onSubmit={handleLogin}className='flex flex-col gap-4'>
        <Input
        value={email}
        onChange={({target}) =>setEmail(target.value)}  
        label="Email Adress"
        placeholder="supratimdeb04@gmail.com"
        type="text"
        /> 
        {/*<input type='email' className='border-1 border-gray-200 bg-stone-50 py-2 px-3 ' placeholder="supratimdeb04@gmail.com"></input>
        <h5 className='font-semibold'>Email Adress</h5>*/}
        
        <Input
        value={password}
        onChange={({target}) =>setPassword(target.value)}
        label="Password"
        placeholder="Minimum 8 Charecters"
        type="password"
        />
        {error && <p className='text-red-600 text-xs leading-0'>{error}</p>}

         {/*<input type='password' className='border-1 border-gray-200 bg-stone-50 py-2 px-3 ' placeholder="Minimum 8 Charecters"></input>
         <h5 className='font-semibold'>Password</h5>*/}

        
        <button type="submit" className='border-2 border-b-6 border-r-3 rounded-lg bg-amber-300 w-full py-3 font-extrabold cursor-pointer'>LOGIN</button>
        <h5 className='font-sans'>Don't have an account? <button className='text-cyan-600 font-medium cursor-pointer' onClick={()=>setCurrentPage("sign-up")}>SignUp</button> </h5>
    
      </form>
    </div>
        </>
  )
}

export default SignInPage;
