
const nodemailer = require('nodemailer') ;

require("dotenv").config();

const mailsender = async ( email , title , body ) => {
    try {

        // console.log("inside mailsender") ;
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST ,
            auth:{
                user: process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        })
        // console.log("transporter created");

        let info = await transporter.sendMail({
            from: ' studynotaion | by kunal ',
            to: `${email}` ,
            subject: `${title}` ,
            html: `${body}` ,
        })
        return info ;

    }catch(e){
        console.log(e) ;
    }
}

module.exports = mailsender ;