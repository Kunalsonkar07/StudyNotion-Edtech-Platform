const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require('otp-generator');
const mailsender = require("../utils/Mailsender");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
require("dotenv").config();
// generate otp 

exports.Sendotp = async( req , res ) => {
    try{
        const { email } = req.body ;
        
        // const user = await User.findOne({email});
    
        // if( !user ){
        //     return res.status(401).json({
        //         success: false ,
        //         message : "Use" ,
        //     })
        // }
            let otp = otpGenerator.generate(6, { 
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false ,
                specialChars: false ,
            });

            // ye yaad nahi tha 
            const result = await OTP.findOne({ otp: otp })
            while (result) {
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false ,
                    specialChars: false ,
                })
            }

        try {
            const otpbase = await OTP.create({
                email : email ,
                OTP : otp ,
            });

            if ( otpbase ){

                res.status(200).json({
                    success: true,
                    message: `OTP Sent Successfully`,
                    otp,
                })
            }
            // console.log(otpbase);
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                success:false ,
                message : "falied to upload otp "
            })
        }

    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            success:false ,
            message : "something went wrong while Generating otp"
        })
    }
} ;

// signup 

exports.Signup = async( req , res ) => {
    try {
        const { firstName , lastName , accountType , otp  , email 
                , password , confirmpassword , contactNumber  } = req.body ;

        // ye check karega nahi keya tha 
        if (
            !firstName ||
            !lastName ||
            !email ||
            !accountType ||
            !password ||
            !confirmpassword ||
            !otp
          ) {
            return res.status(403).send({
              success: false,
              message: "All Fields are required",
            })
          }

          console.log( password , typeof(password) );
          if ( password !== confirmpassword){
              return res.status(401).json({
                  success:false ,
                  message : "Password does not match"
                })
            }
            
        const user = await User.findOne({email});

        if( user ){
            return res.status(402).json({
                success:false ,
                message : "User already exists hello "
            })
        }

        const response = await OTP.find({ email }).sort({ createAt: -1 }).limit(1) ;

        // db.collection.find() fetches all documents from the collection.
        // .sort({ createdAt: -1 }) sorts the documents in descending order based on the createdAt field.
        // .limit(1) limits the result to just one document, which will be the most recent one.

        console.log(response);
        console.log("hello");
        console.log("printing ", response[0].OTP, "and ", otp );
        if (response.length === 0) {
          // OTP not found for the email
          return res.status(400).json({
            success: false,
            message: "The OTP is not valid",
          })
        } else if (otp != response[0].OTP ) {
          // Invalid OTP
          return res.status(400).json({
            success: false,
            message: "The OTP does not match",
          })
        }

        if ( otp == response[0].OTP ){

            console.log("insidehere")
            let hashedpass = await bcrypt.hash( `${password}` , 10);
            
            const profile = await Profile.create({
                gender: null ,
                about: null ,
                contactNumber :null ,
                dob:null
            })

            const user = await User.create(
                { firstName , lastName , accountType , email
                     , password:hashedpass ,
                additionalDetails:profile , image:""            
            });
            console.log(user);

            return res.status(402).json({
                success: true,
                message : "User registered"
            })
        }
        else{
            return res.status(401).json({
                success:false ,
                message : "hashing failed"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(402).json({
            success:false ,
            message : "error while signup please try again later"
        })
    }   
}

// login
exports.Login = async ( req , res ) => {
    try{
        const { email , password } = req.body ;
        // console.log("hello");
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
              success: false,
              message: `Please Fill up All the Required Fields`,
            })
          }

        const user = await User.findOne({email});

            if( !user ){
                return res.status(402).json({
                    success:false ,
                    message : "User not registered"
                })
            }
            // console.log("hello ji " , user );
            // console.log(toString(password));

        if ( await bcrypt.compare( password , user.password )){
            // console.log("hello ji ");
            const payload = {
                email: user.email ,
                id : user.id ,
                accountType:user.accountType,
            }
            // secret kunal
            const token = jwt.sign( payload , process.env.JWT_SECRET , {
                expiresIn:"2h",
            })

            user.token = token
            user.password = undefined
            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token , options ).status(200).json({
                success : true ,
                token ,
                user ,
                message : "User login succesfully"
            })
        }
        else{
            return res.status(402).json({
                success:false ,
                message : "Password does not match"
            })
        }
    }catch(e){
        return res.status(500).json({
            success:false ,
            message : "something went wrong"
        })
    }
}   

// chanage password