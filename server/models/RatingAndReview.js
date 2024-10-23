
const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    
    User :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    rating :{
        type: Number,
        required :true ,
    },
    review :{
        type:String,
        trim:true,
    },
})

module.exports = mongoose.model('Rating', ratingSchema) ;