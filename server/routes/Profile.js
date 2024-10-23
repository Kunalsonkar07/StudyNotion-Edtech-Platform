
const express = require('express');
const { updateProfile, deleteAccount } = require('../controllers/Profile');
const router = express.Router();


router.post("/updateprofile" , updateProfile);
router.delete("/deleteprofile" , deleteAccount);


module.exports = router ;