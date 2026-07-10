const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Chat = require("../models/Chat");
const User = require("../models/User");

router.get("/users/:email", async (req, res) => {

  try {

    const email = req.params.email;

    const bookings = await Booking.find({
      $or: [
        { userEmail: email },
        { ownerEmail: email }
      ]
    });

    let users = [];

    bookings.forEach(b => {

      if (b.userEmail !== email) {

       users.push({
    email: b.userEmail,
    productName: b.productName,
    productId: b.productId,
    image: b.image,
    status: b.status
});

      }

      if (b.ownerEmail !== email) {

     users.push({
    email: b.ownerEmail,
    productName: b.productName,
    productId: b.productId,
    image: b.image,
    status: b.status
});

      }

    });

    users = users.filter(
      (v, i, a) =>
        a.findIndex(t => t.email === v.email) === i
    );

    res.json({
      users
    });

  }

  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

// SEND MESSAGE
router.post("/send", async (req, res) => {
  try {
console.log("CHAT REQUEST:", req.body);

    const {
  sender,
  receiver,
  message,
  productId,
  productName,
  productImage
} = req.body;
   
const chat = await Chat.create({
  sender,
  receiver,

  productId,
  productName,
  image: productImage,

  message
});
    res.json({ success: true, chat });
  } catch (err) {
  console.log("CHAT ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message
  });
}
});

// DELETE PRODUCT CHAT

router.delete("/delete/:user1/:user2/:productId", async (req, res) => {

  try {

    const {
      user1,
      user2,
      productId
    } = req.params;


    await Chat.deleteMany({
      productId: productId,

      $or: [
        {
          sender: user1,
          receiver: user2
        },
        {
          sender: user2,
          receiver: user1
        }
      ]
    });


    res.json({
      success: true,
      message: "Product chat deleted"
    });


  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});
// GET CHAT
router.get("/:u1/:u2", async (req, res) => {
  try {

    const { u1, u2 } = req.params;

    const messages = await Chat.find({

      $and: [

        {
          $or: [
            { sender: u1, receiver: u2 },
            { sender: u2, receiver: u1 }
          ]
        }

      ]

    }).sort({ createdAt: 1 });


    res.json({
      success: true,
      messages
    });


  } catch (err) {

    res.status(500).json({
      success:false,
      message:err.message
    });

  }
});


module.exports = router;