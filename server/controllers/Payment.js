
const { instance } = require("../config/razorpay");
const { Course } = require("../models/Course");
const { User } = require ("../models/User");
const mailsender = require("../utils/Mailsender");
const { CourseenrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");

exports.capturePayment = async( req , res ) => {
    try {

        const { course_id } = req.body ;
        const { user_id } = req.user.id ;

        if ( !course_id || !user_id ){
            return res.status(400).json({
                status: false ,
                message: "please fill all the required details"
            })
        }

        const user = await User.findOne({ user_id });

        if ( !user ){
            return res.status(400).json({
                status: false ,
                message: "please register to purchase a course"
            })
        }


        if ( user.courses.includes(course_id ) ){
            return res.status(400).json({
                status: false ,
                message: "You have already purchase this course"
            })
        }

        const course = await Course.findOne({ course_id });
        const Amount = course.price ;
        const Currency = "INR" ;

        // creating a option for razorpay 
        const option = {
            amount : Amount*100 ,
            currency : Currency ,
            recepit: Math.random( Date.now() ).toString() ,
            notes: {
                course_id ,
                user_id ,
            }
        }

        try {
            
            const Paymentresponce = await instance.orders.create(option);
            console.log(Paymentresponce);

            return res.status(400).json({
                status: true ,
                courseName : course.name ,
                courseDescription : course.description ,
                thumbnail : course.thumbnail ,
                order_id : Paymentresponce.id ,
                currency : Paymentresponce.currency ,
                amount: Paymentresponce.amount ,
            })

        } catch (error) {
            return res.status(400).json({
                status: false ,
                message: "something went wrong while creating instance"
            })
        }

    } catch (error) {
        return res.status(400).json({
            status: false ,
            message: "something went wrong while payment"
        })
    }
}


exports.verfiySignature = async( req ,res ) => {
    try {
        const webhookSecret = "12345" ;
        // eg 

        const signature = req.headers("x-raxorpay-signature") ;

        const shasum = crypto.createHmac("sha256" , webhookSecret);
        shasum.update(JSON.stringify(req.body)) ;

        const digest = shasum.digest("hex") ;

        if ( signature == digest ){
            console.log("payment authorized") ;
            const { course_id , user_id  } = req.body.payload.payment.entity.names ;
            
            try {
                
                const user = await User.findOneAndUpadate({user_id},
                                                        {
                                                            $push :{
                                                                courses : course_id ,
                                                            }
                                                        }, { new:true});
                
                const course = await Course.findOneAndUpadate({course_id},{
                                                                 $push :{
                                                                    studentenrolled : user_id ,  
                                                                 },   
                                                                        },{ new :true });
// 
                const responce = await mailsender ( user.email , 
                    "Welcome to the new couerse ",
                    "Congratulation on joining a new a course");
                    
                    return res.status(200).json({
                        status: true ,
                        message: "Enrollment successfull"
                    })

            } catch (error) {
                return res.status(400).json({
                    status: false ,
                    message: "something went wrong while updating details"
                })
            }
        }


    } catch (error) {
        return res.status(400).json({
            status: false ,
            message: "something went wrong while signature verification"
        })
    }
}
