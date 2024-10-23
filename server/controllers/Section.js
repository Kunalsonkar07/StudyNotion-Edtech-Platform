const Section = require("../models/Section");
// const Course = require("../models/Course");
const Course = require("../models/Course");

exports.createSection = async(req,res) => {
    try {
        
        const { name , courseId} = req.body ;
        console.log("inside here") ;
        if ( !name || !courseId ){
            return res.status(400).json({
                status:false,
                message:"pleas fill all the required fields"
            })
        }
        
        // console.log(course) ;
        // console.log("hello ji") ;

        const section = await Section.create({name , courseid :courseId});
        if ( !section ){
            return res.status(200).json({
                status:false ,
                message:"Section not created"
            })
        }

        const course = await Course.findOneAndUpdate({ _id : courseId} ,
                                            {
                                                $push : {
                                                    courseContent : section.id 
                                                }
                                            }, { new : true });

        
        res.status(200).json({
            status: true ,
            message:"Section created successfully"
        })

    } catch (error) {
        res.status(400).json({
            status: false ,
            message:"Something went wrong while creating section"
        })
    }
}

// hw dekh jab couse print hog atoh section full print kar sakte hai par subsection kese full print karee

exports.updateSection = async ( req , res ) => {
    try {
        const { name , sectionId} = req.body ;
        
        if ( !name || !sectionId ){
            return res.status(400).json({
                status:false,
                message:"please fill all the required fields"
            })
        }
        
        const section = await Section.findOneAndUpdate({sectionId}, { name : name } , { new : true });
        if ( !section ){
            return res.status(200).json({
                status:false,
                message:"Section not available , please create a section"
            })
        }


        return res.status(200).json({
            status:true ,
            message:"Section updated succesfully"
        })

    } catch (error) {
        return res.status(200).json({
            status:false ,
            message:"Something went wrong while working"
        })
    }
}

exports.deleteSection = async( req ,res ) => {
    try {
        const { sectionId } = req.params ;
        if ( !sectionId ){
            return res.status(200).json({
                status: false ,
                message:"please fill all the paramater"
            })
        }

        await Section.findOneAndDelete( { _id: sectionId});
        
        return res.status(200).json({
            status:true ,
            message:"Section deleted succesfully"
        })

    } catch (error) {
        return res.status(200).json({
            status: false ,
            message:"Something went wrong while deleting section"
        })
    }
}