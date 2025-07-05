import React,{useState} from 'react';
import { validateEmail } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';


const SignUpPage = ({setCurrentPage}) => {
  const [profilePic,setProfilePic]=useState(null);
  const [fullName,setFullName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("")
  const {updateUser}=useContext(UserContext);

  const navigate=useNavigate();

  const handleSignUp=async(e)=>{
    e.preventDefault();

    let profileImageUrl="";
    if(!fullName){
      setError("Please enter your full name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email");
      return;
    }
    if(!password || password.length < 8){
      setError("Please enter a password");
      return;
    }
    setError("");

    //SignUp API call will begin from here
    try{
      if (profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl || "";
      }
        const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{name:fullName,email,password,profileImageUrl});
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
    <div className='flex flex-col gap-4 '>
      <div className='flex flex-col justify-center items-center'>
        <h3 className=" font-extrabold text-2xl">Create Your Account</h3>
        <p className=' font-mono'>Please Enter Your Details to SignUp</p>
        </div>
        <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
          <ProfilePhotoSelector image={profilePic}
          setImage={setProfilePic} />
          <div>

              <Input
        value={fullName}
        onChange={({target}) =>setFullName(target.value)}  
        label="Full Name"
        placeholder="Supratim Deb"
        type="text"
        /> 

          <Input
        value={email}
        onChange={({target}) =>setEmail(target.value)}  
        label="Email Adress"
        placeholder="supratimdeb04@gmail.com"
        type="text"
        /> 
        

          <Input
        value={password}
        onChange={({target}) =>setPassword(target.value)}
        label="Password"
        placeholder="Minimum 8 Charecters"
        type="password"
        />

          </div>
          {error && <p className='text-sm text-red-600 leading-0'>{error}</p>}
          <button type="submit" className='border-2 border-b-6 border-r-3 rounded-lg bg-amber-300 w-full py-3 font-extrabold cursor-pointer'>Create Account</button>
        <h5 className='font-sans'>Already have an account? <button className='text-cyan-600 font-medium cursor-pointer' onClick={()=>setCurrentPage("sign-in")}>SignIn</button> </h5>
        </form>
    </div>
  )
}

export default SignUpPage
