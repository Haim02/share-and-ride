const User = require("../models/user");


exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find({}, {'__v': 0});

        res.status(200).json({
            data: users
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
};

exports.getOneUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);

        res.status(200).json({
            data: user
        })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
};

exports.updateUser = async(req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
          });

          res.status(200).json({
            data: updateUser
          })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
};

exports.deleteUser = async(req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
    
          res.status(200).json({
            data: deleteUser
          })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
};

exports.getUsers = async(req, res) => {
    try {
        const users = await User.find();
    
          res.status(200).json({
            data: users
          })
    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
};
