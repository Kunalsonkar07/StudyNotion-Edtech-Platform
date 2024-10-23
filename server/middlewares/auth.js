const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User")

exports.auth = async( req , res , next) => {
    try{
        
        const token = req.cookies.token || req.user.token || 
                    req.header("Authorization").replace("Bearer ", "") ;

        if (!token) {
			return res.status(401).json({ 
                success: false, 
                message: `Token Missing` });
		}

        try {
            const payload = jwt.verify( token , process.env.JWT_SECRET );
            req.user = payload ;
            next();
        } catch (error) {
            return res.status(400).json({
                status: false ,
                message:"Invalid token"
            })
        }
        // next();
    }
    catch(e){
        return res.status(402).json({
            success:false ,
            message : "something went wrong while in token"
        })
    }
}

exports.isStudent = async( req ,res, next ) => {
    try {
        if ( req.user.accountType !== "Student"){
            return res.status(402).json({
                success:false ,
                message : "You are not for this role"
            })
        }
    
        next();
        
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"something went wrong",
        })
    }
}

exports.isInstructor = async( req ,res, next ) => {
    
    try {
        
        if ( req.user.accountType !== "Instructor"){
            return res.status(402).json({
                success:false ,
                message : "You are not for this role"
            })
        }
    
        next();
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"something went wrong",
        })
    }
}

exports.isAdmin = ( req ,res, next ) => {
    
    try {
        if ( req.user.accountType !== "Admin"){
            return res.status(402).json({
                success:false ,
                message : "You are not for this role"
            })
        }
    
        next();
        
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"something went wrong",
        })
    }
}