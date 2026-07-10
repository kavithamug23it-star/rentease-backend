const express = require("express");
const Property = require("../models/Property");
const Booking = require("../models/Booking");

const router = express.Router();

// Add Property
router.post("/add", async (req, res) => {

  try {

    const { name, image, location, price, ownerEmail } = req.body;

    const property = new Property({
      name,
      image,
      location,
      price,
      ownerEmail,
      status: "available"
    });

    await property.save();

    res.json({
      success: true,
      message: "Property Added Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});

// Get All Properties
router.get("/all", async (req, res) => {
  try {

    const properties = await Property.find();

    const updatedProperties = await Promise.all(
      properties.map(async (property) => {

        const booking = await Booking.findOne({
          productId: property._id.toString(),
          status: "On The Way"
        });

        return {
          ...property.toObject(),
          fromDate: booking ? booking.fromDate : "",
          returnDate: booking ? booking.returnDate : ""
        };
      })
    );

    console.log(updatedProperties);

    res.json({
      success: true,
      properties: updatedProperties
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false
    });

  }
});
// Add Default Products (Run Only Once)
router.get("/seed", async (req, res) => {

  try {

    const count = await Property.countDocuments();

    if (count > 0) {
      return res.json({
        success: false,
        message: "Products Already Added"
      });
    }

    await Property.insertMany([

      {
        name: "Canon DSLR Camera",
        image: "/images/camera.jpg",
        location: "Chennai",
        price: 500,
        ownerEmail: "admin@rentease.com"
      },

      {
        name: "Dell Laptop",
        image: "/images/laptop.jpg",
        location: "Madurai",
        price: 700,
        ownerEmail: "admin@rentease.com"
      },

      {
        name: "JBL Speaker",
        image: "/images/speaker.jpg",
        location: "Coimbatore",
        price: 300,
        ownerEmail: "admin@rentease.com"
      },

      {
        name: "Drill Machine",
        image: "/images/drill.jpg",
        location: "Trichy",
        price: 250,
        ownerEmail: "admin@rentease.com"
      }

    ]);

    res.json({
      success: true,
      message: "Default Products Added"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});
router.get("/my/test", (req, res) => {
  res.send("MY ROUTE OK");
});
// Get Products By Owner

router.get("/test", (req, res) => {
  res.send("Property Route Working");
});
router.get("/my/:email", async (req, res) => {

    console.log("History Route Hit");
    console.log(req.params.email);

    try {

        const properties = await Property.find({
            ownerEmail: req.params.email
        });

        console.log(properties);

        res.json({
            success: true,
            properties
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});


router.post("/update-status", async (req, res) => {

  try {

    const { productId, status } = req.body;

    console.log("Product:", productId);
    console.log("Status:", status);
console.log("Booking Product ID:", req.body.productId);

const product = await Property.findById(req.body.productId);

console.log("Found Product:", product);

if (!product) {
  return res.status(404).json({
    success: false,
    message: "Product Not Found"
  });
}

product.status = status;
await product.save();

console.log("After Update:", product);

   res.json({
  success: true,
  message: "Property status updated successfully",
  property: product
});

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false
    });
  }

});

router.delete("/delete/:id", async (req, res) => {

  try {

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product Deleted"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});

module.exports = router;