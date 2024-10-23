const Section = require("../models/Section");
const subSection = require("../models/subSection");
const { uploadtoCloudinary } = require("../utils/cloudinary");
require("dotenv").config();


exports.createsubSection = async(req,res) => {
    try {
        
        const { title , description , timeDuration , sectionId} = req.body ;
        const Video = req.files.videofile ;

        if ( !title || !description || !timeDuration || !sectionId ){
            return res.status(400).json({
                status:false,
                message:"pleas fill all the required fields"
            })
        }

        const videourl = await uploadtoCloudinary( Video , process.env.FILE_NAME) ;
        if ( !videourl ){
            return res.status(400).json({
                status:false,
                message:"error while uploading files"
            })
        }

        const subsection = await subSection.create({ title ,sectionid : sectionId, description ,timeDuration ,videoUrl: videourl });
        if ( !subsection ){
            return res.status(200).json({
                status:false ,
                message:"subSection not created"
            })
        }
        const section = await Section.findOneAndUpdate({ sectionId },
                                                        { $push :{
                                                            subsection: subsection.id ,
                                                         }}, { new :true });

        res.status(200).json({
            status: true ,
            message:"subSection created successfully"
        })

    } catch (error) {
        res.status(200).json({
            status: false ,
            message:"Something went wrong while creating subsection"
        })
    }
}

// hw dekh jab couse print hog atoh section full print kar sakte hai par subsection kese full print karee

exports.updatesubSection = async ( req , res ) => {
    try {
        // const { name , sectionId} = req.body ;
        const { title , description , timeDuration , videourl,subsectionId} = req.body ;
        
        if ( !title || !description || !timeDuration || !subsectionId , videourl){
            return res.status(400).json({
                status:false,
                message:"pleas fill all the required fields"
            })
        }
        const video = req.files.videofile ;
        let newvideourl = videourl ;
        if ( video ){
            newvideourl = await uploadtoCloudinary( video , process.env.FILE_NAME) ;
        }
        
        const subsection = await subSection.findOneAndUpdate({subsectionId}, 
                                            { title , description , timeDuration , videoUrl:videourl } , { new : true });
        if ( !subsection ){
            return res.status(200).json({
                status:false,
                message:"subSection not available , please create a section"
            })
        }


        return res.status(200).json({
            status:true ,
            message:"subSection updated succesfully"
        })

    } catch (error) {
        return res.status(200).json({
            status:false ,
            message:"Something went wrong while working"
        })
    }
}

exports.deletesubSection = async( req ,res ) => {
    try {
        const { subsectionId } = req.params ;
        if ( !subsectionId ){
            return res.status(200).json({
                status: false ,
                message:"please fill all the paramater"
            })
        }

        await subSection.findOneAndDelete( { _id: subsectionId});
        
        return res.status(200).json({
            status:true ,
            message:"subSection deleted succesfully"
        })

    } catch (error) {
        return res.status(200).json({
            status: false ,
            message:"Something went wrong while deleting section"
        })
    }
}