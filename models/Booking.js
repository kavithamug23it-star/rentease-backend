const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({

  userEmail: {
    type: String,
    required: true
  },

  ownerEmail: {
  type: String,
  required: true
},

  productId: {
    type: String,
    required: true
  },

  productName: {
    type: String,
    required: true
  },
 image: {
  type: String
},

price: {
  type: String
},

userName: {
  type: String
},
  contact: {
    type: String,
    required: true
  },

  idProof: {
    type: String,
    required: true
  },

  fromDate: {
    type: String,
    required: true
  },

  returnDate: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "On The Way"
  },
  renterLocation:{
    place:{
        type:String
    },
    lat:{
        type:Number
    },
    lng:{
        type:Number
    }
},
feedback: {
  type: String,
  default: ""
},

rating: {
  type: Number,
  default: 0
}
}, {
  timestamps: true
});


module.exports = mongoose.model("Booking", BookingSchema);