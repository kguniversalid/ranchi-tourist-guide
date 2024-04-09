const Admin = require('../models/admin');
const { cloudinary } = require("../cloudinary");
const ContactUser = require('../models/contactuser');
const User = require('../models/user');
const Campground = require('../models/campground');
const Review = require('../models/review');



module.exports.renderAdminHome = async(req, res) => {
    const campgrounds = await Campground.find({});    
    const users=await User.find({}) ;  
    const reviews=await Review.find({}) ; 
    const contacts=await ContactUser.find({}) ; 
    
    res.render('admin/index1',{campgrounds,users,reviews,contacts})
    
    
};


module.exports.render_user_profile=async(req, res,next) => {
    
    const id=req.params.id;
   const user = await User.findById(id)

   


    return res.redirect(`/admin/${user._id}`)

    


}

module.exports.showAdminUserById=async(req,res) => {

    const user = await User.findById(req.params.id)
    if (!user) {
        req.flash('error', 'Cannot find User');
        return res.redirect('/admin');
    }
    res.render('admin/user_profile', { user });


}



module.exports.showAdminPlaceById=async(req,res) => {

    const campground = await Campground.findById(req.params.id)
  
    res.render('admin/edit', { campground });


}






module.exports.update_user_byadmin = async (req, res) => { 

   
    const { id } = req.params;
    const { first_name,last_name,username,email } = req.body;
    
    const user = await User.findByIdAndUpdate(id, { first_name,last_name,username,email  });
//    console.log(user);
    await user.save();
    req.flash('success', 'Successfully updated user details !');
   
   return res.redirect(`/admin/${user._id}/edituser`);

}




module.exports.delete_user_byadmin = async (req, res) => {   
    const { id } = req.params;
    const y=await User.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted User')    
    res.redirect('/admin');
       
}



module.exports.show_place_byadmin=async(req,res) => {
    res.redirect('admin/edit')

}




module.exports.updateAdminCampground = async (req, res) => {
    const { id } = req.params;
   

    const campground = await Campground.findByIdAndUpdate(id,{ ...req.body.campground });
    
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    await campground.save();
    console.log("Saved data=   ",campground)
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated place!');
    return res.redirect('/admin')
}






module.exports.deleteAdminCampground = async (req, res) => {
    const { id } = req.params;
    
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the place and its records.')
    return res.redirect('/admin');
}
