const User = require("../models/user");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Product = require("../models/product");
const Message = require("../models/message");
const { createSentToken } = require("../controllers/auth");

const { validationResult } = require("express-validator");

exports.adminLogin = async (req, res, next) => {
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

    if (user.role !== "admin") {
      throw new Error("not an admin");
    }
    createSentToken(user, 200, res, req);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.adminLogout = async (req, res) => {
  res.clearCookie("jwt");
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "user logout",
  });
};

exports.isAdmin = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
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
    if (currentUser.role === "admin") {
      req.admin = currentUser;
      res.locals.admin = currentUser;
      next();
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getUser = (req, res, next) => {
  return req.admin;
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getOneProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateOneProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteOneProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      status: "seccess",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const message = await Message.find({ toUser: req.session.user });
    res.status(200).json({
      status: "seccess",
      message,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getLastRentstUser = async (req, res) => {
  const limit = 5;
  try {
    const lastRents = await Message.find({ fromUser: req.params.id })
      .populate("productId")
      .limit(limit);
    res.status(200).json({
      status: "seccess",
      lastRents,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getLastRentstProduct = async (req, res) => {
  const limit = 10;
  try {
    const lastRents = await Message.find({ productId: req.params.id })
      .populate("fromUser")
      .limit(limit);

    res.status(200).json({
      status: "seccess",
      lastRents,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getUserLength = async (req, res) => {
  try {
    const users = await User.countDocuments();

    res.status(200).json({
      message: "seccess",
      users,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getProductLength = async (req, res) => {
  try {
    const products = await Product.countDocuments();

    res.status(200).json({
      message: "seccess",
      products,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getRentStats = async (req, res, next) => {
  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, 0);
  let currentMonth = String(date.getMonth() + 1).padStart(2, 0);
  let currentYear = String(date.getFullYear());
  let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  let LastMonth = String(date.getMonth() - 1).padStart(2, 0);
  let LastMonthDate = `${currentYear}-${LastMonth}`;

  try {
    const todayRentStats = await Message.find({
      createdAt: {
        $gte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000),
      },
    });

    const todayRejectRentStats = await Message.find({
      createdAt: {
        $gte: new Date(new Date() - 1 * 60 * 60 * 24 * 1000),
      },
      status: {
        $eq: "reject",
      },
    });

    const todayApproveRentStats = await Message.find({
      createdAt: {
        $gte: new Date(new Date() - 2 * 60 * 60 * 24 * 1000),
      },
      status: {
        $eq: "approve",
      },
    });

    const totalApproveRentStats = await Message.find({
      status: {
        $eq: "approve",
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        todayRentStats,
        todayRejectRentStats,
        todayApproveRentStats,
        totalApproveRentStats,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getLastProducts = async (req, res) => {
  try {
    const lastProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user");

    res.status(200).json({
      status: "success",
      lastProducts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
