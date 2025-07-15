const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://e-commerce-stylish-dl7e-srirams-projects-54e44124.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://srikanthraghu2005:2005@cluster0.ip7teae.mongodb.net/stylish?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Basic Test Route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Payment: Create Order
app.post("/api/payment/orders", async (req, res) => {
  try {
    const razorpayInstance = new Razorpay({
      key_id: "rzp_test_mXPERjodj0tlJu",
      key_secret: "TBbPi5ZZY0wdwPkJGN7mPQ9r",
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).send("Order creation failed.");
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).send("Internal Server Error.");
  }
});

// Payment: Verify Signature
app.post("/api/payment/verify", (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const expectedSign = crypto
      .createHmac("sha256", "TBbPi5ZZY0wdwPkJGN7mPQ9r")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      return res.status(200).send("success");
    } else {
      return res.status(400).send("failed");
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).send("Server Error");
  }
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
