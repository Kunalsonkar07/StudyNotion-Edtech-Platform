
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true ,
    },
    description:{
        type: String,
        required:true,
        trim:true ,
    },
    instructor :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    whatwillyoulearn:{
        type: String,
        required:true,
        trim:true ,
    },
    courseContent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Section'
    }],
    ratingAndReviews :[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'RatingAndReview',
    }],
    price:{
        type: Number,
        required:true,
    },
    thumbnail :{
        type: String,
        // required:true,
    },
    // array tha code wala
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
    },
    studentenrolled :[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})

module.exports = mongoose.model('Course', courseSchema); 