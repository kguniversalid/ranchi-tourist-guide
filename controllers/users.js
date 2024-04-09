

require('dotenv').config();

// const adminname = process.env.ADMIN_USERNAME;
// const adminpass=process.env.ADMIN_PASS;


const User = require('../models/user');
const Campground = require('../models/campground');



module.exports.renderHome = async(req, res) => {
    const campgrounds = await Campground.find({});
    const campgrounds2 = await Campground.find({});
    res.render('index1.ejs',{campgrounds,campgrounds2});
}

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { first_name,last_name,username,email, password } = req.body;
        const user = new User({ first_name,last_name, username,email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Ranchi Tourist Guide');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');

//console.log(adminname);
    



    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);


}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
}





module.exports.rendernewlogin = (req, res) => {
    res.render('users/newlogin');
}


module.exports.rendernewregister = (req, res) => {
    res.render('users/newregister');
}


// module.exports.renderAdminLogin = (req, res) => {
//     const{ username, password } = req.body;
//     if(username==adminname && password==adminpass)
//     {
//     res.redirect('/admin');
//     }
//     else{
//         res.redirect('/');
//     }


// }


// module.exports.AdminLoginPage = (req, res) => {
//     res.render('/adminlogin');
// }
