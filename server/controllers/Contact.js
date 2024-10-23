
const mailsender = require("../utils/Mailsender");
const User = require("../models/User");

exports.contactUs = async( req ,res ) => {
    try {
        const { fristname ,lastname , contactnumber , message, email ,userid} = req.body ;
        if ( fristname || lastname || contactnumber || message || email ){
            return res.status(400).json({
                status:false,
                message:"fill all the required details"
            })
        }

        const user = await User.findOne({userid});
        if ( !user ){
            return res.status(400).json({
                status:false,
                message:"Please register before contacting us"
            })
        }
        
        try {
            await mailsender ( process.env.MAIL_USER , `${fristname} contacted U` , `${fristname} 
                                                ${lastname} \n ${contactnumber} \n ${message}` );
        } catch (error) {
            return res.status(400).json({
                status:false,
                message:"Error while sending mail to Admin"
            })
        }

        try {
            await mailsender( email , 'You Contact Us | studyNotation' , `Thankyou for sharing your feedback and contacting us`) ;
        } catch (error) {
            return res.status(400).json({
                status:false,
                message:"Error while sending mail to user"
            })
        }

        return res.status(200).json({
            status:true,
            message:"Your Contact us form is sumbitted"
        })

    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"something went wrong while contacting"
        })
    }
};