
const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    
    gender:{
        type:String,
        trim:true,
    },
    dob:{
        type:Date,
        default:Date.now(),
        expires: 3*60
    },
    about:{
        type:String,
        trim:true, 
    },
    contactNumber :{
        type:Number,
    }
})

module.exports = mongoose.model('Profile', profileSchema) ;