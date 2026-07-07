const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "Email Already Exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      success: true,
      message: "Registration Success"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
});

// Login
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Wrong Password"
      });
    }

   res.json({
  success: true,
  message: "Login Success",
  user: {
    name: user.name,
    email: user.email,
    state: user.state,
    district: user.district,
    place: user.place,
    pincode: user.pincode
  }
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
});

router.post("/save-location", async (req, res) => {

  try {

    console.log(req.body);

    const { email, state, district, place, pincode } = req.body;

    await User.findOneAndUpdate(
      { email },
      {
        state,
        district,
        place,
        pincode
      }
    );

    res.json({
      success: true,
      message: "Location Saved"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});

module.exports = router;