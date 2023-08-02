const User = require("../models/user");
const Product = require("../models/product");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateUserProfile = async (req, res, next) => {
  const userId = req.params.id;
  console.log('req', req.body)
  try {
    if (req.body.password || req.body.passwordConfirm) {
      throw new Error(
        "This route is not for password updates. Please use /updateMyPassword."
      );
    }

    const filteredBody = filterObj(req.body, "name", "email", "phone");
    if (req.file) filteredBody.photo = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(userId, filteredBody, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new Error("No document found with that ID");
    }

    res.status(200).json({
      status: "success",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = async (req, res, next) => {
  try {
    const user = User.findById(req.cookies.user);

    if (!user) {
      throw new Error("No document found with that ID");
    }

    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.find({ user: req.params.id });

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const updateProduct = await Product.findByIdAndUpdate(
      productId,
      {
        details: req.body?.details,
        price: req.body?.price,
        location: req.body?.location,
        city: req.body?.location?.city,
        images: req.body?.images,
      },
      { returnDocument: "after" }
    );
    if (!updateProduct) {
      throw new Error("No document found with that ID");
    }


    res.status(200).json({
      status: "success",
      product: updateProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deletProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      throw new Error("No document found with that ID");
    }

    res.status(200).json({
      status: "success",
      data: {
        data: product,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
