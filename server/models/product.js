const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["bicycle", "scooter"],
      message: "type is either: bicycle or scooter",
    },
    details: {
      title: {
        type: String,
        trim: true,
        required: [true, "title is required"],
      },
      description: {
        type: String,
        trim: true,
      },
      model: {
        type: String,
      },
      helmet: {
        type: Boolean,
        enum: [true, false],
        message: "helmet is either: true or false",
        default: "false",
      },
      electric: {
        type: Boolean,
        enum: [true, false],
        message: "helmet is either: true or false",
        default: "false",
      },
      speed: {
        type: Number,
      },
      battery: {
        type: Number, 
      },
    },
    price: {
      dailyPrice: {
        type: Number,
      },
      hourPrice: {
        type: Number,
      },
      payment: {
        type: String,
      },
    },
    location: {
      city: {
        type: String,
        required: [true, "city is required"],
      },
      street: {
        type: String,
        required: [true, "street is required"],
      },
      houseNumber: {
        type: Number,
      },
    },
    city: {
      type: String,
    },
    images: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "product must belong to a user"],
    },
  },
  { timestamps: true }
);

productSchema.pre('save', function(next) {
  this.city = this.location.city
  next();
});

module.exports = mongoose.model("Product", productSchema);
