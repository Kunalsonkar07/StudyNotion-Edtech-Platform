
const Category = require("../models/Category");


exports.createCategory = async( req , res ) => {
    try {

        const { name ,description } = req.body ;

        if ( !name || !description ){
            return res.status(401).json({
                status : false ,
                message :"fill all the required fields"
            })
        }

        const CategoryDetails = await Category.create({name,description});
        // console.log(CategoryDetails);

        return res.status(200).json({
            status : true ,
            message :"Category created successfully",
        })

    } catch (error) {
        return res.status(401).json({
            status : false ,
            message :"Something went wrong while creating Category"
        })
    }
}

exports.showAllcategory = async ( req , res) => {
    // console.log("Inside backend");
    // console.log("Inside backend");
    try {
        const allcategory = await Category.find({});
        // console.log(`Request method: ${req.method}`);
        // console.log(`Request method: ${req.method}`);

        return res.status(200).json({
            status: true,
            data: allcategory ,
            message: "All categories fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching categories:", error); // Log the error for debugging
        return res.status(500).json({
            status: false,
            message: "Something went wrong while fetching categories"
        });
    }
};


exports.categoryPageDetails = async( req ,res ) => {
    try {
        
        const { category_id } = req.body ;

        const categorycourse = await Course.findOne({ _id : category_id});
        if ( !categorycourse ){
            return res.status(400).json({
                status:false,
                message : "Category course cannot be fetched"
            })
        }

        const differentcourses = await Category.find({
                            _id : { $ne : category_id},
        }).populate("course").exec() ;

        return res.status(200).json({
            status : true ,
            categorycourse,
            differentcourses,
            message : "Category courses fetched"
        })

    } catch (error) {
        return res.status(200).json({
            status : false ,
            message : "something went wrong",
        })
    }
}