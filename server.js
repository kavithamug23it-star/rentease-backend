require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const chatRoutes = require("./routes/chatRoutes");

const User = require("./models/User");

const app = express();


// Database Connect
connectDB();


// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));


// Test Route
app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "RentEase API Running"
  });

});


// API Routes
app.use("/api/auth", authRoutes);

app.use("/api/property", propertyRoutes);

app.use("/api/booking", bookingRoutes);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/chat", chatRoutes);


// Users Route
app.get("/api/users/all", async (req, res) => {

  try {

    const users = await User.find({}, "email");

    res.json({
      success: true,
      users
    });


  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});


// 404 Handler (IMPORTANT)
// இதனால் HTML error வராது, JSON வரும்
app.use((req, res) => {

  res.status(404).json({

    success:false,

    message:"API Route Not Found",

    route:req.originalUrl

  });

});


// Start Server

app.listen(5000, () => {

  console.log("🚀 Server Running On Port 5000");

});