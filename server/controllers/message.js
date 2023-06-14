const Message = require("../models/message");
const sendEmail = require("../utils/email");

exports.setfromUserId = async (req, res, next) => {
  req.body.fromUser = req.user._id;
  next();
};

exports.createMessage = async (req, res) => {
  try {
    let message = await Message.create(req.body);

    res.status(201).json({
      status: "success",
      message,
    });

    message = await message.populate("fromUser");
    message = await message.populate("toUser");
    message = await message.populate("productId");
    await sendEmail(message);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const message = await Message.find({ toUser: req.user._id })
      .populate("productId")
      .populate("fromUser");

    res.status(200).json({
      message,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Message.find({ fromUser: req.user._id }).populate(
      "productId"
    );
    res.status(200).json({
      requests,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

exports.updateMessages = async (req, res) => {
  const messageId = req.params.id;

  try {
    const chckeMessage = await Message.findById(messageId).populate("fromUser");
    if (chckeMessage.status !== "pending") {
      return;
    }

    const message = await Message.findByIdAndUpdate(messageId, req.body);
    res.status(200).json({
      message,
    });

    await sendEmail(message, message.fromUser.email);
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};
