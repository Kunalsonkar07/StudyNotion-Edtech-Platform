const express = require('express') ;
const { contactUs } = require('../controllers/Contact');
const router = express.Router() ;


router.post('/contactus' , contactUs) ;

module.exports = router ;