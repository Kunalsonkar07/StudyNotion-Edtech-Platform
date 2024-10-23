const User = require("../models/User");
const crypto = require("crypto");
const brcypt = require("bcrypt") ;

const mailsender = require ("../utils/Mailsender")

exports.resetPasswordToken = async( req , res ) => {
    try {
        const { email } = req.body ;

        if ( !email ){
            return res.status(401).json({
                status : false ,
                message :"please fill all the necessary fields"
            })
        }

        const user = await User.findOne({email});
        if ( !user ){
            return res.status(401).json({
                status : false ,
                message :"you are not registered please register to reset password"
            })
        }

        const token = crypto.randomUUID();

        if( !token){
            return res.status(401).json({
                status : false ,
                message :"please fill all the necessary fields"
            })
        }

        user.token = token ;
        user.expirationTime = Date.now() + 3 * 60 * 10000 ;
        // console.log( user) ;
        let url = `http://localhost:3000/update-password/${token}`;

        // console.log( url ) ;
        user.save() ;

        let info = await mailsender( email , "Reset password studynotation" , url ) ;
        console.log(info) ;

        res.status(200).json({
            status:true,
            message:"reset link send sucessfully"
        })

    } catch (error) {
        return res.status(500).json({
            status : false ,
            message :"Something went wrong while sending mail"
        })
    }
}

exports.resetPassword = async( req ,res ) => {
    try {

        // console.log("inside here")
        // console.log(password);
        //     console.log(confirmpassword);
        //     console.log(token);
        
        const { token , password , confirmPassword } = req.body ;

        if ( !token || !password || !confirmPassword){
            return res.status(401).json({
                status : false ,
                message :"please fill all the given Fields"
            })
        }

        
        if ( password !== confirmPassword ){
            return res.status(401).json({
                status : false ,
                message :"password does not match",
            })
        }
        
        
        const user = await User.findOne({token : token});
        if ( !user ){
            return res.status(401).json({
                status : false ,
                message :"you are not registered please register to reset password"
            })
        }

        console.log(token) ;
        if ( user.expirationTime < Date.now() ){
            return res.status(401).json({
                status : false ,
                message :"Token expired",
            })
        }

        // console.log(password) ;
        // console.log(confirmPassword) ;

        let tempPassword = await brcypt.hash( password , 10 );
        if ( !tempPassword ){
            return res.status(401).json({
                status : false ,
                message :"Error while hashing password"
            })
        }

        user.password = tempPassword ;
        user.token = null ;
        user.save() ;
        res.status(200).json({
            status:true,
            message:"Password successfully reseted"
        })

    } catch (error) {
        return res.status(401).json({
            status:false ,
            message:"Something went wrong while resting password"
        })
    }
}