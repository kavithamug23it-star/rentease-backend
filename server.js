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

// DB connect
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RentEase API Running"
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/chat", chatRoutes);

// ⭐ FIXED USERS ROUTE (IMPORTANT)
app.get("/api/users/all", async (req, res) => {
  try {
    const users = await User.find({}, "email");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// start server
app.listen(5000, () => {
  console.log("🚀 Server Running On Port 5000");
});