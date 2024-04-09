const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');






router.route('/')
    .get(users.renderHome)

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
   .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)
    //.post(catchAsync(users.login));

router.get('/logout', users.logout)







router.route('/newlogin')
    .get(users.rendernewlogin)


router.route('/newregister')
    .get(users.rendernewregister)



// router.route('/adminlogin')
//     .get(users.AdminLoginPage)
//     //.post(users.adminlogin)



module.exports = router;