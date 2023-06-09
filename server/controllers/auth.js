const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const { promisify } = require("util");
const sendEmail = require("../utils/email");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSentToken = (user, statusCode, res, req) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 4 * 60 * 60 * 1000
    ),
    httpOnly: false,
    sameSite: "none",
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

const createSentTokenGoogleLogin = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 4 * 60 * 60 * 1000
    ),
    httpOnly: false,
    sameSite: "none",
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);
  return token;
};

exports.protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.session.cookie) {
      token = req.session.cookie.token;
    }
    if (!token) {
      throw new Error("You are not logged in! Please log in to get access.");
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    ).catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error("You are not logged in! Please log in to get access.");
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.signup = async (req, res) => {
  const { name, email, password, passwordConfirm, phone } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }

    const checkEmail = await User.findOne({ email });
    const checkName = await User.findOne({ name: name });

    if (checkEmail) {
      throw new Error("E-Mail exists already, please pick a different one.");
    } else if (checkName) {
      throw new Error("Name exists already, please pick a different one.");
    } else if (password != passwordConfirm) {
      throw new Error("Passwords have to match");
    }

    const newUser = new User({
      name,
      email,
      phone,
      password,
      passwordConfirm,
    });

    newUser.save((err, newUser) => {
      if (err) {
        throw err;
      } else {
        createSentToken(newUser, 201, res, req);
      }
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new Error(errors.array()[0].msg);
    }

    if (!email || !password) {
      throw new Error("no email or password");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      throw new Error("email or password not currect");
    }

    createSentToken(user, 200, res, req);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (!req.session.user) {
      throw new Error("user not login");
    }

    const user = await User.findById(req.session.user);

    if (!user) {
      throw new Error("user not found");
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.checkAuthenticated = (req, res, next) => {
  if (req.Authenticated()) {
    return next();
  }

  res.redirect("/auth/login");
};

exports.logout = async (req, res, next) => {
  if (req.session) {
    req.session = null;
  }

  res.clearCookie("jwt");
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "user logout",
  });
};

exports.forgotPassword = async (req, res, next) => {
  let user;
  try {
      user = await User.findOne({ email: req.body.email });
      
      if (!user) {
          return new Error("There is no user with this email address.", 404);
    }

    if (user.googleId) {
      return new Error("This user is rigester with google account.", 404);
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/user/resetPassword/${resetToken}`;

    const message = ` לא שכחתה סיסמה? התעלם מהמייל הזה , ${resetURL} - שכחתה סיסמה? כנס לקישור הבא והכנס סיסמה חדשה`;

    const subject = "(זמין ל 10 דקות) תוקן לאיפוס סיסמה";

    await sendEmail(null, user.email, subject, message);

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: Date.now() },
    });

    if (!user) {
      return new Error("Token is inavlid or has expired", 400);
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();

    createSentToken(user, 200, res, req);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  const { newPassword, currentPassword, passwordConfirm } = req.body;
  try {
    const user = await User.findById(req.user.id).select("+password");
    if (!(await user.comparePassword(password))) {
      return new Error("Your current password is wrong.");
    }

    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createSentToken = createSentToken;
exports.createSentTokenGoogleLogin = createSentTokenGoogleLogin;
