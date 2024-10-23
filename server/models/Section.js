
const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    
    name :{
        type: String ,
        required :true ,
    },
    courseid : {
        type : mongoose.Schema.Types.ObjectId ,
    },
    subsection :[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"subSection"
    }]
})

module.exports = mongoose.model('Section', sectionSchema) ;