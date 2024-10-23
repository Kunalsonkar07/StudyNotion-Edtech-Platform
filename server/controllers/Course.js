const Course = require("../models/Course");
const User = require("../models/User") ;
const Category = require("../models/Category");
const { uploadtoCloudinary } = require("../utils/cloudinary");

exports.createCourse = async( req ,res ) => {
    try {
        // catgeory?
        const { name , description , whatwillyoulearn 
            , price , category } = req.body ;
        // console.log("helloji");
        const thumbnail = req.files.thumbnailfile ;
        // console.log("helloji")
        // 
        if ( !name || !description || !whatwillyoulearn 
            || !price || !category || !thumbnail ){
            return res.status(400).json({
                status : false ,
                message: "please fill all the required fields"
            })
        }
        
        // console.log("helloo warming");
        const userId = req.user.id ;
        // console.log(userId);

        const Instructor = await User.findOne({ _id : userId } );
        // console.log("inside ->> ", Instructor);
        if ( !Instructor ){
            return res.status(400).json({
                status : false ,
                message: "please signup there is no Insturctor with your id"
            })
        }

        const categorydeatils = await Category.findOne({name : category});
        if ( !categorydeatils ){
            return res.status(400).json({
                status : false ,
                message: "There is no matching category so the course cannot be created"
            })
        }
        console.log("thumbnailliknk -> -> " , thumbnail) ;

        const thumbnaillink = await uploadtoCloudinary( thumbnail , 
                    process.env.FILE_NAME ) ;

                    
        // , thumbnail:thumbnaillink.secure_url
        const course = await Course.create({ name , description , whatwillyoulearn , price
            , thumbnail: thumbnaillink.secure_url});
// categpry
            //  console.log( course) ;
        await User.findByIdAndUpdate( { _id : Instructor._id} , 
            {
                $push : {
                    courses : course.id ,
                },
            },
            { new: true }
        )

        await Category.findOneAndUpdate( {category} , 
            {
                $push : {
                    courses : course.id ,
                },
            },
            { new: true }
        )

        res.status(200).json({
            status:true,
            message:"Course created successfully",
        })

    } catch (error) {
        return res.status(401).json({
            status : false ,
            message :"Something went wrong while creating course"
        })
    }
}

exports.getCourseDetail = async ( req , res ) => {
    try {
        
        const { courseId } = req.body ;

        const courseDetails = await Course.findOne({_id: courseId})
        .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        })
        .populate("courseContent")
        // .populate("ratingAndReviews")
        .exec();
    
        if ( courseDetails ){
            return res.status(200).json({
                status:true ,
                courseDetails ,
                message:"Course data fetched successfully"
            })
        }
        
    } catch (error) {
        return res.status(200).json({
            status:false ,
            message:"Something went wrong while fetching data"
        })
    }
}
