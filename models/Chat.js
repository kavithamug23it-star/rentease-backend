const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  sender: String,
  receiver: String,

  productId: String,
  productName: String,
  image: String,

  message: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Chat", ChatSchema);