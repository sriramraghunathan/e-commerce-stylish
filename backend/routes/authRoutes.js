// routes/auth.js
const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Replace this with DB auth later
  if (username === "admin" && password === "1234") {
    const token = "your-signed-token"; // You can use jwt here
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
