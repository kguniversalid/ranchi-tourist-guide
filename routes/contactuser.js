const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/contactuser');
const contactUsers = require('../controllers/contactuser');

router.route('/')

    .get(contactUsers.renderContact) 
    
    
router.route('/newcontact')
    .post(catchAsync(contactUsers.randomContactRegister));



module.exports = router;