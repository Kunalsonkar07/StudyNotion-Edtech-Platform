
const express = require('express');
const router = express.Router();

const { Signup, Login } = require("../controllers/Auth");
const { Sendotp } = require('../controllers/Auth');
const { auth , isStudent, isInstructor ,isAdmin } = require("../middlewares/auth");

router.post("/createAccount", Signup );
router.post("/sendotp", Sendotp  );
router.post("/Login" , Login);
// router.post("/dashboard" , ) ;
// router.post("/isstudent", auth , isStudent ) ;
// router.post("/isinstructor", auth , isInstructor ) ;
// router.post("/isadmin", auth , isAdmin ) ;

module.exports = router ;