const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({

  productId: {
    type: String,
    required: true
  },

  productName: {
    type: String,
    required: true
  },

  userEmail: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    required: true
  },

  comment: {
    type: String,
    required: true
  },
  ownerEmail: {
  type: String,
  required: true
},

}, {
  timestamps: true
});


module.exports = mongoose.model("Feedback", FeedbackSchema);