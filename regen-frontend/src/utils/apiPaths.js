export const BASE_URL="https://regen-backend.onrender.com";

export const API_PATHS={
    AUTH:{
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        GETPROFILE:"/api/auth/profile",
    },
    RESUME:{
        CREATERESUME:"/api/resume/",
        GETALLRESUME:"/api/resume/",
        GETRESUMEBYID:(id)=>`/api/resume/${id}`,
        UPDATERESUME:(id)=>`/api/resume/${id}`,
        DELETERESUME:(id)=>`/api/resume/${id}`,
        UPLOADIMAGE:(id)=>`/api/resume/${id}/upload-images`,
    },
    IMAGE_UPLOAD:{
        UPLOAD:"/api/auth/upload-image",
    },
};