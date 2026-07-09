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
  },
  isDeleted: {
 type: Boolean,
 default: false
}
});

module.exports = mongoose.model("Chat", ChatSchema);