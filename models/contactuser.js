const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const contactUserSchema = new Schema({
    name: {
        type: String,
       required: true
    },
    email: {
        type: String,
         required: true
    },
    mobile_number: {
        type:Number,
        required: true,
      
    },
    message: {
        type: String,
         required: true
    },
    
});



module.exports = mongoose.model('contactUser', contactUserSchema);