
const mongoose = require('mongoose');

const subSectionSchema = mongoose.Schema({
    
    title:{
        type:String,
        trim:true,
    },
    timeDuration:{
        type:String
    },
    description :{
        type:String,
        trim:true, 
    },
    videoUrl:{
        type:String,
    },
    sectionid: {
        type: mongoose.Schema.Types.ObjectId 
    }
})

module.exports = mongoose.model('subSection', subSectionSchema)  ;