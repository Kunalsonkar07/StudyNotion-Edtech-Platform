
const express = require('express');
const { showAllcategory } = require('../controllers/Category');
const router = express.Router();



// const { showAllcategory } = require("../controllers/Category") ;


router.get("/showAllcategory" ,  showAllcategory );


module.exports = router ;