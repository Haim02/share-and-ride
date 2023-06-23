const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message");
const authController = require("../controllers/auth");

router.use(authController.protect);

router.get("/messages", messageController.getMessages);

router.get("/requests", messageController.getMyRequests);

router.post( 
  "/createMessage",
  messageController.setfromUserId,
  messageController.createMessage
);

router.patch("/:id", messageController.updateMessages);

module.exports = router;
