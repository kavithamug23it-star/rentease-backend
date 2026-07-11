const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  ownerEmail: {
    type: String,
    required: true
  },

   status: {
    type: String,
    enum: ["available", "rented", "blocked"],
    default: "available"
  },
  ownerLocation:{
    lat:{
        type:Number
    },
    lng:{
        type:Number
    },
    place:{
        type:String
    }
}

}, {
  timestamps: true
});

module.exports = mongoose.model("Property", PropertySchema);