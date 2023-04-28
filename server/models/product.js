const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
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
        // maxLength: [30, 'A title must have less or equal then 30 characters'],
        required: [true, "title is required"],
      },
      description: {
        type: String,
        trim: true,
        // maxLength: [30, 'A description must have less or equal then 30 characters'],
      },
      model: {
        type: String
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
    images: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "product must belong to a user"],
    },
  },
  { timestamps: true }
);

// DOCUMENT MIDDLEWARE: runs before .save() and create()
// productSchema.pre('save', function(next) {
//     this.slug = slugify(this.name, { lower: true})
//     next();
// });

module.exports = mongoose.model("Product", productSchema);
