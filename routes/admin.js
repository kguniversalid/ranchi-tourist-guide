const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

const admin = require('../controllers/admin');


router.route('/')
    .get(admin.renderAdminHome)


// router.route('/up/:id')
//     .get(catchAsync(admin.render_user_profile))


// router.route('/')
//     .get(admin.show_place_byadmin)


router.route('/:id')  

    .get(catchAsync(admin.showAdminPlaceById))   
    .put( upload.array('image'), catchAsync(admin.updateAdminCampground))
    .delete(catchAsync(admin.deleteAdminCampground));



router.route('/:id/edituser')
    .get(catchAsync(admin.showAdminUserById))
    .put( catchAsync(admin.update_user_byadmin))
    .delete(catchAsync(admin.delete_user_byadmin));







    module.exports = router;