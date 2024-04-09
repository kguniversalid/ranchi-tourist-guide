const ContactUser = require('../models/contactuser');



module.exports.renderContact = (req, res) => {
    res.render('contact_us1')
}




module.exports.randomContactRegister = async (req, res, next) => {
    try {
        const { name,email,mobile_number,message} = req.body;
        const u1 = new ContactUser({ name,email,mobile_number,message });


        // const registeredUser = await User.register(user, password);
        // req.login(registeredUser, err => {
        //     if (err) return next(err);
        //     req.flash('success', 'Your request has been submitted');
        //     res.redirect('/contact');
       
      
            await u1.save()
           req.flash('success', 'Your request has been submitted');
          res.render('/contact');


            // .then((result) => {


            //     console.log('User saved successfully:', result);
            // })
            // .catch((error) => {
            //     console.error('Error saving user:', error);
            // });
       
       
       
       // })



    } catch (e) {
        req.flash('error', e.message);
       // res.redirect('register');
    }
}
