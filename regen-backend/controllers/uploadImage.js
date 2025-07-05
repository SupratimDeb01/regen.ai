const fs=require("fs");
const path = require("path");
const Resume=require("../models/Resume");
const upload=require("../middlewares/uploadMiddleware");

const uploadResumeImage=(req,res)=>{
    try{
        upload.fields([{name:'thumbnail'},{name:'profileImage'}])(req,res,async(err)=>{
            if(err){
                return res.status(400).json({message:"Error uploading image",error:err.message});
            }
            const resumeId=req.params.id;
            const resume=await Resume.findOne({_id:resumeId,userId:req.user._id});

            if(!resume){
                return res.status(400).json({message:"resume not found",error:err.message});
            }

            const uploadFolder=path.join(__dirname,"uploads");
            const baseUrl=`${req.protocol}://${req.get("host")}`;

            const newThumbnail=req.files.thumbnail?.[0];
            const newProfileImage=req.files.profileImage?.[0];

            if(newThumbnail){
                if(resume.thumbnailLink){
                    const oldThumbnail=path.join(uploadFolder,path.basename(resume.thumbnailLink));
                    if(fs.existsSync((oldThumbnail)))
                        fs.unlinkSync(oldThumbnail);
                };
                resume.thumbnailLink=`${baseUrl}/uploads/${newThumbnail.filename}`;
            }

            if(newProfileImage){
                if(resume.profileInfo?.profilePreviewUrl){
                    const oldProfile=path.join(uploadFolder,path.basename(resume.profileInfo.profilePreviewUrl));
                }
                resume.profileInfo.profilePreviewUrl =`${baseUrl}/uploads/${newProfileImage.filename}`
            }

            await resume.save();

            res.status(200).json({
                message:"Image uploaded successfully",
                thumbnailLink:resume.thumbnailLink,
                profilePreviewUrl:resume.profileInfo.profilePreviewUrl,
            });
        });
    }catch(error){
        res.status(500).json({message:"Server error",error:error.message});
    }
};

module.exports={uploadResumeImage};