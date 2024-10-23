const express = require("express");
const app = express() ;
// const cors = require('cors');

require("dotenv").config();
const PORT = process.env.PORT ;



const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const ratingRoutes = require("./routes/Rating");
const userRoutes = require("./routes/User");
const categoryRoutes = require("./routes/Category");
const passwordRoutes = require("./routes/password");

const { connect } = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./utils/cloudinary");
const fileupload = require("express-fileupload")

connect();
app.use(express.json());
app.use(cookieparser());
app.use(
    cors({
        origin:"*",
        credentials:true ,
    })
)

app.use( 
    fileupload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)


app.use("/api/v1/auth" ,userRoutes);
app.use("/api/v1/course" ,courseRoutes);
app.use("/api/v1/rating" ,ratingRoutes );
app.use("/api/v1/profile" ,profileRoutes);

app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/auth",passwordRoutes );

app.get( "/" , (req ,res) =>{
    return res.status(200).json({
        success:true ,
        message:"hello bhailog"
    })
})

cloudinaryConnect() ;
app.listen( PORT , () =>{
    console.log(`Server started at port number : ${PORT}`)
})


