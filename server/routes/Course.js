
const express = require('express');
const router = express.Router();

const { auth , isStudent, isInstructor ,isAdmin } = require("../middlewares/auth");
const { createCourse, getCourseDetail } = require('../controllers/Course');
const { createSection, deleteSection, updateSection } = require('../controllers/Section');
const { createsubSection, updatesubSection, deletesubSection } = require('../controllers/subSection');


router.post("/createCourse" , auth , isInstructor  , createCourse );
router.get("/getcoursedetail" , getCourseDetail) ;
router.post("/createsection" , createSection );
router.post("/updatesection" , updateSection );
router.post("/deletesection" , deleteSection );
router.post("/createsubsection" , createsubSection );
router.post("/updatesubsection" , updatesubSection );
router.post("/deletesubsection" , deletesubSection );


module.exports = router ;