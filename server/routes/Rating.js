
const express = require('express');
const { createRating, getAverageRating, getAllReview } = require('../controllers/RatingAndReview');
const router = express.Router();
const { createCategory} = require("../controllers/Category");
const { auth , isAdmin} = require("../middlewares/auth");

router.post("/createrating" , createRating );
router.post("/getaveragerating" , getAverageRating );
router.post("/getallreviews" , getAllReview);
router.post("/createCategory", auth , isAdmin ,createCategory ) ;

module.exports = router ;