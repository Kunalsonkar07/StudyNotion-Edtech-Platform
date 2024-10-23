const cloudinary = require("cloudinary").v2 ;
require("dotenv").config();

exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME ,
            api_key: process.env.API_KEY ,
            api_secret: process.env.API_SECRET
        })
        console.log("cloudinary connected successfuly") ;
    }catch(e){
        console.log(e);
    }
}

exports.uploadtoCloudinary  = async (file, folder, height, quality) => {
    // console.log("hello");
    console.log("hello");
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";


    const x =  await cloudinary.uploader.upload(file.tempFilePath, options);
    // console.log("x :",x);
    return x;
}