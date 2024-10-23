
const mongoose = require('mongoose');
const mailsender = require('../utils/Mailsender');

const OTPSchema = mongoose.Schema({

    email :{
        type: String ,
        required :true ,
    },
    createAt:{
        type:Date,
        default:Date.now(),
    },
    OTP :{
        type:Number,
    },
})

async function sendVerficationMail ( email , OTP ){
    try{
        console.log("inside send verifictaion mail" );
        // console.log( email , " "  , OTP );
        let mailresponce = await mailsender( email , 'Otp for verfictaion in studynotaion' , `${OTP}` );
        console.log(mailresponce);
    }catch(e){
        
    }
}

OTPSchema.pre("save" , async function (next) {
    await sendVerficationMail( this.email , this.OTP );
    next();
})

module.exports = mongoose.model('OTP', OTPSchema ) ;