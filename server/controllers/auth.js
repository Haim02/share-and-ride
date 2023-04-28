const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { validationResult } = require('express-validator')
const { promisify } = require('util');
const sendEmail = require('../utils/email');
const catchAsync = require('./../utils/catchAsync');
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");

dotenv.config({ path: './config.env' });

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const setSession = (user, statusCode, res, req) => {
// exports.setSession = (user, statusCode, res, req) => {
    user.password = undefined;
    req.session.user = user._id 
    res.status(statusCode).json({
        status: 'success',
        user 
    })
}


const createSentToken = (user, statusCode, res, req) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() +  process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 *1000),
        httpOnly: true,
        sameSite: 'none', 
        secure: true
    };
    
    // if (process.env.NODE_ENV === 'production'){
        //     cookieOptions.secure = true
        // }
        // let setCookie = ('token', token, cookieOptions)
        // res.cookie('token', token, cookieOptions)
        // req.session.user = user._id
        // req.session.cookie = ('token', token, cookieOptions)
        // req.session.cookie = cookie('token', token, cookieOptions)
        // cookieSession({
        //     name: 'session',
        //     maxAge: 24 * 60 * 60 * 1000,
        //     keys: [process.env.COOKIE_KEY]
        // })
        
        //Remove password from output 
        user.password = undefined;
        // const login = req.isAuthenticated();
        req.session.user = user._id 
        console.log('sihn', req,session)
        res.status(statusCode).json({
            status: 'success',
            // token,
            user 
        }
        )
}

exports.protect = async (req, res ,next) => {
    let token;
    // const login = req.session.isAuthenticated();
    const userId = req.session.user;
    console.log('prodect', req.session)

    try {
        if(!userId){
            throw new Error('your are not login')
        }

        const decoded = await User.findById(userId);
        if(!decoded){
            throw new Error('your are not login')
        }

        next()
    } catch (error) {
        res.status(400).json({
             status: "fail",
             message: error.message
        })  
    }

    // try {
    //     if(
    //         req.headers.authorization &&
    //         req.headers.authorization.startsWith('Bearer')
    //         ) {
    //             token = req.headers.authorization.split(' ')[1];
    //         } 
    //         else if(req.cookie.token) {
    //             token = req.cookie.token
    // } else if(req.session.cookie) {
    //     token = req.session.cookie.token

    // }
    // if(!token) {
    //     throw new Error('You are not logged in! Please log in to get access.')
    // }
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    // .catch((err) => {
    //     res.status(400).json({
    //         message: err
    //     })     
    // })
    //     const currentUser = await User.findById(decoded.id)
        
    //     if(!currentUser) {
    //         throw new Error('You are not logged in! Please log in to get access.')
    //     }
         
    //     req.user = currentUser;
    // res.locals.user = currentUser;
    //next()
    // } catch (error) {
    //     res.status(400).json({
    //         status: "fail",
    //         message: error.message
    //         })    
    // }
}


exports.signup = async(req, res) => {
    const { name, email, password, passwordConfirm } = req.body
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
             throw new Error(errors.array()[0].msg)
        }

        const checkEmail = await User.findOne({email})
        const checkName = await User.findOne({name: name})

        if(checkEmail) {
              throw new Error('E-Mail exists already, please pick a different one.')
        } else if(checkName) {
              throw new Error('Name exists already, please pick a different one.')
        } else  if(password != passwordConfirm) {
              throw new Error('Passwords have to match')
        }

        // const newUser = await User.create(req.body)
        // const newUser = await User.create({
        //     name ,
        //     email,
        //     password,
        //     passwordConfirm
        // },{
        //     '__v': 0,
        // });

         const newUser = new User({
            name ,
            email,
            phone,
            password,
            passwordConfirm
        });

        newUser.save((err, newUser) => {
            if(err) {
                throw err
            } else {
                // createSentToken(newUser, 201, res, req); 
                setSession(newUser, 201, res, req);

            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({  
            message: error.message
        })
    }
};

exports.login = async(req, res, next) => {
    const {email, password} = req.body;
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            throw new Error(errors.array()[0].msg)
        }

        if(!email || !password){
            throw new Error('no email or password');
        }
        const user = await User.findOne({ email }).select("+password");
        if(!user || !(await user.comparePassword(password))){
            throw new Error('email or password not currect');
        }
        // req.session.user = user._id
        // createSentToken(user, 200, res, req);
        setSession(user, 200, res, req);
        next()

    } catch (error) {  
        console.log(error)
        res.status(400).json({
            message: error.message
        }) 
    }
};

exports.isLoggedIn = async(req, res, next) => {
    try {
        if(!req.session.user) {
            throw new Error('user not login')
        }

        const user = await User.findById(req.session.user)

        if(!user) {
            throw new Error('user not found')
        }

        res.status(200).json({
            status: "success",
            user
       })  
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
       })  
    }

}

// exports.forgotPassword = async(req, res) => {
//     try {
//         const oldUser = await User.findOne({ email: req.body.email });
//         // if(!oldUser) {
//         //     return res.sent("user not found")
//         // }

//         const secret = process.env.JWT_SECRET + oldUser.password
//         const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
//             expiresIn: "5m"
//         });

//         const link = `${req.protocol}://${req.get('host')}/api/user/resetPassword/${oldUser._id}/${token}`;
//         console.log(link)
//         const message = `Forgot your password? Submit a PATCH request with your new password and password confirm
//         to: ${link}.\n If you didnt forget your password, please ignore this email`;

//         try {
//         await sentEmail({
//         email: req.body,
//         subject: 'Your password reset token (valid for 10 min)',
//         text: message
//         })
//         .then((data) => {
//             console.log(data)
//         })

//         res.status(200).json({
//         status: 'success',
//         message: 'Token sent to email'
//         })
//         } 
//         catch (error) {
//         // user.passwordResetToken = undefined;
//         // user.passwordResetExpire = undefined;
//         // await user.save({ validateBeforeSave: false});

//         return res(new Error('There was an error sending the email. try again later!', 500))
//         }  
//     } catch (error) {
        
//     }
// };

// exports.resetPassword = async(req, res) => {
//     const {id, token} = req.params;

//     try {
//         const oldUser = await User.findOne({ _id: id});
//         if(!oldUser){
//             return res.json({message: "user not found"})
//         }
//         const secret = process.env.JWT_SECRET + oldUser.password;
//         const verify = await jwt.verify(token, secret);
//         res.status(200).json({
//             email: verify.email
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: error
//         })
//     } 
// };

// exports.resetPasswordPost = async(req, res) => {
//     const {id, token} = req.params;
//     const { password } = req.body;

//     try {
//         const oldUser = await User.findOne({ _id: id});
//         if(!oldUser){
//             return res.json({message: "user not found"})
//         }
//         const secret = process.env.JWT_SECRET + oldUser.password;
//         const verify = await jwt.verify(token, secret);

//         // await User.updateOne({_id: id}, {$set: { isModified: true, password: password }})
//         // res.status(200).json({
//         //     message: 'verify'
//         // })

        
//      oldUser.password = password;
//      oldUser.passwordConfirm = password;
//      await oldUser.save();

//      res.st(200).json({
//         message: 'Password update'
//      })
//     } catch (error) {
//         res.status(400).json({
//             message: error
//         })
//     } 
// };

exports.logout = async(req, res, next) => {
    // req.logout(function(err) {
    //     if (err) {
    //       return next(err);
    //     }
    //     res.redirect("/");
    //   });
   req.session = null;
   return res.status(200).clearCookie('connect.sid').json({
    message: 'seccess'
})
} 

//----------------------------------------------

exports.forgotPassword = async (req, res, next) => {
    let user;
    try {
     user = await User.findOne({email: req.body.email});

    if(!user) {
        return new Error('There is no user with email this address.', 404)
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false});

    const resetURL = `${req.protocol}://${req.get('host')}/api/user/resetPassword/${resetToken}`;
    console.log('url',resetURL)

    const message = ` לא שכחתה סיסמה? התעךם מהמיל הזה , ${resetURL} - שכחתה סיסמה? כנס לקישור הבא והכנס סיסמה חדשה`

    const subject = '(זמין ל 10 דקות) תוקן לאפוס סיסמה';

    await sendEmail(null, user.email, subject, message)

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        })
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpire = undefined;
        await user.save({ validateBeforeSave: false});
        res.status(500).json({
            status: 'fail',
            message: error.message
        })
        // return new Error('There was an error sending the email. try again later!', 500)
    }                 
};


exports.resetPassword = async (req, res, next) => {
    // Get user based on the token
    try {
        const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

        const user = await User.findOne({ 
            passwordResetToken: hashedToken,
            passwordResetExpire: { $gt: Date.now() }
         });

         // If token has not expired and there is user, set the new password
         if(!user) {
            return new Error('Token is inavlid or has expired',400)
         }
    
         user.password = req.body.password;
         user.passwordConfirm = req.body.passwordConfirm;
         user.passwordResetToken = undefined;
         user.passwordResetExpire = undefined;
         await user.save();
    
         // Update changedPasswordAt property for the user
         // Log the user in
         setSession(user, 200, res, req);        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
};

exports.updatePassword = async(req, res, next) => {
    const {newPassword, currentPassword, passwordConfirm} = req.body;
    try {
        // Get user from collection
        const user = await User.findById( req.user.id ).select('+password');
        // Check if POSTed current password is correct
        if (!(await user.comparePassword(password))){
            return new Error('Your current password is wrong.')
        }
    
        // If so, update password
        user.password = req.body.newPassword;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();
        res.status(200).json({
            status: 'success',
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
};
