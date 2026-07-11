const express = require("express");
const Booking = require("../models/Booking");
const Property = require("../models/Property");
const mongoose = require("mongoose");

const router = express.Router();

// Create Booking
router.post("/add", async (req, res) => {

  try {

    console.log("========== BOOKING REQUEST ==========");
    console.log(req.body);

    const booking = new Booking(req.body);

    await booking.save();

    console.log("========== BOOKING SAVED ==========");
    console.log(booking);

    const updatedProduct = await Property.findByIdAndUpdate(
      req.body.productId,
      { status: "rented" },
      { new: true }
    );

    console.log("Updated Product:", updatedProduct);

    res.json({
      success: true,
      message: "Booking Successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});
router.get("/my/:email", async (req, res) => {

  try {
     console.log("MY BOOKING ROUTE HIT");
console.log("EMAIL:", req.params.email);
    const bookings = await Booking.find({
      userEmail: req.params.email
    });


    const updatedBookings = await Promise.all(

      bookings.map(async (booking) => {


      let product = null;


if(
    booking.productId &&
    mongoose.Types.ObjectId.isValid(booking.productId)
){

    product = await Property.findById(
        booking.productId
    );

}


        return {

          ...booking.toObject(),


          ownerLocation: product 
            ? product.ownerLocation 
            : null,


          renterLocation: booking.renterLocation || null

        };


      })

    );


    res.json({
      success:true,
      bookings:updatedBookings
    });


  } catch(error){

    console.log("BOOKING ERROR:", error.message);

    res.status(500).json({
      success:false,
      message:error.message
    });

}

});
router.put("/feedback/:id", async (req, res) => {

  try {

    await Booking.findByIdAndUpdate(
      req.params.id,
      {
        feedback: req.body.feedback,
        rating: req.body.rating
      }
    );

    res.json({
      success: true,
      message: "Feedback Saved"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});
module.exports = router;