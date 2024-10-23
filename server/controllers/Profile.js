const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async( req ,res ) => {
    try {
        const { gender , dob , contactNumber , about } = req.body ;
        const { userId } = req.user.id ;

        if ( !gender || !dob || !contactNumber || !about || !userId ){
            return res.status(401).json({
                status:false ,
                message:"please fill all the fields"
            })
        }

        const user = await user.findOne({userId});
        if ( !user ){
            return res.status(401).json({
                status:false ,
                message:"User not registered"
            })
        }

        const publicid = user.additionalDetails ;
        const profile = await findOneAndUpdate({publicid} ,
                                                {
                                                    gender : gender , dob : dob , contactNumber:contactNumber ,about:about
                                                },
                                                {new :true })
                                                // await public.save();
        res.status(200).json({
            status:true,
                message:"Additional details updated succesfully"
        })
    } catch (error) {
        return res.status(401).json({
            status:false ,
            message:"something went wrong while updating public"
        })
    }
}


exports.deleteAccount = async( req ,res ) => {
    try {
        
        const { userId } = req.user.id ;
        
        if ( !userId ){
            return res.status(401).json({
                status:false ,
                message:"please fill all the fields"
            })
        }
        const user = await User.findOne({userId});
        if ( !user ){
            return res.status(400).json({
                status:false ,
                message:"please regiter to delete your account"
            })
        }
        const publicId = user.additionalDetails ;

        await Profile.findOneAndDelete({publicId});
        await User.findOneAndDelete({userId});

        res.status(200).json({
            status:true,
            message:"Your Account is Deleted sccessfully"
        })
    } catch (e) {
        return res.status(401).json({
            status:false ,
            message:"something went wrong while deleteing"
        })
    }
}