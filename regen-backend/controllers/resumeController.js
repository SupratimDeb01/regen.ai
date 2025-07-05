const fs=require("node:fs");
const path=require("node:path");
const Resume=require("../models/Resume");

const createResume=async(req,res)=>{
    try{
        const {title}=req.body; //destructuring {title} otherwise we have to write like this --> const title=req.body.title;
        const defaultResumeData={
            profileInfo:{
                profileImg:null,
                previewUrl:"",
                fullName:"",
                designation:"",
                summary:"",
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
        },],
        education:[{
            degree:"",
            institution:"",
            startDate:"",
            endDate:"",
        },],
        skills:[{
            name:"",
            progress:0,
        },],
        projects:[{
            title:"",
            description:"",
            github:"",
            liveDemo:"",
        },],
        certifications:[{
            title: "",
            issuer: "",
            year: "",
        },],
        languages:[{
            name:"",
            progress:"",
        },],
        interests:[""],
        timestamps:[{
            createdAt:"createdAt", 
            updatedAt:"updatedAt",
        },],
        };


    const newResume=await Resume.create({
    userId:req.user._id,
    title,
    ...defaultResumeData,
})
    res.status(201).json(newResume);
    }catch(error){
        res.status(500).json({message:"Failed to create resume",error:error.message});
    }
}


const getAllResumes = async(req,res)=>{
    try{
        const resumes=await Resume.find({userId:req.user._id}).sort({
            updatedAt:-1,
        });
        res.status(201).json(resumes);
    }catch(error){
        res.status(500).json({message:"Failed to get resumes",error:error.message});
    }
};


const fetchResumeById = async(req,res)=>{
    try{
        const resumeId=await Resume.findOne({_id:req.params.id,
                                            userId:req.user._id});
        if(!resumeId){
            return res.status(404).json({message:"Resume not found"});
        }
        res.status(201).json(resumeId);
    }catch(error){
        res.status(500).json({message:"Failed to fetch resumes",error:error.message});
    }
};


const updateResume = async(req,res)=>{
    try{
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id});
        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        Object.assign(resume,req.body);
        const updated=await resume.save();
        res.status(201).json(updated);
    }catch(error){
        res.status(500).json({message:"Failed to Update resumes",error:error.message});
    }
};


const deleteResume=async(req,res)=>{
    try{
        const resume=await Resume.findOne({_id:req.params.id,userId:req.user._id});
        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        const uploadsFolder = path.join(__dirname, '..', 'uploads');
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        if (resume.thumbnailLink) {
         const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
        if (fs.existsSync(oldThumbnail)) 
            fs.unlinkSync(oldThumbnail);
        }
        if (resume.profileInfo?.profilePreviewUrl) { //optional chaining to handle undefined elements else it may throw errors
    const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
    if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
}
const deleted = await Resume.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
});
if (!deleted) {
    return res.status(404).json({ message: "Resume not found or unauthorized" });
}

res.json({ message: "Resume deleted successfully" });
    }catch(error){
        res.status(500).json({message:"server error",error:error.message})
    }
};



module.exports={createResume,getAllResumes,fetchResumeById,updateResume,deleteResume};