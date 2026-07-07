const express = require("express");
const router = express.Router();

const Chat = require("../models/Chat");
const User = require("../models/User");

// GET USERS (IMPORTANT — this is missing in your old code)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "email");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// SEND MESSAGE
router.post("/send", async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    const chat = await Chat.create({
      sender,
      receiver,
      message
    });

    res.json({ success: true, chat });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET CHAT
router.get("/:u1/:u2", async (req, res) => {
  try {
    const { u1, u2 } = req.params;

    const messages = await Chat.find({
      $or: [
        { sender: u1, receiver: u2 },
        { sender: u2, receiver: u1 }
      ]
    }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;