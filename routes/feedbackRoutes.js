const express = require("express");
const Feedback = require("../models/Feedback");

const router = express.Router();

// Get All Feedbacks
router.get("/all", async (req, res) => {

  const feedbacks = await Feedback.find();

  res.json({

    success: true,

    feedbacks

  });

});
// Get Product Feedback

router.get("/:productId", async (req, res) => {

  try {

    const feedbacks = await Feedback.find({

      productId: req.params.productId

    });

    res.json({

      success: true,

      feedbacks

    });

  } catch {

    res.status(500).json({

      success: false

    });

  }

});


// Add Feedback
router.post("/add", async (req, res) => {

  try {

    const feedback = new Feedback(req.body);

    await feedback.save();

    res.json({
      success: true,
      message: "Feedback Added"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});
router.get("/owner/:email", async (req, res) => {

  try {

    const feedbacks = await Feedback.find({
      ownerEmail: req.params.email
    });

    res.json({
      success: true,
      feedbacks
    });

  } catch (err) {

    res.status(500).json({
      success: false
    });

  }

});

module.exports = router;