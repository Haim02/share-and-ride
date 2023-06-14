const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    date: {
      type: String,
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    notice: {
      type: String,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    isCalled: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    status: {
      type: String,
      require: true,
      enum: ["approve", "reject", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
