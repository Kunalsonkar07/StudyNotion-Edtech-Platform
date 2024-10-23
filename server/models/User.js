
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        trim:true ,
    },
    lastName:{
        type: String,
        required:true,
        trim:true ,
    },
    email:{
        type: String,
        required:true,
        trim:true ,
    },
    password:{
        type: String,
        required:true,
        trim:true ,
    },
    accountType:{
        type:String,
        enum:['Admin','Student','Instructor']
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    image:{
        type: String,
    },
    courseProgess:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'CourseProgress'
    },
    token :{
        type:String,
    },
    expirationTime:{
        type: String,
        default: Date.now() + 3 * 60 * 1000 ,
    }
})

module.exports = mongoose.model('User', userSchema);