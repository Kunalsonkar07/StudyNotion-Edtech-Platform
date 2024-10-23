const { RatingAndReview } = require("../models/RatingAndReview");
const { User } = require("../models/User");
const { Course } = require("../models/Course");
const { default: mongoose } = require("mongoose");


exports.createRating = async( req, res ) => {
    try {

        const { userid } = req.user.id ;
        const { rating , review , courseid } = req.body ;

        const user = await User.findOne({ userid } ) ;
        if ( !user.courses.includes(courseid)){
            res.status(400).json({
                status:false,
                message:"Please purchase the course to review it"
            })
        }

        const course = await Course.findOne({
            _id: courseid,
            studentenrolled: { 
              $elemMatch: { 
                $eq: userid 
              } 
            }
          });

        const reviewdetails = await RatingAndReview.create({user: userid , Rating :rating , Review:review });

        if ( !reviewdetails ){
            res.status(400).json({
                status:false,
                message:"somehthing went wrong while Reviewing"
            })
        }

        const coursedeatils = await findOneAndUpdate({ _id : courseid , 
                                                        $push : {
                                                            ratingAndReviews  : reviewdetails._id
                                                        }})
        
        return res.status(400).json({
            status:true,
            message:"Review and Rating submitted successfully"
        })

    } catch (error) {
        res.status(400).json({
            status:false,
            message:"somehthing went wrong while Reviewing"
        })
    }
}


exports.getAverageRating = async( req ,res ) => {
    try {
        
        const { courseid } = req.body ;

        const result = await RatingAndReview.aggerate({
            $match : {
                course : courseid ,
            }
        },{
            $group:{
                _id:null , averageRating:{
                    $avg : "$rating",
                }
            }
        })

        if ( result.length > 0 ){
            return req.status(200).json({
                succes:true ,
                averageRating : result[0].averageRating 
            })
        }

        return res.status(200).json({
            success : true , 
            message : "Average calculated",
            averageRating : 0 
        })

    } catch (error) {
        return res.status(200).json({
            success : false , 
            message : "somaething went wrong while calculating average",
        })
    }
}


exports.getAllReview = async ( req ,res ) => {
    try {
        
        const allreviews = await RatingAndReview.findOne({}).sort({rating:"desc"}).populate({
                                path :"User",
                                select:"firstName lastName email"
        }).populate({
            path:"Course",
            select : "courseName"
        }).exec() ;

        return res.status(200).json({
            status:true,
            message:"All review fetched",
        })

    } catch (error) {
        return res.status(200).json({
            status:false ,
            message:"something went wrong",
        })
    }
}

