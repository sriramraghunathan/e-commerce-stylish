const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay"); // ✅ Fixed capitalization
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Create Razorpay order
app.post("/api/payment/orders", async (req, res) => {
  try {
    const razorpayInstance = new Razorpay({
      key_id: "rzp_test_mXPERjodj0tlJu",
      key_secret: "TBbPi5ZZY0wdwPkJGN7mPQ9r",
    });

    const options = {
      amount: req.body.amount * 100, // amount in paise
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

// Verify Payment
app.post("/api/payment/verify", (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const expectedSign = crypto
      .createHmac("sha256", "TBbPi5ZZY0wdwPkJGN7mPQ9r")
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      return res.status(200).send("success..");
    } else {
      return res.status(400).send("Failed..");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error..");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
