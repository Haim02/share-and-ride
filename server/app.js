const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors"); 
const morgan = require("morgan");
// const passport = require("passport");
// const session = require("express-session");
// const initialPassport = require("./controllers/passport-config");
// const { Strategy } = require("passport-google-oauth20");
// const MongoStore = require("connect-mongo")(session);
// const { mongoCreateConnection } = require("./utils/mongoConnect");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const flash = require("express-flash"); 
const rateLimit = require("express-rate-limit");
const globalErrorHandler = require("./controllers/errorController");
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");
const userProfileRouter = require("./routes/userProfile");
const messageRouter = require("./routes/message");
const adminRouter = require("./routes/admin");
const authController = require("./controllers/auth");
const dotenv = require("dotenv");
const User = require("./models/user");

dotenv.config({ path: "./config.env" });
const app = express();
     
// Limit requests from same API
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000, 
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Data sanitiaion against NoSQL quert injection
app.use(mongoSanitize()); 

//Data sanitiaion against XSS
app.use(xss());

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(flash());
app.use(morgan('combined')); 

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("trust proxy", 1);

// app.use(cookieSession({
//     name: 'session',
//     secret: process.env.COOKIE_KEY,
//     keys: [process.env.COOKIE_KEY],
//     maxAge: 4 * 60 * 60 * 1000,
//     saveUninitialized: false,
//     unset: 'destroy',
//     cookie: {
//         maxAge: 4 * 60 * 60 * 1000,
//         secure: true,
//         httpOnly: true,
//     }
// }))

// initialPassport(passport, authController.login, (id) => User.findById(id));


async function adm(){
  try {
    await User.create({
            name: 'admin123',
            username: 'admin',
            email:'admin123@gmail.com',
            phone: '0527883408',
            role: 'admin',
            password: "12345678",
            passwordConfirm: "12345678",
        }) 
    
  } catch (error) {
  } 
    };
// adm() 
app.use(compression()); 

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/profile", userProfileRouter);
app.use("/api/message", messageRouter);
app.use("/api/admin", adminRouter);
 
// all http method
app.all('*', (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on this server!`));
 });

 
//error handliing middleware
app.use(globalErrorHandler);
 
module.exports = app;
