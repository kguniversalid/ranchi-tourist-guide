if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}



const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const Campground = require('./models/campground');


const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const contactuserRoutes = require('./routes/contactuser');
const adminRoutes = require('./routes/admin');

const MongoStore = require('connect-mongo');


mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))


const store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});



const sessionConfig = {
    store,
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    //console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/contact', contactuserRoutes)
app.use('/admin',adminRoutes);


// const Campground = require('./models/campground'); 
// const allcamprecord =  Campground.find({});

// console.log(allcamprecord);
// app.get('/', (req, res) => {
//     res.render('index1.ejs')
// });


app.get('/map', async(req, res) => {
    const camprecords =await Campground.find({});
    res.render('map',{camprecords})
});




// app.get('/contact', (req, res) => {
//     res.render('contact_us1.ejs')
// });


app.get('/about_us', (req, res) => {
    res.render('about_us1.ejs')
});

app.get('/adminlogin', (req, res) => {
    res.render('adminlogin.ejs')
});

const adminname = process.env.ADMIN_USERNAME;
const adminpass=process.env.ADMIN_PASS;



app.post('/adminlogin',(req, res) => {
    const{ username, password } = req.body;
    if(username==adminname && password==adminpass)
    {
    res.redirect('/admin');
    }
    else{
        res.redirect('/');
    }


})















app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(10000, () => {
    console.log('Serving on port 10000')
})


