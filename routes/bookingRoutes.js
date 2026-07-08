const express = require("express");
const Booking = require("../models/Booking");
const Property = require("../models/Property");

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

    const bookings = await Booking.find({
      userEmail: req.params.email
    });

    res.json({
      success: true,
      bookings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error"
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