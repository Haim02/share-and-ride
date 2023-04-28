const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv");
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
// const session = require('express-session')
const { Strategy } = require('passport-google-oauth20');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
const userProfileRouter = require("./routes/userProfile");
const messageRouter = require("./routes/message");
const adminRouter = require("./routes/admin");
const googleRouter = require("./routes/google");
const {populateDataList} = require("./controllers/fecthCitiesData");
const cookieSession = require("cookie-session");
const User = require("./models/user");


const app = express();

dotenv.config({ path: './config.env' });

// Limit requests from same API
const limiter = rateLimit({ 
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter) 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser())

//Data sanitiaion against NoSQL quert injection
app.use(mongoSanitize());

//Data sanitiaion against XSS
app.use(xss())

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// passport.use(new Strategy({
//     callbackURL: '/auth/google/callback',
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET
// }))

//save the session to the cookie
passport.serializeUser((user, done) => {
    done(null, user.id)
});

//read the session from the cookie
passport.deserializeUser( async(id, done) => {
    const user = await User.findById(id)
    console.log('app', user)
    done(null, user)
});

app.set('trust proxy', 1)

app.use(cookieSession({
    name: 'session',
    secret: process.env.COOKIE_KEY,
    keys: [process.env.COOKIE_KEY],
    maxAge: 4 * 60 * 60 * 1000,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        maxAge: 4 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google', googleRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/profile', userProfileRouter); 
app.use('/api/message', messageRouter);
app.use('/api/admin', adminRouter);

// all http method
app.all('*', (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on this server!`));
 });

app.use(passport.initialize());

// error handliing middleware
app.use(globalErrorHandler); 
 
module.exports = app;