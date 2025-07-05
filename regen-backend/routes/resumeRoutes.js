const express=require("express");
const mongoose =require("mongoose");
const router=express.Router();
const {protect}=require("../middlewares/authMiddleware");
const{uploadResumeImage}=require("../controllers/uploadImage");
const {
    createResume,
    getAllResumes,
    updateResume,
    deleteResume,
    fetchResumeById,
}=require('../controllers/resumeController');


router.post("/",protect,createResume);
router.get("/",protect,getAllResumes);
router.put("/:id",protect,updateResume);
router.delete("/:id",protect,deleteResume);
router.get("/:id",protect,fetchResumeById);
router.put("/:id/upload-images",protect,uploadResumeImage);


module.exports=router;
