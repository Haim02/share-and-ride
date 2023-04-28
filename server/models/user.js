const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validator');
const salt = 10;

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, 'A user must have a name'],
        unique: [true, 'email altedy exis'],
    },
    email: {
        type : String,
        required: [true, 'Please enter your email'],
        unique: [true, 'email altedy exis'],
        // lowercase: true,
        // validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: Number
    },
    // role: {
    //     type: String,
    //     enum: ['user', 'guide', 'lead-guide', 'admin'],
    //     default: 'user'
    // },
    password: {
        type : String,
        required: [true, 'Please provide a password'], 
        minLength: 8,
        select: false  
    },
    passwordConfirm: {
        type : String,
        required: [true, 'Please provide a Confirm password'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    googleId: {
        type: String
    },
    // passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
    },{timestamps: true});

userSchema.pre('save', async function(next) {
    //Only run this function was actually modified
    if (!this.isModified('password')) {
        return next();
    }
    // Hash the password with salt
    this.password = await bcrypt.hash(this.password, salt);
    
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next()
});

// userSchema.pre(/^find/, function(next) {
//     // this point to the current query
//     this.find({ active: { $ne: false } });
// })

// userSchema.static.doesNotExist = async function(name) {
//     return await this.where(name).countDocuments() === 0;
// }
    
userSchema.methods.comparePassword = async function(userPassword) {
    return bcrypt.compare(userPassword, this.password);
};

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

      this.passwordResetExpire = Date.now() + 10 * 60 * 1000;

      return resetToken
}


module.exports = mongoose.model('User', userSchema)