const multer=require("multer")

    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"uploads/");
        },
        filename:(req,file,cb)=>{
            cb(null,`${Date.now()}-${file.originalname}`)
        },
    });

    const filefilter =(req,file,cb)=>{
        const allowed=['image/jpeg','image/jpg','image/png'];
        if(allowed.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb(new Error('Only .jpeg, .jpg and .png format are allowed'),false);
        }
    };
    const upload=multer({storage,filefilter});

    module.exports = {upload};
