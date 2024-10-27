
const mailsender = require("../utils/Mailsender");
const User = require("../models/User");

exports.contactUs = async( req ,res ) => {
    try {
        const { firstname ,lastname , phoneNo , message, email } = req.body ;
        if ( !firstname || !lastname || !phoneNo || !message || !email ){
            return res.status(400).json({
                status:false,
                message:"fill all the required feilds"
            })
        }

        const user = await User.findOne({email});
        if ( !user ){
            return res.status(400).json({
                status:false,
                message:"Please register before contacting us"
            })
        }
        
        try {
            await mailsender ( process.env.MAIL_USER , `${firstname} contacted U` , `${firstname} 
                                                ${lastname} \n ${phoneNo} \n ${message}` );
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
            success: true ,
            message:"Your Contact us form is sumbitted"
        })

    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"something went wrong while contacting"
        })
    }
};